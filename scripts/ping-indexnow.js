#!/usr/bin/env node
/**
 * ping-indexnow.js
 *
 * Fetches the live sitemap.xml from https://kineticrecruiter.com and POSTs all
 * URLs to the IndexNow API so Bing, DuckDuckGo, Yandex, and other IndexNow-
 * enabled search engines pick up new/changed content within minutes instead of
 * waiting for the next scheduled sitemap recrawl.
 *
 * Runs as a Cloud Build post-deploy step. Non-fatal on failure — IndexNow is a
 * nice-to-have, not on the critical path. Exits 0 regardless so it never fails
 * a deploy.
 *
 * Google ignores IndexNow; rely on the sitemap for Google discovery.
 *
 * IndexNow docs: https://www.indexnow.org/documentation
 */

const https = require('https');

const HOST = 'kineticrecruiter.com';
const KEY = '9c5b99cc0cfb3c1fd361cae43bb8ae4e';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`GET ${url} returned ${res.statusCode}`));
          res.resume();
          return;
        }
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => resolve(body));
      })
      .on('error', reject);
  });
}

function extractUrls(sitemapXml) {
  const matches = sitemapXml.match(/<loc>([^<]+)<\/loc>/g) || [];
  return matches.map((m) => m.replace(/<\/?loc>/g, '').trim()).filter(Boolean);
}

function postJson(url, payload) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const u = new URL(url);
    const req = https.request(
      {
        method: 'POST',
        hostname: u.hostname,
        path: u.pathname + u.search,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': Buffer.byteLength(body),
        },
      },
      (res) => {
        let resBody = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => (resBody += chunk));
        res.on('end', () => resolve({ status: res.statusCode, body: resBody }));
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  try {
    console.log(`[indexnow] fetching ${SITEMAP_URL}`);
    const xml = await fetchText(SITEMAP_URL);
    const urls = extractUrls(xml).filter((u) => u.startsWith(`https://${HOST}`));
    console.log(`[indexnow] found ${urls.length} URLs`);

    if (urls.length === 0) {
      console.warn('[indexnow] no URLs to submit; skipping');
      return;
    }

    // IndexNow accepts up to 10,000 URLs per request; we will never hit that.
    const payload = {
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    };

    console.log(`[indexnow] POST ${INDEXNOW_ENDPOINT} (${urls.length} URLs)`);
    const { status, body } = await postJson(INDEXNOW_ENDPOINT, payload);
    console.log(`[indexnow] response ${status}${body ? ': ' + body : ''}`);
    // 200 = accepted, 202 = accepted with some URLs skipped, 4xx = bad request.
    // We do not throw on non-2xx; log and move on.
  } catch (err) {
    // Non-fatal — never break a deploy over an indexing ping.
    console.error(`[indexnow] failed: ${err.message}`);
  }
}

main();

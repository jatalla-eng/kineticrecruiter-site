# Claude Code Handoff — Microsoft Clarity + Bing Webmaster Setup

**Paste this file into a new Claude Code session. Self-contained — has all context needed.**

> **Status (as of 2026-04-20): COMPLETE.**
> Clarity is live with Project ID `wdcxcgphrx`; Bing Webmaster Tools is verified via GSC import and the sitemap is submitted.
> Keep this file as a reference for the pattern — but do NOT re-run Task 1 or Task 2.

---

## Context

SEO audit for https://kineticrecruiter.com is complete and deployed. Two optional measurement tools remain to wire up. Both are free, privacy-friendly, and the code scaffolding is **already in place** — only external account setup + a 1-line code change remain.

- **Project root:** `/Users/admin/Documents/Development/kineticrecruiter-site`
- **User:** `john.atalla@gmail.com`
- **Stack:** Next.js 16 on Google Cloud Run
- **Cloud Run service:** `site` in region `australia-southeast1`
- **GCP project ID:** `agentos-demo-1775622291`
- **Deploy:** `git push origin main` triggers Cloud Build → Cloud Run automatically. (There is no `cloudbuild.yaml` substitution plumbing — do not try to pass build-time variables unless you add `--build-arg` wiring to both the yaml and the Dockerfile first.)
- **CDN purge:** `gcloud compute url-maps invalidate-cdn-cache kineticrecruiter-urlmap --path="/*" --global`

---

## Task 1 — Microsoft Clarity (free heatmaps + session recordings)

### What it gives you
Free session recordings, heatmaps, rage-click detection, scroll depth. Invaluable for diagnosing conversion drop-off on `/pricing`, `/compare/*`, and the JD generator tool. Zero performance impact (loaded async after interactive).

### Code is already wired

File: `src/app/layout.tsx`

```tsx
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
...
{CLARITY_ID && (
  <Script id="clarity-init" strategy="afterInteractive">
    {`(function(c,l,a,r,i,t,y){...})(window,document,"clarity","script","${CLARITY_ID}");`}
  </Script>
)}
```

If `NEXT_PUBLIC_CLARITY_PROJECT_ID` is set, Clarity loads. If not set, the component simply doesn't render. Zero code changes needed.

### Steps

1. **Check if a Playwright MCP tool is available** in this session. If yes, you can automate step 2. If not, walk the user through.

2. **Sign up for Clarity** (user action):
   - Go to https://clarity.microsoft.com
   - Sign in with the same Microsoft or Google account the user uses for other dev tools
   - Click **"+ New Project"**
   - Project name: `KineticRecruiter`
   - Website URL: `https://kineticrecruiter.com`
   - Category: `B2B` or `SaaS`
   - Click **Create**

3. **Grab the Project ID**:
   - After creating the project, Clarity shows a "Get tracking code" screen
   - The installation code looks like:
     ```html
     <script type="text/javascript">
       (function(c,l,a,r,i,t,y){...})(window,document,"clarity","script","XXXXXXXXXX");
     </script>
     ```
   - **Copy the string in the last quotes** (the `XXXXXXXXXX` — usually 10 alphanumeric chars). That's the Project ID.
   - Alternatively, the Project ID is visible in the URL when viewing the project dashboard: `https://clarity.microsoft.com/projects/view/<PROJECT_ID>/...`

4. **Wire the Project ID into the code via the hardcode-fallback pattern.**

   `NEXT_PUBLIC_*` vars are baked in at build time by Next.js, and `cloudbuild.yaml` does not currently thread substitutions through to the Docker build step. So the practical path is to hardcode the ID as a fallback, exactly matching how GA4 is handled on line 10 of the same file. Edit `src/app/layout.tsx`:

   ```tsx
   // Before
   const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

   // After
   const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || '<PROJECT_ID>';
   ```

   The env var still overrides the fallback, so local/preview builds can point at a different Clarity project if ever needed.

5. **Deploy**:
   ```bash
   git add src/app/layout.tsx && \
     git commit -m "analytics: wire Microsoft Clarity project ID <PROJECT_ID>" && \
     git push origin main && \
     gcloud compute url-maps invalidate-cdn-cache kineticrecruiter-urlmap \
       --path="/*" --global
   ```

   Cloud Build auto-triggers on push to `main`. Wait 3–5 min for the build to roll out before the CDN purge takes effect in-browser.

6. **Verify Clarity is live**:
   - Wait 2–3 min after deploy for CDN to purge
   - Open https://kineticrecruiter.com in an incognito window, click around for 30 sec
   - In the Clarity dashboard, go to **Dashboard** → should show 1 active session within ~2 min

   Or verify the tag is present:
   ```bash
   curl -sS https://kineticrecruiter.com/ | grep -o 'clarity.ms/tag/[^"]*'
   ```
   Should return `clarity.ms/tag/<PROJECT_ID>`.

---

## Task 2 — Bing Webmaster Tools (free, ~5 min, ~7% of AU search)

### What it gives you
Queries, impressions, CTR, index coverage, and crawl errors from Bing + DuckDuckGo (which uses Bing's index). Also Microsoft Copilot traffic increasingly flows through here. Free forever.

### Two paths — strongly recommend Path A

### Path A (easier) — Import from Google Search Console

No meta tag needed. Uses your existing GSC verification.

1. Go to https://www.bing.com/webmasters
2. Sign in with the Microsoft account (same one used for Clarity in Task 1 — consolidate accounts).
3. Click **"Import from Google Search Console"**
4. Authorize Bing to read your GSC properties
5. Select `kineticrecruiter.com` (domain property)
6. Click **Import**
7. Bing auto-verifies via your existing GSC DNS TXT record. Takes <1 minute.
8. Submit the sitemap:
   - Go to **Sitemaps** in Bing Webmaster left nav
   - Enter `https://kineticrecruiter.com/sitemap.xml`
   - Click **Submit**

**Done.** No code change, no deploy.

### Path B (manual) — HTML meta tag verification

Only use this if Path A fails for some reason (GSC API hiccup, account mismatch).

1. Go to https://www.bing.com/webmasters → **+ Add a site** → `kineticrecruiter.com`
2. Pick **HTML Meta Tag** verification method
3. Bing shows a tag like:
   ```html
   <meta name="msvalidate.01" content="XXXXXXXXXXXXXXXXXXXXXXXXXXXX" />
   ```
4. **Copy the content value** (the `XXXX...` string).

5. **Code is already wired.** File: `src/app/layout.tsx`
   ```tsx
   const BING_TOKEN = process.env.BING_SITE_VERIFICATION;
   ...
   verification: {
     ...(GSC_TOKEN ? { google: GSC_TOKEN } : {}),
     ...(BING_TOKEN ? { other: { 'msvalidate.01': BING_TOKEN } } : {}),
   },
   ```

6. **Wire + deploy using the same hardcode-fallback pattern as Clarity.** Edit `src/app/layout.tsx`:
   ```tsx
   // Before
   const BING_TOKEN = process.env.BING_SITE_VERIFICATION;

   // After
   const BING_TOKEN = process.env.BING_SITE_VERIFICATION || '<TOKEN>';
   ```
   Then commit, push, and purge the CDN:
   ```bash
   git add src/app/layout.tsx && \
     git commit -m "seo: wire Bing Webmaster verification" && \
     git push origin main && \
     gcloud compute url-maps invalidate-cdn-cache kineticrecruiter-urlmap \
       --path="/*" --global
   ```
   Cloud Build auto-triggers on push to `main`.

7. Wait 2–3 min, then in Bing Webmaster click **Verify**.

8. Once verified, submit sitemap: **Sitemaps** → `https://kineticrecruiter.com/sitemap.xml` → **Submit**.

---

## Already done — do NOT redo

- GA4 (`G-3TJGZ1PEJ4`) firing site-wide
- GA4 conversion events: `start_trial_click`, `demo_request_click`
- Google Search Console verified (domain property)
- Sitemap submitted to GSC (27 URLs)
- Clarity + Bing code scaffolding in `src/app/layout.tsx`
- **Clarity live** — Project ID `wdcxcgphrx`, commit `fcf19bc`, deployed 2026-04-20. Dashboard: https://clarity.microsoft.com/projects/view/wdcxcgphrx
- **Bing Webmaster Tools verified** via GSC import (account `john.atalla@gmail.com`), 2026-04-20. No Path B meta tag was needed, so `BING_SITE_VERIFICATION` env var and `BING_TOKEN` fallback remain unused.
- **Sitemap submitted to Bing** — `https://kineticrecruiter.com/sitemap.xml`, 2026-04-20, status Processing.

---

## Guardrails

- Do NOT commit without explicit user approval
- Never skip git hooks; never force-push `main`
- Always purge CDN after deploy (`cache-control: max-age=0, must-revalidate` + `cdn-cache-control: max-age=600`)
- Follow the `|| '<FALLBACK>'` pattern GA4 uses for any new `NEXT_PUBLIC_*` constant — hardcode the public value so a fresh clone builds, but keep the env-var override so local/preview builds can point elsewhere

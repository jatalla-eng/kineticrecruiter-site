# Claude Code Handoff — Microsoft Clarity + Bing Webmaster Setup

**Paste this file into a new Claude Code session. Self-contained — has all context needed.**

---

## Context

SEO audit for https://kineticrecruiter.com is complete and deployed. Two optional measurement tools remain to wire up. Both are free, privacy-friendly, and the code scaffolding is **already in place** — only env vars + external account setup remain.

- **Project root:** `/Users/admin/Documents/Development/kineticrecruiter-site`
- **User:** `john.atalla@gmail.com`
- **Stack:** Next.js 16 on Google Cloud Run
- **Cloud Run service:** `site` in region `australia-southeast1`
- **GCP project ID:** `agentos-demo-1775622291`
- **Deploy:** `gcloud builds submit --config=cloudbuild.yaml --region=australia-southeast1`
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

4. **Set the env var on Cloud Run**:

   ```bash
   gcloud run services update site \
     --region=australia-southeast1 \
     --update-env-vars=NEXT_PUBLIC_CLARITY_PROJECT_ID=<PROJECT_ID>
   ```

   ⚠️ **Important:** The var must be prefixed `NEXT_PUBLIC_` so Next.js embeds it at build time on the client. Since this is a runtime update, the env var will flow to the `<Script>` tag on the next page render — **no rebuild required**.

   Actually — correction: `NEXT_PUBLIC_*` vars are **baked in at build time**. For Cloud Run runtime env vars to reach `process.env.NEXT_PUBLIC_*` on the client bundle, you need to **redeploy** via Cloud Build so the build picks it up. Two options:

   - **Option A (cleaner, recommended):** Add `NEXT_PUBLIC_CLARITY_PROJECT_ID` as a substitution in `cloudbuild.yaml` and pass it at build time:
     ```bash
     gcloud builds submit --config=cloudbuild.yaml \
       --region=australia-southeast1 \
       --substitutions=COMMIT_SHA=$(git rev-parse HEAD),_CLARITY_ID=<PROJECT_ID>
     ```
     Requires `cloudbuild.yaml` to expose `_CLARITY_ID` → `NEXT_PUBLIC_CLARITY_PROJECT_ID` in the Docker build step. Check the current yaml and add it if missing.

   - **Option B (simpler):** Hardcode the ID directly in `src/app/layout.tsx` as a fallback, similar to how GA4 (`G-3TJGZ1PEJ4`) is already hardcoded. Change:
     ```tsx
     const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
     ```
     to:
     ```tsx
     const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || '<PROJECT_ID>';
     ```
     Commit, push, deploy. This is the pattern used for GA4.

5. **Deploy**:
   ```bash
   git add src/app/layout.tsx && \
     git commit -m "analytics: wire Microsoft Clarity project ID <PROJECT_ID>" && \
     git push origin main && \
     gcloud builds submit --config=cloudbuild.yaml \
       --region=australia-southeast1 \
       --substitutions=COMMIT_SHA=$(git rev-parse HEAD) && \
     gcloud compute url-maps invalidate-cdn-cache kineticrecruiter-urlmap \
       --path="/*" --global
   ```

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

6. **Set the env var + redeploy**:
   ```bash
   # Hardcode as fallback (simplest, matches existing pattern):
   # Edit src/app/layout.tsx, change:
   #   const BING_TOKEN = process.env.BING_SITE_VERIFICATION;
   # to:
   #   const BING_TOKEN = process.env.BING_SITE_VERIFICATION || '<TOKEN>';
   git add src/app/layout.tsx && \
     git commit -m "seo: wire Bing Webmaster verification" && \
     git push origin main && \
     gcloud builds submit --config=cloudbuild.yaml \
       --region=australia-southeast1 \
       --substitutions=COMMIT_SHA=$(git rev-parse HEAD) && \
     gcloud compute url-maps invalidate-cdn-cache kineticrecruiter-urlmap \
       --path="/*" --global
   ```

7. Wait 2–3 min, then in Bing Webmaster click **Verify**.

8. Once verified, submit sitemap: **Sitemaps** → `https://kineticrecruiter.com/sitemap.xml` → **Submit**.

---

## Already done — do NOT redo

- GA4 (`G-3TJGZ1PEJ4`) firing site-wide
- GA4 conversion events: `start_trial_click`, `demo_request_click`
- Google Search Console verified (domain property)
- Sitemap submitted to GSC (27 URLs)
- Clarity + Bing code scaffolding in `src/app/layout.tsx`

---

## Guardrails

- Do NOT commit without explicit user approval
- Never skip git hooks; never force-push `main`
- Always purge CDN after deploy (`cache-control: max-age=0, must-revalidate` + `cdn-cache-control: max-age=600`)
- If Clarity hardcode path is chosen, follow the same `|| '<FALLBACK>'` pattern GA4 uses — don't break the env-var override

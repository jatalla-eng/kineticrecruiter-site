# Claude Code Handoff — Finish KineticRecruiter SEO Audit Rollout

**Paste this entire file into a new Claude Code session. It has enough context to pick up where the previous session left off without re-reading the repo.**

---

## Context

SEO audit fixes for https://kineticrecruiter.com were executed and deployed in commit `637bd03` on `main`.

- **Project root:** `/Users/admin/Documents/Development/kineticrecruiter-site`
- **Audit report:** `seo-audit-2026-04-17.md`
- **User:** `john.atalla@gmail.com`
- **Stack:** Next.js 16 on Google Cloud Run
- **Deploy:** `gcloud builds submit --config=cloudbuild.yaml --region=australia-southeast1`
- **DNS:** GoDaddy
- **Load balancer URL map:** `kineticrecruiter-urlmap`

Three items remain that require browser/external access and cloud infrastructure changes.

---

## Task 1 — Google Search Console verification (domain property)

The user created a domain property at:
https://search.google.com/search-console?resource_id=sc-domain%3Akineticrecruiter.com

Domain properties verify via **DNS TXT record only** — there is no meta-tag path.

### Steps

1. Check whether a **Playwright MCP tool** is available in this session (search deferred tools for `playwright`, `browser`, `page`).

2. **If Playwright is available:**
   - Navigate to the GSC URL above (user must be signed in; may need to prompt them)
   - Click "Verify"
   - Read the DNS TXT value (format: `google-site-verification=...`)
   - Report it back to the user with exact GoDaddy DNS instructions:
     - Type: `TXT`
     - Name: `@`
     - Value: the token
     - TTL: `1 hour`

3. **If no browser tool:** Ask the user to paste the token and offer two paths:
   - **(a)** Add it to GoDaddy manually — provide the DNS steps above
   - **(b)** Alternative: add a **second GSC property of type "URL prefix"** at `https://kineticrecruiter.com` — that allows meta-tag verification.
     The code already supports this: set `GOOGLE_SITE_VERIFICATION` env var on Cloud Run and redeploy.
     Implementation lives in `src/app/layout.tsx` (already wired via `verification: { google: GSC_TOKEN }`).

4. After DNS propagates (5–15 min), hit **Verify** in GSC, then submit `sitemap.xml` at GSC → Sitemaps.

---

## Task 2 — Strip `:443` from www → root redirect

The LB currently redirects `www.kineticrecruiter.com` → `https://kineticrecruiter.com:443/`. The `:443` port is non-standard and flagged by some SEO validators.

### Steps

```bash
cd /tmp
gcloud compute url-maps export kineticrecruiter-urlmap \
  --global \
  --destination=urlmap.yaml
```

Open `/tmp/urlmap.yaml`. Look for `hostRedirect` or `urlRedirect` blocks that contain `:443`. Remove the port (or set `stripQuery: false` and `hostRedirect: kineticrecruiter.com` without port).

**Confirm the change with the user before re-importing** — this is shared infrastructure.

```bash
gcloud compute url-maps import kineticrecruiter-urlmap \
  --source=/tmp/urlmap.yaml \
  --global

# verify:
curl -sSI https://www.kineticrecruiter.com/ | grep -i location
# expected: location: https://kineticrecruiter.com/   (no :443)
```

---

## Task 3 — Verify live SEO signals after Task 1 + 2

```bash
# GA4 should fire
curl -sS https://kineticrecruiter.com/ | grep -oE 'gtag/js\?id=[A-Z0-9-]+'
# expect: gtag/js?id=G-3TJGZ1PEJ4

# Blog canonical
curl -sS https://kineticrecruiter.com/blog/best-ats-for-recruitment-agencies-2026 \
  | grep -oE '<link rel="canonical"[^>]+'

# Sitemap URL count
curl -sS https://kineticrecruiter.com/sitemap.xml | grep -c '<url>'
# expect: 26

# All 5 new PSEO pages
for c in greenhouse lever bullhorn jobadder vincere; do
  curl -sS -o /dev/null -w "$c: %{http_code}\n" \
    https://kineticrecruiter.com/compare/$c
done
# expect all 200
```

---

## Already done — do NOT redo

- Canonical on blog posts, BreadcrumbList on blog posts
- SoftwareApplication schema on feature/solution pages
- AU address in Organization schema
- GA4 `G-3TJGZ1PEJ4` hard-coded as fallback in `src/app/layout.tsx` (env var overrides)
- 5 PSEO competitor pages at `/compare/[competitor]` (Greenhouse, Lever, Bullhorn, JobAdder, Vincere) with comparison tables, verdict, FAQPage schema
- `/about` and `/docs` removed from Navbar + Footer
- Dead links replaced: Resources dropdown now has Blog, Free Tools, Compare, ROI Calculator
- Copyright year now `{new Date().getFullYear()}`
- 8 images compressed (~25MB saved); originals at `public/images/.originals/` (gitignored)
- Sitemap homepage canonical-consistent (no trailing slash)

---

## Guardrails

- **Do NOT commit without explicit user approval**
- **Deploy command** (only if user approves):
  ```bash
  git push origin main && \
    gcloud builds submit --config=cloudbuild.yaml \
      --region=australia-southeast1 \
      --substitutions=COMMIT_SHA=$(git rev-parse HEAD) && \
    gcloud compute url-maps invalidate-cdn-cache kineticrecruiter-urlmap \
      --path="/*" --global
  ```
- Never skip git hooks; never force-push `main`
- **Cache header gotcha:** site uses `max-age=0, must-revalidate` on browser + 600s CDN. Always purge CDN after deploy.

# Known Issues — Infrastructure Quirks

Short log of known, accepted quirks so future debugging sessions don't waste time re-investigating.

---

## `:443` appears in www → root redirect Location header

**Symptom:**
```
curl -sSI https://www.kineticrecruiter.com/
→ location: https://kineticrecruiter.com:443/
```

**Cause:**
Google Cloud Load Balancer (GCLB) URL maps always emit the explicit port in `Location` headers for HTTPS redirects. This happens on both:
- HTTP → HTTPS upgrade redirect (http-redirect urlmap)
- www → root redirect (main urlmap, `kineticrecruiter-urlmap`)

There is **no `portRedirect` field** on `defaultUrlRedirect` and no documented way to suppress the port via YAML. Removing `httpsRedirect: true` does not help — GCLB adds the explicit port regardless.

**Why it's harmless:**
Per RFC 3986, `https://host:443/` is identical to `https://host/`. Every browser, every crawler (including Googlebot), and every HTTP client normalizes them. Google Search Console evaluates the canonical tag, which is clean (no `:443`). This does not affect rankings, indexation, or user experience.

**Flagged by:**
Some SEO audit tools (Screaming Frog, Ahrefs) surface it as a soft warning. Cosmetic only.

**Decision:** Accept as a GCLB limitation. Fixing it would require replacing the URL map redirect with a Cloud Run container or Cloud Function (~$5/mo cold starts) or fronting with Cloudflare (architectural change). Not worth the engineering cost for a cosmetic improvement.

**Originally investigated:** 2026-04-18 during SEO audit rollout (see `seo-audit-2026-04-17.md` Task 2).

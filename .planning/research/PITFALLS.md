# Domain Pitfalls: Next.js Marketing Site on Cloud Run

**Domain:** Next.js server-rendered marketing site migrating from client-side React, deployed to Google Cloud Run
**Researched:** 2026-04-07
**Confidence:** MEDIUM (mix of official docs, multiple community sources, and deployment-specific validation)

## Critical Pitfalls

Mistakes that cause rewrites, production outages, or require deep refactoring.

### Pitfall 1: Hydration Mismatches from Browser API Access

**What goes wrong:**
Server renders static HTML without `window`, `document`, or `localStorage`. Client-side JavaScript tries to access these APIs, causing React hydration errors. Text content differs (random values, timestamps, user-specific data). Users see console errors and potential UI corruption.

**Why it happens:**
React components written for client-side rendering don't distinguish between server and client contexts. Migration often involves copy-pasting existing React code without understanding SSR constraints. Developers assume all React code runs the same way everywhere.

**Consequences:**
- Console warnings ("Text content does not match server-rendered HTML")
- UI interactivity delayed or broken
- SEO impact if crawlers see error states
- Hard to debug (reproduces only in production or with JavaScript enabled)

**Prevention:**
- Wrap browser API calls in `useEffect` hooks (client-only by default)
- Use dynamic imports with `{ ssr: false }` for components requiring browser APIs
- Wrap code blocks with `if (typeof window !== 'undefined')` checks
- Test in development with JavaScript disabled to catch SSR issues early
- Validate server and client render the exact same initial HTML

**Detection:**
- Hydration warning in browser console immediately after page load
- UI flickering or incorrect initial render
- Different layout/content between hard refresh and soft navigation

**Which phase:** Phase 1 (build core pages) and Phase 2 (all dynamic components)

---

### Pitfall 2: Environment Variables Exposed to Client

**What goes wrong:**
Sensitive API keys (Gemini, Stripe, etc.) are accidentally exposed in client-side JavaScript bundles. Attackers scrape keys and abuse the service or steal data.

**Why it happens:**
Developers forget that only `NEXT_PUBLIC_*` variables are safely exposed to the browser. Non-prefixed variables should be server-side only (API routes, server components). Copy-pasting configuration from client-side projects doesn't follow Next.js conventions.

**Consequences:**
- Gemini API key exposed → quota theft or malicious requests
- Unauthorized access to your data or services
- Regulatory compliance issues (PCI DSS if payment data involved)
- High billing for unexpected API usage
- Potential security breach notifications

**Prevention:**
- Only use `NEXT_PUBLIC_` prefix for variables meant for the browser
- Store all API keys in environment-only variables (never in code)
- Use Next.js API routes for backend logic, never call external APIs from client
- Audit `.next/static/chunks/` output to verify no secrets appear
- Use `git-secrets` or similar tools to prevent accidental commits
- Server-side API route for Gemini JD Generator (not client-side fetch)

**Detection:**
- Secrets appear in `NEXT_BUILD_ID.js` or other chunk files
- External service receives requests with your API key in headers
- Unexpected charges from API usage
- Security scanning tools flag exposed credentials

**Which phase:** Phase 0 (setup) and Phase 1 (API routes)

---

### Pitfall 3: Stale Pricing Data with ISR Revalidation

**What goes wrong:**
Pricing page uses Incremental Static Regeneration (ISR) with a revalidation interval. Between revalidations, users see outdated prices. During revalidation, the fetch might return cached data from upstream, so the new build gets stale data again. Pricing changes are delayed unpredictably.

**Why it happens:**
ISR follows "stale-while-revalidate" semantics: serve old cache, regenerate in background. If your data source (plans.json) is cached upstream or in a CDN, the revalidation step fetches stale data. Developers don't coordinate upstream cache invalidation with ISR intervals.

**Consequences:**
- Users see outdated prices for hours
- Potential legal/contractual issues if pricing is wrong
- Revenue impact if old prices are lower than current
- Customer confusion and support tickets
- Trust erosion if users detect pricing discrepancies

**Prevention:**
- **For plans.json:** Use short ISR intervals (60-300 seconds) or on-demand revalidation
- **On-demand revalidation:** Trigger when plans.json changes (webhook from Flask app)
- **Cache coordination:** Ensure upstream data source (plans.json) is NOT cached by CDN
- **Validation:** Add price freshness checks to catch stale data
- **Monitoring:** Alert if pricing hasn't revalidated for expected interval
- **Fallback strategy:** If revalidation fails, serve with "as of" timestamp warning

**Detection:**
- Price display doesn't match plans.json source of truth
- Revalidation log shows same old data repeatedly
- Cache headers indicate upstream caching is preventing fresh fetches
- Users report pricing mismatches

**Which phase:** Phase 3 (pricing page) — needs explicit revalidation strategy

---

### Pitfall 4: Third-Party Library SSR Incompatibility

**What goes wrong:**
Client-side libraries (analytics, charts, UI frameworks) assume browser globals exist. They fail at server render time or cause hydration mismatches. Examples: browser-only animation libraries, DOM-manipulating plugins, or analytics tools that capture window state.

**Why it happens:**
Not all npm packages are designed for SSR. They work fine in client-side React but fail when Next.js tries to render them server-side. Developers add libraries without checking SSR compatibility.

**Consequences:**
- Build-time errors (server can't import the library)
- Hydration mismatches (library behavior differs on server vs. client)
- Visual glitches (styles not applied, animations not working)
- Performance issues (library loads unnecessarily on server)

**Prevention:**
- Check library's documentation for SSR/Next.js support before installing
- Use dynamic imports with `{ ssr: false }` for client-only libraries
- Wrap in `<ClientOnly>` or conditional rendering components
- Test build in standalone mode (production build) locally first
- Use server-side alternatives (e.g., image optimization with Next.js `<Image>` instead of external library)

**Detection:**
- Build fails with "window is not defined" error
- Hydration mismatch warnings in console
- Features missing after hydration (e.g., animations don't work)
- Library is loaded on server when it shouldn't be

**Which phase:** Phase 2 (dynamic content) and Phase 3 (interactive features)

---

### Pitfall 5: Missing Await on `params` in Next.js 15+

**What goes wrong:**
Next.js 15 made route params and searchParams asynchronous. Code that doesn't await them gets promises instead of actual values. Dynamic routes break silently or render wrong content.

**Why it happens:**
Migration from Next.js 14 or earlier versions. Developers don't read release notes about breaking changes. Refactoring assumes old APIs still work.

**Consequences:**
- Dynamic routes fail to render correctly
- Blog pages show `[object Promise]` or undefined values
- Feature pages receive wrong parameters
- Contact form or CTA routes broken
- CI/CD passes but production fails (often caught only in staging)

**Prevention:**
- Always `await params` in route handlers and page components
- `const { slug } = await props.params;` (not `const { slug } = props.params;`)
- Enable TypeScript strict mode to catch promise type errors
- Check Next.js version in package.json and read release notes before upgrading
- Test dynamic routes in development (hit `/blog/[slug]` directly)

**Detection:**
- `[object Promise]` appearing in rendered HTML
- 404 or wrong content on dynamic routes
- TypeScript errors about promise types
- Works in dev (with Fast Refresh) but not in production build

**Which phase:** Phase 2 (dynamic routes like blog posts, feature pages)

---

### Pitfall 6: Cold Starts and Slow TTFB on Cloud Run

**What goes wrong:**
Cloud Run container starts from scratch on first request after inactivity. Generating server-side HTML for all pages (no static cache) means every request waits for:
- Container cold start (500ms+)
- Node.js initialization
- Component rendering and data fetching
- Database/API queries

Total Time to First Byte (TTFB) becomes 2-5 seconds for a cold request, causing poor Core Web Vitals and user experience.

**Why it happens:**
SSR requires rendering HTML per request. Unlike static sites, nothing is pre-built. If all pages are SSR with no caching, every traffic spike causes slowdowns. Cloud Run scales to zero to save costs, causing cold starts.

**Consequences:**
- Poor SEO (slower pages rank lower)
- Bad user experience (slow page loads)
- Core Web Vitals failures (Largest Contentful Paint, First Input Delay)
- Conversion loss (users leave slow sites)
- Expensive scaling (more container instances needed)

**Prevention:**
- **Use SSG for static content:** Homepage, feature pages, solution pages → generate at build time
- **Use ISR for semi-dynamic content:** Blog posts (revalidate daily), pricing (revalidate hourly)
- **Reserve SSR only for:** Contact forms, user-specific content, real-time data
- **Implement caching:** Set appropriate Cache-Control headers for Cloud CDN (Google Cloud's CDN layer)
- **Optimize rendering:** Remove unnecessary API calls in page components, prefetch data in parallel
- **Warm-up strategy:** Scheduled Cloud Tasks or Health Checks to keep containers alive
- **Monitor TTFB:** Use Web Vitals tools to detect degradation early

**Detection:**
- Lighthouse reports slow First Contentful Paint / Largest Contentful Paint
- Monitoring shows TTFB spikes after no traffic
- Core Web Vitals failures in Google Search Console
- Analytics show high bounce rate correlating with slow pages

**Which phase:** Phase 1 (choose rendering strategy per page) and Phase 4 (performance optimization)

---

### Pitfall 7: Standalone Output Mode Not Matching next start Command

**What goes wrong:**
`next.config.js` sets `output: 'standalone'` (required for Docker/Cloud Run). Developer still uses `npm run start` or `next start` command. The server doesn't start, or it starts but misses static files.

**Why it happens:**
Confusion about how standalone mode works. The command changes from `next start` to `node .next/standalone/server.js`. Developers forget this detail or don't read the deployment docs.

**Consequences:**
- Cloud Run deployment fails (container exits immediately)
- Application doesn't start
- Static files (CSS, images) missing from served pages
- .env and public files not copied into Docker image

**Prevention:**
- **Dockerfile must use:** `CMD ["node", ".next/standalone/server.js"]`
- **Copy public and .next/static separately:** Standalone doesn't include public/ or .next/static by default
- **Validate locally:** Build and run `node .next/standalone/server.js` before deploying
- **Cloud Build config:** Ensure Dockerfile is correctly referencing standalone server
- **Document in project:** Add comment in Dockerfile explaining why this command is used

**Detection:**
- Cloud Run deployment builds successfully but service fails to start
- Container logs show "command not found" or "ENOENT" errors
- CSS/images don't load (404 errors for static assets)
- Application works in dev but fails in Docker

**Which phase:** Phase 0 (setup) and Phase 5 (deployment)

---

## Moderate Pitfalls

### Pitfall 8: Blog Content Not Revalidating After Decap CMS Edits

**What goes wrong:**
Decap CMS publishes a new blog post to GitHub. Next.js blog page is statically generated. The new post doesn't appear until next scheduled revalidation or full rebuild.

**Why it happens:**
Decap CMS commits to GitHub, but Next.js doesn't know to revalidate. ISR interval (e.g., 24 hours) means waiting a full day for new content to appear. No webhook to trigger revalidation when content changes.

**Consequences:**
- New blog posts invisible for hours
- Marketing team confused why published content isn't live
- Missed SEO opportunities (content live late)
- Support tickets ("Why isn't my blog post showing?")

**Prevention:**
- **Use on-demand revalidation:** Decap CMS can trigger a webhook after GitHub commit
- **Revalidate /blog and /blog/[slug] routes** when any post changes
- **Implement webhook endpoint** in Next.js API route: `/api/revalidate?token=secret&path=/blog`
- **Short ISR fallback:** 1-hour revalidation as safety net if webhook fails
- **Monitor:** Alert if revalidation fails

**Detection:**
- New blog post published but doesn't appear on blog index
- Post file exists in git but not on live site
- Revalidation log shows no updates despite new commits

**Which phase:** Phase 2 (blog system)

---

### Pitfall 9: Gemini API Rate Limiting and Cost Control

**What goes wrong:**
JD Generator form calls Gemini API without rate limiting. One user spams the form, generates 100+ requests, and costs spike unexpectedly. Or the free tier quota is exceeded silently.

**Why it happens:**
Developers focus on functionality, not operational constraints. Easy to add API integration without thinking about abuse, quota, or cost controls.

**Consequences:**
- Unexpectedly high Gemini API bills
- Service degrades when quota is exceeded
- Users see errors after hitting limits
- Potential security issue (DoS via API exhaustion)

**Prevention:**
- **Rate limit per IP/session:** Use `next-rate-limit` or similar middleware
- **Token caps:** Track cumulative tokens used and stop accepting requests
- **Graceful fallback:** Return cached or template response when limits approached
- **Cost alerts:** Monitor API spending and alert when approaching budget
- **Per-feature budgets:** Allocate tokens/month for JD Generator specifically
- **Input validation:** Limit request payload size to prevent token abuse
- **Logging:** Log all API calls with timestamps, IPs, token counts

**Detection:**
- Unexpected charges from Google Cloud
- API returns 429 Too Many Requests or quota exceeded errors
- Single user generates dozens of requests
- Cost monitoring shows spike correlating with date

**Which phase:** Phase 3 (JD Generator tool)

---

### Pitfall 10: Metadata and OG Tags Not Rendering on Dynamic Routes

**What goes wrong:**
Blog posts, feature pages, or dynamic routes don't have correct `<meta>` tags or Open Graph tags. Social media previews show generic site title instead of page-specific title. Search engines see duplicate metadata.

**Why it happens:**
Metadata configuration happens once at root level. Dynamic pages need per-page metadata overrides. Developers forget to export metadata from dynamic route handlers or don't use `generateMetadata()`.

**Consequences:**
- Weak SEO (metadata not specific to content)
- Poor social sharing (generic preview instead of article-specific image/title)
- Link previews on Slack/Twitter show wrong information
- Duplicate meta tags if not properly overridden

**Prevention:**
- **Use `generateMetadata()` in dynamic routes:** Override root metadata per page
- **Pass props to generateMetadata():** Receive params and searchParams async
- **Include canonical URLs:** Prevent duplicate content issues
- **OG tags:** Include og:title, og:description, og:image for each page
- **Article JSON-LD:** Add for blog posts (improves rich snippets)
- **Test:** Use social media preview tools and Google Rich Results Test
- **Monitoring:** Check Search Console for metadata warnings

**Detection:**
- Social previews show generic site title instead of page title
- Google Search Console reports duplicate meta descriptions
- Rich results test shows missing or incorrect schema
- All pages have identical Open Graph tags

**Which phase:** Phase 1 (homepage) through Phase 3 (all pages)

---

### Pitfall 11: CSS-in-JS Library SSR Styling Issues

**What goes wrong:**
Using Tailwind CSS correctly, but global CSS imports or CSS-in-JS libraries cause flash of unstyled content (FOUC) or hydration mismatches due to style tag differences between server and client.

**Why it happens:**
External CSS libraries (Emotion, Styled Components) inject styles differently on server vs. client. Timing issues cause brief unstyled render. Or styles are duplicated server-side, increasing HTML size.

**Consequences:**
- Visual flashing or "unstyled" layout briefly visible
- Slower page loads (larger HTML due to duplicated styles)
- User experience degradation
- Possible hydration errors

**Prevention:**
- **Use Tailwind CSS exclusively** (recommended for this project, already in tech stack)
- **Avoid CSS-in-JS if possible** (Emotion, Styled Components)
- **Global CSS:** Only import in root layout, not per-component
- **Validate build output:** Check `_document.html` to ensure no style injection mismatches
- **Preload CSS:** Use `<link rel="preload">` for critical CSS

**Detection:**
- Flash of unstyled content visible on first load
- Hydration mismatch warnings related to styles
- Duplicated `<style>` tags in page source
- HTML size unexpectedly large

**Which phase:** Phase 0-1 (setup and initial pages)

---

### Pitfall 12: Date.now() and Random Values Causing Hydration Mismatches

**What goes wrong:**
Components use `Date.now()`, `Math.random()`, or time-dependent values during render. Server generates one value, client generates a different value, causing hydration mismatch.

**Why it happens:**
Developers use these functions without thinking about SSR context. They assume all renders are client-side, so randomness is fine.

**Consequences:**
- Hydration mismatch errors
- Different output between server and client renders
- UI instability or incorrect initial render

**Prevention:**
- **Don't use during render:** Never call `Math.random()` or `Date.now()` in render function
- **Use useEffect:** Move random/time-dependent logic into `useEffect`, which only runs on client
- **Use key prop:** For dynamic lists, use stable IDs from data, not Math.random()
- **Server timestamps:** If timestamp needed, calculate on server and pass as prop

**Detection:**
- Console hydration mismatch warning
- Rendered content differs on page reload
- Random IDs or numbers change between requests

**Which phase:** Phase 1-2 (any component using randomness)

---

## Minor Pitfalls

### Pitfall 13: Forgot to Update Domain DNS or SSL Certificate

**What goes wrong:**
Site deploys to Cloud Run successfully. But `kineticrecruiter.com` still points to old server or doesn't have valid SSL certificate. Browser shows security warning or 404 errors.

**Why it happens:**
DNS changes take time to propagate. SSL certificates need manual setup or cert management. Developers forget the DNS/infrastructure layer while focused on code.

**Consequences:**
- Users can't access site via custom domain
- Browser security warnings (invalid certificate)
- Traffic goes to old site
- Downtime during migration

**Prevention:**
- **Plan DNS cutover:** Coordinate with infrastructure team
- **Test with Cloud Run default URL first:** Verify deployment works
- **Update DNS records:** CNAME or A record to Cloud Run service
- **SSL certificate:** Use Google-managed certificate (automatic with Cloud Run custom domains)
- **Verify before go-live:** Test from fresh browser, check certificate validity
- **Monitor:** Check uptime monitoring immediately after cutover

**Detection:**
- Browser shows SSL certificate error or warning
- Domain doesn't resolve or shows wrong IP
- Old site still accessible via custom domain

**Which phase:** Phase 5 (deployment)

---

### Pitfall 14: Missing 404 Page for Non-Existent Routes

**What goes wrong:**
User navigates to `/blog/nonexistent` or `/typo`. Site either 404s silently or shows generic error without branding or helpful navigation. Missed opportunity to redirect or help user find relevant content.

**Why it happens:**
Developers focus on happy paths (correct URLs). 404 handling is an afterthought. Without explicit 404 handling, Next.js shows default error.

**Consequences:**
- Poor user experience (unhelpful error page)
- SEO impact if 404s aren't properly signaled
- Users don't know how to get to correct content
- Potential crawl errors from search engines

**Prevention:**
- **Create `app/not-found.tsx`:** Custom 404 page with branding, search, navigation
- **Generate static 404:** Include in sitemap, return 404 status code
- **Handle dynamic routes gracefully:** If blog post doesn't exist, show 404 not generic error
- **Suggest alternatives:** Link to blog index or popular posts

**Detection:**
- Navigate to non-existent URL and see generic error
- 404 page doesn't match site branding
- Search engine console reports 404 errors

**Which phase:** Phase 1 (initial pages) or Phase 2 (dynamic routes)

---

### Pitfall 15: Public Directory Files Not Copied to Docker Image

**What goes wrong:**
`public/` directory (robots.txt, sitemap.xml, favicon, images) doesn't get copied into Docker image. Cloud Run deployment missing these critical files. Favicon shows 404, robots.txt missing, SEO hindered.

**Why it happens:**
Standalone output mode documentation mentions copying `public/` and `.next/static/`, but developers miss the detail. Docker COPY command doesn't include public/.

**Consequences:**
- Missing favicon (browser shows broken icon)
- robots.txt not found (search engines get 404)
- Sitemap.xml missing (can't be discovered)
- Static images/assets 404
- SEO impact

**Prevention:**
- **Dockerfile must include:**
  ```dockerfile
  COPY --from=builder /app/public ./public
  COPY --from=builder /app/.next/standalone ./.next/standalone
  COPY --from=builder /app/.next/static ./.next/static
  ```
- **Test build locally:** Run Docker image and verify `curl localhost:3000/robots.txt` works
- **Verify in Cloud Run:** Check deployed site's source for asset URLs

**Detection:**
- 404 errors for favicon, robots.txt, or images
- browser console shows missing static assets
- Search Console reports "robots.txt not found"

**Which phase:** Phase 0 (setup) and Phase 5 (deployment)

---

## Phase-Specific Warnings

| Phase | Topic | Likely Pitfall | Mitigation |
|-------|-------|----------------|------------|
| Phase 0 | Project setup & standaloneOutput | Missing await on params; env vars exposed | Read Next.js 15 changelog; audit .env usage before committing |
| Phase 1 | Core pages (home, pricing, features) | Cold starts; hydration mismatches; metadata incomplete | Plan per-page rendering strategy (SSG vs ISR); test hydration with JS disabled |
| Phase 2 | Blog system & dynamic routes | Stale content; metadata per-route; Decap CMS revalidation | Implement webhook for on-demand revalidation; use generateMetadata() |
| Phase 3 | Feature pages & JD Generator | SSR + Gemini API latency; rate limiting missing; pricing stale | Add rate limiting middleware; short ISR intervals for pricing; cache Gemini responses |
| Phase 4 | Optimization & monitoring | No TTFB monitoring; missing error tracking | Add Web Vitals collection; integrate Sentry or equivalent for errors |
| Phase 5 | Cloud Run deployment | Standalone output mode; DNS not updated; static files missing | Test Dockerfile locally; verify public/ and .next/static copied; plan DNS cutover |

---

## Critical Dependencies Between Pitfalls

1. **Hydration issues must be resolved before dynamic pages:** Phase 1 foundation
2. **Environment variables must be secured before Phase 1:** Gemini API key handling in Phase 3 depends on this
3. **Rendering strategy (SSG/SSR/ISR) must be decided before Phase 1:** Affects all subsequent pages
4. **Decap CMS revalidation webhook needed before non-developer blog editing:** Phase 2
5. **Cold start optimization deferred until Phase 4:** Phase 1-3 focus on correctness; Phase 4 focuses on speed

---

## Sources

- [Quickstart: Deploy Next.js to Google Cloud Run](https://docs.cloud.google.com/run/docs/quickstarts/frameworks/deploy-nextjs-service)
- [Top Mistakes When Deploying Next.js Apps - DEV Community](https://dev.to/kuberns_cloud/top-mistakes-when-deploying-nextjs-apps-170f)
- [How to Deploy a Next.js 14 App Router to Cloud Run](https://oneuptime.com/blog/post/2026-02-17-deploy-nextjs-14-app-router-cloud-run-standalone/view)
- [SSR Migration Issues - DEV Community](https://dev.to/coderdan/5-issues-i-encountered-while-converting-a-create-react-app-to-ssr-and-how-i-solved-them-4lje)
- [Next.js Official Docs: Migrating from Create React App](https://nextjs.org/docs/app/guides/migrating/from-create-react-app)
- [Hydration Errors in Next.js - Official Docs](https://nextjs.org/docs/messages/react-hydration-error)
- [Resolving Hydration Mismatches - LogRocket Blog](https://blog.logrocket.com/resolving-hydration-mismatch-errors-next-js/)
- [Next.js ISR and Revalidation Guide](https://nextjs.org/docs/app/guides/incremental-static-regeneration)
- [ISR Revalidation Stale Data Issue](https://github.com/vercel/next.js/issues/58909)
- [SEO Rendering Strategies - Next.js Learn](https://nextjs.org/learn/seo/rendering-strategies)
- [Next.js Standalone Output Mode - Official Docs](https://nextjs.org/docs/pages/api-reference/config/next-config-js/output)
- [Building a Markdown Blog with Decap CMS - DEV Community](https://dev.to/aomuiz/building-a-markdown-blog-in-nextjs-with-decap-cms-a-comprehensive-guide-4j8p)
- [Gemini AI Integration Security Best Practices](https://www.mohtaweb.com/2026/04/integrate-gemini-ai-api-web-apps.html)
- [Next.js Server and Client Components - Official Docs](https://nextjs.org/docs/app/getting-started/server-and-client-components)

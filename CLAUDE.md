<!-- GSD:project-start source:PROJECT.md -->
## Project

**KineticRecruiter Marketing Site**

A Next.js marketing website for KineticRecruiter, an AI-powered ATS for recruitment agencies. Migrated from a client-side rendered MiniMax/Vite React app to a server-rendered Next.js project for SEO, AI discoverability, and maintainability. Serves from `kineticrecruiter.com` while the main app lives at `app.kineticrecruiter.com`.

**Core Value:** Every page renders full HTML server-side so Google (and AI search engines) can discover, crawl, and rank all marketing content — the entire reason for this migration.

### Constraints

- **Tech stack**: Next.js 14+ with App Router, TypeScript, Tailwind CSS — specified in migration doc
- **Deployment**: Google Cloud Run with standalone output mode — must produce a self-contained Node.js server
- **Pricing source**: Must read from `plans.json`, never hardcode prices — single source of truth shared with Flask app
- **Design fidelity**: Match the existing MiniMax site look and feel, but small improvements are welcome
- **Blog format**: Markdown files in `content/blog/` — no database, no external CMS service
- **API keys**: Gemini API key for JD generator must stay server-side (Next.js API route)
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Recommended Stack
### Core Framework & Runtime
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Next.js** | 16.2+ | SSR marketing site with App Router | Latest stable release (16.2.2 as of March 2026) with 50% faster rendering, ~400% faster dev startup. App Router mandatory for SSR, server components, and metadata APIs. Official Google Cloud Run support. |
| **React** | 19.2+ (canary) | Component framework | Shipped with Next.js 16+. Server components support required for SSR performance. View Transitions API for smooth navigation. |
| **TypeScript** | 5.3+ | Type safety | Integrates seamlessly with Next.js App Router. Mandatory for maintainability on marketing site with dynamic content. |
| **Node.js** | 18.17+ or 20+ | Runtime environment | Cloud Run standard. Next.js standalone mode requires modern Node. Use 20 LTS for stability. |
### Styling & Design
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Tailwind CSS** | 4.0+ | Utility-first CSS framework | v4 rewrite (Jan 2025) provides 5x faster full builds, 100x faster incremental builds. Oxide engine (Rust) enables dynamic content detection—no config file needed. Perfect match for SSR with server components (classes are static, not dynamic). @tailwindcss/typography for markdown blog styling. |
| **@tailwindcss/typography** | Latest | Prose styling for markdown | Essential for blog post readability. Provides pre-built typography styles that work with gray-matter markdown output. |
| **PostCSS** | 8+ | CSS processing | Tailwind v4 uses PostCSS internally. Ensure Next.js auto-config applies. |
### Markdown & Content
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **gray-matter** | 4.0.3 | Parse markdown frontmatter (title, date, author) | Stable, production-ready. Last update 2019—zero new bugs, fully documented. Paired with remark for reliable markdown parsing. |
| **remark** | 14+ | Unified markdown processor | ESM-only ecosystem. Plays nicely with Next.js. Allows plugin pipeline for markdown transformations. |
| **remark-gfm** | Latest | GitHub Flavored Markdown support | Tables, strikethrough, autolinks—standard for markdown blogs. |
| **remark-rehype** | Latest | Convert remark AST to rehype (HTML AST) | Bridge between markdown parsing and HTML generation. |
| **rehype-slug** | Latest | Auto-generate heading IDs | Enables table of contents and deep linking in blog posts. |
| **rehype-highlight** | Latest | Syntax highlighting for code blocks | Client-side highlight.js integration. Better than server-side alternatives for blog performance. |
| **highlight.js** | 11+ | Code syntax coloring | Browser-based, ships with many language support out-of-box. Lightweight. |
### Headless CMS & Blog Management
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Decap CMS** | 3.11+ (March 2026) | Git-based visual editor for non-developers | Free, open-source, zero server cost. GitHub OAuth for authentication. WYSIWYG editor for markdown files. Amy can publish blog posts without CLI. Stores content in git repo (single source of truth with code). |
### SEO & Metadata
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Next.js Metadata API** | Built-in (16.2+) | Page-level SEO metadata, OG tags | App Router `generateMetadata()` function. Dynamic per-page title, description, og:image. No external library needed. |
| **Schema.org JSON-LD** | Manual (scripts) | Structured data for search engines & AI | Use `<script type="application/ld+json">` tags in layout. Article schema for blog posts (improves rich results). No npm library—write raw JSON. Verify in Search Console. |
| **next-sitemap alternative** | Manual or `next-sitemap@4.1+` | Dynamic XML sitemap generation | If using library: next-sitemap 4.1+. If manual: generate at build time with glob and fs. For small site (home, pricing, 4 feature pages, 2 solution pages, blog): manual generation is simpler. |
### Image Optimization
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **next/image** | Built-in (16.2+) | Automatic image optimization | Prevents layout shift, lazy loading, responsive sizes. Supports WebP/AVIF fallbacks. For Cloud Run: use default Image Optimization API (no custom loader needed unless using external CDN). |
| **Google Cloud Storage** (optional) | N/A | Image hosting | If images exceed server disk, store in GCS bucket and configure image loader in next.config.js. Not required for initial launch. |
### Deployment & Infrastructure
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Google Cloud Run** | Standard | Serverless container platform | Specified in PROJECT.md. australia-southeast1 region matches Flask app infrastructure. Standalone output mode → minimal Docker image (~100-200MB). Pay-per-request pricing. Custom domain support. |
| **Docker** | Latest | Container runtime | Standalone output mode + multi-stage Dockerfile produces lean images. Cloud Build auto-detects Dockerfile. |
| **Cloud Build** | Built-in | CI/CD pipeline | Auto-trigger on git push to main. Free tier for open repos. Builds and deploys to Cloud Run in ~2 min. |
### API Integration
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Gemini API** | Latest (2026) | JD Generator AI backend | Server-side API route to keep key secure. Use `@google/generative-ai` SDK. Free tier available for testing. |
| **@google/generative-ai** | Latest | Gemini API client library | Official, well-maintained. Async await support. Error handling for rate limits. |
### Development & Build Tools
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **pnpm** | 9.12+ | Fast, disk-efficient package manager | Used in AgentOS ecosystem (from system memory). Lockfile format ensures deterministic installs. Faster than npm/yarn. |
| **Vitest** | Latest | Unit testing framework | Official Next.js recommendation (Feb 2026). Faster than Jest. ESM-native. Parallel test execution. Browser mode for component testing. |
| **React Testing Library** | Latest | Component testing utilities | Query by accessible attributes (role, label), not implementation. Works with Vitest. Tests user behavior, not implementation. |
| **Playwright** | Latest | E2E testing | Test full user flows (form submission, navigation, CMS preview). Headless browser simulation. Recommended for testing Decap CMS integration. |
### Environment & Configuration
| Technology | Version | Purpose | Why |
|------------|---------|---------|---------|
| **next.config.mjs** | N/A | Next.js configuration file | Must use `.mjs` (ES modules) because remark/rehype are ESM-only. Configure: `output: 'standalone'`, `reactStrictMode: true`, compress images, security headers. |
| **.env.production** | N/A | Production environment variables | Set `HOSTNAME=0.0.0.0` and `PORT=8080` for Cloud Run (Cloud Run default). Gemini API key here. |
| **.env.local** | N/A | Local dev secrets | Git-ignored. Gemini key for local testing. |
## Installation & Setup
# Create Next.js project with strict setup
# Install markdown processing stack
# Install CMS
# Install Gemini SDK
# Install Tailwind typography
# Dev dependencies
# Optional: sitemap generation (if manual)
# npx pnpm@9.12.0 add next-sitemap@4.1+
## Key Configuration Files
### next.config.mjs (ESM required for remark)
### tailwind.config.ts
### .env.production (for Cloud Run)
## Alternatives Considered
| Component | Recommended | Alternative | Why Not |
|-----------|-------------|-------------|---------|
| **Framework** | Next.js 16 | Remix, Astro, SvelteKit | Remix: better for forms but heavier. Astro: static-first, less ideal for SSR with API routes. SvelteKit: smaller ecosystem, less production maturity. |
| **Styling** | Tailwind 4 | Bootstrap, CSS-in-JS (styled-components) | Bootstrap: verbose, harder to customize. CSS-in-JS: increases JS bundle for SSR (worse performance). |
| **CMS** | Decap (git-based) | Contentful, Sanity, DatoCMS | Contentful/Sanity: powerful but overkill, cost (~$100+/mo). DatoCMS: excellent but paid. Decap: free, git-native, zero server cost. Trade-off: no versioning UI (GitHub handles it). |
| **Blog Content** | Markdown files | Headless CMS API, database | Markdown: no DB setup, version control, offline editing with git. API/DB: adds infrastructure, needs auth, slower for static content. |
| **Image Optimization** | next/image default | Custom loaders, external CDN | Default: included, zero config. Custom loaders: adds complexity if not needed upfront. CDN: premature optimization. |
| **Hosting** | Cloud Run | Vercel, Netlify, Lambda | Vercel: tight Next.js integration but proprietary. Netlify: edge functions less mature. Lambda: API Gateway overhead, harder billing. Cloud Run: matches Flask infra, simpler billing. |
| **Testing** | Vitest | Jest | Vitest: 3-5x faster, ESM-native. Jest: industry standard but slower test runs. |
| **SEO Library** | Manual JSON-LD | next-seo package | Manual: ~20 lines of code, zero dependencies. next-seo: adds bundle size, learning curve. For simple site: manual is better. |
## Tech Stack Decision Matrix
| Decision | Rationale | Risk | Mitigation |
|----------|-----------|------|-----------|
| **Next.js 16.2+ (not 14)** | 50% faster SSR rendering, 100x faster build times with Tailwind 4. Latest bug fixes for Cloud Run deployment. Turbopack stable and default. | Minor: rare breaking changes in minor upgrades. | Pin to 16.2.2, test before upgrading. |
| **App Router (not Pages)** | Mandatory for modern SSR, server components, metadata API, streaming. Pages Router deprecated. | Low: well-documented, all examples use App Router. | Use official Next.js App Router tutorial as reference. |
| **Tailwind 4 (not 3.4)** | 5-100x faster builds, CSS-first config, automatic content detection. No PostCSS tweaking needed. | Moderate: v4 is brand new (Jan 2025), watch for edge case bugs. | Pin version, test on Cloud Run build. |
| **Markdown files (not API CMS)** | Zero server cost, version control, git-native. Decap CMS provides UI for non-developers. | Low: No real-time collaboration, but Decap CMS + git handles this. | Documented workflow for Amy: Decap editor → GitHub PR → merge → auto-deploy. |
| **Cloud Run standalone mode** | 80% smaller Docker image, faster cold starts, no .next server code needed. | Low: well-documented, official Google support. | Test with multi-stage Dockerfile, monitor cold start times. |
| **Gemini API (not OpenAI)** | Cheaper, free tier sufficient for JD generator, no rate limits for testing. Google integration. | Low: API stable, SDKs mature. | Cache API responses server-side if needed. |
## Performance Characteristics (Expected)
| Metric | Target | How Achieved |
|--------|--------|-------------|
| **Page Load (FCP)** | <1.5s (3G) | SSR renders HTML server-side, minimal JS. Next.js Image optimization. Standalone mode → slim .next bundle. |
| **Largest Contentful Paint (LCP)** | <2.5s | Server-rendered hero image, above-the-fold content in HTML, lazy loading for below-fold. |
| **Cumulative Layout Shift (CLS)** | <0.1 | next/image prevents shifts, explicit sizing on all dynamic content, web fonts strategy (swap). |
| **Cold Start (Cloud Run)** | <2s | Standalone mode, Node.js 20, --cpu-boost during startup, minimal dependencies. Expect ~1-2s first request. |
| **Build Time** | <2 min | Tailwind 4 + Turbopack, no heavy transforms. Cloud Build → Cloud Run ~90s total. |
| **Blog Post Render** | <100ms | Static markdown files, gray-matter parsing, remark pipeline. No CMS API calls. |
## Security Considerations
| Concern | Mitigation |
|---------|-----------|
| **API Keys** | Gemini API key: `.env.production` only (not committed). Cloud Run secrets manager. Never expose in client code. |
| **CMS Authentication** | Decap CMS uses GitHub OAuth. No custom auth needed. Ensure repo is private (Amy's GitHub access only). |
| **JSON-LD XSS** | Escape `<` as `\u003c` in JSON-LD strings to prevent injection. React Server Components auto-escape text nodes. |
| **Next.js headers** | Enable security headers: X-Content-Type-Options, X-Frame-Options, CSP (if external images). Configured in next.config.mjs. |
| **Third-party scripts** | Gemini SDK loaded server-side (API routes), not client-side. No ad trackers or analytics SDKs suggested (add if needed with `next/script` async). |
## Dependency Management
| Library | Type | Why | Maintenance |
|---------|------|-----|-------------|
| **gray-matter** | Core | Markdown parsing, stable API | Low: mature, rarely updates. Check for security advisories quarterly. |
| **remark ecosystem** | Core | Markdown transformation pipeline | Medium: ESM ecosystem evolving. Monitor for updates every 3 months. |
| **Tailwind CSS** | Core | Styling, CSS generation | High: v4 new engine, check for monthly updates. Subscribe to release notes. |
| **Decap CMS** | Feature | Blog editing, git-based | Medium: 1-2 releases/month (March: 3.11.0). Monitor for breaking changes. |
| **Next.js** | Core | Framework, deployment | High: 1 major + 2-3 minors/year. Test on staging before upgrading. |
| **React** | Core | UI library (shipped with Next) | Inherited from Next.js version. |
| **Vitest** | Dev | Testing (optional for MVP) | Medium: active development, quarterly check. |
## Deployment Checklist for Cloud Run
- [ ] **Environment variables** set in Cloud Run secret manager (GEMINI_API_KEY, etc.)
- [ ] **Dockerfile** uses multi-stage build: builder stage → standalone output → runtime stage
- [ ] **Cloud Build config** (cloudbuild.yaml): build → push to Artifact Registry → deploy to Cloud Run
- [ ] **next.config.mjs** has `output: 'standalone'`, HOSTNAME/PORT env vars honored
- [ ] **Custom domain** mapped to Cloud Run service (kineticrecruiter.com → cloudrun.app domain)
- [ ] **Monitoring** set up: Cloud Logging, Cloud Trace, Error Reporting
- [ ] **Cold start** tested: expect <2s first request, <500ms warm requests
- [ ] **Image optimization** verified: next/image serving WebP/AVIF to modern browsers
## Sources
- [Next.js 16.2 Release Notes](https://nextjs.org/blog/next-14)
- [Next.js Official Deployment: Google Cloud Run](https://docs.cloud.google.com/run/docs/quickstarts/frameworks/deploy-nextjs-service)
- [Next.js App Router Guide](https://nextjs.org/docs/app/building-your-application/routing)
- [Tailwind CSS v4 Launch Blog](https://tailwindcss.com/blog/tailwindcss-v4)
- [Tailwind CSS + Next.js Integration](https://tailwindcss.com/docs/guides/nextjs)
- [Decap CMS Next.js Integration](https://decapcms.org/docs/nextjs/)
- [Next.js Markdown Blog Best Practices](https://dev.to/aomuiz/building-a-markdown-blog-in-nextjs-with-decap-cms-a-comprehensive-guide-4j8p)
- [Remark & Rehype Ecosystem (ESM)](https://ondrejsevcik.com/blog/building-perfect-markdown-processor-for-my-blog)
- [Next.js JSON-LD for SEO](https://nextjs.org/docs/app/guides/json-ld)
- [Next.js Image Optimization](https://nextjs.org/docs/14/app/building-your-application/optimizing/images)
- [Next.js Testing with Vitest](https://nextjs.org/docs/app/guides/testing/vitest)
- [Google Cloud Run Next.js Deployment Guide](https://oneuptime.com/blog/post/2026-02-17-deploy-nextjs-14-app-router-cloud-run-standalone/view)
- [Headless CMS Comparison for Next.js](https://hygraph.com/blog/nextjs-cms)
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->

# Architecture Patterns

**Domain:** Next.js marketing site (SEO-first, Cloud Run deployment)
**Researched:** 2026-04-07
**Overall confidence:** HIGH (official Next.js docs + current best practices)

## Recommended Architecture

KineticRecruiter site uses a **route-grouped, server-component-first architecture** optimized for Cloud Run's containerized Node.js runtime. The structure separates concerns into discrete, independently-deployable layers while maintaining tight integration through App Router conventions.

```
app/
├── (marketing)/                    # Marketing content (SEO-critical)
│   ├── layout.tsx                  # Shared marketing layout
│   ├── page.tsx                    # Homepage
│   ├── pricing/page.tsx            # Pricing page
│   ├── features/
│   │   ├── layout.tsx              # Features sublayout
│   │   ├── ai-candidate/page.tsx   # Feature pages
│   │   ├── candidate-intake/page.tsx
│   │   └── ...
│   ├── solutions/
│   │   ├── agencies/page.tsx       # Solution pages
│   │   └── in-house-teams/page.tsx
│   ├── blog/
│   │   ├── page.tsx                # Blog index with filters
│   │   └── [slug]/page.tsx         # Dynamic post pages
│   └── contact/page.tsx            # Contact form page
│
├── (tools)/                        # Interactive tools (client-side heavy)
│   └── jd-generator/page.tsx       # JD generator form
│
├── api/                            # Backend logic
│   ├── generate-jd/route.ts        # JD generator endpoint
│   ├── revalidate/route.ts         # On-demand ISR webhook
│   └── [...]
│
├── admin/                          # Decap CMS
│   └── [...rest]/route.ts          # Decap static files
│
├── (seo)/                          # SEO metadata endpoints
│   ├── sitemap.ts                  # Sitemap.xml
│   ├── robots.ts                   # Robots.txt
│   └── feed.xml                    # RSS feed (optional)
│
├── layout.tsx                      # Root layout
└── globals.css                     # Global styles

content/
├── blog/
│   ├── post-1.md
│   ├── post-2.md
│   └── metadata.json               # Post frontmatter index
└── plans.json                      # Shared pricing source

lib/
├── blog.ts                         # Blog file reading & parsing
├── seo.ts                          # Metadata generation
├── api-client.ts                   # Server-side API calls
├── gemini.ts                       # Gemini API wrapper
└── utils.ts                        # Shared utilities

public/
├── images/
├── fonts/
└── assets/

types/
├── blog.ts
├── pricing.ts
└── common.ts
```

## Component Boundaries

| Component | Responsibility | Communicates With | Data Source |
|-----------|---------------|-------------------|-------------|
| **(marketing) layout** | SEO metadata, navigation shell, footer | Page components | Static/metadata exports |
| **Homepage** | Hero, feature grid, pricing preview, CTA | Feature cards, pricing loader | `plans.json` |
| **Pricing page** | Full pricing table, toggle control, FAQ | Plan cards | `plans.json` |
| **Feature pages** | Feature overview, benefits, CTA | Static content | Markdown/content files |
| **Solution pages** | Industry-specific positioning | Static content | Markdown/content files |
| **Blog index** | Post listing, search, category filter | Post loader, metadata parser | `content/blog/*.md` |
| **Blog [slug]** | Individual post rendering, JSON-LD schema | Post loader, metadata parser | `content/blog/*.md` |
| **Contact page** | Form capture (GET/POST) | Email service OR form submission | Server action or API route |
| **JD Generator page** | Form UI (client-side interaction) | `/api/generate-jd` | Gemini API (server-side) |
| **API /generate-jd** | LLM prompt orchestration, safety | Gemini API | Environment (API keys) |
| **API /revalidate** | ISR invalidation trigger | Next.js cache | GitHub webhook or manual call |
| **Sitemap endpoint** | XML generation for crawlers | Blog loader, page index | Generated from routes |
| **Robots endpoint** | Crawler directives | Static config | Configuration file |
| **Decap CMS admin** | UI for blog editing (non-dev) | GitHub API, file commits | Decap cloud service |

## Data Flow

### Static Marketing Pages

```
1. Build time: Page components export metadata
2. Build time: Next.js generates static HTML + metadata headers
3. Runtime: Cached HTML served to browsers/crawlers
4. Runtime: JSON-LD schema embedded in page for SEO
```

**Examples:** Homepage, Feature pages, Solution pages, Pricing page

### Dynamic Blog System (SSG with ISR)

```
1. Build time: lib/blog.ts reads all .md files from content/blog/
2. Build time: Blog [slug] page statically generated for each post
3. Build time: Blog index page generated with full post list
4. Runtime: Cache served for 60 seconds (revalidate: 60)
5. Runtime: Background regeneration triggered after 60s
6. On-demand: /api/revalidate webhook (from Decap CMS) triggers instant update
7. Client: Gets fresh HTML immediately on next visit
```

**Key files:**
- `lib/blog.ts` — reads markdown, parses frontmatter, extracts excerpt
- `app/(marketing)/blog/page.tsx` — lists all posts, filters by category
- `app/(marketing)/blog/[slug]/page.tsx` — renders individual posts

### Form Submission (JD Generator)

```
1. Client: User fills form on /jd-generator
2. Client: Form submitted to /api/generate-jd (POST)
3. Server: Route validates input, calls Gemini API
4. Server: Streams response back to client
5. Client: Displays generated JD in UI or downloads as text
```

**Key file:**
- `app/api/generate-jd/route.ts` — handles LLM call, returns streamed text

### Contact Form

```
Option A (Server Action):
1. Client: Form submission triggers Server Action
2. Server: Action processes, sends email/webhook
3. Server: Returns success/error to client
4. Client: Shows confirmation

Option B (API Route):
1. Client: Form POST to /api/contact
2. Server: Route processes, sends email/webhook
3. Server: Returns JSON response
4. Client: Shows confirmation
```

**Recommendation:** Use Server Action for simplicity (no explicit API route needed)

### Pricing Data (Shared Source)

```
1. Build time: plans.json read and validated
2. Pricing page: Static generation with embedded prices
3. Homepage: Pricing preview fetched at build time
4. Runtime: If plans.json changes, trigger ISR revalidate
```

**Key file:**
- `content/plans.json` — single source of truth for pricing

## Rendering Strategy

| Page Type | Strategy | Revalidation | Reason |
|-----------|----------|--------------|--------|
| Homepage | SSG (Static Site Generation) | 3600s (1 hour) | Content rarely changes, high traffic, SEO critical |
| Feature pages | SSG | 86400s (1 day) | Static content, support page |
| Solution pages | SSG | 86400s (1 day) | Static content, support page |
| Pricing page | SSG | 300s (5 min) | Plans source changes occasionally, important for users |
| Blog posts | SSG + ISR | 60s + on-demand | Content updates via Decap CMS, fast updates needed |
| Blog index | SSG + ISR | 60s + on-demand | Post list changes, fast updates when new posts published |
| Contact page | SSG | Static (no revalidation) | Form submission is server action, page HTML doesn't change |
| JD Generator | SSG | Static | Interactive client component, doesn't need revalidation |
| Dynamic API routes | Runtime (per-request) | N/A | `/api/generate-jd`, `/api/revalidate` — always dynamic |

## Server Components vs Client Components

**Server Components (default, no 'use client')**
- All pages and layouts (marketing, blog, features)
- Data fetching for static generation
- Metadata exports
- JSON-LD schema generation
- Benefit: Zero JavaScript shipped for content-heavy pages, full SEO

**Client Components ('use client' used sparingly)**
- Pricing toggle (monthly/annual switch)
- Blog category filter (client-side search)
- JD Generator form (interactive input/output)
- Contact form (if using client-side validation)
- Benefit: Interactivity without page reload

**Server Actions (for mutations)**
- Contact form submission
- Newsletter signup (if included)
- Benefit: No explicit API route, handles CSRF automatically

## Cloud Run Deployment Implications

### Container Layer

```dockerfile
# Multi-stage build (optimized for Cloud Run)
FROM node:20-alpine AS builder
# Install deps, build Next.js
RUN npm run build

FROM node:20-alpine
# Copy .next/standalone and public/
COPY --from=builder app/.next/standalone ./
COPY public ./public
COPY .next/static ./.next/static
ENTRYPOINT ["node", "server.js"]
```

**Key points:**
- `output: 'standalone'` in `next.config.js` produces self-contained build
- No persistent storage — Cloud Run doesn't support image optimization caching
- Stateless design allows horizontal scaling
- Single Node.js process handles all requests

### Environment Configuration

| Variable | Type | Where Set | Purpose |
|----------|------|-----------|---------|
| `NEXT_PUBLIC_*` | Build-time | `.env` or CI/CD | Public environment variables, baked into bundles |
| `GEMINI_API_KEY` | Runtime | Cloud Run secrets | LLM API access, never baked in |
| `GITHUB_TOKEN` | Runtime | Cloud Run secrets | Decap CMS auth (if pull request-based workflow) |
| `REVALIDATE_SECRET` | Runtime | Cloud Run secrets | Webhook secret for `/api/revalidate` |

## Component Boundaries & Dependencies

```
Root Layout (app/layout.tsx)
├── (marketing) Layout
│   ├── Navigation (shared)
│   ├── Footer (shared)
│   └── Pages
│       ├── Homepage (depends on: plans.json)
│       ├── Pricing (depends on: plans.json)
│       ├── Features/* (static content)
│       ├── Solutions/* (static content)
│       ├── Blog Index (depends on: lib/blog.ts, all .md files)
│       ├── Blog [slug] (depends on: lib/blog.ts, single .md file)
│       └── Contact (depends on: Server Action or /api/contact)
│
├── (tools) Layout (if separated)
│   └── JD Generator (depends on: /api/generate-jd)
│
├── (seo)
│   ├── sitemap.ts (depends on: lib/blog.ts, page routes)
│   ├── robots.ts (static)
│   └── feed.xml (optional, depends on: lib/blog.ts)
│
├── api/generate-jd (depends on: Gemini API, validation)
├── api/revalidate (depends on: Next.js revalidateTag/Path)
└── admin/ (Decap CMS static files)

Shared Libraries
├── lib/blog.ts (reads content/blog/)
├── lib/seo.ts (generates metadata)
├── lib/api-client.ts (server-side HTTP calls)
├── lib/gemini.ts (LLM wrapper)
└── types/ (TypeScript definitions)
```

## Build Order & Dependencies

### Phase 1: Foundation (must complete first)

1. **Type definitions** (`types/`)
   - Blog post interface
   - Pricing plan interface
   - Common utility types
   - Dependency: None

2. **Shared libraries** (`lib/`)
   - `blog.ts` — markdown file reader, parser
   - `seo.ts` — metadata generation utilities
   - `utils.ts` — common helpers
   - Dependency: Type definitions

3. **Root layout** (`app/layout.tsx`)
   - Navigation, footer, global styles
   - Metadata export
   - Dependency: Type definitions, shared libraries

### Phase 2: Static Marketing Pages

4. **Marketing layout & pages**
   - `(marketing)/layout.tsx`
   - `(marketing)/page.tsx` (homepage)
   - Feature pages, solution pages
   - Dependency: Root layout, `plans.json`, design system

5. **Pricing page**
   - `(marketing)/pricing/page.tsx`
   - Toggleable pricing display
   - Dependency: `plans.json`, root layout

### Phase 3: Content System

6. **Blog infrastructure**
   - `content/blog/` markdown files
   - `lib/blog.ts` post loader
   - Dependency: Markdown content files

7. **Blog pages**
   - `(marketing)/blog/page.tsx` (index with filters)
   - `(marketing)/blog/[slug]/page.tsx` (individual posts)
   - Dependency: Blog infrastructure (`lib/blog.ts`)

### Phase 4: Interactive Features

8. **API routes & server actions**
   - `/api/generate-jd` (Gemini integration)
   - `/api/revalidate` (ISR webhook)
   - Contact form server action
   - Dependency: Environment variables (API keys)

9. **Interactive pages**
   - `/jd-generator` page
   - `/contact` page
   - Dependency: API routes and server actions

### Phase 5: SEO & Deployment

10. **SEO metadata**
    - `sitemap.ts`
    - `robots.ts`
    - `feed.xml` (if included)
    - Dependency: Blog infrastructure

11. **Decap CMS admin**
    - GitHub OAuth setup
    - Config file for blog editing
    - Dependency: GitHub repo access

12. **Cloud Run deployment**
    - Dockerfile + `.dockerignore`
    - `next.config.js` with `output: 'standalone'`
    - Build pipeline (Cloud Build)
    - Dependency: All phases complete

## Architectural Decisions

### Why Route Groups?

Route groups `(marketing)`, `(tools)`, `(seo)` provide:
- **Logical organization** without URL impact
- **Shared layouts** for related pages (all marketing pages share nav/footer)
- **Easy future expansion** (add `(docs)` group for help section)
- **Clear intent** — code readers understand page grouping

### Why Server Components by Default?

- **Zero JavaScript for content** — static pages ship no client JS
- **Direct database/file access** — no API route wrapper needed
- **SEO-friendly** — full HTML available to crawlers
- **Better performance** — less client-side hydration

### Why ISR for Blog?

- **Static performance** — cached HTML served instantly
- **Fresh updates** — 60-second background regeneration
- **On-demand updates** — Decap CMS webhook triggers instant refresh
- **Scales to millions** — no per-request overhead

### Why Server Actions for Forms?

- **No explicit API route** — cleaner code
- **CSRF protection** — automatic
- **Type-safe** — server and client share types
- **Progressive enhancement** — works without JavaScript (mostly)

### Why Cloud Run (not Vercel/Netlify)?

- **Organizational consistency** — matches Flask app infrastructure
- **Region control** — explicit australia-southeast1 placement
- **Cost predictability** — pay-per-use matches usage patterns
- **Docker familiarity** — same containerization as Flask app

### Why Standalone Output?

- **Self-contained image** — includes only necessary files
- **Small Docker image** — faster cold starts on Cloud Run
- **No persistent storage** — aligns with Cloud Run constraints
- **Horizontal scaling** — fully stateless, no image cache dependencies

## Anti-Patterns to Avoid

### Anti-Pattern 1: Hardcoding Prices

**What goes wrong:** Prices baked into component props
**Why bad:** Requires code redeploy to update pricing
**Instead:** Always read from `content/plans.json` at build time

### Anti-Pattern 2: Client-Side Data Fetching for Static Content

**What goes wrong:** Blog posts fetched via `useEffect` instead of SSG
**Why bad:** Slower first paint, SEO crawlers see empty page
**Instead:** Use `generateStaticParams()` and fetch on server during build

### Anti-Pattern 3: API Routes for Everything

**What goes wrong:** Creating `/api/get-post` endpoint instead of server component
**Why bad:** Extra HTTP request, more bytes transferred, harder to cache
**Instead:** Fetch directly in server component (no API route needed)

### Anti-Pattern 4: Mixing Server/Client Boundaries Poorly

**What goes wrong:** Serializing entire data objects to client components
**Why bad:** Larger payloads, potential security leaks, hydration mismatches
**Instead:** Pass only needed primitives, keep objects on server

### Anti-Pattern 5: Building Images Locally in Cloud Run

**What goes wrong:** Using Next.js image optimization in container
**Why bad:** Requires persistent storage Cloud Run doesn't provide
**Instead:** Disable `unoptimizedImages` in production, use CDN for image delivery

### Anti-Pattern 6: Not Using Revalidation for Dynamic Content

**What goes wrong:** Pricing page cached forever even when plans.json changes
**Why bad:** Users see stale prices, no way to update without redeployment
**Instead:** Set appropriate `revalidate` time (300s for pricing, 3600s for homepage)

## Scalability Considerations

| Concern | At 1K visits/day | At 100K visits/day | At 1M visits/day |
|---------|------------------|-------------------|------------------|
| **Static HTML cache** | Served locally | Served locally | Add Cloud CDN (cache in edge locations) |
| **Blog post count** | 50 posts fine | 500 posts fine, watch build time | 5000+ posts → consider pagination or search index |
| **Revalidation** | 60s ISR safe | 60s ISR safe | Consider longer intervals (300s) to reduce regeneration overhead |
| **Database** | None needed | None needed | Optional: Add Redis for session state or visitor tracking |
| **Images** | Static files | Static files | Add Cloud Storage bucket + CDN for image delivery |
| **API calls** | Gemini API rate limits | Monitor quota | Implement rate limiting on `/api/generate-jd` |

## Sources

- [Next.js Project Structure](https://nextjs.org/docs/app/getting-started/project-structure)
- [Getting Started: Deploying Next.js](https://nextjs.org/docs/pages/getting-started/deploying)
- [Google Cloud Next.js Quickstart](https://docs.cloud.google.com/run/docs/quickstarts/frameworks/deploy-nextjs-service)
- [How to Deploy Next.js 14 App Router to Cloud Run](https://oneuptime.com/blog/post/2026-02-17-deploy-nextjs-14-app-router-cloud-run-standalone/view)
- [Data Fetching Patterns and Best Practices](https://nextjs.org/docs/14/app/building-your-application/data-fetching/patterns)
- [Next.js Guides: ISR](https://nextjs.org/docs/app/guides/incremental-static-regeneration)
- [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [5 Design Patterns for Building Scalable Next.js Applications](https://dev.to/nithya_iyer/5-design-patterns-for-building-scalable-nextjs-applications-1c80)
- [Next.js API Routes vs Server Actions](https://dev.to/myogeshchavan97/nextjs-server-actions-vs-api-routes-dont-build-your-app-until-you-read-this-4kb9)
- [Contentful: Next.js ISR Guide](https://www.contentful.com/blog/nextjs-isr/)

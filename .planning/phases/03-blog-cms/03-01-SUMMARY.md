---
phase: 03-blog-cms
plan: 01
subsystem: ui
tags: [next.js, tailwindcss, typography, markdown, blog, seo, json-ld, sitemap]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: src/lib/blog.ts with getAllPosts, getPostBySlug, getAllSlugs interfaces
  - phase: 02-core-marketing-site
    provides: Badge, CTASection, global CSS theme tokens, site infrastructure

provides:
  - Blog index page at /blog with server-side post list and client-side category filter
  - Blog post pages at /blog/[slug] with prose typography, Article JSON-LD, static generation
  - Two SEO-optimized seed posts (Comparisons, AI in Recruitment categories)
  - BlogCard and BlogIndex reusable components
  - Extended sitemap with /blog and post slug URLs

affects: [03-02-decap-cms, 04-jd-generator, seo, content-strategy]

# Tech tracking
tech-stack:
  added: ["@tailwindcss/typography@latest"]
  patterns:
    - Server component (blog/page.tsx) passes data to 'use client' child (BlogIndex) via props
    - generateStaticParams + async getPostBySlug for SSG post pages
    - Article JSON-LD injected via dangerouslySetInnerHTML script tag in post page
    - Prose content rendered via typography plugin classes on a div with dangerouslySetInnerHTML

key-files:
  created:
    - src/app/blog/page.tsx
    - src/app/blog/[slug]/page.tsx
    - src/components/blog/BlogCard.tsx
    - src/components/blog/BlogIndex.tsx
    - content/blog/best-ats-for-recruitment-agencies-2026.md
    - content/blog/ai-changing-recruitment-agencies-2026.md
    - public/images/blog/.gitkeep
  modified:
    - src/app/globals.css
    - src/app/sitemap.ts

key-decisions:
  - "@plugin '@tailwindcss/typography' syntax used in globals.css (Tailwind v4 CSS-first approach, not tailwind.config.ts)"
  - "prose prose-lg with overrides applied inline on wrapper div (no global prose class needed)"
  - "getAllPosts() is synchronous — BlogPage server component is not async (no await needed)"
  - "params is a Promise in Next.js 16 — both generateMetadata and page component await params"
  - "sitemap function converted to async to match getAllPosts() import pattern"

patterns-established:
  - "Server/client split: data-fetching server component → 'use client' interactive child via initialPosts prop"
  - "generateStaticParams returns slug array from getAllSlugs() for full static generation at build time"
  - "JSON-LD: script tag before <main> with type=application/ld+json and dangerouslySetInnerHTML"

requirements-completed: [BLOG-01, BLOG-02, BLOG-03, BLOG-04, BLOG-05, BLOG-06, BLOG-07]

# Metrics
duration: 10min
completed: 2026-04-07
---

# Phase 3 Plan 01: Blog UI Layer Summary

**SEO-optimized blog system with @tailwindcss/typography prose rendering, client-side category filter, Article JSON-LD on post pages, and static generation of 2 seed posts at /blog and /blog/[slug]**

## Performance

- **Duration:** ~10 min
- **Started:** 2026-04-07T21:44:00Z
- **Completed:** 2026-04-07T21:47:04Z
- **Tasks:** 2
- **Files modified:** 9

## Accomplishments
- Blog index at /blog with dark navy hero, category filter pills (6 categories), and BlogCard grid
- Two static post pages generated at build time with Article JSON-LD, prose typography, and featured image
- Two real SEO-optimized seed posts: ATS comparison (~1000 words) and AI in recruitment (~950 words)
- Sitemap extended with /blog (weekly) and both post slug URLs (monthly)

## Task Commits

1. **Task 1: Install typography plugin, create blog components, and seed posts** - `eea11b6` (feat)
2. **Task 2: Blog index page, post page with JSON-LD, and sitemap extension** - `782ccca` (feat)

**Plan metadata:** (final docs commit — see below)

## Files Created/Modified
- `src/app/globals.css` - Added `@plugin "@tailwindcss/typography";`
- `src/app/blog/page.tsx` - Blog index server component with metadata
- `src/app/blog/[slug]/page.tsx` - Static post page with generateStaticParams, generateMetadata, Article JSON-LD
- `src/components/blog/BlogCard.tsx` - Post card with next/image, Badge, formatted date/reading time
- `src/components/blog/BlogIndex.tsx` - Client component with category state, filter pills, BlogCard grid, CTASection
- `src/app/sitemap.ts` - Extended with /blog index and post routes from getAllPosts()
- `content/blog/best-ats-for-recruitment-agencies-2026.md` - Seed post, Comparisons category
- `content/blog/ai-changing-recruitment-agencies-2026.md` - Seed post, AI in Recruitment category
- `public/images/blog/.gitkeep` - Ensures images dir tracked in git for Decap CMS

## Decisions Made
- Used `@plugin "@tailwindcss/typography"` in globals.css (Tailwind v4 CSS-first approach)
- BlogPage is not async — getAllPosts() is synchronous, no await needed
- Next.js 16 requires `params: Promise<{slug: string}>` with explicit await before use
- sitemap.ts converted from sync to async function to support getAllPosts() call
- Badge component used with default `variant="teal"` for category labels on both BlogCard and post page

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - build passed clean on first attempt for both tasks.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Blog system fully operational; /blog and /blog/[slug] routes serve static HTML
- Decap CMS (03-02) can write new .md files to content/blog/ and they will be picked up by getAllPosts()
- Images directory at public/images/blog/ is tracked and ready for CMS uploads
- Both BLOG-01 through BLOG-07 requirements satisfied

## Self-Check: PASSED

All files verified present. Both task commits (eea11b6, 782ccca) confirmed in git log.

---
*Phase: 03-blog-cms*
*Completed: 2026-04-07*

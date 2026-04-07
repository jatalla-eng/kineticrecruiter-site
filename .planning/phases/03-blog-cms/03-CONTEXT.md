# Phase 3: Blog & CMS - Context

**Gathered:** 2026-04-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Blog index page, individual blog post pages with markdown rendering, category filter, reading time, Article JSON-LD, static generation via generateStaticParams, and Decap CMS at /admin for non-developer blog editing via GitHub OAuth.

</domain>

<decisions>
## Implementation Decisions

### Blog post styling
- **D-01:** Use @tailwindcss/typography plugin for prose styling of rendered markdown content. Install the plugin and apply `prose` classes to the blog post content container.
- **D-02:** Blog post layout: title, metadata row (date, category badge, reading time), featured image, prose content, author attribution.

### Category taxonomy
- **D-03:** Blog categories (matching Decap CMS config from migration doc): Comparisons, AI in Recruitment, Agency Growth, Product Updates, Guides.
- **D-04:** Category filter on blog index is client-side ('use client') — filters posts without page reload.

### Sample blog content
- **D-05:** Create 2 seed blog posts as specified in migration doc:
  - `content/blog/best-ats-for-recruitment-agencies-2026.md` — Comparisons category
  - `content/blog/ai-changing-recruitment-agencies-2026.md` — AI in Recruitment category
- **D-06:** Each post has frontmatter: title, date, category, description, image, author. Content is real, SEO-optimized articles (not lorem ipsum).

### Blog index page
- **D-07:** Blog index at /blog lists all posts with BlogCard components showing title, date, category, description, featured image, and reading time.
- **D-08:** Blog cards link to /blog/[slug] individual post pages.

### Individual post pages
- **D-09:** Dynamic route at /blog/[slug]/page.tsx using generateStaticParams for build-time static generation.
- **D-10:** Each post page includes Article JSON-LD structured data (headline, datePublished, author, image, description).
- **D-11:** Reading time displayed from blog.ts readingTime calculation.

### Decap CMS setup
- **D-12:** Decap CMS at public/admin/index.html loading from CDN (unpkg.com/decap-cms@^3.0.0).
- **D-13:** Decap config at public/admin/config.yml with GitHub backend, main branch, using Netlify's free OAuth proxy (base_url: https://api.netlify.com).
- **D-14:** CMS collections: blog posts in content/blog/ with fields: title, date, category (select widget with D-03 categories), description, image, author, body (markdown).
- **D-15:** Media folder: public/images/blog, public folder: /images/blog.

### Sitemap update
- **D-16:** Extend existing src/app/sitemap.ts to include /blog and all blog post slugs from getAllPosts().

### Claude's Discretion
- Exact BlogCard component design (card vs list layout)
- Blog post page sidebar vs full-width layout
- Whether to add pagination on blog index (all posts on one page is fine for v1)
- Exact JSON-LD schema fields beyond the required ones

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Migration specification
- `ClaudeCode_NextJS_Migration_CloudRun.md` §STEP 5 — Blog system (blog.ts already implemented)
- `ClaudeCode_NextJS_Migration_CloudRun.md` §STEP 8 — Static generation for blog posts (generateStaticParams)
- `ClaudeCode_NextJS_Migration_CloudRun.md` §STEP 15 — How to add a new blog post (frontmatter format)
- `ClaudeCode_NextJS_Migration_CloudRun.md` §STEP 16 — Decap CMS setup (admin/index.html, config.yml, GitHub OAuth)

### MiniMax blog reference
- `package/kinetic-recruiter/src/pages/BlogListing.tsx` — Blog index layout and card design
- `package/kinetic-recruiter/src/pages/BlogPostAI.tsx` — Blog post page layout
- `package/kinetic-recruiter/src/pages/BlogPostComparison.tsx` — Blog post page layout variant

### Existing code (from Phase 1)
- `src/lib/blog.ts` — getAllPosts(), getPostBySlug(), getAllSlugs(), BlogPost interface (ALREADY IMPLEMENTED)
- `src/app/sitemap.ts` — Dynamic sitemap (EXTEND with blog routes)

### Existing components (from Phase 2)
- `src/components/ui/Badge.tsx` — Use for category badges on blog cards/posts
- `src/components/sections/CTASection.tsx` — Reuse at bottom of blog pages
- `src/components/layout/Navbar.tsx` — May need to add Blog link to nav

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/lib/blog.ts` — Full blog utility library already built (Phase 1). getAllPosts(), getPostBySlug(), getAllSlugs() with graceful empty-directory handling.
- `src/components/ui/Badge.tsx` — Category badge component ready to use.
- `src/components/sections/CTASection.tsx` — Bottom CTA for blog pages.
- `src/app/sitemap.ts` — Extend with blog post routes.

### Established Patterns
- Server components by default, 'use client' only for interactivity (category filter)
- generatePageMetadata() for page-level SEO
- next/image for all images with alt text
- Component organization: layout/, ui/, sections/, blog/

### Integration Points
- Blog index route: src/app/blog/page.tsx
- Blog post route: src/app/blog/[slug]/page.tsx
- Decap CMS: public/admin/index.html + public/admin/config.yml
- Sitemap: extend src/app/sitemap.ts
- Navbar: add Blog link if not present

</code_context>

<specifics>
## Specific Ideas

- Migration doc has exact Decap CMS config.yml with field definitions, widget types, and media folder settings
- Blog posts should have real, SEO-optimized content (not placeholder text) — these are marketing assets
- "Amy and anyone with GitHub repo access can use this workflow" — CMS must be non-developer friendly
- Category filter should be simple pill/button toggles, not a dropdown

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-blog-cms*
*Context gathered: 2026-04-08*

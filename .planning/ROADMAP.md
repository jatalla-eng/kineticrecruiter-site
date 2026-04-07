# Roadmap: KineticRecruiter Marketing Site

## Overview

Four phases take the project from a blank Next.js scaffold to a fully deployed marketing site on kineticrecruiter.com. The foundation phase produces a working project skeleton; the core site phase delivers every marketing page with full SEO; the blog phase adds the content publishing system with Decap CMS; the tools and go-live phase ships interactive tools and connects the live domain with CI/CD.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Next.js project scaffold with App Router, TypeScript, Tailwind, and shared infrastructure primitives (completed 2026-04-07)
- [ ] **Phase 2: Core Marketing Site** - All marketing pages (layout, homepage, pricing, feature pages, solution pages, contact) with full SEO
- [ ] **Phase 3: Blog & CMS** - Blog index, post pages, markdown rendering, and Decap CMS at /admin
- [ ] **Phase 4: Tools & Go Live** - JD Generator, comparison page, ROI calculator, video, Dockerfile, Cloud Build CI/CD, and custom domain

## Phase Details

### Phase 1: Foundation
**Goal**: A working Next.js project that compiles, serves a placeholder homepage, and contains the shared configuration all pages depend on
**Depends on**: Nothing (first phase)
**Requirements**: INFRA-01, INFRA-02
**Success Criteria** (what must be TRUE):
  1. `npm run dev` starts the dev server without errors and returns a 200 response at localhost:3000
  2. TypeScript and Tailwind are configured — a sample component using Tailwind classes compiles cleanly
  3. Brand color tokens and Inter font are available globally for use in any component
  4. `plans.json` with the three pricing tiers is present and importable by any page
**Plans**: 2 plans

Plans:
- [x] 01-01-PLAN.md — Scaffold Next.js 16 project with Tailwind brand tokens, Inter font, standalone output, and placeholder homepage
- [x] 01-02-PLAN.md — Create shared lib primitives: plans.json, plans.ts, metadata.ts, blog.ts

### Phase 2: Core Marketing Site
**Goal**: Every marketing page is server-side rendered, discoverable by search engines, and matches the existing MiniMax site design
**Depends on**: Phase 1
**Requirements**: LAYOUT-01, LAYOUT-02, LAYOUT-03, LAYOUT-04, LAYOUT-05, HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, PRICE-01, PRICE-02, PRICE-03, PRICE-04, PRICE-05, FEAT-01, FEAT-02, FEAT-03, FEAT-04, FEAT-05, SOL-01, SOL-02, SOL-03, CONTACT-01, CONTACT-02, SEO-01, SEO-02, SEO-03, SEO-04, SEO-05
**Success Criteria** (what must be TRUE):
  1. Navigating to / renders the full homepage (hero, feature grid, comparison strip, pricing preview, CTA) with visible HTML in view-source — no blank body
  2. The nav bar shows on every page with a working mobile hamburger menu, and the footer appears consistently site-wide
  3. The pricing page displays all three tiers with a working monthly/annual toggle — prices come from plans.json, not hardcoded strings
  4. All four feature pages and both solution pages are reachable via navigation and render their content server-side
  5. `curl https://kineticrecruiter.com/sitemap.xml` (or local equivalent) returns a valid sitemap listing all pages; every page has a unique title and OG tags visible in the HTML source
**Plans**: 5 plans

Plans:
- [x] 02-01-PLAN.md — Layout shell: Navbar, MobileMenu, Footer, images, root layout wiring, 404 page
- [x] 02-02-PLAN.md — Homepage: Hero, FeatureGrid, ComparisonStrip, PricingPreview, SocialProof, CTASection
- [ ] 02-03-PLAN.md — Pricing page: PricingToggle, PricingCard, FAQ accordion, Button + Badge UI primitives
- [ ] 02-04-PLAN.md — Feature pages (4) + Solution pages (2) + FeatureSection reusable component
- [ ] 02-05-PLAN.md — Contact page, sitemap.ts, robots.txt, og-default.jpg

### Phase 3: Blog & CMS
**Goal**: Non-developers can publish blog posts through a visual editor, and all posts render as server-side HTML with structured data for search engines
**Depends on**: Phase 2
**Requirements**: BLOG-01, BLOG-02, BLOG-03, BLOG-04, BLOG-05, BLOG-06, BLOG-07, CMS-01, CMS-02, CMS-03, CMS-04
**Success Criteria** (what must be TRUE):
  1. The blog index at /blog lists all posts with title, date, category, and description, and the category filter narrows the list without a page reload
  2. Each blog post page renders markdown as styled HTML, shows a reading time estimate, and includes Article JSON-LD in the page source
  3. Blog post pages are statically generated at build time — a `next build` completes without errors and produces static HTML files for each post
  4. A non-developer can log in to /admin, write a new post using the WYSIWYG editor with image uploads, click publish, and a markdown file is committed to the repo triggering a rebuild
**Plans**: TBD
**UI hint**: yes

### Phase 4: Tools & Go Live
**Goal**: Interactive tools are live for prospects, and the site deploys automatically to kineticrecruiter.com on every push to main
**Depends on**: Phase 3
**Requirements**: JDG-01, JDG-02, JDG-03, JDG-04, JDG-05, CONTACT-01, CONTACT-02, COMP-01, ROI-01, ROI-02, VIDEO-01, INFRA-03, INFRA-04, INFRA-05, INFRA-06, INFRA-07
**Success Criteria** (what must be TRUE):
  1. A user fills in the JD Generator form, submits it, and receives a formatted job description — the Gemini API key is never visible in browser network requests
  2. The ROI calculator accepts team size, placements, and current process inputs and displays estimated time saved, cost reduction, and payback period without a page reload
  3. `docker build` produces a runnable image; pushing to main triggers Cloud Build and the updated site appears at kineticrecruiter.com within a few minutes
  4. kineticrecruiter.com and www.kineticrecruiter.com both resolve to the Cloud Run service with a valid TLS certificate
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 2/2 | Complete   | 2026-04-07 |
| 2. Core Marketing Site | 2/5 | In Progress|  |
| 3. Blog & CMS | 0/TBD | Not started | - |
| 4. Tools & Go Live | 0/TBD | Not started | - |

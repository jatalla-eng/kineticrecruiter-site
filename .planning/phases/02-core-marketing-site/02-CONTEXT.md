# Phase 2: Core Marketing Site - Context

**Gathered:** 2026-04-07
**Status:** Ready for planning

<domain>
## Phase Boundary

All marketing pages server-side rendered: responsive layout (nav + footer), homepage, pricing page, 4 feature pages, 2 solution pages, contact page, 404 page, full SEO metadata, dynamic sitemap, and robots.txt. Matches existing MiniMax site design with room for small improvements.

</domain>

<decisions>
## Implementation Decisions

### Page content source
- **D-01:** Copy content (text, headings, descriptions, CTAs) from MiniMax source files at `package/kinetic-recruiter/src/pages/` and `package/kinetic-recruiter/src/components/`. Recreate the same look and feel in Next.js server components.
- **D-02:** Do NOT import or convert MiniMax React components directly — rebuild cleanly using Next.js patterns (server components by default, 'use client' only for interactivity).
- **D-03:** Small improvements welcome (better spacing, cleaner code, modern patterns) but preserve the overall design language.

### Component architecture
- **D-04:** Organize components per migration doc structure:
  - `src/components/layout/` — Navbar.tsx, Footer.tsx, MobileMenu.tsx
  - `src/components/ui/` — Button.tsx, Badge.tsx, Card.tsx, FAQ.tsx, PricingCard.tsx, ComparisonTable.tsx, FeatureSection.tsx
  - `src/components/sections/` — Hero.tsx, FeatureGrid.tsx, ComparisonStrip.tsx, PricingPreview.tsx, CTASection.tsx
- **D-05:** Reusable FeatureSection component for alternating text+image layout used across feature pages.
- **D-06:** CTASection component reused across all pages as bottom CTA.

### Navigation structure
- **D-07:** Reference MiniMax Navbar.tsx (`package/kinetic-recruiter/src/components/Navbar.tsx`) for nav items, structure, and layout. Recreate with Next.js Link components.
- **D-08:** Mobile hamburger menu as a separate MobileMenu.tsx client component ('use client' for toggle state).
- **D-09:** Persistent "Start Free Trial" CTA button in nav.

### Image handling
- **D-10:** Copy relevant image assets from `package/imgs/` and `package/kinetic-recruiter/public/` to `public/images/`. Use next/image for all images with proper alt text.
- **D-11:** SVG illustrations from MiniMax FeatureIllustration components — extract inline SVGs or recreate as image assets.

### Pricing page
- **D-12:** Monthly/annual toggle requires a client component wrapper ('use client') for toggle state. PricingCard components read entirely from plans.json via getAllPlans().
- **D-13:** FAQ accordion also requires 'use client' for expand/collapse state.

### SEO implementation
- **D-14:** Every page exports metadata using generatePageMetadata() from src/lib/metadata.ts.
- **D-15:** Dynamic sitemap at src/app/sitemap.ts listing all static pages.
- **D-16:** robots.txt at public/robots.txt with sitemap reference.
- **D-17:** All images use next/image with descriptive alt text.

### Contact page
- **D-18:** Contact form captures name, email, company, message, and selected plan (if referred from pricing via query param ?plan=agency).
- **D-19:** Form submission can be a simple mailto or API endpoint — no backend processing required for v1.

### Claude's Discretion
- Exact Tailwind utility classes and spacing values (match MiniMax visually)
- Animation/transition details on nav, FAQ accordion, pricing toggle
- Exact responsive breakpoints (follow Tailwind defaults)
- Whether to add social proof/testimonials section on homepage (present in MiniMax)
- 404 page design and copy

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Migration specification
- `ClaudeCode_NextJS_Migration_CloudRun.md` — Complete migration guide with page-by-page instructions
- `ClaudeCode_NextJS_Migration_CloudRun.md` §STEP 2 — Project structure (component organization)
- `ClaudeCode_NextJS_Migration_CloudRun.md` §STEP 6 — Root layout
- `ClaudeCode_NextJS_Migration_CloudRun.md` §STEP 7 — Page-by-page rebuild instructions
- `ClaudeCode_NextJS_Migration_CloudRun.md` §STEP 14 — robots.txt and sitemap

### MiniMax design reference (READ for content and layout)
- `package/kinetic-recruiter/src/components/Navbar.tsx` — Navigation structure and items
- `package/kinetic-recruiter/src/components/Footer.tsx` — Footer layout and links
- `package/kinetic-recruiter/src/components/Hero.tsx` — Homepage hero section
- `package/kinetic-recruiter/src/components/Features.tsx` — Feature grid section
- `package/kinetic-recruiter/src/components/Comparison.tsx` — Comparison strip
- `package/kinetic-recruiter/src/components/PricingPreview.tsx` — Homepage pricing preview
- `package/kinetic-recruiter/src/components/CTASection.tsx` — Reusable CTA section
- `package/kinetic-recruiter/src/components/FAQ.tsx` — FAQ accordion
- `package/kinetic-recruiter/src/components/NoHiddenCosts.tsx` — No hidden costs section
- `package/kinetic-recruiter/src/components/SocialProof.tsx` — Social proof section
- `package/kinetic-recruiter/src/components/Testimonials.tsx` — Testimonials section
- `package/kinetic-recruiter/src/pages/PricingPage.tsx` — Pricing page layout
- `package/kinetic-recruiter/src/pages/FeatureAI.tsx` — AI Candidate Intelligence page
- `package/kinetic-recruiter/src/pages/FeatureIntake.tsx` — Candidate Intake page
- `package/kinetic-recruiter/src/pages/FeatureAgency.tsx` — Agency Workflow page
- `package/kinetic-recruiter/src/pages/FeatureTeam.tsx` — Team Platform page
- `package/kinetic-recruiter/src/pages/SolutionsAgencies.tsx` — Recruitment Agencies page
- `package/kinetic-recruiter/src/pages/SolutionsInHouse.tsx` — In-House Teams page
- `package/kinetic-recruiter/src/pages/Layout.tsx` — Overall layout structure

### Design assets
- `package/imgs/` — Image assets (logos, photos, illustrations)
- `package/kinetic-recruiter/public/` — Public assets from MiniMax build
- `package/kinetic-recruiter/tailwind.config.js` — Original Tailwind config for cross-reference

### Existing code (from Phase 1)
- `src/lib/plans.ts` — getPlan(), getAllPlans() for pricing data
- `src/lib/metadata.ts` — generatePageMetadata() for SEO
- `src/app/layout.tsx` — Root layout with Inter font (extend, don't replace)
- `tailwind.config.ts` — Brand tokens already configured

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/lib/plans.ts` — getAllPlans() returns typed pricing data sorted by sort_order. Use in PricingCard and PricingPreview.
- `src/lib/metadata.ts` — generatePageMetadata() generates full Metadata objects. Call from every page's metadata export.
- `src/app/layout.tsx` — Root layout with Inter font and metadataBase. Add Navbar and Footer here.
- `tailwind.config.ts` — All brand colors and maxWidth tokens ready to use.

### Established Patterns
- Server components by default — only add 'use client' for interactivity (pricing toggle, mobile menu, FAQ accordion)
- Next.js App Router file-based routing — each page is a `page.tsx` in its route directory
- `@/*` import alias for clean imports

### Integration Points
- Root layout (`src/app/layout.tsx`) — Add Navbar and Footer components here (wraps all pages)
- Each page exports `metadata` or `generateMetadata` for SEO
- Pricing components import from `src/lib/plans.ts`
- Sitemap at `src/app/sitemap.ts` lists all static page routes

</code_context>

<specifics>
## Specific Ideas

- "Recreate the same look and feel in Next.js" — visual fidelity to MiniMax is important
- "Do not try to import or convert the MiniMax React components directly — rebuild them cleanly"
- Migration doc §STEP 7 has page-specific notes for each page
- MiniMax has FeatureIllustration components (1-6) that are inline SVG illustrations — need to handle these appropriately
- SocialProof and Testimonials components exist in MiniMax — include on homepage if present in design

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-core-marketing-site*
*Context gathered: 2026-04-07*

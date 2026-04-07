---
phase: 02-core-marketing-site
plan: 05
subsystem: ui
tags: [nextjs, seo, sitemap, contact-form, og-image, robots-txt]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: generatePageMetadata in src/lib/metadata.ts — used in contact page
  - phase: 02-core-marketing-site
    provides: all Phase 2 page routes listed in sitemap

provides:
  - Contact page at /contact with 5-field form pre-filled from ?plan= query param
  - Dynamic sitemap at /sitemap.xml listing all 9 Phase 2 routes
  - robots.txt allowing all crawlers with Sitemap reference
  - og-default.jpg at public/og-default.jpg and public/images/og-default.jpg as fallback OG image

affects: [phase-03-blog, seo-crawl, google-search-console]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - useSearchParams() in client component wrapped in Suspense boundary on server page
    - mailto: form submission pattern (D-19 — no backend for v1)
    - Next.js MetadataRoute.Sitemap for dynamic sitemap generation

key-files:
  created:
    - src/app/contact/page.tsx
    - src/components/contact/ContactForm.tsx
    - src/app/sitemap.ts
    - public/robots.txt
    - public/og-default.jpg
    - public/images/og-default.jpg
  modified: []

key-decisions:
  - "ContactForm uses mailto: submission for v1 (D-19) — no backend processing required"
  - "og-default.jpg placed at both public/og-default.jpg and public/images/og-default.jpg — metadata.ts defaults to /images/ path, plan spec references root path"
  - "sitemap.ts excludes blog posts — Phase 3 will add dynamic blog routes when blog.ts is wired"

patterns-established:
  - "useSearchParams pattern: client component with useSearchParams must be wrapped in <Suspense> in the server page component"
  - "Contact form state: single formData object with all 5 fields, normalizePlan() for query param case-insensitive matching"

requirements-completed: [CONTACT-01, CONTACT-02, SEO-01, SEO-02, SEO-03, SEO-04]

# Metrics
duration: 12min
completed: 2026-04-07
---

# Phase 02 Plan 05: Contact Page and SEO Infrastructure Summary

**Contact page with ?plan= pre-fill via useSearchParams, mailto form submission, dynamic sitemap covering 9 routes, robots.txt with Sitemap reference, and og-default.jpg placed for all pages**

## Performance

- **Duration:** 12 min
- **Started:** 2026-04-07T12:35:00Z
- **Completed:** 2026-04-07T12:47:00Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- Contact page at /contact with 5-field form (name, email, company, message, plan); ?plan=agency pre-selects Agency option
- mailto: submission handler — no backend needed for v1 (D-19)
- sitemap.ts generates /sitemap.xml listing 9 Phase 2 routes with correct priorities and changeFrequency values
- robots.txt allows all crawlers with Sitemap: https://kineticrecruiter.com/sitemap.xml reference
- og-default.jpg (357KB landscape team photo) placed in public/ for SEO OG fallback

## Task Commits

1. **Task 1: Build contact page with pre-fillable form** - `79ef6f7` (feat)
2. **Task 2: Create sitemap.ts, robots.txt, and default OG image** - `f613d3c` (feat)

## Files Created/Modified

- `src/app/contact/page.tsx` - Server component contact page with two-column layout and Suspense boundary
- `src/components/contact/ContactForm.tsx` - Client component with useSearchParams, 5 form fields, mailto submit
- `src/app/sitemap.ts` - Next.js MetadataRoute.Sitemap with 9 Phase 2 routes
- `public/robots.txt` - Allows all crawlers, references /sitemap.xml
- `public/og-default.jpg` - 357KB landscape team photo (copied from package/imgs/)
- `public/images/og-default.jpg` - Same image at /images/ path (matches metadata.ts default)

## Decisions Made

- `og-default.jpg` placed at both `public/og-default.jpg` and `public/images/og-default.jpg` because `src/lib/metadata.ts` defaults to `/images/og-default.jpg` while the plan spec referenced `/og-default.jpg`. Both exist now — no mismatch.
- Blog posts intentionally excluded from sitemap — Phase 3 will add dynamic blog routes.
- `normalizePlan()` helper added to ContactForm for case-insensitive ?plan= matching (e.g., `?plan=agency` → "Agency").

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] OG image placed at two paths**
- **Found during:** Task 2 (OG image placement)
- **Issue:** Plan specified `public/og-default.jpg` but `src/lib/metadata.ts` defaults to `/images/og-default.jpg`. Using only the plan-specified path would mean all pages fall back to a 404 OG image.
- **Fix:** Copied image to both `public/og-default.jpg` and `public/images/og-default.jpg`
- **Files modified:** public/og-default.jpg, public/images/og-default.jpg
- **Verification:** Both files exist (357845 bytes each); build passes; metadata.ts default path resolves
- **Committed in:** f613d3c (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 missing critical)
**Impact on plan:** Essential correctness fix — all pages now have a valid OG image fallback. No scope creep.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- All SEO infrastructure complete: sitemap, robots.txt, OG image, contact form, page metadata on all Phase 2 pages
- Phase 3 (blog system) can extend sitemap.ts to dynamically include blog post routes from `content/blog/`
- Google Search Console can be submitted with /sitemap.xml after deployment

---
*Phase: 02-core-marketing-site*
*Completed: 2026-04-07*

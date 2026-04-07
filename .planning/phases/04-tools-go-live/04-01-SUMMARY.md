---
phase: 04-tools-go-live
plan: 01
subsystem: ui
tags: [gemini, react-phone-number-input, libphonenumber-js, next-api-routes, roi-calculator, comparison-page, sitemap]

# Dependency graph
requires:
  - phase: 02-core-marketing-site
    provides: Button, Badge, CTASection, generatePageMetadata, plans.ts, metadata.ts
  - phase: 01-foundation
    provides: Next.js App Router scaffold, Tailwind v4 brand tokens

provides:
  - /tools landing page listing JD Generator tool
  - /tools/job-description-generator — AI JD generation with lead capture form
  - /api/generate-jd — server-side POST route calling Gemini 1.5 Flash
  - CountryPhoneInput component wrapping react-phone-number-input
  - /roi — live ROI calculator reading Professional tier price from getAllPlans()
  - /compare — honest 3-column ATS comparison table (KineticRecruiter vs Greenhouse vs Lever)
  - VideoEmbed component with placeholder and iframe modes
  - sitemap.ts extended with 4 new routes

affects:
  - 04-02 (deployment/env vars — GEMINI_API_KEY needed in Cloud Run)
  - any phase adding more tools under /tools

# Tech tracking
tech-stack:
  added:
    - "@google/generative-ai (Gemini API client)"
    - "react-phone-number-input (country phone selector)"
    - "libphonenumber-js (phone validation)"
  patterns:
    - "Server page + client form split: page.tsx exports metadata (server), _Form.tsx has 'use client' state"
    - "Server-side API key guard: check process.env.GEMINI_API_KEY in route before calling external API"
    - "ROI from plans.ts: getAllPlans().find(p => p.key === 'professional')?.monthly_price_cents — never hardcoded"

key-files:
  created:
    - src/components/tools/CountryPhoneInput.tsx
    - src/app/api/generate-jd/route.ts
    - src/app/tools/job-description-generator/page.tsx
    - src/app/tools/job-description-generator/_JDGeneratorForm.tsx
    - src/components/tools/ROICalculator.tsx
    - src/app/roi/page.tsx
    - src/app/compare/page.tsx
    - src/components/video/VideoEmbed.tsx
    - src/app/tools/page.tsx
  modified:
    - src/app/sitemap.ts

key-decisions:
  - "Button component lacks disabled prop — used native <button> for submit to support disabled state during loading"
  - "JD Generator uses server page + _JDGeneratorForm.tsx client split for metadata + 'use client' coexistence (Next.js 16 pattern)"
  - "VideoEmbed placeholder mode uses teal gradient with lucide Play icon — no external image dependency"
  - "Comparison table data is static in compare/page.tsx as server component — no client state needed"

patterns-established:
  - "Tools pattern: server page exports metadata, renders client component from sibling _ComponentName.tsx"
  - "CountryPhoneInput: defaultCountry=AU for Australian business default"

requirements-completed: [JDG-01, JDG-02, JDG-03, JDG-04, JDG-05, CONTACT-01, CONTACT-02, COMP-01, ROI-01, ROI-02, VIDEO-01]

# Metrics
duration: 43min
completed: 2026-04-07
---

# Phase 4 Plan 01: Tools Go Live Summary

**Gemini-powered JD Generator with lead capture, live ROI calculator from plans.ts, honest 3-column comparison table, VideoEmbed placeholder, and /tools landing page — all 4 routes in sitemap**

## Performance

- **Duration:** ~43 min
- **Started:** 2026-04-07T08:44:04Z
- **Completed:** 2026-04-07T09:27:00Z
- **Tasks:** 2 auto + 1 checkpoint (auto-approved)
- **Files modified:** 10 (9 created, 1 modified)

## Accomplishments

- JD Generator with Gemini 1.5 Flash API: lead capture (name, company, email, phone+country) required before generation; server-side API key never exposed to client
- ROI Calculator reads Professional tier price from `getAllPlans()` — 4 input fields, 4 live result cards updated via useMemo
- Honest comparison table for KineticRecruiter vs Greenhouse vs Lever including real cons for KineticRecruiter (fewer integrations, limited onboarding, no CSM on lower tiers)
- VideoEmbed component: renders `<iframe>` when videoUrl provided, teal gradient placeholder with Play icon when absent
- Tools landing page with extensible tool card grid
- Sitemap extended with /tools, /tools/job-description-generator, /roi, /compare

## Task Commits

1. **Task 1: JD Generator** - `4aa9fcf` (feat)
2. **Task 2: ROI Calculator, Comparison, Video, Tools landing, Sitemap** - `3cad093` (feat)
3. **Checkpoint: human-verify** - auto-approved (--auto mode)

## Files Created/Modified

- `src/components/tools/CountryPhoneInput.tsx` - react-phone-number-input wrapper, defaultCountry=AU
- `src/app/api/generate-jd/route.ts` - POST handler: validates fields, checks GEMINI_API_KEY, calls Gemini 1.5 Flash
- `src/app/tools/job-description-generator/page.tsx` - Server page with metadata
- `src/app/tools/job-description-generator/_JDGeneratorForm.tsx` - 'use client' form with lead capture + job details + output rendering
- `src/components/tools/ROICalculator.tsx` - Live ROI calculator, reads proFee from getAllPlans()
- `src/app/roi/page.tsx` - Server page with metadata, ROICalculator, CTASection
- `src/app/compare/page.tsx` - Static comparison table, 3-column, honest pros/cons
- `src/components/video/VideoEmbed.tsx` - Optional videoUrl prop; placeholder mode with teal gradient + Play icon
- `src/app/tools/page.tsx` - Tools landing, extensible tool card grid with Badge and Button
- `src/app/sitemap.ts` - Extended with 4 new routes

## Decisions Made

- Button component doesn't support `disabled` prop — used native `<button>` element for the submit button to support loading/disabled state
- Used server page + `_JDGeneratorForm.tsx` client split (Next.js 16 pattern) to export metadata from server component while keeping form state in client component
- VideoEmbed placeholder uses teal gradient with lucide Play icon rather than an external image to avoid asset dependency

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Button component missing disabled prop**
- **Found during:** Task 1 (JD Generator form)
- **Issue:** `Button` component interface does not include `disabled` prop; TypeScript error prevented build
- **Fix:** Replaced `<Button disabled={loading}>` with native `<button disabled={loading}>` using matching Tailwind classes
- **Files modified:** `src/app/tools/job-description-generator/_JDGeneratorForm.tsx`
- **Verification:** `npm run build` passed
- **Committed in:** `4aa9fcf` (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - Bug)
**Impact on plan:** Minimal — single component swap, no functionality change.

## Issues Encountered

- Button component lacks `disabled` prop — resolved via Rule 1 auto-fix using native button element

## User Setup Required

**External services require manual configuration:**

- **GEMINI_API_KEY** — Required for JD Generator to work at runtime
  - Get free key: https://aistudio.google.com/apikey
  - Add to Cloud Run: `gcloud run services update kineticrecruiter-site --region australia-southeast1 --set-env-vars GEMINI_API_KEY=YOUR_KEY`
  - Or set in Cloud Run console under Environment Variables

## Known Stubs

None — all data is live. ROI calculator reads real pricing from plans.ts. Comparison table is static content (intentional, no dynamic data needed).

## Next Phase Readiness

- All 4 tool routes live and building cleanly
- GEMINI_API_KEY must be set in Cloud Run before JD Generator works in production
- VideoEmbed is ready to receive a real videoUrl prop when product tour video is recorded
- /tools page is extensible — add more tool cards to the `tools` array

---
*Phase: 04-tools-go-live*
*Completed: 2026-04-07*

---
phase: 02-core-marketing-site
plan: 02
subsystem: homepage
tags: [homepage, sections, ssr, seo, server-components]
dependency_graph:
  requires:
    - 01-02 (plans.ts getAllPlans, metadata.ts generatePageMetadata)
  provides:
    - Homepage / with full SSR section components
    - Reusable CTASection for feature/solution pages
  affects:
    - src/app/page.tsx (homepage entry point)
tech_stack:
  added: []
  patterns:
    - Server components for all section components (no 'use client')
    - getAllPlans() called directly inside server component (no fetch)
    - Tailwind v4 brand color literals (#0d8488, #1a2332, #E8F5F5)
    - generatePageMetadata for SSR metadata/OG/Twitter tags
key_files:
  created:
    - src/components/sections/Hero.tsx
    - src/components/sections/FeatureGrid.tsx
    - src/components/sections/ComparisonStrip.tsx
    - src/components/sections/PricingPreview.tsx
    - src/components/sections/CTASection.tsx
    - src/components/sections/SocialProof.tsx
  modified:
    - src/app/page.tsx
decisions:
  - CTASection accepts optional props with defaults from MiniMax copy, enabling reuse across feature and solution pages
  - Hero uses inline JSX browser mockup (no next/image) — matches MiniMax which uses an inline SVG/JSX mockup, not a raster image
  - ComparisonStrip combines NoHiddenCosts ($0/$0/$0) and comparison table in one dark section — matches plan spec
  - SocialProof uses initials avatars instead of MiniMax image imports (MiniMax used /public/*.png assets not present in Next.js project)
metrics:
  duration: 4 minutes
  completed: "2026-04-07T12:35:17Z"
  tasks: 2
  files_created: 7
  files_modified: 1
---

# Phase 02 Plan 02: Homepage Section Components Summary

Built all 6 homepage section components as Next.js server components and composed them into the homepage page.tsx, replacing the Phase 1 placeholder. Every section renders full server-side HTML for SEO and AI discoverability.

## What Was Built

**Hero** (`src/components/sections/Hero.tsx`) — Full-width gradient section with browser Kanban mockup illustration (inline JSX, exact MiniMax structure), "Built for recruitment agencies" badge with pulse dot, h1 headline, subheadline, 3 trust indicator bullets, "Start Free Trial" teal button, "See Pricing" outline button.

**FeatureGrid** (`src/components/sections/FeatureGrid.tsx`) — 6-card grid on `lg:grid-cols-3` with lucide icons (Search, Sparkles, FileText, Building2, LayoutGrid, Upload). Feature titles and descriptions taken directly from MiniMax Features.tsx: AI Candidate Discovery, AI Candidate Scoring, AI Career Highlights, Client CRM, Job Shortlist Board, Resume Intake.

**ComparisonStrip** (`src/components/sections/ComparisonStrip.tsx`) — Dark `bg-[#1a2332]` section combining the MiniMax NoHiddenCosts ($0 implementation, $0 training, $0 AI add-on) cards with the AI features comparison table (KineticRecruiter vs Bullhorn vs Recruiterflow). Exact copy from MiniMax source.

**PricingPreview** (`src/components/sections/PricingPreview.tsx`) — Reads `getAllPlans()` server-side. Renders all 3 plans with `monthly_price_display`, `tagline`, `badge`, `cta_text`, and `cta_url` from plans.json. Professional plan highlighted with border, scale transform, and navy background. No hardcoded prices.

**CTASection** (`src/components/sections/CTASection.tsx`) — Reusable component with optional props: `headline`, `subheadline`, `primaryCTA`, `secondaryCTA`. Defaults match MiniMax CTASection.tsx copy. Teal gradient background, two buttons.

**SocialProof** (`src/components/sections/SocialProof.tsx`) — 4-icon stats strip (BrainCircuit, Database, Building2, BadgeDollarSign), 3 testimonial cards with quotes, names, roles, and companies from MiniMax Testimonials.tsx, metric stats row (500+ Agencies, 50,000+ Candidates Placed, 40% Faster Placements, 4.9/5 Rating).

**Homepage** (`src/app/page.tsx`) — Replaces Phase 1 placeholder. Server component exporting `generatePageMetadata` metadata. Renders sections in order: Hero → FeatureGrid → ComparisonStrip → PricingPreview → SocialProof → CTASection in a `<main className="flex flex-col">`.

## Deviations from Plan

### Auto-fixed Issues

None — plan executed exactly as written.

### Deviation Notes

**1. [Design Choice] Hero uses inline JSX mockup, not next/image**
- **Found during:** Task 1
- **Reason:** MiniMax Hero.tsx uses an inline JSX browser/Kanban mockup illustration (not a raster image file). The plan mentioned `next/image` as a fallback if no browser mockup was found, but MiniMax does use a browser mockup. The inline JSX was preserved as it provides richer visual fidelity and no image asset is required.

**2. [Design Choice] SocialProof uses initials avatars**
- **Found during:** Task 2
- **Reason:** MiniMax Testimonials.tsx imports `/recruiter-1.png`, `/recruiter-2.png`, `/recruiter-3.png` from the MiniMax `/public/` directory. These assets do not exist in the Next.js project public directory. Initials avatars (same pattern as in the Hero mockup) are used as server-rendered alternatives. No stub — content is complete, images can be added later when assets are available.

## Known Stubs

None — all section content is fully rendered with real data or static content from MiniMax source.

## Self-Check: PASSED

Files exist:
- src/components/sections/Hero.tsx ✓
- src/components/sections/FeatureGrid.tsx ✓
- src/components/sections/ComparisonStrip.tsx ✓
- src/components/sections/PricingPreview.tsx ✓
- src/components/sections/CTASection.tsx ✓
- src/components/sections/SocialProof.tsx ✓
- src/app/page.tsx ✓

Commits: e4fedce (Task 1), 9aa11ac (Task 2) — both verified in git log.

Build: `npm run build` exits 0 with 0 TypeScript errors. Homepage prerendered as static content at /.

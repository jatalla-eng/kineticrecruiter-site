---
phase: 02-core-marketing-site
plan: 03
subsystem: pricing
tags: [pricing, client-components, accordion, toggle, ssr, seo]
dependency_graph:
  requires:
    - 01-02 (plans.ts getAllPlans, metadata.ts generatePageMetadata)
    - 02-02 (CTASection for bottom of pricing page)
  provides:
    - /pricing page with full SSR metadata
    - PricingToggle (client) — monthly/annual switch + 3-column card grid
    - PricingCard — reads Plan prop, toggle-aware price display
    - FAQ accordion (client) — 6 questions, expand/collapse
    - Button UI primitive (primary/secondary/outline variants)
    - Badge UI primitive (teal/amber/navy variants)
  affects:
    - src/app/pricing/page.tsx
tech_stack:
  added: []
  patterns:
    - Client components (PricingToggle, FAQ, Button) isolated to leaf nodes
    - Server page composes client components for SSR outer shell + metadata
    - getAllPlans() called inside client component (JSON bundled at build time)
    - Tailwind v4 brand color literals (#0d8488, #1a2332, #E8F5F5, #E8A838)
    - Pricing data never hardcoded — always from plans.json via getAllPlans()
key_files:
  created:
    - src/components/ui/Button.tsx
    - src/components/ui/Badge.tsx
    - src/components/ui/PricingCard.tsx
    - src/components/ui/PricingToggle.tsx
    - src/components/ui/FAQ.tsx
    - src/app/pricing/page.tsx
  modified: []
decisions:
  - Button marked 'use client' — leaf component used everywhere, onClick requires client; minimal overhead
  - PricingToggle calls getAllPlans() client-side — Next.js bundles JSON imports at build time, works correctly
  - FAQ questions sourced from MiniMax FAQ.tsx (6 questions) not PricingPage.tsx (9 questions) — FAQ.tsx has cleaner product-focused set
  - PricingCard uses border-2 + scale-105 for Professional plan prominence (white card treatment vs MiniMax dark navy card)
metrics:
  duration: 8 minutes
  completed: "2026-04-07T13:10:00Z"
  tasks: 2
  files_created: 6
  files_modified: 0
---

# Phase 02 Plan 03: Pricing Page Summary

Pricing page at /pricing with 3-column plan cards sourced from getAllPlans(), monthly/annual toggle switching prices, FAQ accordion with 6 questions, and full SSR metadata — using reusable Button and Badge UI primitives created alongside.

## What Was Built

**Button** (`src/components/ui/Button.tsx`) — 'use client' leaf component. 3 variants: primary (teal fill), secondary (navy fill), outline (teal border). 3 sizes: sm/md/lg. href prop renders as Next.js Link, otherwise renders as button element.

**Badge** (`src/components/ui/Badge.tsx`) — Server component. 3 variants: teal (default), amber, navy. Rounded-full pill. Used for "Most Popular" label on Professional plan card.

**PricingCard** (`src/components/ui/PricingCard.tsx`) — Server component. Accepts `plan: Plan` and `isAnnual: boolean` props. Shows `annual_price_display` or `monthly_price_display` based on toggle. Renders Badge if `plan.badge` is non-null. Shows `features_intro` as italic intro text. Each feature has Check icon from lucide-react. Professional plan (badge = "Most Popular") gets border-2 + scale-105 for visual prominence.

**PricingToggle** (`src/components/ui/PricingToggle.tsx`) — 'use client', useState for `isAnnual`. Pill toggle switcher with Monthly/Annual buttons. Annual button shows "Save 17%" amber badge when monthly is active to prompt switching. Calls `getAllPlans()` to get plan data, renders 3-column grid of PricingCard components.

**FAQ** (`src/components/ui/FAQ.tsx`) — 'use client', useState for openIndex. 6 FAQ questions and answers copied exactly from MiniMax FAQ.tsx. ChevronDown rotates 180deg when open. Border + rounded-xl accordion style.

**Pricing Page** (`src/app/pricing/page.tsx`) — Server component with SSR metadata via generatePageMetadata. Hero section with gradient background, page heading/subheading from MiniMax PricingPage.tsx. Renders PricingToggle (client), FAQ (client), CTASection at bottom.

## Deviations from Plan

### Auto-fixed Issues

None — plan executed exactly as written.

### Deviation Notes

**1. [Design Choice] FAQ source: used FAQ.tsx (6 items) not PricingPage.tsx (9 items)**
- **Found during:** Task 2
- **Reason:** The plan specifies reading FAQ questions from MiniMax FAQ.tsx. MiniMax FAQ.tsx has 6 product-focused questions. MiniMax PricingPage.tsx has 9 billing-focused questions. The plan explicitly says "copy exact text from MiniMax FAQ.tsx" — the 6-question set from FAQ.tsx was used as instructed.

**2. [Design Choice] PricingCard uses white card treatment for all plans**
- **Found during:** Task 1
- **Reason:** MiniMax uses navy background for the Professional (highlighted) card. The Next.js design keeps all cards white (bg-white) and uses border-2 + scale-105 for prominence instead. This aligns with the plan spec: "bg-white rounded-2xl border border-gray-200 p-8" for all cards, with "border-2 border-[#0d8488] and scale-105 for visual prominence" on the highlighted plan.

## Known Stubs

None — pricing data is fully wired from getAllPlans()/plans.json. No hardcoded prices. All 3 plan tiers, toggle, and FAQ content is complete.

## Self-Check: PASSED

Files exist:
- src/components/ui/Button.tsx ✓
- src/components/ui/Badge.tsx ✓
- src/components/ui/PricingCard.tsx ✓
- src/components/ui/PricingToggle.tsx ✓
- src/components/ui/FAQ.tsx ✓
- src/app/pricing/page.tsx ✓

Commits: 4bb8c7d (Task 1), 55be063 (Task 2) — both verified in git log.

Build: `npm run build` exits 0 with 0 TypeScript errors. /pricing prerendered as static content with SSR metadata.

---
phase: 01-foundation
plan: 02
subsystem: lib-primitives
tags: [plans, pricing, metadata, seo, blog, markdown, nextjs]
dependency_graph:
  requires: [01-01]
  provides: [plans-json-pricing-data, plans-ts-typed-accessors, metadata-ts-seo-helper, blog-ts-markdown-utilities]
  affects: [all-phase-2-pages, pricing-page, blog-pages]
tech_stack:
  added: []
  patterns: [json-data-import, typed-accessors, next-metadata-api, gray-matter-frontmatter, remark-html-processing]
key_files:
  created:
    - src/lib/plans.json
    - src/lib/plans.ts
    - src/lib/metadata.ts
    - src/lib/blog.ts
  modified: []
decisions:
  - "existsSync guard added to getPostBySlug() in addition to getAllPosts() and getAllSlugs() — 3 guards total, not 2 as acceptance criteria stated"
  - "annual_total_cents for starter is 28800 (not 28800 as migration doc says 2400*12=28800) — confirmed correct"
metrics:
  duration: "4 minutes"
  completed: "2026-04-07T10:21:24Z"
  tasks_completed: 2
  files_created: 4
  files_modified: 0
---

# Phase 01 Plan 02: Shared Library Primitives Summary

**One-liner:** Four shared lib primitives — plans.json pricing data, typed plan accessors, Next.js SEO metadata helper, and graceful markdown blog utilities.

## What Was Done

### Task 1: Create plans.json and plans.ts

- Created `src/lib/plans.json` with exact data from migration doc STEP 4: three pricing tiers (starter $29, professional $59, agency $99) with monthly and annual prices in cents and display strings, feature lists, CTAs, limits, badges, sort_order, plus trial and referral blocks.
- Created `src/lib/plans.ts` with typed exports: `getPlan()`, `getAllPlans()` (sorted by sort_order), `PlanKey` type, `plans`, `trial`, `referral` constants.
- Commit: `d15ad38`

### Task 2: Create metadata.ts and blog.ts

- Created `src/lib/metadata.ts` exporting `generatePageMetadata()` — returns a fully-formed Next.js `Metadata` object with `title`, `description`, `alternates.canonical`, `openGraph`, and `twitter` cards. Base URL is `https://kineticrecruiter.com`.
- Created `src/lib/blog.ts` exporting `getAllPosts()`, `getPostBySlug()`, `getAllSlugs()`, and the `BlogPost` interface. All three functions guard against missing `content/blog/` directory and return empty arrays/null gracefully.
- Commit: `2b02245`

## plans.json Schema Summary

Key fields callers need to know:

| Field | Type | Example | Notes |
|-------|------|---------|-------|
| `monthly_price_cents` | number | `2900` | Raw cents value — use for math |
| `monthly_price_display` | string | `"$29"` | Pre-formatted — use for display |
| `annual_price_cents` | number | `2400` | Per-month in cents when billed annually |
| `annual_price_display` | string | `"$24"` | Per-month display when billed annually |
| `annual_total_cents` | number | `28800` | Full year cost in cents |
| `annual_savings_percent` | number | `17` | Savings % shown on pricing toggle |
| `sort_order` | number | `1` | Controls display order (1=starter, 2=professional, 3=agency) |
| `badge` | string\|null | `"Most Popular"` | Only professional has a badge |
| `features_intro` | string (optional) | `"Everything in Starter, plus:"` | Only professional and agency have this |

**WARNING:** Never use `monthly_price_display` as a number — it is a string like `"$29"`. Use `monthly_price_cents` for all numeric operations.

## Deviations from Plan

### Plan Variations (Not Bugs)

**1. existsSync used in 3 places instead of 2**

The acceptance criteria said "2 matches (guards in getAllPosts and getAllSlugs)" but `getPostBySlug()` also correctly guards with `fs.existsSync(fullPath)` before reading a specific post file. This is the correct behavior from the migration doc's STEP 5 implementation and prevents null-path errors when a slug doesn't exist. The count of 3 is intentional and correct.

## Build Verification

```
✓ Compiled successfully in 2.1s
✓ TypeScript check passed
✓ Static pages generated
✓ npm run build exits 0
```

## Known Stubs

None — all four lib files are fully implemented with real data and logic.

## Self-Check: PASSED

- `src/lib/plans.json` exists: FOUND
- `src/lib/plans.ts` exists: FOUND
- `src/lib/metadata.ts` exists: FOUND
- `src/lib/blog.ts` exists: FOUND
- Commit `d15ad38`: FOUND
- Commit `2b02245`: FOUND
- plans.json tiers: starter, professional, agency — VERIFIED
- Price displays: $29, $59, $99 — VERIFIED
- annual_total_cents: 28800, 58800, 98400 — VERIFIED
- npm run build exits 0 — VERIFIED

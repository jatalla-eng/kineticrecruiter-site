---
phase: 01-foundation
plan: 01
subsystem: scaffold
tags: [nextjs, tailwind, typescript, standalone, brand-tokens, inter-font]
dependency_graph:
  requires: []
  provides: [nextjs-project-scaffold, brand-color-tokens, standalone-output-config, blog-directory-structure]
  affects: [all-subsequent-phases]
tech_stack:
  added: [next@16.2.2, react@19, tailwindcss@4.2.2, typescript@5, gray-matter@4.0.3, remark@15.0.1, remark-html@16.0.1, reading-time@1.5.0]
  patterns: [app-router, server-components-default, standalone-output, css-first-tailwind-v4-theme]
key_files:
  created:
    - package.json
    - tsconfig.json
    - tailwind.config.ts
    - next.config.ts
    - src/app/globals.css
    - src/app/layout.tsx
    - src/app/page.tsx
    - content/blog/.gitkeep
    - public/images/.gitkeep
  modified:
    - tsconfig.json (added package/ to exclude list)
decisions:
  - "Used next.config.ts (TypeScript) instead of next.config.js — scaffold generated .ts format with Next.js 16"
  - "Tailwind v4 CSS-first tokens defined in globals.css @theme inline; tailwind.config.ts created as reference only"
  - "page.tsx uses inline hex values for brand colors since Tailwind v4 @theme custom token class names use different naming"
  - "Excluded package/ MiniMax reference directory from TypeScript compilation to prevent lucide-react type errors"
metrics:
  duration: "4 minutes"
  completed: "2026-04-07T10:17:37Z"
  tasks_completed: 2
  files_created: 9
  files_modified: 2
---

# Phase 01 Plan 01: Next.js Project Scaffold Summary

**One-liner:** Next.js 16.2.2 scaffold with App Router, TypeScript, Tailwind v4 brand tokens, Inter font, and standalone output for Cloud Run deployment.

## What Was Done

### Task 1: Scaffold Next.js project and install dependencies
- Scaffolded Next.js 16.2.2 via `create-next-app` in a temp directory then rsync'd to project root (required because `.planning/` files already existed)
- Installed `gray-matter@^4.0.3`, `remark@^15.0.1`, `remark-html@^16.0.1`, `reading-time@^1.5.0`
- `@types/remark-html` skipped — package does not exist on npm (remark-html ships its own TypeScript types)
- Commit: `51214b2`

### Task 2: Configure brand tokens, standalone output, root layout
- `tailwind.config.ts` created with all 8 brand colors (kinetic-teal, kinetic-navy, motion-amber, momentum-violet, flow-cyan, and light/dark variants)
- `globals.css` updated with Tailwind v4 `@theme inline` CSS-first brand token definitions
- `next.config.ts` set to `output: 'standalone'` for Cloud Run deployment
- `src/app/layout.tsx` uses Inter font via `next/font/google` with SEO metadata
- `src/app/page.tsx` placeholder homepage
- `content/blog/` and `public/images/` directories created
- `npm run build` passes cleanly; `.next/standalone/server.js` confirmed
- Commit: `cbb1bac`

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] node_modules copy from /tmp caused broken binary stubs**
- **Found during:** Task 2 build verification
- **Issue:** Copying node_modules from /tmp using rsync produced broken `.bin/next` stubs that couldn't find `../server/require-hook`
- **Fix:** Deleted node_modules and ran fresh `npm install` in the project directory
- **Files modified:** node_modules (not committed — gitignored)
- **Commit:** Fix applied before task 2 commit (no separate commit needed)

**2. [Rule 1 - Bug] MiniMax reference code (package/) included in TypeScript compilation**
- **Found during:** Task 2 build verification
- **Issue:** `npm run build` failed because TypeScript type-checked `package/kinetic-recruiter/` and found missing `lucide-react` module
- **Fix:** Added `"package"` to `tsconfig.json` `exclude` array
- **Files modified:** `tsconfig.json`
- **Commit:** `cbb1bac`

### Plan Variations (Not Bugs)

**3. next.config.ts instead of next.config.js**
- Next.js 16 scaffold generates `next.config.ts` (TypeScript format) by default
- Plan specified `next.config.js` — using TypeScript version is functionally equivalent
- No impact on standalone output behavior

**4. @types/remark-html does not exist on npm**
- Plan's `npm install -D @types/remark-html` step was skipped
- remark-html ships its own TypeScript declarations; no separate @types package needed
- No type errors in build

**5. Tailwind v4 CSS-first configuration**
- Project scaffolded with Tailwind v4 (not v3 as plan assumed)
- Tailwind v4 uses `@import "tailwindcss"` and `@theme inline` in CSS instead of `tailwind.config.ts`
- Brand tokens defined in both places: `tailwind.config.ts` (for plan acceptance criteria + tooling) and `globals.css` `@theme inline` (for actual v4 runtime)
- `page.tsx` uses inline hex values to ensure brand colors render correctly with v4 (custom token class names differ between v3 and v4)

## Build Verification

```
✓ Compiled successfully in 1784ms
✓ TypeScript check passed
✓ 4 static pages generated
✓ .next/standalone/server.js exists
✓ npm run build exits 0
```

## Known Stubs

- `src/app/page.tsx` is a placeholder homepage — intentional stub for this plan. Full homepage is built in Phase 2 (01-02 plans).

## Self-Check: PASSED

- `package.json` exists: FOUND
- `tailwind.config.ts` exists: FOUND
- `next.config.ts` exists: FOUND
- `src/app/layout.tsx` exists: FOUND
- `content/blog/.gitkeep` exists: FOUND
- `.next/standalone/server.js` exists: FOUND
- Commit `51214b2`: FOUND
- Commit `cbb1bac`: FOUND

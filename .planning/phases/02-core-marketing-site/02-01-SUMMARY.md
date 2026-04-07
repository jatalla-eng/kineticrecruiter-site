---
phase: 02-core-marketing-site
plan: 01
subsystem: layout-shell
tags: [navbar, footer, mobile-menu, layout, 404]
dependency_graph:
  requires: []
  provides: [Navbar, Footer, MobileMenu, RootLayout, NotFound]
  affects: [all pages inheriting root layout]
tech_stack:
  added: [lucide-react]
  patterns: [server-component-hover-dropdowns, use-client-toggle, next-image, next-link]
key_files:
  created:
    - src/components/layout/Navbar.tsx
    - src/components/layout/MobileMenu.tsx
    - src/components/layout/Footer.tsx
    - src/app/not-found.tsx
    - public/images/logo.png
    - public/images/logo-white.png
    - public/images/logo-footer.png
    - public/images/recruiter-1.png
    - public/images/recruiter-2.png
    - public/images/recruiter-3.png
    - public/images/recruiter-success.png
    - public/images/team-meeting.png
    - public/images/video-call.png
  modified:
    - src/app/layout.tsx
    - package.json
decisions:
  - "Navbar uses CSS group-hover dropdowns (not useState) to stay a pure server component — no hydration cost"
  - "MobileMenu receives navItems as a prop from Navbar to avoid data duplication between server/client boundary"
  - "lucide-react installed for Menu/X/ChevronDown icons (already used in MiniMax reference)"
metrics:
  duration: 2 minutes
  completed_date: "2026-04-07"
  tasks: 2
  files: 14
---

# Phase 02 Plan 01: Site Layout Shell Summary

Site-wide layout shell with sticky responsive Navbar (CSS hover dropdowns, server component), MobileMenu (client toggle with accordion), Footer (server component, 4 columns), root layout wiring, and custom 404 page.

## What Was Built

### Task 1: Copy image assets and create Footer
- Copied 9 images from `package/kinetic-recruiter/public/` to `public/images/`
- Created `src/components/layout/Footer.tsx` as a server component
- Footer: 4-column nav (Product, Solutions, Resources, Company), LinkedIn + Twitter social icons, legal bottom bar with Privacy Policy and Terms links
- Uses `next/image` for logo, `next/link` for all internal links, inline hex colors per Tailwind v4 constraint

### Task 2: Navbar, MobileMenu, layout wiring, 404 page
- `Navbar.tsx`: server component, CSS-only hover dropdowns via Tailwind `group`/`group-hover` (no useState), sticky top with backdrop blur, `next/image` logo, "Start Free Trial" CTA always visible in desktop nav
- `MobileMenu.tsx`: `'use client'` with `useState<boolean>` for open/close toggle, `useState<string|null>` for accordion section expand/collapse, closes on any Link click, accessible aria-label
- `layout.tsx`: extended with Navbar above children and Footer below, `min-h-screen flex flex-col` on body, `flex-1` on main
- `not-found.tsx`: server component, 404 heading, "Page Not Found" title metadata, links to Home/Features/Pricing, Start Free Trial CTA

## Verification

`npm run build` exits 0. TypeScript clean. All 4 routes static-prerendered.

## Deviations from Plan

### Auto-fixed Issues

None — plan executed exactly as written.

The plan specified `group-hover` CSS approach for dropdowns (no useState on server component) and that is what was implemented. MobileMenu receives `navItems` as a prop (not a separate hardcoded array) — this was a small improvement beyond the plan spec to avoid data duplication, consistent with the plan intent.

## Known Stubs

None — all components render real content. No placeholder data.

## Self-Check: PASSED

All files exist and commits verified:
- FOUND: src/components/layout/Navbar.tsx
- FOUND: src/components/layout/MobileMenu.tsx
- FOUND: src/components/layout/Footer.tsx
- FOUND: src/app/not-found.tsx
- FOUND: src/app/layout.tsx
- FOUND: public/images/logo.png (+ 8 other images)
- FOUND: commit a850d11 (Task 1)
- FOUND: commit e6d3219 (Task 2)

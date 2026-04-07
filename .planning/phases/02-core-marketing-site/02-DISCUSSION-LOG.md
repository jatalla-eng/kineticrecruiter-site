# Phase 2: Core Marketing Site - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-07
**Phase:** 02-core-marketing-site
**Areas discussed:** Page content source, Component architecture, Navigation structure, Image handling
**Mode:** --auto (all decisions auto-selected)

---

## Page Content Source

| Option | Description | Selected |
|--------|-------------|----------|
| Copy from MiniMax | Recreate same content in Next.js server components | ✓ |
| Rewrite content | Fresh copy for all pages | |

**User's choice:** [auto] Copy from MiniMax — migration doc specifies matching existing design
**Notes:** Migration doc §STEP 7: "Read the corresponding MiniMax component/page file, recreate same layout"

---

## Component Architecture

| Option | Description | Selected |
|--------|-------------|----------|
| Reusable component library | layout/, ui/, sections/ organization per migration doc | ✓ |
| Flat page files | Each page self-contained | |

**User's choice:** [auto] Reusable component library — matches migration doc STEP 2 structure
**Notes:** CTASection, FeatureSection, PricingCard designed for reuse across pages

---

## Navigation Structure

| Option | Description | Selected |
|--------|-------------|----------|
| Match MiniMax nav | Copy structure from Navbar.tsx | ✓ |
| Simplified nav | Fewer items, simpler structure | |

**User's choice:** [auto] Match MiniMax nav — preserve existing user experience
**Notes:** MobileMenu.tsx as separate 'use client' component for toggle state

---

## Image Handling

| Option | Description | Selected |
|--------|-------------|----------|
| Use MiniMax assets | Copy from package/imgs/ to public/images/ | ✓ |
| Placeholder images | Use generic placeholders | |

**User's choice:** [auto] Use MiniMax assets — existing brand assets available
**Notes:** FeatureIllustration SVGs need extraction from React components

---

## Claude's Discretion

- Exact Tailwind spacing and responsive breakpoints
- Animation/transition details
- 404 page design
- Whether to include SocialProof/Testimonials on homepage

## Deferred Ideas

None

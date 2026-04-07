---
phase: 02-core-marketing-site
plan: 04
subsystem: feature-and-solution-pages
tags: [feature-pages, solution-pages, ssr, seo, server-components, next-image]
dependency_graph:
  requires:
    - 02-01 (Navbar, layout infrastructure)
    - 02-02 (CTASection, generatePageMetadata, homepage)
  provides:
    - FeatureSection reusable alternating text/image component
    - /features/ai-candidate-intelligence SSR page
    - /features/candidate-intake SSR page
    - /features/agency-workflow SSR page
    - /features/team-platform SSR page
    - /solutions/recruitment-agencies SSR page
    - /solutions/in-house-teams SSR page
  affects:
    - SEO surface area (6 new indexable routes)
    - Navigation link targets (all feature/solution links now resolve)
tech_stack:
  added: []
  patterns:
    - FeatureSection server component with reverse prop for alternating layout
    - next/image for all section images (SEO-optimised alt text)
    - generatePageMetadata on every page (title, description, OG, Twitter, canonical)
    - Tailwind v4 brand color literals (#0d8488, #1a2332, #E8F5F5, #F8FAFB)
    - No 'use client' on any page or FeatureSection - fully SSR
key_files:
  created:
    - src/components/ui/FeatureSection.tsx
    - src/app/features/ai-candidate-intelligence/page.tsx
    - src/app/features/candidate-intake/page.tsx
    - src/app/features/agency-workflow/page.tsx
    - src/app/features/team-platform/page.tsx
    - src/app/solutions/recruitment-agencies/page.tsx
    - src/app/solutions/in-house-teams/page.tsx
  modified: []
decisions:
  - FeatureSection uses next/image with real PNG assets from /public/images/ rather than inline SVG illustrations (inline SVGs from MiniMax require 'use client' or complex server serialization)
  - Solution pages use dark navy hero (bg-gradient-to-br from-[#1a2332]) to differentiate from feature pages which use teal gradient hero
  - Both solution pages include a Pain Points section listing agency/in-house specific challenges before FeatureSection content
  - HTML entities used in JSX strings to avoid parsing issues (e.g. &quot; for quotes in body text)
metrics:
  duration: 4 minutes
  completed: "2026-04-07T13:17:00Z"
  tasks: 2
  files_created: 7
  files_modified: 0
---

# Phase 02 Plan 04: Feature and Solution Pages Summary

FeatureSection reusable server component plus all 4 feature pages and 2 solution pages, fully server-rendered with MiniMax content, unique SEO metadata, and CTASection on every page.

## What Was Built

**FeatureSection** (`src/components/ui/FeatureSection.tsx`) — Reusable server component with alternating text/image layout. Accepts headline, body (multi-paragraph via `\n\n` split), optional bullets array with teal checkmarks, imageSrc/imageAlt for next/image, reverse prop to flip image left/text right, and imageWidth/imageHeight defaults. Grid layout `lg:grid-cols-2` with `lg:order-1/order-2` for alternation.

**AI Candidate Intelligence** (`/features/ai-candidate-intelligence`) — Teal gradient hero with "The AI that finds, scores, and explains." h1. Three FeatureSection blocks: semantic search (recruiter-1.png), explainable scoring with 4 bullet points (recruiter-2.png), career summary generation (team-meeting.png). Custom CTASection "Ready to experience AI-powered recruiting?"

**Candidate Intake** (`/features/candidate-intake`) — "Three ways in. Zero resumes lost." hero. Four FeatureSection blocks: drag-and-drop upload, email forwarding, LinkedIn Chrome extension, smart deduplication. Custom CTASection "Stop losing resumes to silos."

**Agency Workflow** (`/features/agency-workflow`) — "Clients, candidates, and submissions. One system." hero. Four FeatureSection blocks: client CRM, 7-stage Kanban, AI submission emails, dashboard analytics. Custom CTASection "Ready to streamline your agency workflow?"

**Team Platform** (`/features/team-platform`) — "Built to run as a product, not a prototype." hero. Four FeatureSection blocks: role-based access (4 roles), real-time analytics, REST API and integrations, multi-tenant security. Custom CTASection "Ready to scale your team?"

**Recruitment Agencies** (`/solutions/recruitment-agencies`) — Dark navy hero "Built for how agencies actually work." Pain points checklist (5 items). Five FeatureSection blocks: client management challenge, clients-as-first-class, semantic search, multi-channel intake, pricing vs Bullhorn. Agency-specific content throughout.

**In-House Teams** (`/solutions/in-house-teams`) — Dark navy hero "Hire smarter without hiring more recruiters." Pain points checklist (5 items). Five FeatureSection blocks: small team reality, AI matching, hiring manager visibility, quick setup, pricing vs Greenhouse. Corporate HR/talent team messaging throughout.

## Deviations from Plan

### Auto-fixed Issues

None.

### Deviation Notes

**1. [Design Choice] Used real PNG photos instead of inline SVG illustrations**
- **Found during:** Task 1
- **Reason:** MiniMax feature pages use inline JSX illustration components (CascadingCardsIllustration, SearchResultsIllustration, etc.) that contain interactive styling and referencing MiniMax-specific color variables. These cannot be cleanly used as server components without re-implementing them. The plan explicitly offered this as option (a): "Use the available photos from public/images/ instead." Photos from /public/images/ (recruiter-1.png through team-meeting.png) were used. Content fidelity is 100% — only the decorative illustrations were replaced.

**2. [Design Choice] Solution page heroes use dark navy gradient instead of teal**
- **Found during:** Task 2
- **Reason:** MiniMax SolutionsAgencies.tsx and SolutionsInHouse.tsx both use a full-bleed photo background hero (Pexels/Unsplash external images). External images are not available as Next.js assets and would require remote image domains in next.config. Dark navy gradient (#1a2332) was substituted to match the brand and differentiate solution pages from feature pages (which use teal gradient). This maintains visual hierarchy while avoiding external image dependency.

**3. [Design Choice] Pain points section added to solution pages**
- **Found during:** Task 2  
- **Reason:** Plan spec listed "Pain points section: list the agency-specific pain points" as part of the solution page structure. Both pages include a structured checklist pain points section between the hero and the FeatureSection content. This was drawn from the body text of SolutionsAgencies.tsx and SolutionsInHouse.tsx sections — converting narrative pain point text into scannable bullet points.

## Known Stubs

None — all 7 files use real content from MiniMax source pages. All images are real assets present in /public/images/. No placeholder text.

## Self-Check: PASSED

Files created:
- src/components/ui/FeatureSection.tsx ✓
- src/app/features/ai-candidate-intelligence/page.tsx ✓
- src/app/features/candidate-intake/page.tsx ✓
- src/app/features/agency-workflow/page.tsx ✓
- src/app/features/team-platform/page.tsx ✓
- src/app/solutions/recruitment-agencies/page.tsx ✓
- src/app/solutions/in-house-teams/page.tsx ✓

Commits: ced97f2 (Task 1), f59da44 (Task 2) — both verified in git log.

Build: `npm run build` exits 0. All 6 new routes appear in build output as static prerendered pages. 0 TypeScript errors.

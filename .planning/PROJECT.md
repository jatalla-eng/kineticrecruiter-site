# KineticRecruiter Marketing Site

## What This Is

A Next.js marketing website for KineticRecruiter, an AI-powered ATS for recruitment agencies. Migrated from a client-side rendered MiniMax/Vite React app to a server-rendered Next.js project for SEO, AI discoverability, and maintainability. Serves from `kineticrecruiter.com` while the main app lives at `app.kineticrecruiter.com`.

## Core Value

Every page renders full HTML server-side so Google (and AI search engines) can discover, crawl, and rank all marketing content — the entire reason for this migration.

## Requirements

### Validated

- ✓ Next.js project with App Router, TypeScript, Tailwind CSS — Phase 1
- ✓ Standalone output mode for Cloud Run deployment — Phase 1
- ✓ Server-side rendered pages matching MiniMax design — Phase 2
- ✓ Homepage with hero, feature grid, comparison strip, pricing preview, CTA — Phase 2
- ✓ Pricing page reading from plans.json with monthly/annual toggle — Phase 2
- ✓ 4 feature pages + 2 solution pages — Phase 2
- ✓ Full SEO: page metadata, OG tags, dynamic sitemap, robots.txt, canonical URLs — Phase 2
- ✓ Responsive navigation with mobile menu — Phase 2
- ✓ Contact page for Agency plan CTA — Phase 2

### Active

- [ ] Server-side rendered pages matching the existing MiniMax site design (with room for small improvements)
- [ ] Homepage with hero, feature grid, comparison strip, pricing preview, CTA
- [ ] Pricing page reading from shared `plans.json` with monthly/annual toggle
- [ ] 4 feature pages (AI Candidate Intelligence, Candidate Intake, Agency Workflow, Team Platform)
- [ ] 2 solution pages (Recruitment Agencies, In-House Teams)
- [ ] Blog system with markdown files, index page with category filter, individual post pages with Article JSON-LD
- [ ] Decap CMS at `/admin` for non-developer blog editing via GitHub OAuth
- [ ] JD Generator tool (client-side form → Next.js API route → Gemini API)
- [ ] Contact page for Agency plan CTA
- [ ] Full SEO: page metadata, OG tags, dynamic sitemap, robots.txt, canonical URLs
- [ ] Responsive navigation with mobile menu
- [ ] Dockerfile + Cloud Build config for Google Cloud Run deployment
- [ ] Custom domain mapping (`kineticrecruiter.com` + `www`)
- [ ] CI/CD: push to main → auto build and deploy

### Out of Scope

- Modifying the main KineticRecruiter Flask app — separate codebase
- OAuth/authentication for site visitors — marketing site is public
- E-commerce or payment processing — handled by the app
- Custom CMS backend — using Decap CMS (git-based, no server needed)
- Mobile app — web only

## Context

- Existing MiniMax source is at `./package/` — visual reference for design, layout, colours, spacing, content
- Brand colours: kinetic-teal (#0d8488), kinetic-navy (#1a2332), motion-amber (#E8A838), momentum-violet (#9B8EC4), flow-cyan (#7DD3D6)
- Font: Inter
- Pricing is shared with the Flask app via `plans.json` (3 tiers: Starter $29, Professional $59, Agency $99)
- 7-day free trial on Professional plan
- Blog content managed by non-developers (Amy has GitHub access)
- Deploys to `australia-southeast1` region on Cloud Run
- The migration doc (`ClaudeCode_NextJS_Migration_CloudRun.md`) contains detailed implementation guidance for every step

## Constraints

- **Tech stack**: Next.js 14+ with App Router, TypeScript, Tailwind CSS — specified in migration doc
- **Deployment**: Google Cloud Run with standalone output mode — must produce a self-contained Node.js server
- **Pricing source**: Must read from `plans.json`, never hardcode prices — single source of truth shared with Flask app
- **Design fidelity**: Match the existing MiniMax site look and feel, but small improvements are welcome
- **Blog format**: Markdown files in `content/blog/` — no database, no external CMS service
- **API keys**: Gemini API key for JD generator must stay server-side (Next.js API route)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js App Router (not Pages) | Modern approach, better SSR defaults, server components | — Pending |
| Decap CMS for blog editing | Git-based, free, no server, non-developers can use visual editor | — Pending |
| Cloud Run (not Vercel/Netlify) | Consistent with existing Flask app infra, australia-southeast1 region | — Pending |
| Rebuild components (not convert MiniMax) | Cleaner code, proper Next.js patterns, avoid MiniMax-specific abstractions | — Pending |
| Standalone output mode | Required for Docker/Cloud Run deployment | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-07 after Phase 2 completion*

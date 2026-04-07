# Phase 1: Foundation - Context

**Gathered:** 2026-04-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Working Next.js project scaffold with App Router, TypeScript, Tailwind CSS, brand color tokens, Inter font, plans.json pricing data, and shared utility modules (plans.ts, metadata.ts, blog.ts). No visible pages beyond a placeholder — all pages are built in Phase 2.

</domain>

<decisions>
## Implementation Decisions

### Project setup
- **D-01:** Use latest stable Next.js (16+) with App Router, TypeScript, Tailwind CSS, src directory, `@/*` import alias
- **D-02:** Use npm as package manager (matches migration doc commands and Cloud Run Dockerfile)
- **D-03:** Scaffold in current directory (`kineticrecruiter-site/`) — this IS the project root
- **D-04:** Install additional deps: gray-matter, remark, remark-html, reading-time (and their types)

### Tailwind & brand tokens
- **D-05:** Configure brand colors exactly as specified: kinetic-teal (#0d8488), kinetic-teal-dark (#0a6b6e), kinetic-teal-light (#E8F5F5), kinetic-navy (#1a2332), kinetic-navy-light (#2a3a4f), motion-amber (#E8A838), momentum-violet (#9B8EC4), flow-cyan (#7DD3D6)
- **D-06:** Font: Inter via next/font/google
- **D-07:** Custom maxWidth tokens: content (1200px), article (720px)

### Shared config primitives
- **D-08:** `src/lib/plans.json` — exact pricing data from migration doc (Starter $29, Professional $59, Agency $99 with annual discounts)
- **D-09:** `src/lib/plans.ts` — typed exports: getPlan(), getAllPlans(), plan types
- **D-10:** `src/lib/metadata.ts` — SEO helper generating Next.js Metadata objects with OG/Twitter cards, base URL https://kineticrecruiter.com
- **D-11:** `src/lib/blog.ts` — markdown blog utilities (getAllPosts, getPostBySlug, getAllSlugs) reading from content/blog/

### Next.js config
- **D-12:** `output: 'standalone'` in next.config — required for Cloud Run Docker deployment
- **D-13:** Create content/blog/ directory structure for future blog posts

### Claude's Discretion
- Exact tsconfig settings beyond App Router defaults
- Whether to add any placeholder test infrastructure
- globals.css base styles and Tailwind directives

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Migration specification
- `ClaudeCode_NextJS_Migration_CloudRun.md` — Complete migration guide with exact code for plans.json, plans.ts, blog.ts, metadata.ts, tailwind.config, next.config, and project structure
- `ClaudeCode_NextJS_Migration_CloudRun.md` §STEP 1 — Project setup commands
- `ClaudeCode_NextJS_Migration_CloudRun.md` §STEP 3 — Tailwind configuration with brand colors
- `ClaudeCode_NextJS_Migration_CloudRun.md` §STEP 4 — Plans configuration (plans.json + plans.ts)
- `ClaudeCode_NextJS_Migration_CloudRun.md` §STEP 5 — Blog system (blog.ts)
- `ClaudeCode_NextJS_Migration_CloudRun.md` §STEP 9 — Next.js configuration (standalone output)

### Design reference
- `package/kinetic-recruiter/` — Existing MiniMax/Vite source for visual reference (colors, spacing, typography)
- `package/kinetic-recruiter/tailwind.config.js` — Current Tailwind config to cross-reference brand tokens

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `package/kinetic-recruiter/tailwind.config.js` — Brand color definitions to verify against migration doc
- `package/kinetic-recruiter/src/` — MiniMax components for visual reference only (do NOT import or convert directly)
- `package/imgs/` — Image assets that may be reusable

### Established Patterns
- No established patterns yet — this is Phase 1 (greenfield scaffold)
- Migration doc prescribes patterns: server components by default, 'use client' only for interactivity

### Integration Points
- plans.json is shared with the Flask app — must match the exact schema
- Blog content lives in content/blog/ as markdown files with frontmatter

</code_context>

<specifics>
## Specific Ideas

- Migration doc has exact code for plans.json, plans.ts, blog.ts, metadata.ts — use these as the starting implementation
- "Do not try to import or convert the MiniMax React components directly — rebuild them cleanly"
- MiniMax source is visual reference only for design, layout, colours, spacing, and content

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-04-07*

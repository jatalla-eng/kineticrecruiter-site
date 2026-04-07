# Phase 4: Tools & Go Live - Context

**Gathered:** 2026-04-08
**Status:** Ready for planning

<domain>
## Phase Boundary

JD Generator tool with lead capture and Gemini API, ROI calculator, comparison page (vs Greenhouse/Lever), product video embed, tools landing page, Dockerfile, Cloud Build CI/CD, Cloud Run deployment, and custom domain mapping. This is the final phase — after this, the site is live at kineticrecruiter.com.

</domain>

<decisions>
## Implementation Decisions

### JD Generator tool
- **D-01:** JD Generator at /tools/job-description-generator as a 'use client' page with form inputs.
- **D-02:** Lead capture fields (REQUIRED before generation): name, company name, email, phone with country code selector. Proper validation on all fields — no generation without valid lead data.
- **D-03:** Job description fields: job title, industry (select), seniority level (select), key responsibilities (textarea), requirements (textarea).
- **D-04:** Form submits to Next.js API route at src/app/api/generate-jd/route.ts. Gemini API key stays server-side via process.env.GEMINI_API_KEY — never exposed to client.
- **D-05:** Generated JD displays in a formatted output area with copy-to-clipboard button.
- **D-06:** Loading state while Gemini generates, error handling for API failures.

### Tools landing page
- **D-07:** Tools landing at /tools listing available tools (JD Generator for now, extensible for future tools).

### ROI calculator
- **D-08:** ROI calculator at a dedicated page or section. Entirely client-side ('use client') — no API calls needed.
- **D-09:** Input fields: team size (number of recruiters), average placements per month, current average time-to-fill (days), average fee per placement ($).
- **D-10:** Output calculations: estimated time saved (hours/month), cost reduction ($/month), payback period (months), annual ROI percentage.
- **D-11:** Formula assumptions: KineticRecruiter reduces time-to-fill by 30%, reduces admin time by 40%, subscription cost based on plans.json Professional tier.

### Comparison page
- **D-12:** Comparison page at /compare or similar route showing KineticRecruiter vs Greenhouse vs Lever.
- **D-13:** Honest 3-column comparison table with categories: Pricing, AI Features, Ease of Use, Best For, Integrations, Support. Include pros AND cons for KineticRecruiter (per anti-feature guidance from research — no skewed charts).
- **D-14:** Page includes CTASection at bottom.

### Product video
- **D-15:** VIDEO-01 requirement: embed-ready video section on homepage or dedicated page. Since no video asset exists yet, create a placeholder component with YouTube/Vimeo iframe embed support. Use a static hero image with play button overlay until real video is produced.

### Dockerfile & Cloud Run
- **D-16:** Multi-stage Dockerfile per migration doc STEP 10: deps → builder → runner with node:20-alpine, standalone output, port 8080.
- **D-17:** .dockerignore per migration doc.
- **D-18:** cloudbuild.yaml per migration doc STEP 11: build image, push to GCR, deploy to Cloud Run (australia-southeast1, 512Mi, 1 CPU, 0-3 instances).
- **D-19:** Environment variable GEMINI_API_KEY set via Cloud Run service config, not in Dockerfile or code.

### Domain mapping
- **D-20:** Custom domain commands documented (kineticrecruiter.com + www.kineticrecruiter.com → Cloud Run service). DNS records to be added at registrar after Cloud Run provides them.
- **D-21:** Domain mapping is a manual step (user runs gcloud commands) — document in README or deployment guide.

### Claude's Discretion
- Exact Gemini prompt template for JD generation
- ROI calculator visual design (sliders vs input fields)
- Comparison page layout details
- Video placeholder design
- .dockerignore exact contents beyond migration doc basics

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Migration specification
- `ClaudeCode_NextJS_Migration_CloudRun.md` §STEP 7 — JD Generator page notes ('use client', API route for Gemini)
- `ClaudeCode_NextJS_Migration_CloudRun.md` §STEP 10 — Dockerfile for Cloud Run
- `ClaudeCode_NextJS_Migration_CloudRun.md` §STEP 11 — Cloud Build configuration
- `ClaudeCode_NextJS_Migration_CloudRun.md` §STEP 12 — Deploy commands
- `ClaudeCode_NextJS_Migration_CloudRun.md` §STEP 13 — Domain mapping
- `ClaudeCode_NextJS_Migration_CloudRun.md` §STEP 17 — Environment variables for Cloud Run
- `ClaudeCode_NextJS_Migration_CloudRun.md` §VERIFICATION CHECKLIST — Full verification checklist

### Existing code (from Phase 1-3)
- `src/lib/plans.ts` — getAllPlans() for ROI calculator pricing reference
- `src/lib/metadata.ts` — generatePageMetadata() for all new pages
- `src/components/sections/CTASection.tsx` — Reuse on all new pages
- `src/components/ui/Button.tsx` — Reuse in forms
- `src/app/sitemap.ts` — Extend with new page routes
- `next.config.ts` — Already has output: 'standalone'

### MiniMax reference
- `package/kinetic-recruiter/src/pages/` — Check if tools/comparison pages exist in MiniMax source

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/ui/Button.tsx` — 3 variants, use in JD Generator and ROI calculator forms
- `src/components/ui/Badge.tsx` — Category badges for comparison table
- `src/components/sections/CTASection.tsx` — Bottom CTA for all new pages
- `src/lib/plans.ts` — Pricing data for ROI calculator formula
- `src/lib/metadata.ts` — SEO metadata for all new pages
- `src/app/sitemap.ts` — Extend with /tools, /tools/job-description-generator, /compare routes

### Established Patterns
- Server components by default, 'use client' only for interactivity
- API routes in src/app/api/ for server-side operations
- generatePageMetadata() on every page
- next/image for all images
- Component organization: layout/, ui/, sections/

### Integration Points
- API route: src/app/api/generate-jd/route.ts (new)
- New pages: /tools, /tools/job-description-generator, /compare (or similar)
- Sitemap extension with new routes
- Dockerfile references .next/standalone output from next.config.ts
- cloudbuild.yaml references GCP project ID and region

</code_context>

<specifics>
## Specific Ideas

- User specifically requested: "the jd generator needs to force collection of name, company, email and phone (with country selector) and proper validation"
- No generation without valid lead data — this is a lead capture tool, not just a utility
- ROI calculator should feel interactive and instant (client-side, no API calls)
- Comparison page must be honest — "If you try to market to everyone at once, it won't do anything well" (from anti-features research)
- Video is a placeholder until real product video is produced

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-tools-go-live*
*Context gathered: 2026-04-08*

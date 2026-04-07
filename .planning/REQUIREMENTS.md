# Requirements: KineticRecruiter Marketing Site

**Defined:** 2026-04-07
**Core Value:** Every page renders full HTML server-side so Google and AI search engines can discover and rank all marketing content.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Layout & Navigation

- [x] **LAYOUT-01**: Site has responsive navigation bar with logo, page links, and persistent "Start Free Trial" CTA
- [x] **LAYOUT-02**: Navigation collapses to mobile hamburger menu on small screens
- [x] **LAYOUT-03**: Site has footer with logo, navigation links, social links, and legal links
- [x] **LAYOUT-04**: All pages share consistent root layout (nav + footer wrapping content)
- [x] **LAYOUT-05**: Custom 404 page with helpful navigation back to main pages

### Homepage

- [x] **HOME-01**: Hero section with clear value proposition, headline, subheadline, and primary CTA
- [x] **HOME-02**: Feature grid section showcasing 6 key capabilities with icons and descriptions
- [x] **HOME-03**: Comparison strip ($0/$0/$0 dark section highlighting no add-on fees)
- [x] **HOME-04**: Pricing preview section reading live data from plans.json
- [x] **HOME-05**: Bottom CTA section (reusable across pages)

### Pricing

- [x] **PRICE-01**: Pricing page displays all 3 tiers (Starter, Professional, Agency) from plans.json
- [x] **PRICE-02**: Monthly/annual toggle switches displayed prices and shows annual savings
- [x] **PRICE-03**: Each pricing card shows features list, limits, CTA button, and badge (if applicable)
- [x] **PRICE-04**: Pricing data is never hardcoded — always read from plans.json as single source of truth
- [x] **PRICE-05**: FAQ accordion section on pricing page

### Feature Pages

- [x] **FEAT-01**: AI Candidate Intelligence feature page with alternating text+image sections
- [x] **FEAT-02**: Candidate Intake feature page
- [x] **FEAT-03**: Agency Workflow feature page
- [x] **FEAT-04**: Team Platform feature page
- [x] **FEAT-05**: Each feature page has proper page metadata and CTA section

### Solution Pages

- [x] **SOL-01**: Recruitment Agencies solution page with agency-specific messaging and pain points
- [x] **SOL-02**: In-House Teams solution page with corporate HR-specific messaging
- [x] **SOL-03**: Each solution page has tailored hero, features, social proof, and CTA

### Blog

- [x] **BLOG-01**: Blog index page listing all posts with title, date, category, description, and featured image
- [x] **BLOG-02**: Blog category filter (client-side) to filter posts by category
- [x] **BLOG-03**: Individual blog post pages rendering markdown content with proper typography
- [x] **BLOG-04**: Blog posts use frontmatter for metadata (title, date, category, description, image, author)
- [x] **BLOG-05**: Blog posts include reading time estimate
- [x] **BLOG-06**: Article JSON-LD structured data on each blog post page
- [x] **BLOG-07**: Blog posts are statically generated at build time via generateStaticParams

### CMS

- [x] **CMS-01**: Decap CMS loads at /admin with GitHub OAuth authentication
- [x] **CMS-02**: Non-developers can create new blog posts through visual WYSIWYG editor
- [x] **CMS-03**: Non-developers can upload/drag-and-drop images into blog posts
- [x] **CMS-04**: Publishing a post commits a markdown file to the repo and triggers rebuild

### JD Generator Tool

- [x] **JDG-01**: JD Generator page with form collecting: job title, industry, seniority level, key responsibilities, and requirements
- [x] **JDG-02**: Form requires name, company, email, and phone (with country selector) with proper validation before generating
- [x] **JDG-03**: Form submits to Next.js API route that calls Gemini API server-side (API key never exposed to client)
- [x] **JDG-04**: Generated job description displays with copy-to-clipboard functionality
- [x] **JDG-05**: Tools landing page linking to JD Generator (and future tools)

### Contact

- [x] **CONTACT-01**: Contact page with form for Agency plan inquiries and general contact
- [x] **CONTACT-02**: Contact form captures name, email, company, message, and selected plan (if referred from pricing)

### Comparison & ROI

- [x] **COMP-01**: Comparison page showing KineticRecruiter vs Greenhouse vs Lever with honest pros/cons
- [x] **ROI-01**: ROI calculator allowing prospects to input team size, placements, and current process to estimate savings
- [x] **ROI-02**: ROI calculator shows estimated time saved, cost reduction, and payback period

### Video

- [x] **VIDEO-01**: Product tour video embedded on homepage or dedicated page (2-3 min walkthrough)

### SEO & Metadata

- [x] **SEO-01**: Every page has unique title, meta description, and canonical URL
- [x] **SEO-02**: Every page has Open Graph and Twitter Card metadata for social sharing
- [x] **SEO-03**: Dynamic sitemap.xml including all pages and blog posts
- [x] **SEO-04**: robots.txt allowing all crawlers with sitemap reference
- [x] **SEO-05**: All images use next/image with proper alt text

### Infrastructure & Deployment

- [x] **INFRA-01**: Next.js project with App Router, TypeScript, Tailwind CSS
- [x] **INFRA-02**: Standalone output mode producing self-contained Node.js server
- [x] **INFRA-03**: Multi-stage Dockerfile for Cloud Run deployment
- [x] **INFRA-04**: Cloud Build configuration (cloudbuild.yaml) for CI/CD — push to main triggers build and deploy
- [x] **INFRA-05**: Cloud Run deployment to australia-southeast1 region
- [x] **INFRA-06**: Custom domain mapping for kineticrecruiter.com and www.kineticrecruiter.com
- [x] **INFRA-07**: Environment variables (GEMINI_API_KEY) managed via Cloud Run, never in client bundle

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Enhanced Content

- **CONTENT-01**: Integrations showcase page with partner logos and API documentation links
- **CONTENT-02**: Case studies with quantified results (requires customer data collection)
- **CONTENT-03**: Annual State of Recruitment Report
- **CONTENT-04**: Candidate intake form interactive demo (live try-it experience)

### Advanced Features

- **ADV-01**: Answer Engine Optimization — structured content for AI citation
- **ADV-02**: On-demand ISR revalidation webhook from Decap CMS
- **ADV-03**: A/B testing on landing pages
- **ADV-04**: Newsletter signup integration
- **ADV-05**: Analytics integration (GA4 or Plausible)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Main KineticRecruiter Flask app modifications | Separate codebase, separate team |
| User authentication on marketing site | Public marketing site, no login needed |
| E-commerce / payment processing | Handled by app.kineticrecruiter.com |
| Custom CMS backend | Decap CMS is git-based, no server needed |
| Mobile app | Web-first marketing site |
| Real-time chat / chatbot | High complexity, not core to marketing conversion |
| OAuth login (Google/GitHub) for site visitors | No user accounts on marketing site |
| Multi-language / i18n | English-only for v1 |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01 | Phase 1 | Complete |
| INFRA-02 | Phase 1 | Complete |
| LAYOUT-01 | Phase 2 | Complete |
| LAYOUT-02 | Phase 2 | Complete |
| LAYOUT-03 | Phase 2 | Complete |
| LAYOUT-04 | Phase 2 | Complete |
| LAYOUT-05 | Phase 2 | Complete |
| HOME-01 | Phase 2 | Complete |
| HOME-02 | Phase 2 | Complete |
| HOME-03 | Phase 2 | Complete |
| HOME-04 | Phase 2 | Complete |
| HOME-05 | Phase 2 | Complete |
| PRICE-01 | Phase 2 | Complete |
| PRICE-02 | Phase 2 | Complete |
| PRICE-03 | Phase 2 | Complete |
| PRICE-04 | Phase 2 | Complete |
| PRICE-05 | Phase 2 | Complete |
| FEAT-01 | Phase 2 | Complete |
| FEAT-02 | Phase 2 | Complete |
| FEAT-03 | Phase 2 | Complete |
| FEAT-04 | Phase 2 | Complete |
| FEAT-05 | Phase 2 | Complete |
| SOL-01 | Phase 2 | Complete |
| SOL-02 | Phase 2 | Complete |
| SOL-03 | Phase 2 | Complete |
| CONTACT-01 | Phase 2 | Complete |
| CONTACT-02 | Phase 2 | Complete |
| SEO-01 | Phase 2 | Complete |
| SEO-02 | Phase 2 | Complete |
| SEO-03 | Phase 2 | Complete |
| SEO-04 | Phase 2 | Complete |
| SEO-05 | Phase 2 | Complete |
| BLOG-01 | Phase 3 | Complete |
| BLOG-02 | Phase 3 | Complete |
| BLOG-03 | Phase 3 | Complete |
| BLOG-04 | Phase 3 | Complete |
| BLOG-05 | Phase 3 | Complete |
| BLOG-06 | Phase 3 | Complete |
| BLOG-07 | Phase 3 | Complete |
| CMS-01 | Phase 3 | Complete |
| CMS-02 | Phase 3 | Complete |
| CMS-03 | Phase 3 | Complete |
| CMS-04 | Phase 3 | Complete |
| JDG-01 | Phase 4 | Complete |
| JDG-02 | Phase 4 | Complete |
| JDG-03 | Phase 4 | Complete |
| JDG-04 | Phase 4 | Complete |
| JDG-05 | Phase 4 | Complete |
| COMP-01 | Phase 4 | Complete |
| ROI-01 | Phase 4 | Complete |
| ROI-02 | Phase 4 | Complete |
| VIDEO-01 | Phase 4 | Complete |
| INFRA-03 | Phase 4 | Complete |
| INFRA-04 | Phase 4 | Complete |
| INFRA-05 | Phase 4 | Complete |
| INFRA-06 | Phase 4 | Complete |
| INFRA-07 | Phase 4 | Complete |

**Coverage:**
- v1 requirements: 43 total
- Mapped to phases: 43
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-07*
*Last updated: 2026-04-07 after roadmap creation*

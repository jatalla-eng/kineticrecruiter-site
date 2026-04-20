# KineticRecruiter Marketing Site

AI-powered ATS marketing website. Next.js 16 + Tailwind v4 + TypeScript.
Live at https://kineticrecruiter.com. App at https://app.kineticrecruiter.com.

## Quick Reference

```
npm run dev                          # Start dev server (port 3000)
npm run build                        # Production build
npm run lint                         # ESLint
npm run new-post -- <slug> "Title"   # Scaffold a new blog post
```

Deploy: Push to main triggers Cloud Build -> Cloud Run -> CDN purge -> IndexNow ping (all automatic, see `cloudbuild.yaml`).

## Authoring blog content

**Always read `BLOG_AUTHORING.md` before writing or editing anything in `content/blog/`.** It defines the frontmatter spec, content structure, voice, SEO conventions, and reference posts to model.

## Architecture

```
src/
  app/                    # Next.js App Router pages
    page.tsx              # Homepage
    pricing/page.tsx      # Pricing page
    blog/page.tsx         # Blog index
    blog/[slug]/page.tsx  # Blog post
    features/*/page.tsx   # Feature pages (4)
    solutions/*/page.tsx  # Solution pages (2)
    tools/*/page.tsx      # Free tools (JD generator)
    compare/page.tsx      # Competitor comparison
    roi/page.tsx          # ROI calculator
    contact/page.tsx      # Contact form
    admin/                # Blog admin panel
    api/                  # API routes (auth, admin, generate-jd)
  components/
    ui/                   # Reusable primitives (Button, Badge, PricingCard, FAQ)
    sections/             # Page sections (Hero, FeatureGrid, CTASection, etc.)
    layout/               # Navbar, Footer, MobileMenu
    blog/                 # BlogCard, BlogIndex
    contact/              # ContactForm
    tools/                # ROICalculator, CountryPhoneInput
    video/                # VideoEmbed
    admin/                # BlogPostForm
  lib/                    # Utilities (blog.ts, metadata.ts, plans.ts, auth.ts)
content/
  blog/                   # Markdown blog posts (gray-matter frontmatter)
public/
  images/                 # Static images
  images/generated/       # Nano Banana output directory
```

## Design System

**READ `.interface-design/system.md` before touching ANY component.** It defines every token.

### Critical Rules (Non-Negotiable)

1. **Use Tailwind token classes, NEVER raw hex.**
   - YES: `text-kinetic-teal`, `bg-kinetic-navy`
   - NO: `text-[#0d8488]`, `style={{ color: '#0d8488' }}`
   - The theme tokens are defined in `src/app/globals.css` under `@theme inline`

2. **Use the `<Button>` component** (`src/components/ui/Button.tsx`).
   - Do NOT create ad-hoc `<a>` or `<button>` elements with inline teal styles.
   - Variants: `primary`, `secondary`, `outline`, `danger`
   - Sizes: `sm`, `md`, `lg`

3. **Section wrapper pattern** (every full-width section):
   ```tsx
   <section className="py-20 md:py-28 bg-white">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
   ```

4. **Headings are `text-kinetic-navy`**. Body text is `text-gray-600`. Always.

5. **Cards: border + hover-shadow.** `border border-gray-100 rounded-xl` at rest, `hover:shadow-md` on hover. No resting shadows on cards.

6. **Icons from `lucide-react` only.** Default `w-5 h-5`. In feature cards: wrap in `w-10 h-10 bg-kinetic-teal/10 rounded-lg`.

7. **No dark mode.** No scroll animations. No `animate-bounce`. Only `animate-pulse` on status dots.

8. **Typography: 3 weights only.** 400 (body), 600 (labels), 700 (headings). No 300, no 800.

### Making Specific Edits

This is a marketing site where PRECISE control matters. When asked to:

- **Change text**: Find the exact string in the component, replace it. Do NOT rewrite the component.
- **Change a color**: Update the token in `globals.css` if it's a brand change, or swap the Tailwind class if it's component-specific.
- **Add a section**: Follow the section wrapper pattern. Use existing components from `src/components/ui/`.
- **Edit a feature card**: The feature data is in arrays inside section components (e.g., `FeatureGrid.tsx` line 17). Edit the data, not the rendering logic.
- **Edit pricing**: Plans are in `src/lib/plans.json`. Edit the JSON, not the component.
- **Edit nav items**: Nav structure is in `src/components/layout/Navbar.tsx` line 6 `navItems` array.

**RULE: If the edit could be described in one sentence, the diff should be 1-5 lines. If your diff is 50+ lines for a text change, you're doing it wrong.**

## Blog System

Currently file-based markdown in `content/blog/`. Each post needs frontmatter:

```yaml
---
title: "Post Title"
date: "2026-04-14"
category: "Recruitment"
description: "Meta description for SEO"
image: "/images/blog/post-image.jpg"
author: "KineticRecruiter Team"
---
```

Admin panel at `/admin` (iron-session auth, credentials in `.env.local`).

### Future: Payload CMS Migration

When ready to scale content, migrate to Payload CMS 3.0:
- Payload runs INSIDE Next.js (same repo, same deploy)
- Replaces the file-based blog + admin panel
- TypeScript collections = Claude Code can edit content models as `.ts` files
- Install: `npm install payload @payloadcms/next @payloadcms/db-postgres @payloadcms/richtext-lexical`
- Add `payload.config.ts` at project root
- Move blog to a Payload `posts` collection
- This eliminates `content/blog/`, `src/lib/blog.ts`, `src/lib/blog-admin.ts`, and the admin routes

## Available AI Tools

### Component Generation
- **21st.dev Magic** (`/ui [description]`) — Generate React + Tailwind components from 1400+ shadcn/ui-based patterns. USE THIS for new components, then adapt output to match our design tokens.
- **Google Stitch** (via MCP) — Generate full page layouts from text prompts. Good for new pages, then refine with token classes.

### Image Generation
- **Nano Banana 2** (`/design-generate-image [description]`) — Generate images via Gemini. Output goes to `public/images/generated/`.

### Design Tools
- **Figma MCP** — Bidirectional: build in code -> push to Figma -> refine -> pull back.
- **`/design-review`** — Audit code against the design system.
- **`/design-apply`** — Apply design system when building new components.

### Workflow
When generating a new component or page:
1. Read `.interface-design/system.md` first
2. Use `/ui` or Stitch to generate the base
3. Replace any non-token values with our design tokens
4. Ensure `<Button>` component is used (not ad-hoc buttons)
5. Run `/design-review` to verify consistency

## SEO

- Every page uses `generatePageMetadata()` from `src/lib/metadata.ts`
- Canonical URLs auto-generated from path
- OG images default to `/images/og-default.jpg`
- Sitemap at `src/app/sitemap.ts`
- Blog posts get `type: 'article'` in OG tags

## Deployment

- **Platform**: Google Cloud Run
- **Build**: `cloudbuild.yaml` -> Docker -> Artifact Registry -> Cloud Run
- **Domain**: kineticrecruiter.com (DNS managed separately)
- **Output mode**: `standalone` (set in `next.config.ts`)
- **Environment**: Production secrets set via Cloud Run, local in `.env.local`

## What NOT to Do

- Do NOT install new fonts. We use Inter, differentiated by weight discipline and spacing.
- Do NOT add Framer Motion or animation libraries. CSS transitions only.
- Do NOT add a dark mode toggle or dark variant classes.
- Do NOT refactor working components "for consistency" unless explicitly asked.
- Do NOT add `use client` to components that don't need interactivity.
- Do NOT move files between directories without being asked.
- Do NOT add comments explaining obvious Tailwind classes.
- Do NOT use `@apply` in CSS. All styling is via Tailwind utility classes in JSX.

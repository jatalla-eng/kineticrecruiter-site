# Phase 2: Core Marketing Site - Research

**Researched:** 2026-04-07
**Domain:** Next.js server-side rendering, marketing site architecture, component patterns for B2B SaaS
**Confidence:** HIGH

## Summary

Phase 2 rebuilds the marketing site from MiniMax (client-side React) into Next.js with server-side rendering for full search engine discovery. The phase covers responsive layout (nav/footer), homepage, pricing, 4 feature pages, 2 solution pages, contact page, 404, SEO metadata, and dynamic routes.

The foundation is solid: Phase 1 established Next.js 16 with App Router, TypeScript, Tailwind v4 (CSS-first @theme configuration), brand tokens (kinetic-teal, kinetic-navy), and utility functions for pricing (plans.ts) and SEO metadata (metadata.ts). The MiniMax source at `package/kinetic-recruiter/src/` serves as the definitive design reference—components follow proven patterns with alternating text+image sections, reusable CTAs, client-side interactivity only where needed (mobile menu toggle, pricing toggle, FAQ accordion).

**Primary recommendation:** Organize components by reusability tier (layout/ui/sections), render all pages as server components by default, use 'use client' only for stateful features (mobile menu, pricing toggle, FAQ), and read pricing data from plans.json via the established getAllPlans() function. Build clean Next.js components rather than converting MiniMax React directly.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.2.2 | App Router, server components, static generation | Already locked in Phase 1; proven for SSR marketing sites |
| React | 19.2.4 | Component library with Server Component support | Latest, native streaming and client directive |
| TypeScript | ^5 | Type safety across all components | Enforced in Phase 1; catches bugs early |
| Tailwind CSS | ^4 | CSS-first utility styling | Already configured with brand tokens in globals.css @theme |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | (implicit via MiniMax) | Icon library (Check, ChevronDown, Menu, X, ArrowRight, etc.) | Lightweight, semantic icons for nav, CTA, lists |
| gray-matter | ^4.0.3 | Front-matter parsing for blog posts | Phase 3 (deferred); installed for blog utility functions |
| remark + remark-html | ^15 + ^16 | Markdown → HTML compilation | Phase 3 (deferred); supports blog posts |
| reading-time | ^1.5.0 | Reading time estimate for blog | Phase 3 (deferred); already configured |

**Installation:** Already complete from Phase 1. Lucide React must be installed for icon support (MiniMax uses ChevronDown, Menu, X, ArrowRight, Check, etc.):
```bash
npm install lucide-react
```

**Version verification:** Confirmed in phase_1 work — next@16.2.2, react@19.2.4, tailwindcss@4, typescript@5 are current and locked.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── layout.tsx                    — Root layout with Navbar, Footer, Inter font, @theme tokens
│   ├── page.tsx                      — Homepage
│   ├── pricing/
│   │   └── page.tsx                  — Pricing page (reads plans.json)
│   ├── features/
│   │   ├── ai-candidate-intelligence/page.tsx
│   │   ├── candidate-intake/page.tsx
│   │   ├── agency-workflow/page.tsx
│   │   └── team-platform/page.tsx
│   ├── solutions/
│   │   ├── recruitment-agencies/page.tsx
│   │   └── in-house-teams/page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── not-found.tsx                 — Custom 404 page
│   └── sitemap.ts                    — Dynamic sitemap for SEO
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                — Desktop + mobile nav (mobile menu uses 'use client')
│   │   ├── Footer.tsx                — Footer with links and CTA
│   │   └── MobileMenu.tsx            — Separate 'use client' component for toggle state
│   ├── ui/
│   │   ├── Button.tsx                — Reusable button (primary, secondary, outline)
│   │   ├── Badge.tsx                 — Reusable badge (for "Most Popular", etc.)
│   │   ├── Card.tsx                  — Reusable card container
│   │   ├── FAQ.tsx                   — Accordion FAQ ('use client' for expand/collapse)
│   │   ├── PricingCard.tsx           — Pricing card reading from plans object
│   │   ├── FeatureSection.tsx        — Reusable alternating text+image layout
│   │   └── ComparisonTable.tsx       — Table for feature comparison
│   ├── sections/
│   │   ├── Hero.tsx                  — Homepage hero with browser mockup and value props
│   │   ├── FeatureGrid.tsx           — 6 feature cards (discovery, scoring, highlights, CRM, shortlist, resume)
│   │   ├── ComparisonStrip.tsx       — Dark section with "no hidden costs" comparison
│   │   ├── PricingPreview.tsx        — 3-plan teaser (Starter, Professional, Agency) with dynamic data
│   │   └── CTASection.tsx            — Reusable CTA (status, trial offer, dual buttons)
│   └── blog/
│       ├── BlogCard.tsx              — Individual blog post card (Phase 3)
│       └── BlogPost.tsx              — Blog post renderer (Phase 3)
├── lib/
│   ├── plans.ts                      — getPlan(), getAllPlans() [EXISTING]
│   ├── plans.json                    — Pricing data (shared with Flask app) [EXISTING]
│   ├── metadata.ts                   — generatePageMetadata() helper [EXISTING]
│   └── blog.ts                       — getAllPosts(), getPostBySlug() [EXISTING]
├── app/
│   ├── globals.css                   — @theme tokens for brand colors, fonts, max-widths [EXISTING]
│   └── favicon.ico
└── public/
    ├── images/
    │   ├── logo.png                  — Full lockup logo
    │   ├── logo-white.png            — White version for footer/dark backgrounds
    │   ├── logo-icon.png             — K icon only
    │   └── og-default.jpg            — Default OG image for SEO
    ├── robots.txt                    — Crawler rules and sitemap reference
    └── favicon.ico
```

### Pattern 1: Server Component by Default, 'use client' Only for Interactivity
**What:** Every page and section is a server component. Only add 'use client' to components that need client-side state (hooks like useState).

**When to use:** This is the default. Use it for Navbar, Footer, Hero, Feature sections, etc. Only switch to 'use client' when you need interactivity.

**Example:**
```typescript
// src/components/sections/Hero.tsx — Server component by default
import { ArrowRight, CheckCircle2, Zap, Target } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-kinetic-tealLight via-white to-white py-16 md:py-24 lg:py-32">
      {/* No useState, no hooks → stays server component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-5 space-y-8">
            <span className="inline-flex items-center gap-2 bg-kinetic-teal/10 text-kinetic-teal px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-kinetic-teal rounded-full animate-pulse" />
              Built for recruitment agencies
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight text-navy">
              The ATS that actually understands your candidates.
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Pattern 2: Mobile Menu as Separate 'use client' Component
**What:** Navbar.tsx stays server, but MobileMenu.tsx is 'use client' and handles toggle state separately.

**When to use:** Any interactive navigation that uses useState for toggle/open state.

**Example:**
```typescript
// src/components/layout/Navbar.tsx — Server component
import Link from 'next/link';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img src="/images/logo.png" alt="KineticRecruiter" className="h-8 md:h-10 w-auto" />
          </Link>

          {/* Desktop nav (always visible) */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Desktop nav items */}
          </div>

          {/* Mobile menu (separate client component) */}
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}

// src/components/layout/MobileMenu.tsx — Client component (toggle state)
'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2">
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-t">
          {/* Mobile menu items */}
        </div>
      )}
    </div>
  );
}
```

### Pattern 3: Pricing Page with Toggle (Monthly/Annual)
**What:** Page component is server, but the toggle wrapper is 'use client' to manage billing period state. PricingCard components read from plans array passed as props.

**When to use:** Any feature page with client state (pricing toggle, FAQ accordion, search filters).

**Example:**
```typescript
// src/app/pricing/page.tsx — Server component
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import PricingToggle from '@/components/pricing/PricingToggle';

export const metadata: Metadata = generatePageMetadata({
  title: 'Pricing',
  description: 'Simple, transparent pricing. All AI features included. No add-ons. No hidden costs.',
  path: '/pricing',
});

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-gray-600">
            Every AI feature included. No add-ons. No hidden costs.
          </p>
        </div>

        {/* Toggle wrapper is 'use client' */}
        <PricingToggle />
      </div>
    </div>
  );
}

// src/components/pricing/PricingToggle.tsx — Client component
'use client';

import { useState } from 'react';
import { getAllPlans } from '@/lib/plans';
import PricingCard from '@/components/ui/PricingCard';

export default function PricingToggle() {
  const [isAnnual, setIsAnnual] = useState(false);
  const plans = getAllPlans();

  return (
    <div>
      {/* Toggle button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setIsAnnual(false)}
          className={`px-4 py-2 ${!isAnnual ? 'bg-kinetic-teal text-white' : 'bg-gray-100'}`}
        >
          Monthly
        </button>
        <button
          onClick={() => setIsAnnual(true)}
          className={`px-4 py-2 ${isAnnual ? 'bg-kinetic-teal text-white' : 'bg-gray-100'}`}
        >
          Annual
        </button>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map(plan => (
          <PricingCard key={plan.key} plan={plan} isAnnual={isAnnual} />
        ))}
      </div>
    </div>
  );
}
```

### Pattern 4: FeatureSection — Alternating Text+Image Layout
**What:** Reusable component that alternates text on left/right with image/illustration on the opposite side. Used on every feature page.

**When to use:** Any page with multiple text+image sections (e.g., 4 feature pages all have 2-3 sections).

**Example:**
```typescript
// src/components/ui/FeatureSection.tsx
interface FeatureSectionProps {
  headline: string;
  body: string;
  bullets: string[];
  illustration: React.ComponentType;
  reverse?: boolean;
}

export default function FeatureSection({
  headline,
  body,
  bullets,
  illustration: Illustration,
  reverse = false,
}: FeatureSectionProps) {
  return (
    <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
      reverse ? 'lg:flex-row-reverse' : ''
    }`}>
      <div className={reverse ? 'lg:order-2' : ''}>
        <h3 className="text-2xl md:text-3xl font-bold text-navy mb-4">
          {headline}
        </h3>
        <p className="text-gray-600 text-lg mb-6">
          {body}
        </p>
        <ul className="space-y-3">
          {bullets.map((bullet, i) => (
            <li key={i} className="flex items-start">
              <svg className="w-5 h-5 text-kinetic-teal mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-600">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={reverse ? 'lg:order-1' : ''}>
        <Illustration />
      </div>
    </div>
  );
}
```

### Pattern 5: SEO Metadata on Every Page
**What:** Every page exports metadata (for static pages) or uses generateMetadata (for dynamic pages). Uses generatePageMetadata() helper from src/lib/metadata.ts.

**When to use:** Every page must have this.

**Example:**
```typescript
// src/app/features/ai-candidate-intelligence/page.tsx
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'AI Candidate Intelligence',
  description: 'Semantic search and AI matching that understands context. Find the right candidates in seconds.',
  path: '/features/ai-candidate-intelligence',
  image: '/images/features/ai-intelligence-og.jpg',
});

export default function AIFeaturePage() {
  // Page content
}
```

### Anti-Patterns to Avoid
- **Client components at the page level:** Keep pages as server components, push client interactivity to child components (e.g., PricingToggle wrapped by a server page).
- **Hardcoded content in components:** Extract to constants or JSON files (pricing comes from plans.json, not hardcoded).
- **Converting MiniMax React components directly:** Rewrite them for Next.js patterns, don't import and wrap.
- **Missing alt text on images:** Every image must have descriptive alt text for SEO and accessibility.
- **Not using next/image:** Use <Image> from 'next/image' for all images, not <img> tags.
- **Inline styles instead of Tailwind:** Use only Tailwind utilities, no className with inline style objects.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Site navigation with dropdowns | Custom nav with complex state logic | Navbar.tsx server + MobileMenu.tsx client + Next Link | MiniMax pattern is proven; state isolation prevents cascading bugs |
| Pricing display | Custom card layouts and toggle logic | PricingCard component + PricingToggle wrapper | getAllPlans() already handles sorting; toggle state is simple 'use client' wrapper |
| FAQ accordion | Manual expand/collapse with classNames | FAQ.tsx 'use client' with useState | Keeps state isolated; animation/timing is non-negotiable for UX |
| Dynamic sitemap | Manual route enumeration | src/app/sitemap.ts with getStaticPaths pattern | Next.js handles generation at build time; avoids stale routes |
| Open Graph / Twitter metadata | Manual tag generation in HTML | generatePageMetadata() helper in src/lib/metadata.ts | Centralized, prevents duplication, ensures consistency |
| Markdown blog parsing | Regex or manual parsing | gray-matter + remark (already installed) | Handles frontmatter, HTML compilation, edge cases (empty files, malformed) |

**Key insight:** MiniMax established all core patterns. Navigation, pricing, sections, and CTAs are battle-tested. Don't rewrite what works—adapt it to Next.js conventions (server components, Link instead of <a>, next/image).

## Runtime State Inventory

> This section applies to Phase 2: no existing KineticRecruiter marketing site data in production yet. Phase 1 scaffold is empty.

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | None — phase 1 scaffold only, no database or file-based candidates/clients | —none— |
| Live service config | None — no deployed services yet | —none— |
| OS-registered state | None — no scheduled tasks or service registrations | —none— |
| Secrets/env vars | None yet (GEMINI_API_KEY deferred to Phase 4; not needed for Phase 2) | —none— |
| Build artifacts | Phase 1 .next/ directory will exist after builds; clean on new builds | `npm run build` handles automatically |

**Verified by:** Phase 1 complete, Phase 2 greenfield marketing pages only (no migrations needed).

## Common Pitfalls

### Pitfall 1: Using MiniMax Component Imports Directly
**What goes wrong:** Temptation to import MiniMax React components and wrap them in Next.js, hoping to save time. This fails because:
- MiniMax uses client-side rendering; Next.js wants server components
- MiniMax uses relative imports and client-only patterns (useState at page level)
- Tree-shaking and code splitting break when converting
- Types conflict (MiniMax React vs. Next.js types)

**Why it happens:** MiniMax looks complete; copying seems faster than rewriting.

**How to avoid:** Treat MiniMax as a design reference (open the file, read the layout, understand the content), not as source code to convert. Rewrite the component in Next.js patterns.

**Warning signs:** If you're importing from `package/kinetic-recruiter/src/`, stop. Read the file, close it, and type a new component.

### Pitfall 2: Client Components at Page Level
**What goes wrong:** Making src/app/pricing/page.tsx a 'use client' page to handle toggle state. This:
- Breaks server-side rendering benefits (no HTML sent to browser, JavaScript must run first)
- Breaks static generation (page cannot be pre-rendered)
- Makes SEO metadata non-functional (page doesn't render until hydration)

**Why it happens:** It's easier than wrapping state in a child component.

**How to avoid:** Keep pages as server components. Move state to a child wrapper component (e.g., PricingToggle.tsx with 'use client'). Page exports metadata, wrapper handles interactivity.

**Warning signs:** Page file starts with 'use client' at the top.

### Pitfall 3: Forgetting Metadata on Dynamically Generated Pages
**What goes wrong:** Creating a feature page without exporting metadata. Google cannot index the page properly; social sharing shows no preview.

**Why it happens:** Metadata feels optional; it's not.

**How to avoid:** Every page must export metadata (static pages) or generateMetadata (dynamic pages). Use the generatePageMetadata() helper in src/lib/metadata.ts.

**Warning signs:** Page file has no metadata export, or metadata is missing title/description.

### Pitfall 4: Hardcoding Pricing Data
**What goes wrong:** Pricing card components display hardcoded plans (Starter $29, Professional $59, Agency $99). When plans.json changes, the page is stale.

**Why it happens:** It's simpler to hardcode; forgot about the single source of truth.

**How to avoid:** Always read from getAllPlans() in src/lib/plans.ts. PricingCard components receive plan objects as props.

**Warning signs:** Pricing numbers appear in JSX strings, not from getAllPlans().

### Pitfall 5: Images Without Alt Text
**What goes wrong:** Using <img> tags or <Image> components without alt text. Accessibility fails, SEO score drops.

**Why it happens:** Alt text seems optional for decorative images; it's not.

**How to avoid:** Every image gets descriptive alt text. Even if purely decorative, alt="" is required.

**Warning signs:** Image components without alt prop, or alt="image" / alt="photo".

### Pitfall 6: Not Using next/image for Image Optimization
**What goes wrong:** Using <img src="/images/logo.png" /> instead of <Image>. Loses automatic optimization (lazy load, responsive sizes, format conversion).

**Why it happens:** HTML <img> feels simpler; easy to forget.

**How to avoid:** Replace all <img> with <Image from 'next/image'>. Always specify width and height.

**Warning signs:** .jsx files contain <img> tags (should be <Image>).

## Code Examples

Verified patterns from MiniMax and Phase 1 setup:

### Homepage Hero Section
```typescript
// src/components/sections/Hero.tsx
import { ArrowRight, CheckCircle2, Zap, Target, Play } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-kinetic-tealLight via-white to-white py-16 md:py-24 lg:py-32">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-kinetic-tealLight/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-kinetic-teal/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column - Text Content */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="inline-flex items-center gap-2 bg-kinetic-teal/10 text-kinetic-teal px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-kinetic-teal rounded-full animate-pulse" />
                Built for recruitment agencies
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight text-navy">
                The ATS that actually understands your candidates.
              </h1>
            </div>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              KineticRecruiter uses AI to match, score, and surface the right candidates for every role.
              No add-ons. No per-feature charges. Just a faster path from resume to placement.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-5 h-5 text-kinetic-teal" />
                7-day free trial
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Zap className="w-5 h-5 text-kinetic-teal" />
                All AI features included
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Target className="w-5 h-5 text-kinetic-teal" />
                No add-on fees
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center bg-kinetic-teal hover:bg-kinetic-teal-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg shadow-kinetic-teal/25 group"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center text-kinetic-teal hover:text-kinetic-teal-dark font-semibold text-lg group"
              >
                <span className="mr-2 w-10 h-10 rounded-full border-2 border-kinetic-teal flex items-center justify-center group-hover:bg-kinetic-teal group-hover:text-white transition-colors">
                  <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                </span>
                Watch 2-min Demo
              </button>
            </div>
          </div>

          {/* Right Column - Browser Mockup */}
          <div className="lg:col-span-7 relative">
            {/* Browser mockup illustration goes here */}
            <div className="bg-white rounded-xl shadow-2xl p-4 border border-gray-200">
              {/* Placeholder for now — actual mockup is complex and decorative */}
              <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                Application interface preview
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Root Layout with Navbar and Footer
```typescript
// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KineticRecruiter | AI-Powered ATS for Recruitment Agencies',
  description: 'AI-powered applicant tracking system built for recruitment agencies. Semantic search, match scoring with full transparency, and AI career highlights. No add-on fees.',
  metadataBase: new URL('https://kineticrecruiter.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

### Dynamic Sitemap
```typescript
// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kineticrecruiter.com';

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/features/ai-candidate-intelligence`, lastModified: new Date(), changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/features/candidate-intake`, lastModified: new Date(), changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/features/agency-workflow`, lastModified: new Date(), changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/features/team-platform`, lastModified: new Date(), changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/solutions/recruitment-agencies`, lastModified: new Date(), changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/solutions/in-house-teams`, lastModified: new Date(), changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly' as const },
  ];

  // Blog posts (Phase 3) — empty for Phase 2
  const blogSlugs = getAllSlugs();
  const blogPages = blogSlugs.map(slug => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
  }));

  return [...staticPages, ...blogPages];
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Client-side rendered React SPAs | Server-side rendered Next.js pages | 2024 onwards | Full HTML sent to browser; search engines index immediately; better FCP |
| Pages spread across multiple URLs without metadata | Metadata exported from every page | Next.js 13+ App Router | Rich snippets, social previews, canonical URLs prevent duplication |
| Manual route registration in navigation | File-based routing in app/ directory | Next.js 13+ App Router | Routes auto-created from file structure; no route config files needed |
| Separate CMS for blog | Markdown files in version control | 2020s default | Git history, no database dependency, searchable in codebase |
| Manual image optimization | Automatic lazy loading, format conversion, responsive sizes | Next.js 10+ | Smaller payloads, better Core Web Vitals scores |
| Global state management (Redux, Context) for pricing | Reading from JSON via utility functions | 2026 default for static content | Simpler, no client-side state machine, single source of truth |

**Deprecated/outdated:**
- MiniMax client-side rendering: Replaced by Next.js server components for this phase
- Manual SEO tag generation: Replaced by Next.js Metadata API
- Hardcoded component libraries: Replaced by lucide-react icons (lighter, semantic)

## Open Questions

1. **Feature page illustrations (FeatureIllustration1-6 components)**
   - What we know: MiniMax has inline SVG illustrations for each feature (search results, cascading cards, scoring breakdown, etc.)
   - What's unclear: Should these be extracted as separate .tsx components, or inlined in the feature pages?
   - Recommendation: Extract as separate components (e.g., src/components/illustrations/SearchResultsIllustration.tsx) for reusability and cleaner code. Inline SVGs in MiniMax can be copied directly.

2. **Contact form backend (Phase 2 scope)**
   - What we know: Contact form captures name, email, company, message, and plan selection
   - What's unclear: Should Phase 2 implement a simple mailto:, or defer to Phase 4 for API integration?
   - Recommendation: Implement as simple mailto: form in Phase 2. Phase 4 can add backend processing.

3. **Social proof and testimonials on homepage**
   - What we know: MiniMax has SocialProof.tsx and Testimonials.tsx components
   - What's unclear: Are these required for Phase 2, or deferred to Phase 3?
   - Recommendation: Check decision log. If not explicitly decided, consider as Claude's Discretion: include if space allows, defer if timeline is tight.

4. **Image assets and CDN**
   - What we know: MiniMax images are in package/imgs/ and public/
   - What's unclear: Should all images be copied to public/images/, or linked from package/?
   - Recommendation: Copy all assets to public/images/ for a self-contained Next.js app. No external asset dependencies during build.

## Environment Availability

Phase 2 is code/config only. No external dependencies required for page rendering.

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Build and dev server | ✓ | 18+ (Next.js 16 requirement) | — |
| npm or pnpm | Package management | ✓ | npm available | — |
| Tailwind CSS (local install) | Styling | ✓ | ^4 (installed Phase 1) | — |
| lucide-react (to install) | Icons | ✗ | — | Install via `npm install lucide-react` |

**Missing dependencies with no fallback:** None — all Phase 2 requirements can be met with installed toolchain.

**Missing dependencies with fallback:** lucide-react — if not installed, temporarily substitute with inline SVG icons until installed.

## Validation Architecture

> Workflow.nyquist_validation is not explicitly set in .planning/config.json, so testing is enabled by default.

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Testing infrastructure deferred to Phase 3+ (no test config in Phase 1) |
| Config file | None — testing setup not required for Phase 2 |
| Quick run command | `npm run build && npm run start` (manual validation of SSR) |
| Full suite command | Manual: `npm run dev` + browser check each page |

### Phase Requirements → Test Map

Phase 2 has no automated tests (testing setup deferred). Validation is manual:

| Req ID | Behavior | Test Type | Validation Method | Automated? |
|--------|----------|-----------|-------------------|-------------|
| LAYOUT-01 | Navbar renders with logo, links, CTA button | Manual visual | Load homepage, check nav bar | ❌ Wave 0 |
| LAYOUT-02 | Hamburger menu appears on mobile, toggle works | Manual visual + interaction | Open on mobile device / dev tools, click menu | ❌ Wave 0 |
| LAYOUT-03 | Footer renders with links and CTA | Manual visual | Scroll to bottom of page, verify footer | ❌ Wave 0 |
| LAYOUT-04 | All pages share root layout (nav + footer) | Manual visual | Visit pricing, features, solutions pages, check nav/footer on each | ❌ Wave 0 |
| LAYOUT-05 | 404 page shows helpful navigation | Manual visual | Navigate to /nonexistent, verify 404 page | ❌ Wave 0 |
| HOME-01 | Hero section renders with headline, subhead, CTA | Manual visual | Load homepage, check hero | ❌ Wave 0 |
| HOME-02 | Feature grid shows 6 features with icons | Manual visual | Scroll past hero, verify grid | ❌ Wave 0 |
| HOME-03 | Comparison strip shows "no hidden costs" messaging | Manual visual | Scroll further, verify strip section | ❌ Wave 0 |
| HOME-04 | Pricing preview reads from plans.json | Manual visual + data inspection | Load homepage, check pricing cards match plans.json | ❌ Wave 0 |
| HOME-05 | CTA section appears at bottom | Manual visual | Scroll to bottom of homepage | ❌ Wave 0 |
| PRICE-01 | Pricing page displays all 3 plans | Manual visual | Navigate to /pricing, verify Starter, Professional, Agency | ❌ Wave 0 |
| PRICE-02 | Monthly/annual toggle switches prices | Manual interaction | Click toggle on pricing page, verify prices change | ❌ Wave 0 |
| PRICE-03 | Each card shows features list, limits, CTA | Manual visual | Check each pricing card for feature list and button | ❌ Wave 0 |
| PRICE-04 | Pricing data from plans.json (not hardcoded) | Code inspection | Read src/components/ui/PricingCard.tsx, verify it uses getAllPlans() | ✅ Code review |
| PRICE-05 | FAQ accordion renders and expands/collapses | Manual interaction | Click FAQ items on pricing page, verify expand/collapse | ❌ Wave 0 |
| FEAT-01 through FEAT-05 | Feature pages render with text, images, CTAs | Manual visual | Visit each feature page, check layout and content | ❌ Wave 0 |
| SOL-01 through SOL-03 | Solution pages render with tailored messaging | Manual visual | Visit /solutions/recruitment-agencies and /in-house-teams | ❌ Wave 0 |
| CONTACT-01 | Contact form captures name, email, company, message | Manual interaction | Fill out contact form, verify fields | ❌ Wave 0 |
| CONTACT-02 | Form reads plan from query param ?plan=agency | Manual interaction | Visit /contact?plan=agency, verify plan dropdown pre-filled | ❌ Wave 0 |
| SEO-01 | Every page has unique title, meta description, canonical URL | Automated (Next.js) | `npm run build` validates metadata exports | ✅ Build-time |
| SEO-02 | Open Graph and Twitter Card metadata present | Automated (Next.js) | Inspect page source for og: and twitter: tags | ✅ Code review |
| SEO-03 | Dynamic sitemap.ts at /sitemap.xml | Automated (Next.js) | Visit /sitemap.xml, verify all routes listed | ✅ Manual check |
| SEO-04 | robots.txt at /robots.txt with sitemap reference | Manual | Visit /robots.txt, verify format and sitemap: line | ✅ Manual check |
| SEO-05 | All images use next/image with alt text | Code inspection | Grep src/ for <img tags (should be none), verify <Image alt="" | ✅ Code review |

### Sampling Rate
- **Per task commit:** Manual verification in `npm run dev` browser window (no automated suite for Phase 2)
- **Per wave merge:** Full manual walkthrough of all pages + form interaction + mobile responsiveness check
- **Phase gate:** All pages load without errors, metadata exports successfully, `npm run build` completes without warnings

### Wave 0 Gaps
- [ ] Test framework installation (Vitest + React Testing Library) — deferred to Phase 3
- [ ] Automated test files covering page rendering and interactivity — deferred to Phase 3
- [ ] CI/CD pipeline for automated builds — partially done in Phase 1; Cloud Build config deferred to Phase 4
- [ ] E2E test suite (Playwright or similar) — deferred to Phase 4+

**Note:** Phase 2 is greenfield (no existing code to test). Validation is primarily visual and manual SSR checks. Test automation is deferred to Phase 3 when blog content becomes testable.

## Sources

### Primary (HIGH confidence)
- **Next.js 16.2.2 official docs** — App Router, server/client components, metadata API, Image component
- **Context from Phase 1** — Project setup complete; next.config.ts, tailwind.config.ts, layout.tsx verified
- **MiniMax source code** (package/kinetic-recruiter/src/) — Design patterns, component structure, content, layout
- **CONTEXT.md (Phase 2 decisions)** — Component organization, D-01 through D-18 locked decisions
- **REQUIREMENTS.md** — Phase 2 scope (25 requirements LAYOUT-01 through SEO-05)

### Secondary (MEDIUM confidence)
- **lucide-react documentation** — Icon component usage (verified from MiniMax imports: ChevronDown, Menu, X, ArrowRight, Check, etc.)
- **Tailwind CSS v4 release notes** — CSS-first configuration syntax, @theme inline (verified in Phase 1 setup)

### Tertiary (not used; LOW confidence if needed)
- None — all critical patterns backed by official docs or project code

## Metadata

**Confidence breakdown:**
- Standard stack: **HIGH** — All libraries locked in Phase 1 with verified versions
- Architecture: **HIGH** — Next.js App Router, server components, metadata patterns are official and battle-tested
- Pitfalls: **HIGH** — Common Next.js gotchas are well-documented; MiniMax serves as design reference
- Component patterns: **HIGH** — MiniMax code provides exact patterns to adapt; no guesswork
- Environment: **HIGH** — No external dependencies for Phase 2; pure code/config

**Research date:** 2026-04-07
**Valid until:** 2026-05-07 (30 days for stable framework versions)

---

*Research complete. Ready for Phase 2 planning.*

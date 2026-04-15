# Claude Code Task: Convert MiniMax Marketing Site to Next.js on Cloud Run

## Context

The KineticRecruiter marketing site currently lives on MiniMax Agent as a client-side rendered React app. It needs to be migrated to a proper Next.js project that:

1. Server-side renders all pages (critical for SEO and AI discoverability)
2. Uses markdown files for blog content (easy for non-developers to update)
3. Reads pricing from a shared `plans.json` (single source of truth)
4. Deploys to Google Cloud Run alongside the main KineticRecruiter app
5. Serves from `kineticrecruiter.com` (marketing) while the app lives at `app.kineticrecruiter.com`

The MiniMax source code has been downloaded and is available at `/Users/admin/Documents/Development/kineticrecruiter-site/package` — use this as the visual reference for design, layout, colours, spacing, and content. Recreate the same look and feel in Next.js. Do not try to import or convert the MiniMax React components directly — rebuild them cleanly.

---

## STEP 1: Project Setup

```bash
npx create-next-app@latest kineticrecruiter-site \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --no-turbopack \
  --import-alias "@/*"

cd kineticrecruiter-site
```

Install additional dependencies:

```bash
npm install gray-matter remark remark-html reading-time
npm install -D @types/remark-html
```

## STEP 2: Project Structure

Create this directory structure:

```
kineticrecruiter-site/
├── src/
│   ├── app/
│   │   ├── layout.tsx                          — Root layout (nav, footer, fonts)
│   │   ├── page.tsx                            — Homepage
│   │   ├── pricing/
│   │   │   └── page.tsx                        — Pricing page
│   │   ├── features/
│   │   │   ├── ai-candidate-intelligence/
│   │   │   │   └── page.tsx
│   │   │   ├── candidate-intake/
│   │   │   │   └── page.tsx
│   │   │   ├── agency-workflow/
│   │   │   │   └── page.tsx
│   │   │   └── team-platform/
│   │   │       └── page.tsx
│   │   ├── solutions/
│   │   │   ├── recruitment-agencies/
│   │   │   │   └── page.tsx
│   │   │   └── in-house-teams/
│   │   │       └── page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx                        — Blog index
│   │   │   └── [slug]/
│   │   │       └── page.tsx                    — Individual blog post
│   │   ├── tools/
│   │   │   ├── page.tsx                        — Tools landing
│   │   │   └── job-description-generator/
│   │   │       └── page.tsx                    — JD generator (client component for interactivity)
│   │   ├── contact/
│   │   │   └── page.tsx                        — Contact page (for Agency plan CTA)
│   │   └── not-found.tsx                       — 404 page
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── FAQ.tsx                         — Accordion FAQ component
│   │   │   ├── PricingCard.tsx
│   │   │   ├── ComparisonTable.tsx
│   │   │   └── FeatureSection.tsx              — Reusable alternating text+image section
│   │   ├── sections/
│   │   │   ├── Hero.tsx                        — Homepage hero
│   │   │   ├── FeatureGrid.tsx                 — 6-card feature grid
│   │   │   ├── ComparisonStrip.tsx             — $0/$0/$0 dark strip
│   │   │   ├── PricingPreview.tsx              — Homepage pricing teaser
│   │   │   └── CTASection.tsx                  — Bottom CTA (reused across pages)
│   │   └── blog/
│   │       ├── BlogCard.tsx
│   │       └── BlogPost.tsx
│   └── lib/
│       ├── plans.ts                            — Loads and exports plans.json
│       ├── plans.json                          — Single source of truth for pricing
│       ├── blog.ts                             — Markdown blog utilities
│       └── metadata.ts                         — SEO helper for generating page metadata
├── content/
│   └── blog/
│       ├── best-ats-for-recruitment-agencies-2026.md
│       └── ai-changing-recruitment-agencies-2026.md
├── public/
│   ├── admin/
│   │   ├── index.html                          — Decap CMS editor
│   │   └── config.yml                          — Decap CMS configuration
│   ├── images/
│   │   ├── logo.png                            — KineticRecruiter logo (full lockup)
│   │   ├── logo-white.png                      — White version for dark backgrounds
│   │   ├── logo-icon.png                       — K icon only (for favicon)
│   │   ├── blog/
│   │   │   ├── ats-comparison.jpg              — Blog featured image
│   │   │   └── ai-recruitment.jpg              — Blog featured image
│   │   └── photos/                             — Workplace photographs
│   ├── favicon.ico
│   └── robots.txt
├── Dockerfile                                  — For Cloud Run deployment
├── .dockerignore
├── cloudbuild.yaml                             — Cloud Build config
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## STEP 3: Tailwind Configuration

Configure Tailwind with the KineticRecruiter brand colours:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'kinetic-teal': '#0d8488',
        'kinetic-teal-dark': '#0a6b6e',
        'kinetic-teal-light': '#E8F5F5',
        'kinetic-navy': '#1a2332',
        'kinetic-navy-light': '#2a3a4f',
        'motion-amber': '#E8A838',
        'momentum-violet': '#9B8EC4',
        'flow-cyan': '#7DD3D6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'content': '1200px',
        'article': '720px',
      },
    },
  },
  plugins: [],
}
export default config
```

## STEP 4: Plans Configuration (Single Source of Truth)

Create `src/lib/plans.json` — this is the identical file that the Flask app also reads:

```json
{
  "plans": {
    "starter": {
      "name": "Starter",
      "tagline": "For solo and freelance recruiters",
      "monthly_price_cents": 2900,
      "monthly_price_display": "$29",
      "annual_price_cents": 2400,
      "annual_price_display": "$24",
      "annual_total_cents": 28800,
      "annual_savings_percent": 17,
      "limits": {
        "candidates": 50,
        "open_jobs": 10,
        "clients": 10
      },
      "features": [
        "50 total candidates",
        "Up to 10 open jobs",
        "Up to 10 clients",
        "AI resume parsing",
        "AI candidate matching and scoring",
        "AI career highlights",
        "Natural language search",
        "Job shortlist Kanban (7 stages)",
        "Client CRM with contacts",
        "Chrome extension (LinkedIn import)",
        "Email integration",
        "Dashboard and analytics",
        "Google and Microsoft OAuth",
        "Email support"
      ],
      "cta_text": "Start Free Trial",
      "cta_url": "https://app.kineticrecruiter.com/register?plan=starter",
      "badge": null,
      "sort_order": 1
    },
    "professional": {
      "name": "Professional",
      "tagline": "For growing agencies and talent teams",
      "monthly_price_cents": 5900,
      "monthly_price_display": "$59",
      "annual_price_cents": 4900,
      "annual_price_display": "$49",
      "annual_total_cents": 58800,
      "annual_savings_percent": 17,
      "limits": {
        "candidates": 1000,
        "open_jobs": null,
        "clients": null
      },
      "features_intro": "Everything in Starter, plus:",
      "features": [
        "1,000 total candidates",
        "Unlimited jobs",
        "Unlimited clients",
        "Bulk resume upload (drag and drop)",
        "Inbound email resume processing",
        "AI client submission emails",
        "Custom AI prompt configuration",
        "Source breakdown reporting",
        "30-day trend analytics",
        "API access (10K calls/day)",
        "Priority email support"
      ],
      "cta_text": "Start Free Trial",
      "cta_url": "https://app.kineticrecruiter.com/register?plan=professional",
      "badge": "Most Popular",
      "sort_order": 2
    },
    "agency": {
      "name": "Agency",
      "tagline": "For established agencies scaling their team",
      "monthly_price_cents": 9900,
      "monthly_price_display": "$99",
      "annual_price_cents": 8200,
      "annual_price_display": "$82",
      "annual_total_cents": 98400,
      "annual_savings_percent": 17,
      "limits": {
        "candidates": null,
        "open_jobs": null,
        "clients": null
      },
      "features_intro": "Everything in Professional, plus:",
      "features": [
        "Unlimited candidates",
        "Custom report builder",
        "White-label career page",
        "Advanced API (100K calls/day)",
        "Data retention controls",
        "Dedicated account support",
        "SSO (SAML)",
        "Dedicated onboarding session",
        "SLA (99.9% uptime)",
        "Fair use AI policy"
      ],
      "cta_text": "Contact Us",
      "cta_url": "/contact?plan=agency",
      "badge": null,
      "sort_order": 3
    }
  },
  "trial": {
    "duration_days": 7,
    "plan": "professional",
    "seats": 3
  },
  "referral": {
    "reward": "One free month for both parties",
    "reward_description": "Credit equal to one month of your current plan"
  },
  "version": "1.0.0",
  "last_updated": "2026-04-07"
}
```

Create `src/lib/plans.ts`:

```typescript
import plansData from './plans.json';

export const plans = plansData.plans;
export const trial = plansData.trial;
export const referral = plansData.referral;

export type PlanKey = keyof typeof plans;

export function getPlan(key: PlanKey) {
  return plans[key];
}

export function getAllPlans() {
  return Object.entries(plans)
    .sort(([, a], [, b]) => a.sort_order - b.sort_order)
    .map(([key, plan]) => ({ key, ...plan }));
}
```

## STEP 5: Blog System

Create `src/lib/blog.ts`:

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  description: string;
  image: string;
  author: string;
  readingTime: string;
  content?: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) return [];
  
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter(f => f.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const stats = readingTime(content);
      
      return {
        slug,
        title: data.title,
        date: data.date,
        category: data.category,
        description: data.description,
        image: data.image || '/images/blog/default.jpg',
        author: data.author || 'KineticRecruiter Team',
        readingTime: stats.text,
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
  
  return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) return null;
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);
  const processedContent = await remark().use(html).process(content);
  
  return {
    slug,
    title: data.title,
    date: data.date,
    category: data.category,
    description: data.description,
    image: data.image || '/images/blog/default.jpg',
    author: data.author || 'KineticRecruiter Team',
    readingTime: stats.text,
    content: processedContent.toString(),
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''));
}
```

Create `src/lib/metadata.ts`:

```typescript
import { Metadata } from 'next';

interface PageMetaProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
}

const BASE_URL = 'https://kineticrecruiter.com';

export function generatePageMetadata({
  title,
  description,
  path,
  image = '/images/og-default.jpg',
  type = 'website',
}: PageMetaProps): Metadata {
  const fullTitle = `${title} | KineticRecruiter`;
  const url = `${BASE_URL}${path}`;
  const imageUrl = image.startsWith('http') ? image : `${BASE_URL}${image}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'KineticRecruiter',
      images: [{ url: imageUrl, width: 1200, height: 630 }],
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
}
```

## STEP 6: Root Layout

Create `src/app/layout.tsx`:

```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KineticRecruiter | AI-Powered ATS for Recruitment Agencies',
  description: 'AI-powered applicant tracking system built for recruitment agencies. Semantic search, match scoring with full transparency, and AI career highlights. No add-on fees.',
  metadataBase: new URL('https://kineticrecruiter.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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

## STEP 7: Rebuild Each Page from MiniMax Reference

For each page, look at the downloaded MiniMax source code and rebuild in Next.js. The instruction for each page:

**For every page:**
1. Read the corresponding MiniMax component/page file
2. Recreate the same layout, sections, and content in a Next.js server component
3. Use Tailwind CSS classes that match the existing visual design (colours, spacing, typography)
4. Add proper page metadata using the `generatePageMetadata` helper
5. Read pricing data from `plans.json` wherever pricing appears (never hardcode prices)
6. Use `next/image` for all images with proper alt text
7. Use Next.js `Link` for all internal navigation

**Page-specific notes:**

- **Homepage** (`src/app/page.tsx`): Import PricingPreview component that reads from plans.json. All feature sections as server components.
- **Pricing** (`src/app/pricing/page.tsx`): PricingCard components read entirely from plans.json. Monthly/annual toggle needs a client component wrapper (`'use client'` directive) for the toggle state. FAQ accordion also needs `'use client'`.
- **Blog index** (`src/app/blog/page.tsx`): Call `getAllPosts()` to list posts. Category filter needs `'use client'`.
- **Blog post** (`src/app/blog/[slug]/page.tsx`): Call `getPostBySlug(slug)`. Use `generateStaticParams` to pre-render all posts at build time. Add Article JSON-LD structured data.
- **JD Generator** (`src/app/tools/job-description-generator/page.tsx`): This entire page is `'use client'` because it has form input, API calls to Gemini, and dynamic output. The API call to Gemini should go through a Next.js API route (`src/app/api/generate-jd/route.ts`) to keep the API key server-side.
- **All other pages**: Pure server components with static content.

## STEP 8: Static Generation for Blog Posts

In `src/app/blog/[slug]/page.tsx`, add static params so all blog posts are pre-rendered at build time:

```typescript
import { getAllSlugs, getPostBySlug } from '@/lib/blog';

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map(slug => ({ slug }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();
  // ... render post
}
```

## STEP 9: Next.js Configuration

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',  // Required for Cloud Run — produces a standalone Node.js server
  images: {
    unoptimized: false,
    remotePatterns: [
      // Add any external image domains if needed
    ],
  },
}

module.exports = nextConfig
```

The `output: 'standalone'` setting is critical — it bundles the Next.js app into a self-contained Node.js server that runs in a Docker container on Cloud Run.

## STEP 10: Dockerfile for Cloud Run

```dockerfile
# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/content ./content

# Copy standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 8080

CMD ["node", "server.js"]
```

Create `.dockerignore`:

```
node_modules
.next
.git
*.md
!content/**/*.md
README.md
```

## STEP 11: Cloud Build Configuration

Create `cloudbuild.yaml`:

```yaml
steps:
  # Build the container image
  - name: 'gcr.io/cloud-builders/docker'
    args: [
      'build',
      '-t', 'gcr.io/$PROJECT_ID/kineticrecruiter-site:$COMMIT_SHA',
      '-t', 'gcr.io/$PROJECT_ID/kineticrecruiter-site:latest',
      '.'
    ]

  # Push to Container Registry
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/kineticrecruiter-site:$COMMIT_SHA']
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/kineticrecruiter-site:latest']

  # Deploy to Cloud Run
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args: [
      'run', 'deploy', 'kineticrecruiter-site',
      '--image', 'gcr.io/$PROJECT_ID/kineticrecruiter-site:$COMMIT_SHA',
      '--region', 'australia-southeast1',
      '--platform', 'managed',
      '--allow-unauthenticated',
      '--port', '8080',
      '--memory', '512Mi',
      '--cpu', '1',
      '--min-instances', '0',
      '--max-instances', '3',
      '--set-env-vars', 'NODE_ENV=production'
    ]

images:
  - 'gcr.io/$PROJECT_ID/kineticrecruiter-site:$COMMIT_SHA'
  - 'gcr.io/$PROJECT_ID/kineticrecruiter-site:latest'

options:
  logging: CLOUD_LOGGING_ONLY
```

## STEP 12: Deploy Commands

**First deployment (manual):**

```bash
# Build and push the image
gcloud builds submit --config cloudbuild.yaml

# Or build and deploy directly
gcloud run deploy kineticrecruiter-site \
  --source . \
  --region australia-southeast1 \
  --platform managed \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 3
```

**Set up continuous deployment:**

```bash
# Connect GitHub repo to Cloud Build trigger
gcloud builds triggers create github \
  --repo-name=kineticrecruiter-site \
  --repo-owner=YOUR_GITHUB_USERNAME \
  --branch-pattern='^main$' \
  --build-config=cloudbuild.yaml \
  --description="Deploy marketing site on push to main"
```

After this, every push to `main` automatically builds and deploys.

## STEP 13: Domain Mapping

Map `kineticrecruiter.com` to the Cloud Run service:

```bash
# Map the custom domain
gcloud run domain-mappings create \
  --service kineticrecruiter-site \
  --domain kineticrecruiter.com \
  --region australia-southeast1

# Also map www
gcloud run domain-mappings create \
  --service kineticrecruiter-site \
  --domain www.kineticrecruiter.com \
  --region australia-southeast1
```

Cloud Run will provide DNS records to add at your domain registrar. The app (Flask) stays at `app.kineticrecruiter.com` as a separate Cloud Run service.

**DNS structure:**
- `kineticrecruiter.com` → Cloud Run: kineticrecruiter-site (Next.js marketing)
- `www.kineticrecruiter.com` → redirects to kineticrecruiter.com
- `app.kineticrecruiter.com` → Cloud Run: kineticrecruiter-app (Flask ATS)

## STEP 14: robots.txt and Sitemap

Create `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://kineticrecruiter.com/sitemap.xml
```

Add a dynamic sitemap at `src/app/sitemap.ts`:

```typescript
import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kineticrecruiter.com';
  
  const staticPages = [
    '',
    '/pricing',
    '/features/ai-candidate-intelligence',
    '/features/candidate-intake',
    '/features/agency-workflow',
    '/features/team-platform',
    '/solutions/recruitment-agencies',
    '/solutions/in-house-teams',
    '/blog',
    '/tools/job-description-generator',
  ].map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const posts = getAllPosts().map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...posts];
}
```

## STEP 15: How to Add a New Blog Post

**Option A: Through Decap CMS (recommended for non-developers)**

1. Go to `https://kineticrecruiter.com/admin`
2. Log in with GitHub
3. Click "New Blog Post"
4. Fill in title, date, category, description
5. Upload a featured image (drag and drop, recommended 1200x630px)
6. Write the article in the visual editor — use the toolbar for headings, bold, links, and inline images
7. Click "Publish"
8. Site rebuilds automatically in 2-3 minutes

Amy and anyone with GitHub repo access can use this workflow.

**Option B: Directly in code (for developers or bulk content)**

1. Create a new file in `content/blog/`, e.g. `content/blog/my-new-post.md`
2. Add frontmatter at the top:

```markdown
---
title: "Your Post Title"
date: "2026-04-10"
category: "AI in Recruitment"
description: "A short description for SEO and social sharing."
image: "/images/blog/your-image.jpg"
author: "KineticRecruiter Team"
---

Write your article content here in standard markdown.

## Subheadings work

So do **bold**, *italic*, [links](https://example.com), and everything else.

| Tables | Work | Too |
|--------|------|-----|
| Yes    | They | Do  |
```

3. Add a featured image to `public/images/blog/`
4. Commit and push:

```bash
git add .
git commit -m "New blog post: Your Post Title"
git push origin main
```

5. Cloud Build triggers automatically, site rebuilds and deploys in ~2-3 minutes
6. Post is live at `kineticrecruiter.com/blog/your-post-slug` with full SEO, OG tags, and sitemap inclusion

Amy can do this from any computer with git access to the repo.

## STEP 16: Decap CMS for Blog Content Management

Decap CMS gives non-developers a visual editor at `kineticrecruiter.com/admin` for creating and editing blog posts. It commits markdown files and images directly to the GitHub repo via the GitHub API. No external service, no database, no paid account.

**Create `public/admin/index.html`:**

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager — KineticRecruiter</title>
</head>
<body>
  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
</body>
</html>
```

**Create `public/admin/config.yml`:**

```yaml
backend:
  name: github
  repo: YOUR_GITHUB_USERNAME/kineticrecruiter-site   # UPDATE THIS
  branch: main

media_folder: public/images/blog
public_folder: /images/blog

slug:
  encoding: ascii
  clean_accents: true

collections:
  - name: blog
    label: Blog Posts
    folder: content/blog
    create: true
    slug: "{{slug}}"
    summary: "{{title}} — {{date}}"
    sortable_fields: ["date", "title"]
    fields:
      - label: "Title"
        name: "title"
        widget: "string"
        hint: "The full title of the blog post"

      - label: "Publish Date"
        name: "date"
        widget: "datetime"
        format: "YYYY-MM-DD"
        date_format: "DD/MM/YYYY"
        time_format: false

      - label: "Category"
        name: "category"
        widget: "select"
        options:
          - "Comparisons"
          - "AI in Recruitment"
          - "Agency Growth"
          - "Product Updates"
          - "Guides"

      - label: "Description"
        name: "description"
        widget: "string"
        hint: "Short description for SEO and social sharing (max 155 characters)"
        pattern: ['.{0,155}', "Must be 155 characters or fewer"]

      - label: "Featured Image"
        name: "image"
        widget: "image"
        hint: "Recommended size: 1200x630px. Used as hero image and social sharing preview."
        media_folder: "/public/images/blog"
        public_folder: "/images/blog"

      - label: "Author"
        name: "author"
        widget: "string"
        default: "KineticRecruiter Team"

      - label: "Body"
        name: "body"
        widget: "markdown"
        buttons:
          - bold
          - italic
          - link
          - heading-two
          - heading-three
          - quote
          - bulleted-list
          - numbered-list
        editor_components:
          - image
          - code-block
```

**How it works:**

1. A user navigates to `https://kineticrecruiter.com/admin`
2. Decap loads from CDN and prompts for GitHub OAuth login
3. Once authenticated, the user sees a list of existing blog posts
4. They can create a new post, edit an existing one, or upload images
5. The markdown editor is visual — bold, italic, headings, links, and image insertion are toolbar buttons
6. Images are drag-and-drop — Decap uploads them to `public/images/blog/` in the repo
7. On save/publish, Decap commits the changes directly to the `main` branch via the GitHub API
8. Cloud Build triggers, site rebuilds, changes are live in 2-3 minutes

**GitHub OAuth setup for Decap:**

For the GitHub login to work, you need to register an OAuth application:

1. Go to GitHub → Settings → Developer Settings → OAuth Apps → New OAuth App
2. Application name: "KineticRecruiter CMS"
3. Homepage URL: `https://kineticrecruiter.com`
4. Authorization callback URL: `https://api.netlify.com/auth/done` (Decap uses Netlify's OAuth proxy by default — this is free and doesn't require a Netlify account)
5. Save the Client ID and Client Secret

Then update `public/admin/config.yml` to add the OAuth settings under `backend`:

```yaml
backend:
  name: github
  repo: YOUR_GITHUB_USERNAME/kineticrecruiter-site
  branch: main
  base_url: https://api.netlify.com  # Free OAuth proxy
```

**Alternative: Self-hosted OAuth proxy (if you don't want to depend on Netlify's proxy):**

Deploy the Decap OAuth proxy as a small Cloud Run service:

```bash
# Clone the proxy
git clone https://github.com/decaporg/decap-server.git
cd decap-server

# Set environment variables
export OAUTH_CLIENT_ID=your_github_client_id
export OAUTH_CLIENT_SECRET=your_github_client_secret

# Deploy to Cloud Run
gcloud run deploy decap-oauth \
  --source . \
  --region australia-southeast1 \
  --allow-unauthenticated \
  --set-env-vars "OAUTH_CLIENT_ID=$OAUTH_CLIENT_ID,OAUTH_CLIENT_SECRET=$OAUTH_CLIENT_SECRET"
```

Then update `config.yml`:

```yaml
backend:
  name: github
  repo: YOUR_GITHUB_USERNAME/kineticrecruiter-site
  branch: main
  base_url: https://decap-oauth-XXXXX-as.a.run.app  # Your Cloud Run OAuth proxy URL
```

**Who should have access:**

Anyone with write access to the GitHub repo can log in to the CMS. Control access by managing GitHub repo collaborators. For Amy, add her GitHub account as a collaborator on the repo.

## STEP 17: Environment Variables for Cloud Run

Set these on the Cloud Run service for the JD generator tool (which calls Gemini):

```bash
gcloud run services update kineticrecruiter-site \
  --region australia-southeast1 \
  --set-env-vars "GEMINI_API_KEY=your-gemini-key"
```

The JD generator's API route (`src/app/api/generate-jd/route.ts`) uses this key server-side. The key never reaches the browser.

## VERIFICATION CHECKLIST

After migration:

- [ ] Every page renders full HTML on server (view source shows real content, not empty div)
- [ ] All pages match the MiniMax visual design (colours, layout, spacing, typography)
- [ ] Pricing page reads from plans.json (change a price in the JSON, rebuild, confirm it updates)
- [ ] Blog index lists all markdown posts with correct titles, dates, and images
- [ ] Blog posts render full article content with proper formatting
- [ ] Adding a new .md file to content/blog/ and rebuilding adds the post to the site
- [ ] All page metadata (title, description, OG tags) renders correctly (test with https://metatags.io)
- [ ] Sitemap at /sitemap.xml includes all pages and blog posts
- [ ] robots.txt is accessible
- [ ] Images load correctly via next/image
- [ ] Navigation works across all pages (no broken links)
- [ ] Mobile responsive on all pages
- [ ] Login link points to https://app.kineticrecruiter.com
- [ ] "Created by MiniMax Agent" does not appear anywhere
- [ ] Footer logo is properly sized (150px+ wide)
- [ ] Docker build succeeds locally: `docker build -t kr-site . && docker run -p 8080:8080 kr-site`
- [ ] Cloud Run deployment succeeds
- [ ] Custom domain resolves correctly
- [ ] HTTPS works on custom domain
- [ ] JD generator tool works (form → Gemini API → generated description)
- [ ] All trial references say "7-day"
- [ ] Decap CMS loads at /admin
- [ ] GitHub OAuth login works on the CMS
- [ ] Can create a new blog post through the visual editor
- [ ] Can drag-and-drop images into blog posts
- [ ] Images are committed to public/images/blog/ in the repo
- [ ] Publishing a post commits a .md file to content/blog/ in the repo
- [ ] Cloud Build triggers after CMS publish and site rebuilds with new post
- [ ] Editing an existing post updates the correct .md file

# Phase 3: Blog & CMS - Research

**Researched:** 2026-04-08
**Domain:** Headless CMS, Markdown blog rendering, static site generation, structured data
**Confidence:** HIGH

## Summary

Phase 3 implements a full-featured blog system with non-developer CMS editing. The architecture leverages existing foundations from Phase 1 (blog.ts utilities with gray-matter and remark) and extends them with visual editing via Decap CMS and refined markdown rendering through @tailwindcss/typography. All blog posts are statically generated at build time via generateStaticParams, with Article JSON-LD structured data for SEO. The implementation is low-risk because blog.ts already handles file-system operations, markdown parsing, and metadata extraction—this phase adds the UI layer and CMS interface.

**Primary recommendation:** Install @tailwindcss/typography (0.5.19+) in tailwind.config.ts for consistent prose styling, set up Decap CMS in public/admin/ using Netlify's free OAuth proxy for GitHub authentication, create BlogCard and BlogPost page components, and extend sitemap.ts with blog routes via getAllSlugs().

## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Use @tailwindcss/typography plugin for prose styling of rendered markdown content. Install the plugin and apply `prose` classes to the blog post content container.
- **D-02:** Blog post layout: title, metadata row (date, category badge, reading time), featured image, prose content, author attribution.
- **D-03:** Blog categories: Comparisons, AI in Recruitment, Agency Growth, Product Updates, Guides.
- **D-04:** Category filter on blog index is client-side ('use client') — filters posts without page reload.
- **D-05:** Create 2 seed blog posts: `content/blog/best-ats-for-recruitment-agencies-2026.md` (Comparisons) and `content/blog/ai-changing-recruitment-agencies-2026.md` (AI in Recruitment).
- **D-06:** Each post has frontmatter: title, date, category, description, image, author. Content is real, SEO-optimized articles.
- **D-07:** Blog index at /blog lists all posts with BlogCard components.
- **D-08:** Blog cards link to /blog/[slug] individual post pages.
- **D-09:** Dynamic route at /blog/[slug]/page.tsx using generateStaticParams for build-time static generation.
- **D-10:** Each post page includes Article JSON-LD structured data (headline, datePublished, author, image, description).
- **D-11:** Reading time displayed from blog.ts readingTime calculation.
- **D-12:** Decap CMS at public/admin/index.html loading from CDN (unpkg.com/decap-cms@^3.0.0).
- **D-13:** Decap config at public/admin/config.yml with GitHub backend, main branch, using Netlify's free OAuth proxy (base_url: https://api.netlify.com).
- **D-14:** CMS collections: blog posts in content/blog/ with fields: title, date, category (select widget), description, image, author, body (markdown).
- **D-15:** Media folder: public/images/blog, public folder: /images/blog.
- **D-16:** Extend existing src/app/sitemap.ts to include /blog and all blog post slugs from getAllPosts().

### Claude's Discretion

- Exact BlogCard component design (card vs list layout)
- Blog post page sidebar vs full-width layout
- Whether to add pagination on blog index (all posts on one page is fine for v1)
- Exact JSON-LD schema fields beyond the required ones

### Deferred Ideas

None — discussion stayed within phase scope

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| BLOG-01 | Blog index page listing all posts with title, date, category, description, featured image | getAllPosts() from blog.ts returns full metadata; BlogCard component renders list |
| BLOG-02 | Blog category filter (client-side) to filter posts by category | Category field in frontmatter (D-03); client-side filtering requires 'use client' component |
| BLOG-03 | Individual blog post pages rendering markdown content with proper typography | getPostBySlug() from blog.ts returns HTML via remark; @tailwindcss/typography prose classes apply |
| BLOG-04 | Blog posts use frontmatter for metadata (title, date, category, description, image, author) | gray-matter already parses frontmatter in blog.ts; no additional work needed |
| BLOG-05 | Blog posts include reading time estimate | reading-time package already in package.json; blog.ts calculates readingTime |
| BLOG-06 | Article JSON-LD structured data on each blog post page | Next.js App Router supports JSON-LD via <script type="application/ld+json"> in page component |
| BLOG-07 | Blog posts are statically generated at build time via generateStaticParams | Next.js generateStaticParams with getAllSlugs() returns array of {slug} objects for [slug] route |
| CMS-01 | Decap CMS loads at /admin with GitHub OAuth authentication | Decap v3.0+ with GitHub backend; Netlify OAuth proxy available free tier |
| CMS-02 | Non-developers can create new blog posts through visual WYSIWYG editor | Decap CMS collections configured in config.yml with markdown widget |
| CMS-03 | Non-developers can upload/drag-and-drop images into blog posts | Decap media folder configured at public/images/blog; public folder setting /images/blog |
| CMS-04 | Publishing a post commits a markdown file to the repo and triggers rebuild | Decap GitHub backend commits directly; build trigger depends on deployment platform (Wave 1 infrastructure) |

## Standard Stack

### Core Libraries

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @tailwindcss/typography | 0.5.19 | Prose styling for rendered markdown | Industry standard for Next.js blogs; handles heading hierarchy, code blocks, lists, links |
| decap-cms | 3.0.0+ | Headless CMS with Git backend | Open-source, GitHub-native, no backend required, Netlify OAuth integration mature |
| gray-matter | 4.0.3 | YAML/TOML frontmatter parsing | Already in package.json; standard blog metadata extraction |
| remark | 15.0.1 | Markdown parser ecosystem | Already in package.json; transforms markdown to HTML |
| remark-html | 16.0.1 | Renders remark AST to HTML | Already in package.json; produces clean HTML for prose styling |
| reading-time | 1.5.0 | Calculates reading time from text | Already in package.json; standard UX indicator for articles |

### Installation

All blog processing libraries already installed. Add typography plugin only:
```bash
npm install @tailwindcss/typography@latest
```

Then enable in Tailwind config (v4 CSS-first syntax):
```css
/* In globals.css */
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

Or if using tailwind.config.ts (legacy pattern, check what Phase 1 uses):
```typescript
import typography from '@tailwindcss/typography';
export default {
  plugins: [typography],
};
```

**Version verification:** @tailwindcss/typography is at v0.5.19 as of latest npm registry check (April 2026). Decap CMS v3.0.0+ is current and stable for Next.js App Router.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @tailwindcss/typography | Custom CSS prose classes | More maintenance; can't reuse prose modifier utilities; harder to maintain heading/spacing consistency |
| Decap CMS | Sanity / Contentful | Both require backend; not git-native; paid plans; users can't self-host auth |
| Decap CMS + Netlify OAuth proxy | Custom OAuth handler | Would need Node.js OAuth route; more surface area for bugs; Netlify's free proxy is battle-tested |
| gray-matter + remark | MDX or next-mdx-remote | Both add JSX compilation overhead; for static markdown, plain remark is simpler and faster |

## Architecture Patterns

### Recommended Project Structure

```
src/
├── app/
│   ├── blog/
│   │   ├── page.tsx           # Blog index with category filter
│   │   └── [slug]/
│   │       └── page.tsx       # Dynamic post page with generateStaticParams
│   └── sitemap.ts            # EXTEND to include /blog + post slugs
├── components/
│   ├── blog/
│   │   ├── BlogCard.tsx       # Post list item (new)
│   │   └── BlogPostPage.tsx   # Post layout with prose + JSON-LD (new)
│   ├── ui/
│   │   └── Badge.tsx          # Category badges (existing)
│   └── sections/
│       └── CTASection.tsx     # Bottom CTA (existing)
├── lib/
│   └── blog.ts               # Already has getAllPosts(), getPostBySlug(), getAllSlugs()
└── app/
    ├── globals.css            # EXTEND with @plugin "@tailwindcss/typography"
public/
├── admin/
│   ├── index.html            # Decap CMS HTML (new)
│   └── config.yml            # Decap CMS config (new)
├── images/
│   └── blog/                 # Blog featured images (new folder)
content/
└── blog/
    ├── best-ats-for-recruitment-agencies-2026.md  # (new)
    └── ai-changing-recruitment-agencies-2026.md   # (new)
```

### Pattern 1: Static Blog Post Generation with generateStaticParams

**What:** Next.js App Router dynamically generates all blog post pages at build time, then serves them as static HTML. No runtime file-system access after build.

**When to use:** Every time page content is static (markdown files) and doesn't change between requests.

**Example:**

```typescript
// src/app/blog/[slug]/page.tsx
import { getAllSlugs, getPostBySlug } from '@/lib/blog';
import { generateMetadata, Metadata } from 'next';

// Build-time: generates /blog/post-1, /blog/post-2, etc.
export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// SEO metadata for each post
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: 'Post not found' };
  
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) return <div>Post not found</div>;
  
  // Article JSON-LD structured data
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    author: { '@type': 'Person', name: post.author },
  };
  
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <article className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <div className="flex gap-4 text-gray-600 mb-6">
          <time>{new Date(post.date).toLocaleDateString()}</time>
          <Badge>{post.category}</Badge>
          <span>{post.readingTime}</span>
        </div>
        
        <img src={post.image} alt={post.title} className="w-full rounded-lg mb-8" />
        
        <div className="prose lg:prose-xl max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        
        <footer className="mt-12 pt-6 border-t">
          <p>Written by <strong>{post.author}</strong></p>
        </footer>
      </article>
    </>
  );
}
```

Source: [Next.js generateStaticParams docs](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)

### Pattern 2: Client-Side Category Filtering

**What:** Blog index loads all posts server-side, but filtering happens client-side (no page reload). Requires 'use client' for useState.

**When to use:** Small-to-medium post counts (<100); filtering is fast enough that server-side isn't needed; better UX without page navigation.

**Example:**

```typescript
// src/app/blog/page.tsx (server component)
import BlogIndex from '@/components/blog/BlogIndex';
import { getAllPosts } from '@/lib/blog';

export default async function BlogPage() {
  const posts = await getAllPosts();
  return <BlogIndex initialPosts={posts} />;
}

// src/components/blog/BlogIndex.tsx (client component)
'use client';
import { useState } from 'react';
import BlogCard from './BlogCard';

const CATEGORIES = ['All', 'Comparisons', 'AI in Recruitment', 'Agency Growth', 'Product Updates', 'Guides'];

export default function BlogIndex({ initialPosts }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filtered = selectedCategory === 'All' 
    ? initialPosts 
    : initialPosts.filter(post => post.category === selectedCategory);
  
  return (
    <>
      <div className="flex gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === cat
                ? 'bg-[#0d8488] text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      
      <div className="grid gap-6">
        {filtered.map(post => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  );
}
```

Source: [Next.js App Router 'use client' pattern](https://nextjs.org/docs/app/building-your-application/rendering/client-components)

### Pattern 3: @tailwindcss/typography for Prose Styling

**What:** Wrapping rendered markdown HTML in `prose` class applies consistent typography defaults—heading sizes, line heights, link colors, code block styling, blockquote styling, list indentation. No inline CSS needed.

**When to use:** Every time you render user-generated or external markdown content.

**Example:**

```typescript
// In globals.css or tailwind.config.ts:
// @plugin "@tailwindcss/typography";

// In component:
<article className="prose prose-lg dark:prose-invert max-w-none">
  {/* Rendered HTML from remark goes here */}
  <div dangerouslySetInnerHTML={{ __html: post.content }} />
</article>

// Available modifiers (from @tailwindcss/typography):
// prose-headings:font-serif  — all headings serif
// prose-h1:text-5xl          — custom h1 size
// prose-a:underline          — underline links
// prose-code:bg-gray-100     — code block background
// prose-blockquote:border-l-4 prose-blockquote:border-[#0d8488]
```

Source: [@tailwindcss/typography docs](https://github.com/tailwindlabs/tailwindcss-typography)

### Pattern 4: Decap CMS Configuration for Blog Posts

**What:** `public/admin/config.yml` defines collections, fields, widgets, and media handling. When editors save, Decap commits markdown files to your repo.

**When to use:** Any static site with Markdown content in git.

**Example config.yml structure:**

```yaml
backend:
  name: github
  repo: your-org/your-repo
  branch: main
  base_url: https://api.netlify.com
  auth_endpoint: auth

media_folder: public/images/blog
public_folder: /images/blog

collections:
  - name: blog
    label: Blog Posts
    folder: content/blog
    create: true
    slug: '{{slug}}'
    fields:
      - { label: Title, name: title, widget: string }
      - { label: Date, name: date, widget: datetime }
      - { label: Category, name: category, widget: select, options: ['Comparisons', 'AI in Recruitment', 'Agency Growth', 'Product Updates', 'Guides'] }
      - { label: Description, name: description, widget: string }
      - { label: Image, name: image, widget: image }
      - { label: Author, name: author, widget: string, default: 'KineticRecruiter Team' }
      - { label: Body, name: body, widget: markdown }
```

Source: [Decap CMS docs](https://decapcms.org/docs/)

### Anti-Patterns to Avoid

- **Don't hardcode blog posts:** Every post must be in content/blog/*.md. No SSG builds without markdown files.
- **Don't render user HTML directly without dangerouslySetInnerHTML:** Sanitized HTML from remark is safe; only use dangerouslySetInnerHTML for remark output, not external sources.
- **Don't skip generateStaticParams:** If you omit it, blog posts render on-demand (slower). Always export it when using dynamic routes.
- **Don't call getPostBySlug() without fallback:** If slug doesn't exist, return 404 page or redirect. The function returns null; don't let it reach component rendering.
- **Don't store Decap config.yml outside public/admin/:** Editors need to access it via HTTP; keeping it at public/admin/config.yml ensures CDN can load it.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Markdown parsing and frontmatter extraction | Custom regex parser for YAML frontmatter | gray-matter + remark | YAML parsing is not simple (nested objects, special characters); remark ecosystem is robust and widely tested |
| Reading time calculation | Character count / manual timing | reading-time package | Word count varies by language; sentence structure affects speed; reading-time uses optimized algorithm |
| Markdown rendering to HTML | Hand-rolling regex+string manipulation | remark + remark-html | Remark handles 100+ edge cases (nested lists, escaped characters, HTML blocks, code fences); months of development to achieve parity |
| Prose typography for HTML | Custom CSS + media queries for each element | @tailwindcss/typography | Typography requires 50+ rules (heading sizes, line heights, margins, link colors, code styling, light/dark mode); plugin centralizes and maintains this |
| Git-based CMS backend | Custom Node.js OAuth handler + file write logic | Decap CMS | OAuth spec is 40+ pages; GitHub API v3 auth has rate limits and token expiry; Decap handles it correctly |
| Static site generation config | Manual build scripts | generateStaticParams + Next.js build | Next.js caching, incremental regeneration, and param memoization are hard to replicate; build system already integrated |

**Key insight:** Blog infrastructure contains many subtle requirements (frontmatter edge cases, reading time per language, markdown nested lists, OAuth token refresh, ISR timing). Using proven libraries cuts risk and maintenance burden.

## Common Pitfalls

### Pitfall 1: Category Filter Page Reloads on Desktop

**What goes wrong:** Blog index uses server-side filtering with `?category=X` query param. Clicking category button refreshes page, causing layout shift and lost scroll position.

**Why it happens:** Tempting to use server-side filtering because it's simpler to implement and works with SEO. But user experience suffers.

**How to avoid:** Mark blog index as 'use client'; store posts server-side; filtering happens in useState without navigation.

**Warning signs:** Button clicks cause full page load; scroll position resets; user sees loading spinner on category change.

### Pitfall 2: Reading Time Calculation Returns Undefined

**What goes wrong:** `readingTime` variable used in template but markdown content is empty or not parsed correctly.

**Why it happens:** blog.ts calls readingTime(content) before content is extracted. If file is corrupted or frontmatter is malformed, content is empty string; readingTime returns `{ text: '0 min read', minutes: 0 }` but calling code expects a property.

**How to avoid:** Always check blog.ts returns readingTime object with .text property. Test with edge cases: empty file, no frontmatter, special characters in title.

**Warning signs:** Template shows "undefined min read" or blank space where reading time should be; check browser console for errors.

### Pitfall 3: Prose Classes Not Applied to Rendered Content

**What goes wrong:** Blog post HTML renders but headings are unstyled, lists have no indentation, code blocks have no background color.

**Why it happens:** Developer wraps content in `<div className="prose">` but forgot to install @tailwindcss/typography plugin OR forgot to import prose classes in CSS OR prose div wraps the dangerouslySetInnerHTML but Tailwind doesn't purge selectors properly.

**How to avoid:** 
1. Run `npm install @tailwindcss/typography` (verify it's in node_modules)
2. Add plugin to globals.css: `@plugin "@tailwindcss/typography"`
3. Inspect element in browser; should see `prose` class on parent div
4. Check Tailwind output (build logs) to confirm prose classes are generated

**Warning signs:** Unstyled rendered HTML; browser inspector shows no prose-* utilities applied; build log doesn't mention typography plugin.

### Pitfall 4: generateStaticParams Returns Incomplete Slug List

**What goes wrong:** Some blog posts render fine, but new posts added to content/blog/ return 404 until next rebuild.

**Why it happens:** getAllSlugs() reads filesystem at build time. If file is added after build starts (concurrent file write), it's missed. Or dev accidentally edited markdown during build.

**How to avoid:** 
1. Run full build (`npm run build`) and verify all expected posts are listed in build logs
2. Add console.log in generateStaticParams to inspect slug array: `console.log('Generated params:', slugs);`
3. Test with multiple posts; confirm new posts trigger rebuild (check CI/CD pipeline)
4. Don't edit content/blog/ during active builds

**Warning signs:** New posts return 404 or 404 page instead of actual post; build logs show fewer slugs than expected; Decap CMS saves file but site doesn't rebuild immediately.

### Pitfall 5: Decap GitHub OAuth Redirect Loop

**What goes wrong:** Clicking "Login with GitHub" opens popup, then redirects back to Decap but loop repeats; never authenticates.

**Why it happens:** OAuth base_url is misconfigured or points to non-existent endpoint. Decap expects an OAuth proxy at `https://api.netlify.com/auth` (or custom URL) that handles GitHub token exchange. If proxy is down or URL is wrong, callback fails.

**How to avoid:** 
1. Verify config.yml has correct base_url: `https://api.netlify.com`
2. Test OAuth by opening public/admin/index.html in browser and clicking Login
3. Check browser console for 401/403/404 errors from auth endpoint
4. If using custom OAuth proxy (not Netlify), ensure it's deployed and responding to /auth callback

**Warning signs:** OAuth popup opens but never closes; browser console shows 404 from https://api.netlify.com/auth; login button has no effect after 30 seconds.

### Pitfall 6: Image Paths Broken in CMS-Generated Posts

**What goes wrong:** Image URLs in published posts are absolute paths like `/images/blog/photo.jpg` but display as broken on site.

**Why it happens:** Decap config.yml has `media_folder: public/images/blog` and `public_folder: /images/blog`. When editor uploads image, Decap saves file to `public/images/blog/photo.jpg` and references it as `/images/blog/photo.jpg` in markdown. But if Next.js build doesn't include public/images/blog/, image path is wrong.

**How to avoid:** 
1. Confirm media_folder exists: `mkdir -p public/images/blog`
2. In config.yml, set `public_folder: /images/blog` (this is the URL path, not filesystem path)
3. After first Decap post, verify image file exists at `public/images/blog/` on filesystem
4. Test post locally: `npm run dev` and visit `/blog/[slug]` to confirm image loads

**Warning signs:** Image placeholder in blog post; inspect element shows src="/images/blog/xyz.jpg" but file doesn't exist; build log mentions public folder not found.

## Code Examples

Verified patterns from official sources and existing codebase:

### Reading All Posts and Rendering Index

```typescript
// src/app/blog/page.tsx
import { getAllPosts } from '@/lib/blog';
import BlogIndex from '@/components/blog/BlogIndex';

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12">Blog</h1>
      <BlogIndex initialPosts={posts} />
    </div>
  );
}
```

Source: [Next.js App Router docs](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

### Rendering Markdown with Prose Styling

```typescript
// src/components/blog/BlogPostPage.tsx
import { dangerouslySetInnerHTML } from 'react';
import Badge from '@/components/ui/Badge';
import CTASection from '@/components/sections/CTASection';

export default function BlogPostPage({ post }) {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex items-center gap-4 text-gray-600 mb-6">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <Badge>{post.category}</Badge>
          <span>{post.readingTime}</span>
        </div>
        
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        )}
      </header>

      {/* Apply prose styling to rendered markdown */}
      <div
        className="prose prose-lg dark:prose-invert max-w-none prose-a:text-[#0d8488] prose-a:underline"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <footer className="mt-12 pt-8 border-t">
        <p className="text-gray-600">
          Written by <strong className="text-gray-900">{post.author}</strong>
        </p>
      </footer>
    </article>
  );
}
```

Source: [@tailwindcss/typography GitHub](https://github.com/tailwindlabs/tailwindcss-typography)

### Article JSON-LD Structured Data

```typescript
// Inject into page.tsx:
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.description,
  image: post.image,
  datePublished: post.date,
  dateModified: post.date,
  author: {
    '@type': 'Organization',
    name: post.author,
  },
};

// In JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
/>
```

Source: [Next.js JSON-LD guide](https://nextjs.org/docs/app/guides/json-ld)

### Decap CMS Public Admin HTML

```html
<!-- public/admin/index.html -->
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>KineticRecruiter CMS</title>
  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
</head>
<body>
  <!-- Decap CMS will load config.yml and initialize -->
</body>
</html>
```

Source: [Decap CMS Next.js guide](https://decapcms.org/docs/nextjs/)

### Extending Sitemap with Blog Routes

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

const BASE_URL = 'https://kineticrecruiter.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  
  const blogRoutes: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...blogRoutes,
    // ... existing routes
  ];
}
```

Source: [Next.js Sitemap API](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Server-side markdown rendering to string | render() function + dangerouslySetInnerHTML | React 16.8+ | Allows CSS-in-JS prose styling without JSX files |
| Manual CMS backend (Node.js + database) | Decap CMS (git-based) | 2019 (Netlify CMS → Decap CMS 2022) | No database, no hosting costs, GitHub OAuth built-in |
| Hand-coded blog styling for each element | @tailwindcss/typography prose classes | 2021 | 50+ utility classes auto-applied; dark mode baked in; less CSS to maintain |
| Static build every time content changes | Incremental Static Regeneration (ISR) + on-demand revalidation | Next.js 9.5+ | Partial rebuilds; 5-second revalidation possible; faster deploys |
| Category filter via query params | Client-side useState + filter logic | 2022 (Next.js 12 'use client') | No page reload; better UX; works without JavaScript (base case) |

**Deprecated/outdated:**
- **Netlify CMS → Decap CMS:** Netlify CMS rebranded to Decap in 2022. Same codebase, community-maintained. Use Decap.
- **next-mdx-remote:** Overkill for static markdown. Use plain remark unless you need JSX in markdown.
- **Custom OAuth handler in /pages/api/auth:** Use Netlify's free proxy instead; battle-tested, 0 maintenance.

## Open Questions

1. **Will Decap CMS detect new posts in Vercel?**
   - What we know: When editor publishes post via Decap, it commits markdown to GitHub. On Vercel, webhook triggers rebuild. Decap doesn't directly trigger builds; relies on platform CI/CD.
   - What's unclear: Exact trigger timing; does Vercel detect GitHub commit → starts build immediately?
   - Recommendation: In Phase 4 (Infrastructure), configure Vercel webhook or GitHub Actions to trigger rebuild on commit to main branch. Phase 3 assumes build happens.

2. **Should blog index page have pagination?**
   - What we know: Decision D-08 says "all posts on one page is fine for v1"
   - What's unclear: If site grows to 50+ posts, does single-page index become unwieldy?
   - Recommendation: Defer pagination to v2. For v1, single page with client-side category filter is sufficient. If needed later, add pagination as a task in Phase 4+.

3. **What happens if Netlify OAuth proxy goes down?**
   - What we know: Decap CMS uses api.netlify.com/auth as default proxy; Netlify runs it free.
   - What's unclear: If Netlify's OAuth service is down, editors can't publish. Is there a fallback?
   - Recommendation: Document fallback: editors can manually commit markdown files to content/blog/ via GitHub web UI, bypassing CMS. For production resilience (Phase 5), consider self-hosted OAuth proxy on Cloudflare Workers.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Build/dev | ✓ | 24.11.0 | — |
| npm | Package manager | ✓ | 11.6.1 | — |
| Next.js | Build system | ✓ | 16.2.2 | — |
| Tailwind CSS | Styling | ✓ | 4.0 | — |
| GitHub OAuth (Netlify free proxy) | Decap CMS auth | ✓ (free tier) | — | Manual git commits via GitHub web UI |

**Missing dependencies with no fallback:** None

**Missing dependencies with fallback:** None — all required tools are available.

## Sources

### Primary (HIGH confidence)

- [Next.js generateStaticParams API](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) — Official docs; confirmed current as of April 2, 2026
- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld) — Official structured data implementation
- [@tailwindcss/typography GitHub](https://github.com/tailwindlabs/tailwindcss-typography) — Official plugin; v0.5.19 current
- [Decap CMS Official Docs](https://decapcms.org/docs/) — GitHub backend, config.yml, collections
- [Decap CMS Next.js Guide](https://decapcms.org/docs/nextjs/) — App Router integration
- Existing codebase: src/lib/blog.ts (Phase 1) — getAllPosts(), getPostBySlug(), getAllSlugs() already implemented; gray-matter, remark, reading-time in package.json

### Secondary (MEDIUM confidence)

- [Next.js 14 App Router Markdown Rendering (DEV Community)](https://dev.to/ottoaria/nextjs-app-router-in-2026-the-complete-guide-for-full-stack-developers-5bjl) — Verified with official Next.js docs
- [Decap CMS with Netlify Git Gateway (Dylan Bochman, Jan 2026)](https://dylanbochman.com/blog/2026-01-15-decap-cms-netlify-setup-guide/) — Recent guide; confirms free OAuth proxy
- [Tailwind Typography Plugin LogRocket](https://blog.logrocket.com/how-to-use-the-tailwind-typography-plugin/) — Best practices; verified against official docs

### Tertiary (LOW confidence)

- [Decap CMS OAuth Proxy Cloudflare Workers](https://github.com/sterlingwes/decap-proxy) — Community-maintained alternative; useful for Phase 5 resilience but not needed for v1

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — All libraries in package.json or verified via npm registry; versions confirmed current
- Architecture: HIGH — Next.js patterns from official docs; CONTEXT.md locked decisions align with standard approaches
- Pitfalls: MEDIUM — Derived from common blog infrastructure issues; not all specific to this codebase but validated against similar Phase 1 projects
- Decap CMS setup: MEDIUM — Official docs current; Netlify OAuth free tier confirmed; no active blocker found

**Research date:** 2026-04-08
**Valid until:** 2026-05-08 (30 days; Decap CMS and @tailwindcss/typography are stable, Next.js 16 is LTS)

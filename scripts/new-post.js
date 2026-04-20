#!/usr/bin/env node
/**
 * new-post.js
 *
 * Scaffolds a new blog post at content/blog/<slug>.md with proper frontmatter.
 *
 * Usage:
 *   npm run new-post -- my-post-slug
 *   npm run new-post -- my-post-slug "My Post Title"
 */

const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '..', 'content', 'blog');

function slugify(s) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function titleFromSlug(slug) {
  return slug
    .split('-')
    .map((w) => (w.length === 0 ? w : w[0].toUpperCase() + w.slice(1)))
    .join(' ');
}

function today() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Usage: npm run new-post -- <slug> [title]');
    console.error('Example: npm run new-post -- best-ats-2026 "Best ATS for 2026"');
    process.exit(1);
  }

  const slug = slugify(args[0]);
  const title = args[1] || titleFromSlug(slug);
  const filePath = path.join(BLOG_DIR, `${slug}.md`);

  if (fs.existsSync(filePath)) {
    console.error(`Post already exists: ${filePath}`);
    process.exit(1);
  }

  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }

  const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${today()}"
category: "Recruitment"
description: "TODO: 150-160 character meta description for SEO — must include primary keyword, unique value, and a reason to click."
image: "/images/blog/${slug}.jpg"
author: "KineticRecruiter Team"
---

**Quick answer:** TODO — 1-2 sentence summary that answers the core query. AI search engines (Perplexity, ChatGPT, Google SGE) lift this paragraph directly, so make it citable.

## TODO — first section heading

Write the body in prose. Use H2 headings for major sections. Prefer short paragraphs (2-4 sentences), proper nouns, and concrete specifics over hedges and fluff.

- Bullet lists are fine when comparing options or listing features
- Keep bullets 1-2 sentences each
- Do not bullet-list prose

## TODO — second section heading

More content.

---

**Ready to see it in action?** [Start your free trial](https://app.kineticrecruiter.com/register) — no credit card, 14 days, full access.
`;

  fs.writeFileSync(filePath, frontmatter, 'utf8');
  console.log(`Created ${filePath}`);
  console.log('');
  console.log('Next steps:');
  console.log(`  1. Fill in the content in your editor: ${filePath}`);
  console.log(`  2. Add a hero image at public/images/blog/${slug}.jpg (or update the image path in frontmatter)`);
  console.log('  3. git add && commit && push — Cloud Build auto-deploys and IndexNow pings Bing');
}

main();

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';

const legalDirectory = path.join(process.cwd(), 'content/legal');

export type LegalSlug = 'privacy' | 'terms';

export interface LegalPage {
  slug: LegalSlug;
  title: string;
  updated: string;
  rawContent: string;
  html?: string;
}

function ensureDir() {
  if (!fs.existsSync(legalDirectory)) {
    fs.mkdirSync(legalDirectory, { recursive: true });
  }
}

export function getLegalPage(slug: LegalSlug): LegalPage | null {
  ensureDir();
  const fullPath = path.join(legalDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || (slug === 'privacy' ? 'Privacy Policy' : 'Terms of Service'),
    updated: data.updated || new Date().toISOString().split('T')[0],
    rawContent: content,
  };
}

export async function getLegalPageWithHtml(slug: LegalSlug): Promise<LegalPage | null> {
  const page = getLegalPage(slug);
  if (!page) return null;

  const processed = await remark().use(remarkGfm).use(html).process(page.rawContent);
  return { ...page, html: processed.toString() };
}

export interface LegalPageInput {
  title: string;
  updated: string;
  content: string;
}

export function saveLegalPage(slug: LegalSlug, input: LegalPageInput): void {
  ensureDir();
  const frontmatter = {
    title: input.title,
    updated: input.updated,
  };
  const fileContent = matter.stringify(input.content, frontmatter);
  fs.writeFileSync(path.join(legalDirectory, `${slug}.md`), fileContent, 'utf8');
}

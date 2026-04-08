import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from './blog';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPostInput {
  title: string;
  date: string;
  category: string;
  description: string;
  image?: string;
  author: string;
  content: string;
}

export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function savePost(slug: string, post: BlogPostInput): void {
  // Ensure content directory exists
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }

  const frontmatter = {
    title: post.title,
    date: post.date,
    category: post.category,
    description: post.description,
    image: post.image || '',
    author: post.author,
  };

  const fileContent = matter.stringify(post.content, frontmatter);
  const filePath = path.join(postsDirectory, `${slug}.md`);

  fs.writeFileSync(filePath, fileContent, 'utf8');
}

export function deletePost(slug: string): boolean {
  const filePath = path.join(postsDirectory, `${slug}.md`);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return true;
  }

  return false;
}

export function updatePost(oldSlug: string, newSlug: string, post: BlogPostInput): void {
  // Delete old file if slug changed
  if (oldSlug !== newSlug) {
    deletePost(oldSlug);
  }

  // Save with new slug
  savePost(newSlug, post);
}

export const CATEGORIES = [
  'Comparisons',
  'AI in Recruitment',
  'Agency Growth',
  'Product Updates',
  'Guides',
];
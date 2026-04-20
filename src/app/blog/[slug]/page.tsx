import { getPostBySlug, getAllSlugs } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import CTASection from '@/components/sections/CTASection';
import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found', robots: 'noindex, follow' };
  return generatePageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    image: post.image,
    type: 'article',
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const wordCount = post.content ? post.content.replace(/<[^>]*>/g, '').split(/\s+/).length : 0;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    wordCount,
    articleSection: post.category,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://kineticrecruiter.com/blog/${slug}`,
    },
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'KineticRecruiter',
      url: 'https://kineticrecruiter.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://kineticrecruiter.com/images/logo.png',
      },
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['article h1', 'article .prose > p:first-of-type'],
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kineticrecruiter.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://kineticrecruiter.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://kineticrecruiter.com/blog/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, breadcrumbSchema]) }}
      />
      <main>
        <article className="max-w-3xl mx-auto px-4 py-12">
          {/* Header: title, metadata row, featured image */}
          <header className="mb-8">
            <Link
              href="/blog"
              className="text-kinetic-teal text-sm font-medium hover:underline mb-6 inline-block"
            >
              &larr; Back to Blog
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-6">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span aria-hidden>·</span>
              <Badge>{post.category}</Badge>
              <span aria-hidden>·</span>
              <span>{post.readingTime}</span>
            </div>
            {post.image && (
              <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </header>

          {/* Prose content — typography plugin applies styles */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-kinetic-teal prose-a:no-underline hover:prose-a:underline prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded"
            dangerouslySetInnerHTML={{ __html: post.content! }}
          />

          {/* Author attribution */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600">
              Written by{' '}
              <strong className="text-gray-900">{post.author}</strong>
            </p>
          </footer>
        </article>

        <CTASection />
      </main>
    </>
  );
}

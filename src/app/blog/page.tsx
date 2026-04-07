import { getAllPosts } from '@/lib/blog';
import BlogIndex from '@/components/blog/BlogIndex';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | KineticRecruiter',
  description: 'Recruitment insights, ATS guides, and agency growth strategies from the KineticRecruiter team.',
  openGraph: {
    title: 'Blog | KineticRecruiter',
    description: 'Recruitment insights, ATS guides, and agency growth strategies.',
    type: 'website',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <main>
      <section className="bg-kinetic-navy text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Recruitment insights, ATS comparisons, and agency growth strategies.
          </p>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-12">
        <BlogIndex initialPosts={posts} />
      </section>
    </main>
  );
}

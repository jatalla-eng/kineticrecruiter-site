'use client';

import { useState } from 'react';
import { BlogPost } from '@/lib/blog';
import BlogCard from '@/components/blog/BlogCard';
import ComparisonsSection from '@/components/blog/ComparisonsSection';
import CTASection from '@/components/sections/CTASection';

const CATEGORIES = [
  'All',
  'Comparisons',
  'AI in Recruitment',
  'Agency Growth',
  'Product Updates',
  'Guides',
];

interface BlogIndexProps {
  initialPosts: BlogPost[];
}

export default function BlogIndex({ initialPosts }: BlogIndexProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredPosts =
    selectedCategory === 'All'
      ? initialPosts
      : initialPosts.filter((p) => p.category === selectedCategory);

  return (
    <>
      {/* ATS Comparisons — featured section linking to /compare/[competitor] pages */}
      <ComparisonsSection />

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-kinetic-teal text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Post grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-gray-500">
          <p className="text-lg">No posts in this category yet.</p>
          <button
            onClick={() => setSelectedCategory('All')}
            className="mt-4 text-kinetic-teal hover:underline text-sm font-medium"
          >
            View all posts
          </button>
        </div>
      )}

      <CTASection />
    </>
  );
}

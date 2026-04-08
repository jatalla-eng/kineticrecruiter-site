'use client';

import { useState, useEffect } from 'react';
import { BlogPost } from '@/lib/blog';
import BlogPostForm from '@/components/admin/BlogPostForm';

type Props = { params: Promise<{ slug: string }> };

export default function EditPostPage({ params }: Props) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPost = async () => {
      try {
        const { slug } = await params;
        const response = await fetch(`/api/admin/posts/${slug}`);

        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        setError('Failed to load post');
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [params]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading post...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Post Not Found</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return <BlogPostForm post={post} isEditing />;
}
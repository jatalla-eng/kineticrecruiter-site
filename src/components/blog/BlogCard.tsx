import Link from 'next/link';
import Image from 'next/image';
import Badge from '@/components/ui/Badge';
import { BlogPost } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPost;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow h-full flex flex-col">
        {/* Featured image */}
        <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-kinetic-teal-light to-white" />
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="mb-3">
            <Badge variant="teal">{post.category}</Badge>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-kinetic-teal transition-colors leading-snug">
            {post.title}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1">
            {post.description}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-auto">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

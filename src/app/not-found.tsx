import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Page Not Found',
  description:
    'The page you are looking for does not exist. Explore KineticRecruiter features, pricing, or start your free trial.',
  path: '/404',
  robots: 'noindex, follow',
});

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-6xl font-bold mb-4 text-kinetic-teal">
        404
      </p>
      <h1 className="text-3xl font-semibold mb-4 text-kinetic-navy">
        Page Not Found
      </h1>
      <p className="text-gray-500 mb-10 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist. It may have been moved, deleted, or the URL was mistyped.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="text-white px-6 py-3 rounded-lg font-semibold transition-colors hover:opacity-90 bg-kinetic-teal"
        >
          Start Free Trial
        </Link>
        <Link
          href="/"
          className="px-6 py-3 rounded-lg font-medium border border-gray-200 hover:border-gray-300 transition-colors text-kinetic-navy"
        >
          Go Home
        </Link>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-4 text-sm">
        <span className="text-gray-400">Or explore:</span>
        <Link
          href="/features/ai-candidate-intelligence"
          className="text-kinetic-navy hover:text-kinetic-teal transition-colors"
        >
          AI Candidate Intelligence
        </Link>
        <Link
          href="/pricing"
          className="text-kinetic-navy hover:text-kinetic-teal transition-colors"
        >
          Pricing
        </Link>
      </div>
    </div>
  );
}

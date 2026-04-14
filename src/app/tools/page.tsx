import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';
import CTASection from '@/components/sections/CTASection';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export const metadata = generatePageMetadata({
  title: 'Free Recruiter Tools',
  description:
    'Free AI-powered recruiting tools. Generate job descriptions, calculate hiring ROI, and more. No signup required — try them now.',
  path: '/tools',
});

const tools = [
  {
    title: 'AI Job Description Generator',
    description:
      'Generate professional job descriptions in seconds — tailored to your role, industry, and team needs. Just fill in a few details and let AI do the writing.',
    href: '/tools/job-description-generator',
    badge: 'Free',
    badgeVariant: 'teal' as const,
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-kinetic-teal to-kinetic-teal-dark py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <h1 className="text-4xl font-bold text-white">Recruiter Tools</h1>
          <p className="mt-3 max-w-xl text-lg text-white/90">
            Free tools to help you hire faster and smarter.
          </p>
        </div>
      </section>

      {/* Tools grid */}
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-lg font-semibold text-kinetic-navy group-hover:text-kinetic-teal transition-colors">
                  {tool.title}
                </h2>
                <Badge variant={tool.badgeVariant} className="ml-3 flex-shrink-0">
                  {tool.badge}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 flex-1 mb-6">{tool.description}</p>
              <Button href={tool.href} variant="primary" size="sm">
                Try it free
              </Button>
            </Link>
          ))}
        </div>
      </section>

      <CTASection />
    </main>
  );
}

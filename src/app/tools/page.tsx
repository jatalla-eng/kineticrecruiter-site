import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';
import CTASection from '@/components/sections/CTASection';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export const metadata = generatePageMetadata({
  title: 'Free AI Tools for Recruiters',
  description:
    'Free AI-powered recruiting tools. Generate job descriptions, build Boolean search strings, calculate hiring ROI. No signup required — try them now.',
  path: '/tools',
});

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kineticrecruiter.com' },
    { '@type': 'ListItem', position: 2, name: 'Free Tools', item: 'https://kineticrecruiter.com/tools' },
  ],
};

const tools = [
  {
    title: 'AI Job Description Generator',
    description:
      'Generate professional job descriptions in seconds — tailored to your role, industry, and team needs. Just fill in a few details and let AI do the writing.',
    href: '/tools/job-description-generator',
    badge: 'Free',
    badgeVariant: 'teal' as const,
  },
  {
    title: 'Boolean Search String Builder',
    description:
      'Build Boolean search strings for LinkedIn, Google X-Ray, Seek, Indeed, and GitHub in seconds. Supports AND, OR, NOT, and platform-specific operators.',
    href: '/tools/boolean-search-builder',
    badge: 'Free',
    badgeVariant: 'teal' as const,
  },
  {
    title: 'Hiring ROI Calculator',
    description:
      'Estimate time saved, cost reduction, and payback period from switching to an AI-powered ATS. See real numbers for your agency.',
    href: '/roi',
    badge: 'Free',
    badgeVariant: 'teal' as const,
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-kinetic-teal to-kinetic-teal-dark py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <h1 className="text-4xl font-bold text-white">Free AI Tools for Recruiters</h1>
          <p className="mt-3 max-w-xl text-lg text-white/90">
            Free AI-powered tools to help you hire faster and smarter. No signup required.
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

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { generatePageMetadata } from '@/lib/metadata';
import { competitors, getCompetitorBySlug } from '@/lib/competitors';
import CTASection from '@/components/sections/CTASection';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return competitors.map((c) => ({ competitor: c.slug }));
}

type Props = { params: Promise<{ competitor: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { competitor } = await params;
  const c = getCompetitorBySlug(competitor);
  if (!c) return { title: 'Comparison Not Found', robots: 'noindex, follow' };
  return generatePageMetadata({
    title: `KineticRecruiter vs ${c.name}: Agency ATS Comparison`,
    description: `Compare KineticRecruiter and ${c.name} on pricing, AI features, agency workflow, and fit. See which ATS is right for your agency.`,
    path: `/compare/${c.slug}`,
  });
}

export default async function CompetitorComparePage({ params }: Props) {
  const { competitor } = await params;
  const c = getCompetitorBySlug(competitor);
  if (!c) notFound();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kineticrecruiter.com' },
      { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://kineticrecruiter.com/compare' },
      { '@type': 'ListItem', position: 3, name: `vs ${c.name}`, item: `https://kineticrecruiter.com/compare/${c.slug}` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-kinetic-teal to-kinetic-teal-dark py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <Link
            href="/compare"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All ATS comparisons
          </Link>
          <p className="text-sm font-semibold text-white/80 mb-3 uppercase tracking-wider">ATS Comparison</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            KineticRecruiter vs {c.name}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/90">
            {c.tagline}
          </p>
        </div>
      </section>

      {/* Summary */}
      <section className="mx-auto max-w-[1200px] px-6 py-12">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-kinetic-navy mb-4">
            At a glance
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            {c.summary}
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="mx-auto max-w-[1200px] px-6 pb-12">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="w-1/3 py-4 px-4 text-left text-gray-500 font-medium border-b border-gray-200">
                  Category
                </th>
                <th className="w-1/3 py-4 px-4 text-left font-semibold text-kinetic-navy bg-kinetic-teal-light border-b border-kinetic-teal">
                  <span className="text-kinetic-teal">KineticRecruiter</span>
                </th>
                <th className="w-1/3 py-4 px-4 text-left font-semibold text-kinetic-navy border-b border-gray-200">
                  {c.name}
                </th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((row, i) => (
                <tr key={row.category} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-5 px-4 font-semibold text-kinetic-navy align-top border-b border-gray-100">
                    {row.category}
                  </td>
                  <td className="py-5 px-4 text-gray-700 align-top border-b border-gray-100 bg-kinetic-teal-light/40">
                    {row.kinetic}
                  </td>
                  <td className="py-5 px-4 text-gray-700 align-top border-b border-gray-100">
                    {row.competitor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-xs text-gray-500">
          * Competitor pricing and features are based on publicly available information as of 2026. Verify current pricing at each vendor&apos;s website.
        </p>
      </section>

      {/* Verdict */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-kinetic-navy mb-4">
              Our honest take
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {c.verdict}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-kinetic-navy mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6 max-w-3xl">
          {c.faq.map((f) => (
            <div key={f.q}>
              <h3 className="text-lg font-semibold text-kinetic-navy">{f.q}</h3>
              <p className="mt-2 text-gray-700">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Other comparisons */}
      <section className="bg-white py-12 border-t border-gray-100">
        <div className="mx-auto max-w-[1200px] px-6">
          <h2 className="text-xl font-bold text-kinetic-navy mb-6">
            Other ATS comparisons
          </h2>
          <div className="flex flex-wrap gap-3">
            {competitors
              .filter((other) => other.slug !== c.slug)
              .map((other) => (
                <Link
                  key={other.slug}
                  href={`/compare/${other.slug}`}
                  className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-200 text-sm text-kinetic-navy hover:border-kinetic-teal hover:text-kinetic-teal transition-colors"
                >
                  KineticRecruiter vs {other.name}
                </Link>
              ))}
            <Link
              href="/compare"
              className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-200 text-sm text-kinetic-navy hover:border-kinetic-teal hover:text-kinetic-teal transition-colors"
            >
              All comparisons
            </Link>
          </div>
        </div>
      </section>

      <CTASection variant="minimal" />
    </main>
  );
}

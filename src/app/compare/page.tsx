import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { generatePageMetadata } from '@/lib/metadata';
import { competitors } from '@/lib/competitors';
import CTASection from '@/components/sections/CTASection';

export const metadata = generatePageMetadata({
  title: 'ATS Comparisons: KineticRecruiter vs Greenhouse, Lever, Bullhorn, JobAdder, Vincere',
  description:
    'Compare KineticRecruiter against the major agency ATS platforms. Side-by-side breakdowns on pricing, AI features, setup, and agency workflow fit — including where each competitor still wins.',
  path: '/compare',
});

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kineticrecruiter.com' },
    { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://kineticrecruiter.com/compare' },
  ],
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: competitors.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: `KineticRecruiter vs ${c.name}`,
    url: `https://kineticrecruiter.com/compare/${c.slug}`,
  })),
};

export default function ComparePage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, itemListSchema]) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-kinetic-teal to-kinetic-teal-dark py-16 md:py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="text-sm font-semibold text-white/80 mb-3 uppercase tracking-wider">ATS Comparisons</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            How KineticRecruiter compares.
          </h1>
          <p className="mt-3 max-w-2xl text-lg md:text-xl text-white/90">
            Honest, side-by-side comparisons against the major agency ATS platforms — pricing,
            AI features, setup friction, and where each competitor still wins.
          </p>
        </div>
      </section>

      {/* Comparison grid */}
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitors.map((c) => (
            <Link
              key={c.slug}
              href={`/compare/${c.slug}`}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 hover:border-kinetic-teal hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-kinetic-navy group-hover:text-kinetic-teal transition-colors">
                  vs {c.name}
                </h2>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-kinetic-teal group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">{c.tagline}</p>
              <div className="mt-auto pt-4 border-t border-gray-100">
                <p className="text-xs font-semibold text-kinetic-navy uppercase tracking-wider mb-2">Best for</p>
                <p className="text-sm text-gray-700">{c.rows.find((r) => r.category === 'Best for')?.kinetic || c.verdict.split('.')[1]?.trim() || 'Agencies that want AI-native workflows'}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why KineticRecruiter */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-kinetic-navy mb-4">
              Why agencies pick KineticRecruiter.
            </h2>
            <p className="text-lg text-gray-600">
              Built for recruitment agencies from day one — not an in-house ATS with agency features bolted on.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { title: 'Flat pricing', body: 'USD $29–$99/month, all AI included. No per-seat surcharges, no add-on fees.' },
              { title: 'Setup in under a day', body: 'Self-serve onboarding. First candidate shortlist in hours, not weeks.' },
              { title: 'Native AI, not an add-on', body: 'Semantic candidate scoring, explainable match breakdowns, AI career highlights — all in the base plan.' },
              { title: 'Agency-first data model', body: 'Multi-client candidate management, client review portals, and branded intake are core features, not workarounds.' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 p-5 rounded-xl bg-white border border-gray-100">
                <CheckCircle2 className="w-5 h-5 text-kinetic-teal flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-kinetic-navy mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection variant="minimal" />
    </main>
  );
}

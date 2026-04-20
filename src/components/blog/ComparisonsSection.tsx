import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const competitors = [
  { slug: 'greenhouse', name: 'Greenhouse', tagline: 'Enterprise ATS vs agency-native AI' },
  { slug: 'lever', name: 'Lever', tagline: 'Mid-market ATS vs AI-first agency platform' },
  { slug: 'bullhorn', name: 'Bullhorn', tagline: 'Legacy incumbent vs modern AI-native ATS' },
  { slug: 'jobadder', name: 'JobAdder', tagline: 'Traditional agency ATS vs flat-pricing alternative' },
  { slug: 'vincere', name: 'Vincere', tagline: 'Configurable OS vs opinionated AI platform' },
];

export default function ComparisonsSection() {
  return (
    <section className="mb-12 rounded-2xl border border-kinetic-teal/20 bg-gradient-to-br from-kinetic-teal-light/40 via-white to-white p-6 md:p-8">
      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-kinetic-teal mb-2">
            ATS Comparisons
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-kinetic-navy mb-2">
            How KineticRecruiter compares
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Side-by-side comparisons on pricing, AI features, and agency workflow fit.
            Honest trade-offs — including where each competitor still wins.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {competitors.map((c) => (
          <Link
            key={c.slug}
            href={`/compare/${c.slug}`}
            className="group flex items-center justify-between p-4 rounded-xl bg-white border border-gray-100 hover:border-kinetic-teal hover:shadow-sm transition-all"
          >
            <div className="min-w-0">
              <p className="font-semibold text-kinetic-navy group-hover:text-kinetic-teal transition-colors">
                vs {c.name}
              </p>
              <p className="text-xs text-gray-500 truncate mt-0.5">{c.tagline}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-kinetic-teal group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-3" />
          </Link>
        ))}
        <Link
          href="/compare"
          className="group flex items-center justify-between p-4 rounded-xl bg-kinetic-teal text-white hover:bg-kinetic-teal-dark transition-colors"
        >
          <div>
            <p className="font-semibold">See all comparisons</p>
            <p className="text-xs text-white/80 mt-0.5">Full side-by-side breakdown</p>
          </div>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform flex-shrink-0 ml-3" />
        </Link>
      </div>
    </section>
  );
}

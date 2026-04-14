import { generatePageMetadata } from '@/lib/metadata';
import CTASection from '@/components/sections/CTASection';

export const metadata = generatePageMetadata({
  title: 'ATS Comparison: vs Greenhouse & Lever',
  description:
    'Compare KineticRecruiter, Greenhouse, and Lever side by side on pricing, AI features, and ease of use. See which ATS fits your team.',
  path: '/compare',
});

const comparisonData = [
  {
    category: 'Pricing',
    kinetic:
      'From $29/mo, transparent tiers. No per-seat add-on fees.',
    greenhouse:
      'Custom pricing, typically $6,000–$25,000+/yr for SMBs. Seat-based add-ons.',
    lever:
      'Custom pricing, typically $3,500–$15,000+/yr. Module add-ons.',
  },
  {
    category: 'AI Features',
    kinetic:
      'AI candidate intelligence, AI-powered job description generation, smart intake forms.',
    greenhouse:
      'Basic AI matching add-on (Greenhouse Intelligence). Limited native AI.',
    lever:
      'Basic AI sourcing via Lever Nurture. No native JD generation.',
  },
  {
    category: 'Ease of Use',
    kinetic:
      'Modern UI, quick setup (~1 day). Limited onboarding resources vs established platforms.',
    greenhouse:
      'Well-documented, large community. Can be complex to configure.',
    lever:
      'Clean interface. Mid-market complexity.',
  },
  {
    category: 'Best For',
    kinetic:
      'Recruitment agencies and in-house teams of 1–50 people who want AI features without enterprise pricing.',
    greenhouse:
      'Mid-to-large enterprises with complex hiring workflows and compliance needs.',
    lever:
      'Growing mid-market companies wanting structured hiring pipelines.',
  },
  {
    category: 'Integrations',
    kinetic:
      'Core integrations (Seek, LinkedIn, email). Fewer than Greenhouse/Lever.',
    greenhouse:
      '500+ integrations via Greenhouse Harvest API. Mature ecosystem.',
    lever:
      '300+ integrations. Strong HRIS connectivity.',
  },
  {
    category: 'Support',
    kinetic:
      'Email and in-app support. No dedicated CSM for lower tiers.',
    greenhouse:
      'Dedicated CSM on higher tiers. Extensive knowledge base.',
    lever:
      'Email + dedicated support. Good documentation.',
  },
];

export default function ComparePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-kinetic-teal to-kinetic-teal-dark py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <h1 className="text-4xl font-bold text-white">ATS Comparison</h1>
          <p className="mt-3 max-w-xl text-lg text-white/90">
            An honest side-by-side comparison of KineticRecruiter, Greenhouse, and Lever —
            including where we fall short.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="w-1/4 py-4 px-4 text-left text-gray-500 font-medium border-b border-gray-200">
                  Category
                </th>
                <th className="w-1/4 py-4 px-4 text-left font-semibold text-kinetic-navy bg-kinetic-teal-light border-b border-kinetic-teal">
                  <span className="text-kinetic-teal">KineticRecruiter</span>
                </th>
                <th className="w-1/4 py-4 px-4 text-left font-semibold text-kinetic-navy border-b border-gray-200">
                  Greenhouse
                </th>
                <th className="w-1/4 py-4 px-4 text-left font-semibold text-kinetic-navy border-b border-gray-200">
                  Lever
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, i) => (
                <tr key={row.category} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-5 px-4 font-semibold text-kinetic-navy align-top border-b border-gray-100">
                    {row.category}
                  </td>
                  <td className="py-5 px-4 text-gray-700 align-top border-b border-gray-100 bg-kinetic-teal-light/40">
                    {row.kinetic}
                  </td>
                  <td className="py-5 px-4 text-gray-700 align-top border-b border-gray-100">
                    {row.greenhouse}
                  </td>
                  <td className="py-5 px-4 text-gray-700 align-top border-b border-gray-100">
                    {row.lever}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-xs text-gray-500">
          * Competitor pricing and features are based on publicly available information as of 2026.
          Verify current pricing at each vendor&apos;s website.
        </p>
      </section>

      {/* FAQ — structured for AI search engines */}
      <section className="mx-auto max-w-[1200px] px-6 pb-16">
        <h2 className="text-2xl font-bold text-kinetic-navy mb-8">
          Frequently Asked Questions About ATS Comparison
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-kinetic-navy">
              What is the best ATS for recruitment agencies?
            </h3>
            <p className="mt-2 text-gray-700">
              The best ATS for recruitment agencies depends on team size and budget.
              KineticRecruiter is designed specifically for agencies with 1-50 recruiters who want
              AI-powered candidate matching and scoring without enterprise pricing. Greenhouse and
              Lever are better suited for mid-to-large enterprises with complex compliance needs.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-kinetic-navy">
              How does KineticRecruiter compare to Greenhouse?
            </h3>
            <p className="mt-2 text-gray-700">
              KineticRecruiter starts at $29/month with all AI features included, while Greenhouse
              typically costs $6,000-$25,000+ per year with AI as a paid add-on. KineticRecruiter
              offers native AI candidate scoring and semantic search; Greenhouse has a larger
              integration ecosystem with 500+ partners.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-kinetic-navy">
              How does KineticRecruiter compare to Lever?
            </h3>
            <p className="mt-2 text-gray-700">
              KineticRecruiter offers transparent pricing starting at $29/month, while Lever uses
              custom pricing typically starting at $3,500+/year. KineticRecruiter includes AI match
              scoring and job description generation natively; Lever focuses on structured hiring
              pipelines and has stronger HRIS integrations.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-kinetic-navy">
              Does KineticRecruiter offer a free trial?
            </h3>
            <p className="mt-2 text-gray-700">
              Yes. KineticRecruiter offers a 7-day free trial with no credit card required. All AI
              features are available during the trial period.
            </p>
          </div>
        </div>
      </section>

      <CTASection variant="minimal" />
    </main>
  );
}

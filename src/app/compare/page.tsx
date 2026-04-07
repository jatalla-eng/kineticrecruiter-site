import { generatePageMetadata } from '@/lib/metadata';
import CTASection from '@/components/sections/CTASection';

export const metadata = generatePageMetadata({
  title: 'KineticRecruiter vs Greenhouse vs Lever | ATS Comparison',
  description:
    'Honest comparison of KineticRecruiter, Greenhouse, and Lever. Compare pricing, AI features, ease of use, integrations, and support.',
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
      <section className="bg-gradient-to-br from-[#0d8488] to-[#0a6b6e] py-16">
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
                <th className="w-1/4 py-4 px-4 text-left font-semibold text-[#1a2332] bg-[#E8F5F5] border-b border-[#0d8488]">
                  <span className="text-[#0d8488]">KineticRecruiter</span>
                </th>
                <th className="w-1/4 py-4 px-4 text-left font-semibold text-[#1a2332] border-b border-gray-200">
                  Greenhouse
                </th>
                <th className="w-1/4 py-4 px-4 text-left font-semibold text-[#1a2332] border-b border-gray-200">
                  Lever
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, i) => (
                <tr key={row.category} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-5 px-4 font-semibold text-[#1a2332] align-top border-b border-gray-100">
                    {row.category}
                  </td>
                  <td className="py-5 px-4 text-gray-700 align-top border-b border-gray-100 bg-[#E8F5F5]/40">
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

      <CTASection
        headline="Ready to try the affordable alternative?"
        subheadline="Get full access to every KineticRecruiter feature for 7 days free. No credit card required."
      />
    </main>
  );
}

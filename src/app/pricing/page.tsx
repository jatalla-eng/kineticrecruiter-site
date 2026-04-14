import { generatePageMetadata } from '@/lib/metadata';
import PricingToggle from '@/components/ui/PricingToggle';
import FAQ from '@/components/ui/FAQ';
import CTASection from '@/components/sections/CTASection';

export const metadata = generatePageMetadata({
  title: 'Pricing Plans',
  description:
    'Transparent ATS pricing from $29/mo. All AI features included with every plan — no add-ons or hidden fees. Start your free 7-day trial today.',
  path: '/pricing',
});

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What types of teams is KineticRecruiter built for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Agency recruiters, boutique staffing firms, and small in-house talent teams who need candidate management, client tracking, and AI-powered matching without enterprise complexity or pricing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What AI capabilities are included?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every plan includes AI resume parsing, natural language candidate search, semantic matching, AI candidate-job scoring with breakdowns, AI career highlight generation, and AI-powered client submission email drafting. No AI add-ons or premium tiers.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the free trial work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "You get 7 days with 3 seats and full access to every feature on the Professional plan. Enter a payment method when you sign up, and if you don't cancel before the trial ends, your subscription begins automatically. You can cancel anytime during the trial at no charge.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I import my existing candidates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Bulk upload resumes via drag-and-drop, forward resumes via email, or import from LinkedIn using the Chrome extension. AI parsing extracts structured data. Duplicate detection prevents double-ups.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does billing work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Stripe-powered, seat-based pricing. Monthly or annual. Add or remove seats anytime.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a mobile app?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'KineticRecruiter is a responsive web application accessible from any browser on any device. A dedicated mobile app is on the roadmap.',
      },
    },
  ],
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-kinetic-teal-light via-white to-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-kinetic-navy mb-4">
            Simple pricing. Every AI feature included.
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            No add-ons. No implementation fees. No per-feature charges. Pick a plan, add your team,
            start recruiting.
          </p>

          {/* PricingToggle includes the toggle UI + pricing cards grid */}
          <PricingToggle />
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}

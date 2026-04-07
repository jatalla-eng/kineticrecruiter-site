import { generatePageMetadata } from '@/lib/metadata';
import PricingToggle from '@/components/ui/PricingToggle';
import FAQ from '@/components/ui/FAQ';
import CTASection from '@/components/sections/CTASection';

export const metadata = generatePageMetadata({
  title: 'Pricing',
  description:
    'Simple, transparent pricing. All AI features included. No add-ons. No hidden costs. Start your 7-day free trial.',
  path: '/pricing',
});

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#E8F5F5] via-white to-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a2332] mb-4">
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

import { generatePageMetadata } from '@/lib/metadata';
import ROICalculator from '@/components/tools/ROICalculator';
import CTASection from '@/components/sections/CTASection';

export const metadata = generatePageMetadata({
  title: 'ROI Calculator | KineticRecruiter',
  description:
    'Calculate your ROI from switching to KineticRecruiter. Estimate time saved, cost reduction, and payback period.',
  path: '/roi',
});

export default function ROIPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0d8488] to-[#0a6b6e] py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <h1 className="text-4xl font-bold text-white">ROI Calculator</h1>
          <p className="mt-3 max-w-xl text-lg text-white/90">
            See exactly how much time and money your team saves with KineticRecruiter.
            Adjust the inputs to match your agency&apos;s numbers.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <ROICalculator />
      </section>

      <CTASection
        headline="Ready to see these savings in action?"
        subheadline="Start your 7-day free trial and experience the time savings first-hand. No credit card required to trial."
      />
    </main>
  );
}

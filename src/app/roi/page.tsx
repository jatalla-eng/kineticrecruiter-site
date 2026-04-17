import { generatePageMetadata } from '@/lib/metadata';
import ROICalculator from '@/components/tools/ROICalculator';
import CTASection from '@/components/sections/CTASection';

export const metadata = generatePageMetadata({
  title: 'Hiring ROI Calculator for Recruitment Agencies',
  description:
    'Calculate your ROI from switching to KineticRecruiter. Estimate time saved, cost reduction, and payback period for your agency.',
  path: '/roi',
});

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kineticrecruiter.com' },
    { '@type': 'ListItem', position: 2, name: 'ROI Calculator', item: 'https://kineticrecruiter.com/roi' },
  ],
};

export default function ROIPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-kinetic-teal to-kinetic-teal-dark py-16">
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

      <CTASection variant="minimal" />
    </main>
  );
}

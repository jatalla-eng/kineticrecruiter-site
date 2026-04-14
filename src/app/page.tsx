import { generatePageMetadata } from '@/lib/metadata';
import Hero from '@/components/sections/Hero';
import WhatIs from '@/components/sections/WhatIs';
import FeatureGrid from '@/components/sections/FeatureGrid';
import FeatureShowcase from '@/components/sections/FeatureShowcase';
import ComparisonStrip from '@/components/sections/ComparisonStrip';
import PricingPreview from '@/components/sections/PricingPreview';
import CTASection from '@/components/sections/CTASection';

export const metadata = generatePageMetadata({
  title: 'KineticRecruiter | AI-Powered ATS for Recruiters',
  description:
    'AI-powered ATS with semantic search, candidate scoring, and client CRM built for recruitment agencies. Start your free 7-day trial today.',
  path: '/',
  noSuffix: true,
});

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'KineticRecruiter',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'AI-powered applicant tracking system for recruitment agencies. Semantic search, candidate scoring, and client CRM.',
  url: 'https://kineticrecruiter.com',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '29',
    highPrice: '99',
    offerCount: '3',
  },
};

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <Hero />
      <WhatIs />
      <FeatureGrid />
      <FeatureShowcase />
      <ComparisonStrip />
      <PricingPreview />
      <CTASection />
    </main>
  );
}

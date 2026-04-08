import { generatePageMetadata } from '@/lib/metadata';
import Hero from '@/components/sections/Hero';
import FeatureGrid from '@/components/sections/FeatureGrid';
import ComparisonStrip from '@/components/sections/ComparisonStrip';
import PricingPreview from '@/components/sections/PricingPreview';
import CTASection from '@/components/sections/CTASection';

export const metadata = generatePageMetadata({
  title: 'KineticRecruiter — The ATS That Understands Your Candidates',
  description:
    'AI-powered applicant tracking system for recruitment agencies. Semantic search, candidate scoring, and client CRM. Start your free trial today.',
  path: '/',
});

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <Hero />
      <FeatureGrid />
      <ComparisonStrip />
      <PricingPreview />
      <CTASection />
    </main>
  );
}

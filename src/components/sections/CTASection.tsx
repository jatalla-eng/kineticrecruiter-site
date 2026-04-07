import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  headline?: string;
  subheadline?: string;
  primaryCTA?: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
}

export default function CTASection({
  headline = 'Ready to stop paying for add-ons?',
  subheadline = 'Start your 7-day free trial with full access to every feature. Enter payment details when you sign up — cancel anytime during the trial at no charge.',
  primaryCTA = { text: 'Start Free Trial', href: 'https://app.kineticrecruiter.com/register' },
  secondaryCTA = { text: 'Book a Demo', href: '/contact' },
}: CTASectionProps) {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-[#E8F5F5] via-white to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a2332] mb-4">{headline}</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">{subheadline}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={primaryCTA.href}
            className="inline-flex items-center justify-center bg-[#0d8488] hover:bg-[#0b7276] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg group"
          >
            {primaryCTA.text}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href={secondaryCTA.href}
            className="inline-flex items-center justify-center text-[#0d8488] hover:text-[#0b7276] font-semibold text-lg mt-2 sm:mt-0"
          >
            {secondaryCTA.text}
          </a>
        </div>
      </div>
    </section>
  );
}

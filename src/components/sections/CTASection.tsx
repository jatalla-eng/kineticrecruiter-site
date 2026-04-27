import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';

interface CTASectionProps {
  variant?: 'default' | 'minimal';
}

export default function CTASection({ variant = 'default' }: CTASectionProps) {
  if (variant === 'minimal') {
    return (
      <section className="py-16 md:py-20 bg-kinetic-teal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            See why recruiters are switching to KineticRecruiter.
          </h2>
          <p className="text-kinetic-teal-light/90 mb-8 max-w-xl mx-auto">
            7-day free trial. Every AI feature included. No credit card required to explore.
          </p>
          <a
            href="https://app.kineticrecruiter.com/register"
            data-cta="cta-section-minimal"
            className="inline-flex items-center justify-center bg-white text-kinetic-teal hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors group"
          >
            Start Free Trial
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/recruitment-team.jpg"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-kinetic-navy/85" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Your next placement is one search away.
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Join hundreds of recruitment agencies who fill roles faster with AI-powered candidate matching, explainable scoring, and zero add-on fees.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                '7-day free trial — full access to every feature',
                'Set up in under 5 minutes, no implementation needed',
                'Import your existing candidates in bulk',
                'Cancel anytime, no questions asked',
              ].map(item => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-kinetic-teal flex-shrink-0 mt-0.5" />
                  <span className="text-gray-200 text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://app.kineticrecruiter.com/register"
                data-cta="cta-section-default"
                className="inline-flex items-center justify-center bg-kinetic-teal hover:bg-kinetic-teal-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg group"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Book a Demo
              </a>
            </div>
          </div>

          {/* Right: Stats card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <p className="text-sm font-semibold text-kinetic-teal uppercase tracking-wider mb-6">
              What agencies achieve in their first 90 days
            </p>
            <div className="space-y-6">
              {[
                { stat: '40%', label: 'faster time-to-placement' },
                { stat: '3x', label: 'more candidates from existing database' },
                { stat: '10 hrs', label: 'saved per recruiter per week' },
                { stat: '$0', label: 'in hidden fees or add-on costs' },
              ].map(item => (
                <div key={item.label} className="flex items-baseline gap-4">
                  <span className="text-3xl font-bold text-kinetic-teal min-w-[80px]">{item.stat}</span>
                  <span className="text-gray-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

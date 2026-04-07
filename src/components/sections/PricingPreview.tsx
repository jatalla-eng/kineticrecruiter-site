import { ArrowRight, Check } from 'lucide-react';
import { getAllPlans } from '@/lib/plans';

export default function PricingPreview() {
  const plans = getAllPlans();

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2332] mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every AI feature included. No add-ons. No hidden costs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {plans.map((plan) => {
            const isHighlighted = plan.badge === 'Most Popular';
            return (
              <div
                key={plan.key}
                className={`rounded-2xl p-6 ${
                  isHighlighted
                    ? 'bg-[#1a2332] text-white border-2 border-[#0d8488] scale-105'
                    : 'bg-white border border-gray-100'
                }`}
              >
                {plan.badge && (
                  <div className="inline-block bg-[#0d8488] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {plan.badge}
                  </div>
                )}
                <h3
                  className={`text-xl font-bold mb-1 ${
                    isHighlighted ? 'text-white' : 'text-[#1a2332]'
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm mb-4 ${
                    isHighlighted ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {plan.tagline}
                </p>
                <div className="mb-4">
                  <span
                    className={`text-3xl font-bold ${
                      isHighlighted ? 'text-white' : 'text-[#1a2332]'
                    }`}
                  >
                    {plan.monthly_price_display}
                  </span>
                  <span className={isHighlighted ? 'text-gray-400' : 'text-gray-600'}>
                    /user/month
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.slice(0, 3).map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#0d8488]" />
                      <span
                        className={`text-sm ${
                          isHighlighted ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.cta_url}
                  className={`block text-center py-3 px-4 rounded-lg font-semibold transition-colors ${
                    isHighlighted
                      ? 'bg-[#0d8488] hover:bg-[#0b7276] text-white'
                      : 'border-2 border-[#0d8488] text-[#0d8488] hover:bg-[#0d8488] hover:text-white'
                  }`}
                >
                  {plan.cta_text}
                </a>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <a
            href="/pricing"
            className="inline-flex items-center text-[#0d8488] hover:text-[#0b7276] font-semibold"
          >
            See full pricing details
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

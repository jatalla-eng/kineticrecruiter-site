'use client';

import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { getAllPlans } from '@/lib/plans';

export default function PricingPreview() {
  const [isAnnual, setIsAnnual] = useState(false);
  const plans = getAllPlans();

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-kinetic-navy mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every AI feature included. No add-ons. No hidden costs.
          </p>
        </div>

        {/* Monthly / Annual Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-full border border-gray-200 bg-white p-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-full font-medium text-sm transition-colors ${
                !isAnnual
                  ? 'bg-kinetic-teal text-white shadow-sm'
                  : 'text-gray-600 hover:text-kinetic-navy'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-full font-medium text-sm transition-colors flex items-center gap-2 ${
                isAnnual
                  ? 'bg-kinetic-teal text-white shadow-sm'
                  : 'text-gray-600 hover:text-kinetic-navy'
              }`}
            >
              Annual
              {!isAnnual && (
                <span className="text-xs font-semibold bg-motion-amber text-white px-2 py-0.5 rounded-full">
                  Save 17%
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {plans.map((plan) => {
            const isHighlighted = plan.badge === 'Most Popular';
            const price = isAnnual ? plan.annual_price_display : plan.monthly_price_display;
            return (
              <div
                key={plan.key}
                className={`rounded-2xl p-6 ${
                  isHighlighted
                    ? 'bg-kinetic-navy text-white border-2 border-kinetic-teal scale-105'
                    : 'bg-white border border-gray-100'
                }`}
              >
                {plan.badge && (
                  <div className="inline-block bg-kinetic-teal text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {plan.badge}
                  </div>
                )}
                <h3
                  className={`text-xl font-bold mb-1 ${
                    isHighlighted ? 'text-white' : 'text-kinetic-navy'
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
                <div className="mb-1">
                  <span
                    className={`text-3xl font-bold ${
                      isHighlighted ? 'text-white' : 'text-kinetic-navy'
                    }`}
                  >
                    {price}
                  </span>
                  <span className={isHighlighted ? 'text-gray-400' : 'text-gray-600'}>
                    /user/month
                  </span>
                </div>
                {isAnnual && (
                  <div className="mb-4">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      isHighlighted
                        ? 'bg-kinetic-teal/20 text-kinetic-teal'
                        : 'bg-kinetic-teal-light text-kinetic-teal'
                    }`}>
                      Save {plan.annual_savings_percent}%
                    </span>
                  </div>
                )}
                {!isAnnual && <div className="mb-4" />}
                <ul className="space-y-2 mb-6">
                  {plan.features.slice(0, 3).map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-kinetic-teal" />
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
                      ? 'bg-kinetic-teal hover:bg-kinetic-teal-dark text-white'
                      : 'border-2 border-kinetic-teal text-kinetic-teal hover:bg-kinetic-teal hover:text-white'
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
            className="inline-flex items-center text-kinetic-teal hover:text-kinetic-teal-dark font-semibold"
          >
            See full pricing details
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

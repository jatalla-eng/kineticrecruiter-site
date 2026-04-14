'use client';

import { useState } from 'react';
import { getAllPlans } from '@/lib/plans';
import PricingCard from './PricingCard';

export default function PricingToggle() {
  const [isAnnual, setIsAnnual] = useState(false);
  const plans = getAllPlans();

  return (
    <div>
      {/* Toggle */}
      <div className="flex justify-center mt-8">
        <div className="inline-flex rounded-full border border-gray-200 bg-gray-50 p-1">
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

      {/* Pricing Cards Grid */}
      <div className="grid md:grid-cols-3 gap-8 mt-12 items-center">
        {plans.map((plan) => (
          <PricingCard key={plan.name} plan={plan} isAnnual={isAnnual} />
        ))}
      </div>
    </div>
  );
}

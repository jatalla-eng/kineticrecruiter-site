import Link from 'next/link';
import { Check } from 'lucide-react';
import Badge from './Badge';

export interface Plan {
  name: string;
  tagline: string;
  monthly_price_display: string;
  annual_price_display: string;
  annual_savings_percent: number;
  features: string[];
  features_intro?: string;
  cta_text: string;
  cta_url: string;
  badge: string | null;
  sort_order: number;
}

interface PricingCardProps {
  plan: Plan;
  isAnnual: boolean;
}

export default function PricingCard({ plan, isAnnual }: PricingCardProps) {
  const isHighlighted = plan.badge === 'Most Popular';
  const price = isAnnual ? plan.annual_price_display : plan.monthly_price_display;

  return (
    <div
      className={`relative bg-white rounded-2xl p-8 flex flex-col shadow-sm ${
        isHighlighted
          ? 'border-2 border-kinetic-teal scale-105'
          : 'border border-gray-200'
      }`}
    >
      {/* Badge */}
      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <Badge variant="teal">{plan.badge}</Badge>
        </div>
      )}

      {/* Plan name and tagline */}
      <h3 className="text-2xl font-bold text-kinetic-navy mb-1">{plan.name}</h3>
      <p className="text-gray-500 mb-6 text-sm">{plan.tagline}</p>

      {/* Price */}
      <div className="mb-1">
        <span className="text-4xl font-bold text-kinetic-navy">{price}</span>
        <span className="text-gray-500 text-sm">/user/month</span>
      </div>

      {/* Annual savings badge */}
      {isAnnual && (
        <div className="mb-6">
          <span className="text-xs font-semibold text-kinetic-teal bg-kinetic-teal-light px-2 py-1 rounded-full">
            Save {plan.annual_savings_percent}%
          </span>
        </div>
      )}

      {!isAnnual && <div className="mb-6" />}

      {/* CTA Button */}
      <Link
        href={plan.cta_url}
        className={`block text-center py-3 px-6 rounded-lg font-semibold transition-colors mb-8 ${
          isHighlighted
            ? 'bg-kinetic-teal hover:bg-kinetic-teal-dark text-white'
            : 'border-2 border-kinetic-teal text-kinetic-teal hover:bg-kinetic-teal-light'
        }`}
      >
        {plan.cta_text}
      </Link>

      {/* Features */}
      <ul className="space-y-3 flex-1">
        {plan.features_intro && (
          <li className="text-sm italic text-gray-500 mb-1">{plan.features_intro}</li>
        )}
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-kinetic-teal" />
            <span className="text-gray-600 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { ArrowRight, Check } from 'lucide-react'

export default function PricingPreview() {
  const plans = [
    {
      name: 'Starter',
      price: '$29',
      description: 'For solo and freelance recruiters',
      features: [
        '50 total candidates',
        'AI matching and scoring included',
        'Client CRM included',
      ],
      cta: 'Start Free Trial',
      highlight: false,
    },
    {
      name: 'Professional',
      price: '$59',
      description: 'For growing agencies and talent teams',
      features: [
        '1,000 total candidates',
        'Unlimited jobs and clients',
        'Full AI suite with API access',
      ],
      cta: 'Start Free Trial',
      highlight: true,
    },
    {
      name: 'Agency',
      price: '$99',
      description: 'For established agencies scaling up',
      features: [
        'Unlimited candidates',
        'Dedicated onboarding session',
        'SSO, SLA, and custom reporting',
      ],
      cta: 'Contact Us',
      highlight: false,
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-lightGrey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every AI feature included. No add-ons. No hidden costs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-6 ${
                plan.highlight
                  ? 'bg-navy text-white'
                  : 'bg-white'
              }`}
            >
              {plan.highlight && (
                <div className="inline-block bg-kinetic-teal text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  Most Popular
                </div>
              )}
              <h3 className={`text-xl font-bold mb-1 ${plan.highlight ? 'text-white' : 'text-navy'}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-4 ${plan.highlight ? 'text-gray-400' : 'text-gray-600'}`}>
                {plan.description}
              </p>
              <div className="mb-4">
                <span className={`text-3xl font-bold ${plan.highlight ? 'text-white' : 'text-navy'}`}>
                  {plan.price}
                </span>
                <span className={plan.highlight ? 'text-gray-400' : 'text-gray-600'}>
                  /user/month
                </span>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-kinetic-teal' : 'text-kinetic-teal'}`} />
                    <span className={`text-sm ${plan.highlight ? 'text-gray-300' : 'text-gray-600'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href={plan.cta === 'Contact Us' ? '#contact' : '/pricing'}
                className={`block text-center py-3 px-4 rounded-lg font-semibold transition-colors ${
                  plan.highlight
                    ? 'bg-kinetic-teal hover:bg-kinetic-tealDark text-white'
                    : 'border-2 border-kinetic-teal text-kinetic-teal hover:bg-kinetic-teal hover:text-white'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="/pricing"
            className="inline-flex items-center text-kinetic-teal hover:text-kinetic-tealDark font-semibold"
          >
            See full pricing details
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

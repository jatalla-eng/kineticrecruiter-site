import { useState } from 'react'
import { Check, ArrowRight, Zap } from 'lucide-react'
import Layout from './Layout'

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: 'Starter',
      description: 'For solo and freelance recruiters',
      monthlyPrice: 29,
      annualPrice: 24,
      highlight: false,
      cta: 'Start Free Trial',
      features: [
        '50 total candidates',
        'Up to 10 open jobs',
        'Up to 10 clients',
        'AI resume parsing',
        'AI candidate matching and scoring',
        'AI career highlights',
        'Natural language search',
        'Job shortlist Kanban (7 stages)',
        'Client CRM with contacts',
        'Chrome extension (LinkedIn import)',
        'Email integration',
        'Dashboard and analytics',
        'Google and Microsoft OAuth',
        'Email support',
      ],
    },
    {
      name: 'Professional',
      description: 'For growing agencies and talent teams',
      monthlyPrice: 59,
      annualPrice: 49,
      highlight: true,
      cta: 'Start Free Trial',
      features: [
        'Everything in Starter, plus:',
        '1,000 total candidates',
        'Unlimited jobs',
        'Unlimited clients',
        'Bulk resume upload (drag and drop)',
        'Inbound email resume processing',
        'AI client submission emails',
        'Custom AI prompt configuration',
        'Source breakdown reporting',
        '30-day trend analytics',
        'API access (10K calls/day)',
        'Priority email support',
      ],
    },
    {
      name: 'Agency',
      description: 'For established agencies scaling their team',
      monthlyPrice: 99,
      annualPrice: 82,
      highlight: false,
      cta: 'Contact Us',
      features: [
        'Everything in Professional, plus:',
        'Unlimited candidates',
        'Custom report builder',
        'White-label career page',
        'Advanced API (100K calls/day)',
        'Data retention controls',
        'Dedicated account support',
        'SSO (SAML)',
        'Dedicated onboarding session',
        'SLA (99.9% uptime)',
        'Fair use AI policy',
      ],
    },
  ]

  const faqs = [
    {
      question: 'Can I change plans at any time?',
      answer: 'Yes. Upgrade or downgrade at any time. Upgrades take effect immediately. Downgrades apply at the end of your current billing period.',
    },
    {
      question: 'What happens when I hit my candidate limit?',
      answer: "You'll see a notification as you approach your limit. Once you reach it, you won't be able to add new candidates until you upgrade. Your existing data is never affected.",
    },
    {
      question: 'What happens when the trial ends?',
      answer: "If you don't cancel during the 7-day trial, your subscription begins automatically on the plan you selected. Cancel anytime during the trial at no charge.",
    },
    {
      question: 'Is there a setup or implementation fee?',
      answer: 'No. There are no setup fees, implementation fees, or training costs. You sign up and start using the platform immediately. Agency plan includes a dedicated onboarding session.',
    },
    {
      question: 'Do I need to pay extra for AI features?',
      answer: 'No. Every AI feature is included in every plan. There are no AI add-ons or premium tiers.',
    },
    {
      question: 'How does seat-based billing work?',
      answer: "You pay per active user. Add or remove seats at any time from the billing dashboard. Deactivated users don't count toward your seat total.",
    },
    {
      question: 'Do you offer annual billing?',
      answer: 'Yes. Annual billing saves approximately 17% compared to monthly. All plans are available on both cycles.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'All major credit cards via Stripe. Invoicing is available for Agency plan customers with 10 or more seats.',
    },
    {
      question: 'Is there a minimum contract?',
      answer: 'No. Monthly plans have no minimum commitment. Annual plans are billed upfront for 12 months.',
    },
  ]

  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-kinetic-tealLight via-white to-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Simple pricing. Every AI feature included.
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            No add-ons. No implementation fees. No per-feature charges. Pick a plan, add your team, start recruiting.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-lightGrey rounded-full p-1.5">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                !isAnnual ? 'bg-kinetic-teal text-white' : 'text-navy hover:text-kinetic-teal'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                isAnnual ? 'bg-kinetic-teal text-white' : 'text-navy hover:text-kinetic-teal'
              }`}
            >
              Annual <span className="text-kinetic-tealLight">Save 17%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 relative ${
                  plan.highlight
                    ? 'bg-navy text-white ring-4 ring-kinetic-teal'
                    : 'bg-lightGrey text-navy'
                }`}
                style={plan.highlight ? { marginTop: '-20px', marginBottom: '-20px' } : {}}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-kinetic-teal text-white text-xs font-semibold px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className={`text-2xl font-bold mb-2 ${plan.highlight ? '' : 'text-navy'}`}>
                  {plan.name}
                </h3>
                <p className={`mb-6 ${plan.highlight ? 'text-gray-400' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
                <div className="mb-1">
                  <span className="text-4xl font-bold">
                    ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className={plan.highlight ? 'text-gray-400' : 'text-gray-600'}>
                    /user/month
                  </span>
                </div>
                {isAnnual ? (
                  <p className={`text-sm mb-6 ${plan.highlight ? 'text-gray-500' : 'text-kinetic-teal'}`}>
                    or ${plan.annualPrice * 12}/user billed annually
                  </p>
                ) : (
                  <p className={`text-sm mb-6 ${plan.highlight ? 'text-gray-500' : 'text-gray-500'}`}>
                    or ${plan.annualPrice}/user billed annually
                  </p>
                )}
                <a
                  href={plan.cta === 'Contact Us' ? '#contact' : '#trial'}
                  className={`block text-center py-3 px-6 rounded-lg font-semibold transition-colors mb-8 ${
                    plan.highlight
                      ? 'bg-kinetic-teal hover:bg-kinetic-tealDark text-white'
                      : 'border-2 border-kinetic-teal text-kinetic-teal hover:bg-kinetic-teal hover:text-white'
                  }`}
                >
                  {plan.cta}
                </a>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 text-kinetic-teal`}
                      />
                      <span className={plan.highlight ? 'text-gray-300' : 'text-gray-600'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitor Comparison */}
      <section className="py-16 bg-lightGrey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">
            See how we compare.
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="px-6 py-4 text-left font-semibold">Feature</th>
                  <th className="px-6 py-4 text-center font-semibold bg-kinetic-teal border-l-4 border-kinetic-teal">KineticRecruiter Pro</th>
                  <th className="px-6 py-4 text-center font-semibold">Bullhorn Standard</th>
                  <th className="px-6 py-4 text-center font-semibold">Recruiterflow Base</th>
                  <th className="px-6 py-4 text-center font-semibold">Manatal Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-6 py-4 font-medium text-navy">Price/user/month</td>
                  <td className="px-6 py-4 text-center bg-kinetic-teal/10 font-semibold text-kinetic-teal border-l-4 border-kinetic-teal">$59</td>
                  <td className="px-6 py-4 text-center text-gray-600">$99</td>
                  <td className="px-6 py-4 text-center text-gray-600">$119</td>
                  <td className="px-6 py-4 text-center text-gray-600">$35</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-navy">AI matching included</td>
                  <td className="px-6 py-4 text-center bg-kinetic-teal/10 border-l-4 border-kinetic-teal"><Check className="w-5 h-5 text-kinetic-teal mx-auto" /></td>
                  <td className="px-6 py-4 text-center text-gray-600">$39+/mo add-on</td>
                  <td className="px-6 py-4 text-center text-gray-600">AIRA plan extra</td>
                  <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-kinetic-teal mx-auto" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-navy">AI career highlights</td>
                  <td className="px-6 py-4 text-center bg-kinetic-teal/10 border-l-4 border-kinetic-teal"><Check className="w-5 h-5 text-kinetic-teal mx-auto" /></td>
                  <td className="px-6 py-4 text-center text-gray-400">—</td>
                  <td className="px-6 py-4 text-center text-gray-400">—</td>
                  <td className="px-6 py-4 text-center text-gray-400">—</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-navy">Client CRM</td>
                  <td className="px-6 py-4 text-center bg-kinetic-teal/10 border-l-4 border-kinetic-teal"><Check className="w-5 h-5 text-kinetic-teal mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-kinetic-teal mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-kinetic-teal mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-kinetic-teal mx-auto" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-navy">Implementation fee</td>
                  <td className="px-6 py-4 text-center bg-kinetic-teal/10 font-semibold text-kinetic-teal border-l-4 border-kinetic-teal">$0</td>
                  <td className="px-6 py-4 text-center text-gray-600">$1K-15K+</td>
                  <td className="px-6 py-4 text-center text-gray-600">Paid migration</td>
                  <td className="px-6 py-4 text-center font-semibold text-kinetic-teal">$0</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-navy">Natural language search</td>
                  <td className="px-6 py-4 text-center bg-kinetic-teal/10 border-l-4 border-kinetic-teal"><Check className="w-5 h-5 text-kinetic-teal mx-auto" /></td>
                  <td className="px-6 py-4 text-center text-gray-400">—</td>
                  <td className="px-6 py-4 text-center text-gray-400">—</td>
                  <td className="px-6 py-4 text-center text-gray-400">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-lightGrey transition-colors"
                >
                  <span className="font-semibold text-navy pr-4">{faq.question}</span>
                  <ArrowRight
                    className={`w-5 h-5 text-kinetic-teal flex-shrink-0 transition-transform ${
                      openFaq === index ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 bg-white">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-kinetic-tealLight via-white to-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Start your 7-day free trial with full access to every feature.
          </p>
          <a
            href="#trial"
            className="inline-flex items-center justify-center bg-kinetic-teal hover:bg-kinetic-tealDark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg shadow-kinetic-teal/25"
          >
            Start Free Trial
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>
    </Layout>
  )
}

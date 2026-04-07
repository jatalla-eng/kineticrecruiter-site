'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What types of teams is KineticRecruiter built for?',
    answer:
      'Agency recruiters, boutique staffing firms, and small in-house talent teams who need candidate management, client tracking, and AI-powered matching without enterprise complexity or pricing.',
  },
  {
    question: 'What AI capabilities are included?',
    answer:
      'Every plan includes AI resume parsing, natural language candidate search, semantic matching, AI candidate-job scoring with breakdowns, AI career highlight generation, and AI-powered client submission email drafting. No AI add-ons or premium tiers.',
  },
  {
    question: 'How does the free trial work?',
    answer:
      'You get 7 days with 3 seats and full access to every feature on the Professional plan. Enter a payment method when you sign up, and if you don\'t cancel before the trial ends, your subscription begins automatically. You can cancel anytime during the trial at no charge.',
  },
  {
    question: 'Can I import my existing candidates?',
    answer:
      'Yes. Bulk upload resumes via drag-and-drop, forward resumes via email, or import from LinkedIn using the Chrome extension. AI parsing extracts structured data. Duplicate detection prevents double-ups.',
  },
  {
    question: 'How does billing work?',
    answer:
      'Stripe-powered, seat-based pricing. Monthly or annual. Add or remove seats anytime.',
  },
  {
    question: 'Is there a mobile app?',
    answer:
      'KineticRecruiter is a responsive web application accessible from any browser on any device. A dedicated mobile app is on the roadmap.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2332] mb-4">
            Frequently asked questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about KineticRecruiter.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-[#1a2332] pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#0d8488] flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-5 md:px-6 pb-5 md:pb-6 bg-white">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

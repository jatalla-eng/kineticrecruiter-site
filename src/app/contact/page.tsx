import { Suspense } from 'react';
import { generatePageMetadata } from '@/lib/metadata';
import ContactForm from '@/components/contact/ContactForm';

export const metadata = generatePageMetadata({
  title: 'Contact KineticRecruiter',
  description:
    'Questions about KineticRecruiter plans, features, or demos? Get in touch and our team will respond within 1 business day.',
  path: '/contact',
});

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kineticrecruiter.com' },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://kineticrecruiter.com/contact' },
  ],
};

const contactPointSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact KineticRecruiter',
  url: 'https://kineticrecruiter.com/contact',
  mainEntity: {
    '@type': 'Organization',
    name: 'KineticRecruiter',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      areaServed: 'AU',
      availableLanguage: ['English'],
    },
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([contactSchema, contactPointSchema]) }}
      />
      {/* Hero strip */}
      <section className="bg-kinetic-navy py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <h1 className="text-4xl font-bold text-white">Get in touch</h1>
          <p className="mt-3 text-lg text-gray-300 max-w-xl">
            For Agency plan inquiries, demos, or general questions — we typically respond within 1
            business day.
          </p>
        </div>
      </section>

      {/* Two-column content */}
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left: contact info */}
          <div>
            <h2 className="text-2xl font-semibold text-kinetic-navy mb-4">
              We&apos;d love to hear from you
            </h2>
            <p className="text-gray-600 mb-8">
              Whether you&apos;re evaluating KineticRecruiter for your agency, exploring our Agency
              plan features, or just have a question — reach out and someone from the team will get
              back to you promptly.
            </p>

            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-kinetic-teal uppercase tracking-wider mb-1">
                  Email us
                </p>
                <a
                  href="mailto:hello@kineticrecruiter.com"
                  className="text-kinetic-navy font-medium hover:text-kinetic-teal transition-colors"
                >
                  hello@kineticrecruiter.com
                </a>
              </div>

              <div>
                <p className="text-sm font-semibold text-kinetic-teal uppercase tracking-wider mb-3">
                  What to expect
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-kinetic-teal" />
                    Response within 1 business day
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-kinetic-teal" />
                    Live demo available for Agency plan inquiries
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-kinetic-teal" />
                    Free 7-day trial — no credit card required
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-kinetic-teal" />
                    Tailored onboarding for recruitment agencies
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div>
            <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-gray-100" />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>

      {/* FAQ — structured for AI search engines */}
      <section className="mx-auto max-w-[1200px] px-6 pb-16">
        <h2 className="text-2xl font-bold text-kinetic-navy mb-8">
          Frequently Asked Questions About Getting Started
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-kinetic-navy">
              How do I get started with KineticRecruiter?
            </h3>
            <p className="mt-2 text-gray-700">
              Sign up for a free 7-day trial at app.kineticrecruiter.com. No credit card is
              required. You can import existing candidates, post jobs, and use all AI features
              during the trial.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-kinetic-navy">
              How long does it take to set up KineticRecruiter?
            </h3>
            <p className="mt-2 text-gray-700">
              Most recruitment agencies are up and running within one day. You can import candidates
              from CSV files or other ATS platforms, and the AI features work immediately with no
              additional configuration.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-kinetic-navy">
              What support does KineticRecruiter offer?
            </h3>
            <p className="mt-2 text-gray-700">
              KineticRecruiter provides email and in-app support with responses within 1 business
              day. Agency plan customers receive tailored onboarding assistance and can book live
              demos with the team.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-kinetic-navy">
              Can I migrate from another ATS to KineticRecruiter?
            </h3>
            <p className="mt-2 text-gray-700">
              Yes. KineticRecruiter supports candidate data import via CSV. The team can also assist
              with migration from other ATS platforms for Agency plan customers.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

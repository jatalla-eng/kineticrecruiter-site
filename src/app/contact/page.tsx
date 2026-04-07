import { Suspense } from 'react';
import { generatePageMetadata } from '@/lib/metadata';
import ContactForm from '@/components/contact/ContactForm';

export const metadata = generatePageMetadata({
  title: 'Contact Us',
  description:
    'Get in touch with the KineticRecruiter team. Questions about plans, features, or getting started? We respond within 1 business day.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero strip */}
      <section className="bg-[#1a2332] py-16">
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
            <h2 className="text-2xl font-semibold text-[#1a2332] mb-4">
              We&apos;d love to hear from you
            </h2>
            <p className="text-gray-600 mb-8">
              Whether you&apos;re evaluating KineticRecruiter for your agency, exploring our Agency
              plan features, or just have a question — reach out and someone from the team will get
              back to you promptly.
            </p>

            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-[#0d8488] uppercase tracking-wider mb-1">
                  Email us
                </p>
                <a
                  href="mailto:hello@kineticrecruiter.com"
                  className="text-[#1a2332] font-medium hover:text-[#0d8488] transition-colors"
                >
                  hello@kineticrecruiter.com
                </a>
              </div>

              <div>
                <p className="text-sm font-semibold text-[#0d8488] uppercase tracking-wider mb-3">
                  What to expect
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#0d8488]" />
                    Response within 1 business day
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#0d8488]" />
                    Live demo available for Agency plan inquiries
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#0d8488]" />
                    Free 7-day trial — no credit card required
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#0d8488]" />
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
    </main>
  );
}

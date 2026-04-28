import { generatePageMetadata } from '@/lib/metadata';
import BooleanSearchBuilder from './_BooleanSearchBuilder';

export const metadata = generatePageMetadata({
  title: 'Free Boolean Search String Builder for Recruiters',
  description:
    'Build Boolean search strings for LinkedIn, Google, and job boards in seconds. Free tool for recruiters — no signup needed. Try it now.',
  path: '/tools/boolean-search-builder',
});

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kineticrecruiter.com' },
    { '@type': 'ListItem', position: 2, name: 'Free Tools', item: 'https://kineticrecruiter.com/tools' },
    { '@type': 'ListItem', position: 3, name: 'Boolean Search Builder', item: 'https://kineticrecruiter.com/tools/boolean-search-builder' },
  ],
};

const toolSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Boolean Search String Builder',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://kineticrecruiter.com/tools/boolean-search-builder',
  description: 'Free tool that builds Boolean search strings for LinkedIn, Google X-Ray, Seek, Indeed, and GitHub. No signup required.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: ['LinkedIn Boolean', 'Google X-Ray site:linkedin.com/in', 'Include/exclude operators', 'Copy to clipboard', 'No signup'],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a Boolean search string?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A Boolean search string combines keywords with operators like AND, OR, and NOT to narrow or broaden a search. Recruiters use Boolean strings on LinkedIn, Google X-Ray, job boards, and GitHub to find candidates with specific skills, titles, and locations.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I search LinkedIn with Boolean?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste the Boolean string into the LinkedIn keyword search box. Use quotes around multi-word terms (e.g., "product manager"), AND to require terms, OR to allow alternatives, NOT to exclude, and parentheses to group logic.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Google X-Ray search?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Google X-Ray (or X-Ray search) uses Google\'s site: operator to search a specific domain. For example, site:linkedin.com/in "product manager" "Sydney" returns LinkedIn profiles matching those terms — even ones you would not see inside LinkedIn without Recruiter.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this Boolean builder free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. 100% free, no signup, no account, no credit card. Runs entirely in your browser.',
      },
    },
  ],
};

export default function BooleanSearchBuilderPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, toolSchema, faqSchema]) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-kinetic-teal to-kinetic-teal-dark py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <span className="inline-block mb-3 rounded-full bg-white/20 px-4 py-1 text-sm font-medium text-white">
            Free Tool
          </span>
          <h1 className="text-4xl font-bold text-white">Boolean Search String Builder</h1>
          <p className="mt-3 max-w-2xl text-lg text-white/90">
            Build Boolean search strings for LinkedIn, Google X-Ray, Seek, Indeed, and GitHub in seconds.
            No signup, no credit card — runs entirely in your browser.
          </p>
        </div>
      </section>

      <BooleanSearchBuilder />

      {/* How it works */}
      <section className="mx-auto max-w-[1200px] px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl md:text-3xl font-bold text-kinetic-navy mb-8">
          How Boolean search works
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
          <div>
            <h3 className="text-lg font-semibold text-kinetic-navy mb-2">AND — require all terms</h3>
            <p className="text-gray-700 text-sm mb-2">Narrows results. Every candidate must match every AND term.</p>
            <code className="block text-xs bg-gray-50 p-3 rounded font-mono text-gray-800">&quot;product manager&quot; AND &quot;SaaS&quot; AND &quot;Sydney&quot;</code>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-kinetic-navy mb-2">OR — allow alternatives</h3>
            <p className="text-gray-700 text-sm mb-2">Broadens results. Group with parentheses.</p>
            <code className="block text-xs bg-gray-50 p-3 rounded font-mono text-gray-800">(&quot;product manager&quot; OR &quot;PM&quot; OR &quot;product owner&quot;)</code>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-kinetic-navy mb-2">NOT — exclude terms</h3>
            <p className="text-gray-700 text-sm mb-2">Filters out unwanted matches.</p>
            <code className="block text-xs bg-gray-50 p-3 rounded font-mono text-gray-800">&quot;product manager&quot; NOT &quot;junior&quot;</code>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-kinetic-navy mb-2">Quotes — exact phrase</h3>
            <p className="text-gray-700 text-sm mb-2">Locks multi-word phrases together.</p>
            <code className="block text-xs bg-gray-50 p-3 rounded font-mono text-gray-800">&quot;senior backend engineer&quot;</code>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[1200px] px-6 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-kinetic-navy mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6 max-w-3xl">
          {faqSchema.mainEntity.map((item) => (
            <div key={item.name}>
              <h3 className="text-lg font-semibold text-kinetic-navy">{item.name}</h3>
              <p className="mt-2 text-gray-700">{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

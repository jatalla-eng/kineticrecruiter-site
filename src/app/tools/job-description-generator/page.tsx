import { generatePageMetadata } from '@/lib/metadata';
import JDGeneratorForm from './_JDGeneratorForm';

export const metadata = generatePageMetadata({
  title: 'Free AI Job Description Generator',
  description:
    'Generate professional job descriptions in seconds with AI. Free tool for recruiters — no signup needed. Try it now.',
  path: '/tools/job-description-generator',
});

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kineticrecruiter.com' },
    { '@type': 'ListItem', position: 2, name: 'Free Tools', item: 'https://kineticrecruiter.com/tools' },
    { '@type': 'ListItem', position: 3, name: 'Job Description Generator', item: 'https://kineticrecruiter.com/tools/job-description-generator' },
  ],
};

const toolSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'AI Job Description Generator',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://kineticrecruiter.com/tools/job-description-generator',
  description: 'Free AI-powered tool that generates professional, tailored job descriptions in seconds. No signup required.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: ['AI-drafted job descriptions', 'Industry-specific output', 'No signup required', 'Instant download'],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to generate a job description with AI',
  description: 'Step-by-step guide to using the KineticRecruiter free AI job description generator.',
  totalTime: 'PT2M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter the role', text: 'Type in the job title you want to hire for (e.g., "Senior Backend Developer").' },
    { '@type': 'HowToStep', position: 2, name: 'Add industry context', text: 'Specify the industry, required skills, and any must-have experience.' },
    { '@type': 'HowToStep', position: 3, name: 'Generate', text: 'Click Generate. The AI drafts a complete job description in 10–30 seconds.' },
    { '@type': 'HowToStep', position: 4, name: 'Copy or edit', text: 'Copy the description to your clipboard or fine-tune it inline before posting.' },
  ],
};

export default function JDGeneratorPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, toolSchema, howToSchema]) }}
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-kinetic-teal to-kinetic-teal-dark py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <span className="inline-block mb-3 rounded-full bg-white/20 px-4 py-1 text-sm font-medium text-white">
            Free Tool
          </span>
          <h1 className="text-4xl font-bold text-white">Free AI Job Description Generator</h1>
          <p className="mt-3 max-w-xl text-lg text-white/90">
            Generate professional, tailored job descriptions in seconds — powered by Gemini AI.
            Just tell us the role, industry, and what you need.
          </p>
        </div>
      </section>

      <JDGeneratorForm />
    </main>
  );
}

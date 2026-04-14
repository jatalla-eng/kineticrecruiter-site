import { generatePageMetadata } from '@/lib/metadata';
import JDGeneratorForm from './_JDGeneratorForm';

export const metadata = generatePageMetadata({
  title: 'Free AI Job Description Generator',
  description:
    'Generate professional job descriptions in seconds with AI. Free tool for recruiters — no signup needed. Try it now.',
  path: '/tools/job-description-generator',
});

export default function JDGeneratorPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-kinetic-teal to-kinetic-teal-dark py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <span className="inline-block mb-3 rounded-full bg-white/20 px-4 py-1 text-sm font-medium text-white">
            Free Tool
          </span>
          <h1 className="text-4xl font-bold text-white">AI Job Description Generator</h1>
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

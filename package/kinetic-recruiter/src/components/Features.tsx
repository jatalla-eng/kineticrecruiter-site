import { Search, Sparkles, FileText, Building2, LayoutGrid, Upload } from 'lucide-react';
import FeatureIllustration1 from './FeatureIllustration1';
import FeatureIllustration2 from './FeatureIllustration2';
import FeatureIllustration3 from './FeatureIllustration3';
import FeatureIllustration4 from './FeatureIllustration4';
import FeatureIllustration5 from './FeatureIllustration5';
import FeatureIllustration6 from './FeatureIllustration6';

export default function Features() {
  const features = [
    {
      id: 'discovery',
      headline: 'Search your database the way you actually think.',
      body: "Stop writing Boolean strings. Type what you need in plain English — 'Find backend developers with fintech experience in Sydney' — and get ranked results in seconds. KineticRecruiter uses semantic embeddings to understand what candidates actually do, not just what words appear on their resume.",
      bullets: [
        'Natural language search across your entire database',
        'Semantic matching that understands context, not just keywords',
        'Results ranked by relevance with AI match scores',
      ],
      illustration: FeatureIllustration1,
      reverse: false,
    },
    {
      id: 'scoring',
      headline: 'Know exactly why a candidate fits. Or doesn\'t.',
      body: "Every candidate matched to a job gets a score from 0 to 100. Unlike other platforms that give you a number and nothing else, KineticRecruiter breaks down the score. You see which factors contributed, what weighted highest, and a plain-English explanation of why this candidate was surfaced.",
      bullets: [
        '0-100 match score for every candidate-job pairing',
        'Full factor breakdown showing what drove the score',
        'Written match reasons you can share directly with clients',
      ],
      illustration: FeatureIllustration2,
      reverse: true,
    },
    {
      id: 'highlights',
      headline: 'Candidate summaries that write themselves.',
      body: 'Stop spending 15 minutes per candidate writing profile summaries for client submissions. KineticRecruiter analyses each resume and generates career highlight bullet points automatically. Action-driven, context-aware, and ready to drop into your client emails.',
      bullets: [
        'AI-generated career highlights per candidate',
        'Built for client-facing submissions',
        'Edit and refine, or use as-is',
      ],
      illustration: FeatureIllustration3,
      reverse: false,
    },
    {
      id: 'crm',
      headline: 'Manage clients and candidates in one system.',
      body: 'Recruitment agencies need more than candidate tracking. KineticRecruiter includes full client management — company profiles, contact directories, job assignments, and AI-powered client submission emails. No separate CRM required.',
      bullets: [
        'Client company profiles with contacts and hiring managers',
        'AI-composed client submission emails',
        'Company enrichment from website data',
      ],
      illustration: FeatureIllustration4,
      reverse: true,
    },
    {
      id: 'shortlist',
      headline: 'See every candidate\'s status at a glance.',
      body: 'Each job has a visual shortlist board with seven stages. Drag candidates between stages, track outcomes, and add candidates from your database or from AI-suggested matches. Star ratings and suitability scores let you compare candidates within a stage.',
      bullets: [
        '7-stage Kanban board per job',
        'Drag-and-drop stage progression',
        'AI-suggested candidates with match scores',
      ],
      illustration: FeatureIllustration5,
      reverse: false,
    },
    {
      id: 'resume',
      headline: 'Resumes in. Structured profiles out. Every time.',
      body: 'Upload one resume, bulk upload fifty, or forward them from your inbox. AI parsing extracts names, contact details, skills, experience, and work history into structured profiles. If the AI parser is unavailable, a regex fallback still extracts core fields. No resume gets dropped.',
      bullets: [
        'AI parsing from PDF, DOC, DOCX',
        'Bulk upload with drag-and-drop',
        'Inbound email processing — forward resumes and candidates appear automatically',
      ],
      illustration: FeatureIllustration6,
      reverse: true,
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-20 md:space-y-28">
          {features.map((feature, index) => {
            const Illustration = feature.illustration;
            return (
              <div
                key={feature.id}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                  feature.reverse ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={feature.reverse ? 'lg:order-2' : ''}>
                  <h3 className="text-2xl md:text-3xl font-bold text-navy mb-4 leading-tight">
                    {feature.headline}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {feature.body}
                  </p>
                  <ul className="space-y-3">
                    {feature.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-kinetic-teal mr-3 mt-0.5 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-600">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`${feature.reverse ? 'lg:order-1' : ''}`}>
                  <Illustration />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

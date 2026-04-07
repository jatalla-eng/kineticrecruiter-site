import { Search, Sparkles, FileText, Building2, LayoutGrid, Upload } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'AI Candidate Discovery',
    description:
      'Search your database the way you actually think. Type plain English — "Find backend developers with fintech experience in Sydney" — and get ranked results in seconds. Semantic embeddings understand what candidates actually do, not just keywords.',
  },
  {
    icon: Sparkles,
    title: 'AI Candidate Scoring',
    description:
      'Every candidate matched to a job gets a score from 0 to 100 with a full factor breakdown. See which factors contributed, what weighted highest, and a plain-English explanation you can share directly with clients.',
  },
  {
    icon: FileText,
    title: 'AI Career Highlights',
    description:
      'Stop spending 15 minutes per candidate writing profile summaries. KineticRecruiter analyses each resume and generates career highlight bullet points automatically — action-driven, context-aware, and ready for client submissions.',
  },
  {
    icon: Building2,
    title: 'Client CRM',
    description:
      'Manage clients and candidates in one system. Full client management includes company profiles, contact directories, job assignments, and AI-powered client submission emails. No separate CRM required.',
  },
  {
    icon: LayoutGrid,
    title: 'Job Shortlist Board',
    description:
      'Each job has a visual shortlist board with seven stages. Drag candidates between stages, track outcomes, and add candidates from your database or AI-suggested matches. Star ratings and suitability scores let you compare candidates within a stage.',
  },
  {
    icon: Upload,
    title: 'Resume Intake',
    description:
      'Upload one resume, bulk upload fifty, or forward them from your inbox. AI parsing extracts names, contact details, skills, experience, and work history into structured profiles. No resume gets dropped.',
  },
];

export default function FeatureGrid() {
  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2332] mb-4">
            Everything you need to run your recruitment operation
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every AI feature included in every plan. No add-ons. No per-feature charges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0d8488]/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#0d8488]" />
                </div>
                <h3 className="text-lg font-bold text-[#1a2332] mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

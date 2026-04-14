import {
  Search,
  BarChart3,
  FileText,
  Send,
  Upload,
  Globe,
  Building2,
  Layout,
  Share2,
  Users,
  BarChart,
  Sparkles
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const features = [
  {
    icon: Search,
    title: 'AI Candidate Discovery',
    description:
      'Search in plain English. Semantic matching finds candidates that keyword search would miss. Results ranked by AI relevance scores.',
  },
  {
    icon: BarChart3,
    title: 'AI Match Scoring',
    description:
      'Every candidate scored 0-100 against every job. Full factor breakdown. Written reasons you can share directly with clients.',
  },
  {
    icon: FileText,
    title: 'AI Career Highlights',
    description:
      'Auto-generated career summary bullet points from every resume. Client-ready in seconds, not minutes. No other ATS does this.',
  },
  {
    icon: Send,
    title: 'AI Client Submissions',
    description:
      'One click generates a professional submission email with candidate summary. Uses your organisation\'s tone and style. Review, tweak, send.',
  },
  {
    icon: Upload,
    title: 'Multi-Channel Resume Intake',
    description:
      'Upload one, bulk upload fifty, or forward from your inbox. AI parsing with regex fallback. Duplicate detection. No resume gets lost.',
  },
  {
    icon: Globe,
    title: 'LinkedIn Chrome Extension',
    description:
      'Import candidates from any LinkedIn profile in one click. Name, photo, work history, skills, and education pulled straight into your ATS.',
  },
  {
    icon: Building2,
    title: 'Built-In Client CRM',
    description:
      'Client profiles, contact directories, job assignments, and company enrichment. Every job links to a client. Every submission tracked.',
  },
  {
    icon: Layout,
    title: 'Job Shortlist Board',
    description:
      '7-stage Kanban board per job. Drag-and-drop. Star ratings. Suitability scores. Outcome tracking. Add from your database or AI suggestions.',
  },
  {
    icon: Share2,
    title: 'Shareable Client Review',
    description:
      'Generate a secure link. Clients review candidates, leave comments, approve or reject — without creating an account. You get notified instantly.',
  },
  {
    icon: Users,
    title: 'Team Management',
    description:
      'Four role levels. Google and Microsoft OAuth. Email invitations with configurable expiry. Domain auto-matching for seamless onboarding.',
  },
  {
    icon: BarChart,
    title: 'Dashboard & Analytics',
    description:
      'Pipeline visualisation, 30-day trends, source breakdown, recent activity feed. See where every candidate sits across every role at a glance.',
  },
  {
    icon: Sparkles,
    title: 'Free AI Job Description Generator',
    description:
      'Generate professional job descriptions in seconds. No login required. Try it now and see what the AI can do.',
    link: '/tools/job-description-generator',
    linkText: 'Try it free →',
    special: true,
  },
];

export default function FeatureGrid() {
  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-kinetic-navy mb-4">
            Everything you need to run your recruitment operation.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            One platform. No bolted-on tools. No separate CRM. No spreadsheet sidecars.
          </p>
        </div>

        {/* First row of features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.slice(0, 4).map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="rounded-xl p-6 border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200 bg-white">
                <div className="w-10 h-10 bg-kinetic-teal/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-kinetic-teal" />
                </div>
                <h3 className="font-bold text-kinetic-navy text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Human imagery break */}
        <div className="my-8 md:my-12 grid md:grid-cols-2 gap-6 items-center">
          <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden">
            <Image
              src="/images/team-success.jpg"
              alt="Recruitment team celebrating a successful placement"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-kinetic-navy mb-3">
              Built by recruiters, for recruiters.
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Every feature was designed around how agency recruiters actually work — from the 7-stage Kanban board to AI-powered client submissions. No enterprise bloat, no features you&apos;ll never use.
            </p>
          </div>
        </div>

        {/* Remaining features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.slice(4).map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`rounded-xl p-6 border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200 ${
                  feature.special ? 'bg-kinetic-teal/5' : 'bg-white'
                }`}
              >
                <div className="w-10 h-10 bg-kinetic-teal/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-kinetic-teal" />
                </div>
                <h3 className="font-bold text-kinetic-navy text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                {feature.link && (
                  <Link
                    href={feature.link}
                    className="text-kinetic-teal text-sm font-medium mt-3 inline-block hover:underline"
                  >
                    {feature.linkText}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

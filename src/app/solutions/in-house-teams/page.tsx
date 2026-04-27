import { generatePageMetadata } from '@/lib/metadata';
import { softwareApplicationSchema } from '@/lib/schema';
import FeatureSection from '@/components/ui/FeatureSection';
import CTASection from '@/components/sections/CTASection';
import { ArrowRight, Check } from 'lucide-react';

export const metadata = generatePageMetadata({
  title: 'ATS for In-House Talent Teams',
  description:
    'Streamline internal hiring with AI candidate scoring, structured intake, and team collaboration. Try KineticRecruiter free for 7 days.',
  path: '/solutions/in-house-teams',
});

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kineticrecruiter.com' },
    { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://kineticrecruiter.com/solutions/in-house-teams' },
    { '@type': 'ListItem', position: 3, name: 'In-House Teams' },
  ],
};

const productSchema = softwareApplicationSchema({
  name: 'KineticRecruiter for In-House Talent Teams',
  description: 'ATS for internal talent teams. Streamline hiring with AI candidate scoring, structured intake, and team collaboration.',
  url: 'https://kineticrecruiter.com/solutions/in-house-teams',
  featureList: ['AI candidate scoring', 'Structured intake forms', 'Team collaboration', 'Hiring manager workflows', 'Interview coordination'],
});

export default function InHouseTeamsPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, productSchema]) }}
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-kinetic-navy to-[#243447] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Hire smarter without hiring more recruiters.
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              KineticRecruiter gives small talent teams the AI-powered matching and candidate intelligence that enterprise platforms charge six figures for.
            </p>
            <a
              href="https://app.kineticrecruiter.com/register"
              data-cta="solution-in-house-teams"
              className="inline-flex items-center justify-center bg-kinetic-teal hover:bg-kinetic-teal-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-kinetic-navy mb-6">The in-house talent team reality</h2>
            <ul className="space-y-4">
              {[
                'A team of two doing the work of ten — filling every open role, building a pipeline, coordinating with hiring managers',
                'No budget for Greenhouse or the headcount to justify Workable',
                'Spending hours manually searching when new roles open instead of 5 minutes reviewing AI suggestions',
                'Hiring managers asking for updates because they can\'t see pipeline progress without a meeting',
                'Enterprise ATS pricing that assumes you have an implementation budget',
              ].map((pain, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-kinetic-teal flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{pain}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <div className="bg-[#F8FAFB]">
        <FeatureSection
          headline="You're a team of two doing the work of ten."
          body="Small in-house talent teams are expected to fill every open role, build a candidate pipeline, coordinate with hiring managers, and keep track of it all. You don't have the budget for Greenhouse or the headcount to justify Workable. But you still need an ATS that actually helps you recruit, not just store applications."
          imageSrc="/images/team-meeting.png"
          imageAlt="Small in-house talent team managing multiple open roles and candidate pipelines"
          reverse={true}
        />
      </div>

      <div className="bg-white">
        <FeatureSection
          headline="AI matching that works while you're in meetings."
          body="When a new role opens, KineticRecruiter scans your existing candidate database and surfaces candidates who match. Not just by keywords but by understanding the role requirements and the candidate's actual experience. Each match comes with a score, a factor breakdown, and a plain-English explanation you can share with the hiring manager. You spend 5 minutes reviewing AI suggestions instead of 2 hours manually searching."
          bullets={[
            'AI-suggested candidates for every new role',
            'Match scores with full transparency and written reasons',
            'Career highlights auto-generated for hiring manager review',
            'Natural language search when you want to dig deeper',
          ]}
          imageSrc="/images/recruiter-1.png"
          imageAlt="AI candidate matching results with scores and plain-English explanations"
          reverse={false}
        />
      </div>

      <div className="bg-[#F8FAFB]">
        <FeatureSection
          headline="Keep hiring managers in the loop without extra meetings."
          body="Every role has a visual shortlist board showing exactly where each candidate sits: sourcing, screening, interview, offer, hired. Hiring managers can see progress without asking for an update. Star ratings and suitability scores make it easy to compare candidates at a glance."
          imageSrc="/images/video-call.png"
          imageAlt="Visual pipeline board showing candidate stages for hiring manager visibility"
          reverse={true}
        />
      </div>

      <div className="bg-white">
        <FeatureSection
          headline="No implementation project. No training budget."
          body="Sign up, create your first job, and start adding candidates. KineticRecruiter is designed to be useful on day one, not after a 6-week implementation. Upload your existing resumes in bulk, let the AI parse them, and you've got a searchable database by the end of the afternoon."
          bullets={[
            '7-day free trial with full access',
            'Bulk resume upload with AI parsing',
            'No implementation fee, no training cost',
            'Dashboard and analytics from day one',
          ]}
          imageSrc="/images/recruiter-2.png"
          imageAlt="Quick setup flow showing four steps from sign-up to recruiting in one day"
          reverse={false}
        />
      </div>

      <div className="bg-[#F8FAFB]">
        <FeatureSection
          headline="Enterprise AI at startup pricing."
          body="Greenhouse starts at $50,000 per year before implementation and training. KineticRecruiter's Professional plan is $59 per user per month with every AI feature included. For a 3-person talent team, that's $2,124 per year versus $50,000+."
          imageSrc="/images/recruiter-success.png"
          imageAlt="Annual pricing comparison showing KineticRecruiter at $2,124/yr versus Greenhouse at $50,000+/yr"
          reverse={true}
        />
      </div>

      <CTASection variant="minimal" />
    </main>
  );
}

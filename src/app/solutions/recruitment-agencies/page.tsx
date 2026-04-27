import { generatePageMetadata } from '@/lib/metadata';
import { softwareApplicationSchema } from '@/lib/schema';
import FeatureSection from '@/components/ui/FeatureSection';
import CTASection from '@/components/sections/CTASection';
import { ArrowRight, Check } from 'lucide-react';

export const metadata = generatePageMetadata({
  title: 'ATS for Recruitment Agencies',
  description:
    'Manage candidates across multiple clients, track placements, and close roles faster with AI matching. Start your free agency trial.',
  path: '/solutions/recruitment-agencies',
});

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kineticrecruiter.com' },
    { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://kineticrecruiter.com/solutions/recruitment-agencies' },
    { '@type': 'ListItem', position: 3, name: 'Recruitment Agencies' },
  ],
};

const productSchema = softwareApplicationSchema({
  name: 'KineticRecruiter for Recruitment Agencies',
  description: 'AI-powered ATS for recruitment agencies. Manage candidates across multiple clients, track placements, and close roles faster.',
  url: 'https://kineticrecruiter.com/solutions/recruitment-agencies',
  featureList: ['Multi-client candidate management', 'Placement tracking', 'Client CRM', 'AI candidate matching', 'Agency-specific workflows'],
});

export default function RecruitmentAgenciesPage() {
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
              Built for how agencies actually work.
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Most ATS platforms are designed for in-house HR teams hiring into one company. KineticRecruiter is built for agencies managing multiple clients, multiple roles, and hundreds of candidates across them all.
            </p>
            <a
              href="https://app.kineticrecruiter.com/register"
              data-cta="solution-recruitment-agencies"
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
            <h2 className="text-3xl font-bold text-kinetic-navy mb-6">The challenges agencies face every day</h2>
            <ul className="space-y-4">
              {[
                'Juggling client expectations, candidate pipelines across dozens of roles, and the pressure to submit quality profiles fast',
                'Using an ATS for candidates, a separate CRM for clients, a spreadsheet for tracking submissions, and email holding the rest together',
                'Keyword-only search that misses great candidates because they worded things differently',
                'Spending 20+ minutes per submission manually writing candidate summaries',
                'Paying for AI features as add-ons on top of already expensive per-seat pricing',
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
          headline="You manage clients, not just candidates."
          body={`Every day you're juggling client expectations, candidate pipelines across dozens of roles, and the pressure to submit quality profiles fast. Your current setup probably involves an ATS for candidates, a separate CRM for clients, a spreadsheet for tracking submissions, and your email inbox holding the rest together.

KineticRecruiter puts all of it in one system.`}
          imageSrc="/images/recruiter-3.png"
          imageAlt="Recruitment agency recruiter managing multiple client accounts and candidate pipelines"
          reverse={true}
        />
      </div>

      <div className="bg-white">
        <FeatureSection
          headline="Clients are first-class, not an afterthought."
          body="Create client profiles with company details, contacts, and hiring managers. Link jobs directly to clients. Track which candidates have been submitted, interviewed, and placed for each client. When you need to submit a candidate, the AI drafts the email, generates a candidate summary, and gets it ready to send in seconds."
          bullets={[
            'Client profiles with contacts, industry, and company enrichment',
            'Every job linked to a client and hiring manager',
            'AI-generated submission emails with candidate summaries',
            'Track the full lifecycle: sourcing through to placement',
          ]}
          imageSrc="/images/recruiter-success.png"
          imageAlt="Client CRM showing company profile, linked jobs, and submission tracking"
          reverse={false}
        />
      </div>

      <div className="bg-[#F8FAFB]">
        <FeatureSection
          headline="Find the right candidate before your competitor does."
          body="After a year of recruiting you've got thousands of candidates in your system. Most ATS platforms let you search by keyword, maybe filter by location or skills. KineticRecruiter lets you search in plain English: &quot;senior Java developers with banking experience in Melbourne who are open to contract work.&quot; The AI understands context and returns ranked results with match scores and reasons."
          bullets={[
            'Natural language search across your entire candidate pool',
            'AI match scoring (0-100) with factor breakdowns',
            'Career highlight generation for fast client submissions',
            'Semantic matching finds candidates keyword search would miss',
          ]}
          imageSrc="/images/recruiter-1.png"
          imageAlt="Natural language search returning ranked candidate matches with AI scores"
          reverse={true}
        />
      </div>

      <div className="bg-white">
        <FeatureSection
          headline="Resumes arrive from everywhere. They should all end up in the same place."
          body="A referral forwards you a CV. A candidate applies on a job board. You source 20 profiles on LinkedIn. KineticRecruiter handles all of it: single upload, bulk upload, email forwarding, and LinkedIn Chrome extension import. Every resume gets AI-parsed, checked for duplicates, and indexed for semantic search."
          imageSrc="/images/recruiter-2.png"
          imageAlt="Multi-channel resume intake showing upload, email forward, and LinkedIn import"
          reverse={false}
        />
      </div>

      <div className="bg-[#F8FAFB]">
        <FeatureSection
          headline="Add recruiters without adding line items."
          body="Bullhorn charges $99-315 per user per month, then adds $39+ for automation, more for LinkedIn integration, more for analytics. KineticRecruiter starts at $29 per user per month with every AI feature included. No add-ons. No implementation fees. No training costs."
          imageSrc="/images/team-meeting.png"
          imageAlt="Pricing comparison showing KineticRecruiter at $2,940/yr versus Bullhorn at $13,000+/yr"
          reverse={true}
        />
      </div>

      <CTASection variant="minimal" />
    </main>
  );
}

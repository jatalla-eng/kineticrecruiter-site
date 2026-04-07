import { generatePageMetadata } from '@/lib/metadata';
import FeatureSection from '@/components/ui/FeatureSection';
import CTASection from '@/components/sections/CTASection';
import { ArrowRight, LayoutGrid } from 'lucide-react';

export const metadata = generatePageMetadata({
  title: 'Agency Workflow',
  description: 'Client CRM, job shortlist Kanban, and AI submission emails built for recruitment agencies.',
  path: '/features/agency-workflow',
});

export default function AgencyWorkflowPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#E8F5F5] via-white to-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#0d8488]/10 text-[#0d8488] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <LayoutGrid className="w-4 h-4" />
              Agency Workflow
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a2332] mb-6">
              Clients, candidates, and submissions. One system.
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              KineticRecruiter is built for recruitment agencies who manage multiple clients, not HR teams hiring into one company.
            </p>
            <a
              href="https://app.kineticrecruiter.com/register"
              className="inline-flex items-center justify-center bg-[#0d8488] hover:bg-[#0b7276] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <div className="bg-white">
        <FeatureSection
          headline="Every client. Every contact. Every role. Linked."
          body={`Create client company profiles with industry, website, logo, and contact details. Add contacts with titles, email, phone, LinkedIn, and reporting structure. Assign jobs to clients and link hiring managers. Enrich company profiles automatically from their website.

Clients are a core entity in KineticRecruiter. Every job belongs to a client. Every submission is tracked against a client. Your entire book of business lives alongside your candidate data.`}
          imageSrc="/images/recruiter-1.png"
          imageAlt="Client CRM showing company profile with contacts and linked jobs"
          reverse={false}
        />
      </div>

      <div className="bg-[#F8FAFB]">
        <FeatureSection
          headline="Seven stages. Complete visibility."
          body={`Every job has a visual shortlist board: Sourcing, Screened, Client Submitted, Interviewed, Offer, Placed, Closed. Drag candidates between stages. Track outcomes for closed candidates (hired, rejected, withdrawn). Star ratings (1-5) and suitability scores (0-100) let you compare candidates within a stage.

Add candidates from your existing database, from AI-suggested matches, or from new applications.`}
          imageSrc="/images/recruiter-2.png"
          imageAlt="Job shortlist Kanban board with candidates in different pipeline stages"
          reverse={true}
        />
      </div>

      <div className="bg-white">
        <FeatureSection
          headline="Draft, review, send. Under 30 seconds."
          body="Select a candidate on your shortlist, click &quot;Submit to Client&quot;, and KineticRecruiter drafts a professional email. The AI uses your organisation's custom prompt settings to match your team's tone and structure. A candidate summary is auto-generated and included. Review, tweak if needed, and send via your default email client."
          imageSrc="/images/team-meeting.png"
          imageAlt="AI-drafted submission email with candidate summary ready to send"
          reverse={false}
        />
      </div>

      <div className="bg-[#F8FAFB]">
        <FeatureSection
          headline="From first contact to placement. Tracked."
          body="Dashboard metrics show your pipeline health across all clients and roles. Total jobs, active jobs, candidates in pipeline, and placement rate at a glance. 30-day trends track new candidates, applications, and hires over time. Source breakdown reporting shows which channels deliver results."
          imageSrc="/images/recruiter-success.png"
          imageAlt="Agency dashboard showing pipeline metrics, placement rates, and 30-day trends"
          reverse={true}
        />
      </div>

      <CTASection
        headline="Ready to streamline your agency workflow?"
        subheadline="Start your 7-day free trial with full access to every feature."
        primaryCTA={{ text: 'Start Free Trial', href: 'https://app.kineticrecruiter.com/register' }}
        secondaryCTA={{ text: 'See Pricing', href: '/pricing' }}
      />
    </main>
  );
}

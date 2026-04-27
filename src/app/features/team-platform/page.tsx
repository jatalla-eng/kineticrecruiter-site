import { generatePageMetadata } from '@/lib/metadata';
import { softwareApplicationSchema } from '@/lib/schema';
import FeatureSection from '@/components/ui/FeatureSection';
import CTASection from '@/components/sections/CTASection';
import { ArrowRight, Users } from 'lucide-react';

export const metadata = generatePageMetadata({
  title: 'Team & Platform',
  description:
    'Multi-seat access, role-based permissions, and API integrations for growing recruitment agencies. Start your free trial today.',
  path: '/features/team-platform',
});

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kineticrecruiter.com' },
    { '@type': 'ListItem', position: 2, name: 'Features', item: 'https://kineticrecruiter.com/features/team-platform' },
    { '@type': 'ListItem', position: 3, name: 'Team & Platform' },
  ],
};

const productSchema = softwareApplicationSchema({
  name: 'KineticRecruiter — Team & Platform',
  description: 'Multi-seat access, role-based permissions, and API integrations for growing recruitment agencies.',
  url: 'https://kineticrecruiter.com/features/team-platform',
  featureList: ['Multi-seat user management', 'Role-based permissions', 'REST API access', 'SSO support', 'Audit log'],
});

export default function TeamPlatformPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, productSchema]) }}
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-kinetic-teal-light via-white to-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-kinetic-teal/10 text-kinetic-teal px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Users className="w-4 h-4" />
              Team &amp; Platform
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-kinetic-navy mb-6">
              Built to run as a product, not a prototype.
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Multi-tenant architecture, Stripe billing, role-based access, and platform administration. Commercial-grade SaaS from day one.
            </p>
            <a
              href="https://app.kineticrecruiter.com/register"
              data-cta="feature-team-platform"
              className="inline-flex items-center justify-center bg-kinetic-teal hover:bg-kinetic-teal-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
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
          headline="Four roles. One organisation. Full control."
          body={`Owner, Admin, Standard, and Readonly roles give you precise control over who can do what. Invite team members by email or share an open invite code. When someone signs up with a matching email domain, they're automatically routed to your organisation for approval.

Google and Microsoft OAuth sign-in mean one less password for your team.`}
          imageSrc="/images/team-meeting.png"
          imageAlt="Team administration panel showing role-based access control and member management"
          reverse={false}
        />
      </div>

      <div className="bg-[#F8FAFB]">
        <FeatureSection
          headline="The numbers that matter."
          body="Real-time counts across jobs, candidates, applications, and clients. Pipeline stage visualisation showing where candidates sit across all active roles. 30-day activity trends. Source breakdown reporting. Recent activity feed. All built in."
          imageSrc="/images/recruiter-success.png"
          imageAlt="Analytics dashboard showing real-time metrics for jobs, candidates, and pipeline stages"
          reverse={true}
        />
      </div>

      <div className="bg-white">
        <FeatureSection
          headline="Connect to your stack."
          body="RESTful API with key-based authentication for custom integrations. Global search via Command+K palette. Email integration supporting Brevo, Gmail, and SendGrid. Chrome extension for LinkedIn. Inbound webhook for email resume processing."
          imageSrc="/images/recruiter-1.png"
          imageAlt="API integration settings showing connected services and webhook configuration"
          reverse={false}
        />
      </div>

      <div className="bg-[#F8FAFB]">
        <FeatureSection
          headline="Multi-tenant by design."
          body="Every query is scoped to your organisation. Every action is logged. Sessions secured with 7-day TTL cookies. Resume files stored in Google Cloud Storage with signed URLs. API keys validated via hash comparison."
          imageSrc="/images/recruiter-2.png"
          imageAlt="Security architecture diagram showing isolated multi-tenant organisation data"
          reverse={true}
        />
      </div>

      <CTASection variant="minimal" />
    </main>
  );
}

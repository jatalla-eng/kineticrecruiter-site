import { generatePageMetadata } from '@/lib/metadata';
import { softwareApplicationSchema } from '@/lib/schema';
import FeatureSection from '@/components/ui/FeatureSection';
import CTASection from '@/components/sections/CTASection';
import { ArrowRight, Sparkles } from 'lucide-react';

export const metadata = generatePageMetadata({
  title: 'AI Candidate Intelligence',
  description:
    'Semantic search and AI match scoring that understands context, not just keywords. Find the right candidates in seconds. Try it free.',
  path: '/features/ai-candidate-intelligence',
});

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kineticrecruiter.com' },
    { '@type': 'ListItem', position: 2, name: 'Features', item: 'https://kineticrecruiter.com/features/ai-candidate-intelligence' },
    { '@type': 'ListItem', position: 3, name: 'AI Candidate Intelligence' },
  ],
};

const productSchema = softwareApplicationSchema({
  name: 'KineticRecruiter — AI Candidate Intelligence',
  description: 'Semantic candidate search, explainable AI match scoring (0–100), and AI-generated career highlights for recruitment agencies.',
  url: 'https://kineticrecruiter.com/features/ai-candidate-intelligence',
  featureList: ['Semantic candidate search', 'AI match scoring with explanations', 'AI career highlights', 'Natural language queries'],
});

export default function AICandidateIntelligencePage() {
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
              <Sparkles className="w-4 h-4" />
              AI Candidate Intelligence
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-kinetic-navy mb-6">
              The AI that finds, scores, and explains.
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Search your database in plain English. Get ranked results with match scores, factor breakdowns, and written reasons. Generate client-ready career summaries in one click.
            </p>
            <a
              href="https://app.kineticrecruiter.com/register"
              data-cta="feature-ai-candidate-intelligence"
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
          headline="Stop writing Boolean. Start describing what you need."
          body={`Type what you're looking for the way you'd describe it to a colleague: "Full-stack developers with React and Node experience, at least 4 years, based in Sydney or open to remote." KineticRecruiter's semantic search engine understands the meaning behind your words, not just the keywords. It returns candidates ranked by relevance, with scores that reflect how well they actually fit.

This isn't keyword matching with a fancy interface. The platform builds semantic embeddings for every candidate profile, capturing the full context of their experience, skills, and career trajectory. When you search, it compares meaning, not strings. A candidate whose resume says "frontend engineering" and "server-side JavaScript" will surface for a "full-stack developer" search, even though the exact phrase never appears.`}
          imageSrc="/images/recruiter-1.png"
          imageAlt="Recruiter using natural language search to find candidates"
          reverse={false}
        />
      </div>

      <div className="bg-[#F8FAFB]">
        <FeatureSection
          headline="A number means nothing without the reasoning behind it."
          body="Every candidate matched to a job receives a score from 0 to 100. But a score alone doesn't help you make decisions or explain them to clients. KineticRecruiter breaks down every score into contributing factors, shows how each factor was weighted, and provides a plain-English explanation of why this candidate was surfaced. When a client asks &quot;why did you put this person forward?&quot;, the answer is already written."
          bullets={[
            'Factor-by-factor breakdown (skills match, experience level, location, industry alignment)',
            'Weight visibility so you understand what drove the score',
            'Written match reasons ready for client communication',
            'Suggested candidates ranked by score for every open role',
          ]}
          imageSrc="/images/recruiter-2.png"
          imageAlt="AI match score breakdown showing candidate factors and weights"
          reverse={true}
        />
      </div>

      <div className="bg-white">
        <FeatureSection
          headline="Candidate summaries in seconds, not minutes."
          body={`Every recruiter knows the drill: open the resume, read through the entire work history, pick out the most relevant achievements, rewrite them as bullet points, paste into an email. For every single candidate. For every single submission.

KineticRecruiter generates career highlight bullet points automatically from the candidate's parsed resume. Action-driven. Context-aware. Ready to drop into a client submission email or review with a hiring manager.

No other ATS on the market generates client-ready career summaries.`}
          imageSrc="/images/team-meeting.png"
          imageAlt="Team reviewing AI-generated candidate career highlights"
          reverse={false}
        />
      </div>

      <CTASection variant="minimal" />
    </main>
  );
}

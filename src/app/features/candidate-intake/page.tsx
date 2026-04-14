import { generatePageMetadata } from '@/lib/metadata';
import FeatureSection from '@/components/ui/FeatureSection';
import CTASection from '@/components/sections/CTASection';
import { ArrowRight, Upload } from 'lucide-react';

export const metadata = generatePageMetadata({
  title: 'Multi-Channel Candidate Intake',
  description:
    'Bulk resume uploads, inbound email parsing, and LinkedIn Chrome extension. Fill your candidate pipeline automatically. Try it free.',
  path: '/features/candidate-intake',
});

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kineticrecruiter.com' },
    { '@type': 'ListItem', position: 2, name: 'Features', item: 'https://kineticrecruiter.com/features/candidate-intake' },
    { '@type': 'ListItem', position: 3, name: 'Candidate Intake' },
  ],
};

export default function CandidateIntakePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-kinetic-teal-light via-white to-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-kinetic-teal/10 text-kinetic-teal px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Upload className="w-4 h-4" />
              Multi-Channel Candidate Intake
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-kinetic-navy mb-6">
              Three ways in. Zero resumes lost.
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Upload one, drop fifty, or forward from your inbox. Every resume gets AI-parsed, deduplicated, and made searchable.
            </p>
            <a
              href="https://app.kineticrecruiter.com/register"
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
          headline="Drag, drop, done."
          body={`Upload a single resume or drop a batch of fifty. KineticRecruiter processes each file using Google Gemini AI to extract name, email, phone, location, skills, experience, education, work history, and LinkedIn URL into a structured candidate profile. PDF, DOC, and DOCX all supported.

If the AI parser is temporarily unavailable, a regex fallback parser still extracts core fields. No resume gets stuck in a queue or silently dropped. Progress tracking shows real-time status for every file in a bulk upload.`}
          imageSrc="/images/recruiter-1.png"
          imageAlt="Bulk resume upload interface showing drag and drop with progress tracking"
          reverse={false}
        />
      </div>

      <div className="bg-[#F8FAFB]">
        <FeatureSection
          headline="Forward a resume. Get a candidate."
          body={`Receive a CV from a referral? Get an application notification from a job board? Forward the email to your KineticRecruiter inbox. The system extracts the attachment, validates the file type, runs AI parsing, and creates or updates the candidate profile.

If the candidate already exists (matched by email or name), their record gets updated with any new information without creating a duplicate. If they're new, a full profile is created, their LinkedIn photo is fetched, and a semantic embedding is generated so they're immediately searchable.`}
          imageSrc="/images/recruiter-2.png"
          imageAlt="Email forwarding interface for automatic resume processing"
          reverse={true}
        />
      </div>

      <div className="bg-white">
        <FeatureSection
          headline="See a profile. Import it."
          body="The KineticRecruiter Chrome Extension sits on any LinkedIn profile page. Click import, and the candidate's name, photo, headline, work history, skills, and education are pulled into your ATS via API. One click. No PDF downloads. No manual entry."
          imageSrc="/images/video-call.png"
          imageAlt="LinkedIn Chrome extension importing a candidate profile with one click"
          reverse={false}
        />
      </div>

      <div className="bg-[#F8FAFB]">
        <FeatureSection
          headline="One candidate. One record. Always."
          body="Every intake channel checks for duplicates before creating a new record. Primary match is by email. Secondary match is by name. If a match is found, existing empty fields get updated with new data, and the resume file is replaced with the latest version."
          imageSrc="/images/recruiter-success.png"
          imageAlt="Smart deduplication merging two candidate records into one"
          reverse={true}
        />
      </div>

      <CTASection variant="minimal" />
    </main>
  );
}

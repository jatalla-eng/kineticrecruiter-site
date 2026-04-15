import { ArrowRight, Check, Upload, Mail, Linkedin, Copy, Sparkles, ArrowDownToLine } from 'lucide-react'
import Layout from './Layout'

// Three paths converging illustration
function ThreePathsIllustration() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Left icons */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-white rounded-xl shadow-lg border border-gray-200 flex items-center justify-center">
          <Upload className="w-8 h-8 text-kinetic-teal" />
        </div>
        <div className="w-16 h-16 bg-white rounded-xl shadow-lg border border-gray-200 flex items-center justify-center">
          <Mail className="w-8 h-8 text-kinetic-teal" />
        </div>
        <div className="w-16 h-16 bg-white rounded-xl shadow-lg border border-gray-200 flex items-center justify-center">
          <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
          </svg>
        </div>
      </div>
      {/* Arrow to center */}
      <div className="mx-4 flex items-center">
        <div className="w-12 h-12 bg-kinetic-teal rounded-full flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
      </div>
      {/* Right - Candidate profile card */}
      <div className="bg-white rounded-xl shadow-xl p-4 border border-kinetic-teal w-48">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-kinetic-teal/20 rounded-full flex items-center justify-center text-kinetic-teal font-bold text-lg">SL</div>
          <div>
            <div className="font-semibold">Sarah Liu</div>
            <div className="text-xs text-gray-500">Senior Developer</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <Check className="w-4 h-4 text-kinetic-teal" />
            <span className="text-gray-600">Skills parsed</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Check className="w-4 h-4 text-kinetic-teal" />
            <span className="text-gray-600">Indexed for search</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Check className="w-4 h-4 text-kinetic-teal" />
            <span className="text-gray-600">Photo fetched</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// File upload illustration
function FileUploadIllustration() {
  return (
    <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200">
      <div className="border-2 border-dashed border-kinetic-teal/40 rounded-xl p-8 text-center bg-kinetic-teal/5">
        <Upload className="w-12 h-12 text-kinetic-teal mx-auto mb-4" />
        <p className="text-gray-600 font-medium mb-2">Drop files here</p>
        <p className="text-sm text-gray-500">PDF, DOC, DOCX supported</p>
      </div>
      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">3/5 uploaded</span>
          <span className="text-sm text-kinetic-teal font-medium">60%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-kinetic-teal h-2 rounded-full" style={{ width: '60%' }}></div>
        </div>
      </div>
    </div>
  )
}

// LinkedIn import illustration
function LinkedInImportIllustration() {
  return (
    <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200">
      <div className="flex items-start gap-4">
        {/* Simulated LinkedIn card */}
        <div className="flex-1">
          <div className="bg-blue-600 text-white px-3 py-2 rounded-t-lg flex items-center gap-2 -mx-6 -mt-6 mb-4">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
            <span className="font-medium">LinkedIn</span>
          </div>
          <div className="h-24 bg-gray-100 rounded mb-3"></div>
          <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 w-48 bg-gray-100 rounded"></div>
        </div>
        {/* Import button overlay */}
        <div className="flex flex-col items-center gap-2">
          <div className="bg-kinetic-teal text-white px-4 py-2 rounded-lg font-medium text-sm shadow-lg">
            Import to KineticRecruiter
          </div>
          <ArrowDownToLine className="w-5 h-5 text-kinetic-teal" />
        </div>
      </div>
    </div>
  )
}

// Deduplication illustration
function DeduplicationIllustration() {
  return (
    <div className="flex items-center justify-center gap-8">
      {/* Left - Two document icons */}
      <div className="relative">
        <div className="w-20 h-20 bg-white rounded-xl shadow-lg border border-gray-200 flex items-center justify-center">
          <Copy className="w-8 h-8 text-gray-400" />
        </div>
        <div className="w-20 h-20 bg-white rounded-xl shadow-lg border border-gray-200 flex items-center justify-center absolute -bottom-4 -right-4">
          <Copy className="w-8 h-8 text-gray-400" />
        </div>
      </div>
      {/* Arrow */}
      <div className="flex items-center justify-center w-16 h-16 bg-kinetic-teal/20 rounded-full">
        <ArrowRight className="w-8 h-8 text-kinetic-teal" />
      </div>
      {/* Right - Merged card */}
      <div className="bg-white rounded-xl shadow-xl p-4 border-2 border-kinetic-teal">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-kinetic-teal/20 rounded-full flex items-center justify-center">
            <Check className="w-6 h-6 text-kinetic-teal" />
          </div>
          <div>
            <div className="font-semibold">Sarah Liu</div>
            <div className="text-xs text-kinetic-teal">Records merged</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FeatureIntake() {
  const sections = [
    {
      headline: 'Drag, drop, done.',
      body: `Upload a single resume or drop a batch of fifty. KineticRecruiter processes each file using Google Gemini AI to extract name, email, phone, location, skills, experience, education, work history, and LinkedIn URL into a structured candidate profile. PDF, DOC, and DOCX all supported.

If the AI parser is temporarily unavailable, a regex fallback parser still extracts core fields. No resume gets stuck in a queue or silently dropped. Progress tracking shows real-time status for every file in a bulk upload.`,
      illustration: <FileUploadIllustration />,
    },
    {
      headline: 'Forward a resume. Get a candidate.',
      body: `Receive a CV from a referral? Get an application notification from a job board? Forward the email to your KineticRecruiter inbox. The system extracts the attachment, validates the file type, runs AI parsing, and creates or updates the candidate profile.

If the candidate already exists (matched by email or name), their record gets updated with any new information without creating a duplicate. If they're new, a full profile is created, their LinkedIn photo is fetched, and a semantic embedding is generated so they're immediately searchable.`,
      illustration: (
        <div className="relative rounded-xl overflow-hidden">
          <img
            src="https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
            alt="Person looking at laptop with a smile"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent"></div>
        </div>
      ),
    },
    {
      headline: 'See a profile. Import it.',
      body: `The KineticRecruiter Chrome Extension sits on any LinkedIn profile page. Click import, and the candidate's name, photo, headline, work history, skills, and education are pulled into your ATS via API. One click. No PDF downloads. No manual entry.`,
      illustration: <LinkedInImportIllustration />,
    },
    {
      headline: 'One candidate. One record. Always.',
      body: `Every intake channel checks for duplicates before creating a new record. Primary match is by email. Secondary match is by name. If a match is found, existing empty fields get updated with new data, and the resume file is replaced with the latest version.`,
      illustration: <DeduplicationIllustration />,
    },
  ]

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-kinetic-tealLight via-white to-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-kinetic-teal/10 text-kinetic-teal px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Upload className="w-4 h-4" />
                Multi-Channel Candidate Intake
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">
                Three ways in. Zero resumes lost.
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Upload one, drop fifty, or forward from your inbox. Every resume gets AI-parsed, deduplicated, and made searchable.
              </p>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center bg-kinetic-teal hover:bg-kinetic-tealDark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg shadow-kinetic-teal/25"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
            <div>
              <ThreePathsIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* Sections with illustrations */}
      {sections.map((section, index) => (
        <section
          key={index}
          className={`py-16 md:py-24 ${index % 2 === 0 ? 'bg-white' : 'bg-lightGrey'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                  {section.headline}
                </h2>
                {section.body.split('\n\n').map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                {section.illustration}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Intake Channels */}
      <section className="py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Every intake channel covered
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Upload, title: 'File Upload', desc: 'Drag and drop resumes' },
              { icon: Mail, title: 'Email Forward', desc: 'Forward resumes to inbox' },
              { icon: Linkedin, title: 'Chrome Extension', desc: 'Import from LinkedIn' },
              { icon: Copy, title: 'Smart Deduplication', desc: 'Prevent duplicate records' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-kinetic-teal rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-kinetic-tealLight via-white to-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">
            Stop losing resumes to silos?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Start your 7-day free trial with full access to every intake channel.
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center justify-center bg-kinetic-teal hover:bg-kinetic-tealDark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg shadow-kinetic-teal/25"
          >
            Start Free Trial
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>
    </Layout>
  )
}
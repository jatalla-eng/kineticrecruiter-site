import { ArrowRight, Check, Users, Briefcase, Zap, Search, Mail, TrendingUp, DollarSign, Folder, FileText, Send } from 'lucide-react'
import Layout from './Layout'

// Workload illustration for section 1
function WorkloadIllustration() {
  return (
    <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-kinetic-teal/5 rounded-lg p-4 text-center">
          <div className="text-xs text-gray-500 mb-1">ATS</div>
          <div className="text-2xl font-bold text-navy">1</div>
        </div>
        <div className="bg-kinetic-teal/5 rounded-lg p-4 text-center">
          <div className="text-xs text-gray-500 mb-1">CRM</div>
          <div className="text-2xl font-bold text-navy">2</div>
        </div>
        <div className="bg-kinetic-teal/5 rounded-lg p-4 text-center">
          <div className="text-xs text-gray-500 mb-1">Spreadsheets</div>
          <div className="text-2xl font-bold text-navy">3+</div>
        </div>
      </div>
      <div className="text-center">
        <div className="text-kinetic-teal font-semibold mb-2">Fragmented Tools</div>
        <div className="text-gray-400 text-sm mb-4">Your current setup</div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <div className="w-16 h-16 bg-kinetic-teal rounded-xl flex items-center justify-center">
          <Folder className="w-8 h-8 text-white" />
        </div>
        <div className="text-gray-400 text-sm">+</div>
        <div className="w-16 h-16 bg-white rounded-xl shadow border border-gray-200 flex items-center justify-center">
          <Search className="w-8 h-8 text-gray-400" />
        </div>
        <div className="text-gray-400 text-sm">+</div>
        <div className="w-16 h-16 bg-white rounded-xl shadow border border-gray-200 flex items-center justify-center">
          <Mail className="w-8 h-8 text-gray-400" />
        </div>
      </div>
    </div>
  )
}

// Resume import illustration
function ResumeImportIllustration() {
  return (
    <div className="flex items-center justify-center gap-8">
      <div className="text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center mb-3 mx-auto">
          <FileText className="w-8 h-8 text-gray-400" />
        </div>
        <div className="text-sm text-gray-500">CV forwarded</div>
      </div>
      <div className="text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center mb-3 mx-auto">
          <Search className="w-8 h-8 text-gray-400" />
        </div>
        <div className="text-sm text-gray-500">Job board apply</div>
      </div>
      <div className="text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center mb-3 mx-auto">
          <Users className="w-8 h-8 text-gray-400" />
        </div>
        <div className="text-sm text-gray-500">LinkedIn import</div>
      </div>
      <div className="flex items-center">
        <div className="w-16 h-16 bg-kinetic-teal rounded-xl flex items-center justify-center shadow-lg shadow-kinetic-teal/25">
          <Send className="w-8 h-8 text-white" />
        </div>
      </div>
      <div className="text-center">
        <div className="w-20 h-20 bg-kinetic-teal/10 rounded-xl flex items-center justify-center mb-3 mx-auto border-2 border-kinetic-teal">
          <Folder className="w-8 h-8 text-kinetic-teal" />
        </div>
        <div className="text-sm text-kinetic-teal font-medium">One place</div>
      </div>
    </div>
  )
}

// Pricing comparison illustration
function PricingComparisonIllustration() {
  return (
    <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200">
      <div className="text-center mb-4">
        <div className="text-sm font-semibold text-gray-500 mb-2">Annual Pricing Comparison</div>
        <div className="text-xs text-gray-400">5-person team, Professional plans</div>
      </div>
      <div className="space-y-3">
        <div className="p-4 bg-kinetic-teal/5 rounded-lg border-2 border-kinetic-teal">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-kinetic-teal">KineticRecruiter</span>
            <span className="text-lg font-bold text-navy">$2,940/yr</span>
          </div>
          <div className="text-xs text-gray-500">Everything included, no add-ons</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-600">Bullhorn</span>
            <span className="text-lg font-bold text-gray-500">$13,000+/yr</span>
          </div>
          <div className="text-xs text-gray-400">Base + add-ons + implementation</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-600">Greenhouse</span>
            <span className="text-lg font-bold text-gray-500">$50,000+/yr</span>
          </div>
          <div className="text-xs text-gray-400">Enterprise minimum + training</div>
        </div>
      </div>
    </div>
  )
}

export default function SolutionsAgencies() {
  const sections = [
    {
      headline: 'You manage clients, not just candidates.',
      body: `Every day you're juggling client expectations, candidate pipelines across dozens of roles, and the pressure to submit quality profiles fast. Your current setup probably involves an ATS for candidates, a separate CRM for clients, a spreadsheet for tracking submissions, and your email inbox holding the rest together.

KineticRecruiter puts all of it in one system.`,
      illustration: <WorkloadIllustration />,
    },
    {
      headline: 'Clients are first-class, not an afterthought.',
      body: `Create client profiles with company details, contacts, and hiring managers. Link jobs directly to clients. Track which candidates have been submitted, interviewed, and placed for each client. When you need to submit a candidate, the AI drafts the email, generates a candidate summary, and gets it ready to send in seconds.`,
      points: [
        'Client profiles with contacts, industry, and company enrichment',
        'Every job linked to a client and hiring manager',
        'AI-generated submission emails with candidate summaries',
        'Track the full lifecycle: sourcing through to placement',
      ],
      illustration: (
        <div className="bg-white rounded-xl shadow-xl p-4 border border-gray-200">
          <div className="bg-kinetic-teal/5 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-kinetic-teal/20 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-kinetic-teal" />
              </div>
              <div>
                <div className="font-semibold">TechVentures Pty Ltd</div>
                <div className="text-xs text-gray-500">Technology • Sydney, NSW</div>
              </div>
            </div>
            <div className="text-sm text-gray-600">3 active jobs • 12 candidates</div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="text-xs font-medium text-gray-500 uppercase">Contacts</div>
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="flex-1">
                <div className="font-medium text-sm">Jane Smith</div>
                <div className="text-xs text-gray-500">Head of Engineering</div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-500 uppercase">Linked Jobs</div>
            <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-kinetic-teal">
              <div className="font-medium text-sm">Senior React Developer</div>
              <div className="text-xs text-kinetic-teal">5 candidates • 2 submitted</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      headline: 'Find the right candidate before your competitor does.',
      body: `After a year of recruiting you've got thousands of candidates in your system. Most ATS platforms let you search by keyword, maybe filter by location or skills. KineticRecruiter lets you search in plain English: "senior Java developers with banking experience in Melbourne who are open to contract work." The AI understands context and returns ranked results with match scores and reasons.`,
      points: [
        'Natural language search across your entire candidate pool',
        'AI match scoring (0-100) with factor breakdowns',
        'Career highlight generation for fast client submissions',
        'Semantic matching finds candidates keyword search would miss',
      ],
      illustration: (
        <div className="relative rounded-xl overflow-hidden">
          <img
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
            alt="Recruiter at dual monitors reviewing candidates"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent"></div>
        </div>
      ),
    },
    {
      headline: 'Resumes arrive from everywhere. They should all end up in the same place.',
      body: `A referral forwards you a CV. A candidate applies on a job board. You source 20 profiles on LinkedIn. KineticRecruiter handles all of it: single upload, bulk upload, email forwarding, and LinkedIn Chrome extension import. Every resume gets AI-parsed, checked for duplicates, and indexed for semantic search.`,
      illustration: <ResumeImportIllustration />,
    },
    {
      headline: "Add recruiters without adding line items.",
      body: `Bullhorn charges $99-315 per user per month, then adds $39+ for automation, more for LinkedIn integration, more for analytics. KineticRecruiter starts at $29 per user per month with every AI feature included. No add-ons. No implementation fees. No training costs.`,
      illustration: <PricingComparisonIllustration />,
    },
  ]

  return (
    <Layout>
      {/* Hero with photo background */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop"
            alt="Modern office with people working"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 to-navy/40"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Built for how agencies actually work.
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Most ATS platforms are designed for in-house HR teams hiring into one company. KineticRecruiter is built for agencies managing multiple clients, multiple roles, and hundreds of candidates across them all.
            </p>
            <a
              href="/pricing"
              className="inline-flex items-center justify-center bg-kinetic-teal hover:bg-kinetic-tealDark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg shadow-kinetic-teal/25"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Sections */}
      {sections.map((section, index) => (
        <section
          key={index}
          className={`py-16 md:py-24 ${index % 2 === 0 ? 'bg-white' : 'bg-lightGrey'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {index === 0 || index === 1 || index === 2 || index === 3 || index === 4 ? (
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className={index === 0 || index === 2 || index === 4 ? 'lg:order-2' : ''}>
                  <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                    {section.headline}
                  </h2>
                  {section.body.split('\n\n').map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-lg text-gray-600 mb-6 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                  {section.points && (
                    <ul className="space-y-3">
                      {section.points.map((point, pIndex) => (
                        <li key={pIndex} className="flex items-start gap-3">
                          <Check className="w-6 h-6 text-kinetic-teal flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className={index === 0 || index === 2 || index === 4 ? 'lg:order-1' : ''}>
                  {section.illustration}
                </div>
              </div>
            ) : (
              <div className="max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                  {section.headline}
                </h2>
                {section.body.split('\n\n').map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Feature Icons */}
      <section className="py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Users, title: 'Client CRM', desc: 'Manage all your clients in one place' },
              { icon: Search, title: 'Semantic Search', desc: 'Find candidates by describing what you need' },
              { icon: Mail, title: 'AI Submissions', desc: 'Generate professional submission emails instantly' },
              { icon: TrendingUp, title: 'Pipeline Analytics', desc: 'Track your business performance' },
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
            Ready to streamline your agency?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Start your 7-day free trial with full access to every feature.
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
import { ArrowRight, Check, Users, Zap, Target, TrendingUp, Clock, FileUp, DollarSign, Briefcase, Calendar } from 'lucide-react'
import Layout from './Layout'

// Small team illustration for section 1
function SmallTeamIllustration() {
  return (
    <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200">
      <div className="flex items-center justify-center gap-6 mb-6">
        <div className="relative">
          <div className="w-16 h-16 bg-kinetic-teal/20 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-kinetic-teal rounded-full flex items-center justify-center text-white font-semibold">JD</div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-kinetic-teal rounded-full flex items-center justify-center text-white text-xs">1</div>
        </div>
        <div className="text-gray-400 text-2xl">+</div>
        <div className="relative">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs">2</div>
        </div>
        <div className="text-gray-400 text-2xl">+</div>
        <div className="relative">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs">3</div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 bg-kinetic-teal/5 rounded-lg">
          <Briefcase className="w-5 h-5 text-kinetic-teal" />
          <span className="text-sm text-gray-700">12 active jobs</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-kinetic-teal/5 rounded-lg">
          <Users className="w-5 h-5 text-kinetic-teal" />
          <span className="text-sm text-gray-700">247 candidates</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-kinetic-teal/5 rounded-lg">
          <Calendar className="w-5 h-5 text-kinetic-teal" />
          <span className="text-sm text-gray-700">8 interviews this week</span>
        </div>
      </div>
    </div>
  )
}

// Quick setup illustration for section 3
function QuickSetupIllustration() {
  return (
    <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-kinetic-teal rounded-full flex items-center justify-center text-white font-semibold">1</div>
          <div className="flex-1">
            <div className="font-medium text-sm">Sign up</div>
            <div className="text-xs text-gray-500">Create your account in 2 minutes</div>
          </div>
          <Check className="w-5 h-5 text-kinetic-teal" />
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-kinetic-teal rounded-full flex items-center justify-center text-white font-semibold">2</div>
          <div className="flex-1">
            <div className="font-medium text-sm">Add jobs</div>
            <div className="text-xs text-gray-500">Create your first job posting</div>
          </div>
          <Check className="w-5 h-5 text-kinetic-teal" />
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-kinetic-teal rounded-full flex items-center justify-center text-white font-semibold">3</div>
          <div className="flex-1">
            <div className="font-medium text-sm">Upload resumes</div>
            <div className="text-xs text-gray-500">Bulk import or add one by one</div>
          </div>
          <Check className="w-5 h-5 text-kinetic-teal" />
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-kinetic-teal rounded-full flex items-center justify-center text-white font-semibold">4</div>
          <div className="flex-1">
            <div className="font-medium text-sm">Start recruiting</div>
            <div className="text-xs text-gray-500">AI finds matches automatically</div>
          </div>
          <TrendingUp className="w-5 h-5 text-kinetic-teal" />
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100 text-center">
        <div className="text-kinetic-teal font-semibold">Productive on Day One</div>
      </div>
    </div>
  )
}

// Search results illustration (reused from FeatureAI)
function SearchResultsIllustration() {
  return (
    <div className="bg-white rounded-xl shadow-xl p-4 border border-gray-200">
      <div className="bg-gray-100 rounded-lg px-4 py-3 mb-4 flex items-center gap-2">
        <Zap className="w-4 h-4 text-kinetic-teal" />
        <span className="text-sm text-gray-700">Senior React developers in Sydney</span>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-kinetic-teal/20 rounded-full flex items-center justify-center text-kinetic-teal font-semibold">JM</div>
          <div className="flex-1">
            <div className="font-medium text-sm">James Mitchell</div>
            <div className="text-xs text-gray-500">Senior Developer at Westpac</div>
          </div>
          <div className="bg-kinetic-teal text-white text-xs font-bold px-2 py-1 rounded">94</div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-kinetic-teal/20 rounded-full flex items-center justify-center text-kinetic-teal font-semibold">SL</div>
          <div className="flex-1">
            <div className="font-medium text-sm">Sarah Liu</div>
            <div className="text-xs text-gray-500">Full Stack at Stripe</div>
          </div>
          <div className="bg-kinetic-teal text-white text-xs font-bold px-2 py-1 rounded">87</div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-kinetic-teal/20 rounded-full flex items-center justify-center text-kinetic-teal font-semibold">RK</div>
          <div className="flex-1">
            <div className="font-medium text-sm">Raj Kumar</div>
            <div className="text-xs text-gray-500">Backend at ANZ Bank</div>
          </div>
          <div className="bg-kinetic-teal text-white text-xs font-bold px-2 py-1 rounded">78</div>
        </div>
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
        <div className="text-xs text-gray-400">3-person team, Professional plans</div>
      </div>
      <div className="space-y-3">
        <div className="p-4 bg-kinetic-teal/5 rounded-lg border-2 border-kinetic-teal">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-kinetic-teal">KineticRecruiter</span>
            <span className="text-lg font-bold text-navy">$2,124/yr</span>
          </div>
          <div className="text-xs text-gray-500">$59/user/month, everything included</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-600">Greenhouse</span>
            <span className="text-lg font-bold text-gray-500">$50,000+/yr</span>
          </div>
          <div className="text-xs text-gray-400">Enterprise minimum + implementation</div>
        </div>
      </div>
    </div>
  )
}

export default function SolutionsInHouse() {
  const sections = [
    {
      headline: "You're a team of two doing the work of ten.",
      body: `Small in-house talent teams are expected to fill every open role, build a candidate pipeline, coordinate with hiring managers, and keep track of it all. You don't have the budget for Greenhouse or the headcount to justify Workable. But you still need an ATS that actually helps you recruit, not just store applications.`,
      illustration: <SmallTeamIllustration />,
    },
    {
      headline: "AI matching that works while you're in meetings.",
      body: `When a new role opens, KineticRecruiter scans your existing candidate database and surfaces candidates who match. Not just by keywords but by understanding the role requirements and the candidate's actual experience. Each match comes with a score, a factor breakdown, and a plain-English explanation you can share with the hiring manager. You spend 5 minutes reviewing AI suggestions instead of 2 hours manually searching.`,
      points: [
        'AI-suggested candidates for every new role',
        'Match scores with full transparency and written reasons',
        'Career highlights auto-generated for hiring manager review',
        'Natural language search when you want to dig deeper',
      ],
      illustration: <SearchResultsIllustration />,
    },
    {
      headline: 'Keep hiring managers in the loop without extra meetings.',
      body: `Every role has a visual shortlist board showing exactly where each candidate sits: sourcing, screening, interview, offer, hired. Hiring managers can see progress without asking for an update. Star ratings and suitability scores make it easy to compare candidates at a glance.`,
      illustration: (
        <div className="relative rounded-xl overflow-hidden">
          <img
            src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
            alt="Two people reviewing candidates on screen together"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent"></div>
        </div>
      ),
    },
    {
      headline: 'No implementation project. No training budget.',
      body: `Sign up, create your first job, and start adding candidates. KineticRecruiter is designed to be useful on day one, not after a 6-week implementation. Upload your existing resumes in bulk, let the AI parse them, and you've got a searchable database by the end of the afternoon.`,
      points: [
        '7-day free trial with full access',
        'Bulk resume upload with AI parsing',
        'No implementation fee, no training cost',
        'Dashboard and analytics from day one',
      ],
      illustration: <QuickSetupIllustration />,
    },
    {
      headline: 'Enterprise AI at startup pricing.',
      body: `Greenhouse starts at $50,000 per year before implementation and training. KineticRecruiter's Professional plan is $59 per user per month with every AI feature included. For a 3-person talent team, that's $2,124 per year versus $50,000+.`,
      illustration: <PricingComparisonIllustration />,
    },
  ]

  return (
    <Layout>
      {/* Hero with photo background */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0">
          <img
            src="https://images.presentationgo.com/2025/04/team-collaboration-modern-office.jpg"
            alt="Modern office with diverse team collaborating"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 to-navy/40"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Hire smarter without hiring more recruiters.
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              KineticRecruiter gives small talent teams the AI-powered matching and candidate intelligence that enterprise platforms charge six figures for.
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
              { icon: Zap, title: 'AI Matching', desc: 'Find best-fit candidates automatically' },
              { icon: Target, title: 'Transparent Scoring', desc: 'Understand why candidates match' },
              { icon: FileUp, title: 'Bulk Upload', desc: 'Import existing resumes instantly' },
              { icon: Clock, title: 'Quick Setup', desc: 'Be productive on day one' },
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
            Ready to work smarter?
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
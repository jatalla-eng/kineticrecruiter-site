import { ArrowRight, Check, Search, Target, FileText, Sparkles } from 'lucide-react'
import Layout from './Layout'

// Cascading cards illustration component
function CascadingCardsIllustration() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Card 1 - Search */}
      <div className="bg-white rounded-xl shadow-xl p-4 border border-gray-200 transform -rotate-3 translate-x-4">
        <div className="flex items-center gap-2 mb-3">
          <Search className="w-4 h-4 text-kinetic-teal" />
          <span className="text-xs text-gray-500">Search</span>
        </div>
        <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-700">
          Senior React developers in Sydney
        </div>
      </div>
      {/* Card 2 - Score Breakdown */}
      <div className="bg-white rounded-xl shadow-xl p-4 border border-gray-200 absolute top-8 -left-4 transform rotate-2 translate-x-2 z-10">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-kinetic-teal" />
          <span className="text-xs text-gray-500">Match Score</span>
        </div>
        <div className="text-2xl font-bold text-kinetic-teal mb-2">94%</div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs"><span className="text-gray-600">Skills</span><span className="font-medium text-kinetic-teal">96%</span></div>
          <div className="flex justify-between text-xs"><span className="text-gray-600">Experience</span><span className="font-medium text-kinetic-teal">92%</span></div>
        </div>
      </div>
      {/* Card 3 - Career Highlights */}
      <div className="bg-white rounded-xl shadow-xl p-4 border border-gray-200 absolute top-20 left-8 z-20">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4 text-kinetic-teal" />
          <span className="text-xs text-gray-500">Career Highlights</span>
        </div>
        <div className="space-y-2">
          <div className="w-full bg-gray-100 rounded h-3"></div>
          <div className="w-3/4 bg-gray-100 rounded h-3"></div>
          <div className="w-1/2 bg-kinetic-teal/20 rounded h-3"></div>
        </div>
      </div>
    </div>
  )
}

// Search results illustration
function SearchResultsIllustration() {
  return (
    <div className="bg-white rounded-xl shadow-xl p-4 border border-gray-200">
      <div className="bg-gray-100 rounded-lg px-4 py-3 mb-4 flex items-center gap-2">
        <Search className="w-4 h-4 text-kinetic-teal" />
        <span className="text-sm text-gray-700">Java developers with fintech experience</span>
      </div>
      <div className="space-y-3">
        {/* Candidate 1 */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-kinetic-teal/20 rounded-full flex items-center justify-center text-kinetic-teal font-semibold">JM</div>
          <div className="flex-1">
            <div className="font-medium text-sm">James Mitchell</div>
            <div className="text-xs text-gray-500">Senior Developer at Westpac</div>
          </div>
          <div className="bg-kinetic-teal text-white text-xs font-bold px-2 py-1 rounded">94</div>
        </div>
        {/* Candidate 2 */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-kinetic-teal/20 rounded-full flex items-center justify-center text-kinetic-teal font-semibold">SL</div>
          <div className="flex-1">
            <div className="font-medium text-sm">Sarah Liu</div>
            <div className="text-xs text-gray-500">Full Stack at Stripe</div>
          </div>
          <div className="bg-kinetic-teal text-white text-xs font-bold px-2 py-1 rounded">87</div>
        </div>
        {/* Candidate 3 */}
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

// Resume to highlights illustration
function ResumeHighlightsIllustration() {
  return (
    <div className="flex items-center gap-4">
      {/* Left - Raw resume */}
      <div className="flex-1 bg-white rounded-xl shadow-xl p-4 border border-gray-200">
        <div className="h-3 w-24 bg-gray-200 rounded mb-3"></div>
        <div className="space-y-2">
          <div className="h-2 w-full bg-gray-100 rounded"></div>
          <div className="h-2 w-5/6 bg-gray-100 rounded"></div>
          <div className="h-2 w-4/6 bg-gray-100 rounded"></div>
          <div className="h-2 w-full bg-gray-100 rounded"></div>
          <div className="h-2 w-3/4 bg-gray-100 rounded"></div>
          <div className="h-2 w-full bg-gray-100 rounded"></div>
          <div className="h-2 w-2/3 bg-gray-100 rounded"></div>
        </div>
      </div>
      {/* Center - Arrow with AI */}
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 bg-kinetic-teal rounded-full flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
      </div>
      {/* Right - Clean bullet points */}
      <div className="flex-1 bg-kinetic-teal/5 rounded-xl p-4 border border-kinetic-teal/30">
        <div className="flex items-center gap-2 mb-3">
          <Check className="w-4 h-4 text-kinetic-teal" />
          <span className="text-xs font-medium text-kinetic-teal">Career Highlights</span>
        </div>
        <div className="space-y-2">
          <div className="h-2 w-full bg-kinetic-teal/30 rounded"></div>
          <div className="h-2 w-3/4 bg-kinetic-teal/30 rounded"></div>
          <div className="h-2 w-4/5 bg-kinetic-teal/30 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export default function FeatureAI() {
  const sections = [
    {
      headline: 'Stop writing Boolean. Start describing what you need.',
      body: `Type what you're looking for the way you'd describe it to a colleague: "Full-stack developers with React and Node experience, at least 4 years, based in Sydney or open to remote." KineticRecruiter's semantic search engine understands the meaning behind your words, not just the keywords. It returns candidates ranked by relevance, with scores that reflect how well they actually fit.

This isn't keyword matching with a fancy interface. The platform builds semantic embeddings for every candidate profile, capturing the full context of their experience, skills, and career trajectory. When you search, it compares meaning, not strings. A candidate whose resume says "frontend engineering" and "server-side JavaScript" will surface for a "full-stack developer" search, even though the exact phrase never appears.`,
      illustration: <SearchResultsIllustration />,
    },
    {
      headline: 'A number means nothing without the reasoning behind it.',
      body: `Every candidate matched to a job receives a score from 0 to 100. But a score alone doesn't help you make decisions or explain them to clients. KineticRecruiter breaks down every score into contributing factors, shows how each factor was weighted, and provides a plain-English explanation of why this candidate was surfaced.

When a client asks "why did you put this person forward?", the answer is already written.`,
      points: [
        'Factor-by-factor breakdown (skills match, experience level, location, industry alignment)',
        'Weight visibility so you understand what drove the score',
        'Written match reasons ready for client communication',
        'Suggested candidates ranked by score for every open role',
      ],
      illustration: (
        <div className="relative rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop"
            alt="Recruiter reviewing candidate matches on screen"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent"></div>
        </div>
      ),
    },
    {
      headline: 'Candidate summaries in seconds, not minutes.',
      body: `Every recruiter knows the drill: open the resume, read through the entire work history, pick out the most relevant achievements, rewrite them as bullet points, paste into an email. For every single candidate. For every single submission.

KineticRecruiter generates career highlight bullet points automatically from the candidate's parsed resume. Action-driven. Context-aware. Ready to drop into a client submission email or review with a hiring manager.

No other ATS on the market generates client-ready career summaries.`,
      illustration: <ResumeHighlightsIllustration />,
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
                <Sparkles className="w-4 h-4" />
                AI Candidate Intelligence
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">
                The AI that finds, scores, and explains.
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Search your database in plain English. Get ranked results with match scores, factor breakdowns, and written reasons. Generate client-ready career summaries in one click.
              </p>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center bg-kinetic-teal hover:bg-kinetic-tealDark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg shadow-kinetic-teal/25"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
            <div className="relative overflow-visible">
              <CascadingCardsIllustration />
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
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                {section.illustration}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Feature Icons */}
      <section className="py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Search, title: 'Natural Language Search', desc: 'Describe what you need in plain English' },
              { icon: Target, title: 'Explainable Scoring', desc: 'Understand why candidates match' },
              { icon: FileText, title: 'AI Career Highlights', desc: 'Generate summaries instantly' },
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
            Ready to experience AI-powered recruiting?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Start your 7-day free trial with full access to every AI feature.
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
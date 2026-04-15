import { Play, ArrowRight, CheckCircle2, Zap, Target } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-kinetic-tealLight via-white to-white py-16 md:py-24 lg:py-32">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-kinetic-tealLight/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-kinetic-teal/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column - Text Content */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="inline-flex items-center gap-2 bg-kinetic-teal/10 text-kinetic-teal px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-kinetic-teal rounded-full animate-pulse" />
                Built for recruitment agencies
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight text-navy">
                The ATS that actually understands your candidates.
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              KineticRecruiter uses AI to match, score, and surface the right candidates for every role.
              No add-ons. No per-feature charges. Just a faster path from resume to placement.
            </p>

            {/* Trust indicators - only legitimate claims */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-5 h-5 text-kinetic-teal" />
                7-day free trial
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Zap className="w-5 h-5 text-kinetic-teal" />
                All AI features included
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Target className="w-5 h-5 text-kinetic-teal" />
                No add-on fees
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/pricing"
                className="inline-flex items-center justify-center bg-kinetic-teal hover:bg-kinetic-tealDark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg shadow-kinetic-teal/25 group"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#demo"
                className="inline-flex items-center justify-center text-kinetic-teal hover:text-kinetic-tealDark font-semibold text-lg group"
              >
                <span className="mr-2 w-10 h-10 rounded-full border-2 border-kinetic-teal flex items-center justify-center group-hover:bg-kinetic-teal group-hover:text-white transition-colors">
                  <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                </span>
                Watch 2-min Demo
              </a>
            </div>
          </div>

          {/* Right Column - Browser Mockup Illustration */}
          <div className="lg:col-span-7 relative">
            {/* Browser Frame */}
            <div className="relative">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
                {/* Browser Top Bar */}
                <div className="bg-gray-100 px-4 py-3 flex items-center gap-3 border-b border-gray-200">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 bg-white rounded-md px-3 py-1.5 text-xs text-gray-500 border border-gray-200">
                    app.kineticrecruiter.com
                  </div>
                </div>

                {/* App Content */}
                <div className="flex h-[420px]">
                  {/* Sidebar */}
                  <div className="w-16 bg-navy flex flex-col items-center py-4 gap-4">
                    {/* Logo */}
                    <div className="w-8 h-8 bg-kinetic-teal rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">K</span>
                    </div>
                    {/* Nav Items */}
                    <div className="flex flex-col gap-3 mt-4">
                      {['Dashboard', 'Jobs', 'Shortlist', 'Candidates', 'Clients', 'Settings'].map((item, i) => (
                        <div
                          key={item}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            i === 2 ? 'bg-kinetic-teal/20 border-l-2 border-kinetic-teal' : 'hover:bg-white/10'
                          }`}
                        >
                          <div className={`w-6 h-1.5 rounded-full ${i === 2 ? 'bg-white' : 'bg-white/40'}`} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Main Content - Kanban Board */}
                  <div className="flex-1 bg-gray-50 p-4 overflow-hidden">
                    {/* Kanban Columns */}
                    <div className="grid grid-cols-4 gap-3 h-full">
                      {/* Column 1: Sourcing */}
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-navy text-sm">Sourcing</h4>
                          <span className="text-xs text-gray-400">(3)</span>
                        </div>
                        <div className="space-y-2">
                          {/* Candidate Card */}
                          <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-kinetic-teal flex items-center justify-center text-white text-xs font-bold">JD</div>
                            <div className="flex-1 min-w-0">
                              <div className="h-2 bg-gray-300 rounded w-12 mb-1" />
                              <div className="h-1.5 bg-gray-200 rounded w-16" />
                            </div>
                            <span className="bg-kinetic-teal text-white text-xs font-bold px-1.5 py-0.5 rounded">94</span>
                          </div>
                          <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-amber flex items-center justify-center text-white text-xs font-bold">SM</div>
                            <div className="flex-1 min-w-0">
                              <div className="h-2 bg-gray-300 rounded w-10 mb-1" />
                              <div className="h-1.5 bg-gray-200 rounded w-14" />
                            </div>
                            <span className="bg-kinetic-teal text-white text-xs font-bold px-1.5 py-0.5 rounded">87</span>
                          </div>
                        </div>
                      </div>

                      {/* Column 2: Screened */}
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-navy text-sm">Screened</h4>
                          <span className="text-xs text-gray-400">(2)</span>
                        </div>
                        <div className="space-y-2">
                          {/* Candidate Card - Dragging */}
                          <div className="bg-white rounded-lg p-2 shadow-lg border border-kinetic-teal/30 flex items-center gap-2 rotate-2" style={{ boxShadow: '0 8px 16px rgba(0,0,0,0.15)' }}>
                            <div className="w-8 h-8 rounded-full bg-violet flex items-center justify-center text-white text-xs font-bold">LC</div>
                            <div className="flex-1 min-w-0">
                              <div className="h-2 bg-gray-300 rounded w-10 mb-1" />
                              <div className="h-1.5 bg-gray-200 rounded w-12" />
                            </div>
                            <span className="bg-kinetic-teal text-white text-xs font-bold px-1.5 py-0.5 rounded">82</span>
                          </div>
                          <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-kinetic-teal flex items-center justify-center text-white text-xs font-bold">AK</div>
                            <div className="flex-1 min-w-0">
                              <div className="h-2 bg-gray-300 rounded w-8 mb-1" />
                              <div className="h-1.5 bg-gray-200 rounded w-14" />
                            </div>
                            <span className="bg-kinetic-teal text-white text-xs font-bold px-1.5 py-0.5 rounded">78</span>
                          </div>
                        </div>
                      </div>

                      {/* Column 3: Submitted */}
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-navy text-sm">Submitted</h4>
                          <span className="text-xs text-gray-400">(1)</span>
                        </div>
                        {/* Drop Target */}
                        <div className="border-2 border-dashed border-kinetic-teal rounded-lg h-[130px] flex items-center justify-center">
                          <span className="text-xs text-kinetic-teal/60">Drop here</span>
                        </div>
                      </div>

                      {/* Column 4: Interview */}
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-navy text-sm">Interview</h4>
                          <span className="text-xs text-gray-400">(2)</span>
                        </div>
                        <div className="space-y-2">
                          <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-amber flex items-center justify-center text-white text-xs font-bold">TW</div>
                            <div className="flex-1 min-w-0">
                              <div className="h-2 bg-gray-300 rounded w-10 mb-1" />
                              <div className="h-1.5 bg-gray-200 rounded w-14" />
                            </div>
                            <span className="bg-kinetic-teal text-white text-xs font-bold px-1.5 py-0.5 rounded">91</span>
                          </div>
                          <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-violet flex items-center justify-center text-white text-xs font-bold">MR</div>
                            <div className="flex-1 min-w-0">
                              <div className="h-2 bg-gray-300 rounded w-9 mb-1" />
                              <div className="h-1.5 bg-gray-200 rounded w-12" />
                            </div>
                            <span className="bg-kinetic-teal text-white text-xs font-bold px-1.5 py-0.5 rounded">85</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Detail Card */}
              <div className="absolute -bottom-8 -right-8 bg-white rounded-xl shadow-xl p-4 w-52 border-t-2 border-kinetic-teal" style={{ boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-kinetic-teal flex items-center justify-center text-white font-bold">SM</div>
                  <div>
                    <p className="font-bold text-navy text-sm">Sarah M.</p>
                    <p className="text-xs text-gray-500">Senior Backend Developer</p>
                  </div>
                </div>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-2xl font-bold text-kinetic-teal">87</span>
                  <span className="text-sm text-gray-400">/100</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-16">Skills</span>
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-kinetic-teal rounded-full" style={{ width: '92%' }} />
                    </div>
                    <span className="text-xs text-kinetic-teal font-medium">92%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-16">Experience</span>
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-kinetic-teal rounded-full" style={{ width: '85%' }} />
                    </div>
                    <span className="text-xs text-kinetic-teal font-medium">85%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-16">Location</span>
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-kinetic-teal rounded-full" style={{ width: '80%' }} />
                    </div>
                    <span className="text-xs text-kinetic-teal font-medium">80%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-16">Industry</span>
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-kinetic-teal rounded-full" style={{ width: '76%' }} />
                    </div>
                    <span className="text-xs text-kinetic-teal font-medium">76%</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="h-1.5 bg-gray-200 rounded w-full mb-1" />
                  <div className="h-1.5 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

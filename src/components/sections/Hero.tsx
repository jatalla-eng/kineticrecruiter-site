import { ArrowRight, CheckCircle2, Zap, Target } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#E8F5F5] via-white to-white py-16 md:py-24 lg:py-32">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E8F5F5]/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0d8488]/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column - Text Content */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="inline-flex items-center gap-2 bg-[#0d8488]/10 text-[#0d8488] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-[#0d8488] rounded-full animate-pulse" />
                Built for recruitment agencies
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight text-[#1a2332]">
                The ATS that actually understands your candidates.
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              KineticRecruiter uses AI to match, score, and surface the right candidates for every role.
              No add-ons. No per-feature charges. Just a faster path from resume to placement.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-5 h-5 text-[#0d8488]" />
                7-day free trial
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Zap className="w-5 h-5 text-[#0d8488]" />
                All AI features included
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Target className="w-5 h-5 text-[#0d8488]" />
                No add-on fees
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://app.kineticrecruiter.com/register"
                className="inline-flex items-center justify-center bg-[#0d8488] hover:bg-[#0b7276] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg group"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center border-2 border-[#0d8488] text-[#0d8488] hover:bg-[#0d8488] hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                See Pricing
              </a>
            </div>
          </div>

          {/* Right Column - Browser Mockup Illustration */}
          <div className="lg:col-span-7 relative">
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
                  <div className="w-16 bg-[#1a2332] flex flex-col items-center py-4 gap-4">
                    <div className="w-8 h-8 bg-[#0d8488] rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">K</span>
                    </div>
                    <div className="flex flex-col gap-3 mt-4">
                      {['Dashboard', 'Jobs', 'Shortlist', 'Candidates', 'Clients', 'Settings'].map((item, i) => (
                        <div
                          key={item}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            i === 2 ? 'bg-[#0d8488]/20 border-l-2 border-[#0d8488]' : 'hover:bg-white/10'
                          }`}
                        >
                          <div className={`w-6 h-1.5 rounded-full ${i === 2 ? 'bg-white' : 'bg-white/40'}`} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Main Content - Kanban Board */}
                  <div className="flex-1 bg-gray-50 p-4 overflow-hidden">
                    <div className="grid grid-cols-4 gap-3 h-full">
                      {/* Column 1: Sourcing */}
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-[#1a2332] text-sm">Sourcing</h4>
                          <span className="text-xs text-gray-400">(3)</span>
                        </div>
                        <div className="space-y-2">
                          <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#0d8488] flex items-center justify-center text-white text-xs font-bold">JD</div>
                            <div className="flex-1 min-w-0">
                              <div className="h-2 bg-gray-300 rounded w-12 mb-1" />
                              <div className="h-1.5 bg-gray-200 rounded w-16" />
                            </div>
                            <span className="bg-[#0d8488] text-white text-xs font-bold px-1.5 py-0.5 rounded">94</span>
                          </div>
                          <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#E8A838] flex items-center justify-center text-white text-xs font-bold">SM</div>
                            <div className="flex-1 min-w-0">
                              <div className="h-2 bg-gray-300 rounded w-10 mb-1" />
                              <div className="h-1.5 bg-gray-200 rounded w-14" />
                            </div>
                            <span className="bg-[#0d8488] text-white text-xs font-bold px-1.5 py-0.5 rounded">87</span>
                          </div>
                        </div>
                      </div>

                      {/* Column 2: Screened */}
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-[#1a2332] text-sm">Screened</h4>
                          <span className="text-xs text-gray-400">(2)</span>
                        </div>
                        <div className="space-y-2">
                          <div className="bg-white rounded-lg p-2 shadow-lg border border-[#0d8488]/30 flex items-center gap-2 rotate-2">
                            <div className="w-8 h-8 rounded-full bg-[#9B8EC4] flex items-center justify-center text-white text-xs font-bold">LC</div>
                            <div className="flex-1 min-w-0">
                              <div className="h-2 bg-gray-300 rounded w-10 mb-1" />
                              <div className="h-1.5 bg-gray-200 rounded w-12" />
                            </div>
                            <span className="bg-[#0d8488] text-white text-xs font-bold px-1.5 py-0.5 rounded">82</span>
                          </div>
                          <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#0d8488] flex items-center justify-center text-white text-xs font-bold">AK</div>
                            <div className="flex-1 min-w-0">
                              <div className="h-2 bg-gray-300 rounded w-8 mb-1" />
                              <div className="h-1.5 bg-gray-200 rounded w-14" />
                            </div>
                            <span className="bg-[#0d8488] text-white text-xs font-bold px-1.5 py-0.5 rounded">78</span>
                          </div>
                        </div>
                      </div>

                      {/* Column 3: Submitted */}
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-[#1a2332] text-sm">Submitted</h4>
                          <span className="text-xs text-gray-400">(1)</span>
                        </div>
                        <div className="border-2 border-dashed border-[#0d8488] rounded-lg h-[130px] flex items-center justify-center">
                          <span className="text-xs text-[#0d8488]/60">Drop here</span>
                        </div>
                      </div>

                      {/* Column 4: Interview */}
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-[#1a2332] text-sm">Interview</h4>
                          <span className="text-xs text-gray-400">(2)</span>
                        </div>
                        <div className="space-y-2">
                          <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#E8A838] flex items-center justify-center text-white text-xs font-bold">TW</div>
                            <div className="flex-1 min-w-0">
                              <div className="h-2 bg-gray-300 rounded w-10 mb-1" />
                              <div className="h-1.5 bg-gray-200 rounded w-14" />
                            </div>
                            <span className="bg-[#0d8488] text-white text-xs font-bold px-1.5 py-0.5 rounded">91</span>
                          </div>
                          <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#9B8EC4] flex items-center justify-center text-white text-xs font-bold">MR</div>
                            <div className="flex-1 min-w-0">
                              <div className="h-2 bg-gray-300 rounded w-9 mb-1" />
                              <div className="h-1.5 bg-gray-200 rounded w-12" />
                            </div>
                            <span className="bg-[#0d8488] text-white text-xs font-bold px-1.5 py-0.5 rounded">85</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Detail Card */}
              <div className="absolute -bottom-8 -right-8 bg-white rounded-xl shadow-xl p-4 w-52 border-t-2 border-[#0d8488]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#0d8488] flex items-center justify-center text-white font-bold">SM</div>
                  <div>
                    <p className="font-bold text-[#1a2332] text-sm">Sarah M.</p>
                    <p className="text-xs text-gray-500">Senior Backend Developer</p>
                  </div>
                </div>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-2xl font-bold text-[#0d8488]">87</span>
                  <span className="text-sm text-gray-400">/100</span>
                </div>
                <div className="space-y-2">
                  {[
                    { label: 'Skills', pct: '92%' },
                    { label: 'Experience', pct: '85%' },
                    { label: 'Location', pct: '80%' },
                    { label: 'Industry', pct: '76%' },
                  ].map(({ label, pct }) => (
                    <div key={label} className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-16">{label}</span>
                      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-[#0d8488] rounded-full" style={{ width: pct }} />
                      </div>
                      <span className="text-xs text-[#0d8488] font-medium">{pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

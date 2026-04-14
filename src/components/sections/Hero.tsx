'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Zap, Target } from 'lucide-react';

function AnimatedStat({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame: number;
    let start: number;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / 1500, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    const timeout = setTimeout(() => { frame = requestAnimationFrame(animate); }, 800);
    return () => { cancelAnimationFrame(frame); clearTimeout(timeout); };
  }, [target]);

  return (
    <div className="text-center">
      <p className="text-2xl md:text-3xl font-bold text-kinetic-teal">{count}{suffix}</p>
      <p className="text-xs md:text-sm text-gray-400 mt-1">{label}</p>
    </div>
  );
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-kinetic-navy via-kinetic-navy to-kinetic-navy-light min-h-[90vh] flex items-center">
      {/* Ambient glow */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-kinetic-teal rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-flow-cyan rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-kinetic-teal/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-16 md:py-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left: Copy */}
          <div className={`lg:col-span-5 space-y-8 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div>
              <span className="inline-flex items-center gap-2 bg-kinetic-teal/20 text-kinetic-teal px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-kinetic-teal/30">
                <span className="w-2 h-2 bg-kinetic-teal rounded-full animate-pulse" />
                Built for recruitment agencies
              </span>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight text-white">
                Find the right candidate.{' '}
                <span className="text-kinetic-teal">Every time.</span>
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              KineticRecruiter uses AI to match, score, and surface the right candidates for every role.
              No add-ons. No per-feature charges. Just a faster path from resume to placement.
            </p>

            <div className="flex flex-wrap gap-4">
              {[
                { icon: CheckCircle2, text: '7-day free trial' },
                { icon: Zap, text: 'All AI features included' },
                { icon: Target, text: 'No add-on fees' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-gray-400">
                  <Icon className="w-5 h-5 text-kinetic-teal" />
                  {text}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://app.kineticrecruiter.com/register"
                className="inline-flex items-center justify-center bg-kinetic-teal hover:bg-kinetic-teal-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg shadow-kinetic-teal/25 group hover:shadow-kinetic-teal/40"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Book a Demo
              </a>
            </div>
          </div>

          {/* Right: Browser mockup */}
          <div className={`lg:col-span-7 relative transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="relative">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-white/10">
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
                <div className="flex h-[300px] md:h-[420px]">
                  <div className="w-14 md:w-16 bg-kinetic-navy flex flex-col items-center py-4 gap-4 flex-shrink-0">
                    <div className="w-8 h-8 bg-kinetic-teal rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">K</span>
                    </div>
                    <div className="flex flex-col gap-3 mt-4">
                      {[0,1,2,3,4,5].map(i => (
                        <div key={i} className={`w-10 h-10 rounded-lg flex items-center justify-center ${i === 2 ? 'bg-kinetic-teal/20 border-l-2 border-kinetic-teal' : ''}`}>
                          <div className={`w-6 h-1.5 rounded-full ${i === 2 ? 'bg-white' : 'bg-white/40'}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 bg-gray-50 p-3 md:p-4 overflow-hidden">
                    <div className="grid grid-cols-4 gap-2 md:gap-3 h-full">
                      {[
                        { title: 'Sourcing', cards: [{ c: 'bg-kinetic-teal', s: 94 }, { c: 'bg-motion-amber', s: 87 }] },
                        { title: 'Screened', cards: [{ c: 'bg-momentum-violet', s: 82 }, { c: 'bg-kinetic-teal', s: 78 }] },
                        { title: 'Submitted', cards: [] },
                        { title: 'Interview', cards: [{ c: 'bg-motion-amber', s: 91 }, { c: 'bg-momentum-violet', s: 85 }] },
                      ].map(col => (
                        <div key={col.title} className="bg-white rounded-lg p-2 md:p-3 shadow-sm">
                          <p className="font-bold text-kinetic-navy text-[10px] md:text-xs mb-2">{col.title}</p>
                          <div className="space-y-1.5">
                            {col.cards.map((card, j) => (
                              <div key={j} className="bg-white rounded p-1.5 shadow-sm border border-gray-100 flex items-center gap-1.5">
                                <div className={`w-6 h-6 md:w-7 md:h-7 rounded-full ${card.c} flex items-center justify-center text-white text-[8px] md:text-[10px] font-bold`}>
                                  {['JD','SM','LC','AK','TW','MR'][j + (col.title === 'Interview' ? 4 : col.title === 'Screened' ? 2 : 0)]}
                                </div>
                                <div className="flex-1"><div className="h-1.5 bg-gray-200 rounded w-8 md:w-10" /></div>
                                <span className="bg-kinetic-teal text-white text-[8px] md:text-[10px] font-bold px-1 py-0.5 rounded">{card.s}</span>
                              </div>
                            ))}
                            {col.cards.length === 0 && (
                              <div className="border-2 border-dashed border-kinetic-teal/30 rounded-lg h-16 md:h-24 flex items-center justify-center">
                                <span className="text-[8px] md:text-[10px] text-kinetic-teal/40">Drop here</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating card */}
              <div className={`absolute -bottom-6 -right-2 md:-bottom-8 md:-right-8 bg-white rounded-xl shadow-xl p-3 md:p-4 w-40 md:w-52 border-t-2 border-kinetic-teal transition-all duration-700 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-kinetic-teal flex items-center justify-center text-white font-bold text-xs">SM</div>
                  <div>
                    <p className="font-bold text-kinetic-navy text-xs">Sarah M.</p>
                    <p className="text-[9px] md:text-xs text-gray-500">Sr. Backend Dev</p>
                  </div>
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-xl md:text-2xl font-bold text-kinetic-teal">87</span>
                  <span className="text-xs text-gray-400">/100</span>
                </div>
                <div className="space-y-1.5">
                  {[{ l: 'Skills', p: '92%' }, { l: 'Experience', p: '85%' }, { l: 'Location', p: '80%' }].map(({ l, p }) => (
                    <div key={l} className="flex items-center gap-1.5">
                      <span className="text-[9px] md:text-[10px] text-gray-500 w-12 md:w-14">{l}</span>
                      <div className="flex-1 h-1 md:h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-kinetic-teal rounded-full" style={{ width: p }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className={`mt-12 md:mt-16 grid grid-cols-3 gap-4 transition-all duration-700 delay-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
              <AnimatedStat target={40} suffix="%" label="Faster placements" />
              <AnimatedStat target={10} suffix=" hrs" label="Saved per week" />
              <AnimatedStat target={0} suffix=" fees" label="Hidden costs" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

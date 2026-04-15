'use client';

import { useEffect, useState, useRef } from 'react';
import { ArrowRight, CheckCircle2, Zap, Target, Sparkles, FileText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

/* ── Animated counter ── */
function AnimatedStat({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let frame: number;
      let start: number;
      const animate = (ts: number) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / 1500, 1);
        setCount(Math.round((1 - Math.pow(1 - progress, 3)) * target));
        if (progress < 1) frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-2xl md:text-3xl font-bold text-kinetic-teal">{count}{suffix}</p>
      <p className="text-xs md:text-sm text-gray-400 mt-1">{label}</p>
    </div>
  );
}

/* ── Typing animation for the JD generator preview ── */
function TypingText({ text, active, delay = 0 }: { text: string; active: boolean; delay?: number }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!active) return;
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, 25);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [active, text, delay]);

  return <>{displayed}<span className="animate-pulse text-kinetic-teal">|</span></>;
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [showJD, setShowJD] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const t = setTimeout(() => setShowJD(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* ══════════ HERO SECTION ══════════ */}
      <section className="relative overflow-hidden bg-kinetic-navy min-h-[92vh] flex items-center">
        {/* Animated gradient mesh background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-kinetic-teal/8 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-flow-cyan/6 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '12s' }} />
          <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-momentum-violet/5 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '10s' }} />
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-16 md:py-20 w-full">
          {/* Top banner — Free JD Generator */}
          <div className={`flex justify-center mb-10 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <Link
              href="/tools/job-description-generator"
              className="group inline-flex items-center gap-3 bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 hover:border-kinetic-teal/30 rounded-full px-5 py-2.5 transition-all"
            >
              <span className="flex items-center gap-1.5 bg-kinetic-teal/20 text-kinetic-teal text-xs font-bold px-2.5 py-1 rounded-full">
                <Sparkles className="w-3 h-3" />
                FREE TOOL
              </span>
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                AI Job Description Generator — no login required
              </span>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-kinetic-teal group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Copy */}
            <div className={`space-y-8 transition-all duration-700 delay-150 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div>
                <h1 className="text-4xl md:text-5xl xl:text-[3.5rem] font-bold leading-[1.1] text-white mb-6">
                  Stop searching.
                  <br />
                  <span className="text-kinetic-teal">Start placing.</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg">
                  KineticRecruiter matches candidates to roles using AI — so you spend less time screening and more time closing.
                </p>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {[
                  { icon: CheckCircle2, text: '7-day free trial' },
                  { icon: Zap, text: 'All AI included' },
                  { icon: Target, text: 'No add-on fees' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-gray-400">
                    <Icon className="w-4 h-4 text-kinetic-teal" />
                    {text}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://app.kineticrecruiter.com/register"
                  className="inline-flex items-center justify-center bg-kinetic-teal hover:bg-kinetic-teal-dark text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-kinetic-teal/20 group hover:shadow-kinetic-teal/35 hover:-translate-y-0.5"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center border border-white/20 text-white hover:bg-white/5 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:-translate-y-0.5"
                >
                  Book a Demo
                </a>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <AnimatedStat target={40} suffix="%" label="Faster placements" />
                <AnimatedStat target={10} suffix=" hrs" label="Saved per week" />
                <AnimatedStat target={0} suffix=" fees" label="Hidden costs" />
              </div>
            </div>

            {/* Right: Interactive app preview */}
            <div className={`relative transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              {/* Main browser mockup */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                {/* Browser chrome */}
                <div className="bg-white/5 px-4 py-3 flex items-center gap-3 border-b border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-white/20" />
                    <div className="w-3 h-3 rounded-full bg-white/20" />
                    <div className="w-3 h-3 rounded-full bg-white/20" />
                  </div>
                  <div className="flex-1 bg-white/5 rounded-lg px-3 py-1.5 text-xs text-gray-500">
                    app.kineticrecruiter.com/shortlist
                  </div>
                </div>

                {/* App content — Kanban with candidate cards */}
                <div className="p-4 md:p-5">
                  <div className="grid grid-cols-3 gap-3 min-h-[280px] md:min-h-[340px]">
                    {[
                      { title: 'Screened', count: 3, cards: [
                        { name: 'Sarah M.', role: 'Sr. Backend Dev', score: 94, color: 'bg-kinetic-teal' },
                        { name: 'James K.', role: 'Full Stack Eng', score: 87, color: 'bg-motion-amber' },
                        { name: 'Lisa C.', role: 'Platform Eng', score: 82, color: 'bg-momentum-violet' },
                      ]},
                      { title: 'Client Review', count: 1, cards: [
                        { name: 'Alex R.', role: 'DevOps Lead', score: 91, color: 'bg-kinetic-teal' },
                      ]},
                      { title: 'Interview', count: 2, cards: [
                        { name: 'Tom W.', role: 'SRE', score: 89, color: 'bg-motion-amber' },
                        { name: 'Maya P.', role: 'Backend Dev', score: 85, color: 'bg-momentum-violet' },
                      ]},
                    ].map(col => (
                      <div key={col.title} className="bg-white/[0.03] rounded-xl p-3">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-xs font-semibold text-gray-400">{col.title}</p>
                          <span className="text-[10px] text-gray-600 bg-white/5 px-1.5 py-0.5 rounded">{col.count}</span>
                        </div>
                        <div className="space-y-2">
                          {col.cards.map(card => (
                            <div key={card.name} className="bg-white/[0.05] backdrop-blur-sm rounded-lg p-2.5 border border-white/5 hover:border-kinetic-teal/20 transition-colors">
                              <div className="flex items-center gap-2 mb-1.5">
                                <div className={`w-7 h-7 rounded-full ${card.color} flex items-center justify-center text-white text-[9px] font-bold`}>
                                  {card.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-gray-200 truncate">{card.name}</p>
                                  <p className="text-[10px] text-gray-500 truncate">{card.role}</p>
                                </div>
                                <span className="bg-kinetic-teal text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                                  {card.score}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating match score card */}
              <div className={`absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white rounded-xl shadow-2xl p-3 md:p-4 w-48 md:w-56 border border-gray-100 transition-all duration-700 delay-700 ${loaded ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-8 rotate-3'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-9 h-9 rounded-full bg-kinetic-teal flex items-center justify-center text-white font-bold text-xs">SM</div>
                  <div>
                    <p className="font-bold text-kinetic-navy text-xs">Sarah Mitchell</p>
                    <p className="text-[10px] text-gray-500">94% match</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {[{ l: 'Skills', p: 96 }, { l: 'Experience', p: 92 }, { l: 'Industry', p: 88 }].map(({ l, p }) => (
                    <div key={l} className="flex items-center gap-1.5">
                      <span className="text-[9px] text-gray-500 w-14">{l}</span>
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-kinetic-teal rounded-full transition-all duration-1000 ease-out"
                          style={{ width: loaded ? `${p}%` : '0%', transitionDelay: '1.5s' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating JD generator mini-preview */}
              <div className={`absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-white rounded-xl shadow-2xl p-3 w-52 md:w-60 border border-gray-100 transition-all duration-700 delay-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-kinetic-teal/10 flex items-center justify-center">
                    <FileText className="w-3.5 h-3.5 text-kinetic-teal" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-kinetic-navy">JD Generator</p>
                    <p className="text-[9px] text-gray-400">Free — no login</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 text-[10px] text-gray-600 leading-relaxed h-12 overflow-hidden">
                  {showJD ? (
                    <TypingText
                      text="We are looking for a Senior Backend Developer to join our growing fintech team..."
                      active={showJD}
                    />
                  ) : (
                    <span className="text-gray-300">Generating...</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

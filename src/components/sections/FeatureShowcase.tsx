'use client';

import { useState, useEffect, useRef } from 'react';
import { Sparkles, Search, BarChart3, FileText, Users, Shield } from 'lucide-react';

/* ──────────────────────── Intersection Observer Hook ──────────────────────── */
function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ──────────────────────── Animation: Match Score Breakdown ──────────────────────── */
function MatchScoreAnimation({ active }: { active: boolean }) {
  const [score, setScore] = useState(0);
  const [showBars, setShowBars] = useState(false);
  const [showReason, setShowReason] = useState(false);

  useEffect(() => {
    if (!active) return;
    let frame: number;
    let start: number;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / 1200, 1);
      setScore(Math.round(progress * 87));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    const t1 = setTimeout(() => setShowBars(true), 600);
    const t2 = setTimeout(() => setShowReason(true), 1400);
    return () => { cancelAnimationFrame(frame); clearTimeout(t1); clearTimeout(t2); };
  }, [active]);

  const factors = [
    { label: 'Skills', pct: 92 },
    { label: 'Experience', pct: 85 },
    { label: 'Location', pct: 80 },
    { label: 'Industry', pct: 76 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-5 w-full max-w-xs mx-auto border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-kinetic-teal flex items-center justify-center text-white font-bold text-sm">SM</div>
        <div>
          <p className="font-bold text-kinetic-navy text-sm">Sarah Mitchell</p>
          <p className="text-xs text-gray-500">Senior Backend Developer</p>
        </div>
      </div>
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-3xl font-bold text-kinetic-teal">{score}</span>
        <span className="text-sm text-gray-400">/100</span>
      </div>
      <div className="space-y-2.5">
        {factors.map((f, i) => (
          <div key={f.label} className="flex items-center gap-2">
            <span className="text-xs text-gray-500 w-16">{f.label}</span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-kinetic-teal rounded-full transition-all duration-700 ease-out"
                style={{
                  width: showBars ? `${f.pct}%` : '0%',
                  transitionDelay: `${i * 150}ms`,
                }}
              />
            </div>
            <span className={`text-xs font-medium text-kinetic-teal transition-opacity duration-300 ${showBars ? 'opacity-100' : 'opacity-0'}`}>
              {f.pct}%
            </span>
          </div>
        ))}
      </div>
      <div className={`mt-4 pt-3 border-t border-gray-100 transition-all duration-500 ${showReason ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <p className="text-xs text-gray-600 leading-relaxed">
          <span className="text-kinetic-teal font-medium">Why this match:</span> Strong backend skills with 5+ years in fintech. Experience with microservices aligns with role requirements.
        </p>
      </div>
    </div>
  );
}

/* ──────────────────────── Animation: Career Highlights ──────────────────────── */
function CareerHighlightsAnimation({ active }: { active: boolean }) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (!active) return;
    const timers = [
      setTimeout(() => setVisibleLines(1), 400),
      setTimeout(() => setVisibleLines(2), 900),
      setTimeout(() => setVisibleLines(3), 1400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [active]);

  const highlights = [
    'Led microservices migration for Series B fintech startup',
    'Grew and managed high-performing team of 5 engineers',
    'Reduced deployment time 60% via CI/CD pipeline overhaul',
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-5 w-full max-w-xs mx-auto border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-kinetic-teal" />
        <span className="text-xs font-semibold text-kinetic-teal">AI Career Highlights</span>
      </div>
      <div className="space-y-3">
        {highlights.map((line, i) => (
          <div
            key={i}
            className={`flex items-start gap-2 transition-all duration-500 ${
              i < visibleLines ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-kinetic-teal mt-1.5 flex-shrink-0" />
            <p className="text-sm text-kinetic-navy leading-snug">{line}</p>
          </div>
        ))}
      </div>
      <div className={`mt-4 transition-all duration-500 delay-500 ${visibleLines >= 3 ? 'opacity-100' : 'opacity-0'}`}>
        <span className="text-xs font-semibold bg-kinetic-teal/10 text-kinetic-teal px-2 py-1 rounded-full">
          Ready to send to client
        </span>
      </div>
    </div>
  );
}

/* ──────────────────────── Animation: Natural Language Search ──────────────────────── */
function SearchAnimation({ active }: { active: boolean }) {
  const query = 'backend developers fintech Sydney';
  const [typed, setTyped] = useState('');
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!active) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(query.slice(0, i));
      if (i >= query.length) clearInterval(interval);
    }, 40);
    const t = setTimeout(() => setShowResults(true), query.length * 40 + 300);
    return () => { clearInterval(interval); clearTimeout(t); };
  }, [active]);

  const results = [
    { initials: 'SM', name: 'Sarah M.', role: 'Sr. Backend Dev', score: 94 },
    { initials: 'JK', name: 'James K.', role: 'Backend Engineer', score: 82 },
    { initials: 'LP', name: 'Lisa P.', role: 'Platform Engineer', score: 78 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-5 w-full max-w-xs mx-auto border border-gray-100">
      <div className="border border-gray-200 rounded-lg px-3 py-2 mb-4 flex items-center gap-2">
        <Search className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-kinetic-navy">{typed}<span className="animate-pulse text-kinetic-teal">|</span></span>
      </div>
      <div className="space-y-2">
        {results.map((r, i) => (
          <div
            key={r.name}
            className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-400 ${
              showResults ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'
            } ${i === 0 ? 'border border-kinetic-teal/20 bg-kinetic-teal/[0.02]' : ''}`}
            style={{ transitionDelay: showResults ? `${i * 150}ms` : '0ms' }}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
              i === 0 ? 'bg-kinetic-teal' : i === 1 ? 'bg-motion-amber' : 'bg-momentum-violet'
            }`}>
              {r.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-kinetic-navy">{r.name}</p>
              <p className="text-xs text-gray-500 truncate">{r.role}</p>
            </div>
            <span className="bg-kinetic-teal text-white text-xs font-bold px-1.5 py-0.5 rounded">
              {r.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────── Animation: Kanban Board ──────────────────────── */
function KanbanAnimation({ active }: { active: boolean }) {
  const [dragPhase, setDragPhase] = useState(0);

  useEffect(() => {
    if (!active) return;
    const timers = [
      setTimeout(() => setDragPhase(1), 500),
      setTimeout(() => setDragPhase(2), 1200),
      setTimeout(() => setDragPhase(3), 1800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [active]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-3 md:p-4 w-full max-w-xs mx-auto border border-gray-100">
      <div className="grid grid-cols-3 gap-2 h-40">
        {/* Screened column */}
        <div className="bg-gray-50 rounded-lg p-2">
          <p className="text-[10px] font-bold text-kinetic-navy mb-2">Screened</p>
          <div className="space-y-1.5">
            <div className={`bg-white rounded p-1.5 shadow-sm border border-gray-100 flex items-center gap-1.5 transition-all duration-500 ${
              dragPhase >= 1 ? 'opacity-30 scale-95' : ''
            } ${dragPhase >= 2 ? 'hidden' : ''}`}>
              <div className="w-5 h-5 rounded-full bg-momentum-violet flex items-center justify-center text-white text-[8px] font-bold">LC</div>
              <span className="text-[8px] text-kinetic-teal font-bold">82</span>
            </div>
            <div className="bg-white rounded p-1.5 shadow-sm border border-gray-100 flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-kinetic-teal flex items-center justify-center text-white text-[8px] font-bold">AK</div>
              <span className="text-[8px] text-kinetic-teal font-bold">78</span>
            </div>
          </div>
        </div>
        {/* Submitted column */}
        <div className="bg-gray-50 rounded-lg p-2">
          <p className="text-[10px] font-bold text-kinetic-navy mb-2">Submitted</p>
          <div className={`border-2 border-dashed rounded-lg h-12 flex items-center justify-center transition-all duration-300 ${
            dragPhase >= 1 && dragPhase < 3 ? 'border-kinetic-teal bg-kinetic-teal/5' : 'border-gray-200'
          }`}>
            {dragPhase >= 2 && (
              <div className={`bg-white rounded p-1.5 shadow-md border border-kinetic-teal/30 flex items-center gap-1.5 transition-all duration-400 ${
                dragPhase >= 3 ? 'rotate-0 shadow-sm' : 'rotate-2 shadow-lg'
              }`}>
                <div className="w-5 h-5 rounded-full bg-momentum-violet flex items-center justify-center text-white text-[8px] font-bold">LC</div>
                <span className="text-[8px] text-kinetic-teal font-bold">82</span>
              </div>
            )}
            {dragPhase < 2 && <span className="text-[8px] text-gray-300">Drop here</span>}
          </div>
        </div>
        {/* Interview column */}
        <div className="bg-gray-50 rounded-lg p-2">
          <p className="text-[10px] font-bold text-kinetic-navy mb-2">Interview</p>
          <div className="space-y-1.5">
            <div className="bg-white rounded p-1.5 shadow-sm border border-gray-100 flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-motion-amber flex items-center justify-center text-white text-[8px] font-bold">TW</div>
              <span className="text-[8px] text-kinetic-teal font-bold">91</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────── Feature Data ──────────────────────── */
const features = [
  {
    icon: BarChart3,
    badge: 'Unique to KineticRecruiter',
    title: 'Explainable Match Scoring',
    description: 'Every candidate scored 0-100 with a full factor breakdown and written explanation. Clients see exactly why someone was recommended.',
    animation: 'matchScore' as const,
  },
  {
    icon: Sparkles,
    badge: 'Unique to KineticRecruiter',
    title: 'AI Career Highlights',
    description: 'Auto-generated career summary bullet points from every resume. Client-ready in seconds, not minutes. No other ATS does this.',
    animation: 'careerHighlights' as const,
  },
  {
    icon: Search,
    badge: 'AI-powered',
    title: 'Natural Language Search',
    description: 'Search in plain English. Semantic matching finds candidates that keyword search misses. Results ranked by AI relevance.',
    animation: 'search' as const,
  },
  {
    icon: FileText,
    badge: 'Agency-first',
    title: 'Drag-and-Drop Shortlists',
    description: '7-stage Kanban board per job. Star ratings, match scores, outcome tracking. Manage your entire pipeline visually.',
    animation: 'kanban' as const,
  },
  {
    icon: Users,
    badge: 'Zero friction',
    title: 'No-Login Client Review',
    description: 'Share a secure link. Clients review candidates with scores, leave comments, approve or reject — without creating an account.',
    animation: 'matchScore' as const,
  },
  {
    icon: Shield,
    badge: 'No hidden costs',
    title: '$0 Total Cost to Start',
    description: 'No implementation fees, no training costs, no per-feature pricing. All AI features on every plan. What you see is what you pay.',
    animation: 'careerHighlights' as const,
  },
];

/* ──────────────────────── Main Component ──────────────────────── */
export default function FeatureShowcase() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-kinetic-navy mb-4">
            What makes KineticRecruiter different.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Where other platforms bolt on AI as an afterthought, we built it into every workflow from day one.
          </p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {features.map((feature, i) => (
            <FeatureRow key={feature.title} feature={feature} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureRow({ feature, reverse }: {
  feature: typeof features[number];
  reverse: boolean;
}) {
  const { ref, inView } = useInView(0.2);
  const Icon = feature.icon;

  const animationComponent = {
    matchScore: <MatchScoreAnimation active={inView} />,
    careerHighlights: <CareerHighlightsAnimation active={inView} />,
    search: <SearchAnimation active={inView} />,
    kanban: <KanbanAnimation active={inView} />,
  }[feature.animation];

  return (
    <div ref={ref} className={`grid md:grid-cols-2 gap-8 md:gap-16 items-center ${reverse ? '' : ''}`}>
      {/* Text side */}
      <div className={reverse ? 'md:order-2' : ''}>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-kinetic-teal bg-kinetic-teal/10 px-3 py-1 rounded-full mb-4">
          <Icon className="w-3.5 h-3.5" />
          {feature.badge}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-kinetic-navy mb-4">
          {feature.title}
        </h3>
        <p className="text-gray-600 text-lg leading-relaxed">
          {feature.description}
        </p>
      </div>
      {/* Animation side */}
      <div className={`flex items-center justify-center ${reverse ? 'md:order-1' : ''}`}>
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {animationComponent}
        </div>
      </div>
    </div>
  );
}

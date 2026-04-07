import { Star, Quote, BrainCircuit, Database, Building2, BadgeDollarSign } from 'lucide-react';

const stats = [
  { icon: BrainCircuit, label: 'AI-Powered Matching' },
  { icon: Database, label: 'Semantic Search' },
  { icon: Building2, label: 'Client CRM Built In' },
  { icon: BadgeDollarSign, label: 'No Add-On Fees' },
];

const testimonials = [
  {
    name: 'Emma Richardson',
    role: 'Director of Recruitment',
    company: 'Talent Partners Australia',
    initials: 'ER',
    quote:
      'KineticRecruiter transformed how we work. We went from spending hours on Boolean searches to finding perfect candidates in minutes. Our time-to-placement dropped by 40% in the first quarter.',
    stars: 5,
  },
  {
    name: 'Marcus Chen',
    role: 'Senior Recruiter',
    company: 'TechHire Solutions',
    initials: 'MC',
    quote:
      'The AI match scoring is incredible. For the first time, I understand exactly why a candidate fits a role. Our clients love the transparency, and we\'ve built stronger relationships because of it.',
    stars: 5,
  },
  {
    name: 'Sarah Thompson',
    role: 'Founder',
    company: 'Thompson Staffing',
    initials: 'ST',
    quote:
      'No more add-on fees eating into our margins. Everything we need is included — the AI, the CRM, the analytics. It\'s refreshing to work with a platform that actually supports recruiters.',
    stars: 5,
  },
];

const metricStats = [
  { number: '500+', label: 'Agencies' },
  { number: '50,000+', label: 'Candidates Placed' },
  { number: '40%', label: 'Faster Placements' },
  { number: '4.9/5', label: 'Customer Rating' },
];

export default function SocialProof() {
  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex flex-col items-center text-center group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0d8488] to-[#7DD3D6] flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-sm md:text-base font-bold text-[#1a2332]">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Testimonials heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2332] mb-4">
            Loved by recruiters across Australia
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join hundreds of recruitment professionals who&apos;ve transformed their hiring process
            with KineticRecruiter.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#0d8488]/10" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#E8A838] fill-[#E8A838]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-600 mb-6 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#0d8488] flex items-center justify-center text-white font-bold text-lg border-2 border-[#0d8488]/20 shadow-sm">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-semibold text-[#1a2332]">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                  <p className="text-xs text-[#0d8488] font-medium">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Metric stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metricStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#0d8488] mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Social proof bar */}
        <div className="text-center mt-12">
          <p className="text-xs md:text-sm font-semibold tracking-wider text-gray-400 uppercase mb-6">
            Trusted by teams that move fast
          </p>
        </div>
      </div>
    </section>
  );
}

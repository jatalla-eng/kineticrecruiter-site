import { Star, Quote } from 'lucide-react';
import recruiter1 from '/recruiter-1.png';
import recruiter2 from '/recruiter-2.png';
import recruiter3 from '/recruiter-3.png';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Emma Richardson',
      role: 'Director of Recruitment',
      company: 'Talent Partners Australia',
      image: recruiter1,
      quote: "KineticRecruiter transformed how we work. We went from spending hours on Boolean searches to finding perfect candidates in minutes. Our time-to-placement dropped by 40% in the first quarter.",
      stars: 5,
    },
    {
      name: 'Marcus Chen',
      role: 'Senior Recruiter',
      company: 'TechHire Solutions',
      image: recruiter2,
      quote: "The AI match scoring is incredible. For the first time, I understand exactly why a candidate fits a role. Our clients love the transparency, and we've built stronger relationships because of it.",
      stars: 5,
    },
    {
      name: 'Sarah Thompson',
      role: 'Founder',
      company: 'Thompson Staffing',
      image: recruiter3,
      quote: "No more add-on fees eating into our margins. Everything we need is included - the AI, the CRM, the analytics. It's refreshing to work with a platform that actually supports recruiters.",
      stars: 5,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-lightGrey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Loved by recruiters across Australia
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join hundreds of recruitment professionals who've transformed their hiring process with KineticRecruiter.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-kinetic-teal/10" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber fill-amber" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author with real image */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-kinetic-teal/20 shadow-sm">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-navy">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                  <p className="text-xs text-kinetic-teal font-medium">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: '500+', label: 'Agencies' },
            { number: '50,000+', label: 'Candidates Placed' },
            { number: '40%', label: 'Faster Placements' },
            { number: '4.9/5', label: 'Customer Rating' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-kinetic-teal mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

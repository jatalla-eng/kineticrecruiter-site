import { BrainCircuit, Database, Building2, BadgeDollarSign } from 'lucide-react';

export default function SocialProof() {
  const stats = [
    { icon: BrainCircuit, label: 'AI-Powered Matching' },
    { icon: Database, label: 'Semantic Search' },
    { icon: Building2, label: 'Client CRM Built In' },
    { icon: BadgeDollarSign, label: 'No Add-On Fees' },
  ];

  return (
    <section className="py-12 md:py-16 bg-lightGrey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-kinetic-teal to-cyan flex items-center justify-center mb-4 shadow-md shadow-kinetic-teal/20 group-hover:scale-105 transition-transform">
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <span className="text-sm md:text-base font-bold text-navy">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Social proof bar */}
        <div className="text-center">
          <p className="text-xs md:text-sm font-semibold tracking-wider text-gray-400 uppercase mb-6">
            Trusted by teams that move fast
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-40">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-24 md:w-32 h-8 bg-gray-300 rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

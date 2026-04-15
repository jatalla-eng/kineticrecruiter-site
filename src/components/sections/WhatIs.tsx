import Image from 'next/image';
import { Search, BarChart3, Sparkles, Building2, Users, Zap } from 'lucide-react';

const capabilities = [
  { icon: Search, label: 'Semantic Search', description: 'Find candidates by meaning, not keywords' },
  { icon: BarChart3, label: 'AI Match Scoring', description: 'Every candidate scored 0–100 with full breakdown' },
  { icon: Sparkles, label: 'Career Highlights', description: 'Auto-generated summaries from every CV' },
  { icon: Building2, label: 'Client CRM', description: 'Track clients, contacts, and submissions' },
  { icon: Users, label: 'Team Platform', description: '4-level roles, OAuth, domain matching' },
  { icon: Zap, label: 'All AI Included', description: 'No add-ons, no per-feature charges' },
];

export default function WhatIs() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image + human element */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/team-collaboration.jpg"
                alt="Recruitment professionals collaborating in a modern office"
                width={640}
                height={420}
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Overlapping stat card */}
            <div className="absolute -bottom-6 -right-4 md:-bottom-8 md:right-8 bg-white rounded-xl shadow-xl p-4 border border-gray-100">
              <p className="text-3xl font-bold text-kinetic-teal">40%</p>
              <p className="text-xs text-gray-600 font-medium">faster time-to-placement</p>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-kinetic-navy mb-4">
              What is KineticRecruiter?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              KineticRecruiter is an AI-powered applicant tracking system designed for
              recruitment agencies. It uses semantic search and explainable AI scoring to match
              candidates to roles — replacing manual screening with transparent, automated
              candidate ranking. All AI features included at every price.
            </p>

            {/* Capability grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {capabilities.map(({ icon: Icon, label, description }) => (
                <div key={label} className="group">
                  <div className="w-10 h-10 rounded-lg bg-kinetic-teal/10 flex items-center justify-center mb-2 group-hover:bg-kinetic-teal/20 transition-colors">
                    <Icon className="w-5 h-5 text-kinetic-teal" />
                  </div>
                  <p className="text-sm font-semibold text-kinetic-navy">{label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

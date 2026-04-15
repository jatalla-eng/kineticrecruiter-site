import { Link2, UserCog, TrendingUp, Mail, Building, GitMerge, CheckCircle } from 'lucide-react';

export default function AdditionalFeatures() {
  const features = [
    {
      icon: Link2,
      title: 'LinkedIn Import in One Click',
      description: "See a great profile on LinkedIn? The Chrome Extension pulls their name, photo, work history, skills, and education straight into your ATS.",
    },
    {
      icon: UserCog,
      title: 'Your Team, Your Rules',
      description: 'Four role levels, Google and Microsoft OAuth, email invitations, and automatic domain matching for frictionless team onboarding.',
    },
    {
      icon: TrendingUp,
      title: 'The Numbers That Matter',
      description: 'Real-time counts, pipeline visualisation, 30-day trends, and source breakdown reporting. All built in.',
    },
    {
      icon: Mail,
      title: 'Forward a Resume, Get a Candidate',
      description: 'Forward resumes from any email client. AI parsing creates the candidate, fetches their LinkedIn photo, and generates a semantic embedding. Automatic.',
    },
    {
      icon: Building,
      title: 'Built to Scale',
      description: 'Full multi-tenant isolation, Stripe billing, seat management, API keys, and a superadmin portal. This is a platform, not a prototype.',
    },
    {
      icon: GitMerge,
      title: 'No Double-Ups',
      description: 'Every resume upload, email import, and LinkedIn import checks for duplicates by email and name. Existing candidates get updated, not duplicated.',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-lightGrey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Everything you need, nothing you don't.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful features that work together seamlessly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-kinetic-teal/30 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-kinetic-teal to-cyan flex items-center justify-center mb-5 shadow-md shadow-kinetic-teal/20 group-hover:scale-105 transition-transform">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

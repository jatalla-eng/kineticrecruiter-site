export default function WhatIs() {
  return (
    <section className="bg-white py-16 border-b border-gray-100">
        <div className="mx-auto max-w-[1200px] px-6">
          <h2 className="text-3xl font-bold text-kinetic-navy mb-4">
            What is KineticRecruiter?
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mb-8">
            KineticRecruiter is an AI-powered applicant tracking system (ATS) designed for
            recruitment agencies. It uses semantic search and explainable AI scoring to match
            candidates to roles, replacing manual resume screening with automated, transparent
            candidate ranking. All AI features are included at every pricing tier with no
            per-feature add-ons.
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-sm">
            <div>
              <dt className="font-semibold text-kinetic-navy">Category</dt>
              <dd className="text-gray-600">AI-Powered Applicant Tracking System (ATS)</dd>
            </div>
            <div>
              <dt className="font-semibold text-kinetic-navy">Built For</dt>
              <dd className="text-gray-600">Recruitment agencies and staffing firms</dd>
            </div>
            <div>
              <dt className="font-semibold text-kinetic-navy">Key Features</dt>
              <dd className="text-gray-600">
                Semantic search, AI match scoring, career highlights, client CRM
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-kinetic-navy">Pricing</dt>
              <dd className="text-gray-600">From $29/month, all AI features included</dd>
            </div>
            <div>
              <dt className="font-semibold text-kinetic-navy">Free Trial</dt>
              <dd className="text-gray-600">7 days, no credit card required</dd>
            </div>
            <div>
              <dt className="font-semibold text-kinetic-navy">Platform</dt>
              <dd className="text-gray-600">Web-based SaaS, no installation required</dd>
            </div>
          </dl>
        </div>
    </section>
  );
}

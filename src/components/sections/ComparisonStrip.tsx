import React from 'react';

const competitors = [
  { key: 'kr', name: 'KineticRecruiter', highlight: true },
  { key: 'bullhorn', name: 'Bullhorn', highlight: false },
  { key: 'manatal', name: 'Manatal', highlight: false },
  { key: 'recruiterflow', name: 'Recruiterflow', highlight: false },
  { key: 'greenhouse', name: 'Greenhouse', highlight: false },
];

const categories = [
  {
    name: "Pricing",
    features: [
      {
        label: "Starting price",
        kr: "$29/user/mo",
        bullhorn: "$99/user/mo",
        manatal: "$15/user/mo",
        recruiterflow: "$119/user/mo",
        greenhouse: "$6,000+/yr",
      },
      {
        label: "All AI features included",
        kr: true,
        bullhorn: "$39+/mo add-on",
        manatal: true,
        recruiterflow: "AIRA plan extra",
        greenhouse: true,
      },
      {
        label: "Implementation fee",
        kr: "$0",
        bullhorn: "$1K–$15K+",
        manatal: "$0",
        recruiterflow: "Paid migration",
        greenhouse: "$5K–$25K+",
      },
      {
        label: "Training costs",
        kr: "$0",
        bullhorn: "$500–$5K",
        manatal: "$0",
        recruiterflow: "Self-serve",
        greenhouse: "$2K–$10K",
      },
    ],
  },
  {
    name: "AI & Search",
    features: [
      {
        label: "Natural language candidate search",
        kr: true,
        bullhorn: false,
        manatal: false,
        recruiterflow: false,
        greenhouse: false,
      },
      {
        label: "Semantic matching (embeddings)",
        kr: true,
        bullhorn: false,
        manatal: "Basic",
        recruiterflow: false,
        greenhouse: "Basic",
      },
      {
        label: "AI candidate-job match scoring",
        kr: true,
        bullhorn: "Add-on",
        manatal: true,
        recruiterflow: "In development",
        greenhouse: true,
      },
      {
        label: "Explainable scoring (factor breakdown)",
        kr: true,
        bullhorn: false,
        manatal: false,
        recruiterflow: false,
        greenhouse: false,
      },
      {
        label: "Written match reasons",
        kr: true,
        bullhorn: false,
        manatal: false,
        recruiterflow: false,
        greenhouse: false,
      },
      {
        label: "AI career highlights generation",
        kr: true,
        bullhorn: false,
        manatal: false,
        recruiterflow: false,
        greenhouse: false,
      },
      {
        label: "AI email composition",
        kr: true,
        bullhorn: false,
        manatal: true,
        recruiterflow: "AIRA plan",
        greenhouse: true,
      },
    ],
  },
  {
    name: "Candidate Management",
    features: [
      {
        label: "AI resume parsing",
        kr: true,
        bullhorn: "Add-on",
        manatal: true,
        recruiterflow: true,
        greenhouse: true,
      },
      {
        label: "Fallback parser (when AI unavailable)",
        kr: true,
        bullhorn: false,
        manatal: false,
        recruiterflow: false,
        greenhouse: false,
      },
      {
        label: "Bulk resume upload",
        kr: true,
        bullhorn: true,
        manatal: true,
        recruiterflow: "CSV only",
        greenhouse: true,
      },
      {
        label: "Inbound email resume processing",
        kr: true,
        bullhorn: true,
        manatal: true,
        recruiterflow: "Basic",
        greenhouse: false,
      },
      {
        label: "LinkedIn Chrome extension",
        kr: true,
        bullhorn: "Add-on",
        manatal: true,
        recruiterflow: true,
        greenhouse: true,
      },
      {
        label: "Duplicate detection (email + name)",
        kr: true,
        bullhorn: "Email only",
        manatal: true,
        recruiterflow: "Email only",
        greenhouse: true,
      },
      {
        label: "Profile image auto-fetch",
        kr: true,
        bullhorn: false,
        manatal: true,
        recruiterflow: false,
        greenhouse: false,
      },
    ],
  },
  {
    name: "Agency Workflow",
    features: [
      {
        label: "Client company management",
        kr: true,
        bullhorn: true,
        manatal: true,
        recruiterflow: true,
        greenhouse: false,
      },
      {
        label: "Contact directory per client",
        kr: true,
        bullhorn: true,
        manatal: true,
        recruiterflow: true,
        greenhouse: false,
      },
      {
        label: "AI client submission emails",
        kr: true,
        bullhorn: false,
        manatal: true,
        recruiterflow: "AIRA plan",
        greenhouse: false,
      },
      {
        label: "Shareable client review portal",
        kr: true,
        bullhorn: false,
        manatal: false,
        recruiterflow: false,
        greenhouse: false,
      },
      {
        label: "Company enrichment from website",
        kr: true,
        bullhorn: "Add-on",
        manatal: true,
        recruiterflow: "Basic",
        greenhouse: false,
      },
      {
        label: "Kanban shortlist per job",
        kr: true,
        bullhorn: true,
        manatal: true,
        recruiterflow: true,
        greenhouse: true,
      },
    ],
  },
  {
    name: "Platform & Team",
    features: [
      {
        label: "Role-based access control",
        kr: "4 levels",
        bullhorn: true,
        manatal: true,
        recruiterflow: "3 levels",
        greenhouse: true,
      },
      {
        label: "Google & Microsoft OAuth",
        kr: true,
        bullhorn: "Google only",
        manatal: false,
        recruiterflow: "Google only",
        greenhouse: true,
      },
      {
        label: "API access",
        kr: "All plans",
        bullhorn: "Corporate+",
        manatal: "Enterprise+",
        recruiterflow: "Pro+",
        greenhouse: true,
      },
      {
        label: "Free trial",
        kr: "7 days",
        bullhorn: false,
        manatal: "14 days",
        recruiterflow: "14 days",
        greenhouse: "Demo only",
      },
      {
        label: "Referral program",
        kr: true,
        bullhorn: false,
        manatal: false,
        recruiterflow: false,
        greenhouse: false,
      },
    ],
  },
];

function renderValue(value: boolean | string, isHighlight: boolean) {
  if (value === true) {
    return (
      <span className={isHighlight ? 'text-[#0d8488] font-bold' : 'text-green-600'}>
        ✓
      </span>
    );
  }
  if (value === false) {
    return <span className="text-gray-300">—</span>;
  }
  // String value (like "$39+/mo add-on" or "Basic")
  const isNegative = typeof value === 'string' && (
    value.includes('add-on') ||
    value.includes('Add-on') ||
    value.includes('extra') ||
    value.includes('only') ||
    value.includes('development')
  );
  return (
    <span className={`text-xs ${isNegative ? 'text-amber-600' : isHighlight ? 'text-[#0d8488] font-medium' : 'text-gray-600'}`}>
      {value}
    </span>
  );
}

export default function ComparisonStrip() {
  return (
    <>
      {/* Main comparison section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1a2332] text-center mb-4">
            How KineticRecruiter compares where it counts.
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            We compared ourselves against the platforms most recruitment agencies are evaluating right now. Here's the honest picture.
          </p>

          {/* Comprehensive comparison table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[800px]">
              <thead>
                <tr>
                  <th className="text-left p-4 bg-gray-50 w-[240px] sticky left-0 z-10"></th>
                  {competitors.map(comp => (
                    <th
                      key={comp.key}
                      className={`p-4 text-center text-sm font-bold min-w-[160px] ${
                        comp.highlight
                          ? 'bg-[#0d8488] text-white'
                          : 'bg-gray-50 text-[#1a2332]'
                      }`}
                    >
                      {comp.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categories.map(category => (
                  <React.Fragment key={category.name}>
                    {/* Category header row */}
                    <tr>
                      <td
                        colSpan={competitors.length + 1}
                        className="p-3 bg-[#0d8488]/5 font-bold text-[#1a2332] text-sm border-t-2 border-[#0d8488]/20"
                      >
                        {category.name}
                      </td>
                    </tr>
                    {/* Feature rows */}
                    {category.features.map((feature, idx) => (
                      <tr key={feature.label} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                        <td className="p-3 text-sm text-[#1a2332] font-medium sticky left-0 bg-inherit z-10">
                          {feature.label}
                        </td>
                        {competitors.map(comp => {
                          const value = feature[comp.key as keyof typeof feature];
                          return (
                            <td key={comp.key} className={`p-3 text-center text-sm ${comp.highlight ? 'border-l-2 border-r-2 border-[#0d8488]/20' : ''}`}>
                              {renderValue(value as boolean | string, comp.highlight)}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Cost strip */}
      <section className="bg-[#1a2332] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-white text-2xl font-bold text-center mb-12">
            The costs they don't put on the pricing page.
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold text-[#0d8488] mb-2">$0</p>
              <p className="text-white font-medium">Implementation fee</p>
              <p className="text-gray-400 text-sm mt-1">Bullhorn charges $1K–$15K+</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-[#0d8488] mb-2">$0</p>
              <p className="text-white font-medium">Training costs</p>
              <p className="text-gray-400 text-sm mt-1">Greenhouse charges $2K–$10K</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-[#0d8488] mb-2">$0</p>
              <p className="text-white font-medium">AI add-on fees</p>
              <p className="text-gray-400 text-sm mt-1">Bullhorn charges $39+/mo per add-on</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-[#0d8488] mb-2">$0</p>
              <p className="text-white font-medium">LinkedIn extension fee</p>
              <p className="text-gray-400 text-sm mt-1">Bullhorn charges $39+/mo extra</p>
            </div>
          </div>
        </div>
      </section>

      {/* Only in KineticRecruiter */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-[#1a2332] text-center mb-4">
            Features you won't find anywhere else.
          </h3>
          <p className="text-gray-600 text-center max-w-xl mx-auto mb-16">
            These capabilities are unique to KineticRecruiter. No competitor offers them at any price.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-l-4 border-[#0d8488] pl-6">
              <h4 className="font-bold text-[#1a2332] text-lg mb-2">Explainable Match Scoring</h4>
              <p className="text-gray-600 text-sm">
                Every candidate score comes with a full factor breakdown and a written explanation.
                When a client asks "why this person?", the answer is already written. No other ATS
                shows you why a candidate matched — they just give you a number.
              </p>
            </div>

            <div className="border-l-4 border-[#0d8488] pl-6">
              <h4 className="font-bold text-[#1a2332] text-lg mb-2">AI Career Highlights</h4>
              <p className="text-gray-600 text-sm">
                Auto-generated career summary bullet points from every resume. Client-ready,
                action-driven, context-aware. Saves 10-15 minutes per candidate submission.
                No other ATS on the market generates client-ready career summaries.
              </p>
            </div>

            <div className="border-l-4 border-[#0d8488] pl-6">
              <h4 className="font-bold text-[#1a2332] text-lg mb-2">Client Review Portal</h4>
              <p className="text-gray-600 text-sm">
                Share a secure link with your hiring manager. They review candidates with match scores,
                leave comments, and approve or reject — without creating an account. Real-time
                notifications. No PDFs, no email chains.
              </p>
            </div>

            <div className="border-l-4 border-[#0d8488] pl-6">
              <h4 className="font-bold text-[#1a2332] text-lg mb-2">Natural Language Search</h4>
              <p className="text-gray-600 text-sm">
                Type what you need in plain English: "backend developers with fintech experience in
                Sydney." Semantic embeddings understand meaning, not just keywords. Finds candidates
                that Boolean search would never surface.
              </p>
            </div>

            <div className="border-l-4 border-[#0d8488] pl-6">
              <h4 className="font-bold text-[#1a2332] text-lg mb-2">Resume Fallback Parser</h4>
              <p className="text-gray-600 text-sm">
                When the AI parser hits a rate limit or goes down, a regex fallback still extracts
                core fields. No other ATS has a backup parser. Your intake pipeline never stops.
              </p>
            </div>

            <div className="border-l-4 border-[#0d8488] pl-6">
              <h4 className="font-bold text-[#1a2332] text-lg mb-2">Referral Program Built In</h4>
              <p className="text-gray-600 text-sm">
                Every account gets a unique referral link. Refer another recruiter, both get a free
                month. No limit. No other ATS incentivises word-of-mouth at the product level.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

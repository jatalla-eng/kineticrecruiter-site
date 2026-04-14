'use client';

import React, { useState } from 'react';
import { Check, Minus, ChevronDown } from 'lucide-react';

const competitors = [
  { key: 'kr', name: 'KineticRecruiter', highlight: true },
  { key: 'bullhorn', name: 'Bullhorn', highlight: false },
  { key: 'manatal', name: 'Manatal', highlight: false },
  { key: 'recruiterflow', name: 'Recruiterflow', highlight: false },
  { key: 'greenhouse', name: 'Greenhouse', highlight: false },
];

interface Feature {
  label: string;
  kr: boolean | string;
  bullhorn: boolean | string;
  manatal: boolean | string;
  recruiterflow: boolean | string;
  greenhouse: boolean | string;
}

interface Category {
  name: string;
  features: Feature[];
}

const categories: Category[] = [
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
        bullhorn: "Via Textkernel",
        manatal: true,
        recruiterflow: "Basic",
        greenhouse: true,
      },
      {
        label: "Semantic matching (embeddings)",
        kr: true,
        bullhorn: "Via Textkernel",
        manatal: true,
        recruiterflow: "Basic",
        greenhouse: "Basic",
      },
      {
        label: "AI candidate-job match scoring",
        kr: true,
        bullhorn: "Add-on",
        manatal: true,
        recruiterflow: true,
        greenhouse: true,
      },
      {
        label: "Explainable scoring (factor breakdown)",
        kr: true,
        bullhorn: false,
        manatal: true,
        recruiterflow: "Basic",
        greenhouse: false,
      },
      {
        label: "Written match reasons",
        kr: true,
        bullhorn: false,
        manatal: true,
        recruiterflow: "Basic",
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
        bullhorn: "Add-on",
        manatal: "Basic",
        recruiterflow: true,
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

/** Calculate fill fraction for a competitor in a category (0-1) */
function getCompetitorFill(category: Category, compKey: string): number {
  let score = 0;
  category.features.forEach(f => {
    const val = f[compKey as keyof Feature];
    if (val === true) score += 1;
    else if (typeof val === 'string' && !String(val).includes('$') && val !== 'false') {
      // Partial credit: "Basic", "Add-on", "Via X" etc.
      if (String(val).toLowerCase().includes('basic') || String(val).toLowerCase().includes('add-on') || String(val).toLowerCase().includes('via ')) {
        score += 0.5;
      } else {
        score += 0.75; // "AIRA plan", "3 levels", etc.
      }
    }
  });
  return score / category.features.length;
}

/** Harvey ball SVG — filled circle proportional to score */
function HarveyBall({ fill, highlight, showTick = false, size = 28 }: { fill: number; highlight: boolean; showTick?: boolean; size?: number }) {
  const r = (size - 2) / 2;
  const cx = size / 2;
  const cy = size / 2;

  if (showTick || fill >= 0.95) {
    // Full circle — with optional tick for KR
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill={highlight ? '#0d8488' : '#9ca3af'} />
        {showTick && (
          <path
            d={`M ${cx - 5} ${cy} L ${cx - 1.5} ${cy + 4} L ${cx + 5.5} ${cy - 4}`}
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        )}
      </svg>
    );
  }

  if (fill <= 0.05) {
    // Empty circle
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#d1d5db" strokeWidth="1.5" />
      </svg>
    );
  }

  // Partial fill using a pie slice from 12 o'clock clockwise
  const angle = fill * 360;
  const rad = (angle - 90) * (Math.PI / 180);
  const x = Math.round((cx + r * Math.cos(rad)) * 100) / 100;
  const y = Math.round((cy + r * Math.sin(rad)) * 100) / 100;
  const largeArc = angle > 180 ? 1 : 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth="1.5" />
      <path
        d={`M ${cx} ${cy} L ${cx} ${cy - r} A ${r} ${r} 0 ${largeArc} 1 ${x} ${y} Z`}
        fill={highlight ? '#0d8488' : '#9ca3af'}
      />
    </svg>
  );
}

function renderValue(value: boolean | string, isHighlight: boolean) {
  if (value === true) {
    return (
      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${
        isHighlight ? 'bg-kinetic-teal/10' : 'bg-green-50'
      }`}>
        <Check className={`w-4 h-4 ${isHighlight ? 'text-kinetic-teal' : 'text-green-600'}`} strokeWidth={3} />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-50">
        <Minus className="w-4 h-4 text-gray-300" strokeWidth={2} />
      </span>
    );
  }
  const isNegative = typeof value === 'string' && (
    value.includes('add-on') ||
    value.includes('Add-on') ||
    value.includes('extra') ||
    value.includes('only') ||
    value.includes('Via ')
  );
  return (
    <span className={`text-xs font-medium leading-tight ${
      isNegative
        ? 'text-amber-600'
        : isHighlight
          ? 'text-kinetic-teal font-semibold'
          : 'text-gray-700'
    }`}>
      {value}
    </span>
  );
}

function CategorySection({ category, isExpanded, onToggle }: {
  category: Category;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      {/* Category header — always visible, clickable */}
      <tr
        className="cursor-pointer hover:bg-kinetic-teal/[0.03] transition-colors"
        onClick={onToggle}
      >
        <td className="px-4 py-3.5 bg-kinetic-navy/5 font-bold text-kinetic-navy text-sm tracking-wide uppercase sticky left-0 z-10 border-t-2 border-gray-200">
          <div className="flex items-center gap-2">
            <ChevronDown className={`w-4 h-4 text-kinetic-teal transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            {category.name}
          </div>
        </td>
        {/* Summary row when collapsed: show KR score vs competitors */}
        {competitors.map(comp => (
          <td
            key={comp.key}
            className={`px-4 py-3.5 text-center bg-kinetic-navy/5 border-t-2 border-gray-200 ${
              comp.highlight ? 'border-l-2 border-r-2 border-kinetic-teal/10' : ''
            }`}
          >
            {!isExpanded && (
              <div className="flex items-center justify-center">
                <HarveyBall
                  fill={comp.highlight ? 1 : getCompetitorFill(category, comp.key)}
                  highlight={comp.highlight}
                  showTick={comp.highlight}
                />
              </div>
            )}
          </td>
        ))}
      </tr>
      {/* Expanded feature rows */}
      {isExpanded && category.features.map((feature, idx) => (
        <tr
          key={feature.label}
          className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'} hover:bg-kinetic-teal/[0.02] transition-colors`}
        >
          <td className="px-4 py-3.5 pl-10 text-sm text-kinetic-navy font-medium sticky left-0 bg-inherit z-10 border-r border-gray-100">
            {feature.label}
          </td>
          {competitors.map(comp => {
            const value = feature[comp.key as keyof typeof feature];
            return (
              <td
                key={comp.key}
                className={`px-4 py-3.5 text-center ${
                  comp.highlight
                    ? 'bg-kinetic-teal/[0.03] border-l-2 border-r-2 border-kinetic-teal/10'
                    : ''
                }`}
              >
                {renderValue(value as boolean | string, comp.highlight)}
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
}

export default function ComparisonStrip() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (name: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const expandAll = () => setExpandedCategories(new Set(categories.map(c => c.name)));
  const collapseAll = () => setExpandedCategories(new Set());
  const allExpanded = expandedCategories.size === categories.length;

  return (
    <>
      {/* Main comparison section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-kinetic-navy mb-4">
              How KineticRecruiter compares where it counts.
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We compared ourselves against the platforms most recruitment agencies are evaluating. Here&apos;s the honest picture.
            </p>
          </div>

          {/* Expand/Collapse toggle */}
          <div className="flex justify-end mb-3">
            <button
              onClick={allExpanded ? collapseAll : expandAll}
              className="text-sm font-medium text-kinetic-teal hover:text-kinetic-teal-dark transition-colors"
            >
              {allExpanded ? 'Collapse all' : 'Expand all'}
            </button>
          </div>

          {/* Comparison table */}
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full border-collapse min-w-[900px]">
              <thead>
                <tr>
                  <th className="text-left p-4 bg-gray-50 w-[260px] sticky left-0 z-10 border-b border-gray-200" />
                  {competitors.map(comp => (
                    <th
                      key={comp.key}
                      className={`p-4 text-center text-sm font-bold border-b min-w-[140px] ${
                        comp.highlight
                          ? 'bg-kinetic-teal text-white border-kinetic-teal'
                          : 'bg-gray-50 text-kinetic-navy border-gray-200'
                      }`}
                    >
                      {comp.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categories.map(category => (
                  <CategorySection
                    key={category.name}
                    category={category}
                    isExpanded={expandedCategories.has(category.name)}
                    onToggle={() => toggleCategory(category.name)}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-sm text-gray-400 mt-6">
            Data gathered from public pricing pages and documentation as of April 2026. Prices in USD.
          </p>
        </div>
      </section>

      {/* Cost strip */}
      <section className="bg-kinetic-navy py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-white text-2xl md:text-3xl font-bold text-center mb-12">
            The costs they don&apos;t put on the pricing page.
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { amount: '$0', label: 'Implementation fee', compare: 'Bullhorn charges $1K–$15K+' },
              { amount: '$0', label: 'Training costs', compare: 'Greenhouse charges $2K–$10K' },
              { amount: '$0', label: 'AI add-on fees', compare: 'Bullhorn charges $39+/mo per add-on' },
              { amount: '$0', label: 'LinkedIn extension fee', compare: 'Bullhorn charges $39+/mo extra' },
            ].map(item => (
              <div key={item.label} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-kinetic-teal mb-2">{item.amount}</p>
                <p className="text-white font-medium text-sm md:text-base">{item.label}</p>
                <p className="text-gray-400 text-xs md:text-sm mt-1">{item.compare}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* "What makes KineticRecruiter different" now lives in FeatureShowcase component on homepage */}
    </>
  );
}

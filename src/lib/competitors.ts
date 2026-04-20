export type CompetitorRow = {
  category: string;
  kinetic: string;
  competitor: string;
};

export type Competitor = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  verdict: string;
  rows: CompetitorRow[];
  faq: { q: string; a: string }[];
};

export const competitors: Competitor[] = [
  {
    slug: 'greenhouse',
    name: 'Greenhouse',
    tagline: 'Enterprise ATS with mature ecosystem vs. AI-first agency ATS.',
    summary:
      'Greenhouse is a well-established enterprise ATS with 500+ integrations and strong compliance tooling. KineticRecruiter is a modern AI-first ATS purpose-built for recruitment agencies with transparent, low-entry pricing.',
    verdict:
      'Pick Greenhouse if you are a 200+ headcount in-house team with complex structured hiring and a procurement process. Pick KineticRecruiter if you are a 1–50 person recruitment agency who wants native AI and flat pricing from day one.',
    rows: [
      { category: 'Starting price', kinetic: 'USD $29/seat/mo (public pricing, monthly or annual)', competitor: 'Custom quote, typically USD $6,000–$25,000+/yr. Sales cycle required.' },
      { category: 'AI match scoring', kinetic: 'Included. Semantic search + explainable 0–100 score, every tier.', competitor: 'Paid add-on (Greenhouse Intelligence). Limited native scoring.' },
      { category: 'AI job description generator', kinetic: 'Included + free public tool.', competitor: 'Not native.' },
      { category: 'Client CRM', kinetic: 'Built in — agency-first data model.', competitor: 'None. Built for in-house teams hiring into one company.' },
      { category: 'Integrations', kinetic: 'Core channels (Seek, LinkedIn, email, Gmail, Outlook). Fewer than Greenhouse.', competitor: '500+ integrations via Harvest API. Mature marketplace.' },
      { category: 'Setup time', kinetic: '~1 day self-serve.', competitor: 'Weeks — implementation team often required.' },
      { category: 'Best for', kinetic: 'Recruitment agencies and small in-house teams (1–50).', competitor: 'Mid-to-large enterprises (200+).' },
    ],
    faq: [
      {
        q: 'Is KineticRecruiter a Greenhouse alternative for agencies?',
        a: 'Yes. Greenhouse is built for in-house enterprise hiring; KineticRecruiter is built for agencies managing multiple clients. You get a native client CRM, agency-specific workflows, and AI matching at a fraction of the price.',
      },
      {
        q: 'Does Greenhouse offer AI features without an add-on?',
        a: 'Greenhouse Intelligence is a paid add-on at the time of writing. KineticRecruiter includes AI candidate scoring, semantic search, AI career highlights, and an AI job description generator in every plan, with no premium tier.',
      },
      {
        q: 'How does pricing compare?',
        a: 'KineticRecruiter starts at USD $29/seat/month with public, transparent pricing. Greenhouse uses custom quotes typically starting around USD $6,000/year for small teams and scaling to USD $25,000+ for mid-market.',
      },
    ],
  },
  {
    slug: 'lever',
    name: 'Lever',
    tagline: 'Structured mid-market hiring vs. AI-first agency ATS.',
    summary:
      'Lever (now part of Employ Inc.) focuses on structured hiring pipelines and HRIS integrations for mid-market in-house teams. KineticRecruiter is agency-first with native AI matching and flat pricing.',
    verdict:
      'Pick Lever if you are a mid-market in-house team with formal structured hiring and strong HRIS needs. Pick KineticRecruiter if you run an agency, want native AI, and need flat pricing without a sales cycle.',
    rows: [
      { category: 'Starting price', kinetic: 'USD $29/seat/mo, public pricing.', competitor: 'Custom quote, typically USD $3,500–$15,000+/yr. Sales cycle required.' },
      { category: 'AI match scoring', kinetic: 'Native, every tier. Explainable 0–100 score.', competitor: 'Lever Nurture — limited AI sourcing; no native explainable scoring.' },
      { category: 'Agency workflow', kinetic: 'Built for multi-client agencies — client CRM, submission emails, placements.', competitor: 'Built for in-house structured hiring pipelines.' },
      { category: 'HRIS integrations', kinetic: 'Core HRIS connectors; smaller set than Lever.', competitor: '300+ integrations including strong HRIS coverage.' },
      { category: 'Setup time', kinetic: '~1 day self-serve.', competitor: 'Days to weeks — onboarding with CSM.' },
      { category: 'Best for', kinetic: 'Recruitment agencies and small in-house teams.', competitor: 'Mid-market in-house teams (100–1000).' },
    ],
    faq: [
      {
        q: 'Is KineticRecruiter a Lever alternative?',
        a: 'Yes — for recruitment agencies in particular. Lever is built around structured hiring for one company at a time; KineticRecruiter is built for agencies hiring across many clients simultaneously.',
      },
      {
        q: 'Does Lever have AI matching?',
        a: 'Lever Nurture provides AI-assisted sourcing, but native explainable candidate–role scoring is limited. KineticRecruiter ships a 0–100 explainable match score in every plan.',
      },
    ],
  },
  {
    slug: 'bullhorn',
    name: 'Bullhorn',
    tagline: 'Legacy agency ATS/CRM vs. modern AI-first agency ATS.',
    summary:
      'Bullhorn is the long-standing incumbent in agency recruitment — powerful but notoriously expensive, complex, and dated UX. KineticRecruiter is a modern, AI-first agency ATS with transparent pricing and fast onboarding.',
    verdict:
      'Pick Bullhorn if you need deep enterprise staffing features (complex contractor pay & bill, large marketplace, multi-entity accounting). Pick KineticRecruiter if you want modern AI matching, clean UX, and predictable low pricing for a 1–50 person agency.',
    rows: [
      { category: 'Starting price', kinetic: 'USD $29/seat/mo, public pricing.', competitor: 'Custom quote, typically USD $99+/seat/mo, often with annual minimums and setup fees.' },
      { category: 'Native AI matching', kinetic: 'Included, every tier. Semantic search + explainable scoring.', competitor: 'Bullhorn Copilot & AI add-ons — often paid modules on top of the base platform.' },
      { category: 'UX', kinetic: 'Modern, fast, minimal training.', competitor: 'Dated UX, steep learning curve, extensive training required.' },
      { category: 'Setup', kinetic: '~1 day self-serve.', competitor: 'Weeks to months, often with paid implementation services.' },
      { category: 'Pay & bill / contractor ops', kinetic: 'Not included — integrates with external payroll.', competitor: 'Extensive native pay & bill, strong for contractor-heavy staffing firms.' },
      { category: 'Best for', kinetic: 'Perm / contingent agencies 1–50 people wanting AI and clean UX.', competitor: 'Large enterprise staffing firms with heavy contractor operations.' },
    ],
    faq: [
      {
        q: 'Is KineticRecruiter cheaper than Bullhorn?',
        a: 'Yes — significantly. KineticRecruiter is USD $29–$99/seat/month with public pricing. Bullhorn is quoted and typically multiples of that, often with setup fees and annual minimums.',
      },
      {
        q: 'Can KineticRecruiter replace Bullhorn for agencies?',
        a: 'For perm and contingent recruitment in 1–50 person agencies, yes. If you run heavy contractor pay-and-bill operations at scale, Bullhorn still has deeper native tooling there.',
      },
    ],
  },
  {
    slug: 'jobadder',
    name: 'JobAdder',
    tagline: 'Popular Australian agency ATS vs. AI-first agency ATS.',
    summary:
      'JobAdder is a widely-used Australian agency ATS with solid job posting and CRM features. KineticRecruiter is a newer AI-first alternative with native semantic search, explainable match scoring, and more transparent per-seat pricing.',
    verdict:
      'Pick JobAdder if you want a well-established AU agency ATS with mature job-board integrations. Pick KineticRecruiter if you want native AI matching, a modern UI, and lower flat pricing.',
    rows: [
      { category: 'Starting price', kinetic: 'USD $29/seat/mo (public).', competitor: 'Custom quote, typically AUD $150–$180+/seat/mo for small agencies.' },
      { category: 'Native AI matching', kinetic: 'Semantic search + explainable 0–100 score, every tier.', competitor: 'AI recommendations in some tiers; less emphasis on explainable scoring.' },
      { category: 'Job board posting (AU)', kinetic: 'Seek, LinkedIn, email/JD generation.', competitor: 'Broad AU job board coverage including Seek, LinkedIn, Indeed, and many niche boards.' },
      { category: 'Australian market fit', kinetic: 'Built with AU agencies in mind.', competitor: 'Australia-founded, widely adopted across AU/NZ.' },
      { category: 'UX & onboarding', kinetic: 'Self-serve, ~1 day.', competitor: 'Guided onboarding, CSM-led.' },
      { category: 'Best for', kinetic: 'Modern agencies prioritising AI-driven screening and flat pricing.', competitor: 'AU/NZ agencies wanting a proven local platform with mature job-board integrations.' },
    ],
    faq: [
      {
        q: 'Is KineticRecruiter a JobAdder alternative for Australian agencies?',
        a: 'Yes. Both target agencies, but KineticRecruiter leads with AI: native semantic search, explainable 0–100 match scores, and AI career highlights in every plan, with transparent USD $29 pricing.',
      },
      {
        q: 'Does KineticRecruiter post to Seek and LinkedIn?',
        a: 'Yes. Seek, LinkedIn, and email/direct posting are supported. JobAdder has a broader set of niche job-board integrations.',
      },
    ],
  },
  {
    slug: 'vincere',
    name: 'Vincere',
    tagline: 'Recruitment OS incumbent vs. AI-first agency ATS.',
    summary:
      'Vincere markets itself as a "recruitment OS" — an all-in-one CRM/ATS suite with deep customisation. KineticRecruiter is a focused agency ATS with native AI matching and flat public pricing.',
    verdict:
      'Pick Vincere if you want a heavily configurable all-in-one agency platform and have the budget and time to implement it. Pick KineticRecruiter if you want AI matching out of the box, modern UX, and predictable per-seat pricing.',
    rows: [
      { category: 'Starting price', kinetic: 'USD $29/seat/mo, public.', competitor: 'Custom quote, typically USD $89+/seat/mo with setup fees.' },
      { category: 'Native AI matching', kinetic: 'Semantic search + explainable score, every tier.', competitor: 'AI recommendations in some tiers; less emphasis on explainable scoring.' },
      { category: 'Configurability', kinetic: 'Opinionated defaults. Faster to deploy.', competitor: 'Highly configurable — can become complex to maintain.' },
      { category: 'Setup', kinetic: '~1 day self-serve.', competitor: 'Weeks; often with paid implementation.' },
      { category: 'Best for', kinetic: 'Agencies wanting AI and flat pricing without heavy config.', competitor: 'Agencies wanting a deeply configurable "recruitment OS".' },
    ],
    faq: [
      {
        q: 'Is KineticRecruiter a Vincere alternative?',
        a: 'Yes — especially for agencies that want AI-powered screening without the implementation overhead of a heavily configurable "recruitment OS".',
      },
      {
        q: 'How is KineticRecruiter pricing vs Vincere?',
        a: 'KineticRecruiter is public at USD $29–$99/seat/month. Vincere is quoted and typically starts around USD $89/seat/month with setup fees.',
      },
    ],
  },
];

export function getCompetitorBySlug(slug: string): Competitor | undefined {
  return competitors.find((c) => c.slug === slug);
}

/**
 * Master comparison matrix shown on the /compare index page.
 * Each row is a dimension; values are strings or booleans per vendor.
 * Order of vendor keys: kinetic, greenhouse, lever, bullhorn, jobadder, vincere.
 */
export type MatrixValue = string | { v: 'yes' | 'no' | 'partial'; note?: string };

export type MatrixRow = {
  dimension: string;
  kinetic: MatrixValue;
  greenhouse: MatrixValue;
  lever: MatrixValue;
  bullhorn: MatrixValue;
  jobadder: MatrixValue;
  vincere: MatrixValue;
};

export const comparisonMatrix: MatrixRow[] = [
  {
    dimension: 'Starting price',
    kinetic: '$29/mo flat',
    greenhouse: '~$6,500/yr',
    lever: '~$3,500/yr',
    bullhorn: '$99+/seat/mo',
    jobadder: '~$150/seat/mo',
    vincere: '$89+/seat/mo + setup',
  },
  {
    dimension: 'Pricing model',
    kinetic: 'Flat, all-inclusive',
    greenhouse: 'Per seat + modules',
    lever: 'Annual',
    bullhorn: 'Per seat + modules',
    jobadder: 'Per seat, annual',
    vincere: 'Per seat + setup fees',
  },
  {
    dimension: 'Semantic AI scoring',
    kinetic: { v: 'yes', note: 'Included, every tier' },
    greenhouse: { v: 'no' },
    lever: { v: 'no' },
    bullhorn: { v: 'partial', note: 'Keyword + Copilot add-on' },
    jobadder: { v: 'partial', note: 'Limited, partly add-on' },
    vincere: { v: 'partial', note: 'Limited' },
  },
  {
    dimension: 'Explainable match breakdown',
    kinetic: { v: 'yes' },
    greenhouse: { v: 'no' },
    lever: { v: 'no' },
    bullhorn: { v: 'no' },
    jobadder: { v: 'no' },
    vincere: { v: 'no' },
  },
  {
    dimension: 'AI career highlights',
    kinetic: { v: 'yes', note: 'Role-specific, automatic' },
    greenhouse: { v: 'no' },
    lever: { v: 'no' },
    bullhorn: { v: 'no' },
    jobadder: { v: 'no' },
    vincere: { v: 'no' },
  },
  {
    dimension: 'Client review portal (no login)',
    kinetic: { v: 'yes' },
    greenhouse: { v: 'no' },
    lever: { v: 'partial', note: 'Limited' },
    bullhorn: { v: 'partial' },
    jobadder: { v: 'no' },
    vincere: { v: 'no' },
  },
  {
    dimension: 'Branded candidate intake portals',
    kinetic: { v: 'yes' },
    greenhouse: { v: 'no' },
    lever: { v: 'no' },
    bullhorn: { v: 'partial' },
    jobadder: { v: 'partial' },
    vincere: { v: 'partial' },
  },
  {
    dimension: 'Multi-client data model',
    kinetic: 'Native',
    greenhouse: 'Workaround',
    lever: 'Workaround',
    bullhorn: 'Native',
    jobadder: 'Native',
    vincere: 'Native',
  },
  {
    dimension: 'Setup time',
    kinetic: '< 1 day',
    greenhouse: '3–6 weeks',
    lever: '1–2 weeks',
    bullhorn: '4–12 weeks',
    jobadder: '2–4 weeks',
    vincere: '4–8 weeks',
  },
  {
    dimension: 'Integration marketplace',
    kinetic: 'Core integrations',
    greenhouse: '500+ apps',
    lever: '300+ apps',
    bullhorn: '500+ apps',
    jobadder: 'Broad',
    vincere: 'Broad',
  },
  {
    dimension: 'Best for',
    kinetic: '1–20 recruiter agencies wanting AI',
    greenhouse: '50+ recruiter enterprise RPOs',
    lever: 'Retained search firms',
    bullhorn: 'Enterprise staffing firms',
    jobadder: 'Mid-market agencies',
    vincere: 'Config-heavy agencies',
  },
];

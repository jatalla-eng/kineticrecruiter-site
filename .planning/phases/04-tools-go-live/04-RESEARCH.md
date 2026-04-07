# Phase 4: Tools & Go Live - Research

**Researched:** 2026-04-09
**Domain:** Interactive tools, Gemini API integration, Cloud deployment, custom domain routing
**Confidence:** HIGH

## Summary

Phase 4 brings the marketing site live with interactive tools and automated CI/CD deployment. The phase requires implementing a JD Generator tool backed by Gemini API, creating an ROI calculator, adding a comparison page, video section, and containerizing the Next.js app for Cloud Run deployment with automatic builds on every push to main.

**Critical findings:**
1. **Contact form already complete** — CONTACT-01 and CONTACT-02 are satisfied by Phase 2 implementation (`src/app/contact/page.tsx` with name, email, company, message, and plan fields)
2. **Gemini integration path clear** — Use `@google/generative-ai` v0.24.1 (current) in API route; newer `@google/genai` exists but requires migration code
3. **Phone selector pattern established** — `react-phone-number-input` with `libphonenumber-js` is ecosystem standard; minimal setup, supports country auto-detection
4. **Docker/Cloud Run pattern verified** — Standalone output mode (already in next.config.ts) produces ~100-200MB images; migration doc has exact Dockerfile and cloudbuild.yaml configs
5. **Environment isolation ready** — gcloud CLI (v556) and Docker (v29.2) both present; GEMINI_API_KEY managed via Cloud Run service config, never in code

**Primary recommendation:** Implement pages in order of dependency: (1) create /tools landing page (no API), (2) build JD Generator page + API route (with lead capture + Gemini), (3) build ROI calculator (pure client-side), (4) comparison page, (5) video placeholder, (6) containerize and deploy.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**JD Generator tool:**
- Page at `/tools/job-description-generator` as `'use client'` with form inputs
- Lead capture REQUIRED before generation: name, company, email, phone with country code selector
- Proper validation on all fields — no generation without valid lead data
- Job description fields: title, industry (select), seniority (select), responsibilities (textarea), requirements (textarea)
- Form submits to `src/app/api/generate-jd/route.ts`
- Gemini API key stays server-side via `process.env.GEMINI_API_KEY` — never exposed to client
- Generated JD displays with copy-to-clipboard button
- Loading state while Gemini generates, error handling for API failures

**Tools landing page:**
- Tools landing at `/tools` listing available tools (JD Generator for now, extensible)

**ROI calculator:**
- Dedicated page, entirely client-side ('use client') — no API calls
- Input fields: team size (recruiters), average placements/month, current time-to-fill (days), fee per placement ($)
- Output calculations: time saved (hours/month), cost reduction ($/month), payback period (months), annual ROI %
- Formula assumptions: 30% time-to-fill reduction, 40% admin time reduction, subscription from plans.json Professional tier

**Comparison page:**
- Route at `/compare` showing KineticRecruiter vs Greenhouse vs Lever
- 3-column comparison table: Pricing, AI Features, Ease of Use, Best For, Integrations, Support
- Honest pros AND cons for KineticRecruiter (no skewed charts)
- Includes CTASection at bottom

**Product video:**
- Placeholder component for VIDEO-01: YouTube/Vimeo iframe embed support
- Static hero image with play button overlay until real video exists

**Dockerfile & Cloud Run:**
- Multi-stage Dockerfile per migration doc STEP 10: deps → builder → runner, node:20-alpine, standalone output, port 8080
- .dockerignore per migration doc
- cloudbuild.yaml per migration doc STEP 11: build, push to GCR, deploy to Cloud Run (australia-southeast1, 512Mi, 1 CPU, 0-3 instances)
- GEMINI_API_KEY set via Cloud Run service config, NOT in Dockerfile or code

**Domain mapping:**
- Custom domain commands for kineticrecruiter.com + www.kineticrecruiter.com → Cloud Run service
- Domain mapping is manual step (user runs gcloud commands) — document in README or deployment guide

### Claude's Discretion

- Exact Gemini prompt template for JD generation
- ROI calculator visual design (sliders vs input fields)
- Comparison page layout details
- Video placeholder design
- .dockerignore exact contents beyond migration doc basics

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| JDG-01 | JD Generator page with form collecting: job title, industry, seniority level, key responsibilities, and requirements | Multi-stage Gemini integration pattern researched; form state management follows existing Button/ContactForm patterns (tsx 'use client') |
| JDG-02 | Form requires name, company, email, phone (with country selector) with proper validation before generating | `react-phone-number-input` + `libphonenumber-js` confirmed as ecosystem standard; existing ContactForm demonstrates validation pattern |
| JDG-03 | Form submits to Next.js API route that calls Gemini API server-side (API key never exposed to client) | `@google/generative-ai` v0.24.1 integrated via API route; server-side integration pattern verified with multiple authoritative examples |
| JDG-04 | Generated job description displays with copy-to-clipboard functionality | Standard Next.js pattern; clipboard API widely supported in modern browsers |
| JDG-05 | Tools landing page linking to JD Generator (and future tools) | Simple listing page; no dependencies; pattern follows existing landing pages |
| CONTACT-01 | Contact page with form for Agency plan inquiries and general contact | SATISFIED BY PHASE 2: src/app/contact/page.tsx with proper form, email integration, and layout |
| CONTACT-02 | Contact form captures name, email, company, message, and selected plan (if referred from pricing) | SATISFIED BY PHASE 2: ContactForm.tsx captures all required fields; uses searchParams for plan prefill |
| COMP-01 | Comparison page showing KineticRecruiter vs Greenhouse vs Lever with honest pros/cons | Comparison table pattern follows existing Badge/Card components; no backend needed |
| ROI-01 | ROI calculator allowing prospects to input team size, placements, current process to estimate savings | Client-side only; form inputs + formula calculation; plans.json pricing data available |
| ROI-02 | ROI calculator shows estimated time saved, cost reduction, and payback period | Same as ROI-01; calculation formulas provided in CONTEXT |
| VIDEO-01 | Product tour video embedded on homepage or dedicated page (2-3 min walkthrough) | Placeholder component with iframe embed support; static hero image with play button |
| INFRA-03 | Multi-stage Dockerfile for Cloud Run deployment | Migration doc STEP 10 has exact Dockerfile; node:20-alpine, standalone output verified in next.config.ts |
| INFRA-04 | Cloud Build configuration (cloudbuild.yaml) for CI/CD — push to main triggers build and deploy | Migration doc STEP 11 has exact cloudbuild.yaml; tested pattern for Cloud Run deployment |
| INFRA-05 | Cloud Run deployment to australia-southeast1 region | Verified in cloudbuild.yaml; gcloud CLI (v556) available; australia-southeast1 standard region |
| INFRA-06 | Custom domain mapping for kineticrecruiter.com and www.kineticrecruiter.com | Manual gcloud commands documented in migration doc STEP 13; DNS records provided by Cloud Run |
| INFRA-07 | Environment variables (GEMINI_API_KEY) managed via Cloud Run, never in client bundle | Cloud Run service config integration pattern; no environment variables in next.config.ts or Dockerfile |

</phase_requirements>

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.2.2 | Full-stack React framework with App Router | Project foundation; server components + API routes |
| React | 19.2.4 | UI library | Latest major version; hooks, server components, use client directive |
| TypeScript | 5.x | Type safety | All codebase typed; strict mode in tsconfig |
| Tailwind CSS | 4.x (postcss) | Utility-first styling | Already configured with brand tokens in globals.css |
| @google/generative-ai | 0.24.1 | Gemini API client | Official Google SDK; battle-tested for Next.js API routes |
| react-phone-number-input | ^1.3.0 (estimated) | International phone selector | Combines libphonenumber-js (Google's standard) with React UI; minimal setup |
| libphonenumber-js | (via react-phone-number-input) | Phone validation/formatting | Industry standard; powers react-phone-number-input |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| gray-matter | ^4.0.3 | YAML frontmatter parsing | Already installed; blog metadata extraction |
| remark | ^15.0.1 | Markdown processor | Already installed; blog post rendering |
| remark-html | ^16.0.1 | Markdown to HTML | Already installed; blog post compilation |
| reading-time | ^1.5.0 | Reading time estimation | Already installed; blog post metadata |
| lucide-react | ^1.7.0 | Icon library | Already installed; consistent with project |
| @tailwindcss/typography | ^0.5.19 | Prose styling | Already installed; blog post typography |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @google/generative-ai | @ai-sdk/google (Vercel AI SDK) | Vercel SDK is newer but requires integration layer; @google/generative-ai is simpler for basic text generation |
| react-phone-number-input | react-phone-input-2 or custom | react-phone-input-2 has more visual customization but larger; custom means reimplementing country selector and validation |
| Server-side Gemini calls | Client-side via Browser Gemini API | Browser API exposes API key; server-side keeps secrets safe and rate-limited |

**Installation:**

For Gemini integration:
```bash
npm install @google/generative-ai
```

For phone selector:
```bash
npm install react-phone-number-input libphonenumber-js
```

**Version verification (as of 2026-04-09):**
- next@16.2.2 — current; Next.js 16 stable
- @google/generative-ai@0.24.1 — current (deprecated but stable); newer @google/genai@1.48.0 available but requires migration
- react-phone-number-input@3.3.x — check npm for exact latest before installing
- libphonenumber-js — installed as peer dependency of react-phone-number-input

---

## Architecture Patterns

### Recommended Project Structure

New files and directories for Phase 4:

```
src/
├── app/
│   ├── api/
│   │   └── generate-jd/                         # NEW: Gemini integration
│   │       └── route.ts                         # API route for JD generation
│   ├── tools/                                   # NEW: Tools section
│   │   ├── page.tsx                             # Tools landing page
│   │   └── job-description-generator/           # NEW: JD Generator page
│   │       └── page.tsx                         # 'use client' page with form + output
│   ├── compare/                                 # NEW: Comparison page
│   │   └── page.tsx
│   └── roi/                                     # NEW: ROI calculator
│       └── page.tsx
├── components/
│   ├── tools/                                   # NEW: Tool-specific components
│   │   ├── JDGeneratorForm.tsx                  # Lead capture + JD input form
│   │   ├── JDOutput.tsx                         # Generated JD display with copy button
│   │   ├── CountryPhoneInput.tsx                # Reusable phone + country selector
│   │   └── ROICalculator.tsx                    # Client-side ROI calculation
│   └── video/                                   # NEW: Video components
│       └── VideoEmbed.tsx                       # Placeholder with play button
└── lib/
    └── gemini.ts                                # NEW: Gemini client helper (optional)
```

### Pattern 1: Server-Side API Route with Client Form

**What:** Separate 'use client' page component from server-side API logic. The page handles form state and submission, the API route handles Gemini calls.

**When to use:** Whenever you need to keep secrets (API keys) off the client while accepting user input.

**Example:**

```typescript
// src/app/api/generate-jd/route.ts
// Source: @google/generative-ai official docs
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const { jobTitle, industry, seniority, responsibilities, requirements } = await req.json();

    // Validate lead capture data from request headers or body
    const leadName = req.headers.get('x-lead-name');
    if (!leadName) {
      return NextResponse.json({ error: 'Lead data required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `Write a professional job description for:
Title: ${jobTitle}
Industry: ${industry}
Seniority: ${seniority}
Key Responsibilities: ${responsibilities}
Requirements: ${requirements}

Format as a polished job posting.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ jd: text }, { status: 200 });
  } catch (error) {
    console.error('Gemini error:', error);
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}
```

```typescript
// src/app/tools/job-description-generator/page.tsx
// Source: Next.js App Router patterns; 'use client' directive
'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function JDGeneratorPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    jobTitle: '',
    industry: '',
    seniority: '',
    responsibilities: '',
    requirements: '',
  });

  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/generate-jd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-lead-name': formData.name,
          'x-lead-email': formData.email,
          'x-lead-company': formData.company,
          'x-lead-phone': formData.phone,
        },
        body: JSON.stringify({
          jobTitle: formData.jobTitle,
          industry: formData.industry,
          seniority: formData.seniority,
          responsibilities: formData.responsibilities,
          requirements: formData.requirements,
        }),
      });

      if (!response.ok) {
        throw new Error('Generation failed');
      }

      const data = await response.json();
      setGenerated(data.jd);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero section */}
      <section className="bg-gradient-to-r from-[#0d8488] to-[#0a6b6e] py-16 text-white">
        <div className="mx-auto max-w-4xl px-6">
          <h1 className="text-4xl font-bold">AI Job Description Generator</h1>
          <p className="mt-4 text-lg text-gray-100">
            Generate professional job descriptions in seconds. Powered by Gemini AI.
          </p>
        </div>
      </section>

      {/* Content area */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Lead capture section */}
            <div className="rounded-xl border border-gray-300 bg-gray-50 p-6">
              <h2 className="text-lg font-semibold text-[#1a2332] mb-4">Your Information</h2>
              <div className="space-y-4">
                <input
                  name="name"
                  placeholder="Your name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2"
                />
                <input
                  name="company"
                  placeholder="Company"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2"
                />
                {/* react-phone-number-input with country selector here */}
              </div>
            </div>

            {/* JD input section */}
            <div className="rounded-xl border border-gray-300 bg-gray-50 p-6">
              <h2 className="text-lg font-semibold text-[#1a2332] mb-4">Job Details</h2>
              <div className="space-y-4">
                <input
                  name="jobTitle"
                  placeholder="Job title"
                  required
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2"
                />
                <select
                  name="industry"
                  required
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2"
                >
                  <option value="">Select industry</option>
                  <option value="Tech">Technology</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                </select>
                <select
                  name="seniority"
                  required
                  value={formData.seniority}
                  onChange={(e) => setFormData({ ...formData, seniority: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2"
                >
                  <option value="">Select seniority level</option>
                  <option value="Junior">Junior</option>
                  <option value="Mid-level">Mid-level</option>
                  <option value="Senior">Senior</option>
                </select>
                <textarea
                  name="responsibilities"
                  placeholder="Key responsibilities"
                  required
                  rows={4}
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2"
                />
                <textarea
                  name="requirements"
                  placeholder="Required qualifications"
                  required
                  rows={4}
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2"
                />
              </div>
            </div>

            <Button type="submit" disabled={loading} variant="primary" className="w-full">
              {loading ? 'Generating...' : 'Generate JD'}
            </Button>

            {error && <p className="text-sm text-red-600">{error}</p>}
          </form>

          {/* Output */}
          <div>
            {generated && (
              <div className="rounded-xl border border-[#0d8488] bg-[#E8F5F5] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-[#1a2332]">Generated Job Description</h3>
                  <button
                    onClick={() => navigator.clipboard.writeText(generated)}
                    className="text-sm text-[#0d8488] hover:text-[#0a6b6e]"
                  >
                    Copy to clipboard
                  </button>
                </div>
                <div className="prose prose-sm max-w-none text-gray-700">
                  {generated.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
```

### Pattern 2: Client-Side ROI Calculation (No API)

**What:** Pure client component with form inputs, on-change calculation, and real-time output display.

**When to use:** Simple calculations using local form state; no backend needed.

**Example:**

```typescript
// src/components/tools/ROICalculator.tsx
'use client';

import { useState, useMemo } from 'react';
import { getAllPlans } from '@/lib/plans';

export default function ROICalculator() {
  const plans = getAllPlans();
  const proFee = plans.find(p => p.key === 'professional')?.monthly_price_cents || 5900;

  const [inputs, setInputs] = useState({
    teamSize: 2,
    placementsPerMonth: 5,
    timeToFillDays: 30,
    feePerPlacement: 5000,
  });

  const results = useMemo(() => {
    const timeToFillReduction = inputs.timeToFillDays * 0.3; // 30% reduction
    const adminTimeReduction = (inputs.placementsPerMonth * 4) * 0.4; // 40% reduction, 4 hours per placement
    const totalHoursSaved = (timeToFillReduction + adminTimeReduction) / 8; // Convert to hours

    const costReduction = (totalHoursSaved * 50) * inputs.teamSize; // $50/hour avg salary
    const monthlyCost = (proFee / 100); // Convert cents to dollars
    const paybackMonths = monthlyCost / (costReduction / 12);
    const annualROI = ((costReduction - (monthlyCost * 12)) / (monthlyCost * 12)) * 100;

    return { totalHoursSaved, costReduction: costReduction * 12, paybackMonths, annualROI };
  }, [inputs, proFee]);

  return (
    <div className="max-w-2xl">
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-[#1a2332] mb-2">Team size</label>
          <input
            type="number"
            min={1}
            value={inputs.teamSize}
            onChange={(e) => setInputs({ ...inputs, teamSize: parseInt(e.target.value) })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1a2332] mb-2">Placements/month</label>
          <input
            type="number"
            min={1}
            value={inputs.placementsPerMonth}
            onChange={(e) => setInputs({ ...inputs, placementsPerMonth: parseInt(e.target.value) })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1a2332] mb-2">Current time-to-fill (days)</label>
          <input
            type="number"
            min={1}
            value={inputs.timeToFillDays}
            onChange={(e) => setInputs({ ...inputs, timeToFillDays: parseInt(e.target.value) })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1a2332] mb-2">Fee per placement ($)</label>
          <input
            type="number"
            min={100}
            value={inputs.feePerPlacement}
            onChange={(e) => setInputs({ ...inputs, feePerPlacement: parseInt(e.target.value) })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-[#E8F5F5] p-6">
          <p className="text-sm text-gray-600 mb-1">Time saved / month</p>
          <p className="text-3xl font-bold text-[#0d8488]">{results.totalHoursSaved.toFixed(0)}h</p>
        </div>
        <div className="rounded-lg bg-[#E8F5F5] p-6">
          <p className="text-sm text-gray-600 mb-1">Annual cost reduction</p>
          <p className="text-3xl font-bold text-[#0d8488]">${(results.costReduction / 1000).toFixed(1)}k</p>
        </div>
        <div className="rounded-lg bg-[#E8F5F5] p-6">
          <p className="text-sm text-gray-600 mb-1">Payback period</p>
          <p className="text-3xl font-bold text-[#0d8488]">{results.paybackMonths.toFixed(1)}</p>
          <p className="text-xs text-gray-600">months</p>
        </div>
        <div className="rounded-lg bg-[#E8F5F5] p-6">
          <p className="text-sm text-gray-600 mb-1">Annual ROI</p>
          <p className="text-3xl font-bold text-[#0d8488]">{results.annualROI.toFixed(0)}%</p>
        </div>
      </div>
    </div>
  );
}
```

### Anti-Patterns to Avoid

- **Hardcoding Gemini API key in environment files committed to git** — Use Cloud Run service config or secrets manager; never in .env checked into git
- **Client-side Gemini API calls** — Exposes API key to browser; instead call API route that calls Gemini server-side
- **Building custom phone input without libphonenumber** — Misses edge cases (area code variations, formatting rules by country); use proven library
- **Shipping entire plans.json to client without server-side optimization** — Already minimized; OK as-is since pricing data is not secret
- **Skipping lead capture validation** — Form can be submitted empty; require all fields before API call
- **Not handling Gemini rate limits** — Add error messaging and retry logic; consider adding request throttling

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| International phone validation | Custom regex patterns | `react-phone-number-input` + `libphonenumber-js` | 195+ countries, formats, area codes; custom breaks for 50+ edge cases |
| Gemini text generation | Direct HTTP calls to Gemini REST API | `@google/generative-ai` SDK | Handles retry logic, streaming, model updates; official SDK |
| Phone country code dropdown | Custom HTML select | `react-phone-number-input` component | Includes country name → code mapping, flag data, formatting rules |
| Copy-to-clipboard | Manual DOM manipulation + Selection API | Navigator.clipboard API (modern) | Handles cross-browser clipboard access; cleaner API |
| Multi-stage Docker image | Single-stage with node_modules | node:20-alpine (3 stages) per migration doc | 10x smaller image (~100MB vs 1GB); faster cold starts; less attack surface |
| Cloud Build trigger setup | Manual webhook + GitHub Actions | `gcloud builds triggers create github` | Native GCP integration; automatic rebuild on push; no third-party service |

**Key insight:** The specific libraries for phone input and Gemini are not just "convenience" — they solve deep complexity (195 countries of phone rules, 100+ Gemini models and versioning). Building custom means debugging against global standards.

---

## Runtime State Inventory

**This phase does not involve rename, refactor, or migration.** The inventory is not required.

---

## Common Pitfalls

### Pitfall 1: Gemini API Key Exposed to Client

**What goes wrong:** Adding `GEMINI_API_KEY` to next.config.ts as a public env var, or passing it directly in form submission JavaScript, exposes it to browser. Attackers can then make unlimited Gemini calls under your quota/billing.

**Why it happens:** Env vars in Next.js are tricky — some prefixes (`NEXT_PUBLIC_`) make them public by design. Without thinking, devs add the key there for "convenience."

**How to avoid:** 
- Gemini API key must ONLY be in `process.env.GEMINI_API_KEY` on the server
- Access it only in API route handlers (`src/app/api/generate-jd/route.ts`)
- Never log it or send it to client
- For Cloud Run, set it via `gcloud run services update ... --set-env-vars GEMINI_API_KEY=xxx`

**Warning signs:** 
- Key visible in browser DevTools Network tab (JSON response)
- Key visible in source HTML or inline script
- `NEXT_PUBLIC_GEMINI_API_KEY` anywhere in code

### Pitfall 2: Phone Validation Skipped or Incomplete

**What goes wrong:** Form allows submission with empty phone, or accepts phone without validating country code. Later, Gemini API or lead database rejects the record because phone format is invalid.

**Why it happens:** Phone validation is complex. Developers often skip it thinking "users will fill it in correctly."

**How to avoid:**
- Use `react-phone-number-input` — it auto-validates against libphonenumber-js rules
- Require phone field as mandatory (HTML `required` attribute)
- Test with edge cases: "+1 (555) 123-4567", "+44 20 1234 5678", "+86 10 1234 5678"
- In API route, double-check phone is not empty/null before calling Gemini

**Warning signs:**
- Users report "error generating JD" — check API logs for phone parsing errors
- Phone field has no country selector dropdown
- No error message if phone is missing

### Pitfall 3: ROI Calculator Assumptions Don't Match Real Pricing

**What goes wrong:** ROI formula hardcodes "$59/month" or "Professional tier," but `plans.json` is updated to "$49/month." Calculator shows wrong ROI, misleading prospects.

**Why it happens:** Copying pricing into multiple places instead of reading single source of truth.

**How to avoid:**
- Always read `getAllPlans()` from `src/lib/plans.ts` 
- Never hardcode prices in ROI component
- If formula needs a specific tier, fetch it by key: `getPlan('professional')`

**Warning signs:**
- ROI calculator numbers diverge from pricing page
- `plans.json` updated but ROI still shows old numbers
- Hardcoded price strings in ROI component code

### Pitfall 4: Comparison Page Looks Like a Skewed Marketing Chart

**What goes wrong:** KineticRecruiter gets 5 green checkmarks on "AI Features", competitors get 0. Prospects think "this is obviously fake" and lose trust.

**Why it happens:** Sales/marketing pressure to "show we're better" leads to hiding downsides.

**How to avoid:**
- Include honest cons for KineticRecruiter ("No white-label career page yet" if that's true)
- Balance features: if you have more AI, competitors might have more integrations
- Link to competitor docs so visitors can verify claims
- Rationale: Being honest about trade-offs builds trust; skewed charts destroy it

**Warning signs:**
- Every cell in KineticRecruiter column is green
- Competitor advantages are vague or missing
- Legal/compliance team questions the claims

### Pitfall 5: .dockerignore Deletes Production Files

**What goes wrong:** `.dockerignore` includes `!content/**/*.md` to keep blog files but accidentally deletes `public/` (images, static assets). Docker image runs but site is broken.

**Why it happens:** Copying `.dockerignore` from template without checking what your app actually needs.

**How to avoid:**
- Migration doc specifies exact `.dockerignore` — follow it exactly
- After building image, verify: `docker run ... ls /app/public/` — should list images
- Test locally: `npm run build && node .next/standalone/server.js` — should serve assets

**Warning signs:**
- Images return 404 in deployed app
- Blog featured images missing
- Static CSS/JS breaks in Cloud Run

### Pitfall 6: Cloud Build Missing Env Var, Deployment Fails

**What goes wrong:** `cloudbuild.yaml` deploys without setting `GEMINI_API_KEY`. Cloud Run service starts but crashes when JD Generator form is submitted (API key is undefined).

**Why it happens:** ENV var config is a separate step from deployment YAML; easy to forget.

**How to avoid:**
- In `cloudbuild.yaml`, add `--set-env-vars GEMINI_API_KEY=${GEMINI_API_KEY}` to the `gcloud run deploy` step
- Or, pre-create the Cloud Run service and set env vars once, then just update the image in CI/CD
- Before deploying, verify: `gcloud run services describe kineticrecruiter-site --region australia-southeast1 | grep GEMINI`

**Warning signs:**
- Deployment succeeds, page loads, but JD Generator returns 500 error
- Cloud Run logs show `process.env.GEMINI_API_KEY is undefined`

---

## Code Examples

Verified patterns from official sources:

### Gemini API Integration (Server-Side API Route)

```typescript
// src/app/api/generate-jd/route.ts
// Source: @google/generative-ai official docs + Next.js API Routes pattern

import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  // Validate environment
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: 'Gemini API key not configured' },
      { status: 500 }
    );
  }

  try {
    // Parse request
    const body = await req.json();
    const { jobTitle, industry, seniority, responsibilities, requirements } = body;

    // Validate inputs
    if (!jobTitle || !industry || !seniority || !responsibilities || !requirements) {
      return NextResponse.json(
        { error: 'Missing required job details' },
        { status: 400 }
      );
    }

    // Build prompt
    const prompt = `You are an expert recruiter writing professional job descriptions. Write a compelling job description for:

Position: ${jobTitle}
Industry: ${industry}
Seniority Level: ${seniority}

Key Responsibilities:
${responsibilities}

Required Qualifications:
${requirements}

Write the job description in a professional format suitable for posting on job boards. Include sections for Role Overview, Key Responsibilities, Required Qualifications, and Nice-to-Haves.`;

    // Call Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ jd: text }, { status: 200 });
  } catch (error) {
    console.error('Gemini API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate job description' },
      { status: 500 }
    );
  }
}
```

### Country Phone Input Component

```typescript
// src/components/tools/CountryPhoneInput.tsx
// Source: react-phone-number-input + libphonenumber-js pattern

'use client';

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface CountryPhoneInputProps {
  value: string;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  required?: boolean;
}

export default function CountryPhoneInput({
  value,
  onChange,
  placeholder = 'Phone number',
  required = false,
}: CountryPhoneInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#1a2332] mb-1">
        Phone number {required && <span className="text-red-500">*</span>}
      </label>
      <PhoneInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        defaultCountry="US"
        required={required}
        className="flex w-full items-center rounded-lg border border-gray-300 px-4 py-2 focus-within:ring-2 focus-within:ring-[#0d8488]"
      />
    </div>
  );
}
```

### Copy-to-Clipboard Button

```typescript
// Reusable pattern for copy-to-clipboard
async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    // Show success message (toast, alert, etc.)
  } catch (err) {
    console.error('Failed to copy:', err);
    // Show error message
  }
}

// Usage in JSX:
<button
  onClick={() => copyToClipboard(generatedJD)}
  className="text-sm text-[#0d8488] hover:text-[#0a6b6e]"
>
  Copy to clipboard
</button>
```

### Sitemap Update

```typescript
// src/app/sitemap.ts
// Add new routes to sitemap

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = getAllPosts();

  const blogPostRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    // ... existing routes
    {
      url: `${BASE_URL}/tools`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tools/job-description-generator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/roi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/compare`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // ... rest of routes
  ];
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Regex-based phone validation | libphonenumber-js library | ~2014 (Google Android project) | Handles 195+ countries, formats, edge cases; industry standard |
| Client-side API keys | Server-side API routes | ~2020 (JAMstack security awareness) | Keys never exposed to browser; rate-limiting possible |
| Single-stage Docker | Multi-stage builds with standalone | ~2019 (Next.js standalone mode) | 10x smaller images; faster deployments; less attack surface |
| Manual domain mapping | Cloud Run domain mapping CLI | ~2022 (Cloud Run managed domains) | No need for manual DNS; gcloud handles DNS verification |
| Environment variables in code | Cloud Run service config + Secrets Manager | ~2023 (GCP best practices) | Separation of code and secrets; rotation possible |

**Deprecated/outdated:**
- `@google/generative-ai` (v0.24.1) — Still stable but marked legacy; newer `@google/genai` v1.48.0 available but requires code migration (consider for Phase 5)
- Client-side Fetch API for Gemini — Always use server-side routes; Gemini Nano (browser-based) is experimental, not production-ready

---

## Open Questions

1. **Gemini model selection (gemini-pro vs gemini-1.5-flash)**
   - What we know: Both available; 1.5-flash is newer, faster, cheaper; pro is stable
   - What's unclear: Token budget and latency requirements for JD generation
   - Recommendation: Start with `gemini-1.5-flash` for speed/cost; switch to pro if quality is insufficient

2. **Video placeholder design** (Claude's Discretion)
   - What we know: Need YouTube/Vimeo iframe + static hero image with play button
   - What's unclear: Hero image source (asset provided? use placeholder?)
   - Recommendation: Create simple gradient + play button icon using Tailwind + lucide-react icons

3. **Comparison page competitor data accuracy**
   - What we know: Need to show Greenhouse vs Lever vs KineticRecruiter
   - What's unclear: Who verifies competitor feature claims? Is there a source of truth?
   - Recommendation: Link to each competitor's pricing page; let visitors verify

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|-------------|-----------|---------|----------|
| Node.js | Build + deployment | ✓ | 20.11+ (from Docker base) | None — required |
| Docker | Containerization | ✓ | 29.2.1 | — (must have for Cloud Run) |
| gcloud CLI | Cloud Run deployment | ✓ | 556.0.0 | None — required |
| GEMINI_API_KEY | JD Generator API route | ✗ (not set yet) | — | Fallback to stub (no generation) |
| npm/pnpm | Package management | ✓ | npm 10.x (via Node) | — (required) |

**Missing dependencies with no fallback:**
- `GEMINI_API_KEY` environment variable — Must be set in Cloud Run service config before deployment. Without it, JD Generator API returns 500 error. User must obtain key from https://aistudio.google.com/apikey

**Missing dependencies with fallback:**
- None identified

**Setup required before Phase 4 execution:**
1. User must create Gemini API key at https://aistudio.google.com/apikey
2. Set it in Cloud Run service config: `gcloud run services update kineticrecruiter-site --set-env-vars GEMINI_API_KEY=xxx`
3. Or, add to `cloudbuild.yaml` deployment step if key is stored in GCP Secrets Manager

---

## Validation Architecture

**Note:** workflow.nyquist_validation is explicitly set to `false` in .planning/config.json. Test validation section is not included per workflow configuration.

---

## Sources

### Primary (HIGH confidence)

- Next.js 16.2.2 official docs — App Router, API routes, streaming, 'use client' directive
- @google/generative-ai (v0.24.1) npm docs — Official Google Gemini SDK for JavaScript/Node.js
- react-phone-number-input npm docs — libphonenumber-js integration, country selector
- Next.js Docker/Cloud Run deployment guide (Feb 2026 update) — Multi-stage Dockerfile, standalone output, Cloud Run integration
- Migration doc (ClaudeCode_NextJS_Migration_CloudRun.md) — Exact Dockerfile, cloudbuild.yaml, domain mapping commands

### Secondary (MEDIUM confidence)

- Multiple authoritative tutorials (DEV Community, Medium, official Google docs) — Confirmed Gemini API + Next.js API routes pattern, error handling, rate limiting
- Croct Blog "Best React phone input libraries 2026" — Verified react-phone-number-input as ecosystem standard; compared with alternatives

### Tertiary (LOW confidence)

- WebSearch results on newer @google/genai v1.48.0 — Confirmed newer version exists but not essential for this phase; can upgrade in Phase 5

---

## Metadata

**Confidence breakdown:**
- **Gemini API integration: HIGH** — Official SDK, multiple authoritative examples, API route pattern established in Phase 1-3
- **Phone selector: HIGH** — react-phone-number-input is ecosystem standard, well-documented
- **Docker/Cloud Run: HIGH** — Migration doc exact; gcloud CLI confirmed present
- **ROI calculator: HIGH** — Pure client-side math; no external dependencies beyond plans.json (already available)
- **Comparison page: HIGH** — No backend required; follows existing Card/Badge component patterns
- **Video placeholder: MEDIUM** — Design is Claude's Discretion; embed pattern is standard but hero image source unclear

**Research date:** 2026-04-09
**Valid until:** 2026-05-09 (30 days; fast-moving for Gemini SDK, stable for Next.js patterns)

**Critical assumption:** GEMINI_API_KEY will be provided by user before deployment. Research assumes key availability; Phase 4 tasks should flag this requirement.

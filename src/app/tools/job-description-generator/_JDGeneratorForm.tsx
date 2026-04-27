'use client';

import { useState } from 'react';
import { Sparkles, Copy, Check, ArrowRight, Lock, Send } from 'lucide-react';

const INDUSTRIES = [
  'Technology', 'Finance', 'Healthcare', 'Retail', 'Education',
  'Manufacturing', 'Media', 'Professional Services', 'Construction',
  'Hospitality', 'Government', 'Mining & Resources', 'Other',
];

const SENIORITY_LEVELS = [
  'Intern', 'Junior', 'Mid-level', 'Senior', 'Lead',
  'Manager', 'Director', 'Executive',
];

const inputClass =
  'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-kinetic-teal focus:border-transparent transition-shadow';

const labelClass = 'block text-sm font-medium text-gray-700 mb-1';

export default function JDGeneratorForm() {
  // Steps: generate → gate → revealed
  const [step, setStep] = useState<'generate' | 'gate' | 'revealed'>('generate');

  // Job details
  const [jobTitle, setJobTitle] = useState('');
  const [industry, setIndustry] = useState('');
  const [seniority, setSeniority] = useState('');
  const [responsibilities, setResponsibilities] = useState('');
  const [requirements, setRequirements] = useState('');

  // Generated output (hidden until gated)
  const [generatedJD, setGeneratedJD] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Lead capture
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [captureError, setCaptureError] = useState('');

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!jobTitle.trim() || !industry || !seniority || !responsibilities.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/generate-jd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobTitle, industry, seniority, responsibilities, requirements }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
      } else {
        setGeneratedJD(data.jd);
        setStep('gate');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    setCaptureError('');

    if (!name.trim() || !email.trim()) {
      setCaptureError('Please enter your name and work email.');
      return;
    }

    setSubmitting(true);
    try {
      await fetch('/api/capture-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, company,
          jobTitle, industry, seniority,
          source: 'jd-generator',
        }),
      });
    } catch {
      // Don't block — lead capture is best-effort
    }
    setSubmitting(false);
    setStep('revealed');
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(generatedJD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function renderJD(text: string) {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h3 key={i} className="text-lg font-semibold text-kinetic-navy mt-5 mb-2">{line.replace('## ', '')}</h3>;
      if (line.startsWith('- ') || line.startsWith('* ')) return <li key={i} className="text-gray-700 text-sm leading-relaxed ml-4">{line.replace(/^[-*] /, '')}</li>;
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="text-gray-700 text-sm leading-relaxed">{line}</p>;
    });
  }

  // ═══════════ STEP 1: Enter job details ═══════════
  if (step === 'generate') {
    return (
      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12 md:py-16">
        <form onSubmit={handleGenerate} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="jobTitle" className={labelClass}>Job Title *</label>
              <input id="jobTitle" type="text" value={jobTitle} onChange={e => setJobTitle(e.target.value)}
                placeholder="Senior Software Engineer" className={inputClass} required />
            </div>
            <div>
              <label htmlFor="seniority" className={labelClass}>Seniority Level *</label>
              <select id="seniority" value={seniority} onChange={e => setSeniority(e.target.value)} className={inputClass} required>
                <option value="">Select level...</option>
                {SENIORITY_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="industry" className={labelClass}>Industry *</label>
            <select id="industry" value={industry} onChange={e => setIndustry(e.target.value)} className={inputClass} required>
              <option value="">Select industry...</option>
              {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="responsibilities" className={labelClass}>Key Responsibilities *</label>
            <textarea id="responsibilities" rows={4} value={responsibilities} onChange={e => setResponsibilities(e.target.value)}
              placeholder="List the main responsibilities of this role..." className={inputClass} required />
          </div>

          <div>
            <label htmlFor="requirements" className={labelClass}>Requirements <span className="text-gray-400 font-normal">(optional)</span></label>
            <textarea id="requirements" rows={3} value={requirements} onChange={e => setRequirements(e.target.value)}
              placeholder="Skills, qualifications, experience required..." className={inputClass} />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-kinetic-teal hover:bg-kinetic-teal-dark text-white font-semibold rounded-lg transition-colors px-6 py-3 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating your job description...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Job Description
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-400">
            Free to use. Powered by AI.
          </p>
        </form>
      </section>
    );
  }

  // ═══════════ STEP 2: JD generated but GATED — must enter details to see it ═══════════
  if (step === 'gate') {
    return (
      <section className="mx-auto max-w-2xl px-4 sm:px-6 py-12 md:py-16">
        {/* Success indicator */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-kinetic-teal/10 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-kinetic-teal" />
          </div>
          <h2 className="text-2xl font-bold text-kinetic-navy mb-2">
            Your job description is ready!
          </h2>
          <p className="text-gray-600">
            Enter your details below to view and copy your AI-generated job description.
          </p>
        </div>

        {/* Blurred preview teaser */}
        <div className="relative mb-8 rounded-xl overflow-hidden">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 select-none" style={{ filter: 'blur(5px)' }} aria-hidden="true">
            <p className="text-gray-700 text-sm leading-relaxed">
              We are looking for a passionate and experienced {seniority} {jobTitle} to join our growing team in the {industry} sector.
              This is an exciting opportunity to make a real impact in a fast-paced environment where your contributions will directly
              shape the future of our products and services. The ideal candidate will bring strong technical skills combined with
              excellent communication abilities and a collaborative mindset...
            </p>
            <p className="text-gray-700 text-sm leading-relaxed mt-3">
              Key Responsibilities include leading technical initiatives, mentoring junior team members, collaborating with
              cross-functional stakeholders, and driving best practices across the engineering organization...
            </p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-xl">
            <div className="flex items-center gap-2 text-kinetic-navy font-semibold">
              <Lock className="w-5 h-5" />
              Enter your details to unlock
            </div>
          </div>
        </div>

        {/* Lead capture form */}
        <form onSubmit={handleUnlock} className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm space-y-4">
          <div>
            <label htmlFor="gate-name" className={labelClass}>Your Name *</label>
            <input
              id="gate-name" type="text" value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Jane Smith" className={inputClass} required
            />
          </div>
          <div>
            <label htmlFor="gate-email" className={labelClass}>Work Email *</label>
            <input
              id="gate-email" type="email" value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="jane@acmerecruiting.com" className={inputClass} required
            />
          </div>
          <div>
            <label htmlFor="gate-company" className={labelClass}>Company <span className="text-gray-400 font-normal">(optional)</span></label>
            <input
              id="gate-company" type="text" value={company}
              onChange={e => setCompany(e.target.value)}
              placeholder="Acme Recruiting" className={inputClass}
            />
          </div>

          {captureError && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">{captureError}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 bg-kinetic-teal hover:bg-kinetic-teal-dark text-white font-semibold rounded-lg transition-colors px-6 py-3 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Unlocking...' : (
              <>
                <Send className="w-4 h-4" />
                View My Job Description
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-400">
            We&apos;ll also send you a copy by email. No spam, ever.
          </p>
        </form>
      </section>
    );
  }

  // ═══════════ STEP 3: JD revealed ═══════════
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12 md:py-16">
      <div className="border border-kinetic-teal/20 bg-kinetic-teal-light/30 rounded-xl p-5 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-kinetic-navy flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-kinetic-teal" />
            Your Job Description
          </h2>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-kinetic-teal hover:text-kinetic-teal-dark border border-kinetic-teal/30 rounded-lg px-3 py-1.5 transition-colors"
          >
            {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy</>}
          </button>
        </div>
        <div className="prose prose-sm max-w-none">{renderJD(generatedJD)}</div>
      </div>

      <div className="mt-8 bg-kinetic-navy rounded-xl p-6 md:p-8 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Like what you see?</h3>
        <p className="text-gray-300 text-sm mb-6 max-w-md mx-auto">
          KineticRecruiter does this and much more — AI candidate matching, scoring with full breakdowns, and client-ready submissions. All included.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://app.kineticrecruiter.com/register"
            data-cta="tool-jd-generator"
            className="inline-flex items-center justify-center gap-2 bg-kinetic-teal hover:bg-kinetic-teal-dark text-white font-semibold rounded-lg px-6 py-3 transition-colors"
          >
            Start Free Trial <ArrowRight className="w-4 h-4" />
          </a>
          <button
            onClick={() => { setStep('generate'); setGeneratedJD(''); }}
            className="inline-flex items-center justify-center text-white/70 hover:text-white font-medium text-sm transition-colors"
          >
            Generate another JD
          </button>
        </div>
      </div>
    </section>
  );
}

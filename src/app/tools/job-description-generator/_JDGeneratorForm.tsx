'use client';

import { useState } from 'react';
import { Sparkles, Copy, Check, ArrowRight, Send } from 'lucide-react';

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
  // Step management
  const [step, setStep] = useState<'generate' | 'result' | 'capture'>('generate');

  // Job details (step 1)
  const [jobTitle, setJobTitle] = useState('');
  const [industry, setIndustry] = useState('');
  const [seniority, setSeniority] = useState('');
  const [responsibilities, setResponsibilities] = useState('');
  const [requirements, setRequirements] = useState('');

  // Generated output
  const [generatedJD, setGeneratedJD] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Contact capture (step 2)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
        setStep('result');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(generatedJD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleCapture(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

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
      setSubmitted(true);
    } catch {
      // Still show success — don't block the user experience for a lead capture failure
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  function renderJD(text: string) {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) {
        return <h3 key={i} className="text-lg font-semibold text-kinetic-navy mt-5 mb-2">{line.replace('## ', '')}</h3>;
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return <li key={i} className="text-gray-700 text-sm leading-relaxed ml-4">{line.replace(/^[-*] /, '')}</li>;
      }
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="text-gray-700 text-sm leading-relaxed">{line}</p>;
    });
  }

  // ═══════════ STEP 1: Generate ═══════════
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
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Job Description
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-400">
            Free to use. No login required. Powered by AI.
          </p>
        </form>
      </section>
    );
  }

  // ═══════════ STEP 2: Result + Lead Capture ═══════════
  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left: Generated JD (takes 3/5) */}
        <div className="lg:col-span-3">
          <div className="border border-kinetic-teal/20 bg-kinetic-teal-light/30 rounded-xl p-5 md:p-6">
            <div className="flex items-center justify-between mb-4">
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

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => { setStep('generate'); setGeneratedJD(''); }}
              className="text-sm font-medium text-gray-500 hover:text-kinetic-navy transition-colors"
            >
              &larr; Generate another
            </button>
          </div>
        </div>

        {/* Right: Lead capture (takes 2/5) */}
        <div className="lg:col-span-2">
          {!submitted ? (
            <div className="bg-kinetic-navy rounded-xl p-6 text-white sticky top-24">
              <h3 className="text-lg font-bold mb-2">Want more AI-powered tools?</h3>
              <p className="text-sm text-gray-300 mb-6">
                Get a free walkthrough of KineticRecruiter&apos;s full AI suite — semantic search, match scoring, career highlights, and more.
              </p>
              <form onSubmit={handleCapture} className="space-y-3">
                <div>
                  <input
                    type="text" placeholder="Your name *" value={name}
                    onChange={e => setName(e.target.value)} required
                    className="w-full px-3 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-kinetic-teal focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="email" placeholder="Work email *" value={email}
                    onChange={e => setEmail(e.target.value)} required
                    className="w-full px-3 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-kinetic-teal focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="text" placeholder="Company (optional)" value={company}
                    onChange={e => setCompany(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-kinetic-teal focus:border-transparent"
                  />
                </div>
                <button
                  type="submit" disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-kinetic-teal hover:bg-kinetic-teal-dark text-white font-semibold rounded-lg transition-colors px-5 py-2.5 disabled:opacity-60"
                >
                  {submitting ? 'Sending...' : <><Send className="w-4 h-4" /> Get a Free Demo</>}
                </button>
              </form>
              <p className="text-[10px] text-gray-500 mt-3 text-center">No spam. We&apos;ll reach out with a personalised demo link.</p>
            </div>
          ) : (
            <div className="bg-kinetic-teal-light rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-kinetic-teal/10 flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-kinetic-teal" />
              </div>
              <h3 className="text-lg font-bold text-kinetic-navy mb-2">Thanks, {name.split(' ')[0]}!</h3>
              <p className="text-sm text-gray-600 mb-4">
                We&apos;ll send you a personalised demo link shortly.
              </p>
              <a
                href="https://app.kineticrecruiter.com/register"
                className="inline-flex items-center gap-2 text-sm font-semibold text-kinetic-teal hover:text-kinetic-teal-dark"
              >
                Or start your free trial now <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

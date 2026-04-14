'use client';

import { useState } from 'react';
import { isValidPhoneNumber } from 'libphonenumber-js';
import CountryPhoneInput from '@/components/tools/CountryPhoneInput';


interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  jobTitle: string;
  industry: string;
  seniority: string;
  responsibilities: string;
  requirements: string;
}

const INDUSTRIES = [
  'Technology',
  'Finance',
  'Healthcare',
  'Retail',
  'Education',
  'Manufacturing',
  'Media',
  'Professional Services',
  'Other',
];

const SENIORITY_LEVELS = [
  'Intern',
  'Junior',
  'Mid-level',
  'Senior',
  'Lead',
  'Manager',
  'Director',
  'Executive',
];

const inputClass =
  'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-kinetic-teal focus:border-transparent';

const labelClass = 'block text-sm font-medium text-gray-700 mb-1';

export default function JDGeneratorForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    company: '',
    email: '',
    phone: '',
    jobTitle: '',
    industry: '',
    seniority: '',
    responsibilities: '',
    requirements: '',
  });

  const [generatedJD, setGeneratedJD] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [copied, setCopied] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFieldError('');
    setErrorMessage('');

    // Validate all fields
    const { name, company, email, phone, jobTitle, industry, seniority, responsibilities, requirements } = form;
    if (!name.trim() || !company.trim() || !email.trim() || !jobTitle.trim() || !industry || !seniority || !responsibilities.trim() || !requirements.trim()) {
      setFieldError('Please fill in all fields before generating.');
      return;
    }
    if (!phone || !isValidPhoneNumber(phone)) {
      setFieldError('Please enter a valid phone number.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/generate-jd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, email, phone, jobTitle, industry, seniority, responsibilities, requirements }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      } else {
        setGeneratedJD(data.jd);
      }
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(generatedJD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function renderJD(text: string) {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) {
        return (
          <h3 key={i} className="text-lg font-semibold text-kinetic-navy mt-4 mb-2">
            {line.replace('## ', '')}
          </h3>
        );
      }
      if (line.trim() === '') return <br key={i} />;
      return (
        <p key={i} className="text-gray-700 text-sm leading-relaxed">
          {line}
        </p>
      );
    });
  }

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Left: Form */}
        <div>
          <form onSubmit={handleSubmit} noValidate>
            {/* Lead capture */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-kinetic-navy mb-4">Your Information</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className={labelClass}>Full Name *</label>
                  <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Jane Smith" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="company" className={labelClass}>Company Name *</label>
                  <input id="company" name="company" type="text" required value={form.company} onChange={handleChange} placeholder="Acme Recruiting" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>Email Address *</label>
                  <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="jane@acmerecruiting.com" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Phone Number *</label>
                  <CountryPhoneInput
                    value={form.phone}
                    onChange={(value) => setForm((prev) => ({ ...prev, phone: value ?? '' }))}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Job details */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-kinetic-navy mb-4">Job Details</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="jobTitle" className={labelClass}>Job Title *</label>
                  <input id="jobTitle" name="jobTitle" type="text" required value={form.jobTitle} onChange={handleChange} placeholder="Senior Software Engineer" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="industry" className={labelClass}>Industry *</label>
                  <select id="industry" name="industry" required value={form.industry} onChange={handleChange} className={inputClass}>
                    <option value="">Select industry...</option>
                    {INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="seniority" className={labelClass}>Seniority Level *</label>
                  <select id="seniority" name="seniority" required value={form.seniority} onChange={handleChange} className={inputClass}>
                    <option value="">Select level...</option>
                    {SENIORITY_LEVELS.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="responsibilities" className={labelClass}>Key Responsibilities *</label>
                  <textarea id="responsibilities" name="responsibilities" rows={5} required value={form.responsibilities} onChange={handleChange} placeholder="List the main responsibilities of this role..." className={inputClass} />
                </div>
                <div>
                  <label htmlFor="requirements" className={labelClass}>Requirements *</label>
                  <textarea id="requirements" name="requirements" rows={5} required value={form.requirements} onChange={handleChange} placeholder="List skills, qualifications, and experience required..." className={inputClass} />
                </div>
              </div>
            </div>

            {fieldError && (
              <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">{fieldError}</p>
            )}
            {errorMessage && (
              <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full inline-flex items-center justify-center bg-kinetic-teal hover:bg-kinetic-teal-dark text-white font-semibold rounded-lg transition-colors px-5 py-2.5 disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {loading ? 'Generating...' : 'Generate Job Description'}
            </button>
          </form>
        </div>

        {/* Right: Output */}
        <div>
          {generatedJD ? (
            <div className="border-2 border-kinetic-teal bg-kinetic-teal-light rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-kinetic-navy">Generated Job Description</h2>
                <button
                  onClick={handleCopy}
                  className="text-sm font-medium text-kinetic-teal hover:text-kinetic-teal-dark border border-kinetic-teal rounded-lg px-3 py-1.5 transition-colors"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="prose prose-sm max-w-none">{renderJD(generatedJD)}</div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 text-center px-8">
              <div className="w-16 h-16 rounded-full bg-kinetic-teal-light flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-kinetic-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500 text-sm">Fill in your details and job information, then click <strong>Generate Job Description</strong> to get your AI-powered JD.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

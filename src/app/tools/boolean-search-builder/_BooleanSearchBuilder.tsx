'use client';

import { useMemo, useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';

type Platform = 'linkedin' | 'xray' | 'generic' | 'github';

const PLATFORM_LABELS: Record<Platform, string> = {
  linkedin: 'LinkedIn (in-platform)',
  xray: 'Google X-Ray (site:linkedin.com/in)',
  generic: 'Generic (Seek, Indeed, job boards)',
  github: 'GitHub users search',
};

function splitTerms(raw: string): string[] {
  return raw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

function quoteIfPhrase(t: string): string {
  return t.includes(' ') ? `"${t}"` : t;
}

function buildOrGroup(terms: string[]): string {
  if (terms.length === 0) return '';
  if (terms.length === 1) return quoteIfPhrase(terms[0]);
  return `(${terms.map(quoteIfPhrase).join(' OR ')})`;
}

function buildString({
  platform,
  title,
  mustHave,
  niceToHave,
  location,
  exclude,
}: {
  platform: Platform;
  title: string;
  mustHave: string;
  niceToHave: string;
  location: string;
  exclude: string;
}): string {
  const titleTerms = splitTerms(title);
  const mustTerms = splitTerms(mustHave);
  const niceTerms = splitTerms(niceToHave);
  const locationTerms = splitTerms(location);
  const excludeTerms = splitTerms(exclude);

  const parts: string[] = [];

  if (titleTerms.length) parts.push(buildOrGroup(titleTerms));
  mustTerms.forEach((t) => parts.push(quoteIfPhrase(t)));
  if (niceTerms.length) parts.push(buildOrGroup(niceTerms));
  if (locationTerms.length) parts.push(buildOrGroup(locationTerms));
  excludeTerms.forEach((t) => parts.push(`NOT ${quoteIfPhrase(t)}`));

  const core = parts.join(' AND ').replace(/ AND NOT /g, ' NOT ');

  if (platform === 'xray') return `site:linkedin.com/in ${core}`.trim();
  if (platform === 'github') return `site:github.com ${core}`.trim();
  return core;
}

function buildSearchUrl(platform: Platform, q: string): string | null {
  if (!q) return null;
  const enc = encodeURIComponent(q);
  if (platform === 'linkedin') return `https://www.linkedin.com/search/results/people/?keywords=${enc}`;
  if (platform === 'xray' || platform === 'github') return `https://www.google.com/search?q=${enc}`;
  return null;
}

export default function BooleanSearchBuilder() {
  const [platform, setPlatform] = useState<Platform>('linkedin');
  const [title, setTitle] = useState('product manager, product owner');
  const [mustHave, setMustHave] = useState('SaaS, B2B');
  const [niceToHave, setNiceToHave] = useState('fintech, healthtech');
  const [location, setLocation] = useState('Sydney, Melbourne');
  const [exclude, setExclude] = useState('junior, intern');
  const [copied, setCopied] = useState(false);

  const booleanString = useMemo(
    () => buildString({ platform, title, mustHave, niceToHave, location, exclude }),
    [platform, title, mustHave, niceToHave, location, exclude]
  );

  const searchUrl = buildSearchUrl(platform, booleanString);

  const copy = async () => {
    if (!booleanString) return;
    try {
      await navigator.clipboard.writeText(booleanString);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard may be unavailable — silent fail */
    }
  };

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-12">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-kinetic-navy mb-2">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Platform)}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-kinetic-navy focus:border-kinetic-teal focus:outline-none"
            >
              {(Object.keys(PLATFORM_LABELS) as Platform[]).map((p) => (
                <option key={p} value={p}>{PLATFORM_LABELS[p]}</option>
              ))}
            </select>
          </div>

          <Field
            label="Job titles (comma-separated, OR)"
            placeholder="product manager, product owner, PM"
            value={title}
            onChange={setTitle}
            hint="Treated as alternatives — matches any one."
          />

          <Field
            label="Must-have skills (all required, AND)"
            placeholder="SaaS, B2B, analytics"
            value={mustHave}
            onChange={setMustHave}
            hint="Every candidate must match all of these."
          />

          <Field
            label="Nice-to-have (any, OR)"
            placeholder="fintech, healthtech, marketplace"
            value={niceToHave}
            onChange={setNiceToHave}
            hint="Matches any one — boosts breadth."
          />

          <Field
            label="Location(s) (OR)"
            placeholder="Sydney, Melbourne, Brisbane"
            value={location}
            onChange={setLocation}
          />

          <Field
            label="Exclude (NOT)"
            placeholder="junior, intern, graduate"
            value={exclude}
            onChange={setExclude}
            hint="Removes candidates matching these terms."
          />
        </div>

        {/* Output */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-200">
              <p className="text-sm font-semibold text-kinetic-navy">Your Boolean string</p>
              <button
                onClick={copy}
                disabled={!booleanString}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md bg-white border border-gray-200 text-kinetic-navy hover:border-kinetic-teal hover:text-kinetic-teal transition-colors disabled:opacity-50"
              >
                {copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
              </button>
            </div>
            <pre className="p-5 text-sm text-kinetic-navy whitespace-pre-wrap break-words font-mono min-h-[120px]">
              {booleanString || <span className="text-gray-400 font-sans">Fill in the form to build your string.</span>}
            </pre>
          </div>

          {searchUrl && (
            <a
              href={searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-kinetic-teal hover:text-kinetic-teal-dark transition-colors"
            >
              Open search in a new tab
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          <div className="mt-6 rounded-xl bg-kinetic-teal-light/50 border border-kinetic-teal/20 p-5">
            <p className="text-sm text-kinetic-navy font-semibold mb-2">
              Tired of Boolean strings altogether?
            </p>
            <p className="text-sm text-gray-700 mb-4">
              KineticRecruiter uses semantic search — describe the candidate in plain English and get ranked matches with explainable scores.
            </p>
            <a
              href="https://app.kineticrecruiter.com/register"
              data-cta="boolean-tool"
              className="inline-flex items-center text-sm font-semibold text-kinetic-teal hover:text-kinetic-teal-dark transition-colors"
            >
              Try semantic search free →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-kinetic-navy mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-kinetic-navy placeholder-gray-400 focus:border-kinetic-teal focus:outline-none"
      />
      {hint && <p className="text-xs text-gray-500 mt-1.5">{hint}</p>}
    </div>
  );
}

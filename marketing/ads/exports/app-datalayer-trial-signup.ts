/**
 * Drop-in dataLayer push for trial_signup.
 *
 * Goal: fire ONCE, at the moment the user's trial account is created and
 * verified. Everything downstream (Google Ads conversion, Meta
 * CompleteRegistration, TikTok CompleteRegistration, GA4 event) keys off
 * this single event via the GTM container we're importing.
 *
 * Where to call it:
 *   - Ideally on the /welcome page, inside a useEffect that runs once.
 *   - Fallback: directly in the register-success handler after the
 *     backend confirms the user is created.
 *
 * Requirements before calling:
 *   - The GTM container must be installed site-wide (see site-gtm-snippet.html).
 *   - `user.id`, `user.email`, `user.selectedPlan` must be available.
 *   - `crypto.subtle` is available in all modern browsers over HTTPS.
 *
 * Deduplication:
 *   - An `event_id` (UUID v4) is generated and included. If you add Meta CAPI
 *     server-side later, pass the same event_id from your backend and Meta
 *     will dedupe client + server automatically.
 */

type Plan = 'starter' | 'professional' | 'agency';

const PLAN_LTV_ESTIMATE_USD: Record<Plan, number> = {
  starter: 35,
  professional: 70,
  agency: 120,
};

/**
 * SHA-256 hash an email for Enhanced Conversions + Advanced Matching.
 * Lowercase + trim to match Google/Meta hashing conventions.
 */
async function sha256(input: string): Promise<string> {
  const normalized = input.trim().toLowerCase();
  const buffer = new TextEncoder().encode(normalized);
  const hash = await crypto.subtle.digest('SHA-256', buffer);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function uuidv4(): string {
  // Prefer native crypto.randomUUID when available
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  // Fallback for older environments
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export interface TrialSignupUser {
  id: string;
  email: string;
  selectedPlan: Plan;
}

/**
 * Call exactly once per trial signup.
 * Safe to await — the push itself is synchronous; only the hash is async.
 */
export async function pushTrialSignup(user: TrialSignupUser): Promise<void> {
  if (typeof window === 'undefined') return; // server-safe no-op

  const w = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
  w.dataLayer = w.dataLayer || [];

  const email_sha256 = await sha256(user.email);

  w.dataLayer.push({
    event: 'trial_signup',
    event_id: uuidv4(),
    plan: user.selectedPlan,
    user_id: user.id,
    email_sha256,
    value: PLAN_LTV_ESTIMATE_USD[user.selectedPlan],
    currency: 'USD',
  });
}

/* ------------------------------------------------------------ */
/* Usage example — Next.js App Router welcome page              */
/* ------------------------------------------------------------ */

/*
// app/welcome/page.tsx
'use client';

import { useEffect, useRef } from 'react';
import { pushTrialSignup } from '@/lib/analytics/trial-signup';
import { getCurrentUser } from '@/lib/auth';

export default function WelcomePage() {
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;

    (async () => {
      const user = await getCurrentUser();
      if (!user) return;
      await pushTrialSignup({
        id: user.id,
        email: user.email,
        selectedPlan: user.selectedPlan,
      });
    })();
  }, []);

  return <div>Welcome to KineticRecruiter!</div>;
}
*/

/* ------------------------------------------------------------ */
/* Test-fire helper — paste in browser console to verify        */
/* ------------------------------------------------------------ */

/*
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'trial_signup',
  event_id: 'test-' + Date.now(),
  plan: 'professional',
  user_id: 'test-user-id',
  email_sha256: '0000000000000000000000000000000000000000000000000000000000000000',
  value: 70,
  currency: 'USD',
});

// Expected:
//  - GA4 DebugView shows 'trial_signup' event
//  - Google Ads Conversion diagnostics shows a fire
//  - Meta Events Manager > Test Events shows CompleteRegistration
//  - TikTok Events Manager > Test Events shows CompleteRegistration
*/

# app.kineticrecruiter.com — Tracking Handoff

**Audience:** dev who owns `app.kineticrecruiter.com` (the registration / dashboard codebase).
**Why now:** the marketing site (`kineticrecruiter.com`) is live with full GTM + conversion infrastructure. None of it produces a useful signal until the app subdomain pushes a `trial_signup` event to the dataLayer at register success. Until that ships, paid-ad conversion tracking is dark.
**Estimated effort:** 30-60 minutes.

---

## TL;DR — three things to ship

1. **Install GTM container `GTM-TD2ZCRRV`** in the app's HTML head + body (same container the marketing site uses — do NOT create a new one).
2. **Push a `trial_signup` event to `window.dataLayer`** in your register-success handler. The exact payload is in the file `trial-signup.ts` delivered alongside this doc.
3. **Run the verification checklist** at the bottom and confirm Meta Test Events shows Match Quality ≥7 before paid ads launch.

Do not deploy anything else from the marketing-site repo into the app — they are intentionally separate codebases. Only the GTM snippet and the dataLayer push cross over.

---

## Step 1 — Install GTM `GTM-TD2ZCRRV`

The container is shared between marketing site and app. Same install snippets as the marketing site uses.

**In the `<head>` (loads asynchronously, non-blocking):**

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TD2ZCRRV');</script>
<!-- End Google Tag Manager -->
```

**Immediately after `<body>` opens (noscript fallback):**

```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TD2ZCRRV"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

**Notes:**
- This must load on every authenticated and unauthenticated page in the app — at minimum `/register`. Ideally global, so logged-in user actions can be measured later.
- Do NOT also load `gtag.js` directly — GTM container `GTM-TD2ZCRRV` already includes the GA4 tag. Two loaders = double-counted page views.
- If your stack uses Next.js, prefer `next/script` with `strategy="afterInteractive"` (matches the marketing site's pattern in `src/app/layout.tsx`).
- If your stack uses something else (Remix, Vite + React Router, plain Next.js Pages Router, Vue, etc.), inject via whatever your global head/layout mechanism is.

---

## Step 2 — Wire the `trial_signup` dataLayer push

The exact code is in `trial-signup.ts` (delivered separately). Drop it into your codebase and import it from your register-success handler:

```typescript
import { pushTrialSignup } from '@/lib/analytics/trial-signup';

// after the user's account is created and they're authenticated:
await pushTrialSignup({ plan: signupPlan, user: newUser });
```

### Why each field in `trial-signup.ts` matters

The file is opinionated for two reasons that are non-obvious:

1. **GTM is case-sensitive on dataLayer keys.** GTM Data Layer Variables in our container read lowercase keys: `plan`, `event_id`, `user_id`. If the push uses camelCase or PascalCase, GTM passes `undefined` to Meta and Google Ads — silent failure, no error, just bad data. The file uses lowercase. Don't rename them.

2. **Meta CAPI Match Quality is the difference between paid ads converting profitably or not.** With email-only, Meta scores Match Quality 4-5. With email + phone + first/last name (all SHA-256 hashed) + `_fbp` + `_fbc` cookies, it climbs to 7-9. That's roughly the difference between a $35 CPA and a $90 CPA on the same campaign. The file captures every available identifier, hashes the PII client-side, and reads `_fbp`/`_fbc` off `document.cookie`. Do not strip any of these — even if the user signs up without entering a phone number, the file handles missing fields gracefully.

### Click IDs flow in via URL params

The marketing site appends paid-click IDs (`gclid`, `fbclid`, `msclkid`, `ttclid`, `gbraid`, `wbraid`, `li_fat_id`) and `utm_*` params to every CTA pointing at `app.kineticrecruiter.com`. They arrive as URL query params on `/register`. The file reads them off `window.location.search` and includes them in the push so Enhanced Conversions / CAPI can attribute the signup back to the originating click.

If your `/register` flow involves a multi-step form or OAuth redirect that strips the URL, capture the params on the FIRST request to `/register` (server-side or client-side localStorage) and replay them into `pushTrialSignup` at success time. Do not let `OAuth → callback → success` lose them.

---

## Step 3 — Verification checklist

Once both steps above are deployed to production, run this end-to-end. **All four must pass before any paid-ad spend begins.**

### Pre-test setup

- Open Chrome DevTools → Application → Storage → Cookies; clear cookies for `app.kineticrecruiter.com` and `kineticrecruiter.com`
- Install [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc) Chrome extension
- Open in incognito (clean session)

### The test flow

1. Visit `https://kineticrecruiter.com/?gclid=test_signup_check_$(timestamp)&utm_source=google&utm_medium=cpc&utm_campaign=qa-test`
2. Click any "Start Free Trial" button (e.g., the hero)
3. **Confirm you arrive at `https://app.kineticrecruiter.com/register?gclid=test_signup_check_...&utm_source=...`** with the params intact. If they're stripped, the marketing-side `ClickIdCapture.tsx` isn't doing its job — flag back to whoever owns the marketing site.
4. Complete signup with a throwaway email (e.g., `qa+$(date)@kineticrecruiter.com`)
5. Within 30 seconds, check each:

| Check | Where to look | Pass condition |
|---|---|---|
| GA4 saw the event | GA4 → Reports → Realtime → Events | `trial_signup` event listed with params plan, value=70, currency=USD |
| Meta CAPI got it with high MQ | Events Manager → Pixel → Test Events | `CompleteRegistration` event, **Match Quality ≥7** |
| Google Ads conversion is recording | Google Ads → Tools → Conversions → Trial Signup | Status = "Recording" (may take up to 24h to flip from "No recent conversions") |
| TikTok pixel fired | TikTok Events Manager → Test Events | `CompleteRegistration` listed |

### If Match Quality lands below 7

The most common cause is that one of the hashed identifiers wasn't actually hashed. Check the dataLayer payload (DevTools console: `window.dataLayer`) and confirm `email_sha256`, `phone_sha256`, `first_name_sha256`, `last_name_sha256` all look like 64-character hex strings — NOT raw email addresses. SHA-256 hashing happens client-side in `pushTrialSignup`; if the function received the values BEFORE hashing in some branch (e.g. server-rendered fallback), they'd land in Meta as cleartext, which Meta then can't match.

Second-most-common cause: `_fbp` cookie isn't set. That happens when the GTM Meta Pixel Base tag never fired on a previous page (because GTM didn't load on the app subdomain). Fix Step 1.

---

## Hard NOs — don't do these

- **Don't create a separate Meta Pixel** for the app. Use Pixel ID `2531875870548790` via the shared GTM container.
- **Don't load `gtag.js` directly** for GA4. The GTM container has the GA4 tag.
- **Don't import any code from the marketing-site repo** other than the GTM install pattern + `trial-signup.ts`. The marketing site has its own design system, layout, and Click-ID-capture component — none of it transfers cleanly.
- **Don't strip URL params on the way to `/register`.** OAuth callbacks, server redirects, middleware rewrites — all common places for `?gclid=...` to get dropped. If your stack does any of these, you must explicitly preserve the query string.

---

## Reference IDs (read-only)

Already configured on the marketing side. The app dev should not need to recreate any of these.

| Asset | ID |
|---|---|
| GTM Container | `GTM-TD2ZCRRV` |
| GA4 Measurement ID | `G-3TJGZ1PEJ4` |
| Meta Pixel ID | `2531875870548790` |
| TikTok Pixel ID | `D7NCHIJC77U9KU0AEQGG` |
| Google Ads Conversion ID | `861324145` |
| Google Ads Conversion Label | `IeVtCJqJ9aMcEPGG25oD` |

---

## Questions / blockers

If anything in `trial-signup.ts` looks wrong, or your stack makes one of the steps non-trivial (e.g., your register handler is a server action with no client context), reply with what you'd need to change and we'll adjust. Better to call it out before deploy than to ship a silent-failure dataLayer push.

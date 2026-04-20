# Tracking Setup

**Philosophy:** Ship it before ads launch. Broken tracking is worse than no tracking because it looks like data.
**Primary event:** `trial_signup` — fires once, on register success redirect.
**Recommended stack:** GTM (client) + Stape.io (server) + GA4 + platform-native pixels.

---

## 1. Accounts to Create (Day 1)

| System | Why | Access needed |
|---|---|---|
| Google Analytics 4 | Canonical conversion source-of-truth | Admin on property + linked Search Console |
| Google Tag Manager | Client-side tag container | Publisher access |
| Google Ads | Conversion tracking + bidding | Admin |
| Meta Business Manager | Ad account + Pixel + CAPI | Admin |
| Meta Events Manager | Pixel + CAPI setup | Admin |
| TikTok Ads Manager | Pixel + Events API + Spark authorization | Admin |
| LinkedIn Campaign Manager | Insight Tag (audience building only) | Campaign Manager |
| Stape.io (recommended) | Server-side GTM container, CAPI bridge | Admin |

---

## 2. Domain and Cross-Domain Tracking

KineticRecruiter runs two domains:
- `kineticrecruiter.com` — marketing site (this repo)
- `app.kineticrecruiter.com` — product app (separate repo, assumed Next.js)

Both must be instrumented, and GA4/Pixel must treat them as one user journey.

### GA4 cross-domain
- Add both domains to Admin → Data Streams → Configure Tag Settings → Configure your domains.
- Ensures `_ga` cookie propagates and the signup on app.* is attributed to the ad click on the marketing site.

### Meta Pixel cross-domain
- Install same pixel ID on both domains.
- Verify domain in Meta Business Manager for `kineticrecruiter.com` (primary) and separately for `app.kineticrecruiter.com`.
- For iOS 14+ events, configure `CompleteRegistration` with `kineticrecruiter.com` as the event-sending domain, AEM priority #1.

### URL parameter forwarding
When a user clicks a CTA that redirects from `kineticrecruiter.com` → `app.kineticrecruiter.com/register`, forward:
- `fbclid` (Meta click ID)
- `gclid` (Google click ID)
- `ttclid` (TikTok click ID)
- `msclkid` (Microsoft, future)
- `_ga` cookie or `gclid` to bridge GA4 sessions

Server-side CAPI will consume these click IDs on the signup event for deduplication.

---

## 3. Event Taxonomy

All events fire on `kineticrecruiter.com` OR `app.kineticrecruiter.com` as noted.

| Event name | Trigger | Domain | Parameters | Destinations |
|---|---|---|---|---|
| `page_view` | Every pageload | Both | default | GA4 |
| `view_pricing` | `/pricing` view | Marketing | `page_path` | GA4, Meta (`ViewContent`), Google Ads |
| `view_features` | Any `/features/*` view | Marketing | `feature_slug` | GA4 |
| `view_solutions` | Any `/solutions/*` view | Marketing | `solution_slug` | GA4 |
| `start_trial_click` | Click on any "Start Free Trial" button | Marketing | `plan`, `location` | GA4, Meta (`InitiateCheckout`) |
| `trial_signup` | Register success (email verified) | App | `plan`, `email_hash`, `user_id` | GA4, Google Ads (Primary conversion), Meta (`CompleteRegistration`), TikTok, LinkedIn |
| `purchase` | Stripe webhook `invoice.paid` (first paid month) | Server | `plan`, `value_usd`, `user_id`, `gclid`, `fbclid` | Google Ads (Secondary conversion), Meta (`Purchase`) |
| `demo_request` | Contact form submit on `/contact?plan=agency` | Marketing | `plan` | GA4, Google Ads (Secondary conversion) |

**Naming:** snake_case, aligned with GA4 convention. Meta standard events mapped server-side (`CompleteRegistration`, `Purchase`, `ViewContent`, `InitiateCheckout`).

---

## 4. Client-Side (GTM) Setup

### Variables (GTM)

| Variable | Type | Value / config |
|---|---|---|
| `GA4 Measurement ID` | Constant | `G-XXXXXXXXXX` |
| `Google Ads Conversion ID` | Constant | `AW-XXXXXXXXXX` |
| `Meta Pixel ID` | Constant | `XXXXXXXXXXXXXXX` |
| `TikTok Pixel ID` | Constant | `XXXXXXXXXXXXXXX` |
| `LinkedIn Partner ID` | Constant | `XXXXXXX` |
| `GCLID` | URL | query param `gclid`, default cookie-stored 90d |
| `FBCLID` | URL | query param `fbclid`, default cookie-stored 90d |
| `TTCLID` | URL | query param `ttclid`, default cookie-stored 90d |
| `Email Hash (SHA-256)` | Custom JS | hashes email input on signup form for Enhanced Conversions |
| `Plan` | Data Layer | `plan` from dataLayer push on CTA click |

### Tags (GTM)

1. **GA4 Configuration** — fires on All Pages
2. **GA4 Event — trial_signup** — fires on signup success event (see trigger)
3. **Google Ads Conversion — Trial Signup** — fires on signup success, includes Enhanced Conversions with email hash
4. **Meta Pixel Base** — All Pages
5. **Meta Pixel Event — CompleteRegistration** — on signup success, pass email/phone/external_id (hashed) for Advanced Matching
6. **TikTok Pixel Base** — All Pages
7. **TikTok Pixel — CompleteRegistration** — on signup success
8. **LinkedIn Insight Tag** — All Pages
9. **Google Ads Conversion — Purchase** — fires on purchase event (fired server-side normally, but client-side fallback if not using Stape)

### Triggers (GTM)

- **Signup success:** Custom event `trial_signup` OR URL path contains `/welcome` or `/onboarding` AND first-time view
- **View pricing:** Page path equals `/pricing`
- **Start trial click:** Click on element matching CSS `[data-track="start-trial"]` or `a[href*="/register"]`

### Data Layer pushes (in app code)

Add to the app codebase at register success:

```javascript
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'trial_signup',
  plan: user.selectedPlan,           // 'starter' | 'professional' | 'agency'
  user_id: user.id,
  email_sha256: sha256(user.email),   // hashed client-side for Enhanced Conversions
  value: planLTVEstimate[plan],       // optional, for ROAS bidding later
  currency: 'USD',
});
```

Same pattern for `purchase` on Stripe webhook response.

---

## 5. Server-Side (Stape.io) Setup

Why Stape: saves 2-3 days of custom Node/Python server work. Handles CAPI, Events API, and Enhanced Conversions with pre-built templates. $20/mo tier is sufficient for <100k events/mo.

### Stape container structure

```
sgtm.kineticrecruiter.com (subdomain → Stape)
├── GA4 Client
├── Meta CAPI Tag
│   └── Event: CompleteRegistration
│   └── Event: Purchase
├── TikTok Events API Tag
│   └── Event: CompleteRegistration
│   └── Event: Purchase
└── Google Ads Enhanced Conversions Tag
    └── Primary: trial_signup
```

### What to send server-side vs client-side

| Event | Client (GTM) | Server (Stape) | Why |
|---|---|---|---|
| `page_view` | ✅ | ❌ | Client is fine, low iOS impact |
| `view_pricing` | ✅ | ❌ | Engagement only |
| `trial_signup` | ✅ | ✅ (dedup) | Critical event, needs iOS recovery |
| `purchase` | ❌ | ✅ | Server-only — Stripe webhook source |

**Deduplication:** Both client and server send `trial_signup` with the same `event_id` (UUID generated at signup). Meta/Google dedupe by event_id, so double-counts don't happen.

---

## 6. Platform-Specific Conversion Setup

### Google Ads

1. Conversions → New conversion action → Website → Category "Sign-up"
2. Name: `Trial Signup`
3. Value: "Use the same value for each conversion" — set to $70 (assumed LTV per trial)
4. Count: **One** (important — "every" would double-count)
5. Click-through conversion window: 30 days
6. Attribution model: Data-driven (Google default)
7. Include in "Conversions" column: **Yes** (bidding uses this)
8. Enhanced conversions: enable, source = Global site tag, provide email + phone hashed

Import conversion from GA4 is an alternative, but only use if you have it working AND you're not already sending via gtag. Pick one source to prevent duplication.

### Meta

1. Events Manager → Pixel → Aggregated Event Measurement
2. Prioritize events for iOS 14+:
   - Priority 1: `CompleteRegistration` (trial_signup)
   - Priority 2: `ViewContent` (pricing view)
   - Priority 3: `InitiateCheckout` (start trial click)
   - Priority 4: `Purchase` (reserved for paid conversion)
3. Pixel Setup → Domain verification for `kineticrecruiter.com`
4. CAPI: connect via Stape integration or Commerce Manager → Events Manager → Conversions API → Generate access token → paste into Stape

**Match quality target:** Event Match Quality (EMQ) score ≥7 per event. Requires passing: email (hashed), phone (hashed if available), external_id (user_id hashed), fbp cookie, fbc cookie, user_agent, IP (server-side only).

### TikTok

1. TikTok Ads Manager → Assets → Events → Web Events → Set up Pixel
2. Automatic event mapping: OFF (manually map your custom events)
3. Connect Events API via Stape (or direct)
4. Map events:
   - `trial_signup` → `CompleteRegistration`
   - `view_pricing` → `ViewContent`
5. Verify test events in TikTok Pixel Helper and Events Manager

### LinkedIn

Even without running paid campaigns, install the Insight Tag now.

1. Campaign Manager → Account Assets → Insight Tag → Install
2. Add domain `kineticrecruiter.com` + `app.kineticrecruiter.com`
3. Create Matched Audiences:
   - Website: all visitors, 365 days
   - Website: pricing page visitors, 90 days
   - Website: feature page visitors, 90 days
4. LinkedIn CAPI (2025 release) — defer setup until paid budget lands on LinkedIn

---

## 7. Verification Checklist (Before Launch)

Run through this **the day before ads go live**. If any item fails, launch is postponed.

- [ ] Fire a test `page_view` from homepage → appears in GA4 DebugView within 30s
- [ ] Fire a test `trial_signup` from a fresh browser session → appears in GA4 Realtime
- [ ] Fire a test `trial_signup` → appears in Meta Events Manager Test Events with EMQ ≥7
- [ ] Fire a test `trial_signup` → appears in Google Ads Conversions diagnostics as "Verified"
- [ ] Fire a test `trial_signup` → appears in TikTok Events Manager Test Events
- [ ] Click on a Google Ads preview URL with `gclid` → signup → `gclid` appears in GA4 event parameters and in Google Ads conversion with "Enhanced Conversions applied"
- [ ] Click on a Meta ad preview URL → signup → `fbc` cookie set, event reaches CAPI with both `event_source_url` and `fbc`
- [ ] Test cross-domain: start on `kineticrecruiter.com/pricing`, click "Start Free Trial", land on `app.kineticrecruiter.com/register`, complete → attribution chain intact (single session in GA4)
- [ ] Check Meta Domain verification status = Verified for both domains
- [ ] Check Meta AEM Events list shows `CompleteRegistration` as priority 1
- [ ] Check Google Ads Enhanced Conversions status = "Recording and fixing conversions"
- [ ] Stape container is published and health-checks green
- [ ] Consent mode configured — if not using CMP, no action; if using, Google Consent Mode v2 signals wired

---

## 8. Data Infrastructure Beyond Month 1

Defer to Month 2-3 unless blocking:

| Capability | Tool | When needed |
|---|---|---|
| Trial→paid attribution | Stripe webhook → server-side → platforms | Month 2 |
| Cohort LTV analysis | BigQuery GA4 export or ProfitWell | Month 3 |
| Cross-platform blended reporting | Looker Studio or Supermetrics | Month 2 |
| Incrementality testing | Meta Conversion Lift, Google Ads experiments | Month 4+ |
| MMM (marketing mix modelling) | Robyn or Meridian | Month 12+ or $50k+/mo spend |

---

## 9. Privacy, Consent, Policy

### Current state
- Domains: `kineticrecruiter.com`, `app.kineticrecruiter.com`
- Privacy policy: `/privacy` (already exists)
- Terms: `/terms` (already exists)
- CMP: none installed yet

### Month 1 (US + AU launch)
- No CMP required for US (state-by-state but low risk at current spend)
- Australia: Privacy Act applies — ensure marketing consent for any email capture, covered by existing privacy policy
- **Action:** audit privacy policy mentions: GA4, Meta Pixel, Google Ads, TikTok Pixel, LinkedIn Insight Tag, server-side GTM. Update once at launch.

### Month 4+ (if UK/EU added)
- Install CMP (Iubenda, Cookiebot, or OneTrust)
- Wire Google Consent Mode v2
- Gate Meta Pixel + TikTok Pixel behind consent
- Do not add EU traffic until CMP is live

### Data retention
- GA4: 14 months (default). Raise to max if BigQuery export enabled.
- Meta: 180 days for user-level data
- Google Ads: 540 days default
- Stape: configure per event, 90 days default

---

## 10. Known Gotchas Specific to This Stack

1. **Next.js App Router + GTM:** GTM's default dataLayer doesn't persist across client-side route changes. Use a route listener to fire `page_view` events on `next/navigation` route changes. Reference pattern:
   ```javascript
   // src/app/layout.tsx or a client-side wrapper
   useEffect(() => {
     const handler = () => window.dataLayer?.push({ event: 'page_view', page_path: window.location.pathname });
     handler();
   }, [pathname]);
   ```

2. **Cloud Run + server-side tracking:** Stape is the easy path. If self-hosting, remember Cloud Run scales to zero — cold starts on rare events drop data. Use Cloud Run min-instances = 1 for a CAPI service.

3. **Stripe webhooks:** fire from Stripe's IPs, not the user's browser. `gclid`/`fbclid` must be captured at signup and stored in the user record, then included in the webhook-triggered server event.

4. **Signup email verification:** if `trial_signup` fires only after email verification (recommended), some % of signups will be lost between register submit and verify. Consider firing on register submit with a fallback `trial_verified` event later.

5. **Trial abuse:** disposable-email domains (mailinator, 10minutemail, etc.) inflate signup counts without revenue. Filter these at signup or flag for Meta/Google Ads exclusion audiences.

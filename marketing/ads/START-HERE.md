# START HERE — Step-by-Step Launch Walkthrough

**Goal:** From zero to live ads in 14 days.
**Read order:** Top to bottom. Don't skip ahead. Each session unlocks the next.
**Mark progress:** Check items off as you go. If a step fails, stop and fix before continuing.

> **Progress as of 2026-04-28**
> - Preflight: pricing decision **RESOLVED → tiered $29/$59/$99 monthly · $24/$49/$82 annual** (matches `plans.json`). Residual copy fixes ✅ COMPLETE — canonical pricing block now lives at top of CREATIVE-BRIEF.md and RSA-COPY.md, Pillar 6 hooks rewritten to use real plan tiers, sitelink and CSV per-recruiter bugs fixed.
> - Session 1: ✅ COMPLETE. GA4, GTM, Google Ads, Meta, TikTok, LinkedIn all captured. Stape.io ⏸️ deferred to Month 2 (revisit triggers documented in Step 1.7).
> - Session 2: GA4 strategy decided — **migrate gtag.js into GTM** (existing inline gtag.js block in `src/app/layout.tsx` will be replaced; no double-counting). PR drafted directly against `src/app/layout.tsx` + new `src/components/analytics/GTMRouteListener.tsx`. **Deploy infra migrated 2026-04-27** off `agentos-demo-1775622291` (where it never belonged) into dedicated `kineticrecruiterpublic` project; Cloud Build trigger live; project guard in `cloudbuild.yaml` Step 0 prevents recurrence. GTM-TD2ZCRRV is now live in production. Click-ID forwarding live via `src/components/analytics/ClickIdCapture.tsx`. data-cta attributes live on 11 CTAs.
>
> **Currency decision (2026-04-26):** Google Ads account is **AUD**, not USD. Reasoning: AU-issued payment card paying USD = bank takes 2–3% FX margin on every charge (~$220–330/year wasted at $30/day spend). Google's institutional FX (when account currency = card currency) has no margin. AUD account targeting US works fine — currency has zero impact on geo targeting. All USD figures in Sessions 4/6/7/8 below have been translated to AUD-equivalents (using AUD/USD ≈ 0.65, so 1 USD ≈ A$1.54). Re-check rates if AUD moves >10% before launch.
>
> **Pricing canonical (2026-04-28):** Single source of truth for all ads pricing copy. If anything contradicts this, the docs are wrong, not the table.
>
> | Plan | Monthly | Annual (per mo) | Annual total | Savings |
> |---|---|---|---|---|
> | Starter | $29 | $24 | $288/yr | 17% |
> | Professional | $59 | $49 | $588/yr | 17% |
> | Agency | $99 | $82 | $984/yr | 17% |
>
> **Approved phrasings:** `From $29/mo` (monthly) · `From $24/mo on annual` (best foot forward) · `Starting as low as $24/mo on annual subscription` · `Flat per account. Not per seat.` · `Save 17% on annual`. **Never** quote a flat number that isn't a real tier ($29/$59/$99 monthly, $24/$49/$82 annual). Source: [plans.json](../../src/lib/plans.json).

---

## Preflight (5 minutes — do this NOW before opening any browser tab)

Before you touch any ad platform, confirm three things:

- [x] **Pricing decision → tiered $29 / $59 / $99 monthly · $24 / $49 / $82 annual (locked).** Site [plans.json](../../src/lib/plans.json) is the source of truth. Canonical pricing block now lives at the top of [CREATIVE-BRIEF.md](CREATIVE-BRIEF.md) and [RSA-COPY.md](RSA-COPY.md) — paste verbatim phrasings from there.
   - [x] CREATIVE-BRIEF.md Pillar 6 hooks rewritten to use real plan tiers (Professional $49/mo on annual as comparison anchor)
   - [x] CREATIVE-BRIEF.md UGC006 screen cue updated ($49/mo on annual instead of "$89 flat")
   - [x] RSA-COPY.md sitelink fixed (`From $24/mo on annual plan` instead of `From $29/mo per recruiter`)
   - [x] exports/google-ads-extensions.csv fixed
   - [x] exports/google-ads-ads.csv regenerated with annual headlines
- [ ] **Payment card** ready (used for Google Ads + Meta + Stape.io billing).
- [ ] **Access to app.kineticrecruiter.com repo** (or a developer who can deploy a 5-line change today).

If any of these are blockers, fix them before continuing.

---

## SESSION 1 — Account creation (Today, ~45 minutes)

You're creating five accounts. Save every ID/key as you go in a scratchpad — you'll need them in Session 2.

### Step 1.1 — Google Analytics 4 (5 min) — ✅ COMPLETE

1. [x] Go to https://analytics.google.com/
2. [x] Admin (gear icon) → **Create** → **Account** → name it `KineticRecruiter`
3. [x] Create a **Property** named `kineticrecruiter.com`, timezone **Australia/Sydney**, currency **USD**
4. [x] Business details: Industry "Technology", size "Small"
5. [x] Business objectives: "Generate leads" + "Examine user behavior"
6. [x] Create a **Web data stream** for `https://kineticrecruiter.com`
7. [x] **Copy the Measurement ID:** `G-3TJGZ1PEJ4`

**Captured:**
- Account Name: `KineticRecruiter` — Account ID: `391766610` ✅
- Property Name: `KineticRecruiter` — Property ID: `533500580` ✅
- Web stream Measurement ID: `G-3TJGZ1PEJ4` ✅ (already used as the fallback in `src/app/layout.tsx` line 10 — confirms it's live)

✅ Saved: `GA4_MEASUREMENT_ID = G-3TJGZ1PEJ4`

### Step 1.2 — Google Tag Manager (5 min) — ✅ COMPLETE

1. [x] Go to https://tagmanager.google.com/
2. [x] **Create Account** → `KineticRecruiter`, country Australia
3. [x] **Container name:** `kineticrecruiter.com`, target platform **Web**
4. [x] Accept terms
5. [x] **Container ID:** `GTM-TD2ZCRRV`
6. [x] Install snippet captured (head + noscript) — feeds Session 2.1

✅ Saved: `GTM_CONTAINER_ID = GTM-TD2ZCRRV`

**Install snippet (head — paste via `next/script` in Session 2.1):**
```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TD2ZCRRV');</script>
<!-- End Google Tag Manager -->
```

**Install snippet (body, noscript):**
```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TD2ZCRRV"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

### Step 1.3 — Google Ads (10 min) — ✅ COMPLETE

> **Status:** Account exists in Expert Mode, currency = **AUD** (intentional — see Currency decision banner at top of doc). Billing card added, GA4 linked.

1. [x] Go to https://ads.google.com/
2. [x] Sign in with `john.atalla@gmail.com` (same Google account as GA4)
3. [x] Expert Mode confirmed (UI shows full Campaigns dashboard, not Smart Campaigns simplified view)
4. [x] Account created
5. [x] Business info: country Australia, Australian Eastern Time (GMT+10), currency **AUD** (locked)
6. [x] Submit — account created
7. [x] **Customer ID:** `529-562-3656` ✅
8. [x] **Billing:** card added via Tools → Billing → Settings ✅
9. [x] **Linked to GA4:** Tools → Data manager → Connected products → Google Analytics (GA4) → linked `KineticRecruiter` (`533500580`) with both "Import app and web metrics" + "Import Google Analytics audiences" toggled ON ✅

> **UI navigation note:** In the latest Google Ads UI (2025+), "Linked accounts" is no longer under Tools as the walkthrough originally said. The path is now **Tools → Data manager → Connected products → Google Analytics (GA4)**. Use the top search bar (search for "google analytics") if you can't find it.

✅ Saved: `GOOGLE_ADS_CUSTOMER_ID = 529-562-3656` (AUD)

**Conversion value translation when you reach Session 3 / Session 4:**
- Walkthrough quotes `$70` USD as the assumed trial LTV. In an AUD account that should be **A$108** (or let Google auto-convert from imported GA4 conversions, which stay USD).
- For consistency, keep the dataLayer `value: 70` push in USD (matches GA4 property currency) and use Google Ads' built-in GA4 conversion import — Google handles the daily-rate AUD conversion automatically.

### Step 1.4 — Meta Business Manager + Pixel (10 min) — ✅ COMPLETE

> **Currency note:** Same FX-margin logic as Google Ads applies here. With AU-issued card → pick **AUD** for the Meta ad account to avoid 2–3% bank FX margin. Meta currency is also locked at creation. Conversion values map A$108 ≈ $70 USD same as Google Ads.

1. [x] Go to https://business.facebook.com/ — already signed in
2. [x] Created new **Business Portfolio** named `KineticRecruiter` (note: Meta renamed Business Manager → Business Portfolio in 2024)
3. [x] KineticRecruiter Facebook Page added to BP — Page ID `1136076626246361`
4. [x] **Ad account created:** `KineticRecruiter Ads` — `act_1991440081768330` — **currency AUD** ✅, timezone Australia/Sydney, payment card added
5. [x] **Pixel/Dataset created:** `KineticRecruiter Pixel` — Dataset ID `2531875870548790` ✅ (Meta renamed Pixels → Datasets in 2024 — same thing, different label; the 16-digit ID is what GTM and CAPI both consume)
6. [x] Install wizard skipped — pixel will fire via GTM (Session 2.4 Tag 2)

✅ Saved: `META_PIXEL_ID = 2531875870548790`
✅ Saved: `META_AD_ACCOUNT_ID = act_1991440081768330` (AUD)
✅ Saved: `META_PAGE_ID = 1136076626246361`
✅ Saved: `META_BUSINESS_PORTFOLIO = KineticRecruiter`

> **Follow-up nice-to-have (not a launch blocker):** the green "Finish update" prompt in the top-right of Meta Business Suite is asking you to complete BP **business verification** (legal name, address, ABN). Do this before monthly Meta spend exceeds A$1.5k or Meta will pause the account pending verification. 5 min of paperwork.

### Step 1.5 — TikTok Ads Manager (5 min — minimal, just for Spark Ads later) — ✅ COMPLETE

1. [x] Go to https://ads.tiktok.com/
2. [x] Signed up with TikTok account, business: TRANSFORMATIV PTY LTD → account name `KineticRecruiter`
3. [x] Region: Australia, industry: Software & Tech, currency AUD
4. [x] Skipped campaign creation
5. [x] **Assets → Events → Web Events → Create Pixel** → name `KineticRecruiter Pixel`, install method "Google Tag Manager"
6. [x] TikTok auto-installed the base pixel tag inside `GTM-TD2ZCRRV` workspace as `TT-D7NCHIJC77U9KU0AEQGG-Web-Tag-Pixel_Setup` on All Pages — published
7. [x] Pixel ID captured: `D7NCHIJC77U9KU0AEQGG`

✅ Saved: `TIKTOK_PIXEL_ID = D7NCHIJC77U9KU0AEQGG`

> **Note for Session 2.4:** TikTok already created the base pixel tag inside GTM via their installer. **Skip the manual "Tag 3 — TikTok Pixel Base" step** in Session 2.4 — it's already done. Just verify it's there in GTM Admin before publishing the rest of the container.

### Step 1.6 — LinkedIn Insight Tag (5 min — audience-building only) — ✅ COMPLETE

1. [x] Go to https://www.linkedin.com/campaignmanager/
2. [x] Created Campaign Manager account: `Kinetic Recruiter` — Account ID `524540074` (Active)
3. [x] Insight Tag location (2026 UI): **Data → Signals manager → Insight Tag → "I will install the tag myself" dropdown → "I will use a tag manager"**. The "Account assets → Insight Tag" path the original walkthrough referenced no longer exists.
4. [x] Partner ID captured: `9252572`

✅ Saved: `LINKEDIN_PARTNER_ID = 9252572`

> **Two follow-up items (not launch blockers):**
> - **Account name normalization:** LinkedIn account is "Kinetic Recruiter" (with space) — every other platform uses "KineticRecruiter" (one word). Edit in Account settings → Account details → rename to "KineticRecruiter" so cross-platform reporting joins cleanly.
> - **Currency check:** The walkthrough originally said USD here, but the FX-margin reasoning that drove AUD on Google + Meta + TikTok also applies to LinkedIn. If the LinkedIn account got created in USD it's not urgent (no spend planned until Month 4 per ADS-STRATEGY.md), but worth noting that LinkedIn currency is locked at creation — so if it's USD now and you eventually want AUD, you'd need to create a fresh ad account inside this BP later. Verify in Account settings → Account details.

### Step 1.7 — Stape.io server-side container (5 min) — ⏸️ DEFERRED TO MONTH 2

> **Decision (2026-04-26):** Skipped for Month 1 launch. Trade-offs accepted:
> - Meta Match Quality starts at 5–6 (vs 7+ with sGTM) → CPMs ~10–15% higher early on
> - Google Ads Enhanced Conversions still works client-side via GTM, just less robust against iOS / cookie-loss
> - All client-side pixels work normally — this only affects server-side relay
>
> **Revisit trigger (Month 2):** when one of these is true: (a) Meta CPA stable but capped by Match Quality < 7, (b) cumulative ad spend ≥ A$3k, (c) iOS/Safari traffic share > 40% of total. At that point come back to this step.
>
> **What gets skipped in other sessions as a consequence:**
> - Session 3.4 (Stape connection) — entirely skipped for Month 1
> - GA4 Configuration tag in GTM uses the default endpoint (no `server_container_url` override)
> - Meta CAPI is set up via Meta's hosted endpoint instead of through Stape relay (Session 3 still configures CAPI, just direct rather than via sGTM)

When ready to revisit:

1. Go to https://stape.io/
2. Sign up, pick the **$20/mo Power-Up plan** (cheapest with sGTM included; USD-only billing — ~A$30/mo at current rates)
3. **Create container** → server-side GTM → custom domain
4. DNS step: Stape gives you a CNAME target. **Add a CNAME record** in your DNS:
   - Host: `sgtm`
   - Points to: `<your-stape-target>.stape.host`
5. Wait 5-10 min for DNS to propagate. Don't continue Session 2 until Stape shows green.

⏸️ Deferred: `SGTM_URL = https://sgtm.kineticrecruiter.com` (Month 2)

### End of Session 1 Checkpoint

Live scratchpad (update inline as you go):

```
# Captured ✅
GA4_ACCOUNT_ID         = 391766610
GA4_PROPERTY_ID        = 533500580
GA4_MEASUREMENT_ID     = G-3TJGZ1PEJ4
GTM_CONTAINER_ID       = GTM-TD2ZCRRV
GOOGLE_ADS_CUSTOMER_ID = 529-562-3656         (AUD, billed, GA4-linked)
META_BUSINESS_PORTFOLIO = KineticRecruiter
META_PAGE_ID           = 1136076626246361
META_AD_ACCOUNT_ID     = act_1991440081768330 (AUD, billed)
META_PIXEL_ID          = 2531875870548790
TIKTOK_PIXEL_ID        = D7NCHIJC77U9KU0AEQGG  (auto-installed in GTM by TikTok)
LINKEDIN_ACCOUNT_ID    = 524540074
LINKEDIN_PARTNER_ID    = 9252572

# Deferred to Month 2 ⏸️
SGTM_URL               = (Stape.io skipped for launch — see Step 1.7 revisit triggers)
```

**Status:** Session 1 fully captured. All platform accounts created, all IDs saved. Stape deferred to Month 2 by design. Zero ads live. ✅

**Smallest next action:** **Session 2** — deploy GTM to the site. The PR-ready code edit against `src/app/layout.tsx` + new `src/components/analytics/GTMRouteListener.tsx` is already drafted (committed to your repo, ready to deploy). Once GTM-TD2ZCRRV loads on kineticrecruiter.com, GA4 + TikTok pixel start firing automatically (TikTok already auto-installed; Meta + LinkedIn need Tags 2 + 4 added in GTM Admin per Session 2.4).

---

## SESSION 2 — Install GTM on the site (Today/Tomorrow, ~1 hour)

Now you wire GTM into the Next.js app. This single file edit unlocks everything else.

### Step 2.1 — Edit `src/app/layout.tsx`

Open [src/app/layout.tsx](../../src/app/layout.tsx). Find the `<html>` tag. Add the GTM scripts:

```tsx
import Script from 'next/script';

// inside the layout component, before <body>
<Script id="gtm-script" strategy="afterInteractive">
  {`
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-XXXXXXX');
  `}
</Script>
```

Replace `GTM-XXXXXXX` with **your** container ID from Session 1.

In the `<body>` add the noscript fallback:

```tsx
<noscript>
  <iframe
    src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
    height="0" width="0" style={{display: 'none', visibility: 'hidden'}}
  />
</noscript>
```

### Step 2.2 — Add a route-change listener for client-side navigation

Next.js App Router doesn't fire `gtm.js` on client-side route changes. Create [src/components/analytics/GTMRouteListener.tsx](../../src/components/analytics/GTMRouteListener.tsx):

```tsx
'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function GTMRouteListener() {
  const pathname = usePathname();
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'page_view', page_path: pathname });
  }, [pathname]);
  return null;
}
```

Import and render `<GTMRouteListener />` once at the top of your layout.

### Step 2.3 — Deploy and verify

1. Commit, push, let Cloud Build deploy (per [DEPLOYMENT.md](../../DEPLOYMENT.md))
2. Visit https://kineticrecruiter.com in a fresh incognito tab
3. Open Chrome DevTools → Network → filter `gtm.js`. You should see one request to `googletagmanager.com/gtm.js?id=GTM-XXXXXXX` returning 200.
4. Install the **Tag Assistant** Chrome extension. Visit your site. It should detect GTM as connected.
5. In GTM, click **Preview** → enter `https://kineticrecruiter.com` → confirms tags fire.

### Step 2.4 — Add the four base pixel tags inside GTM

In GTM admin (https://tagmanager.google.com/):

**Tag 1 — GA4 Configuration**
- Tag type: Google Tag (`G-XXXXXXXXXX`)
- Trigger: All Pages

**Tag 2 — Meta Pixel Base**
- Tag type: Custom HTML
- Content (paste from Meta Events Manager → Pixel → Continue Pixel Setup → Manually install code → copy):
```html
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_META_PIXEL_ID');
fbq('track', 'PageView');
</script>
```
- Trigger: All Pages

**Tag 3 — TikTok Pixel Base**
- From TikTok Pixel Helper, copy the install code
- Tag type: Custom HTML
- Trigger: All Pages

**Tag 4 — LinkedIn Insight Tag**
- From LinkedIn Insight Tag setup, copy the install code
- Tag type: Custom HTML
- Trigger: All Pages

### Step 2.5 — Publish the GTM container

Click **Submit** → Version name: `v1 — base pixels` → **Publish**.

### Step 2.6 — Verify all four pixels firing

Open https://kineticrecruiter.com in incognito. Check each:

- [ ] **GA4:** open Analytics → Reports → Realtime → confirm yourself as 1 active user
- [ ] **Meta Pixel:** install [Meta Pixel Helper Chrome extension](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc) → green checkmark on KR site
- [ ] **TikTok:** install [TikTok Pixel Helper](https://chrome.google.com/webstore/detail/tiktok-pixel-helper/aelgobmabdmlfmiblddjfnjodalhidnn) → confirms pixel
- [ ] **LinkedIn:** install [LinkedIn Insight Tag tester](https://chrome.google.com/webstore/detail/linkedin-insight-tag/) → confirms tag

If any one fails, **stop and fix it before Session 3.**

### End of Session 2 Checkpoint
Four base pixels firing on every page of kineticrecruiter.com. Still zero ads live. ✅

---

## SESSION 3 — Wire the `trial_signup` event (Tomorrow, ~2 hours)

This is the most important hour of the launch. Without this event, ads have no signal.

### Step 3.0 — Configure GA4 cross-domain (5 min, GA4 UI only)

**Why this matters:** without this, a user who lands on `kineticrecruiter.com`, then clicks through to `app.kineticrecruiter.com/register`, becomes a **brand new user** in GA4 — the session breaks at the subdomain boundary. Google Ads attribution drops, all retargeting audiences fragment.

**Steps:**
1. GA4 → Admin (gear) → Data Streams → click the `kineticrecruiter.com` web stream
2. Click **Configure tag settings** (link near the bottom)
3. Click **Configure your domains**
4. Add **both** entries:
   - `kineticrecruiter.com` (Match type: Contains)
   - `app.kineticrecruiter.com` (Match type: Contains)
5. Save. GA4 will now propagate `_ga` cookie via the `_gl` URL param when the user crosses subdomains, keeping the session intact.

The marketing site's [src/components/analytics/ClickIdCapture.tsx](../../src/components/analytics/ClickIdCapture.tsx) handles forwarding paid-click IDs (gclid/fbclid/etc) — these two are complementary: cross-domain config preserves _user identity_ across the subdomain hop, click-ID forwarding preserves _ad attribution_.

### Step 3.1 — Add dataLayer push at register success in the app

The app at `app.kineticrecruiter.com` is a separate codebase. You (or a dev) need to add this snippet to the register-success handler:

```typescript
// Wherever your register flow lands the user after successful signup
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || [];
  // Read attribution params off the register URL — the marketing site (kineticrecruiter.com)
  // appends gclid/fbclid/msclkid/ttclid/utm_* via src/components/analytics/ClickIdCapture.tsx.
  const url = new URL(window.location.href);
  const attrib = (k: string) => url.searchParams.get(k) ?? undefined;
  window.dataLayer.push({
    event: 'trial_signup',
    plan: signupPlan,           // 'starter' | 'professional' | 'agency'
    user_id: newUser.id,
    email_sha256: await sha256(newUser.email),
    value: 70,                   // assumed LTV per trial in USD
    currency: 'USD',
    event_id: crypto.randomUUID(), // for client/server dedup later
    gclid: attrib('gclid'),
    gbraid: attrib('gbraid'),
    wbraid: attrib('wbraid'),
    fbclid: attrib('fbclid'),
    msclkid: attrib('msclkid'),
    ttclid: attrib('ttclid'),
    utm_source: attrib('utm_source'),
    utm_medium: attrib('utm_medium'),
    utm_campaign: attrib('utm_campaign'),
  });
}
```

**Without the click-ID fields above, Google Ads Enhanced Conversions can't match the signup back to the click**, and Meta CAPI Match Quality stays low. The marketing site already forwards these params on every CTA — this snippet just reads them off the `/register` URL.

Helper for the SHA-256:
```typescript
async function sha256(input: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256',
    new TextEncoder().encode(input.trim().toLowerCase()));
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0')).join('');
}
```

**Also install GTM on app.kineticrecruiter.com** (same steps as Session 2.1 but in the app repo).

### Step 3.2 — Configure conversion tags in GTM

Add five new GTM tags. All trigger on a single Custom Event trigger named `trial_signup` (matches the dataLayer push above).

**Trigger setup:**
- Triggers → New → Custom Event → Event name: `trial_signup` → fires on all custom events
- Save as `Trigger - trial_signup`

**Tag A — Google Ads Conversion (Trial Signup)**
- First in Google Ads: Tools → Conversions → New conversion → Website → category "Sign-up", name `Trial Signup`, value $70 (use same value), count "One per click", click window 30 days, attribution Data-driven, Enhanced Conversions ON.
- Get the Conversion ID and Conversion Label.
- In GTM: New tag → Google Ads Conversion Tracking → paste IDs → fire on `Trigger - trial_signup`.

**Tag B — Meta Pixel CompleteRegistration**
- Custom HTML:
```html
<script>
fbq('track', 'CompleteRegistration', {
  content_name: {{Plan}}, value: 70, currency: 'USD'
}, {eventID: {{Event ID}}});
</script>
```
- Variables to create: `Plan` and `Event ID` as Data Layer Variables pulling from the dataLayer push.
- Fire on `Trigger - trial_signup`.

**Tag C — TikTok CompleteRegistration**
- Custom HTML:
```html
<script>
ttq.track('CompleteRegistration', { value: 70, currency: 'USD' });
</script>
```
- Fire on `Trigger - trial_signup`.

**Tag D — LinkedIn Conversion**
- LinkedIn Insight Tag conversion → create conversion in Campaign Manager UI first, get the Conversion ID
- GTM tag: Custom HTML with `_linkedin_data_partner_ids.push(YOUR_ID)` → fire on `Trigger - trial_signup`

**Tag E — GA4 Event `trial_signup`**
- Google Analytics: GA4 Event → Event name `trial_signup` → params from dataLayer → fire on `Trigger - trial_signup`

Publish the container (v2 — conversion tags).

### Step 3.3 — End-to-end test

1. Open https://kineticrecruiter.com in incognito
2. Append `?gclid=test123` to the URL (simulates a Google Ads click)
3. Click "Start Free Trial" → land on `app.kineticrecruiter.com/register`
4. Sign up with a throwaway test account
5. Within 30 seconds, confirm:
   - [ ] GA4 → Realtime → see `trial_signup` event with parameters
   - [ ] Meta Events Manager → Test Events → see `CompleteRegistration` event with **Match Quality ≥7**
   - [ ] Google Ads → Tools → Conversions → see "Recording" status next to `Trial Signup`
   - [ ] TikTok Events Manager → Test Events → see `CompleteRegistration`

If Match Quality on Meta is <7, the dataLayer push isn't passing email/user_id correctly. Fix before Session 4.

### Step 3.4 — Connect Stape (optional but recommended)

Best done now while context is fresh. In Stape:
1. Add **Meta CAPI** template tag → paste Pixel ID + access token (generate in Meta Events Manager → Conversions API → Generate access token)
2. Add **Google Ads Enhanced Conversions** template tag → paste Conversion ID
3. Add **TikTok Events API** template tag → paste access token
4. In your *web* GTM container (not server-side), point GA4 Configuration's `server_container_url` to `https://sgtm.kineticrecruiter.com`
5. Test by signing up again — check Stape monitoring shows event flow

### End of Session 3 Checkpoint
- All conversion events firing client + server-side
- Match Quality ≥7 on Meta
- Google Ads shows "Recording" on `Trial Signup`
- Stape relaying events server-side

You're ready to launch ads. ✅

---

## SESSION 4 — Launch the Brand campaign (Day 3, 30 min)

The smallest, safest, most certain-to-convert campaign. Launch this first to validate the full funnel before any non-brand spend.

### Step 4.1 — Build in Google Ads UI

1. Google Ads → Campaigns → **+ New campaign**
2. Objective: **Sales** (or "Create a campaign without a goal's guidance")
3. Type: **Search**
4. Conversion goals: include only `Trial Signup`
5. Campaign name: `GOOG_SEARCH_Brand_US_2026Q2`
6. Networks: **uncheck** Search Partners and Display Network
7. Locations: **United States** → Targeting: **Presence** (advanced settings → location options)
8. Languages: English
9. Audience segments: skip
10. Budget: **A$8/day** (≈ $5 USD target)
11. Bidding: **Manual CPC** with **Maximize clicks OFF**, set bid cap to **A$0.80** (≈ $0.50 USD)
12. Ad group name: `AG1_Brand`
13. Keywords (paste from [CAMPAIGN-ARCHITECTURE.md](CAMPAIGN-ARCHITECTURE.md#campaign-goog_search_brand_us_2026q2)):
    ```
    [kineticrecruiter]
    [kinetic recruiter]
    "kinetic recruiter ats"
    "kinetic recruiter pricing"
    "kinetic recruiter free trial"
    "kinetic recruiter login"
    "kinetic recruiter chrome extension"
    ```
    (Square brackets = exact match, quotes = phrase match)
14. Negative keywords (campaign level): `jobs, careers, review, reviews, vs, app, download`
15. Add a Responsive Search Ad: paste 15 headlines + 4 descriptions from [RSA-COPY.md Ad Group 1](RSA-COPY.md#ad-group-1--brand-goog_search_brand). Pin headline #1 to position 1.
16. Add sitelinks (6) and callouts (10) from [RSA-COPY.md Sitelinks + Callouts sections](RSA-COPY.md#sitelinks-account-level-shared)
17. Final URL: `https://kineticrecruiter.com/?utm_source=google&utm_medium=cpc&utm_campaign=brand`
18. Save and publish — campaign is live

### Step 4.2 — Build the AU mirror

Repeat steps 4.1 above with these changes:
- Campaign name: `GOOG_SEARCH_Brand_AU_2026Q2`
- Location: **Australia**
- Budget: **A$3/day** (≈ $2 USD target)
- Same keywords, ads, negatives

### Step 4.3 — First 24-hour check

Within 24 hours of launch:
- [ ] At least one impression on at least one keyword (otherwise bid cap might be too low — increase to $0.75)
- [ ] No policy disapprovals (red badge in Google Ads UI)
- [ ] Click-through to landing page works (no 404, no redirect loop)
- [ ] Pixels fire on landing page (Meta Pixel Helper, Tag Assistant)

Brand campaigns typically convert in 1-3 days. Don't panic if no conversions in first 48 hours — volume is small.

### End of Session 4 Checkpoint
**You have live paid ads.** A$11/day (≈ $7 USD) burning, capturing your name. ✅

---

## SESSION 5 — UGC creative production (Days 3-7, parallel to Session 4)

While the Brand campaign runs, get the creative pipeline moving.

### Step 5.1 — Record screen captures

Open [CREATIVE-BRIEF.md §7 Screen Recording Requirements](CREATIVE-BRIEF.md#7-screen-recording-requirements).

Tools: macOS QuickTime or [CleanShot X](https://cleanshot.com/) (better, paid). Record at 1080p+ from a test account, no real candidate data, no system chrome.

Deliver SC001-SC007 to `ugc-framework/output/screen-clips/`.

### Step 5.2 — Generate the first UGC scripts

Use the R.I.C.K. generator at [ugc-framework/prompts/script-generator.md](../../ugc-framework/prompts/script-generator.md).

Paste the system prompt into Claude. For the user prompt, fill in inputs from [CREATIVE-BRIEF.md §4](CREATIVE-BRIEF.md#4-ugc-factory--script-generation-inputs):

Start with **UGC001 (Pain pillar)**. Generate. Review against banned words. If clean, approve.

Then **UGC002 (Transformation)**. Same flow.

### Step 5.3 — Render in Argil + Arcads

Argil (https://app.argil.ai/):
- Use the "Sam" promoter persona from [CREATIVE-BRIEF.md §4](CREATIVE-BRIEF.md#4-ugc-factory--script-generation-inputs)
- Render Hook + CTA moments

Arcads (https://www.arcads.ai/):
- Use the user archetype per video
- Render Body moment

### Step 5.4 — Edit and caption

Use CapCut, Descript, or your editor of choice. Splice promoter + user + screen recording per the `screen_cue` in each script. Burn captions in (80pt+, high contrast). Export 1080×1920 MP4, H.264.

Deliver UGC001 + UGC002 by end of Day 7.

### Step 5.5 — Produce static creative

In Figma (or Canva), build STATIC001 + STATIC002 to spec in [CREATIVE-BRIEF.md §5](CREATIVE-BRIEF.md#5-static-creative-brief). 1080×1080.

### End of Session 5 Checkpoint
- 7 screen clips recorded
- UGC001 + UGC002 final, ready to upload
- STATIC001 + STATIC002 exported
- UGC003-006 in production for Day 10 delivery

---

## SESSION 6 — Build remaining campaigns (Days 8-10, ~3-4 hours)

Build everything else in **Paused** state. Do not enable yet.

### Step 6.1 — Google Ads Non-Brand (US + AU)

For each of: `GOOG_SEARCH_NonBrand_US_2026Q2` and `GOOG_SEARCH_NonBrand_AU_2026Q2`:

- Campaign settings same as Brand but: budget **A$31/day US / A$12/day AU** (≈ $20 / $8 USD), bid cap **A$5.40** (≈ $3.50 USD)
- Three ad groups: `AG1_ATS_Category`, `AG2_Agency_Software`, `AG3_AI_Recruiting`
- Keywords from [CAMPAIGN-ARCHITECTURE.md](CAMPAIGN-ARCHITECTURE.md#campaign-goog_search_nonbrand_us_2026q2-and-_au_)
- RSAs from [RSA-COPY.md Ad Groups 2-4](RSA-COPY.md#ad-group-2--ats-category-goog_search_nonbrand-ag1)
- Apply shared negative keyword lists: `NEG_Employment_Terms`, `NEG_Freemium_Seekers`, `NEG_Competitor_Reviews_And_Login`
- **Status: Paused**

### Step 6.2 — Google Ads Competitor (US + AU)

For `GOOG_SEARCH_Competitor_US_2026Q2` + AU mirror:
- Budget **A$8/day US / A$3/day AU** (≈ $5 / $2 USD), bid cap **A$6.20** (≈ $4.00 USD)
- One ad group: `AG1_Alternatives` with phrase-match keywords from [CAMPAIGN-ARCHITECTURE.md](CAMPAIGN-ARCHITECTURE.md#campaign-goog_search_competitor_us_2026q2)
- RSAs from [RSA-COPY.md Ad Group 5](RSA-COPY.md#ad-group-5--competitor-alternatives-goog_search_competitor-ag1) — **no competitor names in headlines**
- **Status: Paused**

### Step 6.3 — Meta Prospecting

In Meta Ads Manager:
1. Create Campaign → Sales → name `META_CONV_Prospecting_USAU_2026Q2`
2. Conversion location: Website, conversion event `CompleteRegistration`
3. Budget: ABO ($5/day per ad set), 7-day click attribution
4. Three ad sets per [CAMPAIGN-ARCHITECTURE.md Meta section](CAMPAIGN-ARCHITECTURE.md#meta-ads--campaign-structure):
   - `AS1_Interests_Recruitment`
   - `AS2_Titles_Recruiter`
   - `AS3_LAL_1pct_TrialSignups` — **don't activate yet, needs ≥100 signups first**
5. Placements: Advantage+ but **uncheck Audience Network**
6. Geo: US + AU, age 25-54
7. For each ad set, upload 3 creatives:
   - UGC001 video
   - UGC002 video
   - STATIC001 image
8. **Status: Paused**

### Step 6.4 — Meta Retargeting

1. Create Campaign → name `META_CONV_Retarget_USAU_2026Q2`
2. Same conversion event
3. Two ad sets:
   - `AS1_Web_Visitors_30d` (need to wait until pixel collects 1,000+ users — likely Day 14+)
   - `AS2_Video_Viewers_50pct_30d` (waits until video viewers exist)
4. **Status: Paused** — will activate Day 15

### Step 6.5 — TikTok Spark Ads (only if you have organic content)

If KineticRecruiter has at least 2 organic TikTok posts with ≥3% engagement after 72 hours:
1. Authorize Spark Ads on the @kineticrecruiter handle (TikTok Settings → Account → Sharing settings → Spark Ads → ON)
2. In TikTok Ads Manager → Create campaign → Traffic objective → name `TIKTOK_SPARK_TopOrganic_USAU_2026Q2`
3. Budget $5/day per ad
4. Use Spark Ads to boost the qualifying posts
5. **Status: Paused**

If no organic content yet, skip TikTok entirely for Month 1.

### End of Session 6 Checkpoint
All campaigns built. All paused. Brand campaign still running from Session 4. ✅

---

## SESSION 7 — QA + soft launch (Days 11-12, ~2 hours)

### Step 7.1 — Pre-launch QA pass

Walk through the verification checklist in [TRACKING-SETUP.md §7](TRACKING-SETUP.md#7-verification-checklist-before-launch). All 12 items must pass.

Add manual checks:
- [ ] Click each ad's preview URL → confirm landing page loads, pixels fire
- [ ] Run Lighthouse mobile on `/`, `/pricing`, `/solutions/recruitment-agencies` → all ≥85
- [ ] Open `app.kineticrecruiter.com/register?plan=professional` on a phone → form usable, signup completes
- [ ] Verify Google Ads + Meta Pixel show no policy issues (red flags in admin UIs)

### Step 7.2 — Soft launch (Day 12, Friday)

In Google Ads, change status from Paused → Enabled at **50% of full budgets**:
- Google Non-Brand US: temp budget **A$15/day** (≈ $10 USD; will scale to A$31 on Day 15)
- Google Non-Brand AU: **A$6/day** (≈ $4 USD; → A$12)
- Google Competitor US: **A$4/day** (≈ $2.50 USD; → A$8)
- Google Competitor AU: **A$1.50/day** (≈ $1 USD; → A$3)

In Meta:
- Enable Prospecting at **$7.50/day total** (split $4/$3.50 across 2 active ad sets — skip LAL)
- Keep Retargeting paused

Total daily spend during soft launch: **~A$50/day** (≈ $32 USD; Google Ads in AUD + Meta still in USD via separate ad account — see Step 1.4 to revisit Meta currency)

### Step 7.3 — Monitor over the weekend

Daily check (Sat + Sun, 5 min each):
- Spend pacing roughly on track
- No critical anomalies (CTR collapse, impression share zero, CPM 5x baseline)
- Conversion events still firing
- No policy disapprovals

### End of Session 7 Checkpoint
Soft launch ran 72 hours. Issues surfaced and fixed. Ready for full budget. ✅

---

## SESSION 8 — Full launch (Day 15, ~30 min)

### Step 8.1 — Scale to full budget

In Google Ads, increase daily budgets:
- Non-Brand US: A$15 → A$31 (≈ $20 USD)
- Non-Brand AU: A$6 → A$12 (≈ $8 USD)
- Competitor US: A$4 → A$8 (≈ $5 USD)
- Competitor AU: A$1.50 → A$3 (≈ $2 USD)

In Meta:
- Prospecting: $7.50 → $15 ($5 per ad set across 2 active)
- **Activate Retargeting:** $7/day ($4 + $3 split)
- Upload UGC003 + UGC004 to retargeting ad sets

In TikTok (if applicable): activate Spark Ads at $5/day total.

### Step 8.2 — Set the cadence

- **Daily 10-min check** (Mon-Fri, Week 3): spend pace, CTR, conversion volume
- **Weekly 30-min review** (every Monday): kill/scale per [BUDGET-PLAN.md §4](BUDGET-PLAN.md#kill-rule-budget-protection)
- **Monthly review** (every 30 days): full funnel, MER, creative refresh

### Step 8.3 — Lock the next 4 weeks of decisions

Stick reminders/calendar events for the decision gates in [IMPLEMENTATION-ROADMAP.md](IMPLEMENTATION-ROADMAP.md#decision-gates):

- 2026-04-27: Tracking gate (already passed if you got here)
- 2026-05-04: Pre-launch QA gate (already passed)
- 2026-05-18: Week 4 — blended CPA ≤$60?
- 2026-06-15: Week 8 — LTV:CAC ≥2:1?

---

## When something goes wrong

| Symptom | Likely cause | Fix |
|---|---|---|
| Brand campaign has zero impressions after 24h | Bid cap too low ($0.50) | Raise to $0.75-$1.00 |
| Non-Brand keywords trigger on irrelevant searches | Match types too loose | Force phrase + exact only, add negatives |
| Meta ad set stuck in "Learning Limited" | Below 50 conv/week threshold | Expected at this budget — let it run, judge by CPA |
| Conversion not appearing in Google Ads | Enhanced Conversions not configured | Re-check email hash flow in GTM |
| Meta EMQ <7 | Missing email/phone/external_id in pixel | Re-check dataLayer push includes all fields hashed |
| Mobile landing page slow | Heavy hero image / unoptimized JS | Audit `/pricing` and `/solutions/*` first |
| Trial abuse (signups from disposable emails) | Spam | Add disposable-email blocklist at register |

---

## What I (Claude) can do for you while this runs

If you hit any of these, ping me:

- Generate first R.I.C.K. UGC script for UGC001 right now (saves you 30 min)
- Write the `trial_signup` dataLayer push code as a PR-ready diff against the app repo
- Generate the GTM container export JSON (one-click import in GTM Admin)
- Generate Google Ads Editor CSV for bulk campaign upload (skips Sessions 4 + 6 manual building)
- Audit any landing page CRO and rewrite copy
- Draft Meta primary text and headlines for each UGC video
- Write the disposable-email blocklist for the register form

---

## Total time estimate

| Session | Duration | When |
|---|---|---|
| Preflight | 5 min | Now |
| Session 1 — Accounts | 45 min | Today |
| Session 2 — GTM install | 1 hr (incl. dev work) | Today/Tomorrow |
| Session 3 — Trial signup event | 2 hr (incl. dev work) | Tomorrow |
| Session 4 — Brand launch | 30 min | Day 3 |
| Session 5 — UGC production | 4-6 hr (incl. delivery wait) | Days 3-7 |
| Session 6 — Build paused campaigns | 3-4 hr | Days 8-10 |
| Session 7 — QA + soft launch | 2 hr | Days 11-12 |
| Session 8 — Full launch | 30 min | Day 15 |

**Total active work: ~14-18 hours over 14 days.** Most of it is Sessions 5-6.

The minimum viable "I'm running ads" milestone is end of **Session 4 — Day 3** at 30 min of build time once Sessions 1-3 are done.

---

## Handoff to Claude Code

**Last updated:** 2026-04-27
**Status at handoff:** Session 1 substantially complete. Session 2 blocked on Cloud Build trigger.
**How to use this section:** open the repo in Claude Code, point Claude at this file, ask it to "continue from the handoff section." Claude will see the open TODOs below and the captured account state above, then pick up the next blocking item.

### Current state (resolved decisions, do not relitigate)

- **Entity:** Australian Pty Ltd
- **Currency:** AUD across Google Ads + Meta + TikTok ad accounts (overrides earlier USD recommendation — FX-margin reasoning captured in Preflight section above)
- **Pricing model:** **Tiered $29/$59/$99 USD on the website, locked.** Any ad copy implying flat pricing is stale and must be reconciled to tiered.
- **Geo targeting:** US + AU only Phase 1 (unchanged from original plan)
- **Stape.io:** deferred to Month 2 (revisit triggers in Step 1.7)
- **Account IDs captured above in Session 1 steps** — do not recreate accounts.

### Captured account state (source-of-truth IDs)

| System | ID / Reference |
|---|---|
| GA4 Measurement ID | `G-3TJGZ1PEJ4` |
| GA4 Account ID | `391766610` |
| GA4 Property ID | `533500580` |
| GTM Container ID | `GTM-TD2ZCRRV` |
| Google Ads Customer ID | `529-562-3656` |
| Meta Business Portfolio | `KineticRecruiter` |
| Meta Ad Account | `act_1991440081768330` |
| Meta Pixel ID | `2531875870548790` |
| Meta Page ID | `1136076626246361` |
| TikTok Pixel | `D7NCHIJC77U9KU0AEQGG` |
| LinkedIn Account ID | `524540074` |
| LinkedIn Partner ID | `9252572` |

### Open TODOs — work these in order

#### TODO-1 — Fix Cloud Build trigger ✅ DONE (2026-04-27)

Trigger `deploy-on-push-to-main` is live in `kineticrecruiterpublic`, watching `jatalla-eng/kineticrecruiter-site` main → `cloudbuild.yaml`, running as `kr-deploy@kineticrecruiterpublic.iam.gserviceaccount.com` (least-privilege SA). Validated end-to-end via `git push` of commit `ce0c647`.

#### TODO-2 — Cloud project ownership ✅ RESOLVED (2026-04-27)

KR is now in **`kineticrecruiterpublic`** (project number `741700859778`). It was previously misconfigured into `agentos-demo-1775622291`; full migration completed 2026-04-27 (new LB, new IP `34.96.72.204`, new Cert Manager managed cert, GTM rolled live, all KR resources removed from `agentos-demo`). `cloudbuild.yaml` Step 0 now aborts any build whose `$PROJECT_ID` is not `kineticrecruiterpublic` so a recurrence fails before any side effects. See [setup-github-trigger.md](../../setup-github-trigger.md) for the post-migration runbook.

#### TODO-3 — Reconcile ad copy to tiered pricing model ✅ DONE (2026-04-28)

**Resolution:** Pillar 6 rewritten using Professional ($59/mo monthly · $49/mo annual) as the comparison anchor against per-seat competitors. Sitelink and CSV per-recruiter bugs fixed. Canonical pricing block now lives at the top of CREATIVE-BRIEF.md and RSA-COPY.md as the single source of truth. Both monthly and annual headline variants populated across all 5 ad groups. Annual (`From $24/mo`) is the best-foot-forward variant.

#### TODO-4 — Regenerate Google Ads Editor CSVs in AUD

**Symptom:** `marketing/ads/exports/google-ads-*.csv` have USD numbers baked in (5.00, 0.50, 20.00, 3.50). Account currency is AUD; importing as-is sets wrong bids and budgets.

**Action for Claude Code:**
1. Pull current FX rate (USD→AUD; check via `curl -s "https://api.frankfurter.app/latest?from=USD&to=AUD"` or similar)
2. Multiply all budget and bid columns in [google-ads-campaigns.csv](exports/google-ads-campaigns.csv), [google-ads-keywords.csv](exports/google-ads-keywords.csv), [google-ads-ads.csv](exports/google-ads-ads.csv) by the rate
3. Round daily budgets to whole dollars (AUD), bid caps to nearest 5¢
4. Verify totals against the AUD-translated budgets in Sessions 4/6/7/8 of this doc
5. Write the rate used + date into [exports/README.md](exports/README.md)

#### TODO-5 — Cross-platform name normalization

**Symptom:** LinkedIn account name "Kinetic Recruiter" inconsistent with one-word "KineticRecruiter" used everywhere else.

**Action for Claude Code:** rename the LinkedIn account to `KineticRecruiter` (one word). Doesn't affect campaigns; this is for cleaner cross-platform reporting later.

### Open clarifications (no action yet, just documented)

- **LinkedIn account currency** unconfirmed — probably USD; doesn't matter until Month 4 paid LinkedIn launch.
- **Meta BP business verification** — green "Finish update" button on Business Portfolio. Required before A$1.5k/mo Meta spend. Complete during Session 3 or no later than Day 11 QA.

### Definition of done (for handoff)

This section is closed when:
- [ ] All 5 TODOs above are completed and checked off
- [ ] Two clarifications resolved (LinkedIn currency, Meta verification)
- [ ] Session 2 deploy verification passes
- [ ] Session 3 conversion event firing end-to-end with Meta EMQ ≥7

When the above is true, delete this section and update top-of-file status to "Sessions 1-3 complete, Session 4 ready to launch."

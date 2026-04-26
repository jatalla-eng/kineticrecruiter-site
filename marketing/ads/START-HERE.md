# START HERE — Step-by-Step Launch Walkthrough

**Goal:** From zero to live ads in 14 days.
**Read order:** Top to bottom. Don't skip ahead. Each session unlocks the next.
**Mark progress:** Check items off as you go. If a step fails, stop and fix before continuing.

---

## Preflight (5 minutes — do this NOW before opening any browser tab)

Before you touch any ad platform, confirm three things:

- [ ] **Pricing decision.** Ad copy in [RSA-COPY.md](RSA-COPY.md) and [CREATIVE-BRIEF.md](CREATIVE-BRIEF.md) currently says "$29/mo flat" and references "$89 flat" in Pillar 6. Site [plans.json](../../src/lib/plans.json) shows tiered $29/$59/$99. **Pick one model and update the doc before launching.** Mismatched landing-page-vs-ad pricing tanks Quality Score and frustrates buyers.
- [ ] **Payment card** ready (used for Google Ads + Meta + Stape.io billing).
- [ ] **Access to app.kineticrecruiter.com repo** (or a developer who can deploy a 5-line change today).

If any of these are blockers, fix them before continuing.

---

## SESSION 1 — Account creation (Today, ~45 minutes)

You're creating five accounts. Save every ID/key as you go in a scratchpad — you'll need them in Session 2.

### Step 1.1 — Google Analytics 4 (5 min)

1. Go to https://analytics.google.com/
2. Admin (gear icon) → **Create** → **Account** → name it `KineticRecruiter`
3. Create a **Property** named `kineticrecruiter.com`, timezone **Australia/Sydney**, currency **USD** (USD matches website pricing in plans.json — revenue reporting depends on it; AU entity does not require AUD reporting currency in GA4)
4. Business details: Industry "Technology", size "Small"
5. Business objectives: pick "Generate leads" + "Examine user behavior"
6. Create a **Web data stream** for `https://kineticrecruiter.com`
7. **Copy the Measurement ID** (looks like `G-3TJGZ1PEJ4`) → paste into your scratchpad

Account Name: KineticRecruiter (ID:
Account ID
391766610
)
Property Name: KineticRecruiter (ID:
Property ID
533500580
)


✅ Save: `GA4_MEASUREMENT_ID = G-XXXXXXXXXX`

### Step 1.2 — Google Tag Manager (5 min)

1. Go to https://tagmanager.google.com/
2. **Create Account** → name `KineticRecruiter`, country Australia
3. **Container name:** `kineticrecruiter.com`, target platform **Web**
4. Accept terms
5. **Copy the Container ID** (looks like `GTM-XXXXXXX`) → scratchpad
6. Don't close the install snippet popup — you'll need it in Session 2

✅ Save: `GTM_CONTAINER_ID = GTM-XXXXXXX`

### Step 1.3 — Google Ads (10 min)

1. Go to https://ads.google.com/
2. Click **Start now** → sign in with same Google account as GA4
3. **CRITICAL:** at the campaign-creation prompt, click **"Switch to Expert Mode"** (small link bottom of screen). If you don't, Google forces you into Smart campaigns which you can't easily undo.
4. Click **Create an account without a campaign**
5. Confirm business info: **country Australia, timezone Australia/Sydney, currency USD**. Currency is locked at creation — pick USD so reporting matches website pricing. AU entity + USD currency is fully supported.
6. Submit — account is created
7. **Copy the Customer ID** (top right, format `XXX-XXX-XXXX`) → scratchpad
8. Add billing: **Tools → Billing → Settings** → add your card
9. **Link to GA4:** Tools → Linked accounts → Google Analytics 4 → link your `KineticRecruiter` property

✅ Save: `GOOGLE_ADS_CUSTOMER_ID = XXX-XXX-XXXX`

### Step 1.4 — Meta Business Manager + Pixel (10 min)

1. Go to https://business.facebook.com/
2. **Create account** → use your KineticRecruiter Facebook profile
3. Business name `KineticRecruiter`, your name and work email
4. Once in BM: **Settings → Accounts → Pages → Add Page** (add KR's FB page)
5. **Settings → Accounts → Ad Accounts → Create new ad account** → name `KineticRecruiter Ads`, currency USD, timezone, payment method
6. **Settings → Accounts → Pixels → Add → Create Pixel** → name `KineticRecruiter Pixel`
7. **Copy the Pixel ID** (16-digit number) → scratchpad
8. Skip the install wizard for now — you'll do it via GTM in Session 2

✅ Save: `META_PIXEL_ID = XXXXXXXXXXXXXXXX`
✅ Save: `META_AD_ACCOUNT_ID = act_XXXXXXXXXXXXXXX`

### Step 1.5 — TikTok Ads Manager (5 min — minimal, just for Spark Ads later)

1. Go to https://ads.tiktok.com/
2. Sign up with your TikTok account
3. Region: **Australia**, industry: Software & Tech, business name `KineticRecruiter`
4. Skip campaign creation
5. **Assets → Events → Web Events → Create Pixel** → name `KineticRecruiter Pixel`, install method "GTM"
6. **Copy the Pixel ID** → scratchpad

✅ Save: `TIKTOK_PIXEL_ID = XXXXXXXXXXX`

### Step 1.6 — LinkedIn Insight Tag (5 min — audience-building only)

1. Go to https://www.linkedin.com/campaignmanager/
2. **Create account** → name `KineticRecruiter`, currency USD
3. Account → **Account assets → Insight Tag → Install my Insight Tag → I will install the tag myself**
4. **Copy the Partner ID** (7 digits) → scratchpad

✅ Save: `LINKEDIN_PARTNER_ID = XXXXXXX`

### Step 1.7 — Stape.io server-side container (5 min)

1. Go to https://stape.io/
2. Sign up, pick the **$20/mo Power-Up plan** (cheapest with sGTM included)
3. **Create container** → server-side GTM → custom domain
4. DNS step: Stape gives you a CNAME target. **Add a CNAME record** in your DNS:
   - Host: `sgtm`
   - Points to: `<your-stape-target>.stape.host`
5. Wait 5-10 min for DNS to propagate. Don't continue Session 2 until Stape shows green.

✅ Save: `SGTM_URL = https://sgtm.kineticrecruiter.com`

### End of Session 1 Checkpoint

You should now have in your scratchpad:
```
GA4_MEASUREMENT_ID
GTM_CONTAINER_ID
GOOGLE_ADS_CUSTOMER_ID
META_PIXEL_ID
META_AD_ACCOUNT_ID
TIKTOK_PIXEL_ID
LINKEDIN_PARTNER_ID
SGTM_URL
```

Five accounts created. Zero ads live. Zero risk. ✅

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

### Step 3.1 — Add dataLayer push at register success in the app

The app at `app.kineticrecruiter.com` is a separate codebase. You (or a dev) need to add this snippet to the register-success handler:

```typescript
// Wherever your register flow lands the user after successful signup
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'trial_signup',
    plan: signupPlan,           // 'starter' | 'professional' | 'agency'
    user_id: newUser.id,
    email_sha256: await sha256(newUser.email),
    value: 70,                   // assumed LTV per trial in USD
    currency: 'USD',
    event_id: crypto.randomUUID(), // for client/server dedup later
  });
}
```

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
10. Budget: **$5/day**
11. Bidding: **Manual CPC** with **Maximize clicks OFF**, set bid cap to **$0.50**
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
- Budget: **$2/day**
- Same keywords, ads, negatives

### Step 4.3 — First 24-hour check

Within 24 hours of launch:
- [ ] At least one impression on at least one keyword (otherwise bid cap might be too low — increase to $0.75)
- [ ] No policy disapprovals (red badge in Google Ads UI)
- [ ] Click-through to landing page works (no 404, no redirect loop)
- [ ] Pixels fire on landing page (Meta Pixel Helper, Tag Assistant)

Brand campaigns typically convert in 1-3 days. Don't panic if no conversions in first 48 hours — volume is small.

### End of Session 4 Checkpoint
**You have live paid ads.** $7/day burning, capturing your name. ✅

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

- Campaign settings same as Brand but: budget $20 US / $8 AU, bid cap $3.50
- Three ad groups: `AG1_ATS_Category`, `AG2_Agency_Software`, `AG3_AI_Recruiting`
- Keywords from [CAMPAIGN-ARCHITECTURE.md](CAMPAIGN-ARCHITECTURE.md#campaign-goog_search_nonbrand_us_2026q2-and-_au_)
- RSAs from [RSA-COPY.md Ad Groups 2-4](RSA-COPY.md#ad-group-2--ats-category-goog_search_nonbrand-ag1)
- Apply shared negative keyword lists: `NEG_Employment_Terms`, `NEG_Freemium_Seekers`, `NEG_Competitor_Reviews_And_Login`
- **Status: Paused**

### Step 6.2 — Google Ads Competitor (US + AU)

For `GOOG_SEARCH_Competitor_US_2026Q2` + AU mirror:
- Budget $5 US / $2 AU, bid cap $4.00
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
- Google Non-Brand US: temp budget **$10/day** (will scale to $20 on Day 15)
- Google Non-Brand AU: **$4/day** (→ $8)
- Google Competitor US: **$2.50/day** (→ $5)
- Google Competitor AU: **$1/day** (→ $2)

In Meta:
- Enable Prospecting at **$7.50/day total** (split $4/$3.50 across 2 active ad sets — skip LAL)
- Keep Retargeting paused

Total daily spend during soft launch: **~$32/day**

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
- Non-Brand US: $10 → $20
- Non-Brand AU: $4 → $8
- Competitor US: $2.50 → $5
- Competitor AU: $1 → $2

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

# Implementation Roadmap

**Start date:** 2026-04-21 (Monday)
**Soft launch (50% budget):** 2026-05-02 (Day 12)
**Full launch:** 2026-05-05 (Day 15)
**Roadmap horizon:** 12 weeks (3 months)

---

## Phase 1 — Foundation (Week 1, Days 1-7)

Goal: tracking live, accounts created, first creative assets in production.

### Day 1 (Mon 2026-04-21)
- [ ] Create Google Ads, Meta Business Manager, TikTok Ads Manager, LinkedIn Campaign Manager accounts
- [ ] Create Google Analytics 4 property, link Search Console
- [ ] Create Google Tag Manager container, connect to `kineticrecruiter.com`
- [ ] Sign up for Stape.io (pick $20 plan), create custom subdomain `sgtm.kineticrecruiter.com`
- [ ] DNS: add CNAME for `sgtm.kineticrecruiter.com` → Stape endpoint

### Day 2 (Tue)
- [ ] Install GTM on `kineticrecruiter.com` (Next.js layout.tsx injection, see `TRACKING-SETUP.md` §10.1 route listener)
- [ ] Install GTM on `app.kineticrecruiter.com`
- [ ] Domain verification in Meta Business Manager (DNS TXT record)
- [ ] Install GA4 + Meta Pixel + TikTok Pixel + LinkedIn Insight Tag tags in GTM, publish
- [ ] Verify all pixels firing via Tag Assistant, Meta Events Debugger, TikTok Pixel Helper

### Day 3 (Wed)
- [ ] Define conversion events in GTM: `trial_signup`, `view_pricing`, `start_trial_click`, `purchase` (see `TRACKING-SETUP.md` §3 event taxonomy)
- [ ] Implement dataLayer push at signup success in the app repo (requires coordination with app team — may block if signup code is gated)
- [ ] Configure Google Ads conversion actions: Trial Signup (primary, $70 value), Purchase (secondary, Stripe-fired)
- [ ] Configure Meta custom conversions: CompleteRegistration + ViewContent, set AEM priorities
- [ ] Configure TikTok Events Manager + custom events
- [ ] Configure Enhanced Conversions on Google Ads (hashed email + phone from signup)

### Day 4 (Thu)
- [ ] Set up Stape server-side container: Meta CAPI + TikTok Events API + Google Ads Enhanced Conversions tags
- [ ] Wire Stripe webhook to fire `purchase` server-side via Stape (placeholder endpoint — Stripe key wiring can wait, but webhook should be receivable)
- [ ] End-to-end test: click Google Ads preview URL → signup flow → confirm event in GA4, Meta Events Manager, Google Ads diagnostics
- [ ] Fix any cross-domain attribution gaps

### Day 5 (Fri)
- [ ] UGC Factory kickoff: brief Argil promoter persona "Sam" (see `CREATIVE-BRIEF.md` §4)
- [ ] Record 7 screen capture clips (SC001-SC007 per creative brief) — use screen recording tool on a clean test account
- [ ] Generate UGC001 script using R.I.C.K. generator (Pain pillar, 15s)
- [ ] Generate UGC002 script (Transformation, 15s)
- [ ] Review scripts, QA for banned words and voice match, approve for avatar render

### Weekend (Days 6-7)
- [ ] Argil renders UGC001 + UGC002 promoter moments
- [ ] Arcads renders user archetype moments for UGC001 + UGC002
- [ ] Edit + caption burn-in + splice screen recordings
- [ ] Deliver UGC001 + UGC002 to /output/ ready for upload

### End-of-Week-1 Gate
Do not proceed to Week 2 campaign build unless:
- [ ] GA4, Meta Pixel, TikTok Pixel, LinkedIn Insight Tag all firing on both domains
- [ ] `trial_signup` event successfully fires end-to-end on test signup
- [ ] Meta Event Match Quality ≥7 on test events
- [ ] Google Ads shows Enhanced Conversions as "Recording"
- [ ] At least UGC001 (Pain, 15s) delivered with captions

If any of these fail, slip the launch by a week. Do not launch ads with broken tracking.

---

## Phase 2 — Build and Soft Launch (Week 2, Days 8-14)

Goal: all campaigns built and QA'd, soft launch at 50% budget for final tuning.

### Day 8 (Mon 2026-04-28)
- [ ] Google Ads: build Brand US + Brand AU campaigns (keywords, negatives, bids, ad copy from `RSA-COPY.md`)
- [ ] Google Ads: build Non-Brand US campaign with 3 ad groups (ATS, Agency Software, AI Recruiting)
- [ ] Attach shared negative keyword lists (NEG_Employment_Terms, NEG_Freemium_Seekers)
- [ ] Link Google Ads to GA4 for audience + conversion import (optional but useful)

### Day 9 (Tue)
- [ ] Google Ads: build Non-Brand AU + Competitor US + Competitor AU campaigns
- [ ] Upload all sitelinks, callouts, structured snippets
- [ ] Review ad approvals status — address any disapprovals (usually competitor trademark issues)
- [ ] Set all campaigns to PAUSED pending launch

### Day 10 (Wed)
- [ ] Meta Ads: build Prospecting campaign (3 ad sets, ABO)
- [ ] Build Retargeting campaign (2 ad sets)
- [ ] Upload UGC001 + UGC002 as ad variants to each ad set (minimum 2 variants per ad set at launch; STATIC001 + STATIC002 complete the 3+ per ad set minimum)
- [ ] Configure ad-level UTMs: `utm_source=meta&utm_medium=cpc&utm_campaign={{campaign.name}}&utm_content={{ad.id}}`

### Day 11 (Thu)
- [ ] Generate UGC003 + UGC004 scripts (Feature demo, Social proof) — send to Argil/Arcads
- [ ] Finalize STATIC001 + STATIC002 (design in Figma, export at 1080×1080)
- [ ] TikTok: authorize Spark Ads access on KineticRecruiter handle (requires social team)
- [ ] Identify 2 best-performing organic TikTok posts to boost (need ≥72h organic life)

### Day 12 (Fri — SOFT LAUNCH)
- [ ] QA review: read every ad, check every URL, verify every tracking param
- [ ] Lighthouse audit on /, /pricing, /solutions/recruitment-agencies — fix if mobile <85
- [ ] Enable Google Brand campaigns at full budget ($5+$2/day)
- [ ] Enable Google Non-Brand US at 50% ($10/day instead of $20)
- [ ] Enable Google Non-Brand AU at 50% ($4/day)
- [ ] Enable Google Competitor at 50% ($2.50 US, $1 AU)
- [ ] Enable Meta Prospecting at 50% ($7.50/day total, split across 2 active ad sets — skip LAL)
- [ ] Meta Retargeting: HOLD until Day 14 (audiences need ≥1,000 users to activate)
- [ ] TikTok Spark Ads: HOLD until Day 14 (need organic posts with ≥3% engagement post-72h)

### Weekend (Days 13-14)
- [ ] Daily check-ins: spend pacing, CTR, conversion events firing
- [ ] UGC003 + UGC004 delivered (editing + captions)
- [ ] Review soft-launch performance — any critical issues surface, fix before Monday

### End-of-Week-2 Gate
Do not escalate to full budget unless:
- [ ] All tracked events firing, Meta EMQ ≥7, Google conversions Verified
- [ ] Google Brand impression share ≥80% (defensive)
- [ ] Google Non-Brand CTR ≥3% (industry healthy is 2-5% for B2B SaaS search)
- [ ] Meta delivering impressions to both ad sets at ~equal CPM (if one starves, check audience overlap)
- [ ] No policy rejections unresolved

---

## Phase 3 — Full Launch and Observe (Week 3-4, Days 15-28)

Goal: full budget live, gather learning-phase data, make no major changes.

### Day 15 (Mon 2026-05-05 — FULL LAUNCH)
- [ ] Scale Google Non-Brand US to full ($20/day)
- [ ] Scale Google Non-Brand AU to full ($8/day)
- [ ] Scale Google Competitor to full ($5 + $2)
- [ ] Scale Meta Prospecting to full ($15/day split $5/$5/$5 — still only 2 ad sets active; LAL waits for 100 signups)
- [ ] Activate Meta Retargeting ($7/day split $4/$3)
- [ ] Upload UGC003 + UGC004 to Meta Retargeting ad sets
- [ ] Activate TikTok Spark Ads on 2 approved organic posts ($5/day total)

### Week 3 (Days 15-21)
- **No major changes.** Let the platforms learn.
- Daily: monitor spend pace, check for anomalies >50% from baseline (CTR collapse, CPM spike)
- Day 18: first mid-week creative refresh decision — if a single ad is dominating attribution, shift budget within its ad set
- Day 21: Week 3 review — per-campaign CPA and conversion counts

### Week 4 (Days 22-28)
- First kill/scale decisions based on 14-day data
- Apply kill rules from `BUDGET-PLAN.md` §4:
  - Pause any ad group with CPA >$105 and ≥$100 spend
  - Pause any creative with CTR <1.0% and ≥3,000 impressions
- Apply scale rule: any campaign with CPA <$35 and ≥15 conversions over 14 days → +20% budget
- Generate UGC005 (Offer pillar) + more variants in winning pillars

### End-of-Month-1 Checkpoint
Produce a report: spend vs plan, conversions, CPA by campaign, top/bottom creatives, creative fatigue status.

---

## Phase 4 — Optimize and Scale (Weeks 5-8, Days 29-56)

Goal: shift bidding from learning to optimization, expand winners, launch lookalike audiences.

### Week 5 (Days 29-35)
- [ ] Google Non-Brand: shift from Manual CPC to Maximize Conversions if 30+ conversions in trailing 30 days
- [ ] Meta Prospecting: if 100+ `CompleteRegistration` events collected, activate AS3_LAL_1pct_TrialSignups
- [ ] First cohort of paid conversions should be visible — wire Stripe webhook → `purchase` server event via Stape if deferred from Week 1
- [ ] Add Ad Set 2 to Meta Retargeting: Video Viewers 50%+ 30d (now populated)

### Week 6 (Days 36-42)
- [ ] Creative refresh: ship 3 more UGC videos in winning pillars (likely Pain + Feature demo)
- [ ] Retire worst-performing creative (typically 1 of initial 5 will underperform clearly)
- [ ] A/B test RSA headlines on Google: swap in 5 alternate headlines to top ad group, run 14 days
- [ ] TikTok Spark: if boosted posts converted, rotate in 2 new organic hits

### Week 7 (Days 43-49)
- [ ] Google Non-Brand: if Maximize Conversions stable 2 weeks, add Target CPA at $35
- [ ] Meta: consolidate ABO → CBO if 2 ad sets clearly out-perform the third
- [ ] Expand Google keywords: test broad match on winning ad groups with Smart Bidding guardrails (only if tCPA is stable)
- [ ] Begin trial→paid cohort analysis — Month 1 trials now have 30 days to have converted

### Week 8 (Days 50-56)
- [ ] Month 2 review: full funnel analysis, MER calculation, LTV:CAC per platform
- [ ] Decision point: **does LinkedIn clear the budget bar?** Requires monthly budget $5k+ AND LTV data supporting $200+ CAC ceiling. If yes, begin LinkedIn planning (not in this roadmap — new plan needed).
- [ ] Budget increase decision: if blended CPA tracking below $35 and all campaigns green, raise monthly budget to $2,200 for Month 3

---

## Phase 5 — Expand and Refine (Weeks 9-12, Days 57-84)

Goal: add new platforms/geos, refine bidding to ROAS, establish maintenance cadence.

### Week 9-10 (Days 57-70)
- [ ] Microsoft Ads: import Google Search campaigns via Google Ads Import tool, bid 20-35% lower
- [ ] Budget allocation to Microsoft starts at $5/day pulled from scaling reserves (do not reduce Google)
- [ ] If Target ROAS viable on Google (500+ purchase events): migrate Non-Brand to Target ROAS using LTV-weighted values
- [ ] Meta: test new ad set audience — interest-based "Small Business Owners" + "Recruiter" overlap

### Week 11 (Days 71-77)
- [ ] Geographic expansion: test UK at $5/day (Google Non-Brand clone). Hold if CPMs significantly higher than US.
- [ ] Refresh creative set: 3 more UGC videos, rotate stale ones
- [ ] Evaluate whether YouTube pre-roll or Demand Gen is viable (answer: probably not at this budget, defer)

### Week 12 (Days 78-84)
- [ ] Quarterly strategic review: allocation, bidding, creative, tracking health
- [ ] Update all six strategy docs with actuals vs plan, save new version
- [ ] Plan Q3 (Month 4+): LinkedIn consideration if budget >$5k, YouTube if budget >$10k
- [ ] Lock in maintenance cadence: weekly reviews, monthly replans, quarterly strategy

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Tracking breaks mid-launch | Med | High | End-to-end test before Day 12. Stape monitoring alerts on event drop-off. |
| UGC Factory delivery delay | Med | Med | Static creative as minimum-viable Day 12. UGC becomes refresh Week 3+. |
| Non-Brand CPC higher than assumed | High | Med | Budget has 15% buffer. Bid caps enforced. Kill rules hold. |
| Trial abuse inflates signup count | Med | Med | Disposable email filter at signup. Exclude obvious junk domains from audiences. |
| Landing page mobile speed regression | Low | High | Lighthouse CI on every deploy. Manual check before Day 12. |
| Signup gate requires email verification, breaks pixel timing | Med | High | Verify signup flow in Week 1. If verify-gate, fire event on register submit with `trial_verified` secondary event. |
| Competitor bidding on our brand | High | Low | Brand campaign at 90% impression share prevents steal. Monitor weekly. |
| Stripe webhook not firing `gclid`/`fbclid` | Med | Med | Store click IDs on user record at signup. Include in webhook payload. |

---

## Decision Gates

Explicit decision points — do not blow past these without review:

| Gate | Date | Question | If YES | If NO |
|---|---|---|---|---|
| End of Week 1 | 2026-04-27 | Is tracking verified end-to-end? | Proceed to Week 2 | Slip launch 1 week, fix tracking |
| End of Week 2 | 2026-05-04 | Do all campaigns pass QA? | Proceed to full launch | Delay specific failing campaigns, launch others |
| End of Week 4 | 2026-05-18 | Is blended CPA ≤$60 (learning baseline)? | Proceed to Phase 4 | Full diagnostic: landing page, targeting, creative |
| End of Week 8 | 2026-06-15 | Is LTV:CAC ≥2:1? | Raise budget, plan LinkedIn | Tighten targeting, refresh creative, hold spend |
| End of Week 12 | 2026-07-13 | Is the plan scalable? | Build Q3 plan with higher budget | Replan platform mix from scratch |

---

## Success Metrics

| Metric | Month 1 | Month 3 | Month 6 |
|---|---|---|---|
| Monthly spend | $1,900 | $2,200 | $3,500 |
| Trials / month | 30-50 | 100-140 | 200-300 |
| Blended CPA (trial) | $40-60 | $20-30 | $12-20 |
| Trial → paid rate | Measure | 12-15% | 15-20% |
| CAC (paid) | Measure | $200 | $100 |
| LTV:CAC | TBD | 2:1 | 3:1+ |
| Platform CTR (Google Search) | 3-5% | 4-6% | 5-7% |
| Platform CTR (Meta) | 1-2% | 1.5-2.5% | 2-3% |
| Creative fatigue incidents | 0-1 | 2-3 | Rolling refresh |

# KineticRecruiter Paid Ads Strategy

**Date:** 2026-04-20
**Budget:** <$2,000/month (~$60/day all-in)
**Goal:** Free trial signups, self-serve activation
**Timeline:** Launch inside 2 weeks

---

## 1. Strategic Frame

At this budget ceiling, the only winning move is concentration. Spreading $60/day across five platforms means every platform stays below its learning-phase floor and nothing exits training. Two platforms, done properly, will outperform five platforms done half.

Three decisions drive the plan:

1. **Capture demand before creating it.** Recruiters and agency owners search "best ATS for recruitment agency", "Bullhorn alternative", "applicant tracking system for recruiters" every day. Google Search converts this intent directly into trials at the lowest CAC. This is the revenue engine.
2. **Leverage the UGC pipeline.** With Argil/Arcads video production already structured (see `ugc-framework/`), Meta becomes the natural secondary platform. Vertical UGC performs natively on Reels/Feed, and Meta's interest + lookalike graph is tuned for self-serve SaaS economics at $29-99 price points.
3. **Defer LinkedIn and TikTok paid.** LinkedIn is the "right" audience on paper (recruiters, heads of talent) but at $10-14 CPCs and $10/day campaign minimums, a <$2k budget burns out before learning. TikTok paid has similar minimums ($20/day campaign, $50/day ad group for conversions); better to ride organic + spark-boost top-performing organic posts rather than run native TikTok ads at this budget.

---

## 2. Platform Selection

| Platform | Role | Monthly Spend | Daily | Why |
|---|---|---|---|---|
| **Google Search** | Proven (primary) | ~$1,100 | ~$37 | High-intent search converts trials at lowest CPA |
| **Meta (IG + FB)** | Scaling (secondary) | ~$650 | ~$22 | UGC-native, leverages content pipeline, retargeting cheap |
| **TikTok (Spark Ads)** | Testing | ~$150 | ~$5 | Boost best organic only, do not run native TikTok paid |
| **LinkedIn** | Hold | $0 | — | Reserve for $5k+/mo budget or ABM push |
| **Microsoft** | Add Month 3 | $0 | — | Import from Google once Google campaigns stable |

**Total:** ~$1,900/mo, ~$64/day

### Geography Recommendation

**Entity:** Australian Pty Ltd. **Account billing currency:** USD (matches website pricing in [plans.json](../../src/lib/plans.json) and revenue reporting). **Geo targeting** is set per campaign and is independent of account country. The website itself accepts customers globally; paid ad targeting is deliberately narrower because <$2k/mo cannot afford to test global at launch.

**Phase 1 (Month 1-2):** US + AU only, English-only.

- **US:** Largest addressable market of recruitment agencies (~24k agencies, ~500k in-house recruiters). Highest willingness-to-pay and LTV.
- **AU:** Lower CPCs (30-40% cheaper than US), founder network, local credibility for case studies. Excellent test market.
- **Exclude:** All tier-3 countries (.in, .pk, .ph, .bd, etc.) — inflates clicks, almost never converts self-serve at this ticket.

**Phase 2 (Month 3+):** Layer UK + Canada once Month 1-2 data shows a winning CAC. Both have mature recruitment agency markets and same recruiter terminology.

---

## 3. Conversion Targets

| Metric | Month 1 | Month 3 | Month 6 |
|---|---|---|---|
| Free trials / month | 30-50 | 80-120 | 150-250 |
| Blended CPA (trial) | $40-60 | $25-35 | $15-25 |
| Trial → Paid conversion | Measure | 10-15% | 15-20% |
| Blended CAC (paid customer) | — | $200-350 | $100-180 |
| MER (LTV:CAC) | Tracking only | 2x | 3x+ |

**Target CPA for bidding:** $35 trial signup (Month 1-2 is a learning baseline, not a hard target).

**Payback:** Professional plan at $59/mo monthly (or $49/mo on annual = $588/yr prepaid) → 5-6 months to CAC payback at $300 CAC. Acceptable for self-serve SaaS; annual prepay (17% discount across all tiers) shortens cash-payback significantly when conversion rate to annual is high. Push annual on the trial-to-paid upsell email sequence.

---

## 4. Campaign Architecture

### Naming Convention

```
[Platform]_[Objective]_[Audience]_[Geo]_[Date]
```

Examples:
- `GOOG_SEARCH_Brand_US_2026Q2`
- `GOOG_SEARCH_NonBrand_ATS_US_2026Q2`
- `META_CONV_Prospecting_Agencies_USAU_2026Q2`
- `META_CONV_Retarget_14d_USAU_2026Q2`
- `TIKTOK_SPARK_TopOrganic_USAU_2026Q2`

### Google Ads Structure

```
Brand (always-on, ~$5/day)
  └─ "kinetic recruiter", "kineticrecruiter", "kinetic ats"
      Match: Exact + phrase
      Bidding: Manual CPC, $0.50 cap

Non-Brand Prospecting (~$25/day, scale to $35)
  ├─ AG: ATS Category
  │   "applicant tracking system", "recruitment ATS", "ats for recruiters"
  ├─ AG: Recruitment Agency Software
  │   "agency recruitment software", "recruitment CRM", "staffing agency software"
  ├─ AG: AI Recruiting
  │   "AI recruiting software", "AI resume screening", "AI candidate matching"
  └─ AG: Job-to-Be-Done
      "software for recruiters", "tools for recruitment consultants"

Competitor Conquesting (~$5/day)
  └─ AG: Alternatives
      "bullhorn alternative", "loxo alternative", "crelate alternative",
      "recruitcrm alternative", "manatal alternative"
      Careful: use as broad phrase, add negatives aggressively
```

Global negatives: free, crack, tutorial, jobs, career, salary, resume builder, CV template, how to become, interview tips, recruitment agency (as a buyer-intent phrase — some are agencies looking for clients, not software)

### Meta Structure

```
Prospecting (~$15/day, CBO campaign)
  ├─ Ad Set 1: Interests — "Recruitment", "HR Software", "Applicant Tracking"
  ├─ Ad Set 2: Job Titles — Recruiter, Talent Acquisition, Head of Talent, Agency Owner
  └─ Ad Set 3: LAL 1% of trial signups (activate after 100+ signups)

Retargeting (~$7/day)
  ├─ Ad Set 1: Website visitors 7-30d, excluding signed-up
  └─ Ad Set 2: Video viewers 50%+ (15s+ of UGC video)
```

### TikTok Spark Ads

Only boost organic posts that hit ≥3% engagement rate organically. Never buy cold TikTok ads at this budget. Promote to recruiters, 25-45, US+AU.

---

## 5. Bidding Strategy

### Google Ads

**Days 1-30:** Manual CPC with bid caps.
- At <30 conversions/month expected early on, Max Conversions will thrash. Manual CPC gives control while data accumulates.
- Bid caps: Brand $0.50, Non-Brand $3.50, Competitor $4.00
- Target impression share 80%+ on Brand only

**Days 31-60:** Shift to Maximize Conversions (no tCPA) once 30+ conversions in trailing 30d.

**Day 60+:** Add Target CPA at $35, adjust every 2 weeks based on actual CPA.

**Day 90+:** If paid-customer tracking wired up, move Non-Brand to Target ROAS against trial→paid value.

### Meta Ads

**Days 1-30:** Lowest Cost, ABO (ad-set budgets) on Prospecting so learning distributes across audiences.

**Days 31+:** Consolidate winning ad sets into CBO once two ad sets clearly outperform.

**Conversion event:** Trial Signup (standard event `CompleteRegistration` with custom param `plan_tier`). Optimize for this, not Purchase, until Purchase volume is meaningful.

### TikTok Spark Ads

Automatic bidding, $5-10 CAD per day on approved Spark posts. No manual optimization; this is amplification only.

---

## 6. Creative Strategy

### Content Pillars (match to UGC Factory output)

| Pillar | Hook formula | Priority |
|---|---|---|
| **Pain** | "If you've ever stared at 200 CVs at 11pm…" | P1 |
| **Transformation** | "Before: 6 hours of CV screening. After: 60 seconds." | P1 |
| **Feature demo** | "Watch this ATS score candidates in real-time." | P2 |
| **Social proof** | "How [agency name] hired 3x faster with KR." | P2 |
| **Offer** | "7-day free trial. No credit card. Cancel anytime." | P3 |

### Format Priority

| Format | Spec | Platforms | Need by |
|---|---|---|---|
| UGC Reels (15s, vertical) | 1080×1920, captions burned in | Meta, TikTok | Day 5 |
| UGC Reels (30s, vertical) | 1080×1920, captions burned in | Meta, TikTok | Day 10 |
| Static + copy (square) | 1080×1080 | Meta, Google Display (later) | Day 7 |
| Responsive Search Ads | 15 headlines × 4 descriptions | Google Search | Day 3 |
| Carousel (3-5 cards) | 1080×1080, feature highlights | Meta | Day 10 |

**Minimum at launch:** 3 UGC videos + 2 static creatives + 2 RSAs per ad group.

**Volume to beat creative fatigue at $2k/mo:** Refresh top 1-2 creatives every 3 weeks. Expect creative fatigue signal when CTR drops 25% from peak or frequency exceeds 3.0 on Meta.

### Muted Watching

Captions burned in at 80pt+ with high-contrast backing. ~85% of mobile viewers watch without sound. This is non-negotiable for Meta Reels and TikTok.

---

## 7. Tracking Requirements (Must Ship Before Launch)

See `LAUNCH-CHECKLIST.md` for the tactical checklist. Strategic summary:

| Platform | Client-side | Server-side | Priority |
|---|---|---|---|
| Google | gtag.js + GA4 | Enhanced Conversions (hashed email at signup) | P0 |
| Meta | Pixel | CAPI via Conversions API | P0 |
| TikTok | Pixel | Events API + ttclid | P1 |
| LinkedIn | Insight Tag | — (no spend but build audience now) | P1 |

**Primary event:** `trial_signup` fired on app.kineticrecruiter.com register success.
**Secondary events:** `view_pricing`, `view_features`, `start_checkout`, `purchase` (when trial converts).

**Trial→paid attribution:** Requires passing a signup ID (`client_reference_id`) from Stripe back to the ads platforms when the trial converts. Wire this in Month 2; not required for Month 1 launch.

---

## 8. Kill and Scale Rules

### Kill Rule (applied Week 2 onward)

| Condition | Required data | Action |
|---|---|---|
| CPA >3× target ($105+) | ≥7 days, ≥20 clicks | Pause ad group |
| No conversions | ≥$100 spend or ≥50 clicks | Pause and diagnose landing page / targeting |
| CTR <1.0% on Meta | ≥3,000 impressions | Kill creative, test new |
| CTR <2% on Google Search | ≥500 impressions | Rewrite RSA copy |

### Scale Rule (20%/week)

Once any campaign hits CPA below target for 2 consecutive weeks AND has ≥15 conversions in last 14 days:
- Increase budget 20%
- Hold for 3-5 days to restabilise
- Repeat

Never exceed +20% in a single move. Meta learning resets above this threshold; Google Smart Bidding rebaselines.

---

## 9. Review Cadence

- **Daily (Week 1-2):** CPA, CTR, conversion volume per campaign. Flag anomalies >50% from baseline.
- **Weekly:** Full audit against kill/scale rules. Swap creative variants. Revisit negative keywords.
- **Monthly:** Full-funnel review including trial→paid, MER trend, platform reallocation within 70/20/10.
- **Quarterly:** Strategic replan. Add LinkedIn once MRR/LTV data supports a $5k+/mo budget.

---

## 10. What Not to Do

- Do not launch LinkedIn Ads until monthly budget is $5k+ and trial→paid conversion rate is known. Burning <$2k/mo on LinkedIn at a $29-99 ticket does not pencil.
- Do not run TikTok native ads (non-Spark) at this budget. Minimums eat learning phase.
- Do not run Google Display, Discovery, or PMax until Search is proven. PMax specifically cannibalises Search at small budgets and obscures what is actually working.
- Do not optimize for Purchase on Meta until Purchase volume is >50/week. Optimize for Trial Signup.
- Do not split the budget across more than two ad sets per audience category. At $22/day on Meta, three ad sets starves each below learning floor.
- Do not run broad keyword match on Non-Brand for the first 30 days. Phrase + Exact only, with aggressive negatives.

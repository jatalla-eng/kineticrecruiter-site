# Campaign Architecture

**Last updated:** 2026-04-20
**Scope:** Google Ads, Meta Ads, TikTok Spark Ads
**Budget reference:** ~$60/day all-in (see `BUDGET-PLAN.md`)

---

## Naming Convention

```
[Platform]_[Objective]_[Audience]_[Geo]_[Date]
```

| Token | Allowed values |
|---|---|
| Platform | `GOOG`, `META`, `TIKTOK`, `LNKD` (LinkedIn, not active), `MSFT` (Microsoft, Month 3+) |
| Objective | `SEARCH`, `CONV` (conversions), `AWARE`, `TRAFFIC`, `SPARK`, `SHOP`, `PMAX` |
| Audience | short descriptor: `Brand`, `NonBrand`, `Competitor`, `Prospecting`, `Retarget_30d`, `LAL1`, `Agencies`, `InHouse` |
| Geo | `US`, `AU`, `USAU`, `UK`, `CA` |
| Date | `YYYYQ#` e.g. `2026Q2` |

**Ad group / ad set suffix:** append `_AG[N]_[Theme]` to the campaign name inside the platform.

**Ad variant naming:** `[CreativeID]_[Hook]_[Date]` → e.g. `UGC001_Pain_2026-05-02`.

---

## Google Ads — Account Structure

### Account-level defaults

- **Entity:** Australian Pty Ltd. **Billing currency:** USD (lock at account creation — matches website pricing).
- Single account for US + AU (use campaign-level geo targeting).
- Location targeting: **Presence** only (never "people interested in location"). Prevents junk traffic from low-value geos.
- Language: English only.
- Conversion action: `trial_signup` (primary). Set as "Purchase / conversion" category, include in Conversions column, count = **one per click**.
- Auto-apply recommendations: **OFF**. Google's auto-recs routinely break tight budgets.

**Note on geo:** website accepts customers globally, but Phase 1 paid targeting is US + AU only. Tight budget can't afford to learn across more geos. Layer UK + CA Phase 2 once data supports.

### Campaign: `GOOG_SEARCH_Brand_US_2026Q2` (and `_AU_`)

**Purpose:** Defend brand terms, capture organic-branded search spillover, protect against competitor conquesting.

| Setting | Value |
|---|---|
| Daily budget | $5 US / $2 AU |
| Bidding | Manual CPC, bid cap $0.50 |
| Network | Search only (no Search Partners, no Display) |
| Target impression share | 90% top-of-page |
| Match types | Exact + phrase only |

**Ad group: `AG1_Brand`**

Keywords (exact + phrase):
- `kineticrecruiter`
- `kinetic recruiter`
- `kinetic recruiter ats`
- `kinetic recruiter pricing`
- `kinetic recruiter free trial`
- `kinetic recruiter login`
- `kinetic recruiter chrome extension`

Negative keywords (campaign level):
- `jobs`, `careers`, `review`, `reviews`, `vs`, `app` (if irrelevant), `download` (if irrelevant)

---

### Campaign: `GOOG_SEARCH_NonBrand_US_2026Q2` (and `_AU_`)

**Purpose:** Capture high-intent category search. This is the workhorse.

| Setting | Value |
|---|---|
| Daily budget | $20 US / $8 AU |
| Bidding | Days 1-30: Manual CPC, bid cap $3.50. Days 31-60: Maximize Conversions (no tCPA). Day 60+: Target CPA $35. |
| Network | Search only |
| Match types | Exact + phrase only (no broad for first 30 days) |

**Ad group: `AG1_ATS_Category`**

Keywords (phrase + exact):
- `applicant tracking system`
- `ats for recruiters`
- `ats software`
- `best ats`
- `applicant tracking software`
- `ats tools`
- `modern ats`
- `ai ats`
- `ats with ai`

**Ad group: `AG2_Agency_Software`**

Keywords:
- `recruitment agency software`
- `recruitment crm`
- `staffing agency software`
- `recruitment software for agencies`
- `recruiter software`
- `software for recruitment consultants`
- `executive search software`
- `agency recruiter tools`

**Ad group: `AG3_AI_Recruiting`**

Keywords:
- `ai recruiting software`
- `ai resume screening`
- `ai candidate matching`
- `ai recruiter tools`
- `ai ats software`
- `resume parsing ai`
- `ai candidate scoring`
- `semantic search recruiting`

**Campaign-level negatives (critical):**

```
free, crack, tutorial, tutorial youtube, course, training, certification,
jobs, careers, salary, recruiter jobs, recruiter salary,
resume builder, cv template, cv builder, resume template, how to write,
interview tips, how to become, how to be,
chatgpt, gpt, generic ai
```

**Negative keyword lists (shared, applied to all Non-Brand + Competitor campaigns):**

1. `NEG_Employment_Terms` (jobs, careers, salary, etc.)
2. `NEG_Freemium_Seekers` (free, crack, download, torrent, pirated)
3. `NEG_Irrelevant_Countries` (not a keyword list but applied via geo targeting)
4. `NEG_Competitor_Reviews_And_Login` (see list below)

**List contents — `NEG_Competitor_Reviews_And_Login`:**

```
# Review-intent (searchers comparing but not ready to buy — low conversion)
recruitcrm reviews
recruit crm reviews
bullhorn reviews
jobadder reviews
loxo reviews
crelate reviews
vincere reviews
manatal reviews
greenhouse reviews
lever reviews

# Existing-customer intent (login/support = not a buyer)
bullhorn login
bullhorn support
recruitcrm login
recruit crm login
jobadder login
loxo login
vincere login
manatal login
crelate login
greenhouse login
lever login

# High-volume consumer garbage that competitor names surface in
greenhouse jobs
lever careers
jobadder jobs
bullhorn jobs
```

Apply `NEG_Competitor_Reviews_And_Login` at campaign level to Non-Brand and Competitor campaigns (US + AU). Do not apply to Brand — it's safe there and may occasionally catch a mis-spelled branded search.

---

### Campaign: `GOOG_SEARCH_Competitor_US_2026Q2`

**Purpose:** Capture competitor-evaluation searches with "alternative to X" messaging.

| Setting | Value |
|---|---|
| Daily budget | $5 US / $2 AU |
| Bidding | Manual CPC, bid cap $4.00 |
| Match types | Phrase only |
| Ad policy note | Cannot use competitor name in ad headline (policy violation). Use in keyword targeting only. |

**Ad group: `AG1_Alternatives`**

Keywords (phrase match):
- `bullhorn alternative`
- `bullhorn competitors`
- `jobadder alternative` *(AU priority — KR's #2 ICP threat)*
- `jobadder competitors`
- `jobadder pricing`
- `loxo alternative`
- `loxo competitors`
- `crelate alternative`
- `recruitcrm alternative` *(highest ICP overlap — pair with `/compare/recruitcrm` page)*
- `recruit crm alternative`
- `manatal alternative`
- `vincere alternative`
- `workable alternative`
- `recruiterflow alternative`

**Ad headline treatment:** Use category positioning, not competitor name. Example: "The AI-Native ATS" not "Better Than Bullhorn".

---

## Meta Ads — Campaign Structure

### Business Manager setup

- Single ad account for US + AU (use ad set geo).
- Pages connected: KineticRecruiter FB + IG handles.
- Domain verified: `kineticrecruiter.com` + `app.kineticrecruiter.com`.
- Aggregated Event Measurement: prioritize `CompleteRegistration` (#1), `ViewContent` on pricing (#2), `InitiateCheckout` (#3), `Purchase` (#4 — reserves for trial→paid).

### Campaign: `META_CONV_Prospecting_USAU_2026Q2`

**Purpose:** Top-of-funnel audience discovery, interest + title + LAL layers.

| Setting | Value |
|---|---|
| Objective | Sales (Conversions) |
| Conversion event | `CompleteRegistration` (trial_signup) |
| Budget structure | ABO (ad set level) for Days 1-30, then CBO |
| Daily budget | $15 total, split across ad sets |
| Attribution | 7-day click, 1-day view |
| Placements | Advantage+ (exclude Audience Network) |
| Geo | US + AU |
| Age | 25-54 |

**Ad Set 1: `AS1_Interests_Recruitment`**
- Interests: Recruitment, Human resources, Applicant tracking system, Recruiting, LinkedIn (as interest), Staffing
- Budget: $5/day

**Ad Set 2: `AS2_Titles_Recruiter`**
- Job titles: Recruiter, Senior Recruiter, Technical Recruiter, Talent Acquisition Specialist, Head of Talent, Talent Acquisition Manager, Recruitment Consultant, Agency Recruiter, Recruitment Director
- Employers: targeting freelance-sized to mid-size — avoid "Corporate Employer" narrow targeting that inflates CPM
- Budget: $5/day

**Ad Set 3: `AS3_LAL_1pct_TrialSignups`** (activate Month 2 once ≥100 signups)
- Source: Custom Audience of past trial_signup events
- LAL: 1% US + 1% AU (separate LALs per geo)
- Budget: $5/day

**Creative rotation:** minimum 3 videos + 2 statics per ad set. Disable "Dynamic Creative" — run them as separate ad variants to preserve attribution clarity.

---

### Campaign: `META_CONV_Retarget_USAU_2026Q2`

**Purpose:** Re-engage website visitors and video viewers.

| Setting | Value |
|---|---|
| Objective | Sales (Conversions) |
| Conversion event | `CompleteRegistration` |
| Budget | $7/day |
| Frequency cap | Consider adding via Reach objective later if frequency exceeds 4.0 |

**Ad Set 1: `AS1_Web_Visitors_30d`**
- Inclusion: `kineticrecruiter.com` visitors, last 30 days
- Exclusion: users who fired `CompleteRegistration` in last 90 days
- Budget: $3/day

**Ad Set 2: `AS2_Video_Viewers_50pct_30d`** (populates as prospecting runs)
- Inclusion: video views ≥50% of ThruPlay, any Prospecting ad
- Exclusion: users who fired `CompleteRegistration` in last 90 days
- Budget: $2/day

**Ad Set 3: `AS3_Compare_Bullhorn_Visitors_30d`** (high-intent pull audience)
- Inclusion: URL contains `/compare/bullhorn` OR `/blog/bullhorn-alternatives-2026` OR `/blog/migrating-from-bullhorn-to-modern-ats`, last 30 days
- Exclusion: users who fired `CompleteRegistration` in last 90 days
- Budget: $2/day
- Creative: "Switch from Bullhorn in a weekend" — UGC or static emphasizing 2–5 day migration timeline. Link to `/compare/bullhorn` or `/pricing?from=bullhorn`.
- Rationale: no competitor runs "leaving Bullhorn" creative; visitors to these pages have already self-identified as disaffected. Highest expected CVR of any retargeting cohort.

**Creative (AS1, AS2):** Lead with social proof + specific offer (e.g. "7-day free trial, no card required"). AS3 uses dedicated "switch from Bullhorn" creative — see `CREATIVE-BRIEF.md`.

---

## TikTok Spark Ads

### Campaign: `TIKTOK_SPARK_TopOrganic_USAU_2026Q2`

**Purpose:** Amplify best-performing organic UGC posts. No cold targeting at this budget.

| Setting | Value |
|---|---|
| Objective | Traffic or Conversions (Conversions only if TikTok Pixel populated; else Traffic) |
| Budget | $5-10/day total, $5/day per ad group |
| Placements | TikTok feed only (no Pangle, no News Feed apps) |
| Targeting | US + AU, 25-45, interests: Recruitment, HR, Small Business |
| Creative | Authorized Spark Ads pointing at organic posts |

**Promotion rule:** Only boost organic posts that have ≥3% engagement rate after 72 hours of organic life. Never spend against cold-posted content.

---

## Campaign Architecture Diagram

```
KineticRecruiter Paid Ads (Month 1-2)
│
├── Google Ads (~$37/day)
│   ├── GOOG_SEARCH_Brand_US_2026Q2 ($5/day)
│   │   └── AG1_Brand
│   ├── GOOG_SEARCH_Brand_AU_2026Q2 ($2/day)
│   │   └── AG1_Brand
│   ├── GOOG_SEARCH_NonBrand_US_2026Q2 ($20/day)
│   │   ├── AG1_ATS_Category
│   │   ├── AG2_Agency_Software
│   │   └── AG3_AI_Recruiting
│   ├── GOOG_SEARCH_NonBrand_AU_2026Q2 ($8/day)
│   │   ├── AG1_ATS_Category
│   │   ├── AG2_Agency_Software
│   │   └── AG3_AI_Recruiting
│   ├── GOOG_SEARCH_Competitor_US_2026Q2 ($5/day)
│   │   └── AG1_Alternatives
│   └── GOOG_SEARCH_Competitor_AU_2026Q2 ($2/day)
│       └── AG1_Alternatives
│
├── Meta Ads (~$22/day)
│   ├── META_CONV_Prospecting_USAU_2026Q2 ($15/day ABO)
│   │   ├── AS1_Interests_Recruitment ($5/day)
│   │   ├── AS2_Titles_Recruiter ($5/day)
│   │   └── AS3_LAL_1pct_TrialSignups ($5/day — Month 2)
│   └── META_CONV_Retarget_USAU_2026Q2 ($7/day)
│       ├── AS1_Web_Visitors_30d ($3/day)
│       ├── AS2_Video_Viewers_50pct_30d ($2/day)
│       └── AS3_Compare_Bullhorn_Visitors_30d ($2/day)
│
├── TikTok Spark Ads (~$5-10/day)
│   └── TIKTOK_SPARK_TopOrganic_USAU_2026Q2
│       └── One Spark Ad per approved organic post ($5/day each)
│
└── LinkedIn — HOLD (Insight Tag active for future audience building)
    └── Matched Audience: Website Visitors 30d (building silently)
```

---

## Rules of Expansion

Only add new campaigns or ad groups when:

1. **Existing structure is hitting CPA target for 2 consecutive weeks** AND
2. **You have creative/keyword inventory ready** AND
3. **Incremental test would not starve an existing ad set** below learning threshold

Budget floors per ad set (do not split below these):
- Google Search ad group: $5/day minimum
- Meta ad set: $5/day minimum (conversion objective)
- TikTok Spark Ad: $5/day minimum

If you want to test a new audience on Meta but the $15 prospecting budget is fully allocated, **pause the weakest existing ad set** rather than add a fourth.

---

## Revision Triggers

Revisit this architecture when any of these events happen:

| Trigger | Likely change |
|---|---|
| Monthly ad budget crosses $3,000 | Add LinkedIn Sponsored Content (Job Titles + Company Size targeting) |
| Monthly ad budget crosses $5,000 | Add YouTube pre-roll on demo videos; consider Microsoft Ads import |
| Trial→paid conversion rate measured | Shift Google Non-Brand bidding to Target ROAS |
| ≥500 trial signups in pixel | Meta lookalikes at 1%, 2%, 3% tiers; seed Google Customer Match |
| Single UGC creative fatigues (CTR drops 25% from peak) | Promote next UGC batch, cycle fatigued creative out |

# ADS-STRATEGY Delta — Post Competitor Intelligence

**Date:** 2026-04-20 (updated after full audit of all 8 ads docs)
**Based on:** `COMPETITOR-INTELLIGENCE-REPORT.md` and `COMPETITIVE-GAPS.md`
**Audits against:** `ADS-STRATEGY.md`, `LAUNCH-CHECKLIST.md`, `BUDGET-PLAN.md`, `CAMPAIGN-ARCHITECTURE.md`, `CREATIVE-BRIEF.md`, `IMPLEMENTATION-ROADMAP.md`, `RSA-COPY.md`, `TRACKING-SETUP.md`

This file lists **only** the changes that aren't already covered by the existing docs. Items already in-flight are noted for confirmation rather than action.

---

## Already covered — no action needed

The competitor intelligence confirms these existing decisions, which are already documented across the playbook. **No changes required.**

| Existing decision | Source file |
|---|---|
| Platform allocation (Google 58%, Meta 34%, TikTok 8%) | `BUDGET-PLAN.md` |
| AU geo campaigns on Brand, Non-Brand, and Competitor (not just US) | `CAMPAIGN-ARCHITECTURE.md` |
| Deferring LinkedIn paid until $5k+/mo budget | `ADS-STRATEGY.md` §10, `IMPLEMENTATION-ROADMAP.md` Week 8 |
| TikTok Spark-only (no native TikTok paid) | `ADS-STRATEGY.md` §2 |
| Brand campaign at 90% top-of-page impression share | `CAMPAIGN-ARCHITECTURE.md` |
| Shared negative lists (NEG_Employment_Terms, NEG_Freemium_Seekers) | `CAMPAIGN-ARCHITECTURE.md` |
| Competitor-alternative search landing on `/compare` | `RSA-COPY.md` AG5, `CREATIVE-BRIEF.md` §9 |
| Tracking stack: GTM + Stape + GA4 + platform pixels | `TRACKING-SETUP.md` |
| 5-pillar creative framework (Pain, Transformation, Feature demo, Social proof, Offer) | `CREATIVE-BRIEF.md` §2 |
| Day 12 soft launch at 50%, Day 15 full launch | `IMPLEMENTATION-ROADMAP.md` |

The competitor scan validates all of these.

---

## Genuine gaps — amendments required

Each amendment below names the exact file and location that needs updating.

### Amendment 1 — Add `jobadder alternative` to AU Competitor campaign

**File:** `CAMPAIGN-ARCHITECTURE.md` → `GOOG_SEARCH_Competitor_US_2026Q2` / `_AU_`, AG1_Alternatives keyword list
**File:** `RSA-COPY.md` → AG5 Competitor Alternatives keyword list

**Current state:** Competitor keyword list contains Bullhorn, Loxo, Crelate, RecruitCRM, Manatal, Workable, Recruiterflow — but **not JobAdder**.

**Why this matters:** JobAdder is the dominant agency ATS in AU, with a tier explicitly named for 1–5 recruiter boutiques (the same ICP KR targets). It's the single most direct AU-market threat, and the current AU competitor campaign would miss every "jobadder alternative" search.

**Action:**
```
Add to AG1_Alternatives (AU campaign priority, also US):
  jobadder alternative
  jobadder competitors
  jobadder pricing
  jobadder review (move to negatives — review-intent, not buyer-intent)
```

**Budget impact:** None — $2/day AU Competitor budget already allocated; just reallocates keyword coverage.

---

### Amendment 2 — Fix pricing copy bug in RSA for Agency Software ad group

**File:** `RSA-COPY.md` → AG3 Agency Software headlines

**Bug:** Headline #8 currently reads `"From $29 Per Recruiter/Mo"` (RSA-COPY.md:92). This contradicts the product's **flat pricing** model ($29/mo for Starter plan, not per-seat). Worse — "per recruiter" is exactly the framing competitors use that KR differentiates against.

**Why this matters:** The competitor intelligence confirms "flat pricing, no per-seat tax" is KR's single strongest uncontested messaging angle. An RSA headline that accidentally reinforces per-seat pricing actively undermines the wedge.

**Action:** Replace the headline. Options in priority order:
1. `From $29/Mo Flat. No Per Seat.` (28 chars ✓)
2. `$29/Mo. Not $29 Per Recruiter.` (30 chars ✓)
3. `Flat $29/Mo. All AI Included.` (29 chars ✓)

Apply similar audit across all ad groups — search RSA-COPY.md for any copy implying per-seat pricing.

---

### Amendment 3 — Elevate "Flat pricing / No per-seat tax" to creative brief

**File:** `CREATIVE-BRIEF.md` → §2 Content Pillars and §3 Launch Creative Set

**Current state:** The 5 pillars are Pain, Transformation, Feature demo, Social proof, Offer. None of the 5 launch videos (UGC001–UGC005) use "flat pricing" as a hook.

**Why this matters:** Competitor scan confirms every agency-ATS competitor except Manatal charges per-seat. Nobody in the set is running creative that attacks per-seat pricing. This is the clearest uncontested messaging lane in the entire competitive landscape.

**Action:** Add a 6th pillar to `CREATIVE-BRIEF.md` §2:

> ### Pillar 6 — Pricing Clarity (TOF/MOF)
> **Use:** cold prospecting + retargeting on Meta where price shock drives scroll-stop.
> **Hook archetypes:** Unpopular opinion / Myth bust / The mistake.
>
> Example hooks:
> - "Your ATS charges you $150 per recruiter per month. Ours charges $89 flat."
> - "Unpopular opinion: per-seat pricing is an ATS tax. Here's what $89 flat actually covers."
> - "Stop paying per recruiter. Pay for software, not seats."

Also add a 6th video to `CREATIVE-BRIEF.md` §3 launch set:

> | UGC006 | Vertical video | 15s | Pricing Clarity | Meta Reels | TikTok |

Need-by: Day 12 (one week after initial 5 videos) so it's in-market by full launch Day 15.

---

### Amendment 4 — Elevate "Setup this afternoon / No demo required" to RSA variants

**File:** `RSA-COPY.md` → AG1 Brand, AG2 ATS Category, AG3 Agency Software headline lists

**Current state:** RSA-COPY has "7-Day Free Trial, No Card" (good) but no headline expressing setup speed. All competitors gate on demo or long setup — KR's self-serve speed is unclaimed.

**Action:** Add to headline rotation in each non-competitor ad group:
- `Setup in Under 1 Hour` (21 chars ✓)
- `No Demo Required` (16 chars ✓)
- `Signup to Shortlist in 24h` (26 chars ✓)

---

### Amendment 5 — Add specific competitor-brand negatives

**File:** `CAMPAIGN-ARCHITECTURE.md` → Campaign-level negatives for Non-Brand + Competitor campaigns

**Current negatives list (already good):**
```
free, crack, tutorial, tutorial youtube, course, training, certification,
jobs, careers, salary, recruiter jobs, recruiter salary,
resume builder, cv template, cv builder, resume template, how to write,
interview tips, how to become, how to be,
chatgpt, gpt, generic ai
```

**Add these (missing):**
```
# Review-intent (searchers comparing but not buying)
recruitcrm reviews
bullhorn reviews
jobadder reviews
loxo reviews
crelate reviews

# Existing-customer intent (not buyer-intent)
bullhorn login
bullhorn support
recruitcrm login
jobadder login
loxo login
vincere login
manatal login
greenhouse jobs  # high-volume consumer job-search garbage
lever careers
```

---

### Amendment 6 — Build `/compare/recruitcrm` before launch

**File:** `IMPLEMENTATION-ROADMAP.md` → Add to Week 1 or Week 2 pre-launch tasks
**File:** Content repo (site code — tasks for web team)

**Why this matters:** RecruitCRM is rated the #1 competitive threat by same-customer ICP overlap, but the site doesn't have a `/compare/recruitcrm` page yet. Existing pages cover Greenhouse, Lever, Bullhorn, JobAdder, Vincere — 5 of 5 from the current /compare sitemap. RecruitCRM is the notable omission.

Ads sending traffic to `/compare` or `/` when the searcher typed "recruitcrm alternative" yields 40–60% CVR drop vs matching comparison page.

**Action:**
- [ ] Add `/compare/recruitcrm` page (mirror structure of existing comparison pages)
- [ ] Add `RecruitCRM` to `src/lib/competitors.ts` with full matrix
- [ ] Create blog post "Recruit CRM Alternatives in 2026" (if not already in pipeline)
- [ ] Confirm page is live **before** AG5 Competitor Alternatives campaign enables `recruitcrm alternative` keyword.

---

### Amendment 7 — Add `/compare/bullhorn` retargeting segment to Meta

**File:** `CAMPAIGN-ARCHITECTURE.md` → `META_CONV_Retarget_USAU_2026Q2`

**Current state:** Two retargeting ad sets: all website visitors 30d, and video viewers 50%+. No segment for high-intent comparison-page visitors.

**Why this matters:** Visitors to `/compare/bullhorn` (and the matching blog post) are a pull audience actively considering leaving Bullhorn — much higher conversion potential than generic 30d website visitors. No competitor runs "switch from Bullhorn in a weekend" creative; it's unclaimed.

**Action:** Add a third retargeting ad set:

```
Ad Set 3: AS3_Compare_Bullhorn_Visitors_30d
  Budget: $3/day (reallocated from AS1 which drops to $1/day, or freshly funded)
  Inclusion: URL contains /compare/bullhorn OR /blog/bullhorn-alternatives-2026 OR /blog/migrating-from-bullhorn-to-modern-ats
  Exclusion: users who fired CompleteRegistration in last 90d
  Creative: "Switch from Bullhorn in a weekend" — UGC or static emphasizing 2–5 day migration timeline
  Landing: /compare/bullhorn or /pricing
```

---

## Watch-list (no immediate action)

Add to ongoing monitoring, revisit monthly:

1. **Loxo founder distribution.** Matt Chambers's LinkedIn presence converts in KR's exact ICP band. If Loxo launches a sub-$99 tier or starts bidding on `kineticrecruiter` brand terms, escalate.
2. **Bullhorn Amplify pricing unlock.** If Bullhorn ever publishes Amplify pricing, it gives ammo for specific numeric comparisons in creative.
3. **JobAdder US expansion.** JobAdder has US presence but isn't dominant. A US paid push would require flipping KR's Month 2 AU-first sequence to US-first.
4. **Access Group post-acquisition Vincere activity.** Reactivation signals UK demand — potential future geo.
5. **Manatal price moves.** Manatal's aggressive $15 floor could shift: upward = more budget-segment space for KR, downward = not a threat either way because KR isn't competing on price.

---

## Summary — what to do first

If acting on this audit in priority order:

1. **Fix the RSA bug** (Amendment 2) — **today**, 5 minutes. Prevents active brand-damage from launched ads.
2. **Add `jobadder alternative` keywords** (Amendment 1) — before launch, 15 minutes.
3. **Add specific competitor negatives** (Amendment 5) — before launch, 15 minutes.
4. **Build `/compare/recruitcrm`** (Amendment 6) — before RecruitCRM keyword goes live; can slip keyword to Day 18 if page not ready.
5. **Add Pricing Clarity pillar + UGC006** (Amendment 3) — in-market by Day 15 full launch.
6. **Add setup-speed RSA variants** (Amendment 4) — before launch, 30 minutes.
7. **Add Bullhorn retargeting ad set** (Amendment 7) — Day 15 alongside full launch, or Day 21 once retargeting audiences populate.

Total incremental effort: ~1 engineering day + 1 creative day. Zero net budget increase.

---

## Related files

- `ADS-STRATEGY.md` — paid-ads strategy overview
- `LAUNCH-CHECKLIST.md` — 2-week operational checklist
- `BUDGET-PLAN.md` — budget allocation, kill rules, LTV assumptions
- `CAMPAIGN-ARCHITECTURE.md` — campaign structure, keywords, negatives
- `CREATIVE-BRIEF.md` — creative positioning, pillars, launch set
- `IMPLEMENTATION-ROADMAP.md` — day-by-day rollout plan
- `RSA-COPY.md` — Google RSA headline/description library
- `TRACKING-SETUP.md` — pixels, events, server-side tracking
- `COMPETITOR-INTELLIGENCE-REPORT.md` — raw per-competitor intel
- `COMPETITIVE-GAPS.md` — opportunity synthesis (parent doc of this delta)

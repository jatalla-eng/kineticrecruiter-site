# Budget Plan

**Monthly ceiling:** $1,900 (~$63/day)
**Framework:** 70/20/10 (Proven / Scaling / Testing)
**Month 1 target:** Learn, not optimize. CPA will be noisy.

---

## Monthly Allocation

| Tier | Platform | Monthly | Daily | % of total |
|---|---|---|---|---|
| Proven (70%) | Google Search | $1,100 | $37 | 58% |
| Scaling (20%) | Meta Ads | $650 | $22 | 34% |
| Testing (10%) | TikTok Spark Ads | $150 | $5 | 8% |
| **Total** | | **$1,900** | **$63** | **100%** |

**Note on 70/20/10 deviation:** At <$2k/mo, a strict 70/20/10 split would leave Testing with $190/mo ($6/day). TikTok Spark at $5/day lands close. Meta gets an extra ~8% relative to textbook because the UGC pipeline is already producing creative — underfunding it would waste the content investment.

---

## Google Ads Split

| Campaign | Monthly | Daily | % of Google |
|---|---|---|---|
| Brand US | $150 | $5 | 14% |
| Brand AU | $60 | $2 | 5% |
| Non-Brand US | $600 | $20 | 55% |
| Non-Brand AU | $240 | $8 | 22% |
| Competitor US | $150 | $5 | 14% |
| Competitor AU | $60 | $2 | 5% |
| **Total Google** | **$1,260** | **$42** | — |

**Reality check:** This comes to $1,260, not $1,100. Trim $160 from Non-Brand AU to $5/day or reduce Competitor campaigns if pacing hot. Adjust weekly.

## Meta Ads Split

| Campaign | Monthly | Daily |
|---|---|---|
| Prospecting (ABO, 3 ad sets × $5) | $450 | $15 |
| Retargeting ($4 + $3) | $210 | $7 |
| **Total Meta** | **$660** | **$22** |

LAL ad set ($5/day) activates Month 2 once signup audience hits 100.

## TikTok Spark Ads Split

| Campaign | Monthly | Daily |
|---|---|---|
| Spark Ad #1 (best organic) | $75 | $2.50 |
| Spark Ad #2 (second-best organic) | $75 | $2.50 |
| **Total TikTok** | **$150** | **$5** |

Only spend against organic posts that cleared ≥3% engagement rate in their first 72 hours.

---

## 90-Day Pacing Plan

| Month | Spend | Focus | Expected trials | Blended CPA |
|---|---|---|---|---|
| Month 1 | $1,900 | Learn, tune targeting, kill underperformers | 30-50 | $40-60 |
| Month 2 | $1,900 | Scale winners, launch Meta LAL, refresh creative | 60-90 | $25-35 |
| Month 3 | $2,200 | Scale further, add Microsoft Ads import, expand geos | 100-140 | $20-30 |

Month 3 assumes a +15% budget increase funded by trial→paid data. Do not increase earlier unless all campaigns show CPA <$35 and weekly conversions ≥15 per campaign.

---

## Scaling Rule

**20% per move, maximum one move per week per campaign.**

When a campaign hits CPA below target for 2 consecutive weeks AND ≥15 conversions in last 14 days:

| Current daily | +20% | Hold period |
|---|---|---|
| $20 | $24 | 3-5 days |
| $24 | $29 | 3-5 days |
| $29 | $35 | 3-5 days |

Google Smart Bidding rebaselines above +20% and Meta resets learning. Respect the cap.

---

## Kill Rule Budget Protection

Spend limits before a kill trigger:

| Campaign type | Kill if no conversion after |
|---|---|
| Google Brand | $150 spend (should never happen) |
| Google Non-Brand ad group | $100 spend or 50 clicks |
| Google Competitor | $75 spend or 30 clicks |
| Meta Prospecting ad set | $100 spend or 7 days whichever first |
| Meta Retargeting ad set | $100 spend or 14 days (retargeting slower to convert) |
| TikTok Spark Ad | $50 spend or 72 hours |

When a kill fires: pause the unit, document the learning, reallocate budget to the adjacent winner within same tier.

---

## Budget Sufficiency Assessment

Reference: `ads/references/budget-allocation.md` minimum budget table.

| Platform | Our daily | Min for learning | Sufficient? |
|---|---|---|---|
| Google Search | $42 | $30 (for 15+ conv/mo) | Yes |
| Meta Conversions | $22/campaign | 5× target CPA = $175/ad set, but CBO relaxes this | Marginal — needs creative volume to compensate |
| TikTok Spark | $5 | n/a (amplification, not learning) | Yes, this is organic boost |

**Meta sufficiency note:** At $5/day per ad set, we will not fully exit learning phase on any single ad set. This is acceptable because:
1. We have 3 prospecting ad sets catching different cohorts
2. Retargeting does not need learning-phase volume (warm audience)
3. Strong UGC creative narrows variance, partially substituting for budget volume

If Meta fails to produce signups at a workable CPA by Day 45, consolidate all Meta spend into a single ABO ad set at $22/day (preferably LAL once seeded).

---

## Trial Lifetime Value Assumptions

These drive what CPA is "acceptable." Update once real cohort data exists.

| Plan | Monthly | Assumed trial→paid | Assumed retention (months) | Gross LTV |
|---|---|---|---|---|
| Starter | $29 | 10% | 8 | $232 blended |
| Professional | $59 | 15% | 14 | $826 blended |
| Agency | $99 | 20% | 24 | $2,376 blended |

**Assumption:** paid ad traffic skews to Professional (most-relevant messaging). Blended trial LTV across plan mix: **~$70 per trial signup** (=10% to Starter @ $232, 70% to Professional @ $826, 20% to Agency @ $2,376 — expected value ≈ $650 per paid customer × ~11% trial→paid = ~$72/trial).

**Target CPA ceiling at 3× CAC-to-LTV inversion (strictly loss):** $72
**Target CPA at 2:1 LTV:CAC ratio:** $36
**Target CPA at 3:1 LTV:CAC ratio:** $24

**Therefore:** $35 CPA target is a 2:1 LTV:CAC Month 1-2 working baseline. Month 3+ target: $24 (3:1).

These numbers are **assumptions**. Replace with actual cohort LTV as Stripe data accumulates.

---

## Reporting Budget Discipline

Weekly report should answer:

1. **Pacing:** On track for monthly budget? (Actual spend / Day of month × 30)
2. **Allocation:** Is 70/20/10 holding? If one platform exhausted budget early, why?
3. **CPA by campaign:** Each campaign vs target. Kill/scale flags.
4. **Creative fatigue:** Any ad at frequency >3.0 or CTR down 25% from peak?
5. **Conversion quality:** Early trial→paid signals (once Stripe webhook wired)?
6. **Cash reserves:** $100 monthly buffer for testing unexpected opportunities (use it or forfeit it).

Never let a single campaign exceed 40% of monthly spend without explicit review. Concentration risk is real at this budget — if Google Non-Brand breaks, it takes the whole funnel down.

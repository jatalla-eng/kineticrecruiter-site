# Phase 4: Tools & Go Live - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.

**Date:** 2026-04-08
**Phase:** 04-tools-go-live
**Areas discussed:** JD Generator, ROI calculator, Comparison page, Video embed, Docker/Cloud Run
**Mode:** --auto

---

## JD Generator Form

| Option | Description | Selected |
|--------|-------------|----------|
| Lead capture + job fields | Name, company, email, phone + job title, industry, seniority, responsibilities | ✓ |
| Job fields only | No lead capture | |

**User's choice:** [auto] Lead capture required — user explicitly requested this during scoping
**Notes:** "the jd generator needs to force collection of name, company, email and phone (with country selector) and proper validation"

---

## ROI Calculator

| Option | Description | Selected |
|--------|-------------|----------|
| Client-side calculator | Team size, placements, time-to-fill, fee inputs → instant results | ✓ |
| Server-side with data | API-backed with industry benchmarks | |

**User's choice:** [auto] Client-side — instant, no API dependency

---

## Comparison Page

| Option | Description | Selected |
|--------|-------------|----------|
| Honest 3-column table | KR vs Greenhouse vs Lever with pros/cons | ✓ |
| Feature matrix | Checkmarks grid | |

**User's choice:** [auto] Honest 3-column — per anti-feature guidance

---

## Video Embed

| Option | Description | Selected |
|--------|-------------|----------|
| Placeholder component | Embed-ready with static image + play button | ✓ |
| Skip video | Defer entirely | |

**User's choice:** [auto] Placeholder — VIDEO-01 requirement exists

---

## Docker/Cloud Run

| Option | Description | Selected |
|--------|-------------|----------|
| Follow migration doc | STEP 10-13 exactly | ✓ |
| Custom config | Modified deployment | |

**User's choice:** [auto] Migration doc — proven config

## Claude's Discretion

- Gemini prompt template, ROI visual design, comparison layout, video placeholder design

## Deferred Ideas

None

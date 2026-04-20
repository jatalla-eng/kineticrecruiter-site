---
title: "Boolean Search Operators Cheat Sheet for Recruiters (2026 Edition)"
date: "2026-04-12"
category: "Guides"
description: "A complete Boolean search cheat sheet for recruiters — every operator, LinkedIn and Google X-Ray syntax, and ready-to-use templates for common roles. Plus when to skip Boolean entirely for semantic search."
image: "/images/blog/recruitment-meeting.jpg"
author: KineticRecruiter Team
---

**Quick answer:** Boolean search uses logical operators (AND, OR, NOT) plus quotes, parentheses, and wildcards to build precise queries across LinkedIn, Google, and job board databases. The 6 core operators every recruiter should know are: `AND` (all terms required), `OR` (any term matches), `NOT` (exclude term), `"phrase"` (exact match), `(parentheses)` (group logic), and `*` (wildcard). LinkedIn and Google X-Ray syntax vary slightly. For speed, use our free [Boolean Search String Builder](/tools/boolean-search-builder) to generate strings without syntax memorization — or skip Boolean entirely by using semantic search, which typically finds 30–40% more qualified candidates than even well-constructed Boolean queries.

Boolean search has been a recruiter's core skill for 25+ years. Even in 2026, when semantic AI search covers most of what Boolean used to do, understanding Boolean operators remains useful — for LinkedIn and Google X-Ray sourcing, for filtering within ATS platforms, and for the occasional precise technical search where exact terms matter.

This is a complete reference: every operator, platform-specific syntax, and ready-to-use templates for common recruiting scenarios.

## The 6 Core Boolean Operators

### 1. AND — Require All Terms

Both terms must appear. Narrows results.

```
"product manager" AND "SaaS"
```

Returns only profiles containing both terms. On LinkedIn, AND is implicit — spaces between terms are treated as AND.

### 2. OR — Match Any Term

Any one of the terms must appear. Broadens results. Must be in caps on most platforms.

```
"product manager" OR "product owner" OR "PM"
```

Returns profiles containing any of the three terms. Parentheses group OR lists together for complex queries.

### 3. NOT — Exclude Term

Removes profiles matching the excluded term. Must be in caps on LinkedIn; on Google, use a minus sign instead.

```
"product manager" NOT "junior"
"product manager" -"junior"   (Google syntax)
```

### 4. Quotes — Exact Phrase Match

Locks multi-word terms together.

```
"senior product manager"
```

Without quotes, "senior product manager" becomes three separate terms — matching profiles that contain any of the words, even disconnected.

### 5. Parentheses — Group Logic

Controls evaluation order when combining operators.

```
("product manager" OR "PM") AND ("SaaS" OR "B2B")
```

Without parentheses, the OR/AND logic can ambiguously combine in ways you don't intend.

### 6. Wildcard — Match Variations

Matches variations of a root word. Behavior varies by platform (Google and LinkedIn are stricter than traditional job boards).

```
manag*   → matches "manager," "management," "managing"
```

On LinkedIn, wildcard is limited to within-word matching; full wildcard support is stronger on Google and ATS platforms.

![Recruiter using mobile phone to search for candidates](/images/blog/recruiter-phone.jpg)

## LinkedIn Boolean Syntax

LinkedIn's keyword search bar accepts Boolean operators, but with specific rules:

- `AND`, `OR`, `NOT` must be in UPPERCASE
- Quotes for exact phrases: `"product manager"`
- Parentheses for grouping: `("product manager" OR "PM")`
- No wildcards (as of 2026 — LinkedIn removed them years ago)
- Minus sign works as NOT: `"product manager" -"junior"`

### LinkedIn Recruiter vs Sales Navigator vs Basic Search

- **LinkedIn Basic Search:** Boolean in keyword field only
- **LinkedIn Sales Navigator:** Boolean across multiple search fields, plus advanced filters
- **LinkedIn Recruiter:** Most powerful Boolean support, plus skills/role filters

### LinkedIn X-Ray via Google

Searching LinkedIn via Google bypasses some of LinkedIn's search limitations:

```
site:linkedin.com/in "product manager" "SaaS" "San Francisco"
```

Returns LinkedIn profiles indexed by Google matching all terms. Useful for searches LinkedIn would throttle or hide.

## Google X-Ray Syntax

Google X-Ray uses Google's site: operator to search a specific domain.

```
site:linkedin.com/in "senior software engineer" "Python" "Seattle"
site:github.com "full-stack developer" "React" "Bay Area"
site:stackoverflow.com/users "Python" "10+ years"
```

Additional Google operators useful for recruiting:

- `site:` — restrict to a specific domain
- `intitle:` — term must appear in page title
- `inurl:` — term must appear in URL
- `filetype:` — restrict to file type (e.g., `filetype:pdf`)
- `after:2024` — date-filter results

### Sourcing Templates for Google X-Ray

**Finding engineering candidates on GitHub:**
```
site:github.com "senior engineer" "Go" "distributed systems" "San Francisco"
```

**Finding designers on Dribbble:**
```
site:dribbble.com "senior designer" "B2B" "SaaS"
```

**Finding sales candidates with quota attainment:**
```
site:linkedin.com/in "account executive" ("exceeded quota" OR "150%") "SaaS"
```

**Finding CVs indexed on personal websites:**
```
filetype:pdf intitle:resume "data engineer" "Kubernetes"
```

![Recruiter at laptop reviewing ranked search results](/images/blog/candidate-review.jpg)

## Ready-to-Use Boolean Templates

### Senior Backend Engineer

```
("senior software engineer" OR "senior backend engineer" OR "staff engineer") 
AND ("Python" OR "Go" OR "Java") 
AND ("distributed systems" OR "microservices" OR "scalability")
NOT ("junior" OR "intern" OR "graduate")
```

### Sales Account Executive (Enterprise SaaS)

```
("account executive" OR "enterprise AE" OR "senior AE")
AND ("SaaS" OR "software" OR "B2B")
AND ("quota" OR "exceeded" OR "president's club")
NOT ("BDR" OR "SDR" OR "intern")
```

### VP of Engineering

```
("VP of engineering" OR "vice president engineering" OR "head of engineering")
AND ("scaled" OR "grew team" OR "built team")
AND ("SaaS" OR "B2B" OR "enterprise software")
NOT ("consultant" OR "advisor" OR "fractional")
```

### Product Manager (FinTech)

```
("product manager" OR "senior PM" OR "principal PM")
AND ("fintech" OR "financial services" OR "payments" OR "banking")
AND ("B2C" OR "consumer" OR "B2B")
NOT ("associate" OR "junior" OR "APM")
```

### Technical Recruiter

```
("technical recruiter" OR "tech recruiter" OR "engineering recruiter")
AND ("agency" OR "staffing" OR "recruitment firm")
AND ("boolean" OR "sourcing" OR "full-cycle")
NOT ("coordinator" OR "assistant")
```

### Data Engineer

```
("data engineer" OR "senior data engineer" OR "staff data engineer")
AND ("Spark" OR "Kafka" OR "Airflow" OR "dbt")
AND ("AWS" OR "GCP" OR "Snowflake" OR "Databricks")
NOT ("data analyst" OR "data scientist")
```

## When NOT to Use Boolean Search

Boolean search has real limitations that [semantic search](/blog/semantic-search-vs-keyword-search-recruiting) addresses:

**Vocabulary mismatch.** A candidate whose CV says "led cross-functional delivery squads" won't match a Boolean search for "project management." Even with OR clauses listing every synonym you can think of, you'll miss candidates who use unexpected terminology.

**Industry transfer candidates.** A supply chain manager from manufacturing describes their work differently from one in fintech — but the underlying skills are similar. Boolean misses this; semantic search catches it.

**Senior-level searches.** Executive candidates rarely have standard CV vocabulary. Their experience is described through specific achievements and unique situations that don't pattern-match well.

**Fast-evolving fields.** AI, ML, and emerging tech fields use vocabulary that changes quarterly. Boolean strings go stale; semantic search stays current.

For these scenarios, switch to semantic search. For modern ATS platforms, this is usually a platform capability (KineticRecruiter supports natural-language search in your candidate database); for external sourcing, LinkedIn's own AI search has improved substantially over plain Boolean.

![Team collaborating on sourcing strategy](/images/blog/team-working.jpg)

## Speed Up Boolean with Tools

Building complex Boolean strings from scratch is slow. Three tools speed it up:

**1. [Free Boolean Search String Builder](/tools/boolean-search-builder)** — KineticRecruiter's free tool generates LinkedIn, Google X-Ray, and generic Boolean strings based on simple inputs. No syntax memorization required.

**2. Browser extensions** — Recruitment-focused browser extensions (Hiretual, SeekOut, AmazingHiring) generate Boolean strings on the fly.

**3. AI assistants** — ChatGPT and Claude can generate Boolean strings from plain-English role descriptions, though output quality varies.

For most recruiters in 2026, the practical workflow is: use the free tool for quick strings, use semantic search for deep candidate database queries, and use LinkedIn's native search for passive candidate sourcing.

## Frequently Asked Questions

### What's the difference between Boolean AND and OR?

AND requires all terms to match; OR requires at least one. "SaaS AND enterprise" returns profiles containing both words. "SaaS OR enterprise" returns profiles containing either.

### Does LinkedIn still support Boolean search?

Yes, though with some restrictions. AND, OR, NOT, parentheses, and quotes all work in the LinkedIn keyword search bar. Wildcards have been removed. LinkedIn Recruiter supports more advanced Boolean than basic search.

### What's Google X-Ray search?

X-Ray uses Google's `site:` operator to search a specific domain. Most commonly used to search LinkedIn profiles: `site:linkedin.com/in "product manager" "Sydney"` returns LinkedIn profiles matching those terms, indexed by Google — including some profiles that are harder to find inside LinkedIn's own search.

### How do I search multiple sites at once with X-Ray?

Use `site:` with OR: `(site:linkedin.com/in OR site:github.com) "senior engineer" "Python"`. Results will come from both sites.

### Does semantic search replace Boolean entirely?

For most agency use cases, semantic search is the better default — it finds more qualified candidates with less effort. Boolean remains useful for exact-match queries (specific certifications, clearance levels, exact job titles) and for external sourcing on LinkedIn and Google. Best practice: use semantic search in your ATS, use Boolean for external sourcing.

### Why do AND, OR, NOT need to be uppercase?

Platform convention. LinkedIn and most ATS platforms interpret lowercase "and," "or," "not" as search terms rather than operators. The uppercase convention signals to the search engine that these are logical operators. Google generally works with either case but is more predictable with uppercase.

### How long should my Boolean string be?

Under 10 operators is usually enough. Longer strings become brittle — small issues in the logic can dramatically affect results. If you find yourself writing 20-operator strings, consider splitting into multiple simpler searches or switching to semantic search.

### Can I save Boolean strings for reuse?

LinkedIn Recruiter and most ATS platforms let you save searches. The tradeoff: saved Boolean strings go stale as vocabulary evolves. Review saved strings every 3–6 months to ensure they still reflect current market terminology.

### What's the best Boolean operator to start with?

Start with exact-phrase quotes for job titles, then add required skills with AND, then broaden with OR where appropriate. Build strings incrementally — test after each addition to see how results change.

### Do different ATS platforms support different Boolean syntax?

Yes, with variations. Most support AND, OR, NOT, quotes, and parentheses. Wildcard support varies. Some platforms have platform-specific operators (e.g., proximity operators). Check your specific ATS documentation for exact syntax.

## Keep Improving

Boolean is still a useful skill in 2026, even as AI-native search becomes dominant. Strong recruiters know when to use Boolean (external sourcing, exact-match queries) and when to skip it (database queries, vague requirements, fast-evolving fields).

For faster Boolean string generation, use the free [Boolean Search String Builder](/tools/boolean-search-builder) — no signup required.

For deeper candidate database queries, skip Boolean entirely and use [semantic search](/blog/semantic-search-vs-keyword-search-recruiting) — typically 30–40% more qualified candidates surfaced.

## Related Reading

- [Free Boolean Search String Builder](/tools/boolean-search-builder)
- [Semantic Search vs Keyword Search in Recruiting](/blog/semantic-search-vs-keyword-search-recruiting)
- [AI Candidate Scoring Explained](/blog/ai-candidate-scoring-explained)
- [Best ATS for Recruitment Agencies in 2026](/blog/best-ats-for-recruitment-agencies-2026)
- [How to Grow Your Recruitment Agency with AI](/blog/grow-recruitment-agency-with-ai)

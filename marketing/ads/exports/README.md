# Ads Exports — Import-Ready Files

Drop-in files so you don't click through a UI for 4 hours. Generated from `CAMPAIGN-ARCHITECTURE.md`, `RSA-COPY.md`, and `TRACKING-SETUP.md`.

**Before you import anything**, you need account IDs from the four accounts you already created in Block 1. Gather them in one place:

| Value | Where to find it | Looks like |
|---|---|---|
| GA4 Measurement ID | GA4 → Admin → Data Streams → Web stream | `G-XXXXXXXXXX` |
| GTM Container ID | GTM → top-left container dropdown | `GTM-XXXXXXX` |
| GTM Account ID | GTM → Admin → Account Settings | 8-10 digit number |
| Google Ads Customer ID | Google Ads → top-right, next to account name | `123-456-7890` |
| Google Ads Conversion ID | (Created after import — Tools → Conversions) | `AW-XXXXXXXXXX` |
| Google Ads Conversion Label | Same place, per conversion action | `abc123XYZ` |
| Meta Pixel ID | Events Manager → Data Sources → your Pixel | 15-16 digit number |
| TikTok Pixel ID | TikTok Ads Manager → Assets → Events | 20-character string |
| LinkedIn Partner ID | Campaign Manager → Account Assets → Insight Tag | 7 digits |

---

## 1. GTM Container (`gtm-container.json`)

**What it is:** A full GTM container with GA4, Google Ads Conversion, Meta Pixel (base + CompleteRegistration + ViewContent), TikTok Pixel (base + CompleteRegistration), LinkedIn Insight Tag, plus all variables and triggers pre-wired.

**How to import:**
1. Go to <https://tagmanager.google.com/> → open your KineticRecruiter container
2. Admin → Import Container → choose `gtm-container.json`
3. Workspace: Default Workspace
4. Import option: **Merge** → **Overwrite conflicting tags, triggers, and variables**
5. Before publishing, click each of the Constant variables in the `Variables` tab and paste in the real IDs (they're labelled `REPLACE_ME_...`)
6. Preview the container on `kineticrecruiter.com` — confirm GA4 Configuration + Meta base pixel fire on page load
7. Publish

**Variables you must update** (all are Constant type, prefixed `const - `):

- `const - GA4 Measurement ID` → your `G-XXX`
- `const - Google Ads Conversion ID` → `AW-XXX`
- `const - Google Ads Conversion Label - Trial Signup` → `XXX`
- `const - Meta Pixel ID` → numeric ID
- `const - TikTok Pixel ID` → string ID
- `const - LinkedIn Partner ID` → numeric ID

All other tags, triggers, variables are configured. No other edits required.

---

## 2. Google Ads — Editor CSVs

Google Ads Editor (free Mac/Windows app) accepts CSV import via **Account → Import → From file**. Five separate files are provided because Editor expects separate imports for campaigns, keywords, ads, negatives, and extensions.

Download Editor: <https://ads.google.com/home/tools/ads-editor/>

### Import order (follow this exactly)

1. `google-ads-campaigns.csv` — creates campaigns + ad groups
2. `google-ads-keywords.csv` — adds keywords into those ad groups
3. `google-ads-ads.csv` — adds responsive search ads
4. `google-ads-negatives.csv` — adds negative keyword lists
5. `google-ads-extensions.csv` — adds sitelinks, callouts, structured snippets

After importing each file:
- Review the changes in the `Pending Changes` panel
- Click **Post** (top right)

### What's in each campaign

| Campaign | Status | Daily | Bidding |
|---|---|---|---|
| `GOOG_SEARCH_Brand_US_2026Q2` | **Enabled** | $5 | Manual CPC, bid cap $0.50 |
| `GOOG_SEARCH_Brand_AU_2026Q2` | Paused | $2 | Manual CPC, bid cap $0.50 |
| `GOOG_SEARCH_NonBrand_US_2026Q2` | Paused | $20 | Manual CPC, bid cap $3.50 |
| `GOOG_SEARCH_NonBrand_AU_2026Q2` | Paused | $8 | Manual CPC, bid cap $3.50 |
| `GOOG_SEARCH_Competitor_US_2026Q2` | Paused | $5 | Manual CPC, bid cap $4.00 |
| `GOOG_SEARCH_Competitor_AU_2026Q2` | Paused | $2 | Manual CPC, bid cap $4.00 |

Only Brand US starts enabled — matches the Day-3 launch plan in `IMPLEMENTATION-ROADMAP.md`. Enable the others when you're ready (Week 2 per plan).

### Conversion action — do this manually first

Before posting ad imports, create the conversion action in Google Ads:

1. Tools & Settings → Measurement → Conversions → **+ New conversion action**
2. Source: Website
3. Category: **Sign-up**
4. Name: **Trial Signup**
5. Value: "Same value for each conversion" = $70
6. Count: **One** (not Every)
7. Click-through window: 30 days
8. Attribution: Data-driven
9. Include in "Conversions" column: **Yes**
10. Enhanced conversions: enable, source = Google Tag (it's already in GTM)

Once created, grab the Conversion ID + Label and paste into the GTM variables (step 5 of GTM import above).

---

## 3. Known edits before going live

Three headlines in `RSA-COPY.md` broke 30 chars. Already fixed in `google-ads-ads.csv`:

- "AI Candidate Matching & Scoring" (31) → **"AI Candidate Scoring"** (20)
- "Natural Language Candidate Search" (33) → **"Natural Language CV Search"** (25)
- "Software for Recruitment Agencies" (34) → **"Software For Recruiters"** (22)

The "$89 flat" line in `CREATIVE-BRIEF.md` Pillar 6 is not used in any of the ad copy generated here — current pricing is $29/$59/$99 (from `plans.json`). Decide if you want to update the brief before UGC recording; ads are fine as-is.

---

## 4. What's NOT in here (on purpose)

- **Meta Ads bulk import** — Meta's bulk CSV is easier to just build in-platform because Meta's Advantage+ Placements changes the CSV format roughly every quarter. Do that in the Meta UI after Week 2.
- **TikTok campaigns** — `$5-10/day` doesn't warrant bulk import. Build as you go.
- **Landing-page code for dataLayer push** — lives in the app repo (`app.kineticrecruiter.com`), not this repo. Separate PR.

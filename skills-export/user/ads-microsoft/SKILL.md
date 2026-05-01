---
name: ads-microsoft
description: Microsoft/Bing Ads deep analysis covering search, Performance Max, Audience Network, and Copilot integration. Evaluates 20 checks with focus on Google import validation, unique Microsoft features, and cost advantage assessment. Use when user says "Microsoft Ads", "Bing Ads", "Bing PPC", "Copilot ads", or "Microsoft campaign".
---

# Microsoft Ads Deep Analysis

## Process

1. Collect Microsoft Ads data (account export, UET tag status, import results)
2. Evaluate all applicable checks as PASS, WARNING, or FAIL
3. Calculate Microsoft Ads Health Score (0-100)
4. Generate findings report with action plan

## What to Analyze

### Technical Setup (25% weight)

- UET tag installed and firing on all pages
- Enhanced conversions enabled
- Google Ads import validated: URLs, extensions, bids, goals

### Syndication & Bidding (20% weight)

- Search partner network reviewed, low-performers excluded
- Audience Network enabled only if testing intentionally
- Bid targets 20-35% lower than Google (CPC advantage)
- Target New Customers enabled for PMax — Beta 2026

### Campaign Structure (20% weight)

- Campaign structure mirrors Google or follows best practices
- Budget proportional to Bing volume: typically 20-30% of Google
- LinkedIn profile targeting for B2B — unique advantage

### Creative & Extensions (20% weight)

- RSA: ≥8 headlines, ≥3 descriptions
- Multimedia Ads tested — unique rich format
- Ad copy optimized for Bing demographics
- Action Extension utilized — unique to Microsoft
- Filter Link Extension tested

### Settings & Performance (15% weight)

- Copilot chat placement enabled for PMax: 73% CTR lift
- Conversion goals configured natively, not relying on imported
- CPC 20-40% lower than Google for same keywords
- CVR comparable to Google, not >50% lower
- Impression share tracked for brand and top terms

## Google Import Validation

Most Microsoft Ads accounts start as Google Ads imports. Critical validation:

### What Needs Manual Review

- **URLs**: verify all landing page URLs are correct post-import
- **Extensions**: not all Google extensions have Microsoft equivalents
- **Bid amounts**: should be 20-35% lower (don't import Google bids as-is)
- **Conversion goals**: re-create natively for better tracking
- **Audiences**: import may miss segments, verify all are present
- **Negative keywords**: verify shared negative lists transferred

## Copilot Integration

Microsoft's AI assistant creates unique ad opportunities:

### Copilot Chat Ads

- Available in Performance Max campaigns
- 73% CTR lift reported in chat placement
- Copilot Checkout launched Jan 2026 (in-chat purchase)
- Natural language ad delivery (conversational context)

## Microsoft-Unique Features

| Feature | Description | Priority |
| --- | --- | --- |
| Multimedia Ads | Image-rich search ads with visual elements | Medium |
| Action Extension | CTA button directly in search ad | Medium |
| Filter Link Extension | Filterable category links in ad | Low |
| LinkedIn Profile Targeting | Target by company, industry, job function | High (B2B) |
| Copilot Chat Placement | Ads within Copilot conversations | High |

## Key Thresholds

| Metric | Pass | Warning | Fail |
| --- | --- | --- | --- |
| CTR (Search) | ≥2.83% | 1.5-2.83% | <1.5% |
| CPC (Search) | ≤$1.55 | $1.55-2.50 | >$2.50 |
| CPC vs Google | 20-40% lower | 10-20% lower | Same or higher |
| CVR vs Google | Within 20% | 20-50% lower | >50% lower |
| Impression share (brand) | ≥80% | 60-80% | <60% |

## Output

### Microsoft Ads Health Score

```
Microsoft Ads Health Score: XX/100 (Grade: X)

Technical Setup:   XX/100  ████████░░  (25%)
Syndication:       XX/100  ██████████  (20%)
Structure:         XX/100  ███████░░░  (20%)
Creative:          XX/100  █████░░░░░  (20%)
Settings:          XX/100  ████████░░  (15%)
```

### Deliverables

- `MICROSOFT-ADS-REPORT.md` — Full 20-check findings with pass/warning/fail
- Google import validation results
- Copilot integration readiness assessment
- Cost advantage analysis (CPC savings vs Google)
- Microsoft-unique feature adoption checklist
- Quick Wins sorted by impact

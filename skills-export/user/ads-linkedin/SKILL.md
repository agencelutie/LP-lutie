---
name: ads-linkedin
description: LinkedIn Ads deep analysis for B2B advertising. Evaluates 25 checks across technical setup, audience targeting, creative quality, lead gen forms, and bidding strategy. Includes Thought Leader Ads, ABM, and predictive audiences. Use when user says "LinkedIn Ads", "B2B ads", "sponsored content", "lead gen forms", "InMail", or "LinkedIn campaign".
---

# LinkedIn Ads Deep Analysis

## Process

1. Collect LinkedIn Ads data (Campaign Manager export, Insight Tag status)
2. Evaluate all applicable checks as PASS, WARNING, or FAIL
3. Calculate LinkedIn Ads Health Score (0-100)
4. Generate findings report with action plan

## What to Analyze

### Technical Setup (25% weight)

- Insight Tag installed and firing on all pages
- Conversions API (CAPI) active — launched 2025
- Conversion events configured for full funnel
- Revenue attribution tracking enabled

### Audience Targeting (25% weight)

- Job title targeting uses specific titles, not just functions
- Company size filtering matches ICP
- Seniority level appropriate for offer
- Matched Audiences active: retargeting + contact lists
- ABM company lists uploaded (up to 300,000 companies)
- Audience expansion OFF for precision campaigns, ON for scale
- Predictive audiences tested — replaced Lookalikes Feb 2024

### Creative Quality (20% weight)

- Thought Leader Ads active, ≥30% budget allocation for B2B
- Ad format diversity: ≥2 formats tested
- Video ads tested
- Creative refresh every 4-6 weeks

### Lead Gen & Performance (15% weight)

- Lead Gen Form ≤5 fields (13% CVR benchmark)
- Lead Gen Form synced to CRM in real-time
- Campaign objective matches funnel stage
- A/B testing active: creative or audience
- Message ad frequency ≤1 per 30-45 days

### Bidding & Budget (15% weight)

- Bid strategy: CPS for Messages, Max Delivery for Content
- Daily budget ≥$50 for Sponsored Content
- CTR ≥0.44% for Sponsored Content
- CPC within benchmark: $5-7 average, senior $6.40+
- Attribution: 30-day click / 7-day view configured

## Thought Leader Ads (TLA) Assessment

Thought Leader Ads use employee/executive personal posts as sponsored content:

- CPC typically $2.29-$4.14 vs $13.23 for standard Sponsored Content
- CTR typically 2-3x higher than corporate-branded ads
- Best for: B2B thought leadership, brand awareness, engagement

Evaluate:
- Are TLAs being used? (If not, HIGH priority recommendation)
- Are they getting ≥30% of total LinkedIn budget?
- Are the right employees selected (industry credibility, active posters)?
- Is post content authentic and valuable (not salesy)?

## ABM Strategy Assessment

For B2B Enterprise accounts:

- Company list uploaded and segmented by tier (Tier 1, 2, 3)
- Custom content per tier (personalized messaging)
- Account penetration tracking (contacts reached per target account)
- Integration with CRM/ABM platform (Demandbase, 6sense, etc.)

## Key Thresholds

| Metric | Pass | Warning | Fail |
| --- | --- | --- | --- |
| CTR (Sponsored Content) | ≥0.44% | 0.30-0.44% | <0.30% |
| CPC (average) | ≤$7.00 | $7-10 | >$10.00 |
| Lead Gen CVR | ≥10% | 5-10% | <5% |
| Message frequency | ≤1/30 days | 1/15-30 days | >1/15 days |
| TLA budget share | ≥30% | 15-30% | <15% |

## Output

### LinkedIn Ads Health Score

```
LinkedIn Ads Health Score: XX/100 (Grade: X)

Technical Setup:   XX/100  ████████░░  (25%)
Audience:          XX/100  ██████████  (25%)
Creative:          XX/100  ███████░░░  (20%)
Lead Gen:          XX/100  █████░░░░░  (15%)
Budget & Bidding:  XX/100  ████████░░  (15%)
```

### Deliverables

- `LINKEDIN-ADS-REPORT.md` — Full 25-check findings with pass/warning/fail
- TLA adoption roadmap (if not using)
- ABM strategy recommendations (for B2B)
- Lead Gen Form optimization priorities
- Quick Wins sorted by impact

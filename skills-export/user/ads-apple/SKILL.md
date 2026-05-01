---
name: ads-apple
description: Apple Search Ads (ASA) deep analysis for mobile app advertisers. Evaluates campaign structure, bid health, Creative Sets, MMP attribution, budget pacing, TAP coverage (Today/Search/Product Pages), and goal CPA benchmarks by country. Use when user says "Apple Search Ads", "ASA", "App Store ads", "Apple ads", "Search Ads", or is advertising a mobile app on iOS.
---

# Apple Search Ads (ASA) Deep Analysis

## Process

1. Collect ASA account data (exports from Apple Search Ads dashboard or pasted metrics)
2. Identify active placement types (Search Results, Search Tab, Today Tab, Product Pages)
3. Evaluate all applicable checks as PASS, WARNING, or FAIL
4. Calculate ASA Health Score (0-100)
5. Generate findings report with action plan

## What to Analyze

### Campaign Structure (25% weight)

**BOFU — Bottom of Funnel (Search Results, Exact Match brand)**

- Brand keyword campaign present (own app name + misspellings)
- Competitor campaign present (competitor app names as keywords)
- Category campaigns targeting high-intent generic terms

**MOFU — Middle of Funnel (Search Match / broad discovery)**

- Search Match campaigns active in at least one ad group for discovery
- Search Match ad groups isolated from Exact Match (separate ad groups — never mix)
- Search Terms Report reviewed to mine converting queries for Exact Match promotion

**Campaign Architecture Rules:**

- Brand / Category / Competitor should be separate campaigns
- Search Match ad groups isolated from manual keyword ad groups — NEVER mix in same ad group
- Goal: let Search Match discover, then promote winners to Exact Match campaigns

### Bid Health (20% weight)

- CPT vs category benchmarks
- TTR (Tap-Through Rate): benchmark >2.5% for Search Results, >1.5% for Search Tab
- Conversion Rate (tap → install): benchmark 50-65% for brand terms, 20-40% for category
- CPT/CPG (Cost Per Goal): compare against target CPI/CPA from MMP
- Keyword-level CPT bids set, not just ad group default
- Irrelevant Search Terms identified and excluded via negative keywords

### Creative Sets (15% weight)

- Custom Product Pages (CPP) created in App Store Connect
- At least 3 CPP variants tested per campaign type
- Creative Sets assigned to high-spend ad groups
- Screenshot/preview variations aligned with keyword intent

**Default (Store Listing) Creative:**
- App icon, subtitle, and first 3 screenshots optimized
- Short description (170 chars) compelling and keyword-rich
- Preview video present (strongly recommended for TTR improvement)

### Attribution & MMP Health (15% weight)

- MMP (AppsFlyer / Adjust / Branch / Singular) integrated with ASA via SKAdNetwork + ATT
- ASA is properly connected as a partner in MMP dashboard
- In-app events being sent back to ASA (enables CPA Goals and ROAS optimization)
- Post-install event quality: purchase, subscription_start, or other revenue events tracked
- SKAdNetwork conversion values configured in MMP
- ATT opt-in rate monitored

### Budget Pacing (10% weight)

- Daily cap set at campaign level
- Actual daily spend vs daily cap ratio: flag if consistently hitting cap
- Budget split across placement types aligned with performance

### TAP Coverage — Placement Types (10% weight)

| Placement | Where | Best for | Benchmark CPT |
| --- | --- | --- | --- |
| Search Results | Below search results | High intent, bottom funnel | $0.50-$3.00 |
| Search Tab | Top of Search tab | Discovery, mid funnel | $0.30-$1.50 |
| Today Tab | App Store home | Brand awareness | $1.00-$5.00 |
| Product Pages | Competitor/related app pages | Competitor conquesting | $0.50-$2.00 |

### Goal CPA / KPI Assessment (5% weight)

**Benchmarks by Category (2025-2026 ASA averages):**

| Category | Avg CPT | Avg TTR | Avg Install CVR | Target CPI |
| --- | --- | --- | --- | --- |
| Games | $0.50-$1.00 | 3-5% | 55-70% | $1.00-$3.00 |
| Health & Fitness | $1.50-$3.00 | 2-4% | 45-60% | $3.00-$8.00 |
| Productivity | $1.00-$2.50 | 2-3.5% | 50-65% | $2.00-$5.00 |
| Finance | $2.00-$5.00 | 1.5-3% | 40-55% | $5.00-$15.00 |
| Education | $1.00-$2.00 | 2-4% | 50-65% | $2.00-$6.00 |

## Scoring Weights

| Category | Weight |
| --- | --- |
| Campaign Structure | 25% |
| Bid Health | 20% |
| Creative Sets | 15% |
| Attribution & MMP | 15% |
| Budget Pacing | 10% |
| TAP Coverage | 10% |
| Goal KPI Assessment | 5% |

## Output

```
## Apple Search Ads Audit

**ASA Health Score: [X]/100**

### Critical Issues ([count])
- [Issue with specific impact and fix]

### High Priority ([count])
- [Issue]

### Benchmark Comparison
[Metric] | Your Account | ASA Benchmark | Status

### Quick Wins (do this week)
1. [Most impactful fix with expected outcome]
```

---
name: ads-tiktok
description: TikTok Ads deep analysis covering creative quality, tracking, bidding, campaign structure, and TikTok Shop. Evaluates 25 checks with emphasis on creative-first strategy, safe zone compliance, and Smart+ campaigns. Use when user says "TikTok Ads", "TikTok marketing", "TikTok Shop", "Spark Ads", "Smart+", or "TikTok campaign".
---

# TikTok Ads Deep Analysis

## Process

1. Collect TikTok Ads data (Ads Manager export, Pixel/Events API status)
2. Evaluate all applicable checks as PASS, WARNING, or FAIL
3. Calculate TikTok Ads Health Score (0-100)
4. Generate findings report with action plan

## What to Analyze

### Creative Quality (30% weight)

- ≥6 creatives per ad group — Critical
- All video 9:16 vertical 1080x1920 — Critical
- Native-looking content, not corporate/polished
- Hook in first 1-2 seconds
- No creative active >7 days with declining CTR
- Spark Ads tested: ~3% CTR vs ~2% standard
- TikTok Shop integration for e-commerce
- Video Shopping Ads tested
- Caption SEO with high-intent keywords
- Trending audio used (sound-on platform)
- Custom CTA button, not default
- Safe zone compliance: X:40-940, Y:150-1470

### Technical Setup (25% weight)

- TikTok Pixel installed and firing on all pages
- Events API + ttclid passback active
- Standard events configured (ViewContent, AddToCart, Purchase, CompleteRegistration)
- Advanced matching parameters configured

### Bidding & Budget (20% weight)

- Bid strategy matches goal: Lowest Cost for volume, Cost Cap for efficiency
- Daily budget ≥50x target CPA per ad group
- Learning phase: ≥50 conversions per 7 days per ad group
- No edits during learning phase (resets learning)

### Structure & Settings (15% weight)

- Separate campaigns for prospecting vs retargeting
- Smart+ campaigns tested: 42% adoption, 1.41-1.67 ROAS
- Search Ads Toggle enabled
- Placement selection reviewed: TikTok, Pangle, etc.
- Dayparting aligned with audience activity

### Performance (10% weight)

- CTR ≥1.0% for in-feed ads
- CPA within target, 3x Kill Rule applies
- Average video watch time ≥6 seconds

## Creative-First Strategy

TikTok is a creative-first platform. Unlike Google/Meta where targeting and bidding drive most performance, TikTok success depends primarily on creative quality.

### What Makes a TikTok Ad Work

- **Native feel**: looks like organic content, not a polished ad
- **Sound-on**: 93% of TikTok is consumed with sound (never run silent)
- **Fast hooks**: capture attention in 1-2 seconds or lose the viewer
- **Trend alignment**: use trending sounds, formats, and editing styles
- **UGC style**: user-generated content outperforms studio content
- **Vertical only**: 9:16 is non-negotiable

### Creative Testing Framework

1. Test 3-5 hooks per winning concept
2. Rotate creatives every 5-7 days (fatigue sets in fast)
3. Kill underperformers after 3 days if CTR <0.5%
4. Scale winners by duplicating (not increasing budget on same ad)

## Safe Zone

All critical text, logos, and CTAs must be within the safe zone:

```
┌──────────────────────┐
│   UNSAFE (status)    │  Y: 0-150px
├──────────────────────┤
│                 │UNSA│
│   SAFE ZONE     │FE  │
│   900×1320px    │icon│  X: 40-940px
│                 │    │  Y: 150-1470px
├──────────────────────┤
│   UNSAFE (caption)   │  Y: 1470-1920px
└──────────────────────┘
```

## Key Thresholds

| Metric | Pass | Warning | Fail |
| --- | --- | --- | --- |
| CTR (in-feed) | ≥1.0% | 0.5-1.0% | <0.5% |
| Creatives per ad group | ≥6 | 3-5 | <3 |
| Video watch time | ≥6s | 3-6s | <3s |
| Learning conversions | ≥50/week | 30-50/week | <30/week |
| Daily budget | ≥50x CPA | 20-49x CPA | <20x CPA |

## Output

### TikTok Ads Health Score

```
TikTok Ads Health Score: XX/100 (Grade: X)

Creative Quality:  XX/100  ████████░░  (30%)
Technical Setup:   XX/100  ██████████  (25%)
Bidding & Budget:  XX/100  ███████░░░  (20%)
Structure:         XX/100  █████░░░░░  (15%)
Performance:       XX/100  ████████░░  (10%)
```

### Deliverables

- `TIKTOK-ADS-REPORT.md` — Full 25-check findings with pass/warning/fail
- Creative scorecard per ad (hook quality, safe zone, native feel)
- Smart+ vs manual performance comparison
- TikTok Shop readiness assessment (if e-commerce)
- Quick Wins sorted by impact

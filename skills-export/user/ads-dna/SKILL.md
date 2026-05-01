---
name: ads-dna
description: "Brand DNA extractor for paid advertising. Scans a website URL to extract visual identity, tone of voice, color palette, typography, and imagery style. Outputs brand-profile.json to the current directory. Run before /ads create or /ads generate for brand-consistent creative. Triggers on: \"brand DNA\", \"brand profile\", \"extract brand\", \"brand identity\", \"brand colors\", \"what is the brand voice\", \"analyze brand\", \"brand style guide\"."
---

# Ads DNA — Brand DNA Extractor

Extracts brand identity from a website and saves it as `brand-profile.json` for use by `/ads create`, `/ads generate`, and `/ads photoshoot`.

## Quick Reference

| Command | What it does |
| --- | --- |
| `/ads dna <url>` | Full brand extraction → `brand-profile.json` |
| `/ads dna https://acme.com --quick` | Fast extraction (homepage only) |

## Process

### Step 1: Collect URL

If the user hasn't provided a URL, ask: "What website URL should I analyze for brand DNA?"

### Step 2: Fetch Pages

Use the **WebFetch tool** to retrieve each page. Fetch in this order:

1. **Homepage** (`<url>`)
2. **About page** — try `<url>/about`, then `<url>/about-us`, then `<url>/our-story`
3. **Product/Services page** — try `<url>/product`, then `<url>/products`, then `<url>/services`

**If `--quick` flag was provided**: fetch the homepage only.

If a secondary page returns a 404 or redirect error, continue with fewer pages and note: "Secondary pages unavailable — extraction based on homepage only."

### Step 3: Extract Brand Elements

From the fetched HTML, extract:

**Colors:**
- CSS `background-color` on `body`, `header`, `.hero`, `.btn-primary`
- CSS `color` on `h1`, `h2`, `.btn`
- Identify: primary (most prominent brand color), secondary, background, text

**Typography:**
- `@import url(https://fonts.googleapis.com/...)` → extract font names from URL path
- CSS `font-family` on `h1`, `h2`, `body`, `.headline`

**Voice:** Analyze hero headline, subheadline, About page intro, and CTA button text. Score each axis 1-10:

| Signal | Score direction |
| --- | --- |
| Uses "you/your" frequently | formal_casual → casual (+2) |
| Uses technical jargon | expert_accessible → expert (-2) |
| Short punchy sentences (≤8 words) | bold_subtle → bold (+2) |
| Data/stats in hero | rational_emotional → rational (-2) |
| "Transform", "revolutionize", "disrupt" | traditional_innovative → innovative (+2) |

**Imagery style** (from og:image and any visible hero image descriptions):
- Photography vs. illustration vs. flat design
- Subject matter (people, product, abstract, data)
- Composition style (clean/minimal vs. busy/editorial)

### Step 4: Build brand-profile.json

Construct the JSON object following this schema. Use `null` for any field that cannot be confidently extracted.

```json
{
  "schema_version": "1.0",
  "brand_name": "string",
  "website_url": "string",
  "extracted_at": "ISO-8601",
  "voice": {
    "formal_casual": 1-10,
    "rational_emotional": 1-10,
    "playful_serious": 1-10,
    "bold_subtle": 1-10,
    "traditional_innovative": 1-10,
    "expert_accessible": 1-10,
    "descriptors": ["adjective1", "adjective2", "adjective3"]
  },
  "colors": {
    "primary": "#hexcode or null",
    "secondary": ["#hex1", "#hex2"],
    "forbidden": ["#hex or color name"],
    "background": "#hexcode",
    "text": "#hexcode"
  },
  "typography": {
    "heading_font": "Font Name or null",
    "body_font": "Font Name or system-ui",
    "pairing_descriptor": "brief description"
  },
  "imagery": {
    "style": "professional photography | illustration | flat design | mixed",
    "subjects": ["subject1", "subject2"],
    "composition": "brief description",
    "forbidden": ["element1", "element2"]
  },
  "aesthetic": {
    "mood_keywords": ["keyword1", "keyword2", "keyword3"],
    "texture": "minimal | textured | mixed",
    "negative_space": "generous | moderate | dense"
  },
  "brand_values": ["value1", "value2", "value3"],
  "target_audience": {
    "age_range": "e.g. 25-45",
    "profession": "brief description",
    "pain_points": ["pain1", "pain2"],
    "aspirations": ["aspiration1", "aspiration2"]
  }
}
```

### Step 5: Write brand-profile.json

Write the JSON to `./brand-profile.json` in the current working directory.

### Step 6: Confirm and Summarize

Show the user:

```
✓ brand-profile.json saved to ./brand-profile.json

Brand DNA Summary:
  Brand: [brand_name]
  Voice: [descriptor 1], [descriptor 2], [descriptor 3]
  Primary Color: [hex]
  Typography: [heading_font] / [body_font]
  Target: [age_range] [profession]

Run `/ads create` to generate campaign concepts from this profile.
```

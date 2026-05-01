---
name: ads-generate
description: "AI image generation for paid ad creatives. Reads campaign-brief.md and brand-profile.json to produce platform-sized ad images using Gemini (default) or a configured provider. Requires GOOGLE_API_KEY or ADS_IMAGE_PROVIDER + matching key. Triggers on: \"generate ads\", \"create images\", \"make ad creatives\", \"generate visuals\", \"create ad images\", \"generate campaign images\", \"make the images\", \"generate from brief\"."
---

# Ads Generate — AI Ad Image Generator

Generates platform-sized ad creative images from your campaign brief and brand profile. Uses Gemini by default (`gemini-2.5-flash-image`, stable GA).

## Quick Reference

| Command | What it does |
| --- | --- |
| `/ads generate` | Generate all images from campaign-brief.md |
| `/ads generate --platform meta` | Generate Meta assets only |
| `/ads generate --prompt "text" --ratio 9:16` | Standalone generation without brief |
| `/ads generate --batch` | Use Gemini Batch API (50% cost, 24h turnaround) |

## Environment Setup

**Required before running:**

```shell
# Gemini (default — recommended)
export GOOGLE_API_KEY="your-key"
# Get a key: console.cloud.google.com/apis/credentials

# Switch to a different provider (optional)
export ADS_IMAGE_PROVIDER="openai"
export OPENAI_API_KEY="your-key"

export ADS_IMAGE_PROVIDER="stability"
export STABILITY_API_KEY="your-key"

export ADS_IMAGE_PROVIDER="replicate"
export REPLICATE_API_TOKEN="your-token"
```

If the API key is not set, this skill will display the setup instructions above and stop. It will never fail silently.

## Process

### Step 1: Check API Key

Verify the required environment variable is set before proceeding:

```shell
python3 -c "
import os, sys
provider = os.environ.get('ADS_IMAGE_PROVIDER', 'gemini')
keys = {'gemini': 'GOOGLE_API_KEY', 'openai': 'OPENAI_API_KEY',
        'stability': 'STABILITY_API_KEY', 'replicate': 'REPLICATE_API_TOKEN'}
env_var = keys.get(provider, 'GOOGLE_API_KEY')
if not os.environ.get(env_var):
    print(f'Error: {env_var} not set (provider: {provider})', file=sys.stderr)
    sys.exit(1)
print(f'OK: {env_var} is set')
"
```

If this exits with code 1, display the Environment Setup section above and stop.

### Step 2: Locate Source Files

Check for:
- `campaign-brief.md` → primary source for prompts and dimensions
- `brand-profile.json` → brand color/style injection (optional but recommended)

**If campaign-brief.md is found**: Use `## Image Generation Briefs` section as the generation job list.

**If no campaign-brief.md**: Enter standalone mode — ask the user for the generation prompt, target platform, and output filename.

### Step 3: Generate Images

For each image brief in campaign-brief.md, generate the image using the configured provider. Save outputs to `./ad-assets/[platform]/[concept]/` directory structure.

### Step 4: Report Results

Present a summary:

```
Generation complete:

  Generated assets:
    ✓ ./ad-assets/meta/concept-1/feed-1080x1350.png
    ✓ ./ad-assets/tiktok/concept-1/vertical-1080x1920.png
    ✗ ./ad-assets/google/concept-1/landscape-1200x628.png [error reason]

  Cost estimate: ~$[N] at $0.067/image (Gemini 1K)

  Next steps:
    1. Review assets in ./ad-assets/
    2. Upload to your ad platform managers
```

## Cost Transparency

Before generating, estimate and show the cost:
- Count the number of image briefs in campaign-brief.md
- Multiply by $0.067 (Gemini default 1K)
- Show: "Estimated cost: [N] images × $0.067 = ~$[total]"
- If >$1.00, ask for confirmation before proceeding

## Standalone Mode (No campaign-brief.md)

Platform target → dimensions used:
- meta-feed: 1080×1350 (4:5)
- meta-reels: 1080×1920 (9:16)
- tiktok: 1080×1920 (9:16)
- google-pmax: 1200×628 (1.91:1)
- linkedin: 1080×1080 (1:1)
- youtube: 1280×720 (16:9)
- youtube-short: 1080×1920 (9:16)

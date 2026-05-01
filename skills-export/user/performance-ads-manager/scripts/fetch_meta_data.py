"""
Fetch Meta Ads account data via the Facebook Marketing API.
Outputs JSON files with campaign, ad set, ad, and audience performance data.

Usage:
    python scripts/fetch_meta_data.py --account-id act_123456789 --days 30
    python scripts/fetch_meta_data.py --account-id act_123456789 --days 14 --output ./data/

Requirements:
    pip install facebook-business python-dotenv
"""

import argparse
import json
import os
import sys
from datetime import datetime, timedelta
from pathlib import Path

try:
    from facebook_business.api import FacebookAdsApi
    from facebook_business.adobjects.adaccount import AdAccount
    from facebook_business.adobjects.adsinsights import AdsInsights
    from dotenv import load_dotenv
except ImportError:
    print("❌ Missing dependencies. Install with:")
    print("   pip install facebook-business python-dotenv")
    sys.exit(1)

load_dotenv()

def init_api():
    access_token = os.getenv("META_ACCESS_TOKEN")
    app_id = os.getenv("META_APP_ID")
    app_secret = os.getenv("META_APP_SECRET")

    if not access_token:
        print("❌ META_ACCESS_TOKEN not found in .env file")
        print("   See references/api_setup.md for setup instructions")
        sys.exit(1)

    FacebookAdsApi.init(app_id=app_id, app_secret=app_secret, access_token=access_token)
    return access_token

def get_date_range(days):
    end = datetime.now()
    start = end - timedelta(days=days)
    return {
        "since": start.strftime("%Y-%m-%d"),
        "until": end.strftime("%Y-%m-%d")
    }

def fetch_campaign_performance(account_id, date_range, output_dir):
    print(f"📊 Fetching campaign performance ({date_range['since']} → {date_range['until']})...")
    account = AdAccount(account_id)

    fields = [
        AdsInsights.Field.campaign_name,
        AdsInsights.Field.campaign_id,
        AdsInsights.Field.spend,
        AdsInsights.Field.impressions,
        AdsInsights.Field.reach,
        AdsInsights.Field.frequency,
        AdsInsights.Field.clicks,
        AdsInsights.Field.ctr,
        AdsInsights.Field.cpm,
        AdsInsights.Field.cpc,
        AdsInsights.Field.actions,
        AdsInsights.Field.cost_per_action_type,
        AdsInsights.Field.purchase_roas,
        AdsInsights.Field.action_values,
        AdsInsights.Field.video_30_sec_watched_actions,
        AdsInsights.Field.video_p50_watched_actions,
    ]

    params = {
        "time_range": date_range,
        "level": "campaign",
        "breakdowns": [],
    }

    insights = account.get_insights(fields=fields, params=params)
    data = [dict(i) for i in insights]

    output_path = Path(output_dir) / "meta_campaigns.json"
    output_path.write_text(json.dumps(data, indent=2, default=str))
    print(f"   ✅ {len(data)} campaigns → {output_path}")
    return data

def fetch_adset_performance(account_id, date_range, output_dir):
    print("📦 Fetching ad set performance...")
    account = AdAccount(account_id)

    fields = [
        AdsInsights.Field.campaign_name,
        AdsInsights.Field.adset_name,
        AdsInsights.Field.adset_id,
        AdsInsights.Field.spend,
        AdsInsights.Field.impressions,
        AdsInsights.Field.reach,
        AdsInsights.Field.frequency,
        AdsInsights.Field.clicks,
        AdsInsights.Field.ctr,
        AdsInsights.Field.cpm,
        AdsInsights.Field.cpc,
        AdsInsights.Field.actions,
        AdsInsights.Field.cost_per_action_type,
        AdsInsights.Field.purchase_roas,
    ]

    params = {
        "time_range": date_range,
        "level": "adset",
    }

    insights = account.get_insights(fields=fields, params=params)
    data = [dict(i) for i in insights]

    output_path = Path(output_dir) / "meta_adsets.json"
    output_path.write_text(json.dumps(data, indent=2, default=str))
    print(f"   ✅ {len(data)} ad sets → {output_path}")
    return data

def fetch_ad_performance(account_id, date_range, output_dir):
    print("🎨 Fetching ad (creative) performance...")
    account = AdAccount(account_id)

    fields = [
        AdsInsights.Field.campaign_name,
        AdsInsights.Field.adset_name,
        AdsInsights.Field.ad_name,
        AdsInsights.Field.ad_id,
        AdsInsights.Field.spend,
        AdsInsights.Field.impressions,
        AdsInsights.Field.reach,
        AdsInsights.Field.frequency,
        AdsInsights.Field.clicks,
        AdsInsights.Field.ctr,
        AdsInsights.Field.cpm,
        AdsInsights.Field.cpc,
        AdsInsights.Field.actions,
        AdsInsights.Field.cost_per_action_type,
        AdsInsights.Field.purchase_roas,
        AdsInsights.Field.video_30_sec_watched_actions,
    ]

    params = {
        "time_range": date_range,
        "level": "ad",
    }

    insights = account.get_insights(fields=fields, params=params)
    data = [dict(i) for i in insights]

    output_path = Path(output_dir) / "meta_ads.json"
    output_path.write_text(json.dumps(data, indent=2, default=str))
    print(f"   ✅ {len(data)} ads → {output_path}")
    return data

def main():
    parser = argparse.ArgumentParser(description="Fetch Meta Ads account data")
    parser.add_argument("--account-id", required=True, help="Meta Ad Account ID (format: act_XXXXXXXXX)")
    parser.add_argument("--days", type=int, default=30, help="Number of days to fetch (default: 30)")
    parser.add_argument("--output", default="./meta_data/", help="Output directory")
    args = parser.parse_args()

    print(f"\n🚀 Meta Ads Data Fetch")
    print(f"   Account: {args.account_id}")
    print(f"   Period: last {args.days} days")
    print(f"   Output: {args.output}\n")

    init_api()
    Path(args.output).mkdir(parents=True, exist_ok=True)
    date_range = get_date_range(args.days)

    campaigns = fetch_campaign_performance(args.account_id, date_range, args.output)
    adsets = fetch_adset_performance(args.account_id, date_range, args.output)
    ads = fetch_ad_performance(args.account_id, date_range, args.output)

    # Summary
    total_spend = sum(float(c.get("spend", 0)) for c in campaigns)
    total_impressions = sum(int(c.get("impressions", 0)) for c in campaigns)

    print(f"\n✅ Fetch complete!")
    print(f"   Total spend: €{total_spend:,.2f}")
    print(f"   Total impressions: {total_impressions:,}")
    print(f"   Campaigns: {len(campaigns)} | Ad Sets: {len(adsets)} | Ads: {len(ads)}")
    print(f"\n📁 Data saved to: {args.output}")

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""
Extrait la vue d'ensemble MCC : tous les comptes enfants avec leurs KPIs clés.
Usage: python fetch_mcc_overview.py --mcc-id MCC_ID [--days 30]
"""
import argparse
import json
import sys
from datetime import datetime

try:
    from google.ads.googleads.client import GoogleAdsClient
    from google.ads.googleads.errors import GoogleAdsException
except ImportError:
    print("❌ pip install google-ads --break-system-packages")
    sys.exit(1)


def micros_to_currency(micros):
    return micros / 1_000_000 if micros else 0


def get_child_accounts(client, mcc_id: str) -> list:
    """Récupère tous les comptes enfants du MCC."""
    ga_service = client.get_service("GoogleAdsService")
    customer_service = client.get_service("CustomerService")

    query = """
        SELECT
            customer_client.id,
            customer_client.descriptive_name,
            customer_client.currency_code,
            customer_client.time_zone,
            customer_client.status,
            customer_client.manager,
            customer_client.test_account,
            customer_client.level
        FROM customer_client
        WHERE customer_client.level <= 1
          AND customer_client.manager = false
          AND customer_client.test_account = false
    """

    response = ga_service.search_stream(customer_id=mcc_id, query=query)
    accounts = []
    for batch in response:
        for row in batch.results:
            cc = row.customer_client
            if not cc.manager and not cc.test_account:
                accounts.append({
                    "id": str(cc.id),
                    "name": cc.descriptive_name,
                    "currency": cc.currency_code,
                    "timezone": cc.time_zone,
                    "status": cc.status.name,
                })
    return accounts


def get_account_performance(client, cid: str, days: int) -> dict:
    """Récupère les KPIs d'un compte enfant."""
    ga_service = client.get_service("GoogleAdsService")
    query = f"""
        SELECT
            metrics.impressions,
            metrics.clicks,
            metrics.cost_micros,
            metrics.conversions,
            metrics.conversions_value,
            metrics.ctr,
            metrics.average_cpc
        FROM customer
        WHERE segments.date DURING LAST_{days}_DAYS
    """
    try:
        response = ga_service.search_stream(customer_id=cid, query=query)
        for batch in response:
            for row in batch.results:
                m = row.metrics
                cost = micros_to_currency(m.cost_micros)
                return {
                    "impressions": m.impressions,
                    "clicks": m.clicks,
                    "cost_eur": round(cost, 2),
                    "conversions": round(m.conversions, 1),
                    "conversion_value": round(m.conversions_value, 2),
                    "ctr": round(m.ctr * 100, 2),
                    "avg_cpc_eur": round(micros_to_currency(m.average_cpc), 2),
                    "cpa_eur": round(cost / m.conversions, 2) if m.conversions > 0 else None,
                    "roas": round(m.conversions_value / cost, 2) if cost > 0 and m.conversions_value > 0 else None,
                }
    except Exception:
        return {}
    return {}


def main():
    parser = argparse.ArgumentParser(description="Vue d'ensemble MCC Google Ads")
    parser.add_argument("--mcc-id", required=True, help="ID du compte MCC")
    parser.add_argument("--days", type=int, default=30, help="Période en jours")
    args = parser.parse_args()

    mcc_id = args.mcc_id.replace("-", "")

    client = GoogleAdsClient.load_from_storage()
    print(f"🔄 Récupération des comptes du MCC {args.mcc_id}...")

    accounts = get_child_accounts(client, mcc_id)
    print(f"✅ {len(accounts)} comptes trouvés. Récupération des performances...")

    results = []
    for account in accounts:
        cid = account["id"]
        print(f"   📊 {account['name']} ({cid})...")
        perf = get_account_performance(client, cid, args.days)
        results.append({**account, **perf})

    # Tri par dépense décroissante
    results.sort(key=lambda x: x.get("cost_eur", 0), reverse=True)

    output = {
        "mcc_id": args.mcc_id,
        "period_days": args.days,
        "extracted_at": datetime.now().isoformat(),
        "accounts": results,
        "totals": {
            "total_accounts": len(results),
            "total_spend_eur": round(sum(a.get("cost_eur", 0) for a in results), 2),
            "total_conversions": round(sum(a.get("conversions", 0) for a in results), 1),
        }
    }

    output_file = f"mcc_overview_{mcc_id}_{datetime.now().strftime('%Y%m%d_%H%M')}.json"
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"\n✅ Vue MCC sauvegardée : {output_file}")
    print(f"\n{'Compte':<35} {'Dépense':>12} {'Conv.':>8} {'CPA':>10} {'ROAS':>8}")
    print("─" * 80)
    for a in results:
        print(f"{a['name']:<35} {a.get('cost_eur', 0):>11.2f}€ "
              f"{a.get('conversions', 0):>8.1f} "
              f"{str(a.get('cpa_eur', 'N/A')):>9}€ "
              f"{str(a.get('roas', 'N/A')):>8}x")

    print(f"\nTotal MCC : {output['totals']['total_spend_eur']:,.2f}€ | {output['totals']['total_conversions']} conv.")


if __name__ == "__main__":
    main()

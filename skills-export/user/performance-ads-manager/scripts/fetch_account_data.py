#!/usr/bin/env python3
"""
Extrait toutes les données pertinentes d'un compte Google Ads pour l'audit.
Sauvegarde les résultats en JSON dans un répertoire de travail.

Usage: python fetch_account_data.py --customer-id CUSTOMER_ID [--days 30] [--output-dir ./audit_data]
"""
import argparse
import json
import os
import sys
from datetime import datetime, timedelta

try:
    from google.ads.googleads.client import GoogleAdsClient
    from google.ads.googleads.errors import GoogleAdsException
except ImportError:
    print("❌ pip install google-ads --break-system-packages")
    sys.exit(1)


def micros_to_currency(micros: int) -> float:
    return micros / 1_000_000


def run_query(ga_service, customer_id: str, query: str) -> list:
    """Exécute une requête GAQL et retourne les résultats sous forme de liste de dicts."""
    results = []
    try:
        response = ga_service.search_stream(customer_id=customer_id, query=query)
        for batch in response:
            for row in batch.results:
                results.append(row)
    except GoogleAdsException as ex:
        print(f"⚠️  Erreur sur la requête : {ex.error.code().name}")
        for error in ex.failure.errors:
            print(f"   {error.message}")
    return results


def fetch_campaigns(ga_service, cid: str, days: int) -> list:
    query = f"""
        SELECT
            campaign.id, campaign.name, campaign.status,
            campaign.bidding_strategy_type,
            campaign.advertising_channel_type,
            campaign_budget.amount_micros,
            metrics.impressions, metrics.clicks, metrics.cost_micros,
            metrics.conversions, metrics.conversions_value,
            metrics.ctr, metrics.average_cpc, metrics.cost_per_conversion,
            metrics.search_impression_share,
            metrics.search_budget_lost_impression_share,
            metrics.search_rank_lost_impression_share
        FROM campaign
        WHERE segments.date DURING LAST_{days}_DAYS
          AND campaign.status != 'REMOVED'
        ORDER BY metrics.cost_micros DESC
    """
    rows = run_query(ga_service, cid, query)
    campaigns = []
    for row in rows:
        c = row.campaign
        m = row.metrics
        b = row.campaign_budget
        campaigns.append({
            "id": c.id,
            "name": c.name,
            "status": c.status.name,
            "bidding_strategy": c.bidding_strategy_type.name,
            "channel_type": c.advertising_channel_type.name,
            "budget_eur": micros_to_currency(b.amount_micros),
            "impressions": m.impressions,
            "clicks": m.clicks,
            "cost_eur": micros_to_currency(m.cost_micros),
            "conversions": m.conversions,
            "conversion_value": m.conversions_value,
            "ctr": round(m.ctr * 100, 2),
            "avg_cpc_eur": micros_to_currency(m.average_cpc),
            "cpa_eur": micros_to_currency(m.cost_per_conversion) if m.conversions > 0 else None,
            "roas": round(m.conversions_value / micros_to_currency(m.cost_micros), 2) if m.cost_micros > 0 and m.conversions_value > 0 else None,
            "search_impression_share": round(m.search_impression_share * 100, 1) if m.search_impression_share else None,
            "budget_lost_is": round(m.search_budget_lost_impression_share * 100, 1) if m.search_budget_lost_impression_share else None,
            "rank_lost_is": round(m.search_rank_lost_impression_share * 100, 1) if m.search_rank_lost_impression_share else None,
        })
    return campaigns


def fetch_keywords(ga_service, cid: str, days: int) -> list:
    query = f"""
        SELECT
            campaign.name, ad_group.name,
            ad_group_criterion.keyword.text,
            ad_group_criterion.keyword.match_type,
            ad_group_criterion.quality_info.quality_score,
            ad_group_criterion.quality_info.search_predicted_ctr,
            ad_group_criterion.quality_info.ad_relevance,
            ad_group_criterion.quality_info.landing_page_experience,
            ad_group_criterion.status,
            metrics.impressions, metrics.clicks, metrics.cost_micros,
            metrics.conversions, metrics.average_cpc, metrics.cost_per_conversion
        FROM keyword_view
        WHERE segments.date DURING LAST_{days}_DAYS
          AND ad_group_criterion.status != 'REMOVED'
        ORDER BY metrics.cost_micros DESC
        LIMIT 500
    """
    rows = run_query(ga_service, cid, query)
    keywords = []
    for row in rows:
        kw = row.ad_group_criterion
        m = row.metrics
        keywords.append({
            "campaign": row.campaign.name,
            "ad_group": row.ad_group.name,
            "keyword": kw.keyword.text,
            "match_type": kw.keyword.match_type.name,
            "status": kw.status.name,
            "quality_score": kw.quality_info.quality_score if kw.quality_info.quality_score else None,
            "predicted_ctr": kw.quality_info.search_predicted_ctr.name if kw.quality_info.search_predicted_ctr else None,
            "ad_relevance": kw.quality_info.ad_relevance.name if kw.quality_info.ad_relevance else None,
            "landing_page_exp": kw.quality_info.landing_page_experience.name if kw.quality_info.landing_page_experience else None,
            "impressions": m.impressions,
            "clicks": m.clicks,
            "cost_eur": micros_to_currency(m.cost_micros),
            "conversions": m.conversions,
            "avg_cpc_eur": micros_to_currency(m.average_cpc),
            "cpa_eur": micros_to_currency(m.cost_per_conversion) if m.conversions > 0 else None,
        })
    return keywords


def fetch_search_terms(ga_service, cid: str, days: int) -> list:
    query = f"""
        SELECT
            campaign.name, ad_group.name,
            search_term_view.search_term,
            search_term_view.status,
            metrics.impressions, metrics.clicks, metrics.cost_micros,
            metrics.conversions, metrics.ctr, metrics.average_cpc
        FROM search_term_view
        WHERE segments.date DURING LAST_{days}_DAYS
        ORDER BY metrics.cost_micros DESC
        LIMIT 1000
    """
    rows = run_query(ga_service, cid, query)
    terms = []
    for row in rows:
        m = row.metrics
        terms.append({
            "campaign": row.campaign.name,
            "ad_group": row.ad_group.name,
            "search_term": row.search_term_view.search_term,
            "status": row.search_term_view.status.name,
            "impressions": m.impressions,
            "clicks": m.clicks,
            "cost_eur": micros_to_currency(m.cost_micros),
            "conversions": m.conversions,
            "ctr": round(m.ctr * 100, 2),
            "avg_cpc_eur": micros_to_currency(m.average_cpc),
        })
    return terms


def fetch_ads(ga_service, cid: str, days: int) -> list:
    query = f"""
        SELECT
            campaign.name, ad_group.name,
            ad_group_ad.ad.id,
            ad_group_ad.ad.type,
            ad_group_ad.ad_strength,
            ad_group_ad.status,
            metrics.impressions, metrics.clicks, metrics.cost_micros,
            metrics.conversions, metrics.ctr, metrics.average_cpc
        FROM ad_group_ad
        WHERE segments.date DURING LAST_{days}_DAYS
          AND ad_group_ad.status != 'REMOVED'
        ORDER BY metrics.impressions DESC
        LIMIT 500
    """
    rows = run_query(ga_service, cid, query)
    ads = []
    for row in rows:
        m = row.metrics
        ad = row.ad_group_ad
        ads.append({
            "campaign": row.campaign.name,
            "ad_group": row.ad_group.name,
            "ad_id": ad.ad.id,
            "ad_type": ad.ad.type_.name,
            "ad_strength": ad.ad_strength.name if ad.ad_strength else None,
            "status": ad.status.name,
            "impressions": m.impressions,
            "clicks": m.clicks,
            "cost_eur": micros_to_currency(m.cost_micros),
            "conversions": m.conversions,
            "ctr": round(m.ctr * 100, 2),
            "avg_cpc_eur": micros_to_currency(m.average_cpc),
        })
    return ads


def fetch_conversions(ga_service, cid: str) -> list:
    query = """
        SELECT
            conversion_action.id,
            conversion_action.name,
            conversion_action.status,
            conversion_action.type,
            conversion_action.counting_type,
            metrics.conversions,
            metrics.conversions_value
        FROM conversion_action
        WHERE conversion_action.status != 'REMOVED'
    """
    rows = run_query(ga_service, cid, query)
    convs = []
    for row in rows:
        ca = row.conversion_action
        m = row.metrics
        convs.append({
            "id": ca.id,
            "name": ca.name,
            "status": ca.status.name,
            "type": ca.type_.name,
            "counting_type": ca.counting_type.name,
            "conversions_30d": m.conversions,
            "conversion_value_30d": m.conversions_value,
        })
    return convs


def main():
    parser = argparse.ArgumentParser(description="Extrait les données d'audit d'un compte Google Ads")
    parser.add_argument("--customer-id", required=True, help="ID du compte (ex: 123-456-7890)")
    parser.add_argument("--days", type=int, default=30, help="Période d'analyse en jours (défaut: 30)")
    parser.add_argument("--output-dir", default="./audit_data", help="Répertoire de sortie")
    args = parser.parse_args()

    cid = args.customer_id.replace("-", "")
    os.makedirs(args.output_dir, exist_ok=True)

    print(f"🔄 Connexion au compte {args.customer_id}...")
    client = GoogleAdsClient.load_from_storage()
    ga_service = client.get_service("GoogleAdsService")
    print(f"✅ Connecté. Extraction des données sur {args.days} jours...")

    data = {}

    print("   📊 Campagnes...")
    data["campaigns"] = fetch_campaigns(ga_service, cid, args.days)

    print("   🔑 Mots-clés...")
    data["keywords"] = fetch_keywords(ga_service, cid, args.days)

    print("   🔍 Search terms...")
    data["search_terms"] = fetch_search_terms(ga_service, cid, args.days)

    print("   📣 Annonces...")
    data["ads"] = fetch_ads(ga_service, cid, args.days)

    print("   🎯 Conversions...")
    data["conversions"] = fetch_conversions(ga_service, cid)

    data["meta"] = {
        "customer_id": args.customer_id,
        "days": args.days,
        "extracted_at": datetime.now().isoformat(),
    }

    # Résumé rapide
    total_spend = sum(c["cost_eur"] for c in data["campaigns"])
    total_conv = sum(c["conversions"] for c in data["campaigns"])
    active_campaigns = [c for c in data["campaigns"] if c["status"] == "ENABLED"]
    low_qs_kws = [k for k in data["keywords"] if k["quality_score"] and k["quality_score"] <= 4]
    zero_conv_kws = [k for k in data["keywords"] if k["cost_eur"] > 50 and k["conversions"] == 0]

    data["summary"] = {
        "total_spend_eur": round(total_spend, 2),
        "total_conversions": round(total_conv, 2),
        "avg_cpa_eur": round(total_spend / total_conv, 2) if total_conv > 0 else None,
        "active_campaigns_count": len(active_campaigns),
        "total_keywords": len(data["keywords"]),
        "low_quality_score_keywords": len(low_qs_kws),
        "zero_conversion_keywords_50eur": len(zero_conv_kws),
        "total_search_terms": len(data["search_terms"]),
    }

    output_file = os.path.join(args.output_dir, f"account_data_{cid}_{datetime.now().strftime('%Y%m%d_%H%M')}.json")
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"\n✅ Données extraites et sauvegardées dans : {output_file}")
    print(f"\n📊 Résumé rapide ({args.days} derniers jours) :")
    print(f"   Dépense totale    : {data['summary']['total_spend_eur']:,.2f} €")
    print(f"   Conversions       : {data['summary']['total_conversions']:.1f}")
    print(f"   CPA moyen         : {data['summary']['avg_cpa_eur']:,.2f} €" if data['summary']['avg_cpa_eur'] else "   CPA moyen         : N/A")
    print(f"   Campagnes actives : {data['summary']['active_campaigns_count']}")
    print(f"   Mots-clés QS≤4    : {data['summary']['low_quality_score_keywords']} ⚠️")
    print(f"   Mots-clés >50€ 0 conv : {data['summary']['zero_conversion_keywords_50eur']} ⚠️")
    print(f"\n   📁 Fichier de données : {output_file}")
    print(f"   → Transmettez ce chemin pour démarrer l'audit.")


if __name__ == "__main__":
    main()

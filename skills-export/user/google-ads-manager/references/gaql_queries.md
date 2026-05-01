# GAQL — Requêtes Pré-construites

GAQL (Google Ads Query Language) est le langage de requête de l'API Google Ads. Ces requêtes couvrent les cas d'usage les plus fréquents.

---

## Performance des campagnes (30 derniers jours)

```sql
SELECT
  campaign.id,
  campaign.name,
  campaign.status,
  campaign.bidding_strategy_type,
  campaign_budget.amount_micros,
  metrics.impressions,
  metrics.clicks,
  metrics.cost_micros,
  metrics.conversions,
  metrics.conversions_value,
  metrics.ctr,
  metrics.average_cpc,
  metrics.cost_per_conversion,
  metrics.search_impression_share,
  metrics.search_budget_lost_impression_share,
  metrics.search_rank_lost_impression_share
FROM campaign
WHERE segments.date DURING LAST_30_DAYS
  AND campaign.status != 'REMOVED'
ORDER BY metrics.cost_micros DESC
```

---

## Performance des groupes d'annonces

```sql
SELECT
  campaign.name,
  ad_group.id,
  ad_group.name,
  ad_group.status,
  metrics.impressions,
  metrics.clicks,
  metrics.cost_micros,
  metrics.conversions,
  metrics.average_cpc,
  metrics.cost_per_conversion
FROM ad_group
WHERE segments.date DURING LAST_30_DAYS
  AND ad_group.status != 'REMOVED'
ORDER BY metrics.cost_micros DESC
```

---

## Performance des mots-clés avec Quality Score

```sql
SELECT
  campaign.name,
  ad_group.name,
  ad_group_criterion.keyword.text,
  ad_group_criterion.keyword.match_type,
  ad_group_criterion.quality_info.quality_score,
  ad_group_criterion.quality_info.search_predicted_ctr,
  ad_group_criterion.quality_info.ad_relevance,
  ad_group_criterion.quality_info.landing_page_experience,
  metrics.impressions,
  metrics.clicks,
  metrics.cost_micros,
  metrics.conversions,
  metrics.average_cpc,
  metrics.cost_per_conversion,
  ad_group_criterion.status
FROM keyword_view
WHERE segments.date DURING LAST_30_DAYS
  AND ad_group_criterion.status != 'REMOVED'
ORDER BY metrics.cost_micros DESC
```

---

## Termes de recherche (Search Terms)

```sql
SELECT
  campaign.name,
  ad_group.name,
  search_term_view.search_term,
  search_term_view.status,
  metrics.impressions,
  metrics.clicks,
  metrics.cost_micros,
  metrics.conversions,
  metrics.ctr,
  metrics.average_cpc
FROM search_term_view
WHERE segments.date DURING LAST_30_DAYS
ORDER BY metrics.cost_micros DESC
LIMIT 1000
```

---

## Performance des annonces (RSA)

```sql
SELECT
  campaign.name,
  ad_group.name,
  ad_group_ad.ad.id,
  ad_group_ad.ad.type,
  ad_group_ad.ad.responsive_search_ad.headlines,
  ad_group_ad.ad.responsive_search_ad.descriptions,
  ad_group_ad.ad_strength,
  ad_group_ad.status,
  metrics.impressions,
  metrics.clicks,
  metrics.cost_micros,
  metrics.conversions,
  metrics.ctr,
  metrics.average_cpc
FROM ad_group_ad
WHERE segments.date DURING LAST_30_DAYS
  AND ad_group_ad.status != 'REMOVED'
ORDER BY metrics.impressions DESC
```

---

## Extensions / Assets au niveau compte

```sql
SELECT
  asset.id,
  asset.name,
  asset.type,
  asset.final_urls,
  asset.sitelink_asset.description1,
  asset.sitelink_asset.description2,
  asset.callout_asset.callout_text,
  asset.call_asset.phone_number
FROM asset
WHERE asset.type IN ('SITELINK', 'CALLOUT', 'STRUCTURED_SNIPPET', 'CALL')
```

---

## Taux de perte d'impression par budget

```sql
SELECT
  campaign.name,
  metrics.search_impression_share,
  metrics.search_budget_lost_impression_share,
  metrics.search_rank_lost_impression_share,
  metrics.search_exact_match_impression_share,
  metrics.cost_micros,
  campaign_budget.amount_micros
FROM campaign
WHERE segments.date DURING LAST_30_DAYS
  AND campaign.advertising_channel_type = 'SEARCH'
  AND campaign.status = 'ENABLED'
ORDER BY metrics.search_budget_lost_impression_share DESC
```

---

## Audiences configurées sur les campagnes

```sql
SELECT
  campaign.name,
  campaign_criterion.type,
  campaign_criterion.bid_modifier,
  campaign_criterion.negative,
  user_list.name,
  user_interest.name
FROM campaign_audience_view
WHERE campaign.status = 'ENABLED'
```

---

## Actions de conversion

```sql
SELECT
  conversion_action.id,
  conversion_action.name,
  conversion_action.status,
  conversion_action.type,
  conversion_action.counting_type,
  conversion_action.attribution_model_settings.attribution_model,
  conversion_action.click_through_lookback_window_days,
  metrics.conversions,
  metrics.conversions_value
FROM conversion_action
WHERE conversion_action.status != 'REMOVED'
  AND segments.date DURING LAST_30_DAYS
```

---

## Vue MCC — Tous les comptes enfants

```sql
SELECT
  customer_client.id,
  customer_client.descriptive_name,
  customer_client.currency_code,
  customer_client.time_zone,
  customer_client.status,
  customer_client.manager,
  customer_client.test_account
FROM customer_client
WHERE customer_client.level <= 1
```

---

## Mots-clés sans conversion depuis 90 jours (candidats à la pause)

```sql
SELECT
  campaign.name,
  ad_group.name,
  ad_group_criterion.keyword.text,
  ad_group_criterion.keyword.match_type,
  metrics.clicks,
  metrics.cost_micros,
  metrics.conversions
FROM keyword_view
WHERE segments.date DURING LAST_90_DAYS
  AND metrics.clicks > 10
  AND metrics.conversions = 0
  AND ad_group_criterion.status = 'ENABLED'
ORDER BY metrics.cost_micros DESC
```

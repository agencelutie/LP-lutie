---
name: weekly-ads-report
description: >
  Rapport hebdomadaire Google Ads pour un compte client, au format Lutie — extraction automatique via MCP Google Ads, tableau KPIs S/S-1, puis rapport structuré en 4 sections : résumé stratégique (observé/signifie/conclu), points d'attention avec hypothèse causale et mitigation, points de réussite avec capitalisation, et actions à venir numérotées avec date de prochain point.
  Utiliser ce skill dès que l'utilisateur mentionne : rapport hebdo, rapport hebdomadaire, bilan de la semaine, point hebdo, weekly report, "que s'est-il passé cette semaine", "rapport pour [nom client]", "prépare le rapport de la semaine", "envoie le récap au client", "point sur les campagnes de la semaine", "résumé hebdo", ou toute demande de synthèse de performance sur 7 jours.
  Même pour des demandes simples comme "point sur WATERCAM cette semaine" ou "récap hebdo chauffoplombier", ce skill apporte une structure d'agence complète et doit être déclenché.
---

# Rapport Hebdomadaire Google Ads — Standards Lutie

Tu produis le rapport hebdomadaire d'un compte Google Ads client. Ce rapport est le livrable que le gestionnaire de compte (ou le client) reçoit chaque semaine. Il suit un format d'agence précis en 4 sections qui racontent une histoire : voici ce qu'on a observé, voici ce que ça signifie, voici ce qu'on en fait.

**Principe fondamental** : chaque ligne du rapport est justifiée par une donnée extraite du compte. Zéro affirmation sans preuve. Zéro recommandation vague. Les hypothèses sont explicitement taguées `[HYPOTHÈSE]`, les faits confirmés sont tagués `[ÉVIDENCE]`.

---

## PRÉ-REQUIS TECHNIQUE

Avant le premier appel MCP, charger les outils nécessaires via `tool_search`. Un seul appel suffit pour toute la session :
```
tool_search("google ads campaign performance gaql")
```
Cela rend disponibles : `list_accounts`, `get_campaign_performance`, `get_ad_performance`, `get_account_currency`, `run_gaql`, `execute_gaql_query`. Ne pas appeler `tool_search` plusieurs fois pour les mêmes outils — une seule fois couvre toute la session.

---

## WORKFLOW

1. **Identifier le compte** → customer_id + devise (en UN appel)
2. **Extraire les données** → 14 jours, requêtes consolidées
3. **Construire le tableau KPIs** → vue chiffrée brute
4. **Rédiger le rapport au format Lutie** → 4 sections (voir ÉTAPE 4)
5. **Générer le résumé WhatsApp/email** → copier-coller prêt

---

## SKILLS COMPLÉMENTAIRES — Couches de profondeur

Ce skill orchestre 3 autres skills pour aller au-delà d'un simple relevé de métriques. Ils ne sont pas tous nécessaires à chaque rapport — les déclencher quand le contexte le justifie.

### `/ads-google` — Grille d'analyse des 74 checks

Lire le SKILL.md de `/ads-google` (dans `/mnt/skills/user/ads-google/SKILL.md`) pour accéder aux seuils de référence et à la grille de checks. L'utiliser pour :

- **Enrichir l'extraction (étape 2)** : quand un point d'attention émerge des données brutes, aller creuser avec la grille des 74 checks. Par exemple, si le CPC monte → vérifier les Quality Scores avec les seuils `/ads-google` (QS ≥7 = Pass, 5-6 = Warning, <5 = Fail). Si le wasted spend semble élevé → appliquer la méthodologie négatifs d'`/ads-google` (exact match par défaut, phrase match pour les intentions, jamais de broad match négatif sauf justification).
- **Enrichir les points d'attention (section 2)** : qualifier chaque anomalie avec le vocabulaire PASS / WARNING / FAIL quand c'est pertinent. Ex : "QS moyen du groupe 'mitigeurs' : 4/10 → FAIL selon grille agence".
- **Enrichir les points de réussite (section 3)** : si un RSA passe en ad strength "Excellent" ou qu'un CTR dépasse le seuil ≥6.66%, le signaler comme PASS.
- **PMax** : si le compte a des campagnes Performance Max, appliquer systématiquement le "PMax Deep Dive" d'`/ads-google` (asset groups, audience signals, URL expansion, brand exclusions, search themes).

**Quand le déclencher** : à chaque rapport. La grille de seuils doit être le référentiel permanent pour qualifier les observations.

### `/ads-audit` — Health Score et priorisation

Lire le SKILL.md de `/ads-audit` (dans `/mnt/skills/user/ads-audit/SKILL.md`) pour accéder au scoring et à la méthode de priorisation. L'utiliser pour :

- **Calculer un Health Score hebdomadaire** : appliquer les pondérations Google Ads (Conversion 25%, Waste 20%, Structure 15%, Keywords 15%, Ads 15%, Settings 10%) aux données de la semaine. Ce score apparaît en tête du résumé stratégique (section 1) — il donne au client un indicateur synthétique de la santé du compte.
- **Prioriser les points d'attention (section 2)** : utiliser les niveaux de priorité d'`/ads-audit` pour taguer chaque point :
  - **Critical** = risque de perte de revenu ou de données → action immédiate
  - **High** = frein significatif à la performance → corriger sous 7 jours
  - **Medium** = opportunité d'optimisation → corriger sous 30 jours
  - **Low** = best practice mineure → backlog
- **Enrichir le résumé stratégique (section 1)** : le bloc "Ce que cela signifie" peut référencer le Health Score et son évolution S/S pour donner une lecture macro ("Score santé du compte : 72/100 vs 68 S-1 → amélioration, mais encore en zone C").

**Quand le déclencher** : à chaque rapport si le temps le permet. Au minimum, utiliser les niveaux de priorité (Critical/High/Medium/Low) pour classifier les points d'attention.

### `/ads-plan` — Rigueur stratégique pour les actions

Lire le SKILL.md de `/ads-plan` (dans `/mnt/skills/user/ads-plan/SKILL.md`) pour accéder aux frameworks de planning. L'utiliser pour :

- **Enrichir les actions à venir (section 4)** quand une recommandation implique un changement structurel : nouvelle campagne, restructuration brand/non-brand, ajout d'un type de campagne (PMax, Display, YouTube). Dans ces cas, les actions doivent suivre la méthodologie `/ads-plan` : architecture de campagne, convention de nommage, budget pacing (70/20/10), phase d'implémentation.
- **Recommandations de scaling** : si le rapport identifie une opportunité de scaling (campagne à CPA très sous la cible + IS Budget Lost élevé), les actions doivent suivre la règle des 20% d'`/ads-plan` et inclure un mini-roadmap (semaine 1 : +20%, semaine 2 : observer, semaine 3 : +20% si stable).
- **Propositions de tests** : s'il y a de la place pour des tests (RSA, audiences, landing pages), utiliser le format de test d'`/ads-plan` (hypothèse, variable testée, critère de succès, durée).

**Quand le déclencher** : uniquement quand une action dépasse le simple ajustement opérationnel (négatifs, pauses, bids). Si le rapport recommande un changement structurel, invoquer `/ads-plan` pour structurer la recommandation proprement.

---

## ÉTAPE 1 — Identifier le compte

**Comportement par défaut** : toujours commencer par lister les comptes accessibles avec leurs noms pour que l'utilisateur puisse choisir.

### Procédure de listing

1. Lancer `list_accounts` pour récupérer les CIDs bruts
2. Tenter de récupérer les noms descriptifs. Deux méthodes, dans cet ordre :

**Méthode A — Requête MCC `customer_client`** (la plus rapide si le MCC est configuré) :
```sql
SELECT customer_client.id, customer_client.descriptive_name,
  customer_client.currency_code, customer_client.status
FROM customer_client
WHERE customer_client.level <= 1
```
Si ça retourne les résultats : on a les noms + devises de tous les comptes en un appel.

**Méthode B — Requête `customer` par CID** (fallback si le MCC n'est pas configuré) :
Si la méthode A retourne une erreur 403, itérer sur les CIDs avec cette requête :
```sql
SELECT customer.descriptive_name, customer.id, customer.currency_code FROM customer
```
Attention : certains CIDs retourneront 403 (problème MCC) — les ignorer silencieusement. Ne présenter que les comptes qui répondent.

3. Présenter la liste des comptes accessibles à l'utilisateur sous forme de tableau :
```
Comptes Google Ads accessibles :
| CID          | Nom du compte     | Devise |
|--------------|-------------------|--------|
| 7594070242   | Watercam          | EUR    |
| 8186178660   | Lutie ☀️          | EUR    |
| ...          | ...               | ...    |
```

4. Demander à l'utilisateur de choisir.

### Si l'utilisateur a déjà donné un CID ou un nom

- **CID donné** → l'utiliser directement, passer à l'étape 2. La devise sera récupérée dans la première requête GAQL (via `customer.currency_code`).
- **Nom donné** → matcher avec la liste. Si pas de liste encore, lancer la procédure de listing ci-dessus et filtrer.

**Rappel : les coûts API sont en micros → diviser par 1 000 000.**

---

## ÉTAPE 2 — Extraction des données (14 jours)

**Objectif : extraire toute la matière brute en un minimum d'appels MCP.** Chaque appel MCP a un coût en temps et en tokens. Consolider au maximum.

### Stratégie d'extraction en 4 appels (au lieu de 8+)

**Appel 1 — Vue consolidée campagnes + devise + IS** (via `run_gaql`) :
```sql
SELECT customer.currency_code,
  campaign.name, campaign.status, campaign.bidding_strategy_type,
  campaign.advertising_channel_type,
  segments.date,
  metrics.impressions, metrics.clicks, metrics.cost_micros,
  metrics.conversions, metrics.conversions_value,
  metrics.ctr, metrics.average_cpc, metrics.cost_per_conversion,
  metrics.search_impression_share,
  metrics.search_budget_lost_impression_share,
  metrics.search_rank_lost_impression_share,
  campaign_budget.amount_micros
FROM campaign
WHERE segments.date DURING LAST_14_DAYS
  AND campaign.status != 'REMOVED'
ORDER BY segments.date DESC
```
Cette unique requête fournit : la devise du compte, la performance par campagne par jour (pour S vs S-1), l'impression share, le budget. Elle remplace les anciens appels 2.1, 2.5, et 2.6.

**Appel 2 — Search terms de la semaine** (via `run_gaql`) :
```sql
SELECT campaign.name, ad_group.name,
  search_term_view.search_term, search_term_view.status,
  metrics.impressions, metrics.clicks, metrics.cost_micros,
  metrics.conversions, metrics.ctr, metrics.average_cpc
FROM search_term_view
WHERE segments.date DURING LAST_7_DAYS
ORDER BY metrics.cost_micros DESC
LIMIT 100
```

**Appel 3 — Mots-clés : performance + QS + zéro conversion** (via `run_gaql`) :
```sql
SELECT campaign.name, ad_group.name,
  ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type,
  ad_group_criterion.quality_info.quality_score,
  ad_group_criterion.quality_info.creative_quality_score,
  ad_group_criterion.quality_info.post_click_quality_score,
  ad_group_criterion.quality_info.search_predicted_ctr,
  metrics.impressions, metrics.clicks, metrics.cost_micros,
  metrics.conversions, metrics.average_cpc,
  ad_group_criterion.status
FROM keyword_view
WHERE segments.date DURING LAST_7_DAYS
  AND ad_group_criterion.status != 'REMOVED'
  AND metrics.cost_micros > 0
ORDER BY metrics.cost_micros DESC
```
**Attention aux noms de champs QS** : les champs corrects sont `creative_quality_score`, `post_click_quality_score` et `search_predicted_ctr`. Les champs `ad_relevance` et `landing_page_experience` n'existent PAS dans l'API GAQL et retourneront une erreur UNRECOGNIZED_FIELD.

Cette requête couvre à la fois les mots-clés sans conversion (filtrer `conversions = 0` en post-traitement) ET les Quality Scores. Elle remplace les anciens appels 2.4 et 2.7a.

**Appel 4 — Annonces : performance + Ad Strength** (via `run_gaql`) :
```sql
SELECT campaign.name, ad_group.name,
  ad_group_ad.ad.type, ad_group_ad.ad_strength, ad_group_ad.status,
  metrics.impressions, metrics.clicks, metrics.cost_micros,
  metrics.conversions, metrics.ctr, metrics.average_cpc
FROM ad_group_ad
WHERE segments.date DURING LAST_7_DAYS
  AND ad_group_ad.status != 'REMOVED'
ORDER BY metrics.impressions DESC
```
**Note sur les campagnes Smart/Smart Campaign** : les annonces de type `SMART_CAMPAIGN_AD` n'ont pas de headlines/descriptions exploitables ni d'ad_strength. Elles apparaîtront avec 0 impressions dans les résultats GAQL car leur trafic transite par un autre canal (Maps, Search partenaires). Ne pas les inclure dans l'analyse RSA — les traiter comme une boîte noire et se concentrer sur la performance globale de la campagne Smart (visible dans l'appel 1).

**Ne pas inclure `ad_group_ad.ad.responsive_search_ad.headlines` ni `.descriptions`** dans cette requête — ces champs alourdissent fortement la réponse et ne sont utiles que si un audit créatif détaillé est demandé. Pour le rapport hebdo, l'ad_strength + type suffisent.

Cette requête couvre la performance des annonces ET l'ad strength.

### Post-traitement

Une fois les 4 appels retournés, calculer en interne (sans appel MCP supplémentaire) :
- Séparer les données campagne (appel 1) en S (7 derniers jours) et S-1 (7 jours précédents) par agrégation des `segments.date`
- Filtrer les mots-clés à 0 conversion depuis l'appel 3
- Extraire la devise depuis le premier résultat de l'appel 1
- Calculer les métriques dérivées (CPA, ROAS, taux de conversion) à partir des données brutes

---

## ÉTAPE 3 — Tableau KPIs S/S-1

Séparer les données en S (7 derniers jours) et S-1 (7 jours précédents). Calculer les écarts.

**Format :**

```
📊 GOOGLE ADS — Semaine du [date début] au [date fin]

| Métrique         | S (cette sem.) | S-1 (sem. préc.) | Évolution |
|------------------|---------------|-------------------|-----------|
| Dépense          | X €           | Y €               | +/-Z%     |
| Conversions      | X             | Y                 | +/-Z%     |
| CPA moyen        | X €           | Y €               | +/-Z%     |
| ROAS             | X%            | Y%                | +/-Z pts  |
| CA / Valeur conv | X €           | Y €               | +/-Z%     |
| Impressions      | X             | Y                 | +/-Z%     |
| Clics            | X             | Y                 | +/-Z%     |
| CTR              | X%            | Y%                | +/-Z pts  |
| CPC moyen        | X €           | Y €               | +/-Z%     |
| Taux de conv.    | X%            | Y%                | +/-Z pts  |
```

Puis un tableau par campagne active (mêmes colonnes, trié par dépense décroissante).

**Mise en forme** : évolutions >15% en **gras**, CPA dépassant l'objectif client signalé ⚠️, arrondi € à 2 déc., % à 1 déc., volumes entiers.

Ce tableau sert de socle factuel — il n'est PAS le livrable final. Le livrable est le rapport Lutie (étape 4).

---

## ÉTAPE 4 — Rapport au format Lutie

C'est le cœur du livrable. 4 sections obligatoires, dans cet ordre exact. Le ton est celui d'un consultant senior qui parle à son client : factuel, direct, zéro bullshit, mais aussi pédagogue quand il faut expliquer un mécanisme.

---

### SECTION 1 — Résumé stratégique

Structure en 3 sous-blocs. Chacun contient 2 à 4 bullets maximum. Le but est qu'un dirigeant comprenne la situation en 30 secondes.

```
1) Résumé stratégique

🏥 Score santé du compte : XX/100 (Grade X) — vs XX S-1 [+/-X pts]

* Ce que nous avons observé :
   * [Métrique 1 S vs S-1 avec chiffres exacts et écart %]
   * [Métrique 2 S vs S-1]
   * [Métrique 3 S vs S-1]

* Ce que cela signifie :
   * [Interprétation business — en langage client, pas en jargon ads]
   * [Dynamique globale — scaling, régression, stagnation ?]
   * [Nuance ou contrepoids si pertinent — ex : "le CVR compense la hausse CPC"]

* Ce que nous en concluons :
   * [Conclusion opérationnelle — que fait-on la semaine prochaine ?]
```

Le **Health Score** est calculé selon la grille `/ads-audit` (Conversion 25%, Waste 20%, Structure 15%, Keywords 15%, Ads 15%, Settings 10%). Il offre au client un thermomètre immédiat. Grading : A (90-100), B (75-89), C (60-74), D (40-59), F (<40).

**Règles d'écriture :**
- "Ce que nous avons observé" = données brutes, chiffres (S vs S-1), %. Pas d'interprétation ici.
- "Ce que cela signifie" = lecture business. Traduire les métriques en impact réel. Exemple : "la montée en budget a bien pris en volume, mais le gain est partiellement absorbé par des clics plus chers" est bon. "Le CPC a augmenté" seul est insuffisant — ça, c'est de l'observation, pas du sens.
- "Ce que nous en concluons" = orientation stratégique pour la période suivante, en une ou deux phrases. Rester actionnable.

---

### SECTION 2 — Points d'attention (et pourquoi)

Chaque point d'attention suit ce format exact :

```
2) Points d'attention (et pourquoi)

* 🔴 [CRITICAL] [Métrique en mouvement défavorable (chiffre S vs S-1)] → [conséquence business]
   * Cause : [HYPOTHÈSE] ou [ÉVIDENCE] + explication courte
   * Mitigation : [action concrète recommandée]

* 🟡 [HIGH] [Point d'attention suivant]
   * Cause : ...
   * Mitigation : ...
```

**Niveaux de priorité** (issus de la grille `/ads-audit`) :
- 🔴 **Critical** = risque de perte de revenu ou de données → action immédiate
- 🟡 **High** = frein significatif à la performance → corriger sous 7 jours
- 🟠 **Medium** = opportunité d'optimisation → corriger sous 30 jours
- ⚪ **Low** = best practice mineure → backlog

**Qualifier avec les seuils `/ads-google`** quand applicable :
- Quality Score : ≥7 Pass, 5-6 Warning, <5 Fail
- CTR Search : ≥6.66% Pass, 3-6.66% Warning, <3% Fail
- CVR Search : ≥7.52% Pass, 3-7.52% Warning, <3% Fail
- Wasted Spend : <10% Pass, 10-20% Warning, >20% Fail
- Ad Strength : Good+ Pass, Average Warning, Poor Fail

**Taguer explicitement les causes :**
- `[HYPOTHÈSE]` quand on suppose (concurrence, saisonnalité, learning phase…)
- `[ÉVIDENCE]` quand on a la preuve dans les données (search term identifié, jour de rupture visible, tracking cassé confirmé)

**Points d'attention à ne jamais manquer** (si présents dans les données) :
- CPA en hausse >15% S/S → identifier la cause (CPC ? CVR ? search terms polluants ?)
- CPC en hausse → pression enchères ou dégradation QS ?
- Mot-clé avec dépense > 3× CPA cible et 0 conversion → pause immédiate (règle agence 2.4)
- IS Budget Lost > 20% sur campagne rentable → argent laissé sur la table
- Annonce avec CTR en chute > 20% sur >30 jours → fatigue créative
- Événement externe connu (rupture stock, promo terminée, saisonnalité) → anticiper l'impact

**La mitigation doit être concrète** : pas "optimiser les enchères" mais "renforcer mots-clés exacts + ajouter négatifs sur requêtes à CPA >X€" ou "ajuster bid -15% sur segment mobile si CPA mobile >2× desktop".

---

### SECTION 3 — Points de réussite (et pourquoi)

Même logique que les points d'attention, mais pour ce qui fonctionne. Chaque réussite inclut une action de capitalisation.

```
3) Points de réussite (et pourquoi)

* [Métrique positive (chiffre S vs S-1)] → [signal positif en une phrase]
   * On capitalise : [action pour amplifier ou sécuriser ce gain]

* [Réussite suivante]
   * On capitalise : ...
```

**Pourquoi cette section est importante** : elle sert à identifier ce qui marche pour y allouer davantage de budget/attention. Si une campagne non-brand sort un CPA à 60% de la cible, c'est un signal de scaling. Si un test RSA surperforme, c'est un signal pour déployer le gagnant.

Ne pas inventer de réussites artificielles. Si la semaine est mauvaise sur tous les plans, cette section peut être courte (1 point) ou signaler explicitement : "Semaine sans réussite notable — les actions correctives de la section précédente sont la priorité."

---

### SECTION 4 — Actions à venir (prochaine période)

Liste numérotée d'actions concrètes pour la semaine suivante + date du prochain point de suivi.

```
4) Actions à venir (prochaine période)

1. [Verbe + objet exact + contexte si nécessaire]
2. [Action suivante]
3. [Action suivante]
4. [Action suivante]

Prochain point de suivi : [date — généralement S+1 même jour]
```

**Règles pour les actions :**
- Chaque action commence par un verbe : Isoler, Renforcer, Poursuivre, Ajouter, Mettre en pause, Tester, Vérifier, Ajuster, Créer, Lancer…
- Chaque action est auto-porteuse : quelqu'un qui lit cette ligne seule comprend ce qu'il doit faire.
- L'ordre reflète la priorité : action 1 = la plus urgente/impactante.
- 4 à 6 actions maximum. Au-delà, on dilue l'attention.
- Les actions découlent directement des mitigations (section 2) et des capitalisations (section 3). Si une action n'a pas de justification dans le rapport, elle n'a pas sa place ici.

**Actions structurelles — invoquer `/ads-plan`** :
Si une action implique un changement structurel (nouvelle campagne, restructuration brand/non-brand, ajout PMax/Display/YouTube), la formuler avec la rigueur `/ads-plan` :
- Convention de nommage : `[Platform]_[Objective]_[Audience]_[Geo]_[Date]`
- Budget pacing : règle 70/20/10 (Proven/Scaling/Testing)
- Scaling : +20% max par palier, 7j d'observation entre chaque palier
- Format de test : hypothèse → variable testée → critère de succès → durée

Exemple d'action structurelle bien formulée :
```
3. Lancer une campagne SEARCH_CONV_NonBrand-Mitigeurs_FR_2026Q2 pour isoler le non-brand.
   Architecture : 3 ad groups thématiques (mitigeurs-thermostatiques, mitigeurs-bain, mitigeurs-cuisine).
   Budget initial : 15€/j (10% du budget total = phase test). Bid : Maximize Conversions sans cible pendant 2 semaines.
   Critère de passage : CPA ≤ cible × 1.2 après 30 conversions.
```

**Règles d'agence à respecter dans les recommandations :**
- Jamais de hausse budget > 20% en une fois (règle 5.2)
- Jamais de Target CPA/ROAS si < 30 conversions/mois (règle 5.1)
- Mot-clé dépense > 3× CPA cible + 0 conv → pause immédiate (règle 2.4)
- Négatifs search terms : chaque semaine sans exception (règle 2.3)
- Broad Match uniquement si smart bidding + 50 conv/mois + audiences observation (règle 2.1)

**Prochain point de suivi** : toujours indiquer la date. Généralement 7 jours après, sauf situation critique (raccourcir à 3-4 jours et le justifier).

---

## ÉTAPE 5 — Résumé WhatsApp / Email

Résumé court, prêt à copier-coller, destiné au client. Il doit tenir en un seul écran de téléphone.

Lire le format dans `references/whatsapp_template.md`.

Si ce fichier n'existe pas encore, utiliser ce format par défaut et demander à l'utilisateur de fournir son template :

```
📊 *Rapport Hebdo — [Client]* | Sem. du [date] au [date]

💰 Dépense : X€ (±Z% vs S-1)
🎯 Conversions : X (±Z%)
📈 CPA : X€ vs Y€ | ROAS : X% vs Y%

✅ Point positif : [1 phrase issue section 3]
⚠️ Attention : [1 phrase issue section 2]
➡️ Action prioritaire : [1 phrase issue section 4, action n°1]

Prochain point : [date]
```

**Ton** : factuel, concis, professionnel. Le client est un dirigeant — pas de jargon technique sans explication.

---

## RÈGLES TRANSVERSALES

1. **Chaque chiffre est sourcé** — il vient d'une requête MCP. Pas d'estimation.
2. **Comparaison S/S-1 systématique** — jamais de chiffre brut sans contexte temporel.
3. **Coûts en micros** — diviser par 1 000 000 avant affichage.
4. **Campagnes REMOVED exclues** du rapport.
5. **Peu de données** (<7j d'historique ou <10 conv/semaine) → signaler explicitement que les variations % sont statistiquement peu fiables. Exemple : "⚠️ Volumes faibles (11 conv/semaine) — les variations % sont à interpréter avec prudence." Ne pas tirer de conclusions définitives sur des variations de 2-3 conversions.
6. **Requête MCP qui échoue** → signaler ce qui manque. Ne jamais inventer.
7. **Hypothèses vs évidences** → toujours taguer `[HYPOTHÈSE]` ou `[ÉVIDENCE]`.
8. **Campagnes Smart** → les traiter en boîte noire (performance globale uniquement). Pas d'analyse RSA/QS/IS sur ces campagnes.
9. **Efficacité des appels MCP** → ne jamais faire 2 appels là où 1 suffit. Consolider les champs dans les requêtes GAQL. Pas d'appel `get_account_currency` séparé si la devise est déjà dans la requête campagnes.

---

## GESTION DES ERREURS

**Erreur 403 "USER_PERMISSION_DENIED" / "login-customer-id"** → C'est le problème le plus fréquent. Le MCP Google Ads est connecté à un MCC mais le header `login-customer-id` n'est pas configuré correctement. Comportement attendu :
- En étape 1, certains CIDs retourneront 403 lors du listing → les ignorer silencieusement, ne présenter que les comptes accessibles
- Si TOUS les CIDs échouent → demander à l'utilisateur de vérifier la configuration MCP (le CID du MCC doit être configuré comme login-customer-id)

**Erreur "CUSTOMER_NOT_ENABLED"** → Le compte est désactivé ou suspendu. L'exclure silencieusement de la liste des comptes accessibles.

**`list_accounts` retourne des CIDs sans noms** → Utiliser la procédure de listing de l'étape 1 (requête `customer` par CID) pour récupérer les noms. Ne jamais présenter une liste de CIDs nus à l'utilisateur.

**`list_accounts` ne retourne rien** → MCP non connecté. Demander à l'utilisateur de le connecter dans les paramètres.

**Erreur "UNRECOGNIZED_FIELD" sur une requête GAQL** → Un champ n'existe pas dans l'API. Cas connu : `ad_group_criterion.quality_info.ad_relevance` et `landing_page_experience` n'existent pas — utiliser `creative_quality_score` et `post_click_quality_score` à la place. Si un champ inconnu bloque une requête, retirer ce champ et relancer — ne pas bloquer tout le rapport.

**Données incomplètes** (0 conversion trackée) → Signaler en tête de rapport : "🔴 Alerte Tracking — les données de conversion sont absentes ou incohérentes. Le rapport ci-dessous est conditionné à un tracking fiable (règle agence 6.1). Résoudre ce point avant toute optimisation."

**Campagnes Smart (type SMART)** → Elles ne retournent pas d'IS (Impression Share), pas de données annonces RSA détaillées, et leurs annonces apparaissent à 0 impressions dans les requêtes `ad_group_ad`. Analyser uniquement leur performance globale (clics, conversions, coût) depuis l'appel 1. Ne pas les inclure dans l'analyse RSA/Ad Strength.

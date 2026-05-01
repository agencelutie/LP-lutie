# Meta Ads — Cadre d'Audit Complet

Travailler section par section. Annoter chaque point : 🔴 Critique / 🟡 Avertissement / 🟢 OK.

---

## 1. TRACKING & PIXELS — À vérifier EN PREMIER

- [ ] Meta Pixel installé et actif sur toutes les pages clés (homepage, product pages, checkout, confirmation)
- [ ] Conversions API (CAPI) configurée en parallèle du Pixel (indispensable post-iOS14)
- [ ] Taux de correspondance des événements CAPI > 70% ? (vérifier dans Événements du Gestionnaire)
- [ ] Les événements sont-ils dédupliqués ? (éviter de compter deux fois les conversions Pixel + CAPI)
- [ ] Les événements de conversion sont-ils bien configurés ? (Purchase, Lead, Add to Cart selon l'objectif)
- [ ] Les valeurs de conversion sont-elles transmises pour les e-commerces ? (indispensable pour ROAS)
- [ ] Fenêtre d'attribution cohérente avec le cycle de vente ? (standard : 7j clic / 1j vue)
- [ ] Aucun événement avec 0 enregistrement sur 7 jours alors que les campagnes sont actives → tag cassé ?

**Règle d'or** : Sans Pixel + CAPI fonctionnels, tout le reste de l'audit est théorique. Réparer le tracking avant toute autre optimisation.

---

## 2. STRUCTURE DU COMPTE

- [ ] Structure Campagne > Ad Set > Annonce logique et cohérente
- [ ] Séparation claire des audiences : froides (prospection), tièdes (engagement), chaudes (retargeting/clients)
- [ ] Séparation des objectifs de campagne : Conversion, Trafic, Notoriété — jamais mélangés
- [ ] Convention de nommage cohérente sur toutes les campagnes, ad sets et annonces
- [ ] Pas de campagnes ou ad sets inactifs depuis >30 jours sans raison documentée
- [ ] Maximum 5 annonces actives par ad set (au-delà, fragmentation du budget)

---

## 3. OBJECTIFS & STRATÉGIE D'ENCHÈRES

- [ ] L'objectif de campagne correspond à l'objectif business ? (ex : ne pas utiliser Trafic si l'objectif est Conversion)
- [ ] La stratégie d'enchères est-elle cohérente avec le volume de conversions ?
  - Volume suffisant (>50 conv/semaine) → Cost Cap ou ROAS cible
  - Volume modéré (20-50 conv/semaine) → Coût le plus bas sans cible
  - Démarrage ou peu de données → Coût le plus bas (laisser l'algo apprendre)
- [ ] Les campagnes en apprentissage sont-elles respectées ? (pas de modification pendant 7j minimum)
- [ ] CBO vs ABO : CBO pour les audiences validées, ABO pour les tests initiaux — justifié ?

---

## 4. AUDIENCES & CIBLAGE

- [ ] **Audiences froides** : ciblages par intérêts, comportements, démographie — pertinents et pas trop larges ?
- [ ] **Lookalikes** : basés sur des sources de qualité (clients actifs, acheteurs, listes CRM récentes) ?
- [ ] **Retargeting** : audiences basées sur visiteurs du site, vues de produits, add to cart, engagement Facebook/Instagram ?
- [ ] **Exclusions** : les clients existants sont-ils exclus des campagnes de prospection ? Les acheteurs récents des campagnes de retargeting générique ?
- [ ] **Customer Match** : liste CRM uploadée et utilisée comme source de lookalike ou pour ciblage direct ?
- [ ] Chevauchements d'audiences entre ad sets analysés ? (cannibalisation possible)
- [ ] Taille des audiences cohérente avec le budget ? (audience trop petite → fatigue rapide ; trop large → manque de pertinence)

---

## 5. CRÉATIFS & ANNONCES

- [ ] Minimum 3 annonces actives par ad set pour permettre la rotation et les tests
- [ ] Mix de formats testés ? (image statique, vidéo, carrousel, collection, catalogue)
- [ ] **Vidéos** : hook fort dans les 3 premières secondes ? Taux de lecture >50% sur 3 secondes ?
- [ ] **Images** : rapport d'aspect correct selon les placements ? (1:1 pour Feed, 9:16 pour Stories/Reels, 1.91:1 pour Feed large)
- [ ] Texte sur image < 20% de la surface ? (plus de texte = diffusion réduite)
- [ ] Copie publicitaire : accroche forte en première ligne ? Proposition de valeur claire ? CTA explicite ?
- [ ] Les annonces avec CTR < 0.5% sur le Feed sont-elles identifiées ? (problème de créatif ou d'audience)
- [ ] Les annonces actives depuis > 30 jours avec CTR en baisse significative → fatigue créative probable ?
- [ ] UGC (User Generated Content) testé ? Souvent meilleur ROI que les visuels brandés sur la prospection froide

---

## 6. FRÉQUENCE & FATIGUE CRÉATIVE

- [ ] Fréquence > 3.5 sur 7 jours sur les ad sets de retargeting → rafraîchir les créatifs prioritairement
- [ ] Fréquence > 2.5 sur 7 jours sur les ad sets de prospection → surveiller et préparer les rotations
- [ ] Évolution du CPM : en hausse significative sur les dernières semaines sans raison saisonnière → souvent signe de fatigue ou de mauvaise pertinence
- [ ] Score de pertinence (Ranking des annonces dans Statistiques) : "Inférieur à la moyenne" = priorité à corriger

---

## 7. BUDGETS & PACING

- [ ] La répartition du budget entre prospection et retargeting est-elle cohérente ? (recommandation standard : 70-80% prospection / 20-30% retargeting)
- [ ] Y a-t-il des ad sets en apprentissage limité par le budget ? (moins de 50 events d'optimisation/semaine → instabilité)
- [ ] Y a-t-il des ad sets avec budget mais très peu de dépense ? → problème d'enchères ou d'audience trop restreinte
- [ ] Le pacing est-il régulier sur le mois ou concentré sur certaines périodes ? (vérifier si "standard" ou "accéléré")

---

## 8. PLACEMENTS

- [ ] Les placements sont-ils optimisés ou laissés en "Advantage+ Placements" (automatique) ?
  - Automatique recommandé pour les campagnes de conversion avec budget suffisant
  - Placements manuels justifiés si les données montrent des écarts significatifs entre placements
- [ ] Y a-t-il des placements qui drainent du budget avec 0 conversion ? (ex : Audience Network souvent moins qualifié)
- [ ] Stories et Reels sont-ils alimentés par des créatifs adaptés (9:16) ou redimensionnés automatiquement ?
- [ ] Instagram vs Facebook : performance analysée séparément ? Des ajustements d'allocation sont-ils justifiés ?

---

## 9. PERFORMANCE MAX & CATALOGUE (si applicable)

- [ ] Flux produit (catalogue) à jour et sans erreurs ? (vérifier dans Commerce Manager)
- [ ] Toutes les variables produit clés sont-elles renseignées ? (titre, description, prix, disponibilité, image)
- [ ] Les campagnes Catalogue sont-elles segmentées par catégorie ou performance produit ?
- [ ] Dynamic Product Ads (DPA) en retargeting configurés ? (souvent le meilleur ROAS pour l'e-commerce)
- [ ] Exclusion des produits out-of-stock des campagnes actives ?

---

## 10. REPORTING & ALERTES META

- [ ] Les rapports personnalisés sont-ils configurés dans Ads Manager ? (colonnes cohérentes avec les KPIs)
- [ ] Les règles automatisées Meta sont-elles configurées ? (alertes sur dépense anormale, CPR qui dépasse un seuil)
- [ ] Connexion avec Google Analytics 4 active ? (paramètres UTM configurés sur toutes les annonces)
- [ ] Les données Meta sont-elles réconciliées avec GA4 chaque semaine ? (détecter les doublons ou sous-comptage)
- [ ] Les objectifs de performance mensuels sont-ils documentés quelque part dans le compte ?

---

## Grille de Score Global Meta Ads

| Section | Score | Points critiques |
|---------|-------|-----------------|
| Tracking & Pixels | | |
| Structure | | |
| Objectifs & Enchères | | |
| Audiences & Ciblage | | |
| Créatifs & Annonces | | |
| Fréquence & Fatigue | | |
| Budgets & Pacing | | |
| Placements | | |
| Catalogue / PMax | | |
| Reporting | | |
| **TOTAL** | | |

Score global Meta : X 🔴 critiques / Y 🟡 avertissements / Z 🟢 OK

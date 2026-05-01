# Google Ads — Cadre d'Audit Complet

Ce cadre couvre tous les niveaux d'un compte Google Ads. Travaillez section par section et annotez chaque point avec 🔴 Critique / 🟡 Avertissement / 🟢 OK.

---

## 1. SUIVI DES CONVERSIONS — À vérifier EN PREMIER

Le reste de l'audit n'a de sens que si le tracking est fiable.

- [ ] Les conversions sont-elles trackées ? (au moins une action de conversion active)
- [ ] Y a-t-il des doublons de conversions ? (même événement compté plusieurs fois)
- [ ] Le modèle d'attribution est-il approprié ? (Data-driven préféré si volume suffisant ; Last Click acceptable ; First Click rarement justifié)
- [ ] Les valeurs de conversion sont-elles renseignées pour les e-commerce ? (indispensable pour Target ROAS)
- [ ] Le tag de conversion est-il en place sur toutes les pages de confirmation ?
- [ ] Y a-t-il des conversions avec 0 enregistrement sur 30 jours ? (tag cassé ?)
- [ ] Import depuis Google Analytics 4 configuré ?
- [ ] Fenêtre de conversion cohérente avec le cycle de vente ?

**Règle d'or** : Si le tracking est cassé ou douteux, stopper toute optimisation des enchères et réparer d'abord.

---

## 2. STRUCTURE DU COMPTE

- [ ] Séparation Brand vs Non-brand (campagnes distinctes)
- [ ] Séparation Search vs Shopping vs Display vs Performance Max (jamais mélangés)
- [ ] Naming convention cohérente sur toutes les campagnes et groupes d'annonces
  - Format recommandé : `[TYPE]-[MARQUE/PRODUIT]-[CIBLAGE]-[GÉO]`
  - Exemple : `SEARCH-BRAND-EXACT-FR`, `PMAX-PRODUITS-ROAS-EU`
- [ ] Nombre de groupes d'annonces par campagne raisonnable (éviter >30)
- [ ] Thèmes de mots-clés cohérents dans chaque groupe d'annonces
- [ ] Pas de campagnes orphelines ou inactives depuis >90 jours sans raison documentée

---

## 3. PARAMÈTRES DE CAMPAGNE

Pour chaque campagne active :

- [ ] **Réseau** : Search uniquement pour les campagnes search (désactiver "Réseau Display" et "Réseau de Recherche partenaires" si pas testé intentionnellement)
- [ ] **Ciblage géographique** : Paramètre "Présence" sélectionné (pas "Présence ou intérêt") sauf si l'objectif le justifie
- [ ] **Langues** : Toutes les langues pertinentes sélectionnées (inclure le français ET l'anglais pour la France)
- [ ] **Rotation des annonces** : "Optimiser" sélectionné (non "Rotation indéfinie")
- [ ] **Schedule** : Les annonces tournent-elles sur les bons créneaux ? Y a-t-il des ajustements d'enchères horaires/jour ?
- [ ] **Devices** : Y a-t-il des ajustements d'enchères par appareil justifiés par les données ?

---

## 4. STRATÉGIE D'ENCHÈRES

- [ ] La stratégie est-elle cohérente avec l'objectif ?
  - Objectif conversions + volume suffisant (>30/mois) → Target CPA ou Target ROAS
  - Nouveau compte ou peu de conversions → Maximize Conversions (sans cible) ou CPC manuel
  - Notoriété/trafic → Maximize Clicks ou CPM cible
- [ ] Target CPA/ROAS fixé est-il réaliste par rapport à l'historique ?
- [ ] Les campagnes en Target CPA/ROAS ont-elles assez de conversions pour alimenter le smart bidding ? (<30/mois = instable)
- [ ] Y a-t-il des enchères manuelles écrasant le smart bidding inutilement ?
- [ ] Portfolio bid strategies utilisées où pertinent ?

---

## 5. BUDGETS

- [ ] Y a-t-il des campagnes "limité par budget" alors qu'elles convertissent bien ? (manque à gagner)
- [ ] Y a-t-il des campagnes avec budget mais quasi zéro dépense ? (problème de ciblage ou enchères trop basses)
- [ ] La répartition du budget entre campagnes est-elle cohérente avec les performances ? (ne pas alimenter les mauvaises campagnes)
- [ ] Les budgets partagés sont-ils configurés correctement ?
- [ ] Le rythme de dépense (pace) est-il régulier sur le mois ou concentré sur certaines périodes ?

---

## 6. MOTS-CLÉS

- [ ] **Types de correspondance** : Mix intentionnel de Exact, Phrase, Broad ? Broad match justifié par smart bidding et audiences ?
- [ ] **Quality Score** : Repérer les mots-clés avec QS ≤ 4 (problème de pertinence/landing page)
- [ ] **Mots-clés en doublon** : Même intention dans plusieurs groupes/campagnes → cannibalisation
- [ ] **Mots-clés sans impression** sur 30 jours → probablement trop restrictifs ou enchère trop basse
- [ ] **Mots-clés sans conversion** sur 90 jours mais avec dépense significative → candidats à la pause
- [ ] **Mots-clés à très faible CTR** (<1% sur Search) → problème de pertinence annonce/requête
- [ ] **Enchères par mot-clé** : Justifiées par les données ? Pas d'ajustements manuels qui écrasent le smart bidding sans raison ?

---

## 7. TERMES DE RECHERCHE (Search Terms)

C'est le rapport le plus important. À analyser systématiquement.

- [ ] Y a-t-il des requêtes non pertinentes avec des dépenses ? → Ajouter en négatif
- [ ] Y a-t-il des requêtes performantes non capturées par des mots-clés exact ? → Potentiel d'expansion
- [ ] Les mots-clés négatifs couvrent-ils les termes irrelevants récurrents ?
- [ ] Y a-t-il des listes de négatifs partagées bien configurées ?
- [ ] Brand terms de concurrents capturés intentionnellement ou non ?

---

## 8. ANNONCES (RSA / ETA)

Pour chaque groupe d'annonces :

- [ ] Au moins 1 RSA actif par groupe d'annonces (idéalement 2 pour tester)
- [ ] Qualité RSA : "Excellent" ou "Good" (si "Poor", prioriser l'amélioration)
- [ ] Diversité des titres : 10-15 titres distincts avec variété de messages
- [ ] Au moins 3-4 titres incluant le mot-clé principal du groupe
- [ ] Au moins 1 titre avec une proposition de valeur forte (ex: "Livraison gratuite", "Satisfait ou remboursé")
- [ ] Au moins 1 titre avec une urgence ou un CTA (ex: "Demandez un devis", "Découvrez nos offres")
- [ ] Descriptions : 4 renseignées, variées, complémentaires
- [ ] Pas de surplus de pinnage (pinning doit être exceptionnel, pas systématique)
- [ ] URLs finales correctes et pages de destination pertinentes

---

## 9. EXTENSIONS / ASSETS

- [ ] **Sitelinks** : Au moins 4 sitelinks configurés au niveau campagne ou groupe d'annonces
- [ ] **Callouts** : Au moins 4 callouts (arguments de vente courts)
- [ ] **Structured snippets** : Au moins 1 structured snippet avec le type pertinent
- [ ] **Call extension** : Configuré si l'appel téléphonique est un objectif
- [ ] **Location extension** : Configuré si le lieu physique est pertinent
- [ ] **Price extension** : Configuré pour les e-commerces ou services avec tarification
- [ ] **Promotion extension** : Utilisé lors des promotions
- [ ] Extensions au niveau compte + personnalisées au niveau campagne si besoin

---

## 10. AUDIENCES & CIBLAGE

- [ ] Des audiences d'observation sont-elles en place ? (au minimum : visiteurs du site, liste clients, audiences in-market pertinentes)
- [ ] Y a-t-il des ajustements d'enchères par audience basés sur les données ?
- [ ] Remarketing configuré ? (RLSA pour Search, remarketing display)
- [ ] Customer Match utilisé ? (upload de liste CRM)
- [ ] Similar Audiences / Lookalike actives sur les campagnes pertinentes ?
- [ ] Ciblage démographique analysé ? (y a-t-il des segments sous/surperformants ?)

---

## 11. PERFORMANCE MAX (si applicable)

- [ ] Assets de qualité : images HD, logos, titres/descriptions variés
- [ ] Au moins 1 Signal d'audience fort configuré (liste CRM ou visiteurs du site)
- [ ] URL d'extension activé ?
- [ ] Exclusions de marque configurées si la campagne ne doit pas enchérir sur le brand ?
- [ ] Données de conversion suffisantes pour alimenter PMax (>50 conversions/mois recommandé)
- [ ] PMax vs Search : cannibalisation analysée ?

---

## 12. REPORTING & ALERTES

- [ ] Les rapports planifiés sont-ils configurés ?
- [ ] Y a-t-il des alertes automatiques sur les anomalies de dépense ?
- [ ] Les objectifs de performance sont documentés quelque part dans le compte ?
- [ ] Connexion Google Analytics 4 active et données liées ?
- [ ] Connexion Google Merchant Center active (si e-commerce) ?

---

## Grille de score global

Comptez les 🔴, 🟡, 🟢 par section et résumez :

| Section | Score | Points critiques |
|---------|-------|-----------------|
| Tracking | | |
| Structure | | |
| Paramètres | | |
| Enchères | | |
| Budgets | | |
| Mots-clés | | |
| Search Terms | | |
| Annonces | | |
| Extensions | | |
| Audiences | | |
| PMax | | |
| Reporting | | |
| **TOTAL** | | |

Score global : X 🔴 critiques / Y 🟡 avertissements / Z 🟢 OK

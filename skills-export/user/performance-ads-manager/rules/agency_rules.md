# Règles d'Agence — Performance Ads Manager

Ces règles sont spécifiques à notre agence et priment sur toutes les best practices générales Google Ads et Meta Ads. Les lire intégralement avant chaque audit ou plan d'action.

**Ce fichier est à compléter avec vos règles réelles.** Les règles ci-dessous sont des standards solides à personnaliser selon votre méthode.

---

## 1. STRUCTURE DES CAMPAGNES

### Google Ads
- **Règle 1.1** — Séparer systématiquement Brand et Non-Brand dans des campagnes distinctes. Zéro mélange.
- **Règle 1.2** — Convention de nommage obligatoire : `[CANAL]-[MARQUE/PRODUIT]-[OBJECTIF]-[GÉO]`
  - Exemples : `SEARCH-BRAND-LEAD-FR`, `PMAX-CATALOGUE-ROAS-EU`, `DISPLAY-RETARGETING-NOTORIETE-FR`
- **Règle 1.3** — Maximum 20 groupes d'annonces par campagne Search.
- **Règle 1.4** — Chaque groupe d'annonces doit avoir un thème sémantique unique et cohérent — pas de fourre-tout.
- **Règle 1.5** — Toute campagne inactive depuis >90 jours doit être archivée ou justifiée avec une note dans le compte.

### Meta Ads
- **Règle 1.6** — Structure obligatoire en 3 niveaux : Campagne (objectif) > Ad Set (audience/ciblage) > Annonce (créatif).
- **Règle 1.7** — Convention de nommage Meta : `[OBJECTIF]-[AUDIENCE]-[PLACEMENT]-[GÉO]-[DATE]`
  - Exemples : `CONV-RETARGETING-30J-FEED-FR-2024`, `TRAFIC-LOOKALIKE-ALL-FEED-EU-2024`
- **Règle 1.8** — Séparer les audiences froides, tièdes et chaudes dans des campagnes distinctes — jamais dans le même ad set.
- **Règle 1.9** — Maximum 5 annonces actives par ad set (au-delà, le budget se fragmente trop).

---

## 2. MOTS-CLÉS (Google Ads)

- **Règle 2.1** — Le Broad Match n'est autorisé que si : smart bidding actif (Target CPA ou Target ROAS) + au moins 50 conversions/mois + audiences d'observation configurées. Jamais sur CPC manuel.
- **Règle 2.2** — Démarrer toute nouvelle campagne en Exact Match uniquement. Élargir après 2 semaines minimum de données et analyse des search terms.
- **Règle 2.3** — Search terms : revue hebdomadaire obligatoire. Ajouter les négatifs chaque semaine, pas chaque mois.
- **Règle 2.4** — Tout mot-clé avec dépense > 3× le CPA cible et 0 conversion → mise en pause immédiate. Pas de discussion.
- **Règle 2.5** — Maintenir une liste de négatifs partagée à l'échelle du compte, mise à jour chaque semaine.

---

## 3. ANNONCES (Google Ads)

- **Règle 3.1** — Minimum 2 RSA actifs par groupe d'annonces pour permettre les tests. 1 seul RSA = pas de test possible.
- **Règle 3.2** — Le pinning est interdit sauf exception documentée dans les notes du compte (il réduit l'efficacité RSA).
- **Règle 3.3** — 10 à 15 titres distincts par RSA, sans paraphrase. Chaque titre doit apporter un message différent.
- **Règle 3.4** — Au moins 1 titre avec le mot-clé principal du groupe d'annonces.
- **Règle 3.5** — Au moins 1 titre avec une proposition de valeur différenciante, et 1 avec un CTA ou urgence.
- **Règle 3.6** — Tout RSA en statut "Poor" depuis plus de 2 semaines est une priorité P1 d'amélioration.

---

## 4. CRÉATIFS (Meta Ads)

- **Règle 4.1** — Minimum 3 annonces actives par ad set pour permettre à l'algorithme de tester.
- **Règle 4.2** — Si la fréquence d'un ad set dépasse 3.5 sur 7 jours → rafraîchir le créatif dans les 48h.
- **Règle 4.3** — Tester systématiquement au moins 2 formats différents par phase (ex : image statique vs vidéo, carrousel vs collection).
- **Règle 4.4** — Tout créatif actif depuis plus de 30 jours avec un CTR qui a baissé de plus de 30% → mise en pause ou remplacement.
- **Règle 4.5** — Toujours inclure un hook (<3 secondes) pour les vidéos. Sans hook fort, le taux de lecture <3s sera mauvais.
- **Règle 4.6** — UGC (User Generated Content) doit représenter au moins 30% du budget créatif pour les campagnes de conversion froides.

---

## 5. ENCHÈRES & BUDGET

### Google Ads
- **Règle 5.1** — Ne jamais activer Target ROAS ou Target CPA si le volume est inférieur à 30 conversions/mois au niveau campagne. Utiliser Maximize Conversions (sans cible) en dessous.
- **Règle 5.2** — Ne jamais augmenter un budget de plus de 20% en une seule modification. Attendre 7 jours avant la prochaine augmentation.
- **Règle 5.3** — Les campagnes en phase d'apprentissage ne sont pas modifiées pendant minimum 2 semaines, sauf en cas d'anomalie critique.
- **Règle 5.4** — Allouer minimum 10% du budget mensuel à des tests (nouvelles campagnes, nouvelles annonces, nouvelles audiences).

### Meta Ads
- **Règle 5.5** — Utiliser Campaign Budget Optimization (CBO) pour les campagnes avec 3+ ad sets validés. ABO pour les tests initiaux.
- **Règle 5.6** — Ne pas modifier le budget d'un ad set CBO de plus de 30% en une fois pendant la phase d'apprentissage.
- **Règle 5.7** — Budget minimum par ad set Meta pour sortir de la phase d'apprentissage : CPA cible × 5 / semaine.
- **Règle 5.8** — Tout ad set qui n'a pas eu de conversion en 7 jours avec une dépense > CPA cible → pause ou révision du ciblage.

---

## 6. TRACKING & ATTRIBUTION

- **Règle 6.1** — Zéro tolérance pour les campagnes sans tracking de conversion validé. Vérifier avant tout lancement.
- **Règle 6.2** — Google Ads : modèle d'attribution Data-Driven obligatoire si >30 conversions/mois. Last Click acceptable en dessous.
- **Règle 6.3** — Meta Ads : utiliser la fenêtre d'attribution 7j clic / 1j vue comme standard. Documenter tout changement.
- **Règle 6.4** — Meta Pixel + Conversions API (CAPI) obligatoires sur tous les comptes actifs. Le pixel seul n'est plus suffisant post-iOS14.
- **Règle 6.5** — Toute anomalie de tracking (0 conversion enregistrée sur une campagne habituellement active) → alerte immédiate et blocage des optimisations d'enchères jusqu'à résolution.
- **Règle 6.6** — Réconcilier les données Google Ads, Meta Ads et Google Analytics 4 chaque mois pour détecter les doublons.

---

## 7. EXTENSIONS & ASSETS (Google Ads)

- **Règle 7.1** — Minimum 6 sitelinks par campagne active (pointant vers des pages distinctes — jamais deux sitelinks vers la même URL).
- **Règle 7.2** — Minimum 4 callouts par campagne (arguments de vente courts).
- **Règle 7.3** — Minimum 2 structured snippets configurés.
- **Règle 7.4** — Call extension obligatoire si l'appel téléphonique est un objectif de conversion.

---

## 8. REPORTING & COMMUNICATION CLIENT

- **Règle 8.1** — Rapport mensuel livré au client avant le 5 du mois suivant, sans exception.
- **Règle 8.2** — Plan hebdomadaire envoyé en début de semaine (lundi ou mardi au plus tard).
- **Règle 8.3** — Toute anomalie de dépense (>20% d'écart vs moyenne des 7 derniers jours) → signalée au client sous 24h.
- **Règle 8.4** — Toute action P1 exécutée doit être documentée avec : action réalisée, date, justification, résultat attendu.
- **Règle 8.5** — Aucune modification majeure (budget, stratégie d'enchères, structure de campagne) sans validation client préalable si elle représente un changement >30% du budget.

---

## 9. RÈGLES PERSONNALISÉES — À COMPLÉTER

> Ajouter ici les règles spécifiques à votre agence / vos clients.

```
### [X]. [Catégorie]

- **Règle X.Y** — [Description de la règle]
  - Raison : [Pourquoi cette règle existe]
  - Exception : [Si applicable, comment la documenter]
```

---

*Dernière mise à jour : à compléter*
*Propriétaire : à compléter*

# Règles d'Agence — Google Ads Manager

Ce fichier contient les règles strictes spécifiques à notre agence. Ces règles priment sur les best practices générales de Google Ads.

**IMPORTANT** : Ce fichier est à personnaliser. Remplacez les exemples par vos règles réelles.

---

## STATUT : À COMPLÉTER

Les règles ci-dessous sont des exemples de règles d'agence typiques. Adaptez-les selon votre méthode de travail.

---

## 1. Structure des campagnes

- **Règle 1.1** — Toujours séparer les campagnes Brand et Non-Brand. Jamais de mots-clés de marque dans une campagne générique.
- **Règle 1.2** — Naming convention obligatoire : `[CANAL]-[MARQUE]-[OBJECTIF]-[GÉO]` (ex : `SEARCH-BRANDNAME-LEAD-FR`)
- **Règle 1.3** — Maximum 20 groupes d'annonces par campagne Search.
- **Règle 1.4** — Chaque groupe d'annonces doit avoir un thème sémantique unique et cohérent.

## 2. Mots-clés

- **Règle 2.1** — Le Broad Match n'est autorisé que sur les campagnes avec smart bidding actif (Target CPA ou Target ROAS) ET avec au moins 50 conversions/mois. Jamais sur CPC manuel.
- **Règle 2.2** — Toujours démarrer une nouvelle campagne avec Exact Match uniquement, puis élargir après analyse des search terms (minimum 2 semaines de données).
- **Règle 2.3** — Les search terms doivent être passés en revue chaque semaine pour ajouter des négatifs.
- **Règle 2.4** — Les mots-clés sans conversion après 3× le CPA cible en dépense doivent être mis en pause.

## 3. Annonces

- **Règle 3.1** — Minimum 2 RSA actifs par groupe d'annonces (pour permettre les tests).
- **Règle 3.2** — Le pinning est interdit sauf exception documentée et approuvée (il réduit l'efficacité des RSA).
- **Règle 3.3** — Tous les titres doivent être distincts et non redondants (pas de paraphrase du même message).
- **Règle 3.4** — Au moins 1 titre doit contenir le mot-clé principal du groupe d'annonces.
- **Règle 3.5** — Toujours inclure une proposition de valeur différenciante dans au moins 1 titre et 1 description.

## 4. Enchères & Budget

- **Règle 4.1** — Ne jamais activer Target ROAS ou Target CPA si le volume de conversions est inférieur à 30/mois au niveau de la campagne.
- **Règle 4.2** — Les campagnes en phase d'apprentissage ne doivent pas être modifiées pendant minimum 2 semaines.
- **Règle 4.3** — Toujours allouer au moins 10% du budget mensuel aux tests (nouvelles campagnes, nouvelles annonces, nouvelles audiences).
- **Règle 4.4** — Ne jamais augmenter un budget de plus de 20% en une seule fois (risque de sortir du smart bidding optimal).

## 5. Tracking & Reporting

- **Règle 5.1** — Le suivi des conversions doit être validé avant tout lancement de campagne. Zéro tolérance pour les campagnes sans tracking.
- **Règle 5.2** — Modèle d'attribution Data-Driven obligatoire si le volume le permet (>30 conversions/mois). Last Click acceptable en dessous.
- **Règle 5.3** — Un rapport mensuel de performance doit être envoyé au client avant le 5 du mois suivant.
- **Règle 5.4** — Toute anomalie de dépense (>20% d'écart par rapport à la moyenne des 7 derniers jours) doit être signalée sous 24h.

## 6. Extensions

- **Règle 6.1** — Minimum 6 sitelinks, 4 callouts et 2 structured snippets par campagne active.
- **Règle 6.2** — Les sitelinks doivent pointer vers des pages distinctes et pertinentes (jamais deux sitelinks vers la même URL).

---

## Ajout de vos règles personnalisées

Pour ajouter vos propres règles, suivez ce format :

```
## [Numéro]. [Catégorie]

- **Règle [X.Y]** — [Description claire de la règle]
  - Raison : [Pourquoi cette règle existe]
  - Exception : [Si une exception est possible, comment la documenter]
```

---

*Dernière mise à jour : à compléter*
*Propriétaire : à compléter*

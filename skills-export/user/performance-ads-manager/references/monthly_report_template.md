# Template — Bilan Mensuel Client

Ce template guide la construction du rapport mensuel. Adapter le niveau de détail selon le client (opérationnel vs décisionnel).

---

## STRUCTURE COMPLÈTE DU RAPPORT

---

### PAGE DE GARDE

```
[NOM DU CLIENT]
Rapport de Performance Publicitaire
Période : [Mois Année]
Date de remise : [Date]
Préparé par : [Nom de l'agence]
```

---

### SECTION 1 — RÉSUMÉ EXÉCUTIF

**Objectif** : une page maximum que le dirigeant peut lire en 2 minutes.

```
## Résumé Exécutif — [Mois Année]

**Objectif du mois** : [Rappel du KPI principal et de la cible]
**Résultat** : [Atteint ✅ / Partiellement atteint ⚠️ / Non atteint ❌] — [X€ CPA vs objectif Y€]

### Faits marquants

1. [Fait positif n°1 avec chiffre : "La campagne PMAX a généré 47 conversions à 28€ CPA vs 40€ objectif"]
2. [Fait positif n°2]
3. [Point d'attention : "Le CPA Meta a augmenté de +18% sur les audiences froides en 2ème moitié de mois"]

### Recommandation prioritaire pour [Mois+1]

[Une recommandation concrète, justifiée par les données du mois]
```

---

### SECTION 2 — TABLEAU DE BORD GLOBAL

```markdown
| Métrique | [M-1] | [M en cours] | Évolution | vs Objectif |
|----------|-------|--------------|-----------|-------------|
| Dépense totale (€) | | | | |
| Conversions totales | | | | |
| CPA moyen (€) | | | | |
| ROAS global | | | | |
| CA généré (€) * | | | | |
| Leads générés * | | | | |

* selon le modèle business du client

Répartition des dépenses :
- Google Ads : [X€] ([Y%] du budget total)
- Meta Ads : [X€] ([Y%] du budget total)
```

---

### SECTION 3 — ANALYSE GOOGLE ADS

#### 3.1 Performance par campagne

```markdown
| Campagne | Dépense | Impressions | CTR | Conv. | CPA | vs Obj. |
|----------|---------|-------------|-----|-------|-----|---------|
| [SEARCH-BRAND-FR] | | | | | | |
| [SEARCH-GEN-FR] | | | | | | |
| [PMAX-CATALOGUE] | | | | | | |
| ... | | | | | | |
| **TOTAL** | | | | | | |
```

#### 3.2 Top mots-clés du mois

```
Top 5 mots-clés par volume de conversions :
1. [mot-clé] — X conv. — CPA Y€ — Dépense Z€
2. ...

Top 5 mots-clés à surveiller (dépense élevée, faible conversion) :
1. [mot-clé] — X conv. — CPA Y€ — Dépense Z€ — Action recommandée : [...]
```

#### 3.3 Search Terms — Insights du mois

- Nouvelles requêtes qualifiées identifiées et ajoutées en exact match : [X termes]
- Requêtes non pertinentes ajoutées en négatif : [X termes]
- Budget récupéré grâce aux négatifs ajoutés : estimé ~[X€]

#### 3.4 Budget Google Ads

```
Budget mensuel alloué : X€
Dépense réelle : Y€ ([Z%] du budget)
Campagnes "limité par budget" ce mois : [liste ou "aucune"]
Commentaire : [Raison si sous ou sur budget]
```

---

### SECTION 4 — ANALYSE META ADS (FACEBOOK / INSTAGRAM)

#### 4.1 Performance par campagne

```markdown
| Campagne | Dépense | Portée | Fréquence | CPM | CTR | Conv. | CPA/ROAS |
|----------|---------|--------|-----------|-----|-----|-------|----------|
| [CONV-PROSPECTION-FR] | | | | | | | |
| [CONV-RETARGETING-30J] | | | | | | | |
| [TRAFIC-NOTORIETE] | | | | | | | |
| **TOTAL** | | | | | | | |
```

#### 4.2 Performance par audience

```
Audiences froides (prospection) :
- [Nom audience] : CPA X€, ROAS Y, Fréquence Z — Status : [Performant / À surveiller / À retravailler]

Audiences tièdes (engagement) :
- [Nom audience] : CPA X€, ROAS Y, Fréquence Z

Audiences chaudes (retargeting) :
- [Nom audience] : CPA X€, ROAS Y, Fréquence Z
```

#### 4.3 Top Créatifs du mois

```
Top 3 annonces par ROAS / CPA :
1. [Nom annonce] — Format : [Image/Vidéo/Carrousel] — CPA X€ — ROAS Y — CTR Z%
   → Insight : [Ce qui fonctionne : UGC, hook fort, promotion claire, etc.]
2. ...
3. ...

Annonces à renouveler (fatigue constatée) :
1. [Nom annonce] — Fréquence X — CTR passé de Y% à Z% — Action : [remplacer le visuel / adapter la copie]
```

#### 4.4 Budget Meta Ads

```
Budget mensuel alloué : X€
Dépense réelle : Y€ ([Z%] du budget)
Répartition : Prospection X€ ([Y%]) / Retargeting X€ ([Y%])
```

---

### SECTION 5 — ACTIONS RÉALISÉES CE MOIS

Tableau des principales optimisations effectuées et leur impact :

```markdown
| Date | Canal | Action réalisée | Impact constaté |
|------|-------|-----------------|-----------------|
| [01/M] | Google | Ajout 23 mots-clés négatifs | CPA campagne GEN : -12% en 2 semaines |
| [08/M] | Meta | Rotation des créatifs sur RETARGETING-30J | Fréquence : 4.2 → 2.8, CTR : +18% |
| [15/M] | Google | Augmentation budget SEARCH-BRAND +20% | +38 conversions supplémentaires |
| ... | | | |
```

---

### SECTION 6 — RECOMMANDATIONS MOIS SUIVANT

#### Plan d'Action Prioritaire

```markdown
| # | Priorité | Canal | Action | Objectif | Délai |
|---|----------|-------|--------|----------|-------|
| 1 | 🔴 P1 | Meta | Lancer 3 nouveaux créatifs UGC sur la prospection froide | Contrer la fatigue créative observée fin de mois | Semaine 1 |
| 2 | 🔴 P1 | Google | Activer le ciblage mobile optimisé sur SEARCH-GEN | Améliorer le QS mobile (-3 points vs desktop) | Semaine 1 |
| 3 | 🟡 P2 | Google | Tester une nouvelle campagne Performance Max catalogue | Explorer le potentiel ROAS e-commerce | Semaine 2 |
| 4 | 🟡 P2 | Meta | Créer une audience Lookalike basée sur les acheteurs du mois | Élargir la prospection avec une source plus qualifiée | Semaine 2 |
| 5 | 🟢 P3 | Les deux | Configurer les alertes automatiques sur anomalies de dépense | Améliorer la réactivité en cas de problème | Semaine 3-4 |
```

#### Propositions de Tests

1. **Test créatif** : [Description du test, ex : "Vidéo avant/après vs image statique produit sur la prospection"]
2. **Test audience** : [Description, ex : "Lookalike 1% acheteurs vs Lookalike 2% acheteurs sur Meta"]
3. **Test offre/message** : [Description, ex : "Tester la livraison gratuite dans le titre Google Ads vs sans"]

#### Ajustements Budgétaires Recommandés

```
Budget actuel total : X€/mois
Budget recommandé M+1 : Y€/mois
Variation : [+Z%] — Justification : [...]

Répartition recommandée :
- Google Ads : X€ ([Y%]) vs X€ actuellement — Raison : [...]
- Meta Ads : X€ ([Y%]) vs X€ actuellement — Raison : [...]
```

---

### SECTION 7 — ANNEXES

- Tableau détaillé par campagne (toutes métriques)
- Tableau détaillé par ad set Meta
- Données search terms du mois (Google)
- Captures d'écran des métriques clés (si disponibles)

---

## NOTES DE RÉDACTION

**Ton** : professionnel mais accessible. Éviter le jargon technique sans explication.
**Données** : toujours sourcer les chiffres (Google Ads, Meta Ads Manager, GA4).
**Comparaisons** : systématiquement M/M (vs mois précédent). Ajouter A/A (vs année précédente) si pertinent.
**Recommandations** : concrètes, chiffrées, avec un délai. Pas de vague "optimiser les annonces".

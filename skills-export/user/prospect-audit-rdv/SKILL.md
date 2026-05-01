---
name: prospect-audit-rdv
description: >
  Briefing prospect pré-RDV pour l'agence Lutie (Google Ads, Meta Ads, tracking, CRO).
  Génère un audit commercial complet en 6 blocs : analyse sectorielle, cartographie concurrentielle,
  angles marketing exploités, analyse du prospect, hypothèses de leviers ads, et guide RDV clé en main
  (accroches, questions, objections, insight "wow").

  Utiliser ce skill dès que l'utilisateur mentionne : préparer un RDV prospect, briefing commercial,
  audit avant call, analyse concurrentielle prospect, préparer un rendez-vous client, "audit [nom entreprise]",
  "brief pour [nom entreprise]", ou toute demande de préparation avant un entretien de vente.
  Même pour des demandes courtes comme "prépare le brief pour demain" ou "analyse ce prospect",
  ce skill apporte une profondeur commerciale et sectorielle significative — toujours le déclencher.
---

# Prospect Audit RDV — Lutie

Prépare un briefing commercial ultra-documenté pour entrer en RDV avec une maîtrise totale
du secteur, des concurrents et des angles d'attaque du prospect.

## Intake des variables

Avant de lancer l'analyse, identifie ces variables dans le message de l'utilisateur.
Si certaines sont manquantes, déduis ce que tu peux depuis le site web, et demande
uniquement ce qui est indispensable (au plus 2 questions).

| Variable | Obligatoire | Source typique |
|---|---|---|
| `NOM_ENTREPRISE` | Oui | Message utilisateur / CRM |
| `URL_SITE` | Oui | Message utilisateur / formulaire |
| `SECTEUR` | Recommandé | Formulaire qualification |
| `CONTEXTE_RDV` | Recommandé | Notes CRM / objet du call |
| `DONNEES_FORMULAIRE` | Optionnel | Données de qualification |

Si `URL_SITE` est absent mais `NOM_ENTREPRISE` présent : recherche le site toi-même.
Si `SECTEUR` est absent : déduis-le depuis le site.

---

## Processus d'analyse

Lance **simultanément** toutes les recherches web indépendantes pour minimiser le temps de génération.
Utilise tous les outils disponibles en parallèle : recherche web, analyse de site, données publicitaires.

### Bloc 1 — Analyse du secteur

- Taille du marché et tendances de croissance (sources récentes < 12 mois)
- Saisonnalité et pics de demande caractéristiques
- Enjeux et transformations récentes du secteur
- Comportement d'achat : cycle de décision, canaux de recherche, intent signals (requêtes clés)
- **Benchmarks sectoriels Google Ads et Meta Ads** :
  CPC moyen, CPL moyen, taux de conversion landing page, CTR Search

→ Consulte `references/benchmarks.md` pour les benchmarks par vertical si disponible.

### Bloc 2 — Analyse des concurrents directs

- Identifie 4 à 6 concurrents directs du prospect (géo + offre)
- Pour chacun : positionnement, proposition de valeur principale, forces/faiblesses
- Présence publicitaire estimée : actifs Google Ads ? Meta Ads ?
  (recherche Meta Ad Library, indices SimilarWeb, SpyFu si accessible)
- Niveau de maturité digitale : qualité site, UX, tracking apparent

### Bloc 3 — Angles et messages marketing des concurrents

- Angles créatifs dominants dans le secteur
  (preuve sociale, urgence, prix, expertise, transformation, avant/après...)
- Promesses sur-utilisées → érodées → à éviter
- **Angles absents ou sous-exploités = opportunités différenciantes pour Lutie**
- Format créatif dominant observé (vidéo courte, statique, carousel, témoignages...)

### Bloc 4 — Analyse du prospect

- Analyse du site : clarté de la proposition de valeur, qualité des landing pages, CTA
- Présence publicitaire détectée (Google Ads / Meta Ads actifs ?)
- Signaux de tracking : pixel Meta, Google Tag, GA4
  (déductible via BuiltWith / Wappalyzer logique / code source)
- Positionnement vs concurrents : différenciant ou indifférencié ?
- Points forts et faiblesses pertinents à mentionner en RDV

### Bloc 5 — Hypothèses de leviers Ads pour ce prospect

- Canal à prioriser (Google Search, Meta, les deux) avec justification sectorielle
- 3 hypothèses d'angles créatifs/messages à tester — différenciants vs concurrents
- Problèmes de tracking ou CRO probables à soulever en RDV
- Estimation indicative de budget de départ cohérent avec le secteur

### Bloc 6 — Guide RDV : ce qu'il faut dire

- **3 phrases d'accroche** montrant la maîtrise du secteur (à placer en ouverture)
- **2-3 questions intelligentes** pour qualifier et révéler les vrais enjeux
- **2 objections probables** dans ce secteur + les réponses Lutie adaptées
- **1 insight "wow"** : fait ou observation sur le marché/concurrents qui va surprendre
  et asseoir la crédibilité immédiatement

---

## Format de sortie

```
## 🔍 Analyse du secteur
[contenu]

## 🏆 Concurrents directs
[contenu]

## 🎯 Angles marketing du secteur
[contenu]

## 🔎 Analyse du prospect — [NOM_ENTREPRISE]
[contenu]

## 💡 Hypothèses de leviers Ads
[contenu]

## 🗣️ Guide RDV
[contenu]

---
> **TL;DR — Les 3 points clés pour ce RDV**
> 1. ...
> 2. ...
> 3. ...
```

**Règles de rédaction :**
- Markdown structuré, lisible en 10 minutes
- Puces courtes, max 2 lignes par puce
- Chiffres et données **en gras**
- Sources mentionnées brièvement entre parenthèses
- Longueur cible : **600 à 900 mots** — dense, pas de remplissage
- Chaque insight doit pouvoir être **cité directement en RDV**

---

## Déclenchement rapide

L'utilisateur peut lancer l'audit avec un message minimal :

> `Prospect : Clinique Vétérinaire du Parc | Site : clinique-parc.fr | Contexte : veut développer son acquisition locale`

Ou simplement :

> `Brief pour demain : frichti.co, rdv à 14h`

Dans ce cas, déduis le secteur depuis le site et génère le briefing complet.

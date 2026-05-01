# Schemas des scrapers Apify LinkedIn

Ce document contient les schemas d'entree exacts des 5 scrapers utilises par le skill CMO LinkedIn. Consulte ce fichier avant chaque appel pour utiliser les bons noms de champs et les bonnes valeurs.

Tous ces scrapers s'appellent via l'outil MCP `call-actor` avec le format :
```
actor: "harvestapi/linkedin-profile-posts"
input: { ... }
```

---

## 1. harvestapi/linkedin-profile-posts

**Usage** : extraire les posts d'un profil LinkedIn individuel.

| Champ | Type | Description | Valeurs possibles |
|-------|------|-------------|-------------------|
| `targetUrls` | array[string] | URLs de profils LinkedIn | `["https://www.linkedin.com/in/username/"]` |
| `maxPosts` | integer | Nombre max de posts par profil (0 = tous) | defaut: 5 |
| `postedLimit` | string | Filtre temporel | `"any"`, `"1h"`, `"24h"`, `"week"`, `"month"`, `"3months"`, `"6months"`, `"year"` |
| `postedLimitDate` | string | Date limite au format YYYY-MM-DD | ex: `"2025-01-01"` |
| `includeQuotePosts` | boolean | Inclure les posts partages avec commentaire | defaut: true |
| `includeReposts` | boolean | Inclure les reposts sans commentaire | defaut: true |
| `scrapeReactions` | boolean | Scraper les reactions | defaut: false |
| `maxReactions` | integer | Reactions max par post | defaut: 5 |
| `scrapeComments` | boolean | Scraper les commentaires | defaut: false |
| `maxComments` | integer | Commentaires max par post | defaut: 5 |
| `commentsPostedLimit` | string | Filtre temporel commentaires | `"any"`, `"1h"`, `"24h"`, `"week"`, `"month"` |

---

## 2. harvestapi/linkedin-company-posts

**Usage** : extraire les posts d'une page entreprise LinkedIn.

Schema identique a `linkedin-profile-posts`. Utiliser des URLs de pages entreprise :
```
targetUrls: ["https://www.linkedin.com/company/nom-entreprise"]
```

---

## 3. harvestapi/linkedin-post-search

**Usage** : rechercher des posts LinkedIn par mots-cles avec filtres avances.

| Champ | Type | Description | Valeurs possibles |
|-------|------|-------------|-------------------|
| `searchQueries` | array[string] | Requetes de recherche | `["b2b sales", "intelligence artificielle"]` |
| `maxPosts` | integer | Posts max par requete (0 = tous) | defaut: 20 |
| `postedLimit` | string | Filtre temporel | `"any"`, `"1h"`, `"24h"`, `"week"`, `"month"`, `"3months"`, `"6months"`, `"year"` |
| `postedLimitDate` | string | Date limite YYYY-MM-DD | |
| `sortBy` | string | Tri | `"relevance"`, `"date"` |
| `authorUrls` | array[string] | Filtrer par auteur | URLs de profils/entreprises |
| `authorsCompanies` | array[string] | Filtrer par entreprise de l'auteur | Noms d'entreprises LinkedIn |
| `mentioningMember` | array[string] | Posts mentionnant un profil | URLs de profils |
| `mentioningCompany` | array[string] | Posts mentionnant une entreprise | URLs de pages entreprises |
| `contentType` | string | Filtre par type de contenu | `"all"`, `"videos"`, `"images"`, `"jobs"`, `"live_videos"`, `"documents"`, `"collaborative_articles"` |
| `authorsIndustryId` | array[string] | Filtrer par industrie de l'auteur | IDs d'industrie LinkedIn |
| `authorKeywords` | string | Mots-cles dans le profil de l'auteur | texte libre |
| `startPage` | integer | Page de debut | defaut: 1 |
| `scrapePages` | integer | Nombre de pages (100 posts/page) | |
| `scrapeReactions` | boolean | Scraper les reactions | defaut: false |
| `maxReactions` | integer | Reactions max par post | defaut: 5 |
| `scrapeComments` | boolean | Scraper les commentaires | defaut: false |
| `maxComments` | integer | Commentaires max par post | |
| `commentsPostedLimit` | string | Filtre temporel commentaires | `"any"`, `"1h"`, `"24h"`, `"week"`, `"month"`, `"3months"`, `"6months"`, `"year"` |

---

## 4. harvestapi/linkedin-post-reactions

**Usage** : extraire les reactions detaillees d'un ou plusieurs posts.

| Champ | Type | Description | Valeurs possibles |
|-------|------|-------------|-------------------|
| `posts` | array[string] | URLs des posts | URLs directes de posts LinkedIn |
| `maxItems` | integer | Reactions max par post | defaut: 10 |
| `reactionTypeFilter` | array[string] | Types de reactions a filtrer | `"ALL"`, `"LIKE"`, `"PRAISE"`, `"EMPATHY"`, `"APPRECIATION"`, `"INTEREST"`, `"ENTERTAINMENT"` |
| `profileScraperMode` | string | Detail des profils reacteurs | `"short"`, `"main"` |

---

## 5. harvestapi/linkedin-post-comments

**Usage** : extraire les commentaires detailles d'un ou plusieurs posts.

| Champ | Type | Description | Valeurs possibles |
|-------|------|-------------|-------------------|
| `posts` | array[string] | URLs des posts | URLs directes de posts LinkedIn |
| `maxItems` | integer | Commentaires max par post | defaut: 10 |
| `postedLimit` | string | Filtre temporel | `"any"`, `"24h"`, `"week"`, `"month"`, `"3months"`, `"6months"`, `"year"` |
| `scrapeReplies` | boolean | Scraper les reponses aux commentaires | defaut: false |
| `profileScraperMode` | string | Detail des profils commentateurs | `"short"`, `"main"` |

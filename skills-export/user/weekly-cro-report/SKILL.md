---
name: weekly-cro-report
description: >
  Rapport hebdomadaire CRO au format Lutie — extraction automatique Clarity (MCP/API) + GA4, tableau KPIs S/S-1, rapport 4 sections : diagnostic comportemental, points de friction avec scoring ICE et test recommandé, réussites avec capitalisation, plan d'actions CRO numéroté.
  Déclencher dès que l'utilisateur mentionne : rapport CRO, CRO hebdo, point CRO, taux de conversion, dead clicks, rage clicks, scroll depth, analyse comportementale, rapport Clarity, données Clarity, optimisation pages, funnel, "pourquoi les gens ne convertissent pas", ou toute analyse de performance web orientée conversion.
  Même pour "point CRO chauffoplombier" ou "que dit Clarity", ce skill apporte une structure d'agence complète — toujours le déclencher.
---

# Rapport Hebdomadaire CRO — Standards Lutie

Tu produis le rapport CRO hebdomadaire d'un site client. Ce rapport est le livrable que le gestionnaire de compte (ou le client) reçoit chaque lundi matin. Il suit le format d'agence Lutie en 4 sections qui racontent une histoire : voici ce qu'on a observé côté comportement utilisateur, voici ce que ça signifie pour le taux de conversion, voici ce qu'on en fait.

**Principe fondamental** : chaque ligne du rapport est justifiée par une donnée comportementale ou analytique extraite de Clarity et/ou GA4. Zéro affirmation sans preuve. Zéro recommandation vague. Les hypothèses sont explicitement taguées `[HYPOTHÈSE]`, les faits confirmés sont tagués `[ÉVIDENCE]`.

---

## PRÉ-REQUIS TECHNIQUE

### Charger les outils MCP

Avant le premier appel, charger les outils nécessaires via `tool_search`. Un seul appel par catégorie suffit pour toute la session :

```
tool_search("clarity analytics data")
tool_search("google analytics report")
```

### Configuration Clarity multi-clients

Les tokens Clarity sont stockés dans un fichier de configuration centralisé, un token par client (chaque projet Clarity a son propre token). Ce fichier persiste entre les sessions et permet de lancer un rapport CRO pour n'importe quel client sans re-saisir les credentials.

```
references/clarity-clients.json
```

### Gestion des clients via le script CLI

Le script `scripts/manage_clients.py` permet d'ajouter, lister, tester et supprimer des clients sans éditer le JSON à la main :

```bash
# Lister les clients configurés (tokens masqués)
python scripts/manage_clients.py list

# Ajouter un client (mode interactif — guide pas-à-pas)
python scripts/manage_clients.py add

# Ajouter un client en une commande
python scripts/manage_clients.py add --name "Chauffoplombier" --token "eyJ..." --url "https://chauffoplombier.be" --ga4 "properties/123456789"

# Tester la connexion Clarity d'un client
python scripts/manage_clients.py test --name "Chauffoplombier"

# Tester TOUS les clients d'un coup (utile le lundi matin avant de lancer les rapports)
python scripts/manage_clients.py test --all

# Supprimer un client
python scripts/manage_clients.py remove --name "Ancien Client"

# Exporter la liste sans tokens (pour partage interne)
python scripts/manage_clients.py export
```

Le test vérifie que le token est valide, non expiré, et retourne le nombre de sessions des dernières 24h pour confirmer que le projet Clarity reçoit bien des données.

### Format du fichier config

```json
{
  "clients": [
    {
      "name": "Chauffoplombier",
      "clarity_token": "eyJ...",
      "site_url": "https://chauffoplombier.be",
      "ga4_property": "properties/123456789",
      "cro_objectives": {
        "target_cvr": 3.5,
        "primary_conversion": "form_submit",
        "secondary_conversions": ["phone_click", "chat_open"],
        "key_pages": ["/", "/services", "/contact", "/devis"]
      }
    }
  ]
}
```

### Procédure d'ajout d'un nouveau client

Si le client demandé n'est pas dans la config, guider l'utilisateur :
1. Aller sur https://clarity.microsoft.com → sélectionner le projet du client
2. Settings → Data Export → Generate new API token
3. Copier le token JWT généré
4. Lancer `python scripts/manage_clients.py add` ou fournir les infos directement

Le token Clarity est spécifique à un projet (= un site). Pour un client multi-sites, créer une entrée par site dans la config.

**Sécurité** : le fichier `clarity-clients.json` contient des tokens sensibles. Ne jamais le committer dans un dépôt public. L'ajouter au `.gitignore`.

---

## WORKFLOW

1. **Identifier le client** → charger la config Clarity + GA4
2. **Extraire les données Clarity** → métriques comportementales 3 derniers jours
3. **Identifier la propriété GA4** → lister les propriétés, choisir la bonne (LP Ads ou site principal)
4. **Extraire les données GA4** → métriques de conversion 7 + 14 jours
5. **Construire le tableau KPIs CRO S/S-1** → vue chiffrée brute
6. **Rédiger le rapport au format Lutie CRO** → 4 sections (voir ÉTAPE 6)
7. **Générer le résumé WhatsApp/email** → copier-coller prêt

---

## ÉTAPE 1 — Identifier le client

**Comportement par défaut** : si aucun client n'est spécifié, lister les clients configurés dans `references/clarity-clients.json` et demander à l'utilisateur de choisir.

### Si l'utilisateur donne un nom de client

Matcher avec la config. Si trouvé, charger les paramètres et passer à l'étape 2.

### Si le client n'est pas configuré

Collecter les informations nécessaires (token, GA4, objectifs) et proposer de les sauvegarder.

---

## ÉTAPE 2 — Extraction des données Clarity

**Objectif : extraire les métriques comportementales clés.** L'API Clarity est limitée à 10 appels/jour/projet et à 3 jours de données max. Chaque appel compte — consolider au maximum.

### Stratégie d'extraction en 3 appels Clarity

L'extraction se fait soit via le MCP Clarity (si configuré), soit via l'API REST directe (avec le token du fichier config).

**Méthode A — MCP Clarity** (prioritaire si disponible) :
Utiliser les outils MCP Clarity en langage naturel. Le MCP expose principalement un outil `get_data` qui accepte des requêtes en langage naturel. Exemples de requêtes :

- "Show me dead clicks, rage clicks, and excessive scrolls for the last 3 days broken down by URL"
- "What are the top pages by traffic with scroll depth and engagement time for the last 3 days"
- "Show me traffic by device and browser for the last 3 days"

**Méthode B — API REST directe** (fallback si MCP non configuré) :

**Appel 1 — Comportement par page** :
```bash
curl --location 'https://www.clarity.ms/export-data/api/v1/project-live-insights?numOfDays=3&dimension1=URL' \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer $TOKEN"
```
Fournit : sessions, dead clicks, rage clicks, excessive scroll, quickback clicks, engagement time par page.

**Appel 2 — Comportement par device** :
```bash
curl --location 'https://www.clarity.ms/export-data/api/v1/project-live-insights?numOfDays=3&dimension1=Device&dimension2=URL' \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer $TOKEN"
```
Fournit : croisement device × page pour identifier les problèmes mobile-spécifiques.

**Appel 3 — Sources de trafic** :
```bash
curl --location 'https://www.clarity.ms/export-data/api/v1/project-live-insights?numOfDays=3&dimension1=Channel&dimension2=URL' \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer $TOKEN"
```
Fournit : comportement par canal d'acquisition — crucial pour corréler les performances CRO avec les campagnes Ads.

### Métriques Clarity à extraire

| Métrique | Ce qu'elle révèle | Seuils d'alerte |
|----------|-------------------|-----------------|
| Dead Click Count | Éléments non-cliquables perçus comme cliquables | > 5% des sessions = 🔴 |
| Rage Click Count | Frustration — l'utilisateur clique frénétiquement | > 3% des sessions = 🔴 |
| Excessive Scroll | L'utilisateur cherche sans trouver | > 15% des sessions = 🟡 |
| Quickback Click | L'utilisateur revient immédiatement en arrière | > 10% des sessions = 🔴 |
| Scroll Depth | Jusqu'où l'utilisateur descend | < 50% moyen = 🟡, < 30% = 🔴 |
| Engagement Time | Temps actif sur la page | < 15s sur page clé = 🟡, < 8s = 🔴 |
| Script Error Count | Bugs JS visibles par l'utilisateur | > 0 sur page de conversion = 🔴 |
| Error Click Count | Clics qui déclenchent des erreurs | > 0 sur formulaire = 🔴 |

---

## ÉTAPE 3 — Identification de la propriété GA4 et isolation du domaine CRO

Un client peut avoir **plusieurs propriétés GA4**, et surtout **une seule propriété peut tracker plusieurs domaines** via un même flux de données (site principal + LP Ads sur un sous-domaine). Le nom de la propriété affiche généralement le domaine principal, mais le trafic des landing pages Ads y est souvent aussi. Il faut donc **identifier le bon domaine à analyser à l'intérieur de la propriété**.

### 3.1 — Lister les propriétés GA4 accessibles

Toujours commencer par `get_account_summaries` pour récupérer l'ensemble des propriétés. Puis filtrer par nom de client (matching partiel, case-insensitive).

Si **une seule propriété** matche → passer directement à 3.2.
Si **plusieurs propriétés** matchent → présenter un tableau et demander à l'utilisateur laquelle analyser.
Si **aucune propriété** ne matche → lister les 10 dernières par ordre alphabétique et demander.

### 3.2 — Scanner les hostnames dans la propriété

C'est l'étape clé. Une propriété GA4 peut contenir le trafic de plusieurs domaines. Requêter `hostName` pour les découvrir :

```
run_report:
  property_id: [propriété choisie]
  date_ranges: [{"start_date": "14daysAgo", "end_date": "yesterday"}]
  dimensions: ["hostName"]
  metrics: ["sessions", "conversions"]
  order_bys: [{"metric": {"metric_name": "sessions"}, "desc": true}]
```

**Interpréter les résultats :**

**Cas A — Un seul hostname** : la propriété ne tracke qu'un domaine. Vérifier s'il correspond au domaine Clarity. Si oui → parfait. Si non (ex : GA4 tracke `www.client.com` mais Clarity tracke `lp.client.com`) → le tracking des LP Ads n'est pas dans GA4. Signaler l'alerte en tête du rapport et recommander de configurer le cross-domain ou d'ajouter le tag GA4 sur le domaine LP.

**Cas B — Plusieurs hostnames** (le cas courant en agence) : la propriété tracke plusieurs domaines dans un seul flux. Exemples typiques :
- `www.client.com` (site principal) + `be.client.com` (LP Ads Webflow)
- `www.client.com` + `app.client.com` (espace client)
- `www.client.com` + `chauffoplombier.webflow.io` (staging)

Présenter le tableau des hostnames à l'utilisateur :
```
Domaines trackés dans GA4 (14 derniers jours) :

| #  | Hostname                    | Sessions | Conversions |
|----|-----------------------------|----------|-------------|
| 1  | be.chauffoplombier.be       | 312      | 24          |
| 2  | www.chauffoplombier.be      | 35       | 4           |
| 3  | chauffoplombier.webflow.io  | 8        | 0           |
```

Demander à l'utilisateur quel(s) domaine(s) analyser pour le CRO. En pratique :
- Le domaine avec le plus de trafic Ads (souvent le sous-domaine LP) est la priorité CRO
- Le site principal est utile pour le trafic organique/direct
- Les domaines staging/webflow.io sont à exclure sauf demande explicite

### 3.3 — Isoler le domaine CRO dans les requêtes GA4

Une fois le domaine choisi, **toutes les requêtes GA4 de l'étape 4 doivent filtrer par hostName** pour ne prendre que le trafic du domaine CRO :

```
dimension_filter: {
  "filter": {
    "field_name": "hostName",
    "string_filter": {
      "match_type": 1,
      "value": "be.chauffoplombier.be",
      "case_sensitive": false
    }
  }
}
```

Sans ce filtre, les données du site principal polluent l'analyse CRO des landing pages (des pages différentes, des parcours différents, des taux de conversion incomparables).

### 3.4 — Vérification rapide

Après isolation du hostname, lancer un appel de validation :

```
run_report:
  property_id: [propriété choisie]
  date_ranges: [{"start_date": "7daysAgo", "end_date": "yesterday"}]
  dimensions: ["pagePath"]
  metrics: ["sessions", "conversions"]
  dimension_filter: [filtre hostName du 3.3]
  order_bys: [{"metric": {"metric_name": "sessions"}, "desc": true}]
  limit: 10
```

Si sessions = 0 → le domaine n'a pas de données GA4. Deux possibilités :
1. Le tag GA4 n'est pas sur ce domaine → alerte tracking
2. Le domaine a très peu de trafic cette semaine → signaler volumes faibles

Si sessions > 0 → lister les top pages et demander confirmation avant de lancer l'extraction complète.

### 3.5 — Sauvegarder le choix

Stocker dans la config client : la propriété GA4 ET le hostname CRO. La semaine suivante, on skip les étapes 3.1–3.3 et on réutilise directement.

```json
{
  "name": "Chauffoplombier",
  "ga4_property": "properties/516906606",
  "ga4_hostname_cro": "be.chauffoplombier.be",
  ...
}
```

---

## ÉTAPE 4 — Extraction des données GA4

Utiliser le MCP Google Analytics pour croiser les données comportementales Clarity avec les données de conversion. La propriété GA4 est celle sélectionnée à l'étape 3.

**Règle critique : toujours filtrer par hostName** (défini à l'étape 3.3) pour isoler le trafic du domaine CRO. Sans ce filtre, les données du site principal polluent l'analyse des landing pages.

### Filtre hostname à inclure dans CHAQUE requête

```json
dimension_filter: {
  "filter": {
    "field_name": "hostName",
    "string_filter": {
      "match_type": 1,
      "value": "[ga4_hostname_cro depuis étape 3]",
      "case_sensitive": false
    }
  }
}
```

### Requêtes GA4 (via MCP `run_report`)

**Rapport 1 — Performance conversion par page (14 jours)** :
```
Propriété : [ga4_property]
Dimensions : pagePath, deviceCategory
Métriques : sessions, conversions, engagementRate, 
            averageSessionDuration, bounceRate
Filtre : hostName = [ga4_hostname_cro]
Plage : 2 date ranges — S (7daysAgo → yesterday) + S-1 (14daysAgo → 8daysAgo)
Order by : sessions DESC
Limit : 50
```

**Rapport 2 — Funnel pages clés (7 jours)** :
```
Propriété : [ga4_property]
Dimensions : pagePath
Métriques : sessions, conversions, engagementRate
Filtre : hostName = [ga4_hostname_cro] (ET pagePath dans key_pages si défini)
Plage : last 7 days
```

**Rapport 3 — Conversion par source (7 jours)** :
```
Propriété : [ga4_property]
Dimensions : sessionSource, sessionMedium, pagePath
Métriques : sessions, conversions
Filtre : hostName = [ga4_hostname_cro]
Plage : last 7 days
```

### Post-traitement : Fusion Clarity + GA4

Après extraction des deux sources, construire une vue unifiée par page :

| Page | Sessions (GA4) | CVR (GA4) | Bounce (GA4) | Dead Clicks (Clarity) | Rage Clicks (Clarity) | Scroll Depth (Clarity) | Engagement (Clarity) |
|------|---------------|-----------|--------------|----------------------|----------------------|----------------------|---------------------|

C'est cette vue fusionnée qui sert de socle au rapport. Elle permet d'identifier les pages à fort trafic ET faible conversion, puis de comprendre *pourquoi* via les données comportementales Clarity.

### Analyse multi-pages : chaque LP compte

Un client peut avoir plusieurs landing pages actives — différentes variantes, différents services, différentes campagnes. Le rapport CRO doit **analyser chaque page individuellement**, pas seulement les moyennes globales. Le raisonnement :

- Une moyenne globale de 40% de scroll depth peut masquer une LP à 20% (critique) et une LP à 60% (correcte)
- Les dead clicks peuvent être concentrés sur une seule page — la correction est alors ciblée, pas globale
- Chaque LP a potentiellement un CTA, un formulaire, et un parcours différent → chaque page a ses propres leviers CRO

**Règle : toujours présenter un tableau par page dans le rapport**, trié par volume de sessions décroissant. Les sections 2 (frictions) et 4 (actions) doivent référencer des pages spécifiques, jamais des recommandations génériques.

### Cas multi-domaine (Clarity ≠ GA4)

Quand Clarity tracke un domaine (ex : `be.client.com` — LP Ads Webflow) et GA4 un autre (ex : `www.client.com` — site principal), le croisement est impossible page par page. Dans ce cas :

1. **Le rapport Clarity fait foi pour l'analyse comportementale** (dead clicks, scroll, engagement) — page par page sur le domaine LP
2. **GA4 fournit les données de conversion du site principal** — utile pour les visiteurs qui naviguent du site principal vers le formulaire, mais ne couvre pas les LP Ads
3. **Signaler explicitement ce trou** en tête du rapport avec l'alerte tracking
4. **Recommander en action n°1** de configurer GA4 sur le domaine LP ou d'activer le cross-domain tracking — c'est un prérequis pour un CRO complet

---

## ÉTAPE 5 — Tableau KPIs CRO S/S-1

Séparer les données GA4 en S (7 derniers jours) et S-1 (7 jours précédents). Les données Clarity couvrent 3 jours max — les présenter en valeur absolue avec tendance qualitative si les données de la semaine précédente sont disponibles.

**Format :**

```
📊 CRO — Semaine du [date début] au [date fin]

| Métrique CRO       | S (cette sem.) | S-1 (sem. préc.) | Évolution |
|---------------------|---------------|-------------------|-----------|
| Sessions totales    | X             | Y                 | +/-Z%     |
| Taux de conversion  | X%            | Y%                | +/-Z pts  |
| Conversions         | X             | Y                 | +/-Z%     |
| Taux de rebond      | X%            | Y%                | +/-Z pts  |
| Engagement moyen    | Xs            | Ys                | +/-Z%     |
| Scroll Depth moyen  | X%            | —                 | —         |
| Dead Clicks / sess. | X%            | —                 | —         |
| Rage Clicks / sess. | X%            | —                 | —         |
| Quickback Rate      | X%            | —                 | —         |
| Erreurs JS          | X             | —                 | —         |
```

Puis un tableau par page clé (celles définies dans la config client) avec les mêmes métriques.

**Mise en forme** : évolutions CVR >0.5 pts en **gras**, alertes Clarity dépassant les seuils signalées ⚠️, arrondi % à 2 déc., temps en secondes.

Ce tableau sert de socle factuel — il n'est PAS le livrable final. Le livrable est le rapport Lutie CRO (étape 5).

---

## ÉTAPE 6 — Rapport au format Lutie CRO

C'est le cœur du livrable. 4 sections obligatoires, dans cet ordre exact. Le ton est celui d'un consultant CRO senior qui parle à son client : factuel, direct, pédagogue quand il faut expliquer un mécanisme comportemental.

---

### SECTION 1 — Diagnostic comportemental

Structure en 3 sous-blocs. Chacun contient 2 à 4 bullets maximum. Le but est qu'un dirigeant comprenne la situation conversion en 30 secondes.

```
1) Diagnostic comportemental

🎯 Taux de conversion global : X% (vs Y% S-1) — [tendance : ↗️ amélioration / ↘️ régression / ➡️ stable]

* Ce que nous avons observé :
   * [Métrique conversion S vs S-1 avec chiffres exacts]
   * [Signal comportemental Clarity le plus marquant (dead clicks, rage clicks, scroll...)]
   * [Performance device — mobile vs desktop si écart significatif]

* Ce que cela signifie :
   * [Interprétation UX — en langage client, pas en jargon technique]
   * [Lien comportement → conversion — ex : "les rage clicks sur le formulaire /devis indiquent un problème d'ergonomie qui explique probablement le CVR mobile 2× inférieur au desktop"]
   * [Nuance ou contrepoids si pertinent]

* Ce que nous en concluons :
   * [Priorité CRO de la semaine — quelle page, quel problème, quel impact potentiel]
```

**Règles d'écriture :**
- "Ce que nous avons observé" = données brutes croisées Clarity + GA4. Chiffres S vs S-1 pour GA4, valeurs absolues + seuils pour Clarity. Pas d'interprétation ici.
- "Ce que cela signifie" = lecture UX/business. Traduire les signaux comportementaux en hypothèses de friction. Exemple : "les dead clicks concentrés sur les images produit de la page /services suggèrent que les utilisateurs s'attendent à un zoom ou un lien vers le détail" est bon. "Il y a des dead clicks" seul est insuffisant.
- "Ce que nous en concluons" = priorité CRO de la semaine, avec estimation d'impact potentiel si possible.

---

### SECTION 2 — Points de friction (et pourquoi)

Chaque point de friction suit ce format exact. C'est ici que la valeur CRO se concentre — chaque friction identifiée doit déboucher sur un test ou une correction.

```
2) Points de friction (et pourquoi)

* 🔴 [CRITIQUE] [Page concernée] — [Signal Clarity : type + volume] → [impact conversion estimé]
   * Diagnostic : [HYPOTHÈSE] ou [ÉVIDENCE] + explication comportementale
   * Test recommandé : [Modification proposée] | Scoring ICE : I=[X] C=[X] E=[X] → Score [X/30]
   * KPI de succès : [Métrique cible + seuil de validation]

* 🟡 [IMPORTANT] [Point de friction suivant]
   * Diagnostic : ...
   * Test recommandé : ...
   * KPI de succès : ...
```

**Niveaux de priorité CRO** :
- 🔴 **Critique** = friction sur page à fort trafic impactant directement la conversion → traiter cette semaine
- 🟡 **Important** = friction significative ou page secondaire → traiter sous 14 jours
- 🟠 **Modéré** = opportunité d'optimisation ou friction mineure → backlog CRO
- ⚪ **Faible** = best practice UX non respectée → nice-to-have

**Scoring ICE systématique** (référentiel Lutie CRO) :
- **I (Impact)** : 1-10, basé sur le volume de trafic × proximité avec la conversion
  - 10 = page de conversion directe (formulaire, checkout) + fort trafic
  - 7-9 = page pré-conversion (pricing, services) + bon trafic
  - 4-6 = page d'entrée (homepage, blog) + trafic moyen
  - 1-3 = page secondaire ou faible trafic
- **C (Confidence)** : 1-10, basé sur la force de l'évidence
  - 10 = bug confirmé (erreur JS, lien cassé, formulaire KO)
  - 7-9 = signal Clarity fort + corrélation GA4 (rage clicks élevés + CVR bas)
  - 4-6 = signal Clarity seul ou hypothèse basée sur best practices
  - 1-3 = intuition ou analogie avec d'autres projets
- **E (Ease)** : 1-10, basé sur la facilité d'implémentation
  - 10 = correction CSS/texte simple, < 1h de dev
  - 7-9 = modification HTML/UX, 1-4h
  - 4-6 = refonte de section, nouveau composant, 1-2 jours
  - 1-3 = refonte de page complète, intégration technique lourde

**Qualifier avec les données Clarity** :
- Dead Clicks > 5% des sessions sur une page = élément UI à corriger (bouton fantôme, image non-cliquable)
- Rage Clicks > 3% = frustration forte — formulaire, slider, ou élément interactif défaillant
- Quickback > 10% = le contenu ne correspond pas à l'attente (message match, promesse publicitaire non tenue)
- Scroll Depth < 30% sur page longue = le contenu au-dessus du fold ne convainc pas → problème de hiérarchie
- Engagement < 8s sur page de service = le visiteur ne trouve pas ce qu'il cherche

**Taguer explicitement les diagnostics :**
- `[HYPOTHÈSE]` quand on interprète un signal comportemental
- `[ÉVIDENCE]` quand on a la preuve (erreur JS, lien cassé confirmé, A/B test précédent, corrélation Clarity + GA4 claire)

**Points de friction à ne jamais manquer** (si présents dans les données) :
- CVR mobile < 50% du CVR desktop → toujours creuser le parcours mobile
- Rage clicks sur formulaire de conversion → priorité 1 absolue
- Dead clicks > 5% sur CTA principal → le CTA ne fonctionne pas comme attendu
- Quickback > 15% depuis une campagne Ads → message match défaillant
- Erreurs JS sur page de conversion → bloquant, à corriger immédiatement
- Page à fort trafic + CVR 0% → quelque chose est cassé ou le trafic est mal qualifié

---

### SECTION 3 — Points de réussite (et pourquoi)

Même logique que les frictions, mais pour ce qui fonctionne. Chaque réussite inclut une action de capitalisation.

```
3) Points de réussite (et pourquoi)

* [Page ou élément performant (chiffre S vs S-1)] → [signal positif]
   * On capitalise : [action pour amplifier ou répliquer ce gain]

* [Réussite suivante]
   * On capitalise : ...
```

**Exemples de réussites CRO à identifier :**
- Page avec CVR en hausse > 0.5 pts S/S → comprendre ce qui a changé et le répliquer
- Scroll depth > 70% sur page de service → le contenu engage, envisager d'ajouter un CTA intermédiaire
- Engagement time > 2min sur landing page → le visiteur lit et s'intéresse, optimiser le parcours post-lecture
- Rage clicks en baisse après une correction UX → la correction fonctionne, documenter et standardiser

Ne pas inventer de réussites. Si la semaine est mauvaise, cette section peut être courte.

---

### SECTION 4 — Plan d'actions CRO (prochaine période)

Liste numérotée d'actions concrètes, ordonnées par score ICE décroissant. Maximum 5 actions pour garder le focus.

```
4) Plan d'actions CRO (prochaine période)

1. [Verbe + page + modification exacte] — ICE [X/30]
   Hypothèse : [ce qu'on pense que ça va améliorer]
   Mesure : [KPI + critère de succès + durée du test]

2. [Action suivante] — ICE [X/30]
   ...

---
Prochain point CRO : [date — généralement lundi suivant]
Tests en cours : [lister les tests actifs non encore conclus des semaines précédentes]
```

**Règles pour les actions CRO :**
- Chaque action commence par un verbe : Tester, Corriger, Déplacer, Reformuler, Simplifier, Ajouter, Supprimer, Réorganiser, Optimiser…
- Chaque action est spécifique à une page et un élément précis.
- L'ordre suit le scoring ICE (plus haut score en premier).
- 3 à 5 actions maximum par semaine — au-delà, on dilue l'exécution.
- Chaque action a un critère de succès mesurable (CVR cible, réduction rage clicks de X%, etc.).
- Les actions découlent directement des diagnostics (section 2) et des capitalisations (section 3).

**Types d'actions CRO classiques :**
- **Quick fix** (E ≥ 8) : correction de bug, changement de texte CTA, ajustement CSS
- **Test A/B** (C ≤ 7) : quand l'hypothèse n'est pas certaine, tester avant de déployer
- **Refonte de section** (E ≤ 5) : réorganisation d'un bloc de page, nouveau composant
- **Analyse approfondie** : demande de session recordings Clarity sur un segment spécifique

---

## ÉTAPE 7 — Résumé WhatsApp / Email

Résumé court, prêt à copier-coller. Un seul écran de téléphone.

```
📊 *Rapport CRO — [Client]* | Sem. du [date] au [date]

🎯 CVR : X% (±Z pts vs S-1)
📈 Conversions : X (±Z%)
📱 CVR Mobile : X% vs Desktop : X%

🔍 Signal Clarity : [1 phrase — le signal comportemental le plus marquant]
⚠️ Friction principale : [1 phrase issue section 2, priorité la plus haute]
✅ Point positif : [1 phrase issue section 3]
➡️ Action prioritaire : [1 phrase issue section 4, action n°1]

Prochain point CRO : [date]
```

---

## RÈGLES TRANSVERSALES

1. **Chaque chiffre est sourcé** — il vient de Clarity ou GA4. Pas d'estimation.
2. **Comparaison S/S-1 systématique pour GA4** — jamais de chiffre brut sans contexte temporel.
3. **Données Clarity = 3 jours max** — toujours préciser la fenêtre. Si les données Clarity sont trop limitées pour conclure, le signaler explicitement.
4. **Croisement obligatoire** — ne jamais tirer de conclusion CRO sur un signal Clarity seul sans vérifier la corrélation GA4 (volume, CVR). Un rage click sur une page à 5 sessions/semaine n'est pas une priorité.
5. **Volumes faibles** (< 100 sessions/semaine sur une page) → signaler que les observations sont directionnelles, pas statistiquement fiables.
6. **Hypothèses vs évidences** → toujours taguer `[HYPOTHÈSE]` ou `[ÉVIDENCE]`.
7. **Mobile-first** → toujours analyser séparément mobile et desktop. Le CRO mobile est souvent le plus gros levier.
8. **Pas de recommandation sans donnée** → si Clarity ou GA4 ne retourne pas de données sur un aspect, ne pas inventer.
9. **Historique des tests** → mentionner les tests en cours des semaines précédentes dans la section 4. Un test non conclu ne doit pas être oublié.

---

## GESTION DES ERREURS

**Token Clarity expiré ou invalide (401)** → Demander à l'utilisateur de régénérer un token dans Clarity (Settings → Data Export → Generate new API token) et mettre à jour la config.

**Limite API Clarity atteinte (429)** → L'API est limitée à 10 appels/jour/projet. Si la limite est atteinte, utiliser les données GA4 seules et le signaler : "⚠️ Limite API Clarity atteinte pour aujourd'hui. Le rapport ci-dessous est basé uniquement sur les données GA4. Les signaux comportementaux Clarity seront intégrés au prochain rapport."

**MCP Clarity non connecté** → Basculer automatiquement sur l'API REST avec le token du fichier config. Si aucun token n'existe, demander à l'utilisateur de le configurer.

**MCP GA4 non connecté ou erreur** → Signaler et proposer de faire un rapport Clarity-only (comportemental uniquement, sans données de conversion).

**Propriété GA4 introuvable** → Utiliser `get_account_summaries` pour lister les propriétés accessibles et demander à l'utilisateur de choisir.

**Données Clarity vides** → Possible si le tag Clarity n'est pas installé ou si le site a très peu de trafic. Signaler : "🔴 Aucune donnée Clarity disponible. Vérifier que le tag Clarity est bien installé sur le site et que le projet est actif."

**Pas de conversions trackées dans GA4** → Signaler en tête de rapport : "🔴 Alerte Tracking — aucune conversion détectée dans GA4 sur les 7 derniers jours. Le rapport CRO nécessite un tracking de conversion fiable. Priorité absolue : configurer les événements de conversion avant toute optimisation."

---

## COMPLÉMENTARITÉ AVEC LES AUTRES SKILLS LUTIE

### `/weekly-ads-report` — Corréler Ads et CRO

Quand un rapport Ads hebdo est produit en parallèle, croiser les insights :
- Si le CPA monte dans le rapport Ads → vérifier si le CVR a baissé côté CRO (le problème est peut-être post-clic, pas pré-clic)
- Si le trafic Ads augmente mais les conversions stagnent → le CRO est le goulot d'étranglement
- Quickback élevé sur trafic Ads → message match défaillant entre l'annonce et la landing page

### `/ads-landing` — Enrichir l'analyse landing page

Si une page identifiée comme problématique dans le rapport CRO est aussi une landing page Ads, lire `/ads-landing` pour appliquer les checks message match, page speed, et mobile experience.

### `/ads-google` — Contexte Quality Score

Si le post-click quality score d'un mot-clé est faible dans le rapport Ads, le rapport CRO fournit l'explication comportementale via les données Clarity.

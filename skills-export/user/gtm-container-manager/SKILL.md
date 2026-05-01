---
name: gtm-container-manager
description: "Gestion complète des containers Google Tag Manager via MCP : création de containers client-side et server-side à partir de templates Lead Gen ou E-commerce, duplication de containers existants, audit de cohérence, mise à jour des variables (IDs, tokens, measurement IDs), versioning et publication. Utiliser ce skill dès que l'utilisateur mentionne : GTM, Google Tag Manager, container, balise, tag, trigger, déclencheur, variable GTM, créer un container, dupliquer un container, audit GTM, nouveau client GTM, setup tracking, GA4 config, server-side tagging, CAPI, conversion tracking setup, ou toute demande liée à la gestion de containers GTM. Même pour des demandes simples comme 'crée le GTM pour ce client' ou 'duplique le container de X', ce skill apporte une structure d'agence complète et doit être déclenché."
---

# GTM Container Manager

Skill de gestion de containers Google Tag Manager pour l'agence Lutie.
Permet de créer, dupliquer, auditer et gérer des containers GTM via le MCP GTM (mcp.gtmeditor.com).

## Prérequis

Le MCP GTM doit être connecté dans les paramètres Claude (Connectors → `https://mcp.gtmeditor.com`).

---

## Convention de nommage

Ces conventions sont obligatoires pour tout container créé ou modifié.

### Tags
Format : `[Canal] - [Event]`

Exemples :
- `GA4 - purchase`
- `GA4 - generate_lead`
- `GA4 - event_call`
- `GAds - generate_lead`
- `GAds - event_call`
- `GAds - Remarketing`
- `Conversion Linker`
- `Clarity`
- `Meta - CAPI` (SS)
- `GAds - generate_lead - SS` (SS)

Pour les tags de configuration : `GA4 - Configuration tag`

### Triggers
Format : `[Canal] - Trigger - [Event]`

Exemples :
- `GA4 - Trigger - purchase`
- `GA4 - Trigger - generate_lead`
- `GA4 - Trigger - begin_checkout`
- `GA4 - Trigger - event_call`
- `Call clic tel` (trigger linkClick, exception acceptée)
- `Page remerciement` (trigger pageview, exception acceptée)

### Variables
On ne modifie pas les noms de variables existants. On reproduit les patterns du container modèle :
- Constantes IDs : `GA4 - Measurement id`, `ID_GAds`, `Meta Pixel ID`, `Meta Token`, etc.
- DataLayer : `DLV - [Catégorie] - [Nom]` → `DLV - User - Email address`, `DLV - Ecommerce - Value`
- Settings : `GA4 - Event settings - User Data`, `GA4 - Configuration settings`
- Server container : `GA4 - Server container url`

### Folders (CS uniquement)
- `SETUP` : tags utilitaires (Conversion Linker, Clarity, Remarketing)
- `LEADGEN` : tags et triggers spécifiques lead gen
- `GA4` : triggers ecommerce GA4
- `DataLayer` : variables DLV

---

## Container modèle de référence

Compte GTM : **lutie | Demo** (accountId: `6202584177`)
- CS : containerId `169432874`, workspaceId `3`
- SS : containerId `169437244`, workspaceId `4`

Ne PAS scanner le modèle à chaque création. Les structures sont hardcodées dans les fichiers de référence. Scanner le modèle uniquement si l'utilisateur signale un changement ou lors d'un audit.

## Fichiers de référence (lire AVANT de créer)

- `references/cs-variables.md` — Toutes les variables CS avec parametersJson exact. Remplacer les `__PLACEHOLDER__` par les valeurs client.
- `references/ss-variables.md` — Toutes les variables SS + lookup tables + built-in variables.
- `references/triggers.md` — Tous les triggers CS (ecom + leadgen) et SS avec les filterJson exacts.
- `references/tags.md` — Tous les tags CS et SS avec parametersJson exact. Notation `TRIGGER:nom` = ID du trigger créé.
- `references/audit-checklist.md` — Checklist d'audit de cohérence.

Pour les templates CAPI SS (Meta, TikTok, etc.) : récupérer le templateData complet via `get_template` sur le container modèle SS. Les templateIds sont documentés à l'étape 3.

---

## Workflow principal : Onboarding nouveau client

### Étape 0 — Création du compte GTM (MANUELLE)

L'API GTM ne permet PAS de créer un compte programmatiquement. Chaque client doit avoir son propre compte GTM (ne jamais mettre les containers d'un client dans un compte qui ne lui appartient pas, sauf le compte "lutie | Demo" réservé aux tests).

**Procédure :**
1. Demander à l'utilisateur de créer le compte GTM manuellement sur https://tagmanager.google.com/
2. Nom du compte = nom du client (ex: "Chauffoplombier", "DreamInn Dubai")
3. Une fois créé, l'utilisateur fournit l'**accountId** du nouveau compte
4. Alternative : demander à l'utilisateur de lancer `list_accounts` pour retrouver l'accountId si le compte existe déjà

Pour retrouver un compte existant : utiliser `list_accounts` et chercher par nom.

**Exception** : le compte `lutie | Demo` (accountId: `6202584177`) est réservé aux tests et démos. Ne jamais y créer de containers pour de vrais clients.

### Étape 1 — Collecte d'informations

Demander à l'utilisateur (ou utiliser l'interface de collecte si disponible) :

1. **Nom du client** (sera le nom du compte GTM)
2. **Account ID GTM** du client (créé à l'étape 0, ou existant)
3. **Type de business** : Lead Gen ou E-commerce
4. **URL du site / landing page**
5. **Conversions à tracker** : ex. demande de devis, appel téléphonique, achat, inscription newsletter
6. **IDs des plateformes** :
   - GA4 Measurement ID (G-XXXXXXXX)
   - GA4 Property ID (pour vérification realtime, format: `properties/XXXXXXXX` ou numéro)
   - Google Ads Conversion ID
   - Google Ads Conversion Labels (un par conversion)
   - URL du server container (si SST)
   - Meta Pixel ID + Token API (si Meta)
   - Clarity Project ID (si Clarity)
   - Autres canaux : TikTok, Snapchat, Pinterest, LinkedIn (Pixel IDs + Tokens)
7. **CMP utilisé** : Axeptio, Didomi, Cookiebot, iubenda, ou autre
8. **Numéro de téléphone** (pour trigger clic tel si Lead Gen)
9. **URL page de remerciement** (si Lead Gen avec thank you page)

Si des IDs ne sont pas encore disponibles, utiliser des valeurs placeholder (`123`, `G-XXXXXXXX`) et les noter pour mise à jour ultérieure.

### Étape 2 — Création du container CS

Lire `references/cs-variables.md`, `references/triggers.md`, `references/tags.md` AVANT de commencer.

1. **Créer le container** : `create_container(accountId, name="NomClient - CS", usageContext=["web"])`
2. **Récupérer le workspaceId** : `list_workspaces` → prendre le Default Workspace
3. **Créer les variables** dans cet ordre exact (copier les parametersJson depuis `references/cs-variables.md`) :
   - 3 constantes (remplacer placeholders par valeurs client)
   - 10 DLV User Data (identiques, copier tel quel)
   - 9 DLV Ecommerce (si E-commerce uniquement)
   - 2 DLV Page
   - GA4 Event settings User Data (type gtes)
   - GA4 Configuration settings (type gtcs)
4. **Créer les triggers** (voir `references/triggers.md`) :
   - E-commerce : boucler sur les 15 event names, créer un customEvent par event
   - Lead Gen : page remerciement + form_submit + call + clic tel
   - **Maintenir un mapping nom→triggerId** au fur et à mesure
5. **Créer les tags** (voir `references/tags.md`) :
   - Utiliser les triggerIds du mapping pour les firingTriggerIds
   - GA4 Config + GA4 Events + GAds Conversions + Remarketing + Conversion Linker + Clarity
6. Ne PAS versionner encore si un container SS doit être créé ensuite

### Étape 3 — Création du container SS (si SST)

Lire `references/ss-variables.md`, `references/triggers.md`, `references/tags.md` AVANT de commencer.

1. **Créer le container** : `create_container(accountId, name="NomClient - SS", usageContext=["server"])`
2. **Récupérer le workspaceId** : `list_workspaces`
3. **Activer les built-in variables** : `enable_built_in_variables(types=["clientName","eventName","requestPath"])`
4. **Créer les variables** (voir `references/ss-variables.md`) :
   - Constantes IDs (uniquement les canaux activés)
   - Lookup tables (GAds Dynamic Remarketing + Meta CAPI Events + Social Ads Events si applicable)
5. **Importer les templates CAPI** depuis le container modèle SS :
   - `get_template(accountId="6202584177", containerId="169437244", workspaceId="4", templateId="24")` → Meta CAPI
   - `get_template(..., templateId="30")` → TikTok (ou `import_gallery_template(owner="addingwell", repo="tiktok-conversion-api-tag")`)
   - `get_template(..., templateId="36")` → Snapchat
   - `get_template(..., templateId="40")` → Pinterest
   - `get_template(..., templateId="45")` → LinkedIn
   - Passer le `templateData` complet à `create_template` → récupérer le `type` retourné
6. **Créer les triggers** SS (voir `references/triggers.md` section SS)
7. **Créer les tags** SS (voir `references/tags.md` section SS) — utiliser les types retournés par create_template pour les tags CAPI
8. **Versionner CS** : `create_version` sur le container CS
9. **Versionner SS** : `create_version` sur le container SS

### Étape 4 — Audit de cohérence

Lire `references/audit-checklist.md` pour la checklist complète.

En résumé, vérifier :
- Chaque tag a au moins un trigger de déclenchement
- Aucun trigger orphelin (non lié à un tag)
- Les Measurement IDs et Conversion IDs ne sont pas des placeholders
- Les conventions de nommage sont respectées
- Le consent est configuré sur les tags qui le nécessitent
- Les tags ecommerce ont `sendEcommerceData: true` et `getEcommerceDataFrom: dataLayer`

### Étape 5 — Versioning

Créer une version avec un nom descriptif avant de la proposer à la publication :
- Nom : `v1.0 - Setup initial [Nom client]`
- Notes : résumé des tags, triggers, variables créés

Ne jamais publier sans confirmation explicite de l'utilisateur.

### Étape 6 — Vérification post-déploiement

Après publication, vérifier que les tags fonctionnent. 3 niveaux, du plus rapide au plus complet :

#### Niveau 1 — Audit structurel (toujours, ~3 appels MCP)
Relire le container publié via `list_tags`, `list_triggers`, `list_variables` et vérifier :
- Chaque tag a au moins un firingTriggerId valide
- Aucun triggerId référencé qui n'existe pas
- Les variables constantes n'ont pas de valeur placeholder (`123`, `G-XXXXXXXX`) — si c'est le cas, lister les variables à mettre à jour
- Le consent est bien configuré (analytics_storage sur GA4, ad_storage sur GAds)
- Le tag GA4 Config a bien `server_container_url` si SST

#### Niveau 2 — GA4 Realtime (si site live + snippet installé)
Utiliser le MCP Google Analytics pour vérifier que les events arrivent en temps réel :

```
googleAnalyticsServer:run_realtime_report(
  property_id="PROPERTY_ID",
  dimensions=[{"name":"eventName"}],
  metrics=[{"name":"eventCount"}]
)
```

Prérequis :
- Le snippet GTM doit être installé sur le site
- La propriété GA4 doit être accessible via le MCP GA4
- Demander le `property_id` GA4 au client si non fourni (format: `properties/XXXXXXXX` ou juste le numéro)

Vérifier que ces events apparaissent dans le rapport realtime :
- `page_view` (toujours présent si GA4 Config fonctionne)
- Les conversions spécifiques (purchase, generate_lead, etc.) si quelqu'un navigue sur le site

Si `page_view` n'apparaît pas → problème de snippet, de measurement ID, ou de server container URL.
Si `page_view` apparaît mais pas les events ecom → problème de dataLayer ou de triggers.

#### Niveau 3 — Claude in Chrome (optionnel, pour debug avancé)
Si les niveaux 1 et 2 ne suffisent pas, utiliser Claude in Chrome pour :
1. Ouvrir le site du client dans le navigateur
2. Lire les requêtes réseau (`read_network_requests`) pour vérifier :
   - Les hits vers `https://www.google-analytics.com/g/collect` (GA4)
   - Les hits vers `https://www.googleadservices.com/pagead/conversion/` (GAds)
   - Les hits vers `https://www.facebook.com/tr/` (Meta Pixel)
   - Les hits vers le server container URL (SST)
3. Naviguer sur des pages clés (page produit, panier, checkout) pour vérifier les events ecom
4. Cliquer sur le numéro de téléphone pour tester le trigger call (Lead Gen)

Ce niveau est le plus lent et le plus consommateur en tokens. Ne l'utiliser que si un problème est détecté aux niveaux 1-2, ou si l'utilisateur le demande explicitement.

#### Rapport de vérification
Présenter les résultats sous cette forme :
- ✅ **GA4 Config** : page_view détecté en realtime / structurellement OK
- ✅ **GAds Conversion** : tag lié au bon trigger, consent configuré
- ⚠️ **Meta CAPI** : token placeholder, à mettre à jour
- ❌ **GA4 - purchase** : trigger manquant, tag orphelin

---

### Étape 7 — Génération du plan de taggage technique

Après la vérification, générer un document .docx professionnel à livrer au client. Ce document sert de spécification technique pour l'intégration du dataLayer par le développeur.

Lire `references/tagging-plan-template.md` pour la structure complète du document.

**Contenu du document :**
1. Synthèse du setup (IDs, containers, canaux)
2. Tableau des événements trackés (avec paramètres ecom si applicable)
3. Conversions Google Ads (avec labels)
4. Canaux CAPI (Meta, TikTok, etc.)
5. Spécifications dataLayer avec exemples de code JavaScript prêts à copier-coller
6. Snippet GTM à installer
7. Checklist d'intégration pour le développeur

**Génération :**
- Utiliser le skill `docx` (docx-js) pour créer le fichier .docx
- Remplacer tous les placeholders par les valeurs réelles du container créé
- Adapter selon le type (Lead Gen vs E-commerce) : ne pas inclure les events ecom dans un doc Lead Gen
- Adapter selon les canaux activés : ne pas mentionner Meta si pas activé
- Nommer le fichier : `Plan_taggage_[NomClient]_v1.0.docx`

Ce document est le livrable final de l'onboarding. Le présenter à l'utilisateur pour revue avant envoi au client.

---

## Workflow : Duplication de container

Pour dupliquer un container existant vers un nouveau client :

1. **Scanner le container source** : lister tous les tags, triggers, variables
2. **Créer le nouveau container** dans le compte du client
3. **Recréer tous les éléments** dans l'ordre : variables → triggers → tags
4. **Mettre à jour les IDs** avec les valeurs du nouveau client
5. **Audit de cohérence** (Étape 4 du workflow principal)
6. **Versionner**

Attention : les IDs de triggers changent lors de la duplication. Maintenir un mapping ancien_triggerId → nouveau_triggerId pour lier correctement les tags aux triggers.

---

## Workflow : Audit d'un container existant

Lire `references/audit-checklist.md` pour la checklist complète, puis :

1. Lister tous les tags, triggers, variables du container
2. Vérifier chaque point de la checklist
3. Générer un rapport avec les problèmes trouvés et les recommandations
4. Proposer les corrections à l'utilisateur

---

## Workflow : Mise à jour d'un container existant

Cas fréquents après l'onboarding initial. Toujours créer un nouveau workspace avant de modifier.

### Ajouter une nouvelle conversion GAds
1. Identifier le container et le workspace (ou en créer un nouveau si verrouillé)
2. Créer le trigger correspondant (customEvent ou pageview)
3. Créer le tag GAds Conversion avec le bon conversionLabel et le trigger
4. Si GA4 event associé : créer aussi le tag GA4 Event lié au même trigger
5. Si SS : ajouter le tag GAds conversion SS + trigger SS associé
6. Versionner + publier après confirmation

### Changer un Measurement ID / Conversion ID / Pixel ID
1. Identifier la variable constante à modifier via `list_variables`
2. Pas de `update_variable` dans le MCP — il faut supprimer l'ancienne et recréer avec la nouvelle valeur
3. Alternative : le MCP ne supporte pas update_variable. Vérifier si le MCP a été mis à jour. Sinon, modifier directement dans l'interface GTM pour ce cas précis.

### Ajouter un canal (ex: client qui démarre Meta)
1. **CS** : pas de changement nécessaire (les events sont déjà envoyés au server container via GA4)
2. **SS** : créer un nouveau workspace, puis :
   - Créer les variables constantes (Pixel ID + Token)
   - Créer la lookup table du canal (si pas déjà existante)
   - Importer le template CAPI depuis le modèle via `get_template` + `create_template`
   - Créer le trigger SS
   - Créer le tag CAPI
3. Versionner + publier

### Mettre à jour un token CAPI expiré
Même approche que changer un ID : identifier la variable constante du token, supprimer/recréer avec la nouvelle valeur.

### Ajouter un tag Custom HTML (script tiers)
1. Créer le tag de type `html` avec le script dans le paramètre `html`
2. Lier au trigger All Pages (`2147479553`) ou un trigger spécifique
3. Versionner + publier

### Règle générale pour les mises à jour
- Toujours lister l'état actuel du container avant de modifier (`list_tags`, `list_triggers`, `list_variables`)
- Créer un workspace dédié nommé de façon descriptive (ex: "Ajout Meta CAPI", "MAJ Measurement ID")
- Versionner avec un nom incrémental : `v1.1 - Ajout Meta CAPI`, `v1.2 - MAJ GA4 ID`
- Mettre à jour l'historique client (voir section Historique)

---

## Workflow : Historique des containers

Après chaque création ou modification importante, mettre à jour l'historique. L'historique est présenté à l'utilisateur et peut être sauvegardé via le persistent storage de l'artifact.

### Format de l'entrée historique

```
## [Nom client]
- **Date** : YYYY-MM-DD
- **Account ID** : XXXXXXXXXX
- **CS** : GTM-XXXXXXXX (containerId: XXXXXXXXX)
- **SS** : GTM-XXXXXXXX (containerId: XXXXXXXXX) — si applicable
- **Template** : Lead Gen / E-commerce
- **Canaux** : GA4, GAds, Meta, TikTok...
- **IDs** :
  - GA4 : G-XXXXXXXX
  - GAds : AW-XXXXXXXX
  - Meta Pixel : XXXXXXXX
  - SST URL : https://sst.domain.com
- **Versions** :
  - v1.0 (YYYY-MM-DD) : Setup initial
  - v1.1 (YYYY-MM-DD) : Ajout Meta CAPI
- **Notes** : informations spécifiques au client
```

### Quand mettre à jour l'historique
- Après chaque création de container (CS et/ou SS)
- Après chaque publication de nouvelle version
- Après chaque changement d'ID important (measurement ID, pixel ID, token)

### Comment le présenter
À la fin de chaque workflow (création ou mise à jour), résumer l'entrée historique dans le chat. L'utilisateur peut la copier ou la sauvegarder. Si un artifact avec persistent storage est disponible, proposer de l'y stocker automatiquement.

---

## Définitions techniques

Toutes les définitions JSON exactes (variables, triggers, tags, parametersJson) sont dans les fichiers de référence. Ne PAS appeler `get_tag_templates` ou `get_trigger_templates` — tout est hardcodé.

- Variables CS : `references/cs-variables.md`
- Variables SS : `references/ss-variables.md`
- Triggers CS + SS : `references/triggers.md`
- Tags CS + SS : `references/tags.md`

Les patterns clés à retenir :
- Trigger customEvent : `customEventFilterJson` avec `{{_event}}` equals `EVENT_NAME`
- Trigger SS : type `always` avec `filterJson` combinant `{{Client Name}}` equals `GA4` + condition
- Tag GA4 Event ecom : `sendEcommerceData: true`, `getEcommerceDataFrom: dataLayer`, `measurementIdOverride`, `eventSettingsVariable`
- Consent GA4 : `consentStatus: needed`, `consentTypes: analytics_storage`
- Consent GAds : `consentStatus: needed`, `consentTypes: ad_storage`
- All Pages CS built-in triggerId : `2147479553`
- All Pages SS built-in triggerId : `2147479574`

---

## Règles critiques apprises en production

### Import de templates CAPI (Meta, TikTok, Snapchat, Pinterest, LinkedIn)

Les templates Addingwell (Meta CAPI, TikTok Events API, etc.) ne sont PAS dans la Community Template Gallery standard. Pour les importer dans un nouveau container SS :

1. **Récupérer le `.tpl` complet** depuis le container modèle via `get_template(templateId)` — récupérer le champ `templateData` en entier
2. **Passer le templateData complet** à `create_template` — le code doit inclure TOUTES les sections : `___INFO___`, `___TEMPLATE_PARAMETERS___`, `___SANDBOXED_JS_FOR_SERVER___`, `___SERVER_PERMISSIONS___`, `___TESTS___`, `___NOTES___`
3. **Ne JAMAIS envoyer de placeholder** — un placeholder sans les permissions déclarées (logging, send_http, set_cookies, etc.) sera rejeté par l'API GTM
4. Le `create_template` retourne un `type` (ex: `cvt_248852748_18`) — utiliser ce type pour créer le tag associé

### Workspace et versioning

- Après un `create_version`, le workspace est verrouillé ("already submitted")
- Pour ajouter des éléments après versioning, créer un **nouveau workspace** via `create_workspace`
- Stratégie recommandée : créer TOUS les éléments (y compris templates CAPI) AVANT de versionner
- Ordre de création impératif dans un workspace SS : variables → built-in variables → templates → triggers → tags → version

### Ordre de création CS

L'ordre est critique car les tags référencent les triggers et variables :
1. Variables constantes (IDs)
2. Variables DLV (User Data, Ecommerce, Page)
3. Variables GA4 Settings (Event settings, Configuration settings) — dépendent des DLV
4. Triggers (customEvent, pageview, linkClick)
5. Tags (référencent triggers par ID + variables par nom)
6. Version

### Consent settings

Appliquer systématiquement :
- Tags GA4 : `consentStatus: "needed"`, `consentTypes: "analytics_storage"`
- Tags GAds (conversion + remarketing) : `consentStatus: "needed"`, `consentTypes: "ad_storage"`
- Tags Clarity / Custom HTML : pas de consent par défaut (à adapter selon CMP)

---

## Sécurité et garde-fous

1. **Jamais de suppression sans confirmation explicite** — toujours demander avant de supprimer un tag, trigger, variable ou container
2. **Jamais de publication sans confirmation** — créer la version, montrer le résumé, attendre le feu vert
3. **Toujours versionner avant de publier** — nom descriptif + notes
4. **Utiliser les fichiers de référence hardcodés** — ne scanner le modèle que si l'utilisateur signale un changement
5. **Mapper les trigger IDs lors des duplications** — les IDs changent, les tags doivent pointer vers les bons triggers
6. **Valeurs placeholder** — si un ID n'est pas disponible, utiliser `123` ou `G-XXXXXXXX` et le signaler clairement à l'utilisateur
7. **Créer tous les éléments SS avant de versionner** — y compris les templates CAPI, pour éviter le verrouillage du workspace

---

## Référence rapide des types GTM

### Types de tags
| Type GTM | Description |
|----------|-------------|
| `googtag` | Google Tag (GA4 Configuration) |
| `gaawe` | GA4 Event |
| `awct` | Google Ads Conversion Tracking |
| `sp` | Google Ads Remarketing |
| `gclidw` | Conversion Linker |
| `html` | Custom HTML |
| `baut` | Bing/Microsoft UET |
| `sgtmgaaw` | GA4 (SS) |
| `sgtmadsct` | GAds Conversion (SS) |
| `sgtmadsremarket` | GAds Remarketing (SS) |
| `sgtmadscl` | Conversion Linker (SS) |
| `sgtmawud` | GAds User Data (SS) |

### Types de triggers
| Type GTM | Description |
|----------|-------------|
| `pageview` | Page vue |
| `customEvent` | Événement dataLayer personnalisé |
| `linkClick` | Clic sur lien |
| `formSubmission` | Soumission de formulaire |
| `always` | Toujours (SS) |

### Types de variables
| Type GTM | Description |
|----------|-------------|
| `c` | Constante |
| `v` | Variable DataLayer |
| `k` | Cookie |
| `jsm` | Custom JavaScript |
| `gtes` | GA4 Event Settings |
| `gtcs` | GA4 Configuration Settings |
| `remm` | Lookup Table (Regex) |

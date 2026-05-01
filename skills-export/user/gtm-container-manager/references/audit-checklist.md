# Audit de cohérence GTM — Checklist complète

Ce document est la référence pour l'audit de cohérence d'un container GTM.
À lire systématiquement avant de lancer un audit.

---

## 1. Structure générale

- [ ] Le container a un tag GA4 Configuration (`googtag`) qui se déclenche sur All Pages
- [ ] Un Conversion Linker (`gclidw`) est présent et se déclenche sur All Pages
- [ ] Les folders sont correctement organisés (SETUP, LEADGEN, GA4, DataLayer)

## 2. Tags

- [ ] Chaque tag a au moins un trigger de déclenchement (firingTriggerId non vide)
- [ ] Aucun tag n'est en pause involontairement (vérifier `paused: true`)
- [ ] Les noms suivent la convention `[Canal] - [Event]`
- [ ] Les tags GA4 Event ont tous :
  - `measurementIdOverride` pointant vers `{{GA4 - Measurement id}}`
  - `eventSettingsVariable` pointant vers `{{GA4 - Event settings - User Data}}`
  - Un parameter `event_id` pour la déduplication
- [ ] Les tags ecommerce GA4 ont `sendEcommerceData: true` et `getEcommerceDataFrom: dataLayer`
- [ ] Les tags GAds Conversion ont `conversionId` et `conversionLabel` renseignés (pas de placeholder `123` en production)
- [ ] Les tags Custom HTML (Clarity, etc.) ont le bon script avec le bon project ID

## 3. Triggers

- [ ] Chaque trigger est lié à au moins un tag (pas de triggers orphelins)
- [ ] Les noms suivent la convention `[Canal] - Trigger - [Event]`
- [ ] Les triggers customEvent ont un `customEventFilterJson` avec le bon event name
- [ ] Les triggers pageview ont les bons filtres d'URL
- [ ] Les triggers linkClick ont les bons filtres (Click URL contains tel:, mailto:, etc.)
- [ ] Pas de triggers en double (même event name avec le même filtre)

## 4. Variables

- [ ] Toutes les variables constantes IDs ont des valeurs réelles (pas de `123`, `G-XXXXXXXX` en production)
- [ ] Les variables DataLayer pointent vers les bonnes clés dataLayer
- [ ] La variable `GA4 - Event settings - User Data` contient tous les champs user_data nécessaires
- [ ] La variable `GA4 - Configuration settings` inclut `send_page_view: true` et `server_container_url`
- [ ] La variable `GA4 - Server container url` a la bonne URL SST du client

## 5. Consent

- [ ] Les tags GA4 ont `consentStatus: needed` avec `analytics_storage`
- [ ] Les tags GAds ont `consentStatus: needed` avec `ad_storage`
- [ ] Les tags de remarketing ont le consent approprié
- [ ] Le CMP du client est correctement intégré (si applicable)

## 6. Server-Side (si SST)

- [ ] Le tag GA4 SS (`sgtmgaaw`) se déclenche sur Client Name = GA4
- [ ] Le Conversion Linker SS se déclenche sur All Pages
- [ ] Les tags CAPI (Meta, TikTok, etc.) ont les bons tokens et pixel IDs
- [ ] Les lookup tables filtrent les bons événements
- [ ] Le tag GAds User-provided Data est présent et se déclenche sur All Pages

## 7. Cohérence CS ↔ SS

- [ ] Chaque conversion trackée côté CS a son équivalent SS (si SST activé)
- [ ] Les event names sont identiques entre CS et SS
- [ ] Les variables user_data sont transmises du CS au SS via le event settings

---

## Format du rapport d'audit

Présenter les résultats sous cette forme :

### ✅ Points conformes
Liste des vérifications passées avec succès.

### ⚠️ Avertissements
Points non bloquants mais à améliorer (nommage, consent manquant, etc.)

### ❌ Erreurs critiques
Points bloquants qui empêchent le bon fonctionnement (tag sans trigger, ID placeholder en production, etc.)

### 📋 Actions recommandées
Liste numérotée des corrections à apporter, par ordre de priorité.

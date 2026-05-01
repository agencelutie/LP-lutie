# Plan de taggage technique — Template de document

Ce fichier décrit la structure du document .docx à générer après chaque setup initial.
Le document est destiné au client et/ou à son développeur pour implémenter le dataLayer.

## Quand le générer

Automatiquement après l'Étape 5 (versioning), avant la vérification. Utiliser les données réelles du container créé (noms des tags, events, variables, IDs).

## Structure du document

### Page de garde
- Logo Lutie (si disponible)
- Titre : **Plan de taggage technique**
- Sous-titre : Nom du client
- Date
- Version : v1.0
- Préparé par : Lutie

### 1. Synthèse du setup

Tableau récapitulatif :

| Élément | Valeur |
|---------|--------|
| Client | Nom du client |
| URL | https://www.example.com |
| Type | Lead Gen / E-commerce |
| Container CS | GTM-XXXXXXXX |
| Container SS | GTM-XXXXXXXX (si applicable) |
| GA4 Measurement ID | G-XXXXXXXX |
| GA4 Property ID | XXXXXXXXX |
| Google Ads ID | AW-XXXXXXXX |
| Server Container URL | https://sst.example.com |
| Canaux actifs | GA4, Google Ads, Meta, etc. |
| CMP | Axeptio / Didomi / etc. |

### 2. Événements trackés

Tableau listant chaque événement avec ses détails :

**Pour E-commerce :**

| Événement | Nom GA4 | Type | Déclencheur | Paramètres ecom | Consent |
|-----------|---------|------|-------------|-----------------|---------|
| Vue de page | page_view | Configuration | Toutes les pages | — | analytics_storage |
| Vue liste produits | view_item_list | dataLayer | Event view_item_list | items, item_list_id, item_list_name | analytics_storage |
| Sélection produit | select_item | dataLayer | Event select_item | items | analytics_storage |
| Vue produit | view_item | dataLayer | Event view_item | items | analytics_storage |
| Ajout au panier | add_to_cart | dataLayer | Event add_to_cart | items | analytics_storage |
| Retrait du panier | remove_from_cart | dataLayer | Event remove_from_cart | items | analytics_storage |
| Vue du panier | view_cart | dataLayer | Event view_cart | items, value, currency | analytics_storage |
| Début checkout | begin_checkout | dataLayer | Event begin_checkout | items, value, currency | analytics_storage |
| Ajout infos livraison | add_shipping_info | dataLayer | Event add_shipping_info | items, value, currency, shipping_tier | analytics_storage |
| Ajout infos paiement | add_payment_info | dataLayer | Event add_payment_info | items, value, currency, payment_type | analytics_storage |
| Ajout infos contact | add_contact_info | dataLayer | Event add_contact_info | items, value, currency | analytics_storage |
| Ajout adresse | add_address_info | dataLayer | Event add_address_info | items, value, currency | analytics_storage |
| Achat | purchase | dataLayer | Event purchase | items, value, currency, transaction_id, shipping, tax, coupon | analytics_storage |
| Inscription | sign_up | dataLayer | Event sign_up | — | analytics_storage |
| Connexion | login | dataLayer | Event login | — | analytics_storage |
| Recherche | search | dataLayer | Event search | search_term | analytics_storage |

**Pour Lead Gen :**

| Événement | Nom GA4 | Type | Déclencheur | Consent |
|-----------|---------|------|-------------|---------|
| Vue de page | page_view | Configuration | Toutes les pages | analytics_storage |
| Demande de devis | generate_lead | dataLayer + pageview | Event form_submit + Page remerciement | analytics_storage |
| Appel téléphonique | event_call | dataLayer + clic | Event call + Clic tel:+XX | analytics_storage |

### 3. Conversions Google Ads

| Conversion | Event GA4 | Label GAds | Consent |
|------------|-----------|------------|---------|
| (Nom conversion) | (event_name) | (label) | ad_storage |

### 4. Canaux publicitaires (CAPI / Server-Side)

Pour chaque canal activé (Meta, TikTok, Snapchat, Pinterest, LinkedIn) :

| Canal | Type | Mode | Events trackés |
|-------|------|------|----------------|
| Meta | Conversion API (Addingwell) | Server-side via SST | page_view, view_item, add_to_cart, begin_checkout, add_payment_info, purchase, generate_lead |
| Google Ads | Remarketing + Conversions | Server-side via SST | Tous les events (dynamic remarketing) + conversions spécifiques |

### 5. Spécifications DataLayer — à implémenter par le développeur

Cette section est la plus importante pour le client/dev. Elle donne les exemples de code dataLayer à intégrer sur le site.

#### 5.1 Structure de base

```javascript
// Le dataLayer doit être initialisé AVANT le snippet GTM
window.dataLayer = window.dataLayer || [];
```

#### 5.2 User Data (Enhanced Conversions)

```javascript
// Pousser les données utilisateur quand disponibles (login, checkout, formulaire)
dataLayer.push({
  event: 'user_data_ready',
  user_id: '12345',
  user_data: {
    email_address: 'user@example.com',
    phone_number: '+33612345678',
    address: {
      first_name: 'Jean',
      last_name: 'Dupont',
      street: '1 rue de la Paix',
      city: 'Paris',
      region: 'Île-de-France',
      postal_code: '75001',
      country: 'FR'
    }
  }
});
```

#### 5.3 Events E-commerce (exemples)

**view_item_list**
```javascript
dataLayer.push({ ecommerce: null }); // Clear previous ecommerce data
dataLayer.push({
  event: 'view_item_list',
  ecommerce: {
    item_list_id: 'category_123',
    item_list_name: 'Catégorie Exemple',
    items: [{
      item_id: 'SKU_12345',
      item_name: 'Nom du produit',
      item_category: 'Catégorie',
      price: 29.99,
      quantity: 1
    }]
  }
});
```

**add_to_cart**
```javascript
dataLayer.push({ ecommerce: null });
dataLayer.push({
  event: 'add_to_cart',
  ecommerce: {
    currency: 'EUR',
    value: 29.99,
    items: [{
      item_id: 'SKU_12345',
      item_name: 'Nom du produit',
      item_category: 'Catégorie',
      price: 29.99,
      quantity: 1
    }]
  }
});
```

**purchase**
```javascript
dataLayer.push({ ecommerce: null });
dataLayer.push({
  event: 'purchase',
  ecommerce: {
    transaction_id: 'T_12345',
    value: 59.98,
    currency: 'EUR',
    tax: 10.00,
    shipping: 5.99,
    coupon: 'PROMO10',
    items: [{
      item_id: 'SKU_12345',
      item_name: 'Nom du produit',
      item_category: 'Catégorie',
      price: 29.99,
      quantity: 2
    }]
  }
});
```

#### 5.4 Events Lead Gen (exemples)

**generate_lead (soumission formulaire)**
```javascript
dataLayer.push({
  event: 'form_submit',
  user_data: {
    email_address: 'user@example.com',
    phone_number: '+33612345678'
  }
});
```

**event_call (clic téléphone)**
```javascript
dataLayer.push({
  event: 'call'
});
```

Note : le clic sur un lien `tel:+XXXXXXXXXXX` est aussi tracké automatiquement via un trigger linkClick.

### 6. Snippet GTM à installer

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','__GTM_CS_ID__');</script>
<!-- End Google Tag Manager -->

<!-- Google Tag Manager (noscript) — placer après la balise <body> -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=__GTM_CS_ID__"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
```

### 7. Checklist d'intégration pour le développeur

- [ ] Initialiser `window.dataLayer` avant le snippet GTM
- [ ] Installer le snippet GTM dans le `<head>` de toutes les pages
- [ ] Installer le noscript après `<body>`
- [ ] Implémenter les events dataLayer listés en section 5
- [ ] Pousser les user_data quand disponibles (login, checkout, formulaire)
- [ ] Pour e-commerce : toujours faire `dataLayer.push({ ecommerce: null })` avant chaque event ecom
- [ ] Tester via GTM Preview Mode avant la mise en production
- [ ] Valider les events dans GA4 Realtime après mise en production

## Comment générer le document

Utiliser le skill docx (`npm install -g docx`) pour créer un .docx professionnel. Remplacer tous les placeholders (`__XX__`) par les valeurs réelles du container créé. Adapter les sections selon le type (Lead Gen vs E-commerce) et les canaux activés.

Le document doit être propre, professionnel, et directement exploitable par un développeur.

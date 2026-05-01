# Configuration des Credentials & APIs

Ce fichier couvre la configuration de toutes les connexions nécessaires au skill Performance Ads Manager.

---

## 1. GOOGLE ADS API

### Fichier google-ads.yaml

Créer ce fichier à la racine du projet ou dans `~/.config/google-ads.yaml` :

```yaml
developer_token: VOTRE_DEVELOPER_TOKEN
client_id: VOTRE_CLIENT_ID
client_secret: VOTRE_CLIENT_SECRET
refresh_token: VOTRE_REFRESH_TOKEN
login_customer_id: VOTRE_MCC_ID  # ID du compte MCC (sans tirets)
use_proto_plus: True
```

### Obtenir les credentials Google Ads

1. **Developer Token** : Google Ads > Outils > Centre API > Accès API
2. **Client ID / Secret** : Google Cloud Console > APIs & Services > Credentials > OAuth 2.0
3. **Refresh Token** : utiliser le script `scripts/get_google_refresh_token.py`

### Test de connexion
```bash
python scripts/check_connection.py --customer-id 123-456-7890
```

---

## 2. META ADS API (Facebook Marketing API)

### Variables d'environnement

Créer un fichier `.env` à la racine du projet :

```bash
META_ACCESS_TOKEN=VOTRE_ACCESS_TOKEN_LONGUE_DUREE
META_APP_ID=VOTRE_APP_ID
META_APP_SECRET=VOTRE_APP_SECRET
META_AD_ACCOUNT_ID=act_VOTRE_ACCOUNT_ID  # Format : act_123456789
META_BUSINESS_ID=VOTRE_BUSINESS_MANAGER_ID
```

### Obtenir les credentials Meta

1. **App ID / Secret** : developers.facebook.com > Mes Applications > Créer une application (type Business)
2. **Access Token longue durée** :
   - Obtenir un token court : Graph API Explorer (permission : `ads_read`, `ads_management`, `business_management`)
   - Convertir en token longue durée (60 jours) :
   ```bash
   python scripts/get_meta_long_lived_token.py --short-token VOTRE_TOKEN_COURT
   ```
3. **Ad Account ID** : Meta Ads Manager > URL du compte (format : act_XXXXXXXXXX)

### Test de connexion Meta
```bash
python scripts/fetch_meta_data.py --account-id act_123456789 --days 7
```

### Renouvellement du token
Le token longue durée expire après 60 jours. Configurer un rappel ou automatiser le renouvellement :
```bash
python scripts/refresh_meta_token.py
```

---

## 3. EMAIL (SMTP / API)

### Option A — SMTP Standard (Gmail, Outlook, etc.)

Ajouter dans `.env` :
```bash
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_SENDER=votre-agence@gmail.com
EMAIL_PASSWORD=VOTRE_APP_PASSWORD  # Gmail : créer un "Mot de passe d'application" dans les paramètres Google
EMAIL_RECIPIENT_DEFAULT=client@example.com
```

Pour Gmail, activer "Mots de passe d'application" dans Sécurité du compte Google (nécessite la validation en 2 étapes activée).

### Option B — SendGrid API (recommandé pour la fiabilité)

```bash
SENDGRID_API_KEY=SG.VOTRE_CLE_API
EMAIL_SENDER=reports@votre-agence.com
```

### Option C — Mailgun

```bash
MAILGUN_API_KEY=VOTRE_CLE_API
MAILGUN_DOMAIN=mg.votre-domaine.com
EMAIL_SENDER=reports@mg.votre-domaine.com
```

### Test d'envoi email
```bash
python scripts/send_report_email.py --to test@example.com --test
```

---

## 4. WHATSAPP BUSINESS API (Meta)

### Prérequis
- Compte Meta Business Manager vérifié
- Application Meta avec permissions WhatsApp Business
- Numéro de téléphone WhatsApp Business enregistré

### Variables d'environnement

Ajouter dans `.env` :
```bash
WHATSAPP_ACCESS_TOKEN=VOTRE_TOKEN_META  # Même token que Meta Ads si même app
WHATSAPP_PHONE_NUMBER_ID=VOTRE_PHONE_NUMBER_ID  # Trouvé dans Meta Business > WhatsApp > Getting Started
WHATSAPP_RECIPIENT_DEFAULT=+33XXXXXXXXX  # Numéro du destinataire avec indicatif pays
```

### Configurer les templates de messages
Les messages WhatsApp Business doivent utiliser des templates pré-approuvés par Meta :
1. Meta Business Manager > WhatsApp Manager > Modèles de message
2. Créer les templates `weekly_summary` et `monthly_summary`
3. Soumettre à approbation (généralement 24-48h)

### Test d'envoi WhatsApp
```bash
python scripts/send_whatsapp_summary.py --phone "+33XXXXXXXXX" --template weekly_summary --test
```

### Fallback si WhatsApp Business API non disponible
Utiliser l'envoi email uniquement, ou intégrer via Zapier/Make avec un webhook vers WhatsApp.

---

## 5. APIFY MCP (Fallback pour Meta Ads Data)

Si l'accès à la Meta Marketing API échoue ou n'est pas configuré, utiliser le MCP Apify :

```
Outil : mcp__Apify__search-actors
Requête : "facebook ads" ou "meta ads manager"
```

Puis appeler l'acteur trouvé avec :
```
Outil : mcp__Apify__call-actor
Actor ID : [ID trouvé dans la recherche]
Input : { "adAccountId": "act_XXXXXXXXX", "accessToken": "VOTRE_TOKEN" }
```

Résultats disponibles via :
```
Outil : mcp__Apify__get-actor-output
```

---

## 6. RÉCAPITULATIF DES FICHIERS À CONFIGURER

| Fichier | Contenu | Obligatoire |
|---------|---------|-------------|
| `~/.config/google-ads.yaml` | Credentials Google Ads API | Oui (Google Ads) |
| `.env` | Tous les autres tokens et credentials | Oui |
| `.env` > META_* | Credentials Meta Marketing API | Oui (Meta Ads) |
| `.env` > EMAIL_* | Config SMTP ou API email | Pour rapports email |
| `.env` > WHATSAPP_* | Config WhatsApp Business API | Pour rapports WhatsApp |

**Sécurité** : Ne jamais committer `.env` ou `google-ads.yaml` dans un repo Git. Ajouter au `.gitignore`.

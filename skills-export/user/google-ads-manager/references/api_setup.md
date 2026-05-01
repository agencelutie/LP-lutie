# Google Ads API — Configuration & Setup

## Prérequis

1. Un **Developer Token** Google Ads (obtenu via votre compte MCC)
2. Un **OAuth2 Client ID et Secret** (depuis Google Cloud Console)
3. Un **Refresh Token** OAuth2 (généré une fois via le flux OAuth)
4. L'ID de votre compte **MCC** (Manager Account)
5. L'**ID client** (CID) du compte à gérer (format: xxx-xxx-xxxx)

## Format du fichier `google-ads.yaml`

Ce fichier doit être placé dans le répertoire home (`~/.google-ads.yaml`) ou dans le répertoire courant d'exécution.

```yaml
developer_token: "VOTRE_DEVELOPER_TOKEN"
client_id: "VOTRE_CLIENT_ID.apps.googleusercontent.com"
client_secret: "VOTRE_CLIENT_SECRET"
refresh_token: "VOTRE_REFRESH_TOKEN"
login_customer_id: "VOTRE_MCC_ID"  # sans tirets, ex: 1234567890
use_proto_plus: True
```

## Générer le Refresh Token (une seule fois)

Si vous n'avez pas encore de refresh token, exécutez :

```bash
pip install google-ads --break-system-packages
python scripts/generate_refresh_token.py \
  --client-id "VOTRE_CLIENT_ID" \
  --client-secret "VOTRE_CLIENT_SECRET"
```

Suivez les instructions : un lien s'affiche, ouvrez-le dans votre navigateur, autorisez l'accès, copiez le code de retour.

## Installation des dépendances

```bash
pip install google-ads pandas openpyxl --break-system-packages
```

## Vérification de la connexion

```bash
python scripts/check_connection.py --customer-id VOTRE_CID
```

Résultat attendu :
```
✅ Connexion réussie
Compte : [Nom du compte]
ID : xxx-xxx-xxxx
Statut : ENABLED
Fuseau horaire : Europe/Paris
Devise : EUR
```

## Troubleshooting courant

| Erreur | Cause probable | Solution |
|--------|---------------|----------|
| `AuthenticationError.OAUTH_TOKEN_EXPIRED` | Refresh token expiré | Regénérer le refresh token |
| `AuthorizationError.USER_PERMISSION_DENIED` | Mauvais login_customer_id | Vérifier l'ID MCC dans le yaml |
| `RequestError.BAD_RESOURCE_ID` | CID incorrect | Vérifier le format du CID (sans tirets) |
| `QuotaError.RESOURCE_EXHAUSTED` | Quota API dépassé | Attendre ou demander une augmentation de quota |

## Niveaux d'accès requis

- Pour lire les données : accès **Lecture seule** suffisant
- Pour modifier les campagnes : accès **Standard** ou **Administrateur**
- Pour accéder au MCC : être listé comme utilisateur du compte MCC

## Structure des Customer IDs

- **MCC (Manager Account)** : compte parent qui gère plusieurs comptes enfants
- **Customer ID (CID)** : compte enfant individuel (format `xxx-xxx-xxxx` en UI, ou `xxxxxxxxxx` dans l'API)

Toujours utiliser `login_customer_id` = MCC ID dans le yaml, même quand vous interrogez un compte enfant.

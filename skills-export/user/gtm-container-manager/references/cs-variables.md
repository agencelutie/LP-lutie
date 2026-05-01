# Variables CS — Définitions hardcodées

Toutes les variables à créer dans un container CS. Les valeurs entre `__PLACEHOLDER__` doivent être remplacées par les valeurs du client.

## Variables constantes (à personnaliser)

```json
[
  {"name": "GA4 - Measurement id", "type": "c", "parametersJson": "[{\"key\":\"value\",\"type\":\"template\",\"value\":\"__GA4_MEASUREMENT_ID__\"}]"},
  {"name": "GA4 - Server container url", "type": "c", "parametersJson": "[{\"key\":\"value\",\"type\":\"template\",\"value\":\"__SST_URL__\"}]"},
  {"name": "ID_GAds", "type": "c", "parametersJson": "[{\"key\":\"value\",\"type\":\"template\",\"value\":\"__GADS_CONVERSION_ID__\"}]"}
]
```

## Variables DLV User Data (identiques pour tous les clients)

```json
[
  {"name": "DLV - User - Email address", "type": "v", "parametersJson": "[{\"key\":\"dataLayerVersion\",\"type\":\"integer\",\"value\":\"2\"},{\"key\":\"setDefaultValue\",\"type\":\"boolean\",\"value\":\"false\"},{\"key\":\"name\",\"type\":\"template\",\"value\":\"user_data.email_address\"}]"},
  {"name": "DLV - User - Phone number", "type": "v", "parametersJson": "[{\"key\":\"dataLayerVersion\",\"type\":\"integer\",\"value\":\"2\"},{\"key\":\"setDefaultValue\",\"type\":\"boolean\",\"value\":\"false\"},{\"key\":\"name\",\"type\":\"template\",\"value\":\"user_data.phone_number\"}]"},
  {"name": "DLV - User - First name", "type": "v", "parametersJson": "[{\"key\":\"dataLayerVersion\",\"type\":\"integer\",\"value\":\"2\"},{\"key\":\"setDefaultValue\",\"type\":\"boolean\",\"value\":\"false\"},{\"key\":\"name\",\"type\":\"template\",\"value\":\"user_data.address.first_name\"}]"},
  {"name": "DLV - User - Last name", "type": "v", "parametersJson": "[{\"key\":\"dataLayerVersion\",\"type\":\"integer\",\"value\":\"2\"},{\"key\":\"setDefaultValue\",\"type\":\"boolean\",\"value\":\"false\"},{\"key\":\"name\",\"type\":\"template\",\"value\":\"user_data.address.last_name\"}]"},
  {"name": "DLV - User - Street", "type": "v", "parametersJson": "[{\"key\":\"dataLayerVersion\",\"type\":\"integer\",\"value\":\"2\"},{\"key\":\"setDefaultValue\",\"type\":\"boolean\",\"value\":\"false\"},{\"key\":\"name\",\"type\":\"template\",\"value\":\"user_data.address.street\"}]"},
  {"name": "DLV - User - City", "type": "v", "parametersJson": "[{\"key\":\"dataLayerVersion\",\"type\":\"integer\",\"value\":\"2\"},{\"key\":\"setDefaultValue\",\"type\":\"boolean\",\"value\":\"false\"},{\"key\":\"name\",\"type\":\"template\",\"value\":\"user_data.address.city\"}]"},
  {"name": "DLV - User - Region", "type": "v", "parametersJson": "[{\"key\":\"dataLayerVersion\",\"type\":\"integer\",\"value\":\"2\"},{\"key\":\"setDefaultValue\",\"type\":\"boolean\",\"value\":\"false\"},{\"key\":\"name\",\"type\":\"template\",\"value\":\"user_data.address.region\"}]"},
  {"name": "DLV - User - Postal code", "type": "v", "parametersJson": "[{\"key\":\"dataLayerVersion\",\"type\":\"integer\",\"value\":\"2\"},{\"key\":\"setDefaultValue\",\"type\":\"boolean\",\"value\":\"false\"},{\"key\":\"name\",\"type\":\"template\",\"value\":\"user_data.address.postal_code\"}]"},
  {"name": "DLV - User - Country", "type": "v", "parametersJson": "[{\"key\":\"dataLayerVersion\",\"type\":\"integer\",\"value\":\"2\"},{\"key\":\"setDefaultValue\",\"type\":\"boolean\",\"value\":\"false\"},{\"key\":\"name\",\"type\":\"template\",\"value\":\"user_data.address.country\"}]"},
  {"name": "DLV - User - Id", "type": "v", "parametersJson": "[{\"key\":\"dataLayerVersion\",\"type\":\"integer\",\"value\":\"2\"},{\"key\":\"setDefaultValue\",\"type\":\"boolean\",\"value\":\"false\"},{\"key\":\"name\",\"type\":\"template\",\"value\":\"user_id\"}]"}
]
```

## Variables DLV Ecommerce (uniquement E-commerce)

```json
[
  {"name": "DLV - Ecommerce - Value", "type": "v", "parametersJson": "[{\"key\":\"dataLayerVersion\",\"type\":\"integer\",\"value\":\"2\"},{\"key\":\"setDefaultValue\",\"type\":\"boolean\",\"value\":\"false\"},{\"key\":\"name\",\"type\":\"template\",\"value\":\"ecommerce.value\"}]"},
  {"name": "DLV - Ecommerce - Currency", "type": "v", "parametersJson": "[{\"key\":\"dataLayerVersion\",\"type\":\"integer\",\"value\":\"2\"},{\"key\":\"setDefaultValue\",\"type\":\"boolean\",\"value\":\"false\"},{\"key\":\"name\",\"type\":\"template\",\"value\":\"ecommerce.currency\"}]"},
  {"name": "DLV - Ecommerce - Transaction id", "type": "v", "parametersJson": "[{\"key\":\"dataLayerVersion\",\"type\":\"integer\",\"value\":\"2\"},{\"key\":\"setDefaultValue\",\"type\":\"boolean\",\"value\":\"false\"},{\"key\":\"name\",\"type\":\"template\",\"value\":\"ecommerce.transaction_id\"}]"},
  {"name": "DLV - Ecommerce - Items", "type": "v", "parametersJson": "[{\"key\":\"dataLayerVersion\",\"type\":\"integer\",\"value\":\"2\"},{\"key\":\"setDefaultValue\",\"type\":\"boolean\",\"value\":\"false\"},{\"key\":\"name\",\"type\":\"template\",\"value\":\"ecommerce.items\"}]"},
  {"name": "DLV - Ecommerce - Shipping", "type": "v", "parametersJson": "[{\"key\":\"dataLayerVersion\",\"type\":\"integer\",\"value\":\"2\"},{\"key\":\"setDefaultValue\",\"type\":\"boolean\",\"value\":\"false\"},{\"key\":\"name\",\"type\":\"template\",\"value\":\"ecommerce.shipping\"}]"},
  {"name": "DLV - Ecommerce - Coupon", "type": "v", "parametersJson": "[{\"key\":\"dataLayerVersion\",\"type\":\"integer\",\"value\":\"2\"},{\"key\":\"setDefaultValue\",\"type\":\"boolean\",\"value\":\"false\"},{\"key\":\"name\",\"type\":\"template\",\"value\":\"ecommerce.coupon\"}]"},
  {"name": "DLV - Ecommerce - Tax", "type": "v", "parametersJson": "[{\"key\":\"dataLayerVersion\",\"type\":\"integer\",\"value\":\"2\"},{\"key\":\"setDefaultValue\",\"type\":\"boolean\",\"value\":\"false\"},{\"key\":\"name\",\"type\":\"template\",\"value\":\"ecommerce.tax\"}]"},
  {"name": "DLV - Ecommerce - Item list id", "type": "v", "parametersJson": "[{\"key\":\"dataLayerVersion\",\"type\":\"integer\",\"value\":\"2\"},{\"key\":\"setDefaultValue\",\"type\":\"boolean\",\"value\":\"false\"},{\"key\":\"name\",\"type\":\"template\",\"value\":\"ecommerce.item_list_id\"}]"},
  {"name": "DLV - Ecommerce - Item list name", "type": "v", "parametersJson": "[{\"key\":\"dataLayerVersion\",\"type\":\"integer\",\"value\":\"2\"},{\"key\":\"setDefaultValue\",\"type\":\"boolean\",\"value\":\"false\"},{\"key\":\"name\",\"type\":\"template\",\"value\":\"ecommerce.item_list_name\"}]"}
]
```

## Variables DLV Page (identiques pour tous)

```json
[
  {"name": "DLV - Page location", "type": "v", "parametersJson": "[{\"key\":\"dataLayerVersion\",\"type\":\"integer\",\"value\":\"2\"},{\"key\":\"setDefaultValue\",\"type\":\"boolean\",\"value\":\"false\"},{\"key\":\"name\",\"type\":\"template\",\"value\":\"page_location\"}]"},
  {"name": "DLV - Page referrer", "type": "v", "parametersJson": "[{\"key\":\"dataLayerVersion\",\"type\":\"integer\",\"value\":\"2\"},{\"key\":\"setDefaultValue\",\"type\":\"boolean\",\"value\":\"false\"},{\"key\":\"name\",\"type\":\"template\",\"value\":\"page_referrer\"}]"}
]
```

## Variables GA4 Settings (identiques pour tous)

### GA4 - Event settings - User Data (type: gtes)
```json
{"name": "GA4 - Event settings - User Data", "type": "gtes", "parametersJson": "[{\"key\":\"eventSettingsTable\",\"list\":[{\"map\":[{\"key\":\"parameter\",\"type\":\"template\",\"value\":\"user_id\"},{\"key\":\"parameterValue\",\"type\":\"template\",\"value\":\"{{DLV - User - Id}}\"}],\"type\":\"map\"},{\"map\":[{\"key\":\"parameter\",\"type\":\"template\",\"value\":\"user_data.email_address\"},{\"key\":\"parameterValue\",\"type\":\"template\",\"value\":\"{{DLV - User - Email address}}\"}],\"type\":\"map\"},{\"map\":[{\"key\":\"parameter\",\"type\":\"template\",\"value\":\"user_data.phone_number\"},{\"key\":\"parameterValue\",\"type\":\"template\",\"value\":\"{{DLV - User - Phone number}}\"}],\"type\":\"map\"},{\"map\":[{\"key\":\"parameter\",\"type\":\"template\",\"value\":\"user_data.address.first_name\"},{\"key\":\"parameterValue\",\"type\":\"template\",\"value\":\"{{DLV - User - First name}}\"}],\"type\":\"map\"},{\"map\":[{\"key\":\"parameter\",\"type\":\"template\",\"value\":\"user_data.address.last_name\"},{\"key\":\"parameterValue\",\"type\":\"template\",\"value\":\"{{DLV - User - Last name}}\"}],\"type\":\"map\"},{\"map\":[{\"key\":\"parameter\",\"type\":\"template\",\"value\":\"user_data.address.street\"},{\"key\":\"parameterValue\",\"type\":\"template\",\"value\":\"{{DLV - User - Street}}\"}],\"type\":\"map\"},{\"map\":[{\"key\":\"parameter\",\"type\":\"template\",\"value\":\"user_data.address.city\"},{\"key\":\"parameterValue\",\"type\":\"template\",\"value\":\"{{DLV - User - City}}\"}],\"type\":\"map\"},{\"map\":[{\"key\":\"parameter\",\"type\":\"template\",\"value\":\"user_data.address.region\"},{\"key\":\"parameterValue\",\"type\":\"template\",\"value\":\"{{DLV - User - Region}}\"}],\"type\":\"map\"},{\"map\":[{\"key\":\"parameter\",\"type\":\"template\",\"value\":\"user_data.address.postal_code\"},{\"key\":\"parameterValue\",\"type\":\"template\",\"value\":\"{{DLV - User - Postal code}}\"}],\"type\":\"map\"},{\"map\":[{\"key\":\"parameter\",\"type\":\"template\",\"value\":\"user_data.address.country\"},{\"key\":\"parameterValue\",\"type\":\"template\",\"value\":\"{{DLV - User - Country}}\"}],\"type\":\"map\"}],\"type\":\"list\"}]"}
```

### GA4 - Configuration settings (type: gtcs)
```json
{"name": "GA4 - Configuration settings", "type": "gtcs", "parametersJson": "[{\"key\":\"configSettingsTable\",\"list\":[{\"map\":[{\"key\":\"parameter\",\"type\":\"template\",\"value\":\"send_page_view\"},{\"key\":\"parameterValue\",\"type\":\"template\",\"value\":\"true\"}],\"type\":\"map\"},{\"map\":[{\"key\":\"parameter\",\"type\":\"template\",\"value\":\"server_container_url\"},{\"key\":\"parameterValue\",\"type\":\"template\",\"value\":\"{{GA4 - Server container url}}\"}],\"type\":\"map\"}],\"type\":\"list\"}]"}
```

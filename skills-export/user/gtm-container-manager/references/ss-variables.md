# Variables SS — Définitions hardcodées

## Variables constantes SS (à personnaliser)

```json
[
  {"name": "ID_Balise_Google", "type": "c", "parametersJson": "[{\"key\":\"value\",\"type\":\"template\",\"value\":\"__GA4_MEASUREMENT_ID__\"}]"},
  {"name": "Balise GAds", "type": "c", "parametersJson": "[{\"key\":\"value\",\"type\":\"template\",\"value\":\"__GADS_CONVERSION_ID__\"}]"},
  {"name": "Meta Pixel ID", "type": "c", "parametersJson": "[{\"key\":\"value\",\"type\":\"template\",\"value\":\"__META_PIXEL_ID__\"}]"},
  {"name": "Meta Token", "type": "c", "parametersJson": "[{\"key\":\"value\",\"type\":\"template\",\"value\":\"__META_TOKEN__\"}]"},
  {"name": "Tiktok Pixel ID", "type": "c", "parametersJson": "[{\"key\":\"value\",\"type\":\"template\",\"value\":\"__TIKTOK_PIXEL_ID__\"}]"},
  {"name": "Tiktok Token", "type": "c", "parametersJson": "[{\"key\":\"value\",\"type\":\"template\",\"value\":\"__TIKTOK_TOKEN__\"}]"},
  {"name": "Snapchat - Pixel ID", "type": "c", "parametersJson": "[{\"key\":\"value\",\"type\":\"template\",\"value\":\"__SNAP_PIXEL_ID__\"}]"},
  {"name": "Snapchat - token", "type": "c", "parametersJson": "[{\"key\":\"value\",\"type\":\"template\",\"value\":\"__SNAP_TOKEN__\"}]"},
  {"name": "Pinterest - Pixel ID", "type": "c", "parametersJson": "[{\"key\":\"value\",\"type\":\"template\",\"value\":\"__PIN_PIXEL_ID__\"}]"},
  {"name": "Pinterest - Token API", "type": "c", "parametersJson": "[{\"key\":\"value\",\"type\":\"template\",\"value\":\"__PIN_TOKEN__\"}]"},
  {"name": "Pinterest Advertiser ID", "type": "c", "parametersJson": "[{\"key\":\"value\",\"type\":\"template\",\"value\":\"__PIN_ADV_ID__\"}]"},
  {"name": "Linkedin - Conversion RULE ID", "type": "c", "parametersJson": "[{\"key\":\"value\",\"type\":\"template\",\"value\":\"__LINKEDIN_RULE_ID__\"}]"},
  {"name": "Linkedin - Token ID Conversion", "type": "c", "parametersJson": "[{\"key\":\"value\",\"type\":\"template\",\"value\":\"__LINKEDIN_TOKEN__\"}]"}
]
```

Créer UNIQUEMENT les variables des canaux activés par le client (GA4 + GAds toujours, Meta/TikTok/Snap/Pinterest/LinkedIn si demandé).

## Lookup tables SS (identiques pour tous — ecom+leadgen)

### GAds - Dynamic remarketing event (type: remm)
```json
{"name": "GAds - Dynamic remarketing event", "type": "remm", "parametersJson": "[{\"key\":\"setDefaultValue\",\"type\":\"boolean\",\"value\":\"false\"},{\"key\":\"input\",\"type\":\"template\",\"value\":\"{{Event Name}}\"},{\"key\":\"fullMatch\",\"type\":\"boolean\",\"value\":\"true\"},{\"key\":\"replaceAfterMatch\",\"type\":\"boolean\",\"value\":\"true\"},{\"key\":\"ignoreCase\",\"type\":\"boolean\",\"value\":\"true\"},{\"key\":\"map\",\"list\":[{\"map\":[{\"key\":\"key\",\"type\":\"template\",\"value\":\"page_view\"},{\"key\":\"value\",\"type\":\"template\",\"value\":\"true\"}],\"type\":\"map\"},{\"map\":[{\"key\":\"key\",\"type\":\"template\",\"value\":\"view_item_list\"},{\"key\":\"value\",\"type\":\"template\",\"value\":\"true\"}],\"type\":\"map\"},{\"map\":[{\"key\":\"key\",\"type\":\"template\",\"value\":\"view_item\"},{\"key\":\"value\",\"type\":\"template\",\"value\":\"true\"}],\"type\":\"map\"},{\"map\":[{\"key\":\"key\",\"type\":\"template\",\"value\":\"add_to_cart\"},{\"key\":\"value\",\"type\":\"template\",\"value\":\"true\"}],\"type\":\"map\"},{\"map\":[{\"key\":\"key\",\"type\":\"template\",\"value\":\"purchase\"},{\"key\":\"value\",\"type\":\"template\",\"value\":\"true\"}],\"type\":\"map\"},{\"map\":[{\"key\":\"key\",\"type\":\"template\",\"value\":\"begin_checkout\"},{\"key\":\"value\",\"type\":\"template\",\"value\":\"true\"}],\"type\":\"map\"},{\"map\":[{\"key\":\"key\",\"type\":\"template\",\"value\":\"generate_lead\"},{\"key\":\"value\",\"type\":\"template\",\"value\":\"true\"}],\"type\":\"map\"}],\"type\":\"list\"}]"}
```

### Meta CAPI - Events (type: remm)
```json
{"name": "Meta CAPI - Events", "type": "remm", "parametersJson": "[{\"key\":\"setDefaultValue\",\"type\":\"boolean\",\"value\":\"true\"},{\"key\":\"input\",\"type\":\"template\",\"value\":\"{{Event Name}}\"},{\"key\":\"fullMatch\",\"type\":\"boolean\",\"value\":\"true\"},{\"key\":\"replaceAfterMatch\",\"type\":\"boolean\",\"value\":\"true\"},{\"key\":\"defaultValue\",\"type\":\"template\",\"value\":\"false\"},{\"key\":\"ignoreCase\",\"type\":\"boolean\",\"value\":\"true\"},{\"key\":\"map\",\"list\":[{\"map\":[{\"key\":\"key\",\"type\":\"template\",\"value\":\"page_view\"},{\"key\":\"value\",\"type\":\"template\",\"value\":\"true\"}],\"type\":\"map\"},{\"map\":[{\"key\":\"key\",\"type\":\"template\",\"value\":\"view_item\"},{\"key\":\"value\",\"type\":\"template\",\"value\":\"true\"}],\"type\":\"map\"},{\"map\":[{\"key\":\"key\",\"type\":\"template\",\"value\":\"add_to_cart\"},{\"key\":\"value\",\"type\":\"template\",\"value\":\"true\"}],\"type\":\"map\"},{\"map\":[{\"key\":\"key\",\"type\":\"template\",\"value\":\"begin_checkout\"},{\"key\":\"value\",\"type\":\"template\",\"value\":\"true\"}],\"type\":\"map\"},{\"map\":[{\"key\":\"key\",\"type\":\"template\",\"value\":\"add_payment_info\"},{\"key\":\"value\",\"type\":\"template\",\"value\":\"true\"}],\"type\":\"map\"},{\"map\":[{\"key\":\"key\",\"type\":\"template\",\"value\":\"purchase\"},{\"key\":\"value\",\"type\":\"template\",\"value\":\"true\"}],\"type\":\"map\"},{\"map\":[{\"key\":\"key\",\"type\":\"template\",\"value\":\"generate_lead\"},{\"key\":\"value\",\"type\":\"template\",\"value\":\"true\"}],\"type\":\"map\"}],\"type\":\"list\"}]"}
```

### Social Ads [Ecom+Leadgen] Events API (type: remm — pour TikTok/Snap/Pinterest)
Même structure que Meta CAPI - Events, avec le même mapping d'events.
```json
{"name": "Social Ads [Ecom+Leadgen] Events API", "type": "remm", "parametersJson": "[{\"key\":\"setDefaultValue\",\"type\":\"boolean\",\"value\":\"true\"},{\"key\":\"input\",\"type\":\"template\",\"value\":\"{{Event Name}}\"},{\"key\":\"fullMatch\",\"type\":\"boolean\",\"value\":\"true\"},{\"key\":\"replaceAfterMatch\",\"type\":\"boolean\",\"value\":\"true\"},{\"key\":\"defaultValue\",\"type\":\"template\",\"value\":\"false\"},{\"key\":\"ignoreCase\",\"type\":\"boolean\",\"value\":\"true\"},{\"key\":\"map\",\"list\":[{\"map\":[{\"key\":\"key\",\"type\":\"template\",\"value\":\"page_view\"},{\"key\":\"value\",\"type\":\"template\",\"value\":\"true\"}],\"type\":\"map\"},{\"map\":[{\"key\":\"key\",\"type\":\"template\",\"value\":\"view_item\"},{\"key\":\"value\",\"type\":\"template\",\"value\":\"true\"}],\"type\":\"map\"},{\"map\":[{\"key\":\"key\",\"type\":\"template\",\"value\":\"add_to_cart\"},{\"key\":\"value\",\"type\":\"template\",\"value\":\"true\"}],\"type\":\"map\"},{\"map\":[{\"key\":\"key\",\"type\":\"template\",\"value\":\"begin_checkout\"},{\"key\":\"value\",\"type\":\"template\",\"value\":\"true\"}],\"type\":\"map\"},{\"map\":[{\"key\":\"key\",\"type\":\"template\",\"value\":\"add_payment_info\"},{\"key\":\"value\",\"type\":\"template\",\"value\":\"true\"}],\"type\":\"map\"},{\"map\":[{\"key\":\"key\",\"type\":\"template\",\"value\":\"purchase\"},{\"key\":\"value\",\"type\":\"template\",\"value\":\"true\"}],\"type\":\"map\"},{\"map\":[{\"key\":\"key\",\"type\":\"template\",\"value\":\"generate_lead\"},{\"key\":\"value\",\"type\":\"template\",\"value\":\"true\"}],\"type\":\"map\"}],\"type\":\"list\"}]"}
```

## Built-in variables SS à activer

```json
["clientName", "eventName", "requestPath"]
```

# Tags — Définitions hardcodées

Les tags référencent les triggers par ID. Notation `TRIGGER:nom` = l'ID du trigger nommé "nom" créé précédemment. Maintenir un mapping nom→ID au fur et à mesure de la création des triggers.

## Tags CS — Base (tous les clients)

### GA4 - Configuration tag
- type: `googtag`
- firingTriggerIds: `["2147479553"]` (All Pages built-in)
- consentStatus: `needed`, consentTypes: `analytics_storage`
- parametersJson:
```json
[{"key":"tagId","type":"template","value":"{{GA4 - Measurement id}}"},{"key":"configSettingsVariable","type":"template","value":"{{GA4 - Configuration settings}}"},{"key":"configSettingsTable","type":"list","list":[{"type":"map","map":[{"key":"parameter","type":"template","value":"send_page_view"},{"key":"parameterValue","type":"template","value":"true"}]},{"type":"map","map":[{"key":"parameter","type":"template","value":"server_container_url"},{"key":"parameterValue","type":"template","value":"{{GA4 - Server container url}}"}]}]},{"key":"eventSettingsVariable","type":"template","value":"{{GA4 - Event settings - User Data}}"}]
```

### Conversion Linker
- type: `gclidw`
- firingTriggerIds: `["2147479553"]`
- parametersJson:
```json
[{"key":"enableCrossDomain","type":"boolean","value":"false"},{"key":"enableUrlPassthrough","type":"boolean","value":"true"},{"key":"enableCookieOverrides","type":"boolean","value":"false"}]
```

### GAds - Remarketing
- type: `sp`
- firingTriggerIds: `["2147479553"]`
- consentStatus: `needed`, consentTypes: `ad_storage`
- parametersJson:
```json
[{"key":"enableConversionLinker","type":"boolean","value":"true"},{"key":"enableDynamicRemarketing","type":"boolean","value":"false"},{"key":"dataLayerVariable","type":"template","value":"{{GA4 - Event settings - User Data}}"},{"key":"conversionId","type":"template","value":"{{ID_GAds}}"},{"key":"customParamsFormat","type":"template","value":"DATA_LAYER"},{"key":"rdp","type":"boolean","value":"false"}]
```

### Clarity (Custom HTML — personnaliser CLARITY_ID)
- type: `html`
- firingTriggerIds: `["2147479553"]`
- parametersJson:
```json
[{"key":"html","type":"template","value":"<script type=\"text/javascript\">\n    (function(c,l,a,r,i,t,y){\n        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};\n        t=l.createElement(r);t.async=1;t.src=\"https://www.clarity.ms/tag/\"+i;\n        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);\n    })(window, document, \"clarity\", \"script\", \"__CLARITY_ID__\");\n</script>"},{"key":"supportDocumentWrite","type":"boolean","value":"false"}]
```

## Tags CS — GA4 Events E-commerce

Pour chaque event ecommerce, le parametersJson suit ce pattern. Remplacer `EVENT_NAME` :

**Events avec page_location/page_referrer** (checkout funnel) : purchase, begin_checkout, add_shipping_info, add_payment_info, add_contact_info, add_address_info
```json
[{"key":"eventName","type":"template","value":"EVENT_NAME"},{"key":"sendEcommerceData","type":"boolean","value":"true"},{"key":"getEcommerceDataFrom","type":"template","value":"dataLayer"},{"key":"measurementIdOverride","type":"template","value":"{{GA4 - Measurement id}}"},{"key":"eventSettingsVariable","type":"template","value":"{{GA4 - Event settings - User Data}}"},{"key":"eventSettingsTable","type":"list","list":[{"type":"map","map":[{"key":"parameter","type":"template","value":"page_location"},{"key":"parameterValue","type":"template","value":"{{DLV - Page location}}"}]},{"type":"map","map":[{"key":"parameter","type":"template","value":"page_referrer"},{"key":"parameterValue","type":"template","value":"{{DLV - Page referrer}}"}]}]}]
```

**Events simples** (browse/cart) : add_to_cart, view_item, view_item_list, select_item, view_cart, remove_from_cart, sign_up, login, search
```json
[{"key":"eventName","type":"template","value":"EVENT_NAME"},{"key":"sendEcommerceData","type":"boolean","value":"true"},{"key":"getEcommerceDataFrom","type":"template","value":"dataLayer"},{"key":"measurementIdOverride","type":"template","value":"{{GA4 - Measurement id}}"},{"key":"eventSettingsVariable","type":"template","value":"{{GA4 - Event settings - User Data}}"}]
```

Tous les tags GA4 Event : consentStatus `needed`, consentTypes `analytics_storage`.

## Tags CS — GAds Conversion (personnaliser LABEL)

Pour chaque conversion GAds, remplacer `__CONV_LABEL__` :
- type: `awct`
- consentStatus: `needed`, consentTypes: `ad_storage`
```json
[{"key":"enableNewCustomerReporting","type":"boolean","value":"true"},{"key":"enableConversionLinker","type":"boolean","value":"true"},{"key":"newCustomerReportingDataSource","type":"template","value":"DATA_LAYER"},{"key":"enableProductReporting","type":"boolean","value":"false"},{"key":"enableShippingData","type":"boolean","value":"false"},{"key":"conversionId","type":"template","value":"{{ID_GAds}}"},{"key":"conversionLabel","type":"template","value":"__CONV_LABEL__"},{"key":"rdp","type":"boolean","value":"false"}]
```

## Tags CS — Lead Gen GA4

### GA4 - generate_lead
- Même pattern que GA4 Event simple, avec eventName `generate_lead`
- firingTriggerIds: `[TRIGGER:Page remerciement, TRIGGER:Event - form_submit]`

### GA4 - event_call
- Même pattern avec eventName `event_call`
- firingTriggerIds: `[TRIGGER:Event - call, TRIGGER:Call clic tel]`

## Tags SS — Natifs

### Google Analytics GA4
- type: `sgtmgaaw`
- firingTriggerIds: `[TRIGGER:GA4]`
```json
[{"key":"redactVisitorIp","type":"boolean","value":"true"},{"key":"epToIncludeDropdown","type":"template","value":"all"},{"key":"upToIncludeDropdown","type":"template","value":"all"},{"key":"measurementId","type":"template","value":"{{ID_Balise_Google}}"}]
```

### Conversion Linker SS
- type: `sgtmadscl`
- firingTriggerIds: `["2147479574"]` (All Pages SS built-in)
```json
[{"key":"enableLinkerParams","type":"boolean","value":"false"},{"key":"enableCookieOverrides","type":"boolean","value":"false"}]
```

### Google Ads User-provided Data Event
- type: `sgtmawud`
- firingTriggerIds: `["2147479574"]`
```json
[{"key":"conversionId","type":"template","value":"{{Balise GAds}}"}]
```

### Remarketing Google Ads SS
- type: `sgtmadsremarket`
- firingTriggerIds: `[TRIGGER:Dynamic remarketing events]`
```json
[{"key":"enableConversionLinker","type":"boolean","value":"true"},{"key":"enableDynamicRemarketing","type":"boolean","value":"true"},{"key":"enableUserId","type":"boolean","value":"false"},{"key":"conversionId","type":"template","value":"{{Balise GAds}}"},{"key":"customParamsFormat","type":"template","value":"EVENT_DATA"},{"key":"rdp","type":"boolean","value":"false"}]
```

### GAds Conversion SS (personnaliser LABEL)
- type: `sgtmadsct`
- firingTriggerIds: `[TRIGGER:GA4 + Purchase]` (ou autre selon conversion)
```json
[{"key":"enableNewCustomerReporting","type":"boolean","value":"true"},{"key":"enableConversionLinker","type":"boolean","value":"true"},{"key":"enableProductReporting","type":"boolean","value":"false"},{"key":"newCustomerDataSource","type":"template","value":"EVENT"},{"key":"conversionId","type":"template","value":"{{Balise GAds}}"},{"key":"conversionLabel","type":"template","value":"__CONV_LABEL__"},{"key":"rdp","type":"boolean","value":"false"}]
```

## Tags SS — CAPI (template custom)

### Meta - CAPI
- type: retourné par `create_template` (ex: `cvt_CONTAINERID_TEMPLATEID`)
- firingTriggerIds: `[TRIGGER:Meta conversion API]`
```json
[{"key":"pixelId","type":"template","value":"{{Meta Pixel ID}}"},{"key":"sendPixelRequest","type":"boolean","value":"true"},{"key":"accessToken","type":"template","value":"{{Meta Token}}"},{"key":"inheritEventName","type":"template","value":"inherit"}]
```

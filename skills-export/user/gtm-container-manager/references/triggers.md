# Triggers — Définitions hardcodées

## Triggers CS — E-commerce (customEvent)

Tous les triggers ecom suivent le même pattern. Créer un trigger par event name.

```json
[
  "purchase", "begin_checkout", "add_to_cart", "view_item", "view_item_list",
  "select_item", "view_cart", "remove_from_cart", "add_shipping_info",
  "add_payment_info", "add_contact_info", "add_address_info",
  "sign_up", "login", "search"
]
```

Pour chaque event `EVENT_NAME` dans la liste ci-dessus :
- name: `GA4 - Trigger - EVENT_NAME`
- type: `customEvent`
- customEventFilterJson: `[{"type":"equals","parameter":[{"key":"arg0","type":"template","value":"{{_event}}"},{"key":"arg1","type":"template","value":"EVENT_NAME"}]}]`

## Triggers CS — Lead Gen

### Page remerciement (à personnaliser)
- name: `Page remerciement`
- type: `pageview`
- filterJson: `[{"type":"equals","parameter":[{"key":"arg0","type":"template","value":"{{Page URL}}"},{"key":"arg1","type":"template","value":"__THANK_YOU_URL__"}]}]`

### Event form_submit
- name: `Event - form_submit`
- type: `customEvent`
- customEventFilterJson: `[{"type":"equals","parameter":[{"key":"arg0","type":"template","value":"{{_event}}"},{"key":"arg1","type":"template","value":"form_submit"}]}]`

### Event call
- name: `Event - call`
- type: `customEvent`
- customEventFilterJson: `[{"type":"equals","parameter":[{"key":"arg0","type":"template","value":"{{_event}}"},{"key":"arg1","type":"template","value":"call"}]}]`

### Call clic tel (à personnaliser)
- name: `Call clic tel`
- type: `linkClick`
- filterJson: `[{"type":"contains","parameter":[{"key":"arg0","type":"template","value":"{{Click URL}}"},{"key":"arg1","type":"template","value":"tel:__PHONE_NUMBER__"}]}]`

## Triggers SS

### GA4 (tous events GA4)
- name: `GA4`
- type: `always`
- filterJson: `[{"type":"equals","parameter":[{"key":"arg0","type":"template","value":"{{Client Name}}"},{"key":"arg1","type":"template","value":"GA4"}]}]`

### Dynamic remarketing events
- name: `Dynamic remarketing events`
- type: `always`
- filterJson: `[{"type":"equals","parameter":[{"key":"arg0","type":"template","value":"{{Client Name}}"},{"key":"arg1","type":"template","value":"GA4"}]},{"type":"equals","parameter":[{"key":"arg0","type":"template","value":"{{GAds - Dynamic remarketing event}}"},{"key":"arg1","type":"template","value":"true"}]}]`

### Meta conversion API
- name: `Meta conversion API`
- type: `always`
- filterJson: `[{"type":"equals","parameter":[{"key":"arg0","type":"template","value":"{{Client Name}}"},{"key":"arg1","type":"template","value":"GA4"}]},{"type":"equals","parameter":[{"key":"arg0","type":"template","value":"{{Meta CAPI - Events}}"},{"key":"arg1","type":"template","value":"true"}]}]`

### GA4 + Purchase
- name: `GA4 + Purchase`
- type: `always`
- filterJson: `[{"type":"equals","parameter":[{"key":"arg0","type":"template","value":"{{Client Name}}"},{"key":"arg1","type":"template","value":"GA4"}]},{"type":"equals","parameter":[{"key":"arg0","type":"template","value":"{{Event Name}}"},{"key":"arg1","type":"template","value":"purchase"}]}]`

### Social Ads Events API (pour TikTok, Snapchat, Pinterest)
- name: `Social Ads Events API`
- type: `always`
- filterJson: `[{"type":"equals","parameter":[{"key":"arg0","type":"template","value":"{{Client Name}}"},{"key":"arg1","type":"template","value":"GA4"}]},{"type":"equals","parameter":[{"key":"arg0","type":"template","value":"{{Social Ads [Ecom+Leadgen] Events API}}"},{"key":"arg1","type":"template","value":"true"}]}]`

# DataMinimization [principle] v1.0.0
Personal data must be 'adequate, relevant and limited to what is necessary in relation to the purposes for which it is processed' (GDPR Art. 5(1)(c)). Collect only fields the system actually needs for the stated purpose; delete data the moment its purpose is fulfilled.
> Every data field collected creates ongoing legal liability (breach notification, DSAR fulfillment, retention controls), engineering cost (encryption, access controls, audit), and ethical risk. Default to NOT collecting. When collection is necessary, document the lawful basis (Art. 6) and purpose (Art. 5(1)(b)) per field, and set a retention period after which the field is purged. Pre-collection data-protection impact assessments (DPIA, Art. 35) are required for high-risk processing.
domain: legal-compliance

## Attributed To
GDPR Article 5(1)(c) — Principle of data minimisation; ICO 'Data Minimisation' guidance; CCPA §1798.100(b) (analogous notice-at-collection).

## Applies To
- Sign-up forms — every optional field must justify itself; default to omitting birth-date, full address, phone unless required for the service
- Cookie banners — analytics cookies require consent; strictly necessary cookies do not
- Mobile app permissions — request location, camera, contacts only when feature is invoked, with clear purpose string
- B2B integrations — only the fields the customer actually filters on, never 'send us your full CRM'
- Analytics events — strip user-agent, IP, screen resolution unless aggregated; sample rather than store full traces
- Retention — every field has a TTL; delete-by-default jobs run nightly

## Counter Examples
- British Airways 2018 breach (£20M ICO fine, GDPR): 380K cards + CVVs exposed because card data was being processed in client-side scripts that didn't need to see it.
- Marriott 2018 (£18.4M ICO fine): retained passport numbers from a 2014 acquisition for years past business need; breach affected 339M records.
- TikTok 2023 (€345M Irish DPC fine): collecting child users' data without minimisation; default privacy settings exposed children's accounts publicly.
- Meta 2023 (€1.2B EU fine): Standard Contractual Clauses + Privacy Shield issues; minimisation cited in addition to transfer-mechanism issues.

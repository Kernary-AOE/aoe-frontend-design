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

## Sources

## Examples
- Apple App Store Privacy Nutrition Labels (2020+): apps must declare every category of data collected and its purpose; downstream pressure to collect less.
- Stripe: stores card details, but never the CVV after authorization completes (PCI-DSS prohibits CVV storage post-authorization).
- Signal: phone-number-as-identity, message bodies E2E-encrypted, no logs of recipients; subpoena response is reduced to 'account creation date'.
- Apple's 'Sign in with Apple' Hide My Email — relays to a developer-specific anonymous email, minimizing user's true email exposure.

## Relations
requires: @community/pattern-right-to-be-forgotten

## Source
- GDPR (Regulation EU 2016/679) — Article 5(1)(c) data minimisation; Article 25 data protection by design and by default; Article 35 DPIA
- EDPB Guidelines 4/2019 on Article 25 — 'Data Protection by Design and by Default'
- CCPA §1798.100(b) — businesses must notify consumers at or before collection of personal information
- Schrems II (CJEU C-311/18, 2020) — reinforces minimisation when transferring data internationally
- OWASP Privacy Risks 2021 — P3: 'Collection of unnecessary personal data'

## Requires
@community/pattern-right-to-be-forgotten

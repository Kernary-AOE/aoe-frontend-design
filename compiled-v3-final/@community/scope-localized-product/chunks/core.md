# LocalizedProduct [scope] v1.0.0
Defines applicability for atoms whose guidance applies only to product surfaces that ship to multiple locales (≥ 2 supported languages). Single-locale products may safely skip many of these atoms; localized products MUST satisfy them all.
domain: i18n

## Label
Localized Product Surfaces

## Preconditions
-
  - **Id**: ships-to-multiple-locales
  - **Check**: product surface displays content in ≥ 2 BCP 47 locale tags AND has an active translation pipeline (Lokalise, Phrase, Crowdin, etc.)
  - **On Fail**: Atom is not applicable. Single-locale products can defer i18n discipline; revisit when expanding.
-
  - **Id**: i18n-library-installed
  - **Check**: project depends on a translation framework (react-intl, FormatJS, LinguiJS, vue-i18n, angular/localize, i18next)
  - **On Fail**: Install an i18n library before applying these atoms — manual translation is not viable at scale.
-
  - **Id**: string-extraction-tooling
  - **Check**: build pipeline extracts translatable strings into a catalog file (messages.json, .ftl, .po) and validates ICU syntax + placeholder parity
  - **On Fail**: Set up extraction; lacking it, translators cannot ship without manual file syncing.

## Applies To
- Marketing pages with translated copy (multiple locale URLs / hreflang)
- Product UI with translated strings (signup, dashboard, settings)
- Customer-facing emails (welcome, receipts, password reset) — usually localized
- Error messages, validation messages, accessibility labels
- Native mobile apps with .strings/.xml localized resources
- Legal copy (Terms of Service, Privacy Policy) — typically NOT auto-translated; legal review required

## Out Of Scope
- Internal tools used only by English-speaking employees
- Developer documentation (commonly English-only by deliberate choice)
- Beta / experimental surfaces not yet exposed to non-English users
- Code identifiers, log messages, debug output — these stay in English

## Environment
- **Runtime**: Any (browser, Node.js, mobile native) — i18n is content-layer concern
- **Required Packages**:
  - intl-messageformat
  - react-intl OR equivalent
- **Optional Packages**:
  - pseudo-localization for testing

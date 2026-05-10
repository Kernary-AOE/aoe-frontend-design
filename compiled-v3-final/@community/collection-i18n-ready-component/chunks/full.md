# Internationalization-Ready Component Bundle [collection] v1.0.0
Atoms required to ship a component that works correctly in all locales — LTR + RTL, single + plural, English + CJK + Arabic. Most components shipped without explicit i18n review have at least 3 of these atoms violated; this collection makes the audit checklist explicit.

## Includes
- @community/type-locale-tag
- @community/transform-locale-fallback-chain
- @community/principle-no-string-concat
- @community/pattern-icu-message-format
- @community/rule-intl-api-locale-formatting
- @community/fact-bidi-direction
- @community/rule-rtl-directional-icons-flip
- @community/rule-cjk-line-break
- @community/term-leading
- @community/value-content-line-length
- @community/transform-relative-time-format
- @community/anti-pattern-flag-as-language

## Target
claude-code

## Entry Point
```
    When implementing a component that will render localized content, the bundle enforces:

    1. STRING SOURCING
       - Every user-visible string is keyed via the i18n catalog (no inline literals).
       - Concatenation is forbidden — single ICU MessageFormat templates with placeholders.
       - Plurals via ICU `{count, plural, ...}` — never `count === 1 ? 'X' : 'Xs'`.
       - Gender via ICU `{gender, select, ...}` when grammar requires.

    2. NUMBERS, DATES, CURRENCIES, LISTS
       - Use `Intl.NumberFormat`, `Intl.DateTimeFormat`, `Intl.RelativeTimeFormat`, `Intl.ListFormat`.
       - Currency display uses `style: 'currency'` with locale-aware symbol placement (€100 vs 100 €).
       - Never `arr.join(', ')` for translatable lists — use `Intl.ListFormat`.

    3. DIRECTION (RTL/LTR)
       - Honor `dir` attribute from root or container; do not hardcode direction in component CSS.
       - Use CSS logical properties (margin-inline-start, padding-block-end) NOT physical (left/right).
       - Mirror chevrons, sliders, and drawer-slide directions; do NOT mirror numbers, code, logos, media controls.

    4. TYPOGRAPHY
       - For CJK locales, set `line-break: strict` and `word-break: normal` (never break-all).
       - Allow user font-size scaling (rem-based sizes) — see @community/transform-px-to-rem.
       - Line length max 65ch for Latin, 30-40em for CJK.

    5. INPUT
       - Native `<input>` accepts all Unicode by default; do not strip non-ASCII.
       - Names: do not assume given/family order; allow single full-name field as default.
       - Phone: use libphonenumber for validation, NOT regex.
       - Address: country-specific forms — start with country selector, render fields accordingly.

    6. LOCALE SELECTION
       - Show language autonyms ('Français', '日本語'), NOT flags.
       - Default to `Accept-Language` (server) or `navigator.languages` (client).
       - Persist user override across sessions (cookie + profile).

    7. FALLBACKS
       - Missing translation: fall back via @community/transform-locale-fallback-chain.
       - Never display the raw key as user-facing text — fall back to default locale.
       - Log missing translations with severity=warn for translator backlog.
  
```

## Recommended Implementation
```
    Use FormatJS (react-intl) or LinguiJS for React; vue-i18n for Vue; angular/localize for Angular. All
    of these support ICU MessageFormat, BCP 47 locale resolution, and pluralization out of the box.

    For Next.js: pair with next-intl which handles SSR locale negotiation.

    Translation pipeline: extract → Lokalise/Phrase/Crowdin → import → validate (ICU syntax + placeholder parity) → ship.
  
```

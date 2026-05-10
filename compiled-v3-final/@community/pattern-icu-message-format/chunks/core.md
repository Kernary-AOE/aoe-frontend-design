# IcuMessageFormat [pattern] v1.0.0
ICU MessageFormat is the industry-standard syntax for parameterized translatable strings. It encodes plural rules, gender selection, ordinal numbers, dates, numbers, and nested choices in a single template that translators own end-to-end.
domain: i18n

## Body
```
    # ICU MessageFormat 2.0 — Canonical Patterns

    ## 1. Plural

    {count, plural,
      =0 {No items}
      one {# item}
      few {# items}
      many {# items}
      other {# items}
    }

    - Categories per CLDR: zero, one, two, few, many, other (plus =N exact match).
    - English uses {one, other}; Russian uses {one, few, many}; Arabic uses all six.
    - The `#` token is the formatted number (locale-aware grouping).

    ## 2. Select (Gender, Type)

    {gender, select,
      female {She liked your post}
      male {He liked your post}
      other {They liked your post}
    }

    - Use {gender, select} only when grammar requires; many languages can use a single neutral phrasing.

    ## 3. Selectordinal (1st, 2nd, 3rd)

    {place, selectordinal,
      one {#st place}
      two {#nd place}
      few {#rd place}
      other {#th place}
    }

    ## 4. Date / Number / Time

    Posted {date, date, medium}
    Total: {amount, number, ::currency/USD}
    Updated {time, time, short}

    ## 5. Nested

    {gender, select,
      female {{count, plural, one {She has # message} other {She has # messages}}}
      male   {{count, plural, one {He has # message}  other {He has # messages}}}
      other  {{count, plural, one {They have # message} other {They have # messages}}}
    }

    ## Library Implementations

    - JavaScript: `intl-messageformat` (FormatJS), `messageformat.js`
    - Java/Android: ICU4J, android.icu.text.MessageFormat
    - iOS: Foundation NSStringFormat with localized plural .stringsdict
    - Python: Babel
    - Go: golang.org/x/text/message

    ## Pipeline

    1. Source: `messages.en.ftl` (Fluent) or `messages.en.json` (FormatJS)
    2. Extract: tooling extracts strings with metadata (description, placeholders) for translators
    3. TMS: Lokalise / Phrase / Crowdin / Smartling — translators see context + ICU syntax
    4. Build: target locale files validated for ICU syntax + placeholder parity
    5. Runtime: format with current locale and parameters
  
```

## Use When
- Any user-facing string contains a count, name, gender, date, number, or list
- Product ships to ≥ 2 locales
- Even single-locale products: ICU forces correct grammar for English plurals

## Avoid When
- String is a fixed brand term that must not be translated (e.g. 'Stripe', 'GitHub') — hardcode literally
- String contains code identifiers, error codes, or developer-only debug output — these stay in English

## Counter Examples
- Sprintf-only: `printf('%s replied to %s', user, item)` — no plural support, no gender, fragile.
- JSX template literals: `<>{count} {count === 1 ? 'item' : 'items'}</>` — works for English only, breaks for every other plural-form language.

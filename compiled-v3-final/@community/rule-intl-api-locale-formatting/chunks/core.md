# IntlApiLocaleFormatting [rule] v1.0.0
Dates, times, numbers, currencies, and list conjunctions must be formatted using the JavaScript `Intl` API (Intl.DateTimeFormat, Intl.NumberFormat, Intl.ListFormat) rather than hard-coded locale-specific strings.
domain: frontend-design

## Applies To
@community/type-html-artifact

## Severity
warning

## Exceptions
-
  - **Case**: ISO 8601 machine-readable dates in attributes
  - **Allowed When**: datetime attributes always use ISO 8601 (YYYY-MM-DD); only the visible text needs Intl formatting.

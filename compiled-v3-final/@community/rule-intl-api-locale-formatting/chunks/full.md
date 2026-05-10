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

## Rationale
Hard-coded formats like '1,234.56' or 'Jan 5, 2026' are incorrect in many locales: German uses '1.234,56', many countries write dates as day-first. The Intl API handles these differences automatically and is available in all modern browsers.

## Applies To
@community/type-html-artifact

## Severity
warning

## Exceptions
-
  - **Case**: ISO 8601 machine-readable dates in attributes
  - **Allowed When**: datetime attributes always use ISO 8601 (YYYY-MM-DD); only the visible text needs Intl formatting.

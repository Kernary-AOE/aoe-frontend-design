# RelativeTimeFormat [transform] v1.0.0
Formats a date as a localized relative time string ('5 minutes ago', 'in 2 days', 'last month') using the platform `Intl.RelativeTimeFormat` API. Replaces hand-rolled English-only date utilities with locale-aware formatting that handles plurals, gender, and grammatical agreement automatically.
domain: i18n

signature: (date: Date, now: Date, locale: string) -> string

## Pure
true

## Body
```
    /**
     * Format a date as a localized relative time string.
     *
     * Uses Intl.RelativeTimeFormat (built into Node 12+, all modern browsers).
     */
    function relativeTimeFormat(date, now = new Date(), locale = 'en') {
      if (!(date instanceof Date) || isNaN(date.getTime())) {
        throw new TypeError('date must be a valid Date');
      }
      if (!(now instanceof Date) || isNaN(now.getTime())) {
        throw new TypeError('now must be a valid Date');
      }

      const rtf = new Intl.RelativeTimeFormat(locale, {
        numeric: 'auto',     // 'yesterday' instead of '1 day ago'
        style: 'long',       // 'in 5 minutes' (vs 'short' = 'in 5 min', 'narrow' = 'in 5m')
      });

      const diffMs = date.getTime() - now.getTime();
      const diffSec = Math.round(diffMs / 1000);
      const absSec = Math.abs(diffSec);

      // Choose the largest unit that gives a value >= 1
      if (absSec < 45) return rtf.format(diffSec, 'second');
      if (absSec < 3600) return rtf.format(Math.round(diffSec / 60), 'minute');
      if (absSec < 86400) return rtf.format(Math.round(diffSec / 3600), 'hour');
      if (absSec < 604800) return rtf.format(Math.round(diffSec / 86400), 'day');
      if (absSec < 2592000) return rtf.format(Math.round(diffSec / 604800), 'week');
      if (absSec < 31536000) return rtf.format(Math.round(diffSec / 2592000), 'month');
      return rtf.format(Math.round(diffSec / 31536000), 'year');
    }
  
```

## Inverse
null

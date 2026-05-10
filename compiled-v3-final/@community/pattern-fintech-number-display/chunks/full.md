# FintechNumberDisplay [pattern] v1.0.0
Typography, formatting, and hierarchy rules for displaying financial amounts, KPI metrics, and change indicators in fintech and SaaS dashboards — where numbers are the primary signal and must command visual weight and communicate precision.
domain: frontend-design

## Label
Fintech Number Display Patterns

## Critical Rules
- NEVER use a body/sans font for hero amounts. Financial numbers demand a display or serif typeface (Playfair Display, DM Serif Display).
- NEVER use gradient text on amounts. Reserve gradients for decorative elements — not the data itself.
- ALWAYS use font-variant-numeric: tabular-nums on all financial columns so digit changes don't shift layout.
- ALWAYS pair color with icon for change direction — never rely on color alone (fails color-blind users).

## Font Size Scale
- **Hero Balance**: clamp(2.5rem, 6vw, 4rem) — display/serif
- **Section Total**: 1.875rem (30px) — display/serif
- **Card Metric**: 1.5rem (24px) — display or semi-bold sans
- **Table Row**: 0.875rem (14px) — sans, tabular-nums
- **Caption**: 0.75rem (12px) — muted sans

## Change Indicators
```
    .change-indicator.positive {
      background-color: hsl(142 71% 45% / 0.12);
      color: hsl(142 71% 30%);
    }
    .change-indicator.negative {
      background-color: hsl(0 84% 60% / 0.12);
      color: hsl(0 72% 38%);
    }
    /* Dark mode: lighten text, keep bg subtle */
    @media (prefers-color-scheme: dark) {
      .change-indicator.positive { color: hsl(142 71% 60%); }
      .change-indicator.negative { color: hsl(0 84% 70%); }
    }
  
```

## Currency Formatting
```
    // Standard: always show symbol, 2 decimal places
    const formatAmount = (value, currency = 'USD') =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    // → "$22,933.00"

    // Compact: abbreviate above 10,000 in display contexts
    const formatCompact = (value) => {
      if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
      if (value >= 1_000)     return `$${(value / 1_000).toFixed(1)}K`;
      return formatAmount(value);
    };
    // → "$1.9M", "$48.2K", "$933.00"
  
```

## Formatting Table
- **Hero Balance**:
  - **Format**: Full 2 decimals
  - **Example**: $22,933.00
- **Stat Card**:
  - **Format**: Compact K/M
  - **Example**: $48.2K
- **Table Row**:
  - **Format**: Full 2 decimals
  - **Example**: $1,200.00
- **Chart Tooltip**:
  - **Format**: Full 2 decimals
  - **Example**: $22,933.00
- **Marketing Copy**:
  - **Format**: Compact + round
  - **Example**: $50M+

## Visual Hierarchy Rule
The most important metric must be 3–4× larger than supporting metrics. Never let secondary numbers compete visually with the primary number.

## Anti Patterns
- Monospace font for amounts — reads as 'code' or 'terminal', devalues the number
- Raw cents without formatting — 193456 is unreadable
- Gradient text on amounts — reduces legibility, conflicts with change-indicator colors
- Color-only change direction — fails color-blind users

## Sources

## Label
Fintech Number Display Patterns

## Critical Rules
- NEVER use a body/sans font for hero amounts. Financial numbers demand a display or serif typeface (Playfair Display, DM Serif Display).
- NEVER use gradient text on amounts. Reserve gradients for decorative elements — not the data itself.
- ALWAYS use font-variant-numeric: tabular-nums on all financial columns so digit changes don't shift layout.
- ALWAYS pair color with icon for change direction — never rely on color alone (fails color-blind users).

## Font Size Scale
- **Hero Balance**: clamp(2.5rem, 6vw, 4rem) — display/serif
- **Section Total**: 1.875rem (30px) — display/serif
- **Card Metric**: 1.5rem (24px) — display or semi-bold sans
- **Table Row**: 0.875rem (14px) — sans, tabular-nums
- **Caption**: 0.75rem (12px) — muted sans

## Change Indicators
```
    .change-indicator.positive {
      background-color: hsl(142 71% 45% / 0.12);
      color: hsl(142 71% 30%);
    }
    .change-indicator.negative {
      background-color: hsl(0 84% 60% / 0.12);
      color: hsl(0 72% 38%);
    }
    /* Dark mode: lighten text, keep bg subtle */
    @media (prefers-color-scheme: dark) {
      .change-indicator.positive { color: hsl(142 71% 60%); }
      .change-indicator.negative { color: hsl(0 84% 70%); }
    }
  
```

## Currency Formatting
```
    // Standard: always show symbol, 2 decimal places
    const formatAmount = (value, currency = 'USD') =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    // → "$22,933.00"

    // Compact: abbreviate above 10,000 in display contexts
    const formatCompact = (value) => {
      if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
      if (value >= 1_000)     return `$${(value / 1_000).toFixed(1)}K`;
      return formatAmount(value);
    };
    // → "$1.9M", "$48.2K", "$933.00"
  
```

## Formatting Table
- **Hero Balance**:
  - **Format**: Full 2 decimals
  - **Example**: $22,933.00
- **Stat Card**:
  - **Format**: Compact K/M
  - **Example**: $48.2K
- **Table Row**:
  - **Format**: Full 2 decimals
  - **Example**: $1,200.00
- **Chart Tooltip**:
  - **Format**: Full 2 decimals
  - **Example**: $22,933.00
- **Marketing Copy**:
  - **Format**: Compact + round
  - **Example**: $50M+

## Visual Hierarchy Rule
The most important metric must be 3–4× larger than supporting metrics. Never let secondary numbers compete visually with the primary number.

## Anti Patterns
- Monospace font for amounts — reads as 'code' or 'terminal', devalues the number
- Raw cents without formatting — 193456 is unreadable
- Gradient text on amounts — reduces legibility, conflicts with change-indicator colors
- Color-only change direction — fails color-blind users

# FintechNumberDisplay [fact] v1.0.0
Financial number display requires distinct typographic treatment at every scale: hero balances at 3–4rem with weight 700 and tabular lining numerals (`font-variant-numeric: tabular-nums lining-nums`), section totals at 2rem, card metrics at 1.5rem, and table rows at 0.875rem — each tier differentiating the most important metric from supporting data.
> Fintech UI typography follows a strict numeric hierarchy: the primary metric (account balance, total transaction, price) must be 3–4× larger than the smallest supporting metric; every numeric context must use tabular-nums + lining-nums to prevent column jitter; color + weight must reinforce size hierarchy (hero: foreground + bold; supporting: foreground + regular; metadata: muted-foreground + regular).
domain: frontend-design

## Confidence
strong

## Applies To
- account balance displays
- price / amount typography
- dashboard KPI cards
- data tables with financial figures
- transaction history lists

## Quantitative
- **Hero Balance**: clamp(2.5rem, 5vw, 4rem), font-weight: 700, color: foreground
- **Section Total**: clamp(1.5rem, 3vw, 2.5rem), font-weight: 600, color: foreground
- **Card Metric**: clamp(1.25rem, 2vw, 1.5rem), font-weight: 600, color: foreground
- **Table Row**: 0.875rem, font-weight: 400, color: foreground
- **Caption Label**: 0.75rem, font-weight: 400, color: muted-foreground
- **Numeric Feature**: font-variant-numeric: tabular-nums lining-nums
- **Negative Value**: color: red-semantic-token, NOT just font-weight change
- **Positive Delta**: color: green-semantic-token, with directional arrow glyph

## Counter Conditions
- Crypto / trading UIs may show 8+ decimal places — compress with abbreviated notation (1.23456 BTC → 1.23 BTC) to maintain hierarchy.
- Dense data tables may reduce hero metric size to fit viewport — use min() / clamp() to prevent overflow.
- Dark mode requires adjusting numeric colors: red-400 (light) → red-300 (dark) to maintain 4.5:1 contrast on dark backgrounds.

## Sources

## Confidence
strong

## Source
- Land-book gallery analysis of 156 fintech screenshots
- Goldsand banking UI replica decomposition
- Stripe, Mercury, Brex dashboard typographic analysis

## Applies To
- account balance displays
- price / amount typography
- dashboard KPI cards
- data tables with financial figures
- transaction history lists

## Quantitative
- **Hero Balance**: clamp(2.5rem, 5vw, 4rem), font-weight: 700, color: foreground
- **Section Total**: clamp(1.5rem, 3vw, 2.5rem), font-weight: 600, color: foreground
- **Card Metric**: clamp(1.25rem, 2vw, 1.5rem), font-weight: 600, color: foreground
- **Table Row**: 0.875rem, font-weight: 400, color: foreground
- **Caption Label**: 0.75rem, font-weight: 400, color: muted-foreground
- **Numeric Feature**: font-variant-numeric: tabular-nums lining-nums
- **Negative Value**: color: red-semantic-token, NOT just font-weight change
- **Positive Delta**: color: green-semantic-token, with directional arrow glyph

## Counter Conditions
- Crypto / trading UIs may show 8+ decimal places — compress with abbreviated notation (1.23456 BTC → 1.23 BTC) to maintain hierarchy.
- Dense data tables may reduce hero metric size to fit viewport — use min() / clamp() to prevent overflow.
- Dark mode requires adjusting numeric colors: red-400 (light) → red-300 (dark) to maintain 4.5:1 contrast on dark backgrounds.

## Supplies To
- @community/pattern-fintech-number-display

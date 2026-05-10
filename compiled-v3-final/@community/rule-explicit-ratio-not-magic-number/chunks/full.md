# ExplicitRatioNotMagicNumber [rule] v1.0.0
> Spacing, sizing, and typographic scale values must derive from an explicit ratio (1.25, 1.333, 1.5, or a defined 4px/8px base grid) — not from magic numbers chosen ad-hoc. Every value must have a traceable derivation.
domain: frontend-design

## Severity
warning

## Applies When
Setting any spacing, typography scale, or container sizing value.

## Verify By
For any numeric value, name the ratio or grid step it derives from. A value with no traceable derivation is a magic number and must be replaced.

## Anti Pattern
Magic numbers — values like margin: 13px, padding: 22px, font-size: 17px — appear when values are chosen by eye without a scale. They create visual inconsistency that only the original author can debug.

## Use Instead
- 4px base grid: values are multiples of 4 (4, 8, 12, 16, 24, 32, 48, 64, 96)
- Typographic scale: derive font sizes from a ratio — 1.25 (major third) or 1.333 (perfect fourth)
- Named token steps: --space-2 = 8px, --space-3 = 12px, not --space-custom-13

## Severity
warning

## Applies When
Setting any spacing, typography scale, or container sizing value.

## Verify By
For any numeric value, name the ratio or grid step it derives from. A value with no traceable derivation is a magic number and must be replaced.

## Anti Pattern
Magic numbers — values like margin: 13px, padding: 22px, font-size: 17px — appear when values are chosen by eye without a scale. They create visual inconsistency that only the original author can debug.

## Use Instead
- 4px base grid: values are multiples of 4 (4, 8, 12, 16, 24, 32, 48, 64, 96)
- Typographic scale: derive font sizes from a ratio — 1.25 (major third) or 1.333 (perfect fourth)
- Named token steps: --space-2 = 8px, --space-3 = 12px, not --space-custom-13

# ColorTokenSemanticNaming [fact] v1.0.0
Semantic color tokens (--primary, --accent, --text-muted) are more durable than primitive-named tokens (--blue-500) because they survive brand changes, dark-mode mirroring, and theme variation without rename.
> Color tokens consumed by components should be named for their role (--primary, --accent, --bg, --text), not their hue (--blue-500, --green-700) — semantic naming insulates components from brand changes and lets a single token point to different primitives across themes.

## Confidence
strong

## Applies To
- component-level color references
- dark-mode / high-contrast theme switching
- white-label / multi-tenant theming
- rebrand / palette refresh refactors

## Counter Conditions
- The primitive layer itself (--blue-500) is correctly hue-named — semantic naming applies to the consumer-facing layer.
- Categorical chart palettes use indexed names (--chart-1, --chart-2) which is also semantic in a categorical sense.
- Status colors (success/warning/danger) are semantic-by-meaning even though they correlate with hue.

## Sources

## Confidence
strong

## Source
- Nathan Curtis, 'Naming Tokens in Design Systems' (EightShapes, 2020)
- Radix Colors documentation — semantic scale aliases
- Tailwind UI guide on theming with semantic tokens

## Applies To
- component-level color references
- dark-mode / high-contrast theme switching
- white-label / multi-tenant theming
- rebrand / palette refresh refactors

## Counter Conditions
- The primitive layer itself (--blue-500) is correctly hue-named — semantic naming applies to the consumer-facing layer.
- Categorical chart palettes use indexed names (--chart-1, --chart-2) which is also semantic in a categorical sense.
- Status colors (success/warning/danger) are semantic-by-meaning even though they correlate with hue.

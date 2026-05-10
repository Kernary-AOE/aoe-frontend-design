# DesignTokenCascade [fact] v1.0.0
Design tokens function best when organised in a three-tier cascade: primitive tokens (raw values), semantic tokens (named roles), and component tokens (component-specific aliases).
> Design tokens cascade through three tiers — primitives (e.g., --blue-500: oklch(62% 0.18 250)), semantics (--primary: var(--blue-500)), and component tokens (--button-bg: var(--primary)) — and consumers should reference the highest semantically-meaningful tier available for their use case.

## Confidence
strong

## Applies To
- design-token system architecture
- theming strategy (light/dark, brand variants)
- component API: which token tier a prop maps to
- token rename refactors (semantic insulates primitives from breaking changes)

## Quantitative
- **Tiers**: 3
- **Canonical Order**: primitive → semantic → component

## Counter Conditions
- Very small systems (< 30 components) may collapse to two tiers (primitive + semantic) without harm.
- Components that are primitives themselves (Box, Stack) may bypass component tokens.
- When variant explosion occurs at the component-token tier, it usually means the semantic tier is under-specified.

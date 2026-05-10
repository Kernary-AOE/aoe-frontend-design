# DesignTokenCascade [fact] v1.0.0
Design tokens function best when organised in a three-tier cascade: primitive tokens (raw values), semantic tokens (named roles), and component tokens (component-specific aliases).
> Design tokens cascade through three tiers — primitives (e.g., --blue-500: oklch(62% 0.18 250)), semantics (--primary: var(--blue-500)), and component tokens (--button-bg: var(--primary)) — and consumers should reference the highest semantically-meaningful tier available for their use case.

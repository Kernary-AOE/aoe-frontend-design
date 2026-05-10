# SharedVisualLanguage [principle] v1.0.0
Color tokens, typography roles, spacing scale, and iconography must come from a shared design token system used consistently across all platforms, so the product feels visually unified even when interaction patterns differ per platform.
domain: frontend-design

## Token Categories
- **Color**:
  - Brand: --color-brand-500 (primary), --color-brand-600 (hover)
  - Semantic: --color-error, --color-success, --color-warning, --color-info
  - Neutral: --color-neutral-0 through --color-neutral-1000
  - Surface: --color-surface-base, --color-surface-raised, --color-surface-overlay
- **Typography**:
  - Roles: display, heading-l, heading-m, heading-s, body-l, body-m, body-s, caption, label
  - Each role has: font-family, font-size, line-height, font-weight, letter-spacing
- **Spacing**:
  - Base-4 or base-8 scale: 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96
- **Iconography**:
  - Single icon library used across all platforms (e.g. Lucide, Phosphor)
  - Platform-specific icons (iOS SF Symbols, Android Material Icons) are additive, not replacements

## Implementation
- Web: CSS custom properties from a generated token file.
- iOS: Swift constants or ColorAsset catalog generated from the same source.
- Android: res/values/colors.xml generated from the same source.
- Source of truth: a platform-agnostic JSON/YAML token file (Style Dictionary or equivalent).

## Rationale
Without shared tokens, platform teams drift apart over time: slightly different blues, different border radii, different type sizes for 'heading'. The product loses visual coherence. Shared tokens maintain coherence while allowing platform-specific rendering.

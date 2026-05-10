# ColorTokenShape [type] v1.0.0
Schema for a color token in a design system. A color token is more than its raw value — it carries semantic meaning, mode variants (light/dark), accessibility metadata (computed contrast), and provenance (primitive vs semantic vs component-scoped). This shape is compatible with the W3C Design Tokens Community Group format draft.
domain: design-system

## Fields
- **Name**:
  - **Type**: string
  - **Format**: kebab-case dot-path, e.g. 'color.surface.raised' or 'color.text.primary'
  - **Required**: true
- **Type**:
  - **Type**: literal
  - **Value**: color
  - **Required**: true
- **Value**:
  - **Type**: ColorValue
  - **Description**: Raw color value. Prefer oklch() for new tokens; hex/rgb accepted for legacy
  - **Required**: true
- **Modes**:
  - **Type**: object
  - **Description**: Per-mode variants keyed by color scheme
  - **Shape**: { light: ColorValue, dark: ColorValue, high-contrast?: ColorValue }
  - **Required**: false
- **Group**:
  - **Type**: "primitive" | "semantic" | "componen
  - **Description**: primitive = raw palette ('blue.500'); semantic = role-named ('text.primary'); component = scoped to one component ('button.primary.bg')
  - **Required**: true
- **Description**:
  - **Type**: string
  - **Description**: Human-readable intent: 'Primary text color on default surface'
  - **Required**: false
- **Deprecated**:
  - **Type**: boolean | { since: string, replacement: string, removeIn: string }
  - **Default**: false
  - **Required**: false
- **A11y**:
  - **Type**: object
  - **Shape**: { contrastVs?: Record<string, number>, wcagAA?: boolean, wcagAAA?: boolean }
  - **Description**: Computed contrast ratios against other named tokens; AA = ≥4.5:1, AAA = ≥7:1
  - **Required**: false
- **Aliases**:
  - **Type**: string[]
  - **Description**: Other token paths that resolve to this token (alias chain)
  - **Required**: false

## Invariants
- name must be unique within a token set
- value MUST be parseable as a CSS color string (oklch, rgb, hsl, hex, color(), system colors)
- if modes.dark is set, modes.light MUST also be set (no dark-only tokens without a light fallback)
- deprecated tokens with `removeIn` must be retained until that version; warning in build output
- semantic tokens reference primitives; component tokens reference semantics. No semantic→primitive→hex direct chains.

## Example
- **Name**: color.text.primary
- **Type**: color
- **Group**: semantic
- **Description**: Primary text color on default surface; meets WCAG AA on color.surface.default
- **Value**: oklch(20% 0.02 258)
- **Modes**:
  - **Light**: oklch(20% 0.02 258)
  - **Dark**: oklch(95% 0.01 258)
- **A11y**:
  - **ContrastVs**:
    - **Color.Surface.Default**: 16.4
  - **WcagAA**: true
  - **WcagAAA**: true

## Fields
- **Name**:
  - **Type**: string
  - **Format**: kebab-case dot-path, e.g. 'color.surface.raised' or 'color.text.primary'
  - **Required**: true
- **Type**:
  - **Type**: literal
  - **Value**: color
  - **Required**: true
- **Value**:
  - **Type**: ColorValue
  - **Description**: Raw color value. Prefer oklch() for new tokens; hex/rgb accepted for legacy
  - **Required**: true
- **Modes**:
  - **Type**: object
  - **Description**: Per-mode variants keyed by color scheme
  - **Shape**: { light: ColorValue, dark: ColorValue, high-contrast?: ColorValue }
  - **Required**: false
- **Group**:
  - **Type**: "primitive" | "semantic" | "componen
  - **Description**: primitive = raw palette ('blue.500'); semantic = role-named ('text.primary'); component = scoped to one component ('button.primary.bg')
  - **Required**: true
- **Description**:
  - **Type**: string
  - **Description**: Human-readable intent: 'Primary text color on default surface'
  - **Required**: false
- **Deprecated**:
  - **Type**: boolean | { since: string, replacement: string, removeIn: string }
  - **Default**: false
  - **Required**: false
- **A11y**:
  - **Type**: object
  - **Shape**: { contrastVs?: Record<string, number>, wcagAA?: boolean, wcagAAA?: boolean }
  - **Description**: Computed contrast ratios against other named tokens; AA = ≥4.5:1, AAA = ≥7:1
  - **Required**: false
- **Aliases**:
  - **Type**: string[]
  - **Description**: Other token paths that resolve to this token (alias chain)
  - **Required**: false

## Invariants
- name must be unique within a token set
- value MUST be parseable as a CSS color string (oklch, rgb, hsl, hex, color(), system colors)
- if modes.dark is set, modes.light MUST also be set (no dark-only tokens without a light fallback)
- deprecated tokens with `removeIn` must be retained until that version; warning in build output
- semantic tokens reference primitives; component tokens reference semantics. No semantic→primitive→hex direct chains.

## Example
- **Name**: color.text.primary
- **Type**: color
- **Group**: semantic
- **Description**: Primary text color on default surface; meets WCAG AA on color.surface.default
- **Value**: oklch(20% 0.02 258)
- **Modes**:
  - **Light**: oklch(20% 0.02 258)
  - **Dark**: oklch(95% 0.01 258)
- **A11y**:
  - **ContrastVs**:
    - **Color.Surface.Default**: 16.4
  - **WcagAA**: true
  - **WcagAAA**: true

# DesignToken [type] v1.0.0
Schema for a design token — a named, typed design decision that is stored as data and consumed by design tools and code. Based on the W3C Design Tokens Community Group format (draft).
domain: design-system

## Fields
- **Name**:
  - **Type**: string
  - **Format**: kebab-case path, e.g. 'color.brand.500' or 'spacing.base'
  - **Required**: true
- **Value**:
  - **Type**: string | number | object
  - **Description**: The raw value. For colors: oklch() or hex. For dimensions: rem/px. For composites: object.
  - **Required**: true
- **Type**:
  - **Type**: "color" | "dimension" | "font-family" | "font-weight" | "duration" | "cubic-bezier" | "number" | "composit
  - **Required**: true
- **Description**:
  - **Type**: string
  - **Description**: Human-readable intent: 'Primary brand color at 500 lightness step'
  - **Required**: false
- **Group**:
  - **Type**: string
  - **Description**: Token category for organizational grouping: 'primitive', 'semantic', 'component'
  - **Required**: false
- **Deprecated**:
  - **Type**: boolean
  - **Default**: false
  - **Required**: false
- **Aliases**:
  - **Type**: string[]
  - **Description**: Token paths that resolve to this token (for aliasing/theming)
  - **Required**: false

## Invariants
- name must be unique within a token set
- color type tokens must be parseable as valid CSS color strings
- dimension type tokens must include a unit (px, rem, em, %)

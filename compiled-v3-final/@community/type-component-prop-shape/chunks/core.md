# ComponentPropShape [type] v1.0.0
Schema for a design-system component's prop API. Captures variant + size + state dimensions, polymorphic 'as' support, accessibility props, and slot composition. Acts as a template that every primitive component (Button, Input, Card, Badge) instantiates.
domain: design-system

## Fields
- **Variant**:
  - **Type**: string
  - **Description**: Visual variant — primary, secondary, ghost, destructive (see @community/taxonomy-cta-styles for buttons)
  - **Required**: false
- **Size**:
  - **Type**: 'sm' | 'md' | 'lg' | 'xl'
  - **Description**: Size scale — typically 4 steps; tied to typography and spacing scales
  - **Required**: false
- **As**:
  - **Type**: ElementType | string
  - **Description**: Polymorphic component prop — render as <a>, <button>, <RouterLink>. Allows correct semantics without per-component variants.
  - **Required**: false
- **Children**:
  - **Type**: ReactNode
  - **Description**: Slot content; for leaf components, must be plain text or icon
  - **Required**: false
- **Aria Label**:
  - **Type**: string | undefined
  - **Description**: Required when component has no visible text label (icon buttons, avatars)
  - **Required**: false
- **Disabled**:
  - **Type**: boolean
  - **Default**: false
  - **Required**: false
- **Loading**:
  - **Type**: boolean
  - **Default**: false
  - **Description**: Composite prop — disables interaction AND shows spinner; aria-busy=true is set
  - **Required**: false
- **Full Width**:
  - **Type**: boolean
  - **Default**: false
  - **Description**: Stretch to container width — common on mobile primary actions
  - **Required**: false
- **Icon Leading**:
  - **Type**: ReactNode | undefined
  - **Description**: Optional icon before the label
  - **Required**: false
- **Icon Trailing**:
  - **Type**: ReactNode | undefined
  - **Description**: Optional icon after the label
  - **Required**: false
- **On Click**:
  - **Type**: (e: MouseEvent) => void
  - **Description**: Click handler
  - **Required**: false
- **Data Testid**:
  - **Type**: string | undefined
  - **Description**: Optional test id for E2E tooling. Component should NOT use this as a styling hook.
  - **Required**: false

## Invariants
- Every visual variant MUST satisfy WCAG AA contrast in default, hover, focus, active, and disabled states
- When `loading` is true, the component MUST set aria-busy='true' and disable pointer events
- When `aria-label` is omitted, the component MUST have a visible text label or fall back to a sensible default (e.g. icon name)
- Polymorphic `as` prop MUST forward all native element props (a-tag href, button-type, etc.) without losing types — use Radix's PolymorphicComponentProps or similar
- Disabled state MUST be communicated via the native disabled attribute (form controls) OR aria-disabled (custom widgets) — NEVER via pointer-events:none alone
- Size and variant tokens MUST resolve to design-system tokens (@community/type-design-token), never hardcoded values

## Example
- **Name**: Button
- **Props**:
  - **Variant**:
    - **Type**: 'primary' | 'secondary' | 'ghost' | 'destructive'
    - **Default**: 'primary'
  - **Size**:
    - **Type**: 'sm' | 'md' | 'lg'
    - **Default**: 'md'
  - **As**:
    - **Type**: 'button' | 'a'
    - **Default**: 'button'
  - **Icon Leading**:
    - **Type**: ReactNode
    - **Required**: false
  - **Loading**:
    - **Type**: boolean
    - **Default**: false
  - **Full Width**:
    - **Type**: boolean
    - **Default**: false
  - **Aria Label**:
    - **Type**: string
    - **Required When**: no children text

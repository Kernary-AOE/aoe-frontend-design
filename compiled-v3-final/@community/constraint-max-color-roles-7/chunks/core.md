# MaxColorRoles7 [constraint] v1.0.0
A single product-level design system should expose at most 7 semantic color roles: bg, surface, border, text, text-muted, primary, accent. Additional roles (success/warning/danger/info) belong to a separate `status` namespace and don't count toward the 7.
domain: visual-design

## Target
- semantic color tokens in a single design system
- named role layer (not the primitive ramp layer)

## Severity
medium

## Values
-
  - **Role**: bg
  - **Purpose**: page background
-
  - **Role**: surface
  - **Purpose**: elevated card / panel
-
  - **Role**: border
  - **Purpose**: hairline / divider / outline
-
  - **Role**: text
  - **Purpose**: default foreground
-
  - **Role**: text-muted
  - **Purpose**: secondary / tertiary text
-
  - **Role**: primary
  - **Purpose**: primary brand action
-
  - **Role**: accent
  - **Purpose**: secondary highlight (sparingly)

## Exceptions
- Status namespace: `status-success`, `status-warning`, `status-danger`, `status-info` — separate, additive.
- Data-viz namespace: categorical encoding palettes are independent.
- Multi-tenant white-label products may have per-tenant duplicates of the 7 (still 7 per tenant).

## Approved Alternatives
- Compose surfaces from primitives (e.g., `bg` + `border` for a sunken well) instead of adding `surface-sunken`.
- Use opacity layers / color-mix() to derive variations from the 7 roles.
- Promote a role only when 3+ components require it AND no existing role fits.

## Enforcement
Design-token review: count role-layer tokens. Lint warns when role-layer count exceeds 7 outside the status / data-viz namespaces.

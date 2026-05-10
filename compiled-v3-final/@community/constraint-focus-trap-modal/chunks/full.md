# FocusTrapModal [constraint] v1.0.0
Every modal dialog must implement a focus trap: keyboard focus must be sent into the modal on open, cycle within the modal on Tab / Shift+Tab, and return to the triggering element on close.
domain: accessibility

## Target
- modal dialogs
- blocking drawers
- any aria-modal=true overlay

## Severity
critical

## Values
-
  - **Required**: initial focus moves into the modal (first focusable element or named initial focus target)
-
  - **Required**: Tab from the last focusable element returns to the first inside the modal
-
  - **Required**: Shift+Tab from the first focusable element returns to the last inside the modal
-
  - **Required**: Escape key closes the modal (unless explicitly forbidden by the dialog semantics)
-
  - **Required**: focus restored to the triggering element on close
-
  - **Required**: aria-modal='true' and role='dialog' on the dialog container
-
  - **Required**: aria-labelledby pointing to the dialog title

## Exceptions
- Non-modal dialogs (e.g., docked side panels with role='dialog' but no aria-modal) — must not trap.
- Tooltips and popovers — focus trap forbidden, follow popover semantics instead.

## Approved Alternatives
- Use Radix Dialog (focus-trap-react under the hood).
- Use React Aria useDialog + useModalOverlay hooks.
- Use the native <dialog> element with .showModal() — built-in focus trap.
- Headless UI <Dialog> for React/Vue.

## Enforcement
Storybook a11y addon. Cypress test per modal: open, Tab repeatedly, assert focus stays inside; press Escape, assert focus returns to trigger.

## Rationale
Without a focus trap, Tab key escapes into the underlying page content — which is visually obscured but still focusable. Screen-reader and keyboard users get ejected to invisible controls and lose context. WCAG 2.1.2 (No Keyboard Trap) sounds contradictory but it specifically permits modal traps as long as Escape / standard close exists. Native <dialog showModal()> and Radix Dialog implement this correctly; hand-rolled overlays almost never do.

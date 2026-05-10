# Accessible Modal / Dialog Pattern [collection] v1.0.0
A complete bundle of atoms required to ship an accessible modal dialog. A modal is the most-failed accessible widget in production frontends — it requires focus management, keyboard handling, ARIA semantics, scroll containment, and portal rendering. This collection composes the rules, checks, and references needed for compliant implementation.

## Includes
- @community/rule-dialog-affordance-required
- @community/rule-aria-label-required
- @community/check-aria-label-required
- @community/rule-keyboard-accessible
- @community/rule-no-keyboard-trap
- @community/rule-keyboard-tab-order
- @community/term-focus-ring
- @community/check-focus-visible
- @community/value-focus-outline-width
- @community/value-z-index-tokens
- @community/metric-target-size
- @community/example-radix-dialog

## Target
claude-code

## Entry Point
```
    When implementing a modal/dialog, the bundle enforces these requirements:

    1. SEMANTICS
       - Use `<dialog>` element OR `role="dialog"` with `aria-modal="true"`.
       - Required: `aria-labelledby` pointing to the dialog's title element
         OR `aria-label` with a descriptive string (see @community/rule-aria-label-required).
       - Optional but recommended: `aria-describedby` for the dialog body summary.

    2. FOCUS TRAP (when modal is open)
       - On open: move focus to the first focusable element inside the dialog
         (typically the close button or first form input).
       - Tab and Shift+Tab cycle ONLY within the dialog's focusable elements.
       - On close: return focus to the element that opened the dialog (the trigger).
       - Use `inert` attribute on background content to hide from AT (modern browsers)
         OR `aria-hidden="true"` on siblings as a fallback.

    3. KEYBOARD
       - ESC key closes the dialog (unless explicitly destructive — confirm first).
       - ENTER on the trigger opens; SPACE opens for `<button>`.
       - No keyboard trap (see @community/rule-no-keyboard-trap).

    4. PORTAL & STACKING
       - Render dialog in a portal to `document.body` to escape transformed/clipped ancestors.
       - z-index must be above all app content. Use the token from @community/value-z-index-tokens
         (e.g. `--z-modal: 1000`). NEVER hardcode z-index: 9999.

    5. SCROLL CONTAINMENT
       - Lock body scroll while open: `document.body.style.overflow = 'hidden'`.
       - Preserve scrollbar gutter to prevent layout shift (see @community/metric-cls-cumulative-layout-shift).
       - Allow scroll within the dialog body if content overflows.

    6. CLOSE AFFORDANCE
       - Visible close button (X) with `aria-label="Close"` and target size ≥ 44×44 (@community/metric-target-size).
       - Click outside on the backdrop closes (unless destructive).
       - ESC closes (point 3).

    7. MOTION
       - Respect `prefers-reduced-motion`: skip enter/exit transitions.
       - Default open transition: 150–250ms ease-out for fade+scale.
  
```

## Recommended Implementation
```
    Use Radix UI's <Dialog /> primitive (see @community/example-radix-dialog) — it implements all
    of the above out-of-the-box. For native, the HTML <dialog> element with .showModal() handles
    focus trap + ESC + backdrop click + inert background — but requires polyfill for older browsers
    and styling adjustments for ::backdrop.
  
```

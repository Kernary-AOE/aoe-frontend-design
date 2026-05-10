# KeyboardAccessible [rule] v1.0.0
Enforces keyboard accessibility requirements: all interactive elements must be focusable, have visible focus indicators, and be operable with keyboard alone. Covers WCAG SC 2.1.1 (Keyboard), SC 2.4.3 (Focus Order), SC 2.4.7 (Focus Visible), SC 2.4.11 (Focus Not Obscured).
domain: accessibility

## Checks
- [ ] @community/check-focus-visible
- [ ] @community/check-keyboard-reachable
- [ ] @community/check-focus-order-logical

## Applies To
@community/type-html-artifact

## Severity Combination
```
@community/check-focus-visible fails           → BLOCK  (SC 2.4.11)
@community/check-keyboard-reachable fails      → BLOCK  (SC 2.1.1)
@community/check-focus-order-logical fails     → WARN   (SC 2.4.3, often requires manual review)
```

## Remediation
- Non-focusable interactive elements: add `tabindex='0'` and keyboard event handlers (Enter/Space for buttons, arrow keys for custom widgets).
- Custom components missing ARIA roles: add appropriate role (e.g., `role='button'`, `role='menuitem'`) and keyboard behavior per ARIA Authoring Practices Guide.
- Focus order issues: reorder DOM to match visual order, or use `tabindex` values strategically (avoid positive tabindex > 0).
- Modal dialogs: implement focus trap — on open, move focus to dialog; on close, return focus to trigger element.

## Applies To
@community/type-html-artifact

## Severity Combination
```
@community/check-focus-visible fails           → BLOCK  (SC 2.4.11)
@community/check-keyboard-reachable fails      → BLOCK  (SC 2.1.1)
@community/check-focus-order-logical fails     → WARN   (SC 2.4.3, often requires manual review)
```

## Remediation
- Non-focusable interactive elements: add `tabindex='0'` and keyboard event handlers (Enter/Space for buttons, arrow keys for custom widgets).
- Custom components missing ARIA roles: add appropriate role (e.g., `role='button'`, `role='menuitem'`) and keyboard behavior per ARIA Authoring Practices Guide.
- Focus order issues: reorder DOM to match visual order, or use `tabindex` values strategically (avoid positive tabindex > 0).
- Modal dialogs: implement focus trap — on open, move focus to dialog; on close, return focus to trigger element.

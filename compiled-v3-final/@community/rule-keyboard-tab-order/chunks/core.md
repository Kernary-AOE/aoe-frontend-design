# KeyboardTabOrder [rule] v1.0.0
Every interactive element must be reachable via Tab key in a sequence that matches the visual reading order — left-to-right, top-to-bottom — so keyboard-only users can navigate without disorientation (WCAG SC 2.4.3 Focus Order, Level A).
domain: frontend-design

## Rules
- Never use tabindex values ≥ 1 — they override the natural DOM order and create unpredictable focus sequences.
- Use tabindex='0' only on custom interactive elements (non-native elements that need to be focusable).
- Use tabindex='-1' to make elements programmatically focusable without inserting them in the tab sequence.
- DOM order must match visual order; do not use CSS order: N or position: absolute to visually reorder elements that are in a different DOM order.
- After a modal or drawer opens, focus must move to the first focusable element inside it, not stay on the trigger.
- After a modal closes, focus must return to the triggering element.

## Counter Examples
```
// ❌ Positive tabindex forces this button first in tab order, regardless of DOM position
<button tabindex="5">Last visually but first in tab</button>

// ❌ CSS grid reorders columns visually but DOM order (= tab order) is reversed
<style>.grid { display: grid; grid-template-columns: 1fr 1fr; }</style>
<div class="grid">
<div>Column 2 (DOM first, visually second)</div>
<div>Column 1 (DOM second, visually first)</div>
</div>
```

## Severity
block

## Verification
Tab through the entire page without a mouse. Trace the focus sequence on paper. Does it match the visual reading order? Do any elements require more than one Tab from their visual predecessor? If yes, audit tabindex values and DOM order.

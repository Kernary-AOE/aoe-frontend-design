# NoKeyboardTrap [rule] v1.0.0
Users must always be able to move keyboard focus out of any component using standard keys (Tab, Shift+Tab, or Escape); trapping focus in a non-modal context makes the interface completely unusable for keyboard-only and assistive technology users (WCAG SC 2.1.2 No Keyboard Trap, Level A).
domain: frontend-design

## Rule
```
// Keyboard trap test: Tab into a component → Tab out → focus must leave.
// The ONLY legitimate focus trap is an open modal dialog (role="dialog" aria-modal="true").

// ✅ Modal: intentional focus trap — Escape closes, restores focus to trigger
function trapFocus(modalEl) {
const focusable = modalEl.querySelectorAll(
'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
);
const first = focusable[0];
const last = focusable[focusable.length - 1];
modalEl.addEventListener('keydown', (e) => {
if (e.key !== 'Tab') return;
if (e.shiftKey) {
if (document.activeElement === first) { e.preventDefault(); last.focus(); }
} else {
if (document.activeElement === last) { e.preventDefault(); first.focus(); }
}
});
}

// ❌ Non-modal component with accidental trap — date picker trapping Tab
datepicker.addEventListener('keydown', (e) => {
if (e.key === 'Tab') e.preventDefault(); // blocks Tab from leaving the picker
});
```

## Anti Patterns
- Calling e.preventDefault() on Tab without implementing a complete focus cycle (first ↔ last)
- Overriding Tab in a tooltip, dropdown, or non-modal widget where focus should leave freely
- Custom scroll containers that intercept keyboard events and consume Tab
- Third-party embedded widgets (maps, chat widgets) that absorb keyboard focus with no escape path

## Exception
Modal dialogs (role='dialog' aria-modal='true') MUST trap focus while open. Use @community/constraint-focus-trap-modal for the correct modal focus-trap implementation.

## Severity
block

## Verification
Tab into every interactive component. Attempt to Tab or Shift+Tab out. Press Escape. If focus is permanently stuck, it is a keyboard trap.

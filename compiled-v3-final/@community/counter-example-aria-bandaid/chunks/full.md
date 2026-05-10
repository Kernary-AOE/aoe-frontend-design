# AriaBandaid [counter-example] v1.0.0
A modal dialog where the engineer added `role='dialog'`, `aria-label`, and `aria-modal='true'` after the audit complained — but kept the underlying `<div onClick>` for the close button, kept the heading as a `<p>` because the design used a 14px label, and kept the focus loose (no trap). ARIA contradicts the actual structure.
domain: accessibility

## Label
Modal With ARIA Roles Bolted Onto Wrong-Element Soup

## Bad Code
```
function Modal({ open, onClose, children }) {
if (!open) return null;
return (
<div role="dialog" aria-modal="true" aria-label="Confirm dialog" className="modal">
<div className="modal-header">
<p className="title">Confirm action</p>
<div onClick={onClose} aria-label="Close" role="button">
×
</div>
</div>
<div className="modal-body">
{children}
</div>
<div className="modal-footer">
<div onClick={onClose}>Cancel</div>
<div onClick={onConfirm} role="button">Confirm</div>
</div>
</div>
);
}
```

## Why Bad
- `role='dialog'` claims dialog semantics but no focus trap exists — Tab leaves the modal into background page
- Title is a `<p>` with `role` missing — screen reader announces dialog with no accessible name structure (the aria-label duplicates body content)
- `<div role='button'>` for close: missing `tabindex='0'` and Enter/Space key handler — focusable in audit logic but not really keyboard operable
- Cancel button is bare `<div onClick>` with no role at all — invisible to keyboard and screen reader
- ARIA describes a dialog to assistive tech that the actual DOM does not deliver — worse than no ARIA, because users trust the announcement
- Audit tools may report 0 violations because ARIA attributes are present; real screen-reader test reveals the trap

## Good Code
```
function Modal({ open, onClose, onConfirm, children }) {
const dialogRef = useRef(null);
const titleId = useId();

// Focus trap + focus return
useEffect(() => {
if (!open) return;
const previousFocus = document.activeElement;
dialogRef.current?.focus();
const onKey = (e) => { if (e.key === "Escape") onClose(); };
window.addEventListener("keydown", onKey);
return () => {
window.removeEventListener("keydown", onKey);
previousFocus?.focus?.();
};
}, [open]);

if (!open) return null;
return (
<div
ref={dialogRef}
role="dialog"
aria-modal="true"
aria-labelledby={titleId}
tabIndex={-1}
className="modal"
>
<header className="modal-header">
<h2 id={titleId}>Confirm action</h2>
<button type="button" onClick={onClose} aria-label="Close dialog">
<span aria-hidden="true">×</span>
</button>
</header>
<div className="modal-body">{children}</div>
<footer className="modal-footer">
<button type="button" onClick={onClose}>Cancel</button>
<button type="button" onClick={onConfirm}>Confirm</button>
</footer>
</div>
);
}
```

## Why Good
- Real `<h2>` for the title — `aria-labelledby` references it so the dialog has a semantic accessible name (no duplication)
- Real `<button>` elements for Close, Cancel, Confirm — keyboard operable, screen-reader announced, no role needed
- Focus moves to the dialog on open and returns to trigger on close — proper focus management
- Escape key handler closes the dialog — keyboard users have a clear exit
- ARIA only added where native HTML can't express it (`aria-modal`, `aria-labelledby`) — minimal, accurate, and matches actual behavior
- `<header>` and `<footer>` give landmark structure; `<span aria-hidden>` on the × prevents double-announce of 'X close'

## Anti Pattern
@community/anti-pattern-accessibility-after-thought

## Label
Modal With ARIA Roles Bolted Onto Wrong-Element Soup

## Bad Code
```
function Modal({ open, onClose, children }) {
if (!open) return null;
return (
<div role="dialog" aria-modal="true" aria-label="Confirm dialog" className="modal">
<div className="modal-header">
<p className="title">Confirm action</p>
<div onClick={onClose} aria-label="Close" role="button">
×
</div>
</div>
<div className="modal-body">
{children}
</div>
<div className="modal-footer">
<div onClick={onClose}>Cancel</div>
<div onClick={onConfirm} role="button">Confirm</div>
</div>
</div>
);
}
```

## Why Bad
- `role='dialog'` claims dialog semantics but no focus trap exists — Tab leaves the modal into background page
- Title is a `<p>` with `role` missing — screen reader announces dialog with no accessible name structure (the aria-label duplicates body content)
- `<div role='button'>` for close: missing `tabindex='0'` and Enter/Space key handler — focusable in audit logic but not really keyboard operable
- Cancel button is bare `<div onClick>` with no role at all — invisible to keyboard and screen reader
- ARIA describes a dialog to assistive tech that the actual DOM does not deliver — worse than no ARIA, because users trust the announcement
- Audit tools may report 0 violations because ARIA attributes are present; real screen-reader test reveals the trap

## Good Code
```
function Modal({ open, onClose, onConfirm, children }) {
const dialogRef = useRef(null);
const titleId = useId();

// Focus trap + focus return
useEffect(() => {
if (!open) return;
const previousFocus = document.activeElement;
dialogRef.current?.focus();
const onKey = (e) => { if (e.key === "Escape") onClose(); };
window.addEventListener("keydown", onKey);
return () => {
window.removeEventListener("keydown", onKey);
previousFocus?.focus?.();
};
}, [open]);

if (!open) return null;
return (
<div
ref={dialogRef}
role="dialog"
aria-modal="true"
aria-labelledby={titleId}
tabIndex={-1}
className="modal"
>
<header className="modal-header">
<h2 id={titleId}>Confirm action</h2>
<button type="button" onClick={onClose} aria-label="Close dialog">
<span aria-hidden="true">×</span>
</button>
</header>
<div className="modal-body">{children}</div>
<footer className="modal-footer">
<button type="button" onClick={onClose}>Cancel</button>
<button type="button" onClick={onConfirm}>Confirm</button>
</footer>
</div>
);
}
```

## Why Good
- Real `<h2>` for the title — `aria-labelledby` references it so the dialog has a semantic accessible name (no duplication)
- Real `<button>` elements for Close, Cancel, Confirm — keyboard operable, screen-reader announced, no role needed
- Focus moves to the dialog on open and returns to trigger on close — proper focus management
- Escape key handler closes the dialog — keyboard users have a clear exit
- ARIA only added where native HTML can't express it (`aria-modal`, `aria-labelledby`) — minimal, accurate, and matches actual behavior
- `<header>` and `<footer>` give landmark structure; `<span aria-hidden>` on the × prevents double-announce of 'X close'

## Anti Pattern
@community/anti-pattern-accessibility-after-thought

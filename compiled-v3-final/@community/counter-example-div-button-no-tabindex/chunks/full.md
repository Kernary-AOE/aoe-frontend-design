# DivButtonNoTabindex [counter-example] v1.0.0
A 'submit' button reimplemented as a styled `<div onClick>` because the team disliked the default `<button>` styles. No tabindex, no role, no Enter/Space handler. Keyboard users tab past it; screen reader users don't know it exists.
domain: accessibility

## Label
Custom `<div>` Submit Control Without Tabindex Or Key Handler

## Bad Code
```
function SubmitForm({ onSubmit }) {
return (
<form>
<input name="email" />
<div className="submit-btn" onClick={onSubmit}>
Submit
</div>
</form>
);
}

/* CSS */
.submit-btn {
background: linear-gradient(180deg, #4f46e5, #4338ca);
color: white;
padding: 12px 24px;
border-radius: 8px;
cursor: pointer;
user-select: none;
}
```

## Why Bad
- `<div>` is not in the tab order — keyboard users press Tab and the control is invisible to them
- Pressing Enter or Space when (somehow) focused does nothing — `onClick` doesn't fire from key events on `<div>`
- Screen readers announce 'Submit' as plain text, not as a button — users don't know it's actionable
- Form submission via Enter from the input field does nothing because the `<div>` isn't a submit button
- axe-core flags `interactive-supports-focus` — fails WCAG SC 2.1.1 (Keyboard, Level A)

## Good Code
```
function SubmitForm({ onSubmit }) {
return (
<form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
<input name="email" />
<button type="submit" className="submit-btn">
Submit
</button>
</form>
);
}

/* CSS — same visual styling, on the native button */
.submit-btn {
appearance: none;
border: none;
font: inherit;
background: linear-gradient(180deg, var(--brand-500), var(--brand-600));
color: var(--brand-fg);
padding: var(--space-sm) var(--space-lg);
border-radius: var(--radius-md);
cursor: pointer;
}
.submit-btn:focus-visible {
outline: 2px solid var(--ring);
outline-offset: 2px;
}
```

## Why Good
- Native `<button type='submit'>` is keyboard-focusable, Enter/Space activated, screen-reader announced as 'button' — all for free
- `appearance: none; border: none; font: inherit;` strips UA styles so the button can match any visual design
- Form submits naturally on Enter from any input — Tab + Enter flow works without custom JS
- `:focus-visible` ring satisfies WCAG SC 2.4.7 and 2.4.11
- No need for tabindex, role, or onKeyDown — the platform already gives them

## Anti Pattern
@community/anti-pattern-breaking-keyboard-flow

## Label
Custom `<div>` Submit Control Without Tabindex Or Key Handler

## Bad Code
```
function SubmitForm({ onSubmit }) {
return (
<form>
<input name="email" />
<div className="submit-btn" onClick={onSubmit}>
Submit
</div>
</form>
);
}

/* CSS */
.submit-btn {
background: linear-gradient(180deg, #4f46e5, #4338ca);
color: white;
padding: 12px 24px;
border-radius: 8px;
cursor: pointer;
user-select: none;
}
```

## Why Bad
- `<div>` is not in the tab order — keyboard users press Tab and the control is invisible to them
- Pressing Enter or Space when (somehow) focused does nothing — `onClick` doesn't fire from key events on `<div>`
- Screen readers announce 'Submit' as plain text, not as a button — users don't know it's actionable
- Form submission via Enter from the input field does nothing because the `<div>` isn't a submit button
- axe-core flags `interactive-supports-focus` — fails WCAG SC 2.1.1 (Keyboard, Level A)

## Good Code
```
function SubmitForm({ onSubmit }) {
return (
<form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
<input name="email" />
<button type="submit" className="submit-btn">
Submit
</button>
</form>
);
}

/* CSS — same visual styling, on the native button */
.submit-btn {
appearance: none;
border: none;
font: inherit;
background: linear-gradient(180deg, var(--brand-500), var(--brand-600));
color: var(--brand-fg);
padding: var(--space-sm) var(--space-lg);
border-radius: var(--radius-md);
cursor: pointer;
}
.submit-btn:focus-visible {
outline: 2px solid var(--ring);
outline-offset: 2px;
}
```

## Why Good
- Native `<button type='submit'>` is keyboard-focusable, Enter/Space activated, screen-reader announced as 'button' — all for free
- `appearance: none; border: none; font: inherit;` strips UA styles so the button can match any visual design
- Form submits naturally on Enter from any input — Tab + Enter flow works without custom JS
- `:focus-visible` ring satisfies WCAG SC 2.4.7 and 2.4.11
- No need for tabindex, role, or onKeyDown — the platform already gives them

## Anti Pattern
@community/anti-pattern-breaking-keyboard-flow

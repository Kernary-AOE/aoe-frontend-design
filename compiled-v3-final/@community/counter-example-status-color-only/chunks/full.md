# StatusColorOnly [counter-example] v1.0.0
An email input that signals invalid state purely by changing its border color to red. No icon, no error text on the field, no `aria-invalid`. Color-blind users see a slightly different gray border and have no idea anything is wrong.
domain: accessibility

## Label
Form Validation Indicated Only By Red Border

## Bad Code
```
<label>
Email
<input type="email" name="email" className={isInvalid ? "invalid" : ""} />
</label>

/* CSS */
.invalid {
border-color: #ef4444;  /* red */
}
/* That's it. No message, no icon, no aria. */
```

## Why Bad
- Border-color is the only signal — color-blind users (~8% of men, deuteranopia/protanopia) cannot distinguish it from default gray
- No error text — user knows something is wrong but not what (missing @ sign? domain typo? already taken?)
- No `aria-invalid='true'` — screen readers announce the field as valid
- No `aria-describedby` linking to a message — even if a message existed elsewhere, AT users wouldn't see it
- Violates WCAG 1.4.1 (Use of Color, Level A) — color is the only means of conveying error state

## Good Code
```
<label htmlFor="email">Email</label>
<div className={"field" + (isInvalid ? " field--invalid" : "")}>
<input
id="email"
type="email"
name="email"
aria-invalid={isInvalid}
aria-describedby={isInvalid ? "email-error" : undefined}
required
/>
{isInvalid && (
<p id="email-error" className="error-msg" role="alert">
<Icon name="alert-circle" aria-hidden="true" />
Please enter a valid email like name@example.com
</p>
)}
</div>

/* CSS */
.field--invalid input {
border-color: var(--color-danger-600);
border-width: 2px;
}
.error-msg {
display: flex;
align-items: center;
gap: var(--space-xs);
color: var(--color-danger-700);
font-size: var(--font-size-sm);
}
```

## Why Good
- Three signals: thicker border (shape) + alert icon (form) + descriptive message text — works without color
- `aria-invalid='true'` exposes invalid state to screen readers programmatically
- `aria-describedby` ties the error message to the field — AT users hear the message when focusing the input
- `role='alert'` announces the new error message immediately when it appears
- Specific message ('like name@example.com') tells the user how to fix it — satisfies Nielsen heuristic 9 (help users recognize, diagnose, and recover from errors)

## Anti Pattern
@community/anti-pattern-color-only-meaning

## Label
Form Validation Indicated Only By Red Border

## Bad Code
```
<label>
Email
<input type="email" name="email" className={isInvalid ? "invalid" : ""} />
</label>

/* CSS */
.invalid {
border-color: #ef4444;  /* red */
}
/* That's it. No message, no icon, no aria. */
```

## Why Bad
- Border-color is the only signal — color-blind users (~8% of men, deuteranopia/protanopia) cannot distinguish it from default gray
- No error text — user knows something is wrong but not what (missing @ sign? domain typo? already taken?)
- No `aria-invalid='true'` — screen readers announce the field as valid
- No `aria-describedby` linking to a message — even if a message existed elsewhere, AT users wouldn't see it
- Violates WCAG 1.4.1 (Use of Color, Level A) — color is the only means of conveying error state

## Good Code
```
<label htmlFor="email">Email</label>
<div className={"field" + (isInvalid ? " field--invalid" : "")}>
<input
id="email"
type="email"
name="email"
aria-invalid={isInvalid}
aria-describedby={isInvalid ? "email-error" : undefined}
required
/>
{isInvalid && (
<p id="email-error" className="error-msg" role="alert">
<Icon name="alert-circle" aria-hidden="true" />
Please enter a valid email like name@example.com
</p>
)}
</div>

/* CSS */
.field--invalid input {
border-color: var(--color-danger-600);
border-width: 2px;
}
.error-msg {
display: flex;
align-items: center;
gap: var(--space-xs);
color: var(--color-danger-700);
font-size: var(--font-size-sm);
}
```

## Why Good
- Three signals: thicker border (shape) + alert icon (form) + descriptive message text — works without color
- `aria-invalid='true'` exposes invalid state to screen readers programmatically
- `aria-describedby` ties the error message to the field — AT users hear the message when focusing the input
- `role='alert'` announces the new error message immediately when it appears
- Specific message ('like name@example.com') tells the user how to fix it — satisfies Nielsen heuristic 9 (help users recognize, diagnose, and recover from errors)

## Anti Pattern
@community/anti-pattern-color-only-meaning

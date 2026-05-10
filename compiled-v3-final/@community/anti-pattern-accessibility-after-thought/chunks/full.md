# AccessibilityAfterThought [anti-pattern] v1.0.0
Treating accessibility as a final-step audit pass: design and build the UI based purely on visual mockups, then add `aria-label`, `role`, and `tabindex` afterwards to silence the audit warnings. The result is technically compliant ARIA on a structurally inaccessible page — wrong heading order, decorative buttons, color-only affordances — papered over with ARIA labels that contradict the actual experience.
domain: accessibility

## Label
ARIA Sprinkled On After Visual Design Is Frozen

## Trap
ARIA is treated as an accessibility shim — 'add aria-label and the audit goes green'. The audit tool reports zero violations; the screen-reader user encounters a confusing wall of labels with no semantic structure. Worse, ARIA can override correct native semantics: `role='button'` on a `<div>` instead of using `<button>`, `aria-label='Close'` on a `<div>` that isn't focusable. Accessibility audits become a compliance checkbox rather than a usability concern.

## Counter Examples
- @community/counter-example-aria-bandaid

## Detection Heuristics
- ARIA attributes were added in a separate commit titled 'a11y fixes' or 'accessibility audit' after the feature was complete
- `role='button'` on `<div>` elements where `<button>` would have worked
- `aria-label` on elements that already have visible text labels (creating duplicate announcements)
- Heading hierarchy is broken (h1 → h3 → h2) — visual design dictated heading sizes, not document outline
- `aria-hidden='true'` on focusable elements (creates 'phantom focus' bugs)
- Lighthouse a11y score is 100 but actual screen-reader test reveals confusing experience
- Decorative SVGs missing `aria-hidden`; meaningful SVGs missing `<title>` or `aria-label`

## Remediation
- Shift accessibility left: include semantic HTML, heading order, focus states, and ARIA in the initial component design — not the audit phase.
- Default to native elements (`<button>`, `<a>`, `<nav>`, `<main>`, `<h1>`-`<h6>`) which carry semantics by construction.
- ARIA's first rule: 'No ARIA is better than bad ARIA' — only add ARIA when native HTML cannot express the role.
- Run screen reader tests (VoiceOver / NVDA) during development, not just automated audits.
- Include accessibility acceptance criteria in design tickets: keyboard operability, focus indicators, screen-reader announcements.
- Reference @community/method-a11y-audit for review process and @community/collection-accessible-frontend for the full checklist.

## Severity
high

## Label
ARIA Sprinkled On After Visual Design Is Frozen

## Trap
ARIA is treated as an accessibility shim — 'add aria-label and the audit goes green'. The audit tool reports zero violations; the screen-reader user encounters a confusing wall of labels with no semantic structure. Worse, ARIA can override correct native semantics: `role='button'` on a `<div>` instead of using `<button>`, `aria-label='Close'` on a `<div>` that isn't focusable. Accessibility audits become a compliance checkbox rather than a usability concern.

## Counter Examples
- @community/counter-example-aria-bandaid

## Detection Heuristics
- ARIA attributes were added in a separate commit titled 'a11y fixes' or 'accessibility audit' after the feature was complete
- `role='button'` on `<div>` elements where `<button>` would have worked
- `aria-label` on elements that already have visible text labels (creating duplicate announcements)
- Heading hierarchy is broken (h1 → h3 → h2) — visual design dictated heading sizes, not document outline
- `aria-hidden='true'` on focusable elements (creates 'phantom focus' bugs)
- Lighthouse a11y score is 100 but actual screen-reader test reveals confusing experience
- Decorative SVGs missing `aria-hidden`; meaningful SVGs missing `<title>` or `aria-label`

## Remediation
- Shift accessibility left: include semantic HTML, heading order, focus states, and ARIA in the initial component design — not the audit phase.
- Default to native elements (`<button>`, `<a>`, `<nav>`, `<main>`, `<h1>`-`<h6>`) which carry semantics by construction.
- ARIA's first rule: 'No ARIA is better than bad ARIA' — only add ARIA when native HTML cannot express the role.
- Run screen reader tests (VoiceOver / NVDA) during development, not just automated audits.
- Include accessibility acceptance criteria in design tickets: keyboard operability, focus indicators, screen-reader announcements.
- Reference @community/method-a11y-audit for review process and @community/collection-accessible-frontend for the full checklist.

## Severity
high

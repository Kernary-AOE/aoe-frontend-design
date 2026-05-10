# NoShippingA11yViolations [rule] v1.0.0
Features that pass functional tests but contain known accessibility violations must not be shipped — a11y compliance is part of the definition of done, not a post-ship enhancement.
domain: frontend-design

## Severity
critical

## Definition Of Done
- All interactive elements are keyboard accessible
- All form inputs have associated labels
- Automated axe-core scan returns 0 critical/serious violations
- Color contrast meets WCAG AA (4.5:1 for text, 3:1 for UI components)
- Focus visible on all focusable elements

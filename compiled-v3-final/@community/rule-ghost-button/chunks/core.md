# GhostButton [rule] v1.0.0
> Ghost buttons (transparent background + visible border) are a secondary action style only — never use ghost buttons as the primary CTA on a page. They have lower visual weight than filled buttons, making them appropriate for secondary or destructive actions where de-emphasis is intentional.
domain: frontend-design

## Severity
warning

## Use When
- Secondary action paired with a filled primary button (e.g. 'Cancel' next to 'Save')
- Destructive action where de-emphasis is appropriate (cancel is safer than delete)
- Multiple equal-weight actions where no single action is primary

## Never Use When
- The only CTA on a page or section
- The primary conversion action (Sign up, Get started, Buy now)
- Against a background with less than 4.5:1 contrast ratio for the border color

## Contrast Check
Ghost button borders must meet WCAG AA (3:1 minimum for UI components) against the background they appear on. White ghost buttons on white backgrounds fail. Check with axe-core or browser DevTools contrast checker.

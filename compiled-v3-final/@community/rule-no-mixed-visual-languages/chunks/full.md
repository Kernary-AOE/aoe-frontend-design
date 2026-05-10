# NoMixedVisualLanguages [rule] v1.0.0
Corner radii, shadow styles, and type scales must be visually consistent within any single user flow — mixing divergent visual language systems (e.g., sharp-cornered inputs with heavily rounded buttons) within the same flow is forbidden.
domain: frontend-design

## Severity
medium

## Examples
- Violation: a signup flow with rounded Material inputs (border-radius:4px) next to a button with border-radius:24px from a different design system
- Violation: dashboard uses Inter sans-serif throughout except one widget using Georgia — font inconsistency within flow
- Violation: card shadows use a flat neo-brutalist border in the modal but a soft drop-shadow in the parent page
- Correct: define one border-radius scale, one shadow scale, one type scale — apply uniformly within the flow

## Severity
medium

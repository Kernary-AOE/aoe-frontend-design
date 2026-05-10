# GroupRelatedFormFields [rule] v1.0.0
Related form fields must be visually and semantically grouped — using section headings, helper text, and proximity — so users can comprehend field relationships and navigate the form without cognitive overload.
domain: frontend-design

## Applies To
@community/type-html-artifact

## Severity
warning

## Patterns
- Personal Info section: name, email, phone
- Address section: street, city, state, zip (wrapped in fieldset)
- Payment section: card number, expiry, CVV (visually separated by a horizontal rule or card outline)
- Preferences section: checkboxes, radios

## Behavior
- Use a visible heading (h2/h3) or legend to name each group.
- Add helper text beneath the group heading to explain its purpose when non-obvious.
- Use sufficient vertical space between groups (≥ 2× the within-group spacing) to signal boundaries.
- On mobile, consider collapsible sections for forms with 4+ groups to reduce scrolling.

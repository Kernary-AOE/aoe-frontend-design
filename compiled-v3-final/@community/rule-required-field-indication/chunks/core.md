# RequiredFieldIndication [rule] v1.0.0
Required form fields must be marked both visually (asterisk or label text) and programmatically (required attribute + aria-required) — visual-only asterisks are invisible to screen readers.
>     For every form with required fields:
    1. Add the required (or aria-required="true") attribute to the input — provides browser validation and AT announcement.
    2. Add a visible marker: asterisk (*) is conventional; ensure it is wrapped in aria-hidden="true" with an sr-only sibling providing "(required)" in text.
    3. Inversion rule: if most fields in a form are required and only a few are optional, mark the optional fields as "(optional)" instead of marking each required field — reduces visual noise.
    4. Place the required indicator adjacent to the label, not the input.
  
domain: frontend-design

## Applies To
Any form with a combination of required and optional inputs.

## Counter Example
An asterisk-only required indicator with no required attribute and no sr-only text — screen reader users cannot determine which fields are mandatory.

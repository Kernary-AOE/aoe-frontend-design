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

## Examples
-       {/* CORRECT */}
      <label htmlFor="email">
        Email
        <span aria-hidden="true" className="text-red-500 ml-0.5">*</span>
        <span className="sr-only">(required)</span>
      </label>
      <input id="email" type="email" required aria-required="true" />

      {/* CORRECT — inversion: most are required, mark the optional one */}
      <label htmlFor="company">
        Company
        <span className="text-text-secondary text-[12px] ml-1">(optional)</span>
      </label>
      <input id="company" type="text" />
    

## Rationale
A purely visual asterisk communicates nothing to screen reader users — the AT announces the label text only. The required attribute adds browser-native validation behavior and causes AT to announce '(required)' after the label in most screen readers. The inversion rule (mark optional when >70% are required) follows the principle of marking the minority case — marking 8 required fields with asterisks when only 1 is optional creates more noise than value.

## Applies To
Any form with a combination of required and optional inputs.

## Counter Example
An asterisk-only required indicator with no required attribute and no sr-only text — screen reader users cannot determine which fields are mandatory.

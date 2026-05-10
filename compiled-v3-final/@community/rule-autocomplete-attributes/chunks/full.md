# AutocompleteAttributes [rule] v1.0.0
Form inputs collecting personal data (name, email, phone, address, credit card) MUST carry a valid HTML `autocomplete` attribute token so browsers and password managers can autofill correctly and meet WCAG 1.3.5.
domain: frontend-design

## Applies To
@community/type-html-artifact

## Severity
warning

## Exceptions
-
  - **Case**: One-time passwords (OTP)
  - **Allowed When**: Use autocomplete='one-time-code' — not 'off'.
-
  - **Case**: Security challenge inputs (CAPTCHAs, PIN challenges)
  - **Allowed When**: autocomplete='off' is acceptable; user-hostile autofill would degrade security.

## Remediation
- Audit all inputs with `querySelectorAll('input:not([autocomplete])')` to find missing attributes.
- Map each input's semantic purpose to an WCAG token: https://www.w3.org/TR/WCAG21/#input-purposes
- For multi-section forms (shipping vs billing), use section tokens: autocomplete='section-billing street-address'.

## Rationale
Autofill reduces typing errors, speeds up form completion, and is required for WCAG 1.3.5 (Identify Input Purpose). Mobile users benefit most — they are on constrained keyboards where re-typing saved data is costly.

## Applies To
@community/type-html-artifact

## Severity
warning

## Exceptions
-
  - **Case**: One-time passwords (OTP)
  - **Allowed When**: Use autocomplete='one-time-code' — not 'off'.
-
  - **Case**: Security challenge inputs (CAPTCHAs, PIN challenges)
  - **Allowed When**: autocomplete='off' is acceptable; user-hostile autofill would degrade security.

## Remediation
- Audit all inputs with `querySelectorAll('input:not([autocomplete])')` to find missing attributes.
- Map each input's semantic purpose to an WCAG token: https://www.w3.org/TR/WCAG21/#input-purposes
- For multi-section forms (shipping vs billing), use section tokens: autocomplete='section-billing street-address'.

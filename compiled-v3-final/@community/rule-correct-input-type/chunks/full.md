# CorrectInputType [rule] v1.0.0
Form inputs must use the HTML `type` attribute that matches the expected data (e.g. `type='email'` for email addresses, `type='tel'` for phone numbers) to trigger the correct on-screen keyboard on mobile and enable native browser validation.
domain: frontend-design

## Applies To
@community/type-html-artifact

## Severity
warning

## Mobile Impact
type='email' on mobile (iOS/Android) shows @-symbol keyboard; type='tel' shows numeric dialpad; type='number' shows number keyboard. Using type='text' for any of these degrades mobile completion rates.

## Native Validation
- type='email' — validates format before submit
- type='url' — validates protocol presence
- type='number' — enforces numeric range (min/max/step)
- type='date' — native date picker, locale-aware display

## Remediation
- Run `querySelectorAll('input[type=text]')` and audit each for its semantic purpose.
- For numeric data that should not spin (e.g. credit card, zip code), prefer type='tel' over type='number' — tel gives numeric keyboard without the spin controls.

## Applies To
@community/type-html-artifact

## Severity
warning

## Mobile Impact
type='email' on mobile (iOS/Android) shows @-symbol keyboard; type='tel' shows numeric dialpad; type='number' shows number keyboard. Using type='text' for any of these degrades mobile completion rates.

## Native Validation
- type='email' — validates format before submit
- type='url' — validates protocol presence
- type='number' — enforces numeric range (min/max/step)
- type='date' — native date picker, locale-aware display

## Remediation
- Run `querySelectorAll('input[type=text]')` and audit each for its semantic purpose.
- For numeric data that should not spin (e.g. credit card, zip code), prefer type='tel' over type='number' — tel gives numeric keyboard without the spin controls.

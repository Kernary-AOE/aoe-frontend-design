# UpfrontFieldRequirements [rule] v1.0.0
> Mandatory fields, format requirements, and character limits must be visible before the user attempts to submit — never revealed only after a validation error.
domain: frontend-design

## Severity
warning

## Applies When
designing any form with mandatory fields, format constraints, or character limits

## Verify By
Load the form without interacting. Are required fields marked? Are format hints (e.g. 'MM/DD/YYYY') visible? Are character limits shown? All must be present before submission attempt.

## Use Instead
Display required-field markers (*), format hints, and character limits inline before submission attempt.

## Examples
- Phone field: shows 'Enter with country code e.g. +1 555 000 0000' as placeholder or helper text before any interaction.
- Password creation: character requirements (8 chars, 1 number, 1 symbol) shown below the field before typing.
- Character limit: a 280-character bio field shows '0 / 280' counter before the user starts typing.
- Bad: a date field that only reveals 'Please enter MM/DD/YYYY format' after the user submits '15/3/2026'.

## Rationale
Discovering requirements only through errors creates frustration and extra round-trips. Users who fill a form correctly the first time are more likely to convert and trust the product.

## Severity
warning

## Applies When
designing any form with mandatory fields, format constraints, or character limits

## Verify By
Load the form without interacting. Are required fields marked? Are format hints (e.g. 'MM/DD/YYYY') visible? Are character limits shown? All must be present before submission attempt.

## Use Instead
Display required-field markers (*), format hints, and character limits inline before submission attempt.

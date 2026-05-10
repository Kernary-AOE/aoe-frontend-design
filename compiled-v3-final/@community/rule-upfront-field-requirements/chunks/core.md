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

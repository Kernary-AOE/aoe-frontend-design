# VerbBasedCtaLabels [rule] v1.0.0
> Label every button and action link with a specific verb phrase that describes the action it performs — never use generic labels like 'Submit', 'OK', 'Yes', or 'Confirm'.
domain: frontend-design

## Severity
warning

## Applies When
naming any interactive control that initiates an action

## Verify By
Audit all buttons and links for generic labels (Submit, OK, Yes, Confirm). Replace each with a descriptive verb phrase (Send invite, Download report, Delete project, Save draft).

## Examples
- Good: 'Send invite' (not 'Submit')
- Good: 'Download report' (not 'OK')
- Good: 'Delete project' (not 'Confirm')
- Good: 'Save draft' (not 'Save')
- Good: 'Start free trial' (not 'Sign up')
- Bad: 'Submit' — submit what? from whose perspective?
- Bad: 'OK' on a destructive confirmation — users click without reading.
- Bad: 'Yes' / 'No' on a dialog — 'Yes what?' forces the user to re-read the question.

## Rationale
Generic labels force users to infer context from surrounding text, increasing cognitive load and reducing confidence before clicking. Specific verb labels make the outcome unambiguous before the action is taken.

## Severity
warning

## Applies When
naming any interactive control that initiates an action

## Verify By
Audit all buttons and links for generic labels (Submit, OK, Yes, Confirm). Replace each with a descriptive verb phrase (Send invite, Download report, Delete project, Save draft).

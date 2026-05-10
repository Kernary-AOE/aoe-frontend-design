# IosImmediateActionAcknowledgment [rule] v1.0.0
> Acknowledge every user tap immediately with a visible state change — disable the button, show an inline spinner, or change label text — even while the underlying operation is still running.
domain: frontend-design

## Applies To
any async operation triggered by a user tap in an iOS app (network request, file operation, computation)

## Examples
- Submit button: disable + show ProgressView as a label overlay immediately on tap; restore on completion or error.
- Follow button: instantly toggle to 'Following' state optimistically; revert if the network call fails.
- Verify: tap an action button on a slow connection; UI must respond immediately rather than appearing frozen.

## Rationale
An unchanged interface after a tap makes users tap repeatedly (triggering duplicate requests) or assume the app is broken. Immediate feedback confirms the action was received and sets the correct expectation for load time.

## Applies To
any async operation triggered by a user tap in an iOS app (network request, file operation, computation)

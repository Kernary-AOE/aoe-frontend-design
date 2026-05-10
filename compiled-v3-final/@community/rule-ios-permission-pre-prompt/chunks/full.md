# IosPermissionPrePrompt [rule] v1.0.0
> Show a custom explanation screen describing why the permission is needed and what benefit the user gains before triggering the system permission dialog.
domain: frontend-design

## Applies To
any iOS feature that will trigger a system permission dialog (camera, location, notifications, microphone, contacts, etc.)

## Examples
- Before camera permission: 'To scan your QR ticket, we need camera access. Your photos are never stored.' + Continue button.
- Before notification permission: show sample notification screenshot + 'Get real-time delivery updates' + Enable Notifications.
- Verify: delete app to reset permissions; trigger the feature; custom explanation must appear before the system dialog.

## Rationale
The system permission dialog appears only once per permission. A denied permission requires the user to go to Settings manually. A pre-prompt screen with clear benefit messaging measurably increases acceptance rates by giving users the context to make an informed decision.

## Applies To
any iOS feature that will trigger a system permission dialog (camera, location, notifications, microphone, contacts, etc.)

# IosPermissionInContext [rule] v1.0.0
> Trigger permission requests at the point of use, not at app launch.
domain: frontend-design

## Applies To
iOS apps requiring camera, location, notifications, contacts, or any permission-gated capability

## Examples
- Ask for camera access when the user taps the camera shutter button, not on first app open.
- Ask for location when the user taps 'Find stores near me', not during onboarding.
- Ask for notification permission after the user completes their first booking and sees the confirmation screen.

## Rationale
Requesting all permissions at launch provides no context for why they are needed, resulting in most users denying them. Contextual requests — shown immediately before the action that requires the permission — have significantly higher approval rates because the user understands the value exchange.

## Applies To
iOS apps requiring camera, location, notifications, contacts, or any permission-gated capability

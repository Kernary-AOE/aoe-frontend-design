# IosAttCompliance [rule] v1.0.0
> Show the ATT (App Tracking Transparency) prompt via ATTrackingManager.requestTrackingAuthorization before collecting any cross-app tracking data, and provide full app functionality to users who deny.
domain: frontend-design

## Applies To
any iOS app that uses cross-app or cross-website tracking, advertising identifiers, or fingerprinting

## Examples
- Show ATT prompt after onboarding, not at first launch, so user has context about the app's value.
- Deny ATT → all ad-free and analytics-free app paths remain fully functional.
- Never gate features, show extra ads, or degrade performance for users who deny tracking.

## Rationale
ATT is required by iOS 14.5+ and App Store Review Guidelines. Collecting tracking data without the ATT prompt, or degrading app experience for opt-out users, results in App Store rejection. Users who deny tracking must receive the same core experience as those who allow it.

## Applies To
any iOS app that uses cross-app or cross-website tracking, advertising identifiers, or fingerprinting

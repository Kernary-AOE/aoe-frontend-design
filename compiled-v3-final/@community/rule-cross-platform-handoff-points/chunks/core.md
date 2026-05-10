# CrossPlatformHandoffPoints [rule] v1.0.0
Points in a user flow where users may transition from one platform to another (e.g. web to mobile app, email to web, QR code to native) must be explicitly designed with clear visual signaling, deep-link support, and state preservation.
domain: frontend-design

## Severity
warning

## Handoff Types
- Email → web: Magic link or verification email opens to the correct screen, not the homepage.
- Web → native app: 'Open in app' banner (Smart App Banner or custom) deep-links to the equivalent in-app screen.
- Mobile web → native: Universal links / App Links handle the handoff transparently.
- QR code → native: QR encodes a deep link URL that opens the app to the correct context.
- Desktop → mobile: 'Continue on your phone' sends a push or SMS with a deep link.

## Requirements
- The deep link must point to the specific resource, not just the app root.
- If the user is unauthenticated on the destination platform, preserve the target URL through the auth flow (return_to parameter).
- The handoff prompt must explain the benefit of switching ('Use face ID, offline access') — not just 'Open in app'.

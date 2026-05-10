# IosSignInWithApple [rule] v1.0.0
> Include Sign in with Apple as the first authentication option whenever any third-party sign-in provider is offered; this is required by App Store Review Guideline 4.8.
domain: frontend-design

## Applies To
any iOS app authentication flow that includes a third-party sign-in provider (Google, Facebook, Twitter, etc.)

## Examples
- Auth screen order: Sign in with Apple (top) → Continue with Google → Continue with Email.
- Verify: review the sign-in screen; Sign in with Apple button must be present and listed before all other providers.
- Use Apple's pre-built ASAuthorizationAppleIDButton for correct branding and appearance.

## Rationale
App Store Review Guideline 4.8 mandates Sign in with Apple wherever third-party authentication is offered. Violations result in rejection. Sign in with Apple also provides a privacy-protecting mechanism for users who do not want to share their real email.

## Applies To
any iOS app authentication flow that includes a third-party sign-in provider (Google, Facebook, Twitter, etc.)

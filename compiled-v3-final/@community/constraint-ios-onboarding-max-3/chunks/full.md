# IosOnboardingMax3 [constraint] v1.0.0
> Onboarding flows must be at most 3 pages, must always be skippable, and must defer sign-in / account creation until after the user has experienced core app value.
domain: frontend-design

## Target
- iOS app onboarding / first-launch flows

## Threshold
Maximum 3 onboarding screens before first app use. Pass: ≤ 3. Warn: 4. Block: ≥ 5.

## Rationale
Long onboarding flows reduce day-1 retention: users want to use the app, not be lectured about it. Deferring sign-in removes the largest abandonment barrier — users who cannot immediately use the app without creating an account frequently uninstall. Apple HIG source: Rule 8.1 — Onboarding, Max 3 Pages, Skippable.

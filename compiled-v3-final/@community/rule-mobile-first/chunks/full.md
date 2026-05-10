# MobileFirst [rule] v1.0.0
CSS responsive breakpoints MUST be authored mobile-first: base styles target the smallest viewport, and `@media (min-width: ...)` queries layer on enhancements for larger viewports. Desktop-first authoring (`@media (max-width: ...)`) requires the cascade to override styles repeatedly and tends to bloat mobile payloads.
domain: frontend-engineering

## Checks
- [ ] @community/check-mobile-first

## Applies To
@community/type-html-artifact

## Severity
medium

## Severity Combination
```
>50% of breakpoints use max-width        → BLOCK
1–50% use max-width                      → WARN
all breakpoints use min-width            → PASS
```

## Failure Mode
Mobile devices (the majority of traffic) parse and discard desktop styles; CSS specificity wars erupt as each breakpoint must un-set the previous; new components require copy-paste of all-but-mobile resets.

## Remediation
- Refactor: write base styles for mobile, then `@media (min-width: 640px) { ... }` for tablet, `@media (min-width: 1024px) { ... }` for desktop.
- Adopt Tailwind's mobile-first variants (`md:` `lg:` `xl:`) — they enforce min-width by default.
- If a feature is *desktop-only* (e.g. a hover-dependent pattern), add it inside a min-width AND `@media (hover: hover) and (pointer: fine)` query.

## Exceptions
-
  - **Case**: Print stylesheet
  - **Allowed When**: Print styles use `@media print { ... }` — orthogonal to width-based breakpoints.
-
  - **Case**: Print-like 'narrow desktop window' constraint
  - **Allowed When**: A specific desktop-only override is cleaner as a max-width override; flag with a comment but don't block.

## Applies To
@community/type-html-artifact

## Severity
medium

## Validates With
- @community/fact-consistency-standards

## Severity Combination
```
>50% of breakpoints use max-width        → BLOCK
1–50% use max-width                      → WARN
all breakpoints use min-width            → PASS
```

## Failure Mode
Mobile devices (the majority of traffic) parse and discard desktop styles; CSS specificity wars erupt as each breakpoint must un-set the previous; new components require copy-paste of all-but-mobile resets.

## Remediation
- Refactor: write base styles for mobile, then `@media (min-width: 640px) { ... }` for tablet, `@media (min-width: 1024px) { ... }` for desktop.
- Adopt Tailwind's mobile-first variants (`md:` `lg:` `xl:`) — they enforce min-width by default.
- If a feature is *desktop-only* (e.g. a hover-dependent pattern), add it inside a min-width AND `@media (hover: hover) and (pointer: fine)` query.

## Exceptions
-
  - **Case**: Print stylesheet
  - **Allowed When**: Print styles use `@media print { ... }` — orthogonal to width-based breakpoints.
-
  - **Case**: Print-like 'narrow desktop window' constraint
  - **Allowed When**: A specific desktop-only override is cleaner as a max-width override; flag with a comment but don't block.

## See Also
- @community/check-mobile-first

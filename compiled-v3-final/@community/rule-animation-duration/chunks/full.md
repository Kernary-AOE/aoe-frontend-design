# AnimationDuration [rule] v1.0.0
UI motion (hover, focus, expand, collapse, page transition) MUST resolve in 100–300ms. Below 100ms the motion reads as a glitch; above 300ms it feels sluggish; above 500ms users perceive the UI as broken. Cap is 500ms.
domain: visual-design

## Checks
- [ ] @community/check-animation-duration

## Applies To
@community/type-html-artifact

## Severity
medium

## Severity Combination
```
animation > 500ms                → BLOCK
animation 300–500ms              → WARN
animation 100–300ms              → PASS
animation < 100ms                → WARN  (likely missed by user)
```

## Failure Mode
Slow motion makes the UI feel broken or laggy; users click again, double-fire, or abandon. Fast motion (<100ms) is invisible — the cognitive 'where did the menu go?' moment cancels the value of the animation.

## Remediation
- Standardize on tokens: `--motion-fast: 150ms`, `--motion-base: 200ms`, `--motion-slow: 300ms` — consume them in CSS and JS.
- Reserve 400–500ms only for full-page route transitions; never for hover / focus.
- If your animation truly needs > 500ms (e.g. a hero reveal), break it into stages with the user able to interact during.
- Pair with @community/rule-reduced-motion-required to handle accessibility.

## Exceptions
-
  - **Case**: Decorative ambient animation
  - **Allowed When**: A background gradient or hero loop runs continuously and is not tied to interaction; duration is not perceived as 'response time'.
-
  - **Case**: Loading skeleton
  - **Allowed When**: A pulse / shimmer cycles every 1500ms — this is feedback, not response.

## Applies To
@community/type-html-artifact

## Severity
medium

## Validates With
- @community/fact-visibility-system-status

## Severity Combination
```
animation > 500ms                → BLOCK
animation 300–500ms              → WARN
animation 100–300ms              → PASS
animation < 100ms                → WARN  (likely missed by user)
```

## Failure Mode
Slow motion makes the UI feel broken or laggy; users click again, double-fire, or abandon. Fast motion (<100ms) is invisible — the cognitive 'where did the menu go?' moment cancels the value of the animation.

## Remediation
- Standardize on tokens: `--motion-fast: 150ms`, `--motion-base: 200ms`, `--motion-slow: 300ms` — consume them in CSS and JS.
- Reserve 400–500ms only for full-page route transitions; never for hover / focus.
- If your animation truly needs > 500ms (e.g. a hero reveal), break it into stages with the user able to interact during.
- Pair with @community/rule-reduced-motion-required to handle accessibility.

## Exceptions
-
  - **Case**: Decorative ambient animation
  - **Allowed When**: A background gradient or hero loop runs continuously and is not tied to interaction; duration is not perceived as 'response time'.
-
  - **Case**: Loading skeleton
  - **Allowed When**: A pulse / shimmer cycles every 1500ms — this is feedback, not response.

## See Also
- @community/check-animation-duration

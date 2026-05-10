# SpacingRhythm [rule] v1.0.0
All vertical spacing (margin, padding, gap) MUST be drawn from a single 8-point scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px (or rem equivalents). Arbitrary 'eyeballed' values like 17px or 23px are forbidden — they break visual rhythm and frustrate later token migration.
domain: visual-design

## Checks
- [ ] @community/check-spacing-rhythm

## Applies To
@community/type-html-artifact

## Severity
medium

## Severity Combination
```
>5% of spacing values are off-scale         → BLOCK
1–5% off-scale (rounding artifacts)         → WARN
all spacing on the 8pt scale                → PASS
```

## Failure Mode
Layouts look 'almost right but slightly off' — readers can't articulate why, but craft is perceived as low. Designer hand-offs require pixel-by-pixel correction. Migration to a token system later requires a full audit.

## Remediation
- Adopt Tailwind's default spacing scale (1=4px, 2=8px, 3=12px, 4=16px, 6=24px, 8=32px, 12=48px, 16=64px) — it is on-scale by design.
- Define design tokens `--space-1 .. --space-12` and forbid raw px values via stylelint `declaration-property-value-allowed-list`.
- For one-off micro-adjustments, prefer changing `font-size` or container width before reaching for an off-scale value.

## Exceptions
-
  - **Case**: Optical centering of glyphs
  - **Allowed When**: A 1–2px nudge is required to optically center an icon inside a button; document with a comment.
-
  - **Case**: Third-party embeds with fixed dimensions
  - **Allowed When**: A vendor widget exposes only fixed pixel dims; wrap it in an on-scale container.

## Applies To
@community/type-html-artifact

## Severity
medium

## Validates With
- @community/fact-consistency-standards

## Severity Combination
```
>5% of spacing values are off-scale         → BLOCK
1–5% off-scale (rounding artifacts)         → WARN
all spacing on the 8pt scale                → PASS
```

## Failure Mode
Layouts look 'almost right but slightly off' — readers can't articulate why, but craft is perceived as low. Designer hand-offs require pixel-by-pixel correction. Migration to a token system later requires a full audit.

## Remediation
- Adopt Tailwind's default spacing scale (1=4px, 2=8px, 3=12px, 4=16px, 6=24px, 8=32px, 12=48px, 16=64px) — it is on-scale by design.
- Define design tokens `--space-1 .. --space-12` and forbid raw px values via stylelint `declaration-property-value-allowed-list`.
- For one-off micro-adjustments, prefer changing `font-size` or container width before reaching for an off-scale value.

## Exceptions
-
  - **Case**: Optical centering of glyphs
  - **Allowed When**: A 1–2px nudge is required to optically center an icon inside a button; document with a comment.
-
  - **Case**: Third-party embeds with fixed dimensions
  - **Allowed When**: A vendor widget exposes only fixed pixel dims; wrap it in an on-scale container.

## See Also
- @community/check-spacing-rhythm

# ColorContrastAAA [rule] v1.0.0
Mission-critical body text — long-form articles, legal disclosures, healthcare information, financial figures — MUST meet WCAG 2.2 SC 1.4.6 Level AAA contrast: ≥ 7:1 for normal text and ≥ 4.5:1 for large text. AAA is the appropriate floor for content that users will read for minutes, not seconds.
domain: accessibility

## Checks
- [ ] @community/check-color-contrast-aaa

## Applies To
@community/type-html-artifact

## Severity
medium

## Severity Combination
```
long-form body < 4.5:1                       → BLOCK  (also fails AA)
long-form body 4.5–7:1 (passes AA, fails AAA) → WARN
long-form body ≥ 7:1                          → PASS
```

## Failure Mode
Sustained-reading fatigue, especially under bright sunlight or for users with low vision; legal / medical content becomes unreadable for the audience that needs it most. Sites cannot claim WCAG AAA conformance.

## Remediation
- Push body text closer to `oklch(15% 0.01 <hue>)` on a `oklch(98% 0.005 <hue>)` background — small chroma keeps the surface alive while increasing luminance distance.
- If the brand requires a softer pairing, restrict softer contrast to ephemeral UI (toast, hover) and reserve high-contrast for the long-form region.
- Verify with @community/metric-contrast-ratio and the OKLCH Color Picker.

## Exceptions
-
  - **Case**: Marketing / hero typography
  - **Allowed When**: Display text at ≥ 24px is read for seconds, not minutes; AA (3:1 large) is acceptable.
-
  - **Case**: Disabled / placeholder text
  - **Allowed When**: WCAG exempts inactive UI elements; placeholder may pass AA but should be supplemented by a real label.

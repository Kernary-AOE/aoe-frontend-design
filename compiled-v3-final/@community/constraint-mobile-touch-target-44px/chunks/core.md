# MobileTouchTarget44px [constraint] v1.0.0
Every touch-activated control must present a hit area of at least 44×44 CSS pixels on touch viewports. Visual rendering may be smaller, but the effective hit target (via padding or ::before expansion) must reach 44×44.
domain: accessibility

## Target
- interactive elements on touch viewports
- buttons / links / form controls / icon buttons rendered ≤ 768px

## Severity
high

## Values
-
  - **Minimum**: 44 × 44 CSS px
  - **Source**: Apple HIG (iOS)
-
  - **Minimum**: 48 × 48 dp
  - **Source**: Material Design (Android)
-
  - **Threshold**: WCAG 2.2 SC 2.5.8 Target Size (Minimum)
  - **Value**: 24 × 24 CSS px
  - **Level**: AA
-
  - **Threshold**: WCAG 2.1 SC 2.5.5 Target Size (Enhanced)
  - **Value**: 44 × 44 CSS px
  - **Level**: AAA

## Exceptions
- Inline links inside a paragraph (covered by surrounding line-height / read-mode).
- Decorative non-interactive elements.
- Adjacent identical controls in a paginated list (per WCAG SC 2.5.8 'inline' exception) where 24×24 is acceptable.
- Desktop / pointer-only viewports may relax to 32×32.

## Approved Alternatives
- Visual icon at 24×24 with `padding: 10px` to reach 44×44 hit area.
- ::before { content: ''; position: absolute; inset: -10px } to expand hit area without changing visual size.
- Tailwind: `p-2.5` on icon buttons; minimum `h-11 w-11` (44px) on bare buttons.

## Enforcement
Storybook a11y addon + axe-core target-size rule. Visual regression with min-touch-area overlay in dev mode.

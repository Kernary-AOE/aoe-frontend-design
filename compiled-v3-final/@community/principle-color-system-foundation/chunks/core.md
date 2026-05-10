# ColorSystemFoundation [principle] v1.0.0
> Every Prime-guided project must use a three-layer color architecture — Primitive (OKLCH values), Semantic Scale (12-step functional scale), and Application Token (CSS custom properties) — and no layer may be skipped. Color choices must be rooted in perceptual color science to break AI default palette convergence.
domain: frontend-design

## Applies To
- any frontend project with a design system
- AI-generated UI builds
- brand palette creation
- dark mode implementation

## Counter Examples
- Using raw Tailwind color classes (bg-blue-500) directly in components — skips all three layers
- Defining colors only as hex values without OKLCH equivalents — breaks the primitive layer contract
- Using a single --primary CSS variable without a full scale — collapses semantic and token layers together

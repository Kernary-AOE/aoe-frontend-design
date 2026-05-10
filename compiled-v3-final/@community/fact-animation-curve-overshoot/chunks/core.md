# AnimationCurveOvershoot [fact] v1.0.0
Overshoot easing (cubic-bezier Y > 1, e.g. cubic-bezier(0.34,1.56,0.64,1)) simulates a spring that passes its target before settling — perceived as physical and playful, correct for position-tracking elements (tab indicators, toggles) but not for entrances or exits.
> An overshoot curve has a control point with Y value > 1 (or < 0), which causes the animated property to temporarily exceed its target value before settling. For a translateY animation from 20px to 0, an overshoot curve would momentarily reach -5px before returning to 0. This creates a 'spring past target then settle' feel that users perceive as physical inertia. The key constraint: overshoot only looks correct when the animated property represents a position or scale (transform) — it produces visual artifacts on opacity or color.
domain: frontend-design

## Confidence
strong

## Css Values
- **Spring Gentle**: cubic-bezier(0.34, 1.56, 0.64, 1)   — 56px overshoot on 100px travel; default toast/tooltip
- **Spring Snappy**: cubic-bezier(0.18, 1.80, 0.40, 1)   — 80px overshoot; bold, playful UI
- **Spring Soft**: cubic-bezier(0.34, 1.20, 0.64, 1)   — 20px overshoot; subtle physical feel

## Correct Uses
- Tab indicator sliding left/right — the overshoot mimics a physical marker snapping into position
- Toggle thumb switch — the 2px overshoot past the final position feels like a mechanical click
- Toast/snackbar entrance — the slight scale overshoot signals 'new content arrived'
- Drag-release settle — when element is dropped, spring settle feels physical

## Wrong Uses
- Modal entrance — the panel overshoots its centered position, looks broken
- Dropdown menu — overshoot on height/opacity looks glitchy
- Opacity animation — property temporarily exceeds 1 (clipped) or goes negative, causes flicker
- Color transitions — chroma/lightness overshoot produces unexpected intermediate colors

## Quantitative
- **Typical Overshoot**: 10-20% of travel distance
- **Settle Time**: Adds ~30-50ms vs equivalent ease-out curve
- **Stiffness Equiv**: stiffness:180/damping:12 ≈ cubic-bezier(0.34, 1.56, 0.64, 1)

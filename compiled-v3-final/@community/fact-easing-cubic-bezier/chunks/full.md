# EasingCubicBezier [fact] v1.0.0
Natural-feeling motion uses asymmetric cubic-bezier easing curves that decelerate into rest, modelling the kinematic profile of objects in physical reality. Linear easing reads as mechanical and unnatural.
> UI motion should use asymmetric cubic-bezier easings that decelerate at the end (e.g., cubic-bezier(0.4, 0, 0.2, 1) — Material's standard ease, or cubic-bezier(0.16, 1, 0.3, 1) — Linear's ease-out-quint) rather than linear or symmetric ease-in-out, because real-world objects have inertia at the start and friction at the end.

## Confidence
strong

## Applies To
- transition-timing-function on CSS transitions
- Framer Motion / React Spring easing presets
- page transitions, drawer slide-in, modal fade-in
- hover feedback, tap feedback, layout transitions

## Quantitative
- **Material Standard**: cubic-bezier(0.4, 0, 0.2, 1)
- **Material Decelerated**: cubic-bezier(0, 0, 0.2, 1)
- **Material Accelerated**: cubic-bezier(0.4, 0, 1, 1)
- **Apple Default**: cubic-bezier(0.25, 0.1, 0.25, 1.0)
- **Linear App Style**: cubic-bezier(0.16, 1, 0.3, 1) (ease-out-quint)

## Counter Conditions
- Continuous indeterminate animations (loading spinners, progress) use linear easing — there is no rest state to decelerate into.
- Spring physics (Framer Motion default, React Spring) replace cubic-bezier with mass / stiffness / damping parameters and produce naturally damped motion without needing an explicit curve.
- Bounces / overshoot motion deliberately violate monotonic easing for playful character.

## Sources

## Confidence
strong

## Source
- Material Design Motion — easing tokens (standard, emphasized, decelerated, accelerated)
- Apple Human Interface Guidelines — Motion (default ease-out 0.25, 0.1, 0.25, 1.0)
- Val Head, 'Designing Interface Animation' (Rosenfeld, 2016)

## Applies To
- transition-timing-function on CSS transitions
- Framer Motion / React Spring easing presets
- page transitions, drawer slide-in, modal fade-in
- hover feedback, tap feedback, layout transitions

## Quantitative
- **Material Standard**: cubic-bezier(0.4, 0, 0.2, 1)
- **Material Decelerated**: cubic-bezier(0, 0, 0.2, 1)
- **Material Accelerated**: cubic-bezier(0.4, 0, 1, 1)
- **Apple Default**: cubic-bezier(0.25, 0.1, 0.25, 1.0)
- **Linear App Style**: cubic-bezier(0.16, 1, 0.3, 1) (ease-out-quint)

## Counter Conditions
- Continuous indeterminate animations (loading spinners, progress) use linear easing — there is no rest state to decelerate into.
- Spring physics (Framer Motion default, React Spring) replace cubic-bezier with mass / stiffness / damping parameters and produce naturally damped motion without needing an explicit curve.
- Bounces / overshoot motion deliberately violate monotonic easing for playful character.

# ReducedMotionPriority [fact] v1.0.0
A meaningful share of users — between 5% and 30% depending on segment — have prefers-reduced-motion: reduce enabled at the OS level, either by default (older devices, certain accessibility profiles) or by deliberate choice.
> Between approximately 5% and 30% of users have prefers-reduced-motion: reduce enabled — driven by vestibular disorders, migraine, motion-induced nausea, epilepsy risk, deliberate battery / focus preference, and OS defaults on certain device classes — making reduced-motion compliance a non-niche concern.

## Confidence
strong

## Applies To
- decision to gate any animation behind prefers-reduced-motion
- estimating coverage and compliance cost for animation work
- QA testing matrix (must include reduce-motion ON pass)

## Quantitative
- **Estimated Share**: 5%–30% depending on user segment
- **High End Segments**: older users, users with chronic migraine, vestibular patients
- **Motion Sensitivity Population Estimates**: ~35% of adults experience some form of motion sensitivity (NIH)

## Counter Conditions
- Exact rates are hard to measure — the OS preference is queryable but not commonly reported in analytics.
- Lower bound (~5%) reflects users who explicitly toggle the setting; upper bound (~30%) includes default-on configurations and users who would benefit but haven't toggled.
- Younger / mobile-only segments tend toward the lower bound; aging / desktop / accessibility-aware segments toward the upper.

## Sources

## Confidence
strong

## Source
- Eric Bailey & Sara Soueidan, 'Designing Safer Web Animation For Motion Sensitivity' (Smashing, 2020)
- Val Head, 'Designing With Reduced Motion For Motion Sensitivities' (Smashing, 2020)
- WebAIM Screen Reader User Survey #9 (2021) — accessibility-feature usage data
- Apple — vestibular disorder accessibility documentation

## Applies To
- decision to gate any animation behind prefers-reduced-motion
- estimating coverage and compliance cost for animation work
- QA testing matrix (must include reduce-motion ON pass)

## Quantitative
- **Estimated Share**: 5%–30% depending on user segment
- **High End Segments**: older users, users with chronic migraine, vestibular patients
- **Motion Sensitivity Population Estimates**: ~35% of adults experience some form of motion sensitivity (NIH)

## Counter Conditions
- Exact rates are hard to measure — the OS preference is queryable but not commonly reported in analytics.
- Lower bound (~5%) reflects users who explicitly toggle the setting; upper bound (~30%) includes default-on configurations and users who would benefit but haven't toggled.
- Younger / mobile-only segments tend toward the lower bound; aging / desktop / accessibility-aware segments toward the upper.

# AnimationDistractionCost [fact] v1.0.0
Peripheral animation in a reading context measurably degrades reading speed and comprehension. Empirical work on animated banner ads adjacent to prose found reading speed drops by roughly a third when peripheral motion is present.
> Peripheral / off-axis animation playing while a user is reading prose reduces reading speed by roughly 38% and lowers comprehension scores, because the human visual system's motion-detection pathway involuntarily commands attention to moving stimuli.

## Confidence
strong

## Applies To
- long-form reading interfaces (decision: zero peripheral motion)
- documentation / docs sites
- ad placement adjacent to prose
- auto-playing carousels / hero videos near reading flow
- decision to disable cursor / hover animations during sustained reading

## Quantitative
- **Reading Speed Reduction**: ~38% (Burke et al. 2005, similar magnitude reported across the literature)
- **Comprehension Score Reduction**: consistent decrease across studies (~10–15% on follow-up recall tests)

## Counter Conditions
- Animation that *is* the content (a video, a chart transition the user opted into) does not bear this cost.
- Animation that conveys system state (a save indicator pulsing) is functional, not decorative — measured cost is lower.
- Periphery effect collapses on small screens where there is no 'periphery' relative to the reading column.

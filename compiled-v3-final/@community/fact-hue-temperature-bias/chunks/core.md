# HueTemperatureBias [fact] v1.0.0
Hue carries learned + biological associations: warm hues (red-orange, 0–60° / 300–360°) are associated with urgency, energy, and warning; cool hues (cyan-blue, 180–240°) with calm, trust, and stability — biases empirically replicated across cultures with cultural variance.
> Warm hues in the OKLCH 0°–60° and 300°–360° ranges (reds, oranges, magentas) tend to read as urgent / energetic / alarming and are widely used for warnings and CTAs, while cool hues in the 180°–240° range (cyans, blues, indigos) tend to read as calm / stable / trustworthy and dominate financial / enterprise / governance UIs — these associations have biological roots (red = blood / fire / ripe-fruit signaling) and cultural reinforcement, with non-trivial cross-cultural variation.

## Confidence
strong

## Applies To
- brand-hue selection by domain (fintech / health / governance gravitate cool, food / fitness / urgency gravitate warm)
- status color choices (red-for-danger, green-for-success — note green-for-money is US-centric)
- marketing CTA color choice
- dashboard alert palettes

## Quantitative
- **Warm Hue Range Degrees**: 0–60 and 300–360 (OKLCH H)
- **Cool Hue Range Degrees**: 180–240 (OKLCH H)
- **Neutral Hue Range Degrees**: 60–180 (greens, yellow-greens, cyans)

## Counter Conditions
- Cultural variance: red signals luck / celebration in Chinese cultures, danger in Western; white signals mourning in some East Asian contexts.
- Hue association is a weak prior — it is overridden by saturation / lightness / context (a pale dusty-red reads as warm-elegant, a saturated red reads as alarm).
- Accessibility: never encode meaning by hue alone (color-blindness — see fact-color-blindness-types).

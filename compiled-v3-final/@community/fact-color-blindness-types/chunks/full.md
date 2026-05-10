# ColorBlindnessTypes [fact] v1.0.0
Approximately 8% of men and 0.5% of women have a form of color vision deficiency — most commonly red-green (deuteranopia / protanopia). The implication for design is that color must never be the sole channel encoding meaning.
> Roughly 8% of men of Northern European descent and 0.5% of women have a color vision deficiency — broken into protanopia / protanomaly (red-perception, ~1% men), deuteranopia / deuteranomaly (green-perception, ~6% men, the most common), tritanopia / tritanomaly (blue-yellow, < 0.01% — extremely rare), and the rare achromatopsia (full color absence) — meaning red-green encoding is the largest accessibility risk and color must always be paired with a non-color channel (icon, label, pattern, position).

## Confidence
proven

## Applies To
- status indicators (success / warning / error must include icon + text)
- data viz palettes (avoid red-green diverging without secondary cue)
- form validation (don't rely on red border alone)
- category encoding (pair color with shape / pattern / label)

## Quantitative
- **Male Prevalence Northern European**: ~8%
- **Female Prevalence**: ~0.5%
- **Deuteranopia Share**: ~6% of men (most common)
- **Protanopia Share**: ~1% of men
- **Tritanopia Share**: < 0.01% (rare)
- **Achromatopsia Share**: ~0.003% (very rare, full color blindness)

## Counter Conditions
- Prevalence varies by ethnic background — lower in East Asian populations (~5% men), higher in Northern European (~8%).
- Severity ranges from anomaly (reduced perception) to full -opia (absent perception) — most affected users have anomaly, not full absence.
- Color-blind-safe palettes (Viridis, ColorBrewer Set1 with shape redundancy, IBM Carbon CB-safe) handle red-green and blue-yellow simultaneously.

## Sources

## Confidence
proven

## Source
- National Eye Institute (NIH) — color blindness prevalence statistics
- Birch, J., 'Worldwide prevalence of red-green color deficiency', Journal of the Optical Society of America A (2012)
- WCAG 2.2 SC 1.4.1 Use of Color — meaning must not be conveyed by color alone
- Pilestone / Coblis simulator tools

## Applies To
- status indicators (success / warning / error must include icon + text)
- data viz palettes (avoid red-green diverging without secondary cue)
- form validation (don't rely on red border alone)
- category encoding (pair color with shape / pattern / label)

## Quantitative
- **Male Prevalence Northern European**: ~8%
- **Female Prevalence**: ~0.5%
- **Deuteranopia Share**: ~6% of men (most common)
- **Protanopia Share**: ~1% of men
- **Tritanopia Share**: < 0.01% (rare)
- **Achromatopsia Share**: ~0.003% (very rare, full color blindness)

## Counter Conditions
- Prevalence varies by ethnic background — lower in East Asian populations (~5% men), higher in Northern European (~8%).
- Severity ranges from anomaly (reduced perception) to full -opia (absent perception) — most affected users have anomaly, not full absence.
- Color-blind-safe palettes (Viridis, ColorBrewer Set1 with shape redundancy, IBM Carbon CB-safe) handle red-green and blue-yellow simultaneously.

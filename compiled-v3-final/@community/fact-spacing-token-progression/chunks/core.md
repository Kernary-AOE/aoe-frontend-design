# SpacingTokenProgression [fact] v1.0.0
Spacing scales follow a geometric (or near-geometric) progression — typically doubling every 1–2 steps — rather than a linear progression, because perceived spacing differences scale logarithmically with size.
> Effective spacing scales follow a near-geometric progression (e.g., 4, 8, 12, 16, 24, 32, 48, 64, 96, 128) rather than a linear one (4, 8, 12, 16, 20, 24, …) — equal *ratios* between steps produce visually balanced size relationships, while equal *differences* produce indistinguishable mid-range steps.

## Confidence
strong

## Applies To
- spacing token scales
- border-radius scales
- shadow elevation scales
- type-scale design (closely related)

## Quantitative
- **Canonical Tailwind**:
  - 4
  - 8
  - 12
  - 16
  - 20
  - 24
  - 32
  - 40
  - 48
  - 64
  - 80
  - 96
  - 128
- **Canonical Doubling**:
  - 4
  - 8
  - 16
  - 32
  - 64
  - 128
- **Weber Fechner Basis**: perceived difference scales with log(stimulus)

## Counter Conditions
- Tight UI density tiers (4, 8, 12, 16) read linear at the small end where geometric ratios collapse.
- Print / editorial baseline grids may use a strict baseline-multiple progression that looks linear.
- Tailwind's default scale is technically *near*-geometric — it adds linear stops in the small range.

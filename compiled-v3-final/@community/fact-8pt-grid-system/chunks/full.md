# EightPtGridSystem [fact] v1.0.0
The 8-point grid is the dominant spacing system in modern UI design, originating from iOS HIG and Material Design's density unit. Components, padding, margins, and type vertical-rhythm all align to multiples of 8 (with 4 as a half-step).
> Aligning all spacing values to multiples of 8 px (with 4 px as the half-step) yields cross-device pixel-grid alignment for the major device pixel densities (1×, 1.5×, 2×, 3×) and reduces design-decision fatigue by replacing arbitrary numbers with a constrained ladder.

## Confidence
strong

## Applies To
- spacing tokens (margin, padding, gap)
- component dimensions (button height, input height)
- type vertical rhythm (line-height multiples)
- icon sizing (16, 24, 32, 40, 48)

## Quantitative
- **Base Unit**: 8 px
- **Half Step**: 4 px
- **Canonical Progression**: 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96
- **Pixel Density Coverage**: 1×, 1.5×, 2×, 3× all land on integer pixels at 8px multiples

## Counter Conditions
- Editorial / typography-driven layouts may use a baseline grid derived from line-height instead.
- Dense-data UIs (spreadsheets, terminals) often drop to a 4-px grid for tighter packing.
- Wearable / TV / car interfaces use larger base units (16, 24).

## Sources

## Confidence
strong

## Source
- Apple Human Interface Guidelines — layout grid (8pt baseline)
- Google Material Design — keylines (8dp grid, 4dp half-step)
- Bryn Jackson, 'The 8-Point Grid' (2015)

## Applies To
- spacing tokens (margin, padding, gap)
- component dimensions (button height, input height)
- type vertical rhythm (line-height multiples)
- icon sizing (16, 24, 32, 40, 48)

## Quantitative
- **Base Unit**: 8 px
- **Half Step**: 4 px
- **Canonical Progression**: 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96
- **Pixel Density Coverage**: 1×, 1.5×, 2×, 3× all land on integer pixels at 8px multiples

## Counter Conditions
- Editorial / typography-driven layouts may use a baseline grid derived from line-height instead.
- Dense-data UIs (spreadsheets, terminals) often drop to a 4-px grid for tighter packing.
- Wearable / TV / car interfaces use larger base units (16, 24).

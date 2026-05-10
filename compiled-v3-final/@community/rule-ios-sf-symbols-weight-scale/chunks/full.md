# IosSfSymbolsWeightScale [rule] v1.0.0
> Set SF Symbol weight to match adjacent text weight; use the .small, .medium, or .large scale variants (imageScale) instead of explicit point sizes to size symbols relative to their text context.
domain: frontend-design

## Applies To
all SF Symbols placed next to or within text labels

## Examples
- SwiftUI: Image(systemName: 'arrow.right').fontWeight(.semibold) next to Text('Continue').fontWeight(.semibold).
- Scale: Image(systemName: 'info.circle').imageScale(.small) for a compact inline icon, .large for standalone feature icons.
- Verify: inspect symbol alongside text; weights should appear visually harmonious.

## Rationale
Mismatched weights create visual imbalance that signals unpolished design. Using text-relative scaling ensures symbols always pair correctly with their label, including at all Dynamic Type sizes.

## Applies To
all SF Symbols placed next to or within text labels

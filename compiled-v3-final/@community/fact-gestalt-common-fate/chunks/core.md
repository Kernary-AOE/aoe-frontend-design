# GestaltCommonFate [fact] v1.0.0
Gestalt Principle of Common Fate (Wertheimer, 1923): elements that move together in the same direction and at the same speed are perceived as a unified group, regardless of their visual appearance.
> When multiple elements undergo the same motion — same direction, same speed, same timing — the brain groups them as belonging together. Common fate is one of the most powerful grouping cues in animated interfaces, overriding static cues like proximity and similarity when motion is present.

## Confidence
proven

## Applies To
- accordion panels — all items in an expanding section move together to signal they are a group
- drag-and-drop — dragged item and its placeholder move in sync to communicate the move operation
- loading skeletons — multiple skeleton elements pulsing in unison imply they belong to the same content block
- staggered list animations — intentionally breaking common fate (slight delay per item) to reveal list structure
- scroll-linked animations — parallax layers at different speeds signal depth/layer separation
- selection feedback — selected items in a multi-select list share the same highlight animation on pick

## Quantitative
- **Practical Implication**: Synchronize animation timing (same duration + easing) for elements that are semantically related — desynchronize by 50-80ms per element to signal ordered sequence
- **Stagger Sweet Spot**: 20-40ms stagger between list items reads as 'same group, ordered sequence'; > 100ms stagger reads as unrelated individual items

## Counter Conditions
- prefers-reduced-motion: when motion is removed, common fate cues disappear — ensure static visual grouping (proximity, similarity) is sufficient on its own (@community/fact-reduced-motion-priority)
- Scroll jank or dropped frames desynchronize animations that should share common fate, breaking the grouping perception
- Parallax overuse: too many independent scroll speeds creates perceptual chaos rather than depth hierarchy

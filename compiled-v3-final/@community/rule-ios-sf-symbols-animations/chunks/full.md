# IosSfSymbolsAnimations [rule] v1.0.0
> Use the .symbolEffect() or .contentTransition(.symbolEffect) modifiers for SF Symbol state changes instead of conditional if/else swaps between symbol names.
domain: frontend-design

## Applies To
all SF Symbol state transitions in iOS 17+ apps (play/pause, loading/done, bookmarked/unbookmarked)

## Examples
- SwiftUI: Image(systemName: isPlaying ? 'pause.fill' : 'play.fill').contentTransition(.symbolEffect(.replace)).
- Bounce on tap: Image(systemName: 'star.fill').symbolEffect(.bounce, value: isFavorited).
- Verify: trigger the state change; transition must use native symbol morph, not a flat opacity crossfade.

## Rationale
Native symbol effects use hardware-optimized morphing unique to SF Symbols; manual if/else produces a jarring opacity crossfade. The symbolEffect API (iOS 17+) produces the system-standard symbol animations users see in Apple's own apps.

## Applies To
all SF Symbol state transitions in iOS 17+ apps (play/pause, loading/done, bookmarked/unbookmarked)

# IosSfSymbolsTabBar [rule] v1.0.0
> Tab bar icons must use SF Symbols; the selected tab displays the filled variant (e.g., 'house.fill') and unselected tabs display the outline variant (e.g., 'house').
domain: frontend-design

## Applies To
all tab bar item icon assignments in iOS apps

## Examples
- TabItem: selected → Image(systemName: 'house.fill'), unselected → Image(systemName: 'house').
- In SwiftUI TabView, set the .tabItem label with the correct symbol name per selected state — SwiftUI handles this via the selection binding.
- Verify: tap each tab; selected icon must be filled, all others must be outlined.

## Rationale
The fill/outline distinction is the iOS-native affordance for indicating selected state in tab bars. It is the pattern used consistently across all system apps (App Store, Music, Health, etc.) and is immediately understood by iOS users without additional visual cues.

## Applies To
all tab bar item icon assignments in iOS apps

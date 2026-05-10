# IosTabBarAlwaysVisible [rule] v1.0.0
> The tab bar must remain visible when pushing child views within a tab; never set hidesBottomBarWhenPushed = true or hide the tab bar programmatically during in-tab navigation.
domain: frontend-design

## Applies To
all iOS apps using a UITabBarController or SwiftUI TabView with navigation stacks inside each tab

## Examples
- Wrong: viewController.hidesBottomBarWhenPushed = true on a detail view pushed inside a tab.
- Correct: tab bar remains present at all push depths; detail views appear above it.
- Verify: navigate 3 levels deep within a tab; tab bar must still be visible and tappable.

## Rationale
Hiding the tab bar removes the user's primary orientation signal — they can no longer see which section they are in or switch to another section. This is cited as Anti-Pattern #9 in the HIG. iOS 18+ enforces tab bar visibility in NavigationSplitView contexts.

## Applies To
all iOS apps using a UITabBarController or SwiftUI TabView with navigation stacks inside each tab

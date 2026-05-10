# IosCustomFontDynamicType [rule] v1.0.0
> Custom fonts must be scaled with Dynamic Type by registering them via UIFontMetrics.scaled(for:) in UIKit or Font.custom(_:relativeTo:) in SwiftUI, anchored to a semantic text style.
domain: frontend-design

## Applies To
all non-system typefaces used in an iOS app

## Examples
- SwiftUI: Font.custom('BrandSans', size: 17, relativeTo: .body) — scales with the body text style.
- UIKit: UIFontMetrics(forTextStyle: .body).scaledFont(for: UIFont(name: 'BrandSans', size: 17)!).
- Verify: set Dynamic Type to a large size in Settings → Accessibility; custom-font text must grow proportionally.

## Rationale
Custom fonts that do not scale break accessibility for users who rely on larger text sizes. UIFontMetrics and Font.custom(_:relativeTo:) are the only correct hooks for propagating Dynamic Type scale to a non-system typeface.

## Applies To
all non-system typefaces used in an iOS app

# IosBoldTextSupport [check] v1.0.0
Verifies that custom-rendered text in an iOS app responds to the Bold Text accessibility setting. Standard SwiftUI text styles pass automatically; custom UIFont or manual font weight assignments must explicitly observe legibilityWeight.
domain: frontend-design

## Check Name
iOS Bold Text Accessibility Setting Observed

## Success Criterion
When Bold Text is enabled in Settings > Accessibility > Display & Text Size > Bold Text, all visible text in the app appears with a heavier font weight than the default.

## How To Verify
- Enable Bold Text: Settings → Accessibility → Display & Text Size → Bold Text (requires restart).
- Visually inspect every screen — all text must appear visibly bolder.
- In SwiftUI: check that custom .font() calls use UIFontMetrics-scaled fonts or read the @Environment(\.legibilityWeight) environment value.
- In UIKit: confirm that custom UIFont instances are recreated when UIContentSizeCategory.didChangeNotification fires and that boldWeight is respected.

## Fix Suggestion
In SwiftUI, read @Environment(\.legibilityWeight) and pass .bold weight when value == .bold. In UIKit, observe UIAccessibility.isBoldTextEnabled and switch to a heavier UIFont weight. Never hardcode a specific font weight that ignores this setting.

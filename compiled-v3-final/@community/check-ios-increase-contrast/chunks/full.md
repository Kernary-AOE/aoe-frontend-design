# IosIncreaseContrast [check] v1.0.0
Verifies that custom colors in an iOS app provide higher-contrast variants when the Increase Contrast accessibility setting is active. Semantic system colors handle this automatically; custom asset-catalog colors require an explicit 'High Contrast' variant.
domain: frontend-design

## Check Name
iOS Increase Contrast Accessibility Setting Observed

## Success Criterion
When Increase Contrast is enabled in Settings → Accessibility → Display & Text Size → Increase Contrast, all custom UI element colors shift to a higher-contrast version.

## How To Verify
- Enable Increase Contrast: Settings → Accessibility → Display & Text Size → Increase Contrast.
- Open the app and inspect all screens — custom text, border, icon, and background colors should appear with higher contrast than the default.
- In Xcode Assets.xcassets: each Color Set should have High Contrast variants in addition to Any/Dark.
- In SwiftUI, check for colorSchemeContrast == .increased usage where dynamic colors are computed in code.

## Fix Suggestion
In Assets.xcassets, select the Color Set → Attributes Inspector → Gamut: Any → Appearances: Any, Dark, Any (High Contrast), Dark (High Contrast). Provide a higher-contrast hex value for each high-contrast slot.

## Check Name
iOS Increase Contrast Accessibility Setting Observed

## Success Criterion
When Increase Contrast is enabled in Settings → Accessibility → Display & Text Size → Increase Contrast, all custom UI element colors shift to a higher-contrast version.

## How To Verify
- Enable Increase Contrast: Settings → Accessibility → Display & Text Size → Increase Contrast.
- Open the app and inspect all screens — custom text, border, icon, and background colors should appear with higher contrast than the default.
- In Xcode Assets.xcassets: each Color Set should have High Contrast variants in addition to Any/Dark.
- In SwiftUI, check for colorSchemeContrast == .increased usage where dynamic colors are computed in code.

## Fix Suggestion
In Assets.xcassets, select the Color Set → Attributes Inspector → Gamut: Any → Appearances: Any, Dark, Any (High Contrast), Dark (High Contrast). Provide a higher-contrast hex value for each high-contrast slot.

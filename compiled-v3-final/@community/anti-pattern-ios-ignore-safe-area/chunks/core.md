# IosIgnoreSafeArea [anti-pattern] v1.0.0
Using .ignoresSafeArea() on text labels, buttons, or any interactive element causes content to be clipped under the Dynamic Island, status bar notch, or home indicator on modern iPhones.
domain: frontend-design

## Label
iOS Applying ignoresSafeArea() to Content Views

## Why Bad
System chrome physically obscures content placed outside safe areas, making it unreachable or invisible. This is especially severe on iPhone 14/15/16 Pro models with the Dynamic Island, which sits higher than a standard notch. Apple HIG Rule 1.2 requires all interactive and readable content to stay within safe area boundaries.

## Instead Do
Apply .ignoresSafeArea() only to background fills, full-bleed decorative images, or edge-extending visuals. Never apply it to text, buttons, or any interactive element. In SwiftUI, use .ignoresSafeArea(.container, edges: .bottom) specifically on a background Color/Image, not on a VStack or Group containing content.

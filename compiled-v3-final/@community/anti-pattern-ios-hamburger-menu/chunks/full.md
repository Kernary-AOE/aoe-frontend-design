# IosHamburgerMenu [anti-pattern] v1.0.0
Using a hamburger (three-line) icon to reveal a hidden side-drawer navigation menu on iOS. This pattern violates iOS navigation conventions and severely reduces feature discoverability.
domain: frontend-design

## Label
iOS Hamburger / Hidden Side-Drawer Navigation

## Why Bad
Hidden navigation conflicts with iOS user expectations of visible, persistent navigation (tab bars, navigation bars). Users unfamiliar with the drawer pattern never discover sections behind it. It also competes with the system back-edge swipe gesture. Apple HIG explicitly forbids this pattern for iOS apps — Rule 2.2.

## Instead Do
Use a UITabBarController / SwiftUI TabView with 3–5 tab items for primary navigation. If there are more than 5 sections, the fifth tab becomes 'More' presenting a list sheet. For hierarchical content, use a navigation stack pushed from the root tab.

## Label
iOS Hamburger / Hidden Side-Drawer Navigation

## Why Bad
Hidden navigation conflicts with iOS user expectations of visible, persistent navigation (tab bars, navigation bars). Users unfamiliar with the drawer pattern never discover sections behind it. It also competes with the system back-edge swipe gesture. Apple HIG explicitly forbids this pattern for iOS apps — Rule 2.2.

## Instead Do
Use a UITabBarController / SwiftUI TabView with 3–5 tab items for primary navigation. If there are more than 5 sections, the fifth tab becomes 'More' presenting a list sheet. For hierarchical content, use a navigation stack pushed from the root tab.

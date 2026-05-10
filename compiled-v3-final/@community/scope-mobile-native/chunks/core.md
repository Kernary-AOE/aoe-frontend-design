# MobileNative [scope] v1.0.0
Defines applicability for atoms whose guidance applies only to native mobile apps — iOS (Swift, SwiftUI, UIKit) and Android (Kotlin, Jetpack Compose, View system). Web-only atoms (DOM, mouse, hover, viewport meta) are out of scope; cross-cutting atoms (a11y, i18n, performance) apply with platform-specific tooling.
domain: frontend-engineering

## Label
Native Mobile App Surfaces (iOS / Android)

## Preconditions
-
  - **Id**: platform-is-native
  - **Check**: code targets iOS (UIKit/SwiftUI) OR Android (Views/Compose) OR React Native / Flutter (cross-platform with native renderers)
  - **On Fail**: Atom does not apply to mobile web (browser-rendered). Use @community/scope-frontend-review for web.
-
  - **Id**: platform-tooling-installed
  - **Check**: Xcode (iOS) AND/OR Android Studio installed; running on real device or emulator/simulator
  - **On Fail**: Mobile-specific toolchains are required. Web simulators (Chrome DevTools mobile) do NOT cover platform-specific behaviors.
-
  - **Id**: platform-targets-current
  - **Check**: iOS deployment target ≥ iOS 16 (released Sept 2022) OR Android minSdk ≥ 26 (Android 8.0, August 2017)
  - **On Fail**: Older targets carry significant a11y and feature gaps. Document the cost; expect more polyfilling.

## Applies To
- iOS apps (UIKit, SwiftUI, AppKit if Catalyst)
- Android apps (Views, Jetpack Compose)
- React Native apps — mostly applicable, with platform-specific bridges
- Flutter apps — mostly applicable, with Skia-rendered UI
- Capacitor / Ionic — partially applicable; underlying webview makes it 'mobile web' for many concerns
- Native widgets / extensions (Today widgets, App Clips, instant apps)

## Out Of Scope
- Mobile-web responsive sites — use @community/scope-frontend-review
- PWA installed via Add-to-Home-Screen — bridges both, default to web scope
- Desktop apps (Electron, Tauri, AppKit) — separate scope

## Environment
- **Ios Runtime**: iOS 16+ recommended; Swift 5.9+; Xcode 15+
- **Android Runtime**: minSdk 26+ recommended (Android 8.0+); Kotlin 1.9+; Android Studio Hedgehog+
- **Cross Platform**: React Native 0.73+ (new architecture) OR Flutter 3.16+
- **Required Tooling**:
  - Xcode + Instruments OR Android Studio + Profiler
  - Real device for haptics/biometrics testing

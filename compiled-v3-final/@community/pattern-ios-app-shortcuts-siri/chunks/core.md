# IosAppShortcutsSiri [pattern] v1.0.0
Expose key app actions to Siri, Spotlight, and the Shortcuts app by implementing AppShortcutsProvider with AppIntent, phrases, shortTitle, and systemImageName — allowing users to invoke the action without opening the app.
domain: frontend-design

## Label
iOS App Shortcuts for Siri and Spotlight

## Problem
Power users cannot trigger frequent app actions from outside the app, requiring multiple taps to navigate to the feature each time.

## Solution
Implement AppShortcutsProvider conformance with one AppShortcut per key action. Define at least one Siri phrase with $(applicationName) substitution, a shortTitle, and a systemImageName. Use AppIntent to define the action logic.

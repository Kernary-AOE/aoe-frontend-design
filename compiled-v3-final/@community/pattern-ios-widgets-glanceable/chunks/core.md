# IosWidgetsGlanceable [pattern] v1.0.0
Provide WidgetKit widgets for frequently-checked app data surfaced on the home screen or lock screen; use AppIntent-powered Button/Toggle within widgets for one-tap interactive actions in iOS 17+.
domain: frontend-design

## Label
iOS Widgets for Glanceable Data

## Problem
Frequently-checked app data (step count, task count, score, timer) requires opening the full app just to glance at a single number, adding unnecessary friction.

## Solution
Implement a WidgetExtension using WidgetKit. Define a TimelineProvider that supplies timeline entries. Build widget views for small, medium, and large widget families. For iOS 17+, add interactive AppIntent actions using Button or Toggle inside the widget view so users can trigger a primary action (Start Workout, Complete Task) without opening the app.

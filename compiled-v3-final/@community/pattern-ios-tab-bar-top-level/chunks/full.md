# IosTabBarTopLevel [pattern] v1.0.0
Use a persistent bottom tab bar with 3–5 items (SF Symbol icon + label) for top-level section navigation on iPhone, providing direct access to each section and preserving state independently per tab.
domain: frontend-design

## Label
iOS Tab Bar for Top-Level Navigation

## Problem
Apps with multiple top-level sections need a persistent navigation affordance that users can recognize and reach with their thumb, without losing context in the current section.

## Solution
Implement TabView in SwiftUI (or UITabBarController in UIKit) with 3–5 Tab items. Each tab has a distinct SF Symbol and a short text label. Each tab independently maintains a NavigationStack. If there are more than 5 sections, make the fifth tab 'More' presenting a list sheet for overflow sections.

## Label
iOS Tab Bar for Top-Level Navigation

## Problem
Apps with multiple top-level sections need a persistent navigation affordance that users can recognize and reach with their thumb, without losing context in the current section.

## Solution
Implement TabView in SwiftUI (or UITabBarController in UIKit) with 3–5 Tab items. Each tab has a distinct SF Symbol and a short text label. Each tab independently maintains a NavigationStack. If there are more than 5 sections, make the fifth tab 'More' presenting a list sheet for overflow sections.

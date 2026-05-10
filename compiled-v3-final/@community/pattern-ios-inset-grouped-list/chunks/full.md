# IosInsetGroupedList [pattern] v1.0.0
The .insetGrouped style is the standard iOS visual treatment for grouped scrollable lists. Rows appear with inset edges and rounded corners on the group containers, aligned with system apps (Settings, Contacts, Reminders) and user expectations.
domain: frontend-design

## Label
iOS Inset Grouped List Style

## Problem
Plain-style lists or full-bleed grouped lists look out of place in modern iOS UIs (iOS 13+). Custom list implementations without inset grouping feel inconsistent with system apps and break visual harmony.

## Solution
Use List(.insetGrouped) in SwiftUI or UITableView.Style.insetGrouped in UIKit as the default for any grouped scrollable content. Set minimum row height to 44pt. Add swipe actions (leadingSwipeActions / trailingSwipeActions) for common row operations such as delete, archive, or flag.

## Label
iOS Inset Grouped List Style

## Problem
Plain-style lists or full-bleed grouped lists look out of place in modern iOS UIs (iOS 13+). Custom list implementations without inset grouping feel inconsistent with system apps and break visual harmony.

## Solution
Use List(.insetGrouped) in SwiftUI or UITableView.Style.insetGrouped in UIKit as the default for any grouped scrollable content. Set minimum row height to 44pt. Add swipe actions (leadingSwipeActions / trailingSwipeActions) for common row operations such as delete, archive, or flag.

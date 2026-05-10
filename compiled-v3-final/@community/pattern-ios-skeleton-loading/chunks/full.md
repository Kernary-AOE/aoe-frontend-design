# IosSkeletonLoading [pattern] v1.0.0
Show placeholder view structures matching the final content layout while async data is fetching, using .redacted(reason: .placeholder) in SwiftUI or custom grey-bar shapes — replacing them when real data arrives.
domain: frontend-design

## Label
iOS Skeleton Loading Views

## Problem
A blank screen or blocking ProgressView spinner during data fetch creates a jarring layout jump and gives users no sense of the content structure they are waiting for.

## Solution
Render the same view structure as the final content but with placeholder data. In SwiftUI, apply .redacted(reason: .placeholder) to a view populated with dummy data. Optionally add a shimmer animation (repeating linear gradient) for visual polish. Replace with real content by removing the .redacted modifier when data loads.

## Label
iOS Skeleton Loading Views

## Problem
A blank screen or blocking ProgressView spinner during data fetch creates a jarring layout jump and gives users no sense of the content structure they are waiting for.

## Solution
Render the same view structure as the final content but with placeholder data. In SwiftUI, apply .redacted(reason: .placeholder) to a view populated with dummy data. Optionally add a shimmer animation (repeating linear gradient) for visual polish. Replace with real content by removing the .redacted modifier when data loads.

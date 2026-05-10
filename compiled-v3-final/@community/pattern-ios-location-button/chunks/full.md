# IosLocationButton [pattern] v1.0.0
Use CoreLocationUI LocationButton with .currentLocation or .sendMyCurrentLocation title variant to grant one-time location access for a single action, bypassing the standard When-In-Use authorization flow.
domain: frontend-design

## Label
iOS LocationButton for One-Time Location Access

## Problem
Features that need the user's coordinates for a single action (find nearby stores, geotag a post) must request ongoing When-In-Use authorization, creating a privacy concern for users who don't want continuous tracking.

## Solution
Import CoreLocationUI and use LocationButton(action:) in SwiftUI (or CLLocationButton in UIKit). Set a title variant (.currentLocation, .sendMyCurrentLocation) and labelStyle (.titleAndIcon). On tap, the system grants one-time location access without displaying the standard authorization dialog. No CLLocationManager authorization call is needed.

## Label
iOS LocationButton for One-Time Location Access

## Problem
Features that need the user's coordinates for a single action (find nearby stores, geotag a post) must request ongoing When-In-Use authorization, creating a privacy concern for users who don't want continuous tracking.

## Solution
Import CoreLocationUI and use LocationButton(action:) in SwiftUI (or CLLocationButton in UIKit). Set a title variant (.currentLocation, .sendMyCurrentLocation) and labelStyle (.titleAndIcon). On tap, the system grants one-time location access without displaying the standard authorization dialog. No CLLocationManager authorization call is needed.

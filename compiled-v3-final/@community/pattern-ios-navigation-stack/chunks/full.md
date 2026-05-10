# IosNavigationStack [pattern] v1.0.0
Use NavigationStack with a NavigationPath binding and .navigationDestination(for:) modifiers for type-safe, programmatically-navigable push/pop hierarchies in iOS 16+.
domain: frontend-design

## Label
iOS NavigationStack for Hierarchical Content

## Problem
NavigationView (deprecated) provides no programmatic navigation API, making deep-linking and state restoration difficult. Custom navigation containers duplicate system behavior without swipe-back gesture support.

## Solution
Wrap root content in NavigationStack(path: $navigationPath). Use .navigationDestination(for: ItemType.self) to define push destinations. Control navigation programmatically by appending to or removing from navigationPath. For deep links, populate the path at app launch from the incoming URL or notification.

## Label
iOS NavigationStack for Hierarchical Content

## Problem
NavigationView (deprecated) provides no programmatic navigation API, making deep-linking and state restoration difficult. Custom navigation containers duplicate system behavior without swipe-back gesture support.

## Solution
Wrap root content in NavigationStack(path: $navigationPath). Use .navigationDestination(for: ItemType.self) to define push destinations. Control navigation programmatically by appending to or removing from navigationPath. For deep links, populate the path at app launch from the incoming URL or notification.

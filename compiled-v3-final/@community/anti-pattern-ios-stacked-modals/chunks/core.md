# IosStackedModals [anti-pattern] v1.0.0
Presenting a second .sheet or .fullScreenCover on top of an already-presented sheet, creating multiple layered modal contexts.
domain: frontend-design

## Label
iOS Stacked Modals (Sheet on Sheet)

## Why Bad
Users lose track of their position in the app when multiple sheets are stacked. Dismissal order is confusing — dismissing the top sheet may not return them where they expect. App navigation depth becomes unclear. Apple HIG Anti-Pattern #14 explicitly forbids this pattern.

## Instead Do
Use a NavigationStack inside a single sheet to handle multi-step flows within the same modal context. Each step pushes a new view on the stack rather than presenting a new sheet. The outer sheet has one cancel path; individual steps use the navigation back button.

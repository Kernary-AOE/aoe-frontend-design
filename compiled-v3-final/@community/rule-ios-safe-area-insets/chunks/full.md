# IosSafeAreaInsets [rule] v1.0.0
> Never place interactive or essential content under the status bar, Dynamic Island, or home indicator; respect UIEdgeInsets from safeAreaInsets / safeAreaLayoutGuide at all times.
domain: frontend-design

## Applies To
all content and interactive elements positioned in an iOS view

## Examples
- Verify on a physical iPhone 15 Pro or Dynamic Island Simulator: nothing clipped under the island or home indicator.
- Background fills may extend edge-to-edge; all text, buttons, and interactive elements must be inset.
- In SwiftUI: default safe area is automatically respected; only extend background with .ignoresSafeArea(.container) on Color or Image layers.

## Rationale
System chrome physically obscures content placed outside safe areas, making it unreachable or invisible. The Dynamic Island on iPhone 14 Pro and later occupies more vertical space than a standard notch and must be accounted for explicitly.

## Applies To
all content and interactive elements positioned in an iOS view

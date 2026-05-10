# IosVoiceoverLabels [rule] v1.0.0
> Every interactive element must have a descriptive .accessibilityLabel that communicates its purpose; icon-only buttons with no visible text are the most common failure case.
domain: frontend-design

## Applies To
all buttons, controls, images, and tappable elements in iOS views

## Examples
- Icon-only like button: .accessibilityLabel('Like').accessibilityHint('Double-tap to like this post').
- Image: Image('headerPhoto').accessibilityLabel('Mountain landscape at sunrise').
- Decorative image: Image('divider').accessibilityHidden(true).
- Verify: enable VoiceOver and navigate; every element must be announced with a clear, meaningful label.

## Rationale
Without labels, VoiceOver reads raw SF Symbol names (e.g., 'heart, image') or nothing at all, making the app completely unusable for blind users. This is a blocking accessibility requirement per WCAG 1.1.1 and Apple HIG Rule 5.1.

## Applies To
all buttons, controls, images, and tappable elements in iOS views

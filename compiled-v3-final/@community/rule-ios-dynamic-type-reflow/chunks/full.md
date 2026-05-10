# IosDynamicTypeReflow [rule] v1.0.0
> Layouts must reflow gracefully at Dynamic Type accessibility sizes (up to ~200% scale) so that essential text is never clipped or truncated.
domain: frontend-design

## Applies To
any iOS layout containing text alongside icons, images, or other elements in a row

## Examples
- An icon-label row should stack vertically (.accessibilityLarge+) when the label would otherwise truncate.
- Use .fixedSize(horizontal: false, vertical: true) in SwiftUI to let text expand vertically.
- Verify: set Dynamic Type to Accessibility Extra Large in Settings; confirm no text is truncated.

## Rationale
Millions of users rely on accessibility text sizes. Horizontal row layouts that clip text at large sizes make content unreadable and effectively exclude these users from the feature.

## Applies To
any iOS layout containing text alongside icons, images, or other elements in a row

# IosDynamicTypeSemantic [rule] v1.0.0
> Use semantic system text styles for all text; never specify hardcoded point sizes.
domain: frontend-design

## Applies To
all text elements in SwiftUI or UIKit iOS views

## Examples
- SwiftUI: .font(.body), .font(.headline), .font(.caption) — scales automatically.
- UIKit: UIFont.preferredFont(forTextStyle: .body) with adjustsFontForContentSizeCategory = true.
- Anti-example: .font(.system(size: 17)) or UIFont.systemFont(ofSize: 17) — hardcoded, ignores Dynamic Type.

## Rationale
Hardcoded point sizes ignore Dynamic Type and break accessibility for the millions of iOS users who increase or decrease text size in Settings. Semantic styles (.headline, .body, .caption, .footnote, etc.) scale proportionally across all Dynamic Type settings, including the five Larger Accessibility Sizes. Apple HIG source: Rule 3.1 — Use Built-in Text Styles; Anti-Pattern #6.

## Applies To
all text elements in SwiftUI or UIKit iOS views

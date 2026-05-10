# touch-target-size [metric] v1.0.0
The minimum interactive hit area for touch and pointer targets to be usable without accidental activation or difficulty. WCAG 2.2 SC 2.5.8 sets a 24×24 CSS px minimum with spacing rules; Apple and Google recommend higher targets for mobile.
domain: accessibility

## Unit
CSS pixels (width × height)

## Thresholds
-
  - **Level**: WCAG 2.2 AA (SC 2.5.8)
  - **Min Width**: 24px
  - **Min Height**: 24px
  - **Note**: OR the component offset from adjacent targets is enough that the 24px area (possibly including spacing) isn't reduced.
-
  - **Level**: Apple HIG recommended
  - **Min Width**: 44px
  - **Min Height**: 44px
  - **Note**: Minimum for comfortable single-finger tap on iOS; also Google Material 3 recommendation.
-
  - **Level**: Google Material 3 minimum
  - **Min Width**: 48px
  - **Min Height**: 48px
  - **Note**: Preferred size for Android interactive elements.

## Formula
target-width >= threshold AND target-height >= threshold

## Unit
CSS pixels (width × height)

## Thresholds
-
  - **Level**: WCAG 2.2 AA (SC 2.5.8)
  - **Min Width**: 24px
  - **Min Height**: 24px
  - **Note**: OR the component offset from adjacent targets is enough that the 24px area (possibly including spacing) isn't reduced.
-
  - **Level**: Apple HIG recommended
  - **Min Width**: 44px
  - **Min Height**: 44px
  - **Note**: Minimum for comfortable single-finger tap on iOS; also Google Material 3 recommendation.
-
  - **Level**: Google Material 3 minimum
  - **Min Width**: 48px
  - **Min Height**: 48px
  - **Note**: Preferred size for Android interactive elements.

## Formula
target-width >= threshold AND target-height >= threshold

# wcag-contrast-ratio [metric] v1.0.0
The WCAG-specified luminance contrast ratio between a foreground color and a background color. Used to assess whether text and UI components meet accessibility thresholds.
domain: accessibility

## Unit
ratio (unitless)

## Formula
(L1 + 0.05) / (L2 + 0.05)

## Variables
- **L1**: relative luminance of the lighter color (0.0–1.0)
- **L2**: relative luminance of the darker color (0.0–1.0)

## Sub Formula
- **Label**: relative-luminance
- **Description**: Per WCAG 2.2 definition of relative luminance from IEC 61966-2-1:1999
- **Body**:
  ```
        For each sRGB channel c in [R, G, B]:
          c_linear = c_srgb / 255
          if c_linear <= 0.04045:
            c_lin = c_linear / 12.92
          else:
            c_lin = ((c_linear + 0.055) / 1.055) ^ 2.4
        L = 0.2126 * R_lin + 0.7152 * G_lin + 0.0722 * B_lin
      
  ```

## Thresholds
-
  - **Level**: AA-normal-text
  - **Min**: 4.5
  - **Criterion**: @w3c/fact-wcag-contrast-aa
-
  - **Level**: AA-large-text
  - **Min**: 3
  - **Criterion**: @w3c/fact-wcag-contrast-aa
-
  - **Level**: AAA-normal-text
  - **Min**: 7
-
  - **Level**: AA-ui-component
  - **Min**: 3
  - **Criterion**: @w3c/fact-wcag-contrast-aa
-
  - **Level**: focus-ring
  - **Min**: 3
  - **Criterion**: @w3c/fact-wcag-focus-contrast

## Range
- **Min**: 1
- **Max**: 21

## Unit
ratio (unitless)

## Formula
(L1 + 0.05) / (L2 + 0.05)

## Variables
- **L1**: relative luminance of the lighter color (0.0–1.0)
- **L2**: relative luminance of the darker color (0.0–1.0)

## Sub Formula
- **Label**: relative-luminance
- **Description**: Per WCAG 2.2 definition of relative luminance from IEC 61966-2-1:1999
- **Body**:
  ```
        For each sRGB channel c in [R, G, B]:
          c_linear = c_srgb / 255
          if c_linear <= 0.04045:
            c_lin = c_linear / 12.92
          else:
            c_lin = ((c_linear + 0.055) / 1.055) ^ 2.4
        L = 0.2126 * R_lin + 0.7152 * G_lin + 0.0722 * B_lin
      
  ```

## Thresholds
-
  - **Level**: AA-normal-text
  - **Min**: 4.5
  - **Criterion**: @w3c/fact-wcag-contrast-aa
-
  - **Level**: AA-large-text
  - **Min**: 3
  - **Criterion**: @w3c/fact-wcag-contrast-aa
-
  - **Level**: AAA-normal-text
  - **Min**: 7
-
  - **Level**: AA-ui-component
  - **Min**: 3
  - **Criterion**: @w3c/fact-wcag-contrast-aa
-
  - **Level**: focus-ring
  - **Min**: 3
  - **Criterion**: @w3c/fact-wcag-focus-contrast

## Range
- **Min**: 1
- **Max**: 21

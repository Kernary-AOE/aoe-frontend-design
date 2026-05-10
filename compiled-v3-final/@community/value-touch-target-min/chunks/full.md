# touch-target-min [value] v1.0.0
domain: accessibility

## Constant
44px

## Type
css-length

## Usage
```
    /* Token */
    :root {
      --touch-target-min: 44px;  /* Apple HIG; pairs with Material 48px upgrade */
    }

    /* Apply to all interactive elements */
    button, a, input[type="checkbox"], input[type="radio"], [role="button"] {
      min-width: var(--touch-target-min);
      min-height: var(--touch-target-min);
    }

    /* Icon-only buttons: keep visual icon size at 24px, expand hit area to 44px via padding */
    .icon-button {
      width: 44px;
      height: 44px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    /* Inline text links inside body copy are exempt — their size is bounded by typography */
    p a {
      min-width: unset;
      min-height: unset;
    }
  
```

## Variants
- **WCAG 2.2 AA Floor**: 24px (with spacing rule)
- **Apple HIG**: 44pt (≈ 44px on 1× DPR)
- **Material 3**: 48dp (≈ 48px)
- **Comfortable Default**: 44px
- **Dense Desktop**: 32px (acceptable for mouse-primary, never for touch)

## Rationale
Apple's Human Interface Guidelines specify a minimum touch target of 44×44 CSS points for iOS interactive elements; Google Material 3 recommends 48×48dp on Android. WCAG 2.2 SC 2.5.8 sets a lower floor of 24×24 CSS px (with spacing exemptions), but 44px is the operating minimum for any product that targets touch as a primary modality. Using 44px as the default eliminates an entire class of mis-tap accessibility bugs and aligns with Fitts' Law: target acquisition time decreases as target size increases.

## Constant
44px

## Type
css-length

## Usage
```
    /* Token */
    :root {
      --touch-target-min: 44px;  /* Apple HIG; pairs with Material 48px upgrade */
    }

    /* Apply to all interactive elements */
    button, a, input[type="checkbox"], input[type="radio"], [role="button"] {
      min-width: var(--touch-target-min);
      min-height: var(--touch-target-min);
    }

    /* Icon-only buttons: keep visual icon size at 24px, expand hit area to 44px via padding */
    .icon-button {
      width: 44px;
      height: 44px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    /* Inline text links inside body copy are exempt — their size is bounded by typography */
    p a {
      min-width: unset;
      min-height: unset;
    }
  
```

## Variants
- **WCAG 2.2 AA Floor**: 24px (with spacing rule)
- **Apple HIG**: 44pt (≈ 44px on 1× DPR)
- **Material 3**: 48dp (≈ 48px)
- **Comfortable Default**: 44px
- **Dense Desktop**: 32px (acceptable for mouse-primary, never for touch)

## Supplies To
- @community/rule-touch-target-min

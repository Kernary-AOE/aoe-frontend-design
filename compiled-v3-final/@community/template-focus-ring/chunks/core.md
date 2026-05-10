# FocusRingBase [template] v1.0.0
A baseline focus ring CSS template that satisfies WCAG 2.2 SC 2.4.11. Use as the foundation for per-component focus customization.
domain: accessibility

## Language
css

## Body
```
    /* Focus ring — satisfies WCAG 2.2 SC 2.4.11 */
    /* Apply to your component's :focus-visible selector */

    :focus-visible {
      outline: {WIDTH} solid {COLOR};
      outline-offset: {OFFSET};
      border-radius: {RADIUS};

      /* Remove default browser style to avoid double ring */
      /* Do NOT add outline: none to :focus — only to :focus:not(:focus-visible) */
    }

    /* Optional: high-contrast mode enhancement */
    @media (forced-colors: active) {
      :focus-visible {
        outline: {WIDTH} solid ButtonText;
        outline-offset: {OFFSET};
      }
    }
  
```

## Example
- **Selector**: button.primary
- **Output**:
  ```
        button.primary:focus-visible {
          outline: 2px solid currentColor;
          outline-offset: 2px;
          border-radius: inherit;
        }
        @media (forced-colors: active) {
          button.primary:focus-visible {
            outline: 2px solid ButtonText;
            outline-offset: 2px;
          }
        }
      
  ```

# focus-outline-width [value] v1.0.0
domain: accessibility

## Constant
2px

## Type
css-length

## Usage
```
    /* Canonical focus ring pattern */
    :focus-visible {
      outline: 2px solid currentColor;  /* or a specific focus-ring token */
      outline-offset: 2px;
    }
  
```

## Rationale
WCAG 2.2 SC 2.4.11 specifies a minimum focus indicator area equivalent to a 2 CSS pixel perimeter. Using `outline-width: 2px` with `outline-offset: 2px` satisfies both the size and gap requirements while remaining visible on all background colors when combined with a 3:1 contrast ratio ring color.

## Constant
2px

## Type
css-length

## Usage
```
    /* Canonical focus ring pattern */
    :focus-visible {
      outline: 2px solid currentColor;  /* or a specific focus-ring token */
      outline-offset: 2px;
    }
  
```

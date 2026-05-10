# FocusIndicatorMinSize [constraint] v1.0.0
A focus indicator must enclose the component with a perimeter area of at least (component perimeter × 2 CSS pixels) and achieve 3:1 contrast against every adjacent color, meeting WCAG 2.2 SC 2.4.11 Focus Appearance (AA).
domain: frontend-design

## Target
CSS focus indicator (outline, box-shadow, or border)

## Severity
block

## Thresholds
- **Minimum Area**: indicator area ≥ component perimeter × 2px
- **Minimum Contrast**: 3:1 between focus indicator color and adjacent background / unfocused component color
- **Minimum Width**: 2px outline (practical interpretation of perimeter × 2px rule)
- **Offset**: outline-offset: 2px recommended to ensure indicator sits outside the component edge

## Rule
```
// Minimum compliant focus ring
:focus-visible {
outline: 2px solid oklch(60% 0.18 250); // high-chroma blue — check contrast against bg
outline-offset: 2px;
}

// For brand-colored buttons: invert the ring color
.btn-primary:focus-visible {
outline: 2px solid white;
outline-offset: 2px;
}
```

## Anti Patterns
- outline: 1px solid — single pixel hairline fails minimum width
- box-shadow focus ring inside overflow: hidden parent — clipped, invisible
- Focus ring same color as component background — contrast < 3:1
- outline: none with no replacement — WCAG 2.4.7 AND 2.4.11 failure

# TouchActionCss [rule] v1.0.0
> Use the CSS touch-action property to explicitly declare which browser-native touch gestures are permitted on interactive elements — never rely on browser defaults when building custom scroll containers, carousels, or canvas elements.
domain: frontend-design

## Severity
warning

## Applies When
- A carousel or horizontal scroll container should handle pan-x without triggering vertical page scroll
- A canvas or map element handles all gestures in JS and browser defaults must be suppressed
- A vertical scroll container must not be hijacked by horizontal swipe
- A custom drag target needs to separate its gesture from browser scroll

## Values
- **Pan Y**: Allow vertical scroll only — use on horizontal carousels
- **Pan X**: Allow horizontal scroll only — use on vertical scroll containers with horizontal sub-items
- **None**: All gestures to JS — use on canvas/map elements that own all touch handling
- **Manipulation**: Allow tap and pinch-to-zoom, no double-tap zoom delay — use on most interactive UI elements
- **Auto**: Browser default — only acceptable when you genuinely want all defaults

## Examples
- .carousel { touch-action: pan-x; }  /* horizontal swipe only — no vertical scroll hijack */
- .canvas-editor { touch-action: none; }  /* JS owns all touch events */
- .interactive-element { touch-action: manipulation; }  /* removes 300ms tap delay */
- Bad: .custom-drag-target {} with no touch-action — browser may start scrolling before JS drag fires

## Rationale
Without explicit touch-action declarations, browsers apply default gesture handling that can conflict with custom interaction logic: carousels hijack vertical scroll, canvas elements block all touch events, and horizontal scroll containers fight page scroll.

## Severity
warning

## Applies When
- A carousel or horizontal scroll container should handle pan-x without triggering vertical page scroll
- A canvas or map element handles all gestures in JS and browser defaults must be suppressed
- A vertical scroll container must not be hijacked by horizontal swipe
- A custom drag target needs to separate its gesture from browser scroll

## Values
- **Pan Y**: Allow vertical scroll only — use on horizontal carousels
- **Pan X**: Allow horizontal scroll only — use on vertical scroll containers with horizontal sub-items
- **None**: All gestures to JS — use on canvas/map elements that own all touch handling
- **Manipulation**: Allow tap and pinch-to-zoom, no double-tap zoom delay — use on most interactive UI elements
- **Auto**: Browser default — only acceptable when you genuinely want all defaults

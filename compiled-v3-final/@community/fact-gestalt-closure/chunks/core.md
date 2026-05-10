# GestaltClosure [fact] v1.0.0
Gestalt Principle of Closure (Wertheimer, 1923): the mind automatically completes incomplete shapes, perceiving a whole object even when parts of the boundary are missing.
> When presented with a set of incomplete visual elements, the brain fills in the missing information to perceive a complete, familiar shape or boundary. Closure allows designers to imply shapes and containers without drawing every line, reducing visual weight while maintaining structure.

## Confidence
proven

## Applies To
- carousel peeking — showing a partial card at the edge implies more content scrollable horizontally
- progress indicators — incomplete ring or bar implies a complete circular/linear track
- logo design — IBM 8-bar logo uses closure to imply the full letters
- icon design — outline icons with intentional gaps still read as closed shapes
- grid layouts — gutters imply the grid structure without drawn lines

## Quantitative
- **Practical Implication**: A carousel card cropped at ~20-30% of its width reliably communicates 'scroll for more' without explicit affordance labels
- **Rule Of Thumb**: Partial visibility works for closure only when the user has a mental model of what the complete shape should be

## Counter Conditions
- Closure fails when the incomplete shape is ambiguous and doesn't map to a familiar complete form — users see disconnected fragments, not a whole
- Too much incompleteness (< 30% visible) can prevent recognition — the brain needs enough cues to complete the shape
- In data visualizations, incomplete axes or truncated bar charts can mislead by implying a different scale

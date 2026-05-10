# SingleAccentColor [rule] v1.0.0
> A product's UI must use exactly one accent/tint color for all interactive affordances — buttons, links, toggles, active states, progress indicators, and focus rings — creating a consistent visual signal for interactivity across all surfaces.
domain: frontend-design

## Applies To
- primary buttons and CTA elements
- links and text-button affordances
- toggles, checkboxes, radio buttons, and sliders
- active navigation items and selection indicators
- progress bars and completion states
- focus rings on keyboard-interactive elements

## Counter Examples
- Blue CTAs, green success-state links, orange notification badges all appearing interactive — three accents create ambiguity
- Using the success-state green (#22c55e) on a primary 'Submit' button — semantic collision between action and feedback
- Card hover accent in purple, primary CTA in blue — dual interactive accent signal

## Severity
medium

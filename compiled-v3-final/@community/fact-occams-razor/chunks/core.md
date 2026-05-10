# OccamsRazor [fact] v1.0.0
Occam's Razor (William of Ockham, ~1320): among competing solutions with equal explanatory power, prefer the one with the fewest assumptions — in UX, favour the simpler interface unless complexity adds clear user value.
> William of Ockham's principle — 'entities should not be multiplied beyond necessity' — was formalised as a rule of parsimony in science and later adopted in design. In interface design, it translates to: remove any element, interaction, or feature whose absence does not reduce the interface's ability to serve its purpose. Every additional element competes for attention, increases load time, and introduces a new failure mode.

## Confidence
proven

## Applies To
- modal dialog content — strip to the single decision required; move supporting context to a help panel
- onboarding flow step count — remove any step that does not change the user's first-session outcome
- icon sets — remove decorative icons that duplicate adjacent text labels without adding scannability
- component API surface — expose the minimum props needed to cover documented use cases; hide implementation details

## Counter Conditions
- Simplicity for its own sake that removes user-required functionality is not parsimony — it is a feature cut disguised as design principle.
- Expert-facing tools (code editors, data pipelines) legitimately require high surface complexity; Occam's Razor applies at the layer level (simplify each panel), not the product level.
- Visual minimalism is not identical to Occam's Razor — a blank white screen is not simpler if users cannot complete their tasks; blank-space design must be evaluated by task completion, not pixel count.

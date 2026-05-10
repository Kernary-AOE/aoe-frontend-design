# Distinctiveness [principle] v1.0.0
> A designed artifact should be immediately distinguishable from the average output of the tools used to create it. If a design could have been produced by pressing 'generate' with no further thought, it has not been designed — it has been generated.
domain: visual-design

## Implications
- Type choice must be deliberate: blacklisted fonts (@impeccable/constraint-font-blacklist) signal unexamined defaults.
- Color palettes must be derived from brand intent, not framework defaults (@impeccable/anti-pattern-ai-slop-palette).
- Layout must use the grid in a considered way: column spans, typographic rhythm, and visual hierarchy should reflect the content's meaning.
- Motion must be purposeful: if an animation could be removed without information loss, remove it.

## Guides Tradeoffs
- @community/tradeoff-density-vs-comfort

## Anti Examples
- @impeccable/anti-pattern-ai-slop-palette
- @community/anti-pattern-outline-suppression

## Rationale
As AI tools flood the design space with competent-but-indistinguishable outputs, the value of craft shifts from technical execution (once a bottleneck) to intentional differentiation. A design that looks like every other LLM-generated UI communicates no brand identity and provides no trust signal to the user. Distinctiveness is not decoration — it is information.

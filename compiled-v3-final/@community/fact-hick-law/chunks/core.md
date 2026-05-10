# HickLaw [fact] v1.0.0
Hick's Law (1952): the time required to make a decision grows logarithmically with the number of equally probable choices, approximately T = b · log2(n+1).
> Decision time scales as approximately T = b · log2(n+1) where n is the number of equally probable, equally salient options — meaning each doubling of choices adds a constant unit of decision time, not a linear amount.

## Confidence
proven

## Applies To
- menu / navigation depth-vs-breadth decisions
- form field count + options-per-field
- command palette result count
- settings panel grouping

## Quantitative
- **Formula**: T = b · log2(n + 1)
- **Typical B**: ≈ 150 ms per bit (varies by task / familiarity)
- **Practical Implication**: going from 4 to 8 options adds ~150 ms decision time, not 4× the time

## Counter Conditions
- Not equally probable: when options have salience hierarchy (one obvious primary action), Hick's Law overstates the cost.
- Highly familiar options (often-used menu items) approach constant time — log scaling collapses.
- Visual / spatial chunking changes effective n (a grouped 3×3 grid behaves more like 3+3, not 9).
- Hick's Law concerns choice-reaction time only; complex decisions (cost-benefit) follow different curves.

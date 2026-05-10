# FittsLaw [fact] v1.0.0
Fitts's Law (1954): movement time to a target is a logarithmic function of the ratio of distance to target size, approximately MT = a + b · log2(D/W + 1).
> The time to acquire a target with a pointer is approximately MT = a + b · log2(D/W + 1), where D is the distance to the target and W is the target's width along the movement axis — bigger targets at shorter distances are faster, and the log scaling means small targets penalise heavily while small distance gains return little.

## Confidence
proven

## Applies To
- button size + spacing on touch UIs
- edge / corner targeting (infinite effective size — see Mac menu bar)
- icon-button hit areas
- drag-and-drop zone sizing
- menu item spacing

## Quantitative
- **Formula**: MT = a + b · log2(D/W + 1)
- **Practical Implication**: halving distance saves less time than doubling target size
- **Edge Targets**: screen-edge targets behave as if W = ∞ (cursor stops at the edge)
- **Minimum Mobile Target**: 44 × 44 CSS px (Apple HIG) / 48 × 48 dp (Material)

## Counter Conditions
- Touch input (no cursor-overshoot correction) follows Fitts's Law with different constants from mouse input.
- Multi-touch / gesture targets behave differently — Fitts's Law assumes a single point of acquisition.
- Fitts's Law concerns acquisition time, not perception or decision time — Hick's Law covers the latter.

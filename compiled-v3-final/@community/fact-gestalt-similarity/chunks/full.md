# GestaltSimilarity [fact] v1.0.0
Gestalt Principle of Similarity (Wertheimer, 1923): elements sharing visual properties — color, shape, size, texture — are perceived as related or belonging to the same category.
> The brain groups visual elements that share one or more physical attributes (color, shape, size, orientation, texture). Similarity grouping operates independently of spatial proximity — elements far apart but visually alike are still perceived as a set.

## Confidence
proven

## Applies To
- navigation bar — active vs inactive link states (color/weight similarity signals group membership)
- data table row striping (alternating background groups rows visually)
- icon families — consistent outline weight signals all icons belong to the same system
- button hierarchy — filled/ghost/text variants visually encode primary/secondary/tertiary groupings
- tag and badge systems — consistent pill shape groups all metadata elements

## Quantitative
- **Practical Implication**: Consistent color, shape, or size within a category reduces scanning time by signaling membership before the user reads text
- **Hierarchy Of Similarity**: Color > shape > size > texture in grouping strength for screen UIs

## Counter Conditions
- Overuse of similarity can cause false groupings — using the same blue for both interactive links and non-interactive brand illustrations confuses affordance
- When many attributes vary simultaneously (e.g., color AND shape AND size), the most salient dimension wins — the others become noise
- Accessibility: never rely on color similarity alone — add shape or label distinction for colorblind users (@community/anti-pattern-color-only-meaning)

## Sources

## Confidence
proven

## Source
- Max Wertheimer, 'Untersuchungen zur Lehre von der Gestalt II', Psychologische Forschung (1923)
- Wolfgang Köhler, 'Gestalt Psychology' (1929)
- lawsofux.com / Laws of UX

## Applies To
- navigation bar — active vs inactive link states (color/weight similarity signals group membership)
- data table row striping (alternating background groups rows visually)
- icon families — consistent outline weight signals all icons belong to the same system
- button hierarchy — filled/ghost/text variants visually encode primary/secondary/tertiary groupings
- tag and badge systems — consistent pill shape groups all metadata elements

## Quantitative
- **Practical Implication**: Consistent color, shape, or size within a category reduces scanning time by signaling membership before the user reads text
- **Hierarchy Of Similarity**: Color > shape > size > texture in grouping strength for screen UIs

## Counter Conditions
- Overuse of similarity can cause false groupings — using the same blue for both interactive links and non-interactive brand illustrations confuses affordance
- When many attributes vary simultaneously (e.g., color AND shape AND size), the most salient dimension wins — the others become noise
- Accessibility: never rely on color similarity alone — add shape or label distinction for colorblind users (@community/anti-pattern-color-only-meaning)

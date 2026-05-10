# ShallowNavigationDepth [constraint] v1.0.0
Navigation hierarchy depth must stay at 3 levels or fewer — pass: ≤3, warn: 4, block: ≥5.
domain: frontend-design

## Metric
navigation depth in levels

## Unit
count

## Pass
<= 3

## Warn
== 4

## Block
>= 5

## Mitigation
Use progressive disclosure, search, and breadcrumbs to replace deep nesting. Merge shallow sibling categories. Favor flat navigation when the product has ≤ 7 top-level destinations (see rule-navigation-flat-when-shallow).

## Examples
- Good: Dashboard → Projects → Project Detail (3 levels)
- Good: Settings → Account → Billing (3 levels — acceptable for settings depth)
- Warn: Site → Category → Sub-category → Item → Detail (4 levels — review structure)
- Block: Portal → Module → Section → Sub-section → Item → Sub-item (6 levels — restructure required)

## Rationale
Deep navigation hierarchies force users to memorize paths, increase the chance of getting lost, and multiply the clicks required to reach content. Every nesting level adds cognitive load and a click. Most products can be organized in 3 levels or fewer: top-nav → section → item.

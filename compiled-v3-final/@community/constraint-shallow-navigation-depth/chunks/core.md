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

# NavigationFlatWhenShallow [rule] v1.0.0
> When a product or section has ≤ 7 primary destinations, use flat top-level navigation (all items visible at once in a horizontal nav bar, tab bar, or sidebar list) rather than grouping them behind nested menus or accordions. Nesting structure that does not exist adds navigation overhead without benefit.
domain: frontend-design

## Label
Use Flat Navigation When the Structure is Shallow

## Applies When
designing primary navigation for any section with ≤ 7 top-level destinations

## Verify By
Count primary nav items. If ≤ 7, they should all be visible at the top level — no group headers or accordion wrappers needed.

## Threshold
7 items — use flat navigation; > 7 items — consider grouping with clear section headers

## Severity
warning

## Examples
- SaaS app with 5 sections (Dashboard, Projects, Team, Billing, Settings) → flat sidebar list, no accordions
- 6-tab admin panel → horizontal tab bar, all tabs visible simultaneously
- 3-item mobile nav → bottom tab bar with 3 icon+label tabs
- Bad: 5 items wrapped in 2 accordion groups 'Main' and 'Admin' — unnecessary nesting

## Rationale
Every level of nesting adds a click and a cognitive load unit. Hick's Law: decision time grows logarithmically with the number of choices. For shallow structures (≤ 7 items), flat navigation is faster and more discoverable than hierarchical nesting. Users can see all options simultaneously, applying recognition over recall.

## Label
Use Flat Navigation When the Structure is Shallow

## Applies When
designing primary navigation for any section with ≤ 7 top-level destinations

## Verify By
Count primary nav items. If ≤ 7, they should all be visible at the top level — no group headers or accordion wrappers needed.

## Threshold
7 items — use flat navigation; > 7 items — consider grouping with clear section headers

## Severity
warning

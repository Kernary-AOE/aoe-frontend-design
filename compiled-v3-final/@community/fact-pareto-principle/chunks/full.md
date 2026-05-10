# ParetoPrinciple [fact] v1.0.0
Pareto Principle (80/20 Rule, Vilfredo Pareto, 1896): roughly 80% of outcomes come from 20% of causes — in UX, ~80% of users rely on ~20% of features.
> Vilfredo Pareto observed that 80% of Italy's land was owned by 20% of the population; Joseph M. Juran generalised this to quality management and product design. In software, telemetry consistently shows that a small fraction of features drives the majority of usage — meaning interface real estate, performance investment, and design iteration should be concentrated on the high-frequency 20%, while low-frequency features are progressively disclosed or placed in secondary surfaces.

## Confidence
proven

## Applies To
- navigation and information architecture — surface the top 20% of tasks in primary nav; archive the rest
- settings and preferences screens — separate frequently changed settings from rarely touched advanced options
- performance optimisation — profile before optimising; the slowest 20% of paths account for most user-perceived slowness
- mobile app feature pruning — screen real estate is scarce; only the core 20% earns a bottom-tab slot

## Quantitative
- **Threshold**: 80/20 — approximately 80% of usage volume comes from 20% of features/paths
- **Practical Implication**: Run feature-usage analytics before every navigation redesign; the data almost always reveals a 80/20 split that should drive IA decisions
- **Related Metric**: feature utilisation rate from product analytics (Mixpanel, Amplitude); session-path frequency heatmaps

## Counter Conditions
- Safety-critical or compliance features must be accessible regardless of usage frequency — Pareto does not justify hiding mandatory functions.
- The 80/20 ratio is a heuristic, not a law — actual ratios in specific products may be 70/30 or 90/10; measure before assuming.
- New product launches lack usage data to apply Pareto; apply it retroactively as telemetry accumulates, not up-front during ideation.

## Sources

## Confidence
proven

## Source
- Pareto, V., 'Cours d'économie politique', Librairie Droz (1896) — original 80/20 wealth distribution observation
- Juran, J. M., 'Quality Control Handbook', McGraw-Hill (1951) — generalisation and coinage of 'Pareto Principle'
- Microsoft internal feature-usage telemetry (publicly cited by Jensen Harris, Office UX blog, 2006) — Word: 10 features used by >90% of users

## Applies To
- navigation and information architecture — surface the top 20% of tasks in primary nav; archive the rest
- settings and preferences screens — separate frequently changed settings from rarely touched advanced options
- performance optimisation — profile before optimising; the slowest 20% of paths account for most user-perceived slowness
- mobile app feature pruning — screen real estate is scarce; only the core 20% earns a bottom-tab slot

## Quantitative
- **Threshold**: 80/20 — approximately 80% of usage volume comes from 20% of features/paths
- **Practical Implication**: Run feature-usage analytics before every navigation redesign; the data almost always reveals a 80/20 split that should drive IA decisions
- **Related Metric**: feature utilisation rate from product analytics (Mixpanel, Amplitude); session-path frequency heatmaps

## Counter Conditions
- Safety-critical or compliance features must be accessible regardless of usage frequency — Pareto does not justify hiding mandatory functions.
- The 80/20 ratio is a heuristic, not a law — actual ratios in specific products may be 70/30 or 90/10; measure before assuming.
- New product launches lack usage data to apply Pareto; apply it retroactively as telemetry accumulates, not up-front during ideation.

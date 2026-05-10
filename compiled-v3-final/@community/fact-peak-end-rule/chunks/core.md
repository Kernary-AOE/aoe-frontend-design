# PeakEndRule [fact] v1.0.0
Peak-End Rule (Kahneman & Fredrickson, 1993): people judge an experience by its emotional peak and its ending, not by an average or sum of all moments.
> Psychological research shows that retrospective evaluations of an experience are dominated by two moments: the most intense emotional point (positive or negative) and how the experience ended. Duration, averaged quality, and intermediate steps contribute far less to remembered satisfaction — meaning a bad middle step is recoverable, but a bad ending is not.

## Confidence
proven

## Applies To
- multi-step checkout flows — ensure the final confirmation screen is polished and celebratory
- onboarding sequences — the last step (success state) sets the lasting impression
- error recovery flows — if a task must fail, end with a clear, empathetic resolution path
- offboarding / cancellation screens — a respectful exit can preserve brand goodwill

## Quantitative
- **Threshold**: N/A — no single numeric threshold; effect is ordinal (peak > end > average)
- **Practical Implication**: Invest disproportionate design effort in the most intense moment of a flow and its final screen
- **Related Metric**: post-task satisfaction surveys (CSAT, SUS) and NPS — detect if peaks are negative and endings are abrupt

## Counter Conditions
- For repeated, habitual tasks (e.g. daily login), familiarity suppresses the peak-end bias — users evaluate on efficiency, not emotional arc.
- Highly functional / transactional UIs (internal dashboards, data-entry tools) where users prioritize speed over experience satisfaction are less affected.
- The rule applies to remembered experience, not real-time experience — it does not justify making the middle of a flow deliberately bad.

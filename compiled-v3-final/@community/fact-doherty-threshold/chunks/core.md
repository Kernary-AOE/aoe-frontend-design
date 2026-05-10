# DohertyThreshold [fact] v1.0.0
Doherty Threshold (1982): productivity soars when both computer response time and user think time stay under 400 ms, enabling a continuous flow state.
> Walter Doherty and Ahrvind Thadani at IBM found that when a computer system responds within 400 ms, users remain engaged in a tight cognitive loop — thinking and acting nearly continuously. Above 400 ms, users break focus, start multi-tasking, or disengage entirely, causing disproportionate productivity loss beyond the raw latency added.

## Confidence
proven

## Applies To
- search-as-you-type / autocomplete — results must appear within 400 ms to prevent disengagement
- inline form validation — feedback must appear before the user has moved focus away
- command palette / spotlight-style launchers — any result latency above 400 ms breaks keyboard flow
- API-driven UI actions (save, publish, delete) — use optimistic updates when real response exceeds 400 ms

## Quantitative
- **Threshold**: 400 ms — system response time above which users break cognitive flow
- **Practical Implication**: Show a skeleton or optimistic update immediately; fire the actual request in parallel — never make users wait idly for sub-second operations
- **Related Metric**: Time to First Meaningful Paint (TTFMP), interaction latency (INP), and perceived response time via user testing

## Counter Conditions
- Destructive or irreversible actions (delete, publish to production) benefit from a deliberate pause — forcing 400 ms+ reduces accidental triggers.
- Background tasks (bulk export, report generation) operate outside the 400 ms loop; a progress indicator replaces the threshold.
- The threshold was derived from keyboard-driven terminal sessions; touch gestures on mobile may tolerate slightly longer feedback delays before feeling broken.

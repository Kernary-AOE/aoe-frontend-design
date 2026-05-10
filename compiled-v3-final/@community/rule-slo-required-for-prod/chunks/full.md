# SloRequiredForProd [rule] v1.0.0
Every user-facing service in production must publish at least one Service Level Objective (SLO) — a numeric target (99.9% / 99.95% / 99.99%) for a specific Service Level Indicator (SLI) measured over a rolling window (typically 28 or 30 days). No SLO = no production launch.
> An SLO is the contract between the service team and its users about how reliable the service must be. The SLO has three required components: (1) an SLI — the precise mathematical definition of 'good' (e.g. 'fraction of HTTP requests with status < 500 AND latency < 500ms p95'), (2) a target — the percentage that must be 'good' (99.9% / 99.95% / 99.99%), and (3) a window — the rolling time period (28 or 30 days). The SLO defines the 'error budget' = (1 − target) × window; consuming the budget too quickly triggers freeze policies; consuming it slowly buys headroom for risk-taking.
domain: ops-observability

## Applies To
- Every production HTTP/gRPC service with external or internal customers
- Batch pipelines (define SLO on freshness or completion-time)
- Asynchronous workers / queues (SLO on message-age or processing-rate)
- Mobile/desktop clients (SLO on crash-free sessions)
- Internal platforms (the platform team has SLOs FOR the product teams who consume it)

## Implementation Checklist
- SLI defined as a precise query against the metrics backend (PromQL, MQL, Datadog query) — not prose
- SLO target chosen from {99.9%, 99.95%, 99.99%} — extra nines = 10× harder; pick the lowest target the user need supports
- Rolling 28- or 30-day window (matches business cycle; avoids end-of-month resets)
- Error-budget burn-rate alerts at 1h-fast (14.4× burn) and 6h-slow (6× burn) — see Google SRE Workbook Ch.5
- SLO published in a centralised registry (Sloth, Pyrra, Datadog SLO Manager, OpenSLO YAML)
- Quarterly SLO review: was the target met? Was it too easy? Was it too hard? Adjust based on user signals
- Error-budget policy committed (rule-error-budget-policy.prime) — what happens when budget is exhausted

## Severity
block

## Counter Examples
- Service deployed with Datadog dashboards but no SLO. On-call alerts fire on 'error rate > 1%' — but is 1% bad? The team has no answer; they ack and move on. Reliability degrades imperceptibly.
- SLO defined as '100% uptime' — impossible target; ignored within weeks; reverts to no SLO.
- SLO defined as 'fast response times' (no number) — non-actionable; cannot drive decisions.
- Vague window: 'we aim for 99.9% in a typical month' — no formal start/end; impossible to measure adherence.

## Examples
- Google Cloud Spanner SLO: 99.999% availability for multi-region instances (5.26 minutes/year of downtime) — published; refunds offered if missed.
- Sloth (open-source): generate Prometheus recording + alerting rules from a YAML SLO spec — single source of truth.
- OpenSLO (CNCF, Nobl9 et al.): YAML schema for SLO definitions portable across vendors — alpha but stabilizing.
- GitHub status page exposes SLOs publicly: API requests target 99.9% availability over 28 days; visible to all customers.

## Rationale
Without an SLO, 'reliability' is a feeling. The team cannot decide whether to ship a feature, whether to roll back, or whether to invest in resilience work, because there is no shared definition of 'reliable enough'. The SLO converts reliability into a quantity that can be budgeted, traded against velocity, and used to align engineering, product, and SRE on the same target. Google's SRE Book is built around this primitive; AWS Well-Architected, Microsoft Azure Well-Architected, and the CNCF SLO Working Group all converge on the same model.

## Applies To
- Every production HTTP/gRPC service with external or internal customers
- Batch pipelines (define SLO on freshness or completion-time)
- Asynchronous workers / queues (SLO on message-age or processing-rate)
- Mobile/desktop clients (SLO on crash-free sessions)
- Internal platforms (the platform team has SLOs FOR the product teams who consume it)

## Implementation Checklist
- SLI defined as a precise query against the metrics backend (PromQL, MQL, Datadog query) — not prose
- SLO target chosen from {99.9%, 99.95%, 99.99%} — extra nines = 10× harder; pick the lowest target the user need supports
- Rolling 28- or 30-day window (matches business cycle; avoids end-of-month resets)
- Error-budget burn-rate alerts at 1h-fast (14.4× burn) and 6h-slow (6× burn) — see Google SRE Workbook Ch.5
- SLO published in a centralised registry (Sloth, Pyrra, Datadog SLO Manager, OpenSLO YAML)
- Quarterly SLO review: was the target met? Was it too easy? Was it too hard? Adjust based on user signals
- Error-budget policy committed (rule-error-budget-policy.prime) — what happens when budget is exhausted

## Severity
block

## Counter Examples
- Service deployed with Datadog dashboards but no SLO. On-call alerts fire on 'error rate > 1%' — but is 1% bad? The team has no answer; they ack and move on. Reliability degrades imperceptibly.
- SLO defined as '100% uptime' — impossible target; ignored within weeks; reverts to no SLO.
- SLO defined as 'fast response times' (no number) — non-actionable; cannot drive decisions.
- Vague window: 'we aim for 99.9% in a typical month' — no formal start/end; impossible to measure adherence.

## Derived From
@community/principle-three-pillars-observability

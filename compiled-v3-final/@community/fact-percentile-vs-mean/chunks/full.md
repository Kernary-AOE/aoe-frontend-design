# PercentileVsMean [fact] v1.0.0
Latency distributions in production systems are heavily right-skewed and multi-modal; the arithmetic mean hides tail behavior that high percentiles (p95, p99, p99.9) reveal. SLO targets must be defined on percentiles, never on the mean.
> Real-world request latencies are not normally distributed — they are heavy-tailed mixtures of fast cache hits, slower DB reads, occasional cold starts, and rare timeout-driven retries. The arithmetic mean is dominated by the bulk of fast requests and barely moves when the slow tail doubles. The p99 (or p99.9) directly measures the tail. A service with mean latency of 50ms and p99 of 2000ms has an awful experience for 1% of users (potentially the most-engaged ones, who make many requests). A service with mean latency of 80ms and p99 of 200ms is dramatically better, despite the mean being higher. Gil Tene's 'How NOT to Measure Latency' (2015 Strange Loop talk) is the canonical industry reference.
domain: ops-observability

## Confidence
strong

## Applies To
- Every user-facing service SLO — define on p95/p99/p99.9, never on mean or median
- Internal RPC latencies — fan-out services see the p99 of dependencies amplified to p50 of their own response (Tail at Scale effect)
- Database query latency — pgbouncer, mysql slow-log thresholds should be percentile-aware
- Job queue processing time — p99 latency hides tail of stuck jobs that the mean averages out
- Frontend Core Web Vitals — LCP, INP, CLS are reported at p75 by Google's CrUX dataset, never as mean

## Quantitative
- **P99 Vs Mean Typical Skew**: In production HTTP services, p99 is typically 5-50× the mean — a service with mean 50ms commonly has p99 250ms-2500ms
- **Tail At Scale Effect**: Dean & Barroso (2013): if a single backend has 1% chance of >1s response, a request fanning out to 100 backends has 63% chance of >1s — the slowest backend determines aggregate latency
- **Rare Event Impact On Engaged Users**: Power-law user activity: top 1% of users make 10-50% of requests; their experience is determined by the high percentiles, not the mean
- **Minimum Samples For P99**: Need at least 100 samples to estimate p99 with any confidence; 10,000 samples to get a stable estimate; aggregate windows must be sized accordingly

## Counter Conditions
- For some metrics — throughput, request count, total errors — the sum or rate IS the right aggregator; percentile is for distributional metrics like latency, queue depth, request size.
- Average latency is useful as a smoke-test sanity check (catches catastrophic 100× regressions) but never as an SLI.
- Percentile-of-percentiles is mathematically invalid — you cannot compute the 'p99 of multiple region p99s' as their average. Use HdrHistogram-style mergeable histograms (Datadog distribution metrics, Prometheus histogram type with `histogram_quantile`).
- Coordinated omission (Tene 2015): if your load generator pauses while waiting for a slow response, you under-report latency by 10-100×. Use Constant Throughput Mode (k6, wrk2, Gatling) to avoid this.
- Gauges and counters do NOT have percentiles; only histograms / summaries do. In Prometheus, use `histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))` — not `avg`.

## Sources

## Confidence
strong

## Source
- Gil Tene, 'How NOT to Measure Latency' (Strange Loop 2015 talk; also QCon NYC 2015) — coordinated omission and percentile interpretation
- Google SRE Book Chapter 6 — 'Monitoring Distributed Systems' — recommends percentile-based SLIs over averages
- Brendan Gregg, 'Systems Performance' (2nd ed. 2020), Chapter 2 — latency distributions and percentile semantics
- Jeff Dean & Luiz André Barroso, 'The Tail at Scale' (CACM Feb 2013) — at fan-out scale, p99 of subsystems determines mean of aggregate
- HdrHistogram (Tene, 2014) — open-source histogram library used by Datadog, Cassandra, Wavefront for accurate high-percentile measurement

## Applies To
- Every user-facing service SLO — define on p95/p99/p99.9, never on mean or median
- Internal RPC latencies — fan-out services see the p99 of dependencies amplified to p50 of their own response (Tail at Scale effect)
- Database query latency — pgbouncer, mysql slow-log thresholds should be percentile-aware
- Job queue processing time — p99 latency hides tail of stuck jobs that the mean averages out
- Frontend Core Web Vitals — LCP, INP, CLS are reported at p75 by Google's CrUX dataset, never as mean

## Quantitative
- **P99 Vs Mean Typical Skew**: In production HTTP services, p99 is typically 5-50× the mean — a service with mean 50ms commonly has p99 250ms-2500ms
- **Tail At Scale Effect**: Dean & Barroso (2013): if a single backend has 1% chance of >1s response, a request fanning out to 100 backends has 63% chance of >1s — the slowest backend determines aggregate latency
- **Rare Event Impact On Engaged Users**: Power-law user activity: top 1% of users make 10-50% of requests; their experience is determined by the high percentiles, not the mean
- **Minimum Samples For P99**: Need at least 100 samples to estimate p99 with any confidence; 10,000 samples to get a stable estimate; aggregate windows must be sized accordingly

## Counter Conditions
- For some metrics — throughput, request count, total errors — the sum or rate IS the right aggregator; percentile is for distributional metrics like latency, queue depth, request size.
- Average latency is useful as a smoke-test sanity check (catches catastrophic 100× regressions) but never as an SLI.
- Percentile-of-percentiles is mathematically invalid — you cannot compute the 'p99 of multiple region p99s' as their average. Use HdrHistogram-style mergeable histograms (Datadog distribution metrics, Prometheus histogram type with `histogram_quantile`).
- Coordinated omission (Tene 2015): if your load generator pauses while waiting for a slow response, you under-report latency by 10-100×. Use Constant Throughput Mode (k6, wrk2, Gatling) to avoid this.
- Gauges and counters do NOT have percentiles; only histograms / summaries do. In Prometheus, use `histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))` — not `avg`.

## Derived From
@community/principle-three-pillars-observability

# ThreePillarsObservability [principle] v1.0.0
A production system must emit three complementary signal types — metrics (numeric time-series, aggregable), logs (timestamped event records, contextual), and traces (causal request chains across services) — because each answers questions the others cannot.
> Metrics tell you what is happening at scale (RED, USE, four-golden-signals); logs tell you what happened in a specific event (errors, audit, debug); traces tell you why a request was slow or failed across service boundaries (causal path + per-span timing). Eliminate any one and a class of question becomes answerable only by guessing. Modern practice unifies emission via OpenTelemetry — single SDK, common attributes (service.name, trace_id, span_id), then routed to three backends (Prometheus/Mimir, Loki/ELK, Tempo/Jaeger) or one unified backend (Datadog, Honeycomb, Grafana).
domain: ops-observability

## Attributed To
Cindy Sridharan, 'Distributed Systems Observability' (O'Reilly 2018) — popularized the 'three pillars' framing; OpenTelemetry project (2019, merger of OpenTracing + OpenCensus).

## Applies To
- Every microservice or production application
- Cloud-managed services (RDS, ElastiCache, Kafka MSK) — infra metrics + slow-query logs + cross-service traces
- Mobile and web clients — RUM (real-user monitoring) extends traces to client-side; logs go to Sentry / Honeybadger
- Batch jobs, ETL pipelines — emit metrics on rows processed, logs on row-level errors, traces on stage timings
- Edge functions (Cloudflare Workers, Lambda@Edge) — same pillars apply; OpenTelemetry has runtimes for both

## Counter Examples
- Logs-only observability: every incident requires `grep -r ERROR | wc -l` — works for small services, breaks at >5 services or >100 RPS.
- Metrics-only: dashboard shows error rate spike at 14:32 — but no way to see the specific failing requests without traces or logs.
- Traces-only: per-request detail is rich, but no aggregate view of 'how many requests crossed our SLO this hour'.
- Three siloed teams (logs team, metrics team, traces team) without correlation IDs — each tool tells half the story; on-call assembles the rest by hand.

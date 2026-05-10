# BatchOnlyPipelines [anti-pattern] v1.0.0
Designing every data pipeline as a nightly (or hourly) batch job — typically Airflow + dbt + warehouse — when downstream use-cases require sub-minute freshness. The freshness ceiling becomes the batch interval, and there is no architectural seam to lower it.
domain: data-engineering

## Label
Batch-Only Data Pipelines

## Why Bad
Batch latency is a floor: a job that runs at 02:00 over yesterday's data is best-case 24h stale at noon, with no path to improve except 'run more often'. As 'more often' approaches the job's runtime, scheduler contention, partial-overlap races, and warehouse queue pressure compound. Operational metrics (fraud detection, inventory, personalization, alerting, churn intervention) all hit a wall: by the time the dashboard updates the customer is gone. Engineering teams hide the limitation by shipping increasingly absurd workarounds — micro-batches every 5 minutes, hand-cranked materialized views, ad-hoc Lambda 'streamers' bolted onto a batch core. None of it composes.

## Instead Do
Design pipelines as streaming-first with batch derivations layered on top. Source-of-truth events go through CDC or a typed event bus (Kafka, Pulsar). A streaming engine (Flink, Materialize, Risingwave, ksqlDB) maintains incrementally-updated aggregates with second-level latency. Periodic batch jobs become orthogonal: backfills, expensive joins, or reports that don't need freshness. The Lambda Architecture's two-tier model (batch + streaming) is a transitional pattern — Kappa Architecture (streaming as the single source) is the target where infra allows.

## Structure
```
    # WRONG — batch-only design
    Postgres → nightly Airflow `pg_dump` → S3 → warehouse → dbt → BI dashboard
    # Freshness floor: 24h. No seam to make it less.

    # WRONG — micro-batch as 'streaming'
    Airflow DAG triggers every 5 minutes — `INCREMENTAL` dbt model
    # Freshness ~5min, but scheduler contention spikes; partial overlap races on long runs.

    # CORRECT — streaming-first with batch derivations
    Postgres ─CDC→ Kafka ─Flink/Materialize→ KV store / OLAP store
                                           │
                                           ├→ second-level operational dashboards
                                           ├→ feature store (real-time features)
                                           └→ batch dbt models (joins, large aggregates) on top of warehouse

    # CORRECT — Kappa architecture (streaming-only)
    All sources → Kafka → Flink jobs → multiple sinks (warehouse, search, cache, KV)
    Backfill = replay from Kafka topic retention or tiered storage
  
```

# FeatureStore [pattern] v1.0.0
A centralized system that defines, computes, stores, serves, and versions features for ML models — providing a single source of truth so the same feature definition is used in offline training and online inference.
domain: machine-learning

## Facts

## Label
ML Feature Store

## Problem
Feature engineering accounts for 60-80% of ML engineering effort, yet feature code is typically duplicated: a Pandas snippet in a training notebook, a SQL view in the warehouse, a Java function in the serving service. The duplications drift out of sync, producing train-serve skew (predictions degrade silently in production) and making feature reuse across models a copy-paste exercise. Features computed today have no point-in-time-correct join semantics — training labels easily leak future information.

## Solution
Define each feature once as a versioned, declarative spec (source dataset + transformation + entity + timestamp + freshness SLO). The feature store dual-materializes the spec to (a) an offline store (parquet on S3 / GCS, or warehouse table) for batch training joins with point-in-time correctness, and (b) an online store (Redis, DynamoDB, ScyllaDB) for low-latency lookup at inference. A feature-retrieval API serves both worlds with the same SDK call.

## Structure
```
    # Topology
              ┌──────────────── Feature Definition (versioned spec) ───────────────┐
              │  @feature_view(entities=[user], ttl=timedelta(days=30))            │
              │  def avg_txn_30d(df): return df.groupby('user').amount.mean()     │
              └────────────────────┬───────────────────────────────────────────────┘
                                   │
                ┌──────────────────┼──────────────────────────┐
                ▼                  ▼                          ▼
         [Offline materialize]  [Online materialize]   [Documentation]
                │                  │
                ▼                  ▼
         [Parquet on S3]      [Redis / DynamoDB]
         (training joins,    (5ms lookup at
          backfills)          inference)

    # Feast example — feature definition
    from feast import Entity, FeatureView, Field, FileSource
    from datetime import timedelta

    user = Entity(name='user_id', value_type=ValueType.INT64)

    user_stats_source = FileSource(
        path='s3://features/user_stats.parquet',
        timestamp_field='event_timestamp',
    )

    user_stats_view = FeatureView(
        name='user_stats',
        entities=[user],
        ttl=timedelta(days=30),
        schema=[
            Field(name='avg_txn_30d',  dtype=Float32),
            Field(name='ntxn_30d',     dtype=Int32),
        ],
        source=user_stats_source,
    )

    # Training-time retrieval (point-in-time correct)
    training_df = store.get_historical_features(
        entity_df=labels_df,           # has user_id + event_timestamp + label
        features=['user_stats:avg_txn_30d', 'user_stats:ntxn_30d'],
    ).to_df()
    # → joined AS-OF event_timestamp (no future leakage)

    # Inference-time retrieval (online)
    features = store.get_online_features(
        features=['user_stats:avg_txn_30d', 'user_stats:ntxn_30d'],
        entity_rows=[{'user_id': 42}],
    ).to_dict()
    # → 5-10ms p99 lookup
  
```

# CdcChangeDataCapture [pattern] v1.0.0
Replicate a source-of-truth OLTP database to one or more downstream systems (data warehouse, search index, cache, replica) by tailing the database's transaction log rather than running periodic SELECT batches.
domain: data-engineering

## Facts

## Label
Change Data Capture (CDC)

## Problem
Polling a source database with `SELECT * WHERE updated_at > $last_seen` is O(N) per poll, misses hard deletes (rows are gone — no row to find), and lags behind the source by the polling interval. Dual-writes (app writes to DB AND to Kafka) split-brain on partial failures.

## Solution
Stream the database's redo/WAL log directly. Postgres logical replication, MySQL binlog, MongoDB oplog, Oracle redo log — each emits an ordered sequence of (operation, before, after) tuples. A CDC connector (Debezium is the canonical implementation) reads the log and publishes typed events to Kafka, preserving order and including delete operations.

## Structure
```
    # Topology
    [Postgres (source-of-truth)]
        │  WAL (logical replication slot)
        ▼
    [Debezium connector]  →  [Kafka topic: db.public.orders]
                                       │
                       ┌───────────────┼─────────────────┐
                       ▼               ▼                 ▼
                [Snowflake sink]  [OpenSearch]      [Redis cache]

    # Postgres setup
    ALTER SYSTEM SET wal_level = logical;
    SELECT pg_create_logical_replication_slot('debezium_slot', 'pgoutput');
    CREATE PUBLICATION debezium_pub FOR TABLE orders, customers, line_items;

    # Debezium connector config (Kafka Connect)
    {
      "name": "orders-cdc",
      "config": {
        "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
        "database.hostname":  "primary.db",
        "database.dbname":    "shop",
        "publication.name":   "debezium_pub",
        "slot.name":          "debezium_slot",
        "topic.prefix":       "db",
        "schema.history.internal.kafka.bootstrap.servers": "kafka:9092",
        "tombstones.on.delete": "true"
      }
    }

    # Outbox pattern variant — explicit events table inside the source DB
    CREATE TABLE outbox (
      id          UUID PRIMARY KEY,
      aggregate   TEXT NOT NULL,
      event_type  TEXT NOT NULL,
      payload     JSONB NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    -- App writes business row + outbox row in same TX → Debezium emits outbox rows
  
```

## Examples
- Stripe: every Postgres mutation flows through Debezium → Kafka → analytic store; the same stream populates Stripe's audit log and search index.
- Netflix DBLog: bespoke MySQL CDC engine that does dual-purpose snapshots + tail without holding row locks — published as the open-source DBLog framework.
- Outbox-only pattern at LinkedIn: services write business events to a local `event_outbox` table inside the same transaction as the business write; Brooklin (LinkedIn's CDC) ships them to Kafka.

## Label
Change Data Capture (CDC)

## Problem
Polling a source database with `SELECT * WHERE updated_at > $last_seen` is O(N) per poll, misses hard deletes (rows are gone — no row to find), and lags behind the source by the polling interval. Dual-writes (app writes to DB AND to Kafka) split-brain on partial failures.

## Solution
Stream the database's redo/WAL log directly. Postgres logical replication, MySQL binlog, MongoDB oplog, Oracle redo log — each emits an ordered sequence of (operation, before, after) tuples. A CDC connector (Debezium is the canonical implementation) reads the log and publishes typed events to Kafka, preserving order and including delete operations.

## Structure
```
    # Topology
    [Postgres (source-of-truth)]
        │  WAL (logical replication slot)
        ▼
    [Debezium connector]  →  [Kafka topic: db.public.orders]
                                       │
                       ┌───────────────┼─────────────────┐
                       ▼               ▼                 ▼
                [Snowflake sink]  [OpenSearch]      [Redis cache]

    # Postgres setup
    ALTER SYSTEM SET wal_level = logical;
    SELECT pg_create_logical_replication_slot('debezium_slot', 'pgoutput');
    CREATE PUBLICATION debezium_pub FOR TABLE orders, customers, line_items;

    # Debezium connector config (Kafka Connect)
    {
      "name": "orders-cdc",
      "config": {
        "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
        "database.hostname":  "primary.db",
        "database.dbname":    "shop",
        "publication.name":   "debezium_pub",
        "slot.name":          "debezium_slot",
        "topic.prefix":       "db",
        "schema.history.internal.kafka.bootstrap.servers": "kafka:9092",
        "tombstones.on.delete": "true"
      }
    }

    # Outbox pattern variant — explicit events table inside the source DB
    CREATE TABLE outbox (
      id          UUID PRIMARY KEY,
      aggregate   TEXT NOT NULL,
      event_type  TEXT NOT NULL,
      payload     JSONB NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    -- App writes business row + outbox row in same TX → Debezium emits outbox rows
  
```

## Derived From
@community/principle-idempotent-writes

## Compatible
- @community/rule-event-schema-versioning

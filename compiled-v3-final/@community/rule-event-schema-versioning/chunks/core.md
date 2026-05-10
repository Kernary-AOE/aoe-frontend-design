# EventSchemaVersioning [rule] v1.0.0
Every event published to a stream (Kafka topic, Pulsar topic, Kinesis stream) must carry an explicit schema identifier and version. Consumers must reject events whose schema is unknown rather than fall back to best-effort parsing.
> Producer payloads must embed `schema_id` and `schema_version` (or use Confluent Schema Registry's wire-format magic byte + 4-byte schema id). Schemas evolve under either FORWARD or BACKWARD compatibility — never both at once on the same topic. Breaking changes go on a new topic or new version with explicit migration.
domain: data-engineering

## Applies To
- Kafka topics (Avro + Schema Registry, Protobuf + Buf Schema Registry, JSON Schema)
- Pulsar / Kinesis / Pub/Sub event streams
- Webhooks (publisher must version payloads — `application/vnd.example.event.v2+json`)
- CDC streams (Debezium, Maxwell — schemas change with table DDL)
- Internal RPC payloads stored as events for replay

## Implementation Checklist
- Every published event contains schema_id (or registry magic byte) and schema_version
- CI step: `buf breaking` (Protobuf) or schema-registry compatibility check blocks PRs that violate compatibility mode
- Compatibility mode declared per topic — BACKWARD (default for consumers reading old data) or FORWARD (default for producers emitting new data)
- Field deprecation requires reservation: `reserved 5;` (proto) or marking field optional + comment, never reuse field number
- Major version bumps go on a new topic name (orders.v1 → orders.v2) — never re-use the topic for a breaking change
- Consumers log unknown-schema events to DLQ and emit a `schema_unknown_total` metric — never silently drop

## Severity
block

## Counter Examples
- Producer emits raw JSON `{user_id: 1, name: 'Alice'}`. Consumer parses with `json.parse`. Producer team renames `name` → `full_name`. Consumer's `event.name` is now undefined; downstream warehouse loads NULLs for two weeks before someone notices.
- Topic mixes V1 and V2 events with no version field. Consumer code branches on field presence — fragile, expensive to maintain, breaks when V3 lands.

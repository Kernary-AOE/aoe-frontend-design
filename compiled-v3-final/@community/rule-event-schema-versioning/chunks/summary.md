# EventSchemaVersioning [rule] v1.0.0
Every event published to a stream (Kafka topic, Pulsar topic, Kinesis stream) must carry an explicit schema identifier and version. Consumers must reject events whose schema is unknown rather than fall back to best-effort parsing.
> Producer payloads must embed `schema_id` and `schema_version` (or use Confluent Schema Registry's wire-format magic byte + 4-byte schema id). Schemas evolve under either FORWARD or BACKWARD compatibility — never both at once on the same topic. Breaking changes go on a new topic or new version with explicit migration.
domain: data-engineering

# IdempotentWrites [principle] v1.0.0
Every write to a downstream system (database, queue, API, blob store) must be safely retryable: re-applying the same operation N times must produce exactly the same observable state as applying it once. In distributed systems, retries are inevitable — at-least-once delivery is the default.
> Producers must attach a stable idempotency key (UUID, business-event-id, deterministic hash) to every write. Consumers must deduplicate by key before applying side effects, and the deduplication window must exceed the maximum retry horizon of any upstream client. Naked INSERTs, fire-and-forget HTTP POSTs, and counter-increment operations without compensating logic are forbidden in any pipeline that can retry.
domain: data-engineering

## Attributed To
Pat Helland, 'Idempotence Is Not a Medical Condition' (ACM Queue 2012); Stripe API idempotency-key spec.

## Applies To
- HTTP POST/PUT/PATCH endpoints that mutate state
- Queue consumers (Kafka, SQS, RabbitMQ) — at-least-once delivery is default
- ETL pipelines writing to data warehouses (Snowflake MERGE, BigQuery MERGE)
- Webhooks (sender will retry on 5xx or timeout)
- Cross-system replication (CDC sinks, search indexers)
- Payment processing — double-charge is the canonical failure mode

## Counter Examples
- INSERT INTO charges (amount, user_id) VALUES (...) without a natural key — retry on timeout creates a duplicate charge; user is billed twice.
- Counter increment: `UPDATE accounts SET balance = balance - 100 WHERE id = ?` retried twice deducts 200; must be reframed as a ledger insert keyed by transaction_id.
- Email send via SendGrid without an idempotency key: retry on 504 gateway timeout sends the email twice; recipient receives two copies.
- Webhook handler that enqueues a job on every delivery — sender retries 3x on a flapping endpoint, three jobs run, three side effects occur.

## Sources

## Examples
- Stripe charges API: client supplies `Idempotency-Key: order_42_attempt_1`; if Stripe has already processed that key in the last 24h, it returns the original Charge object instead of creating a second charge.
- Database UPSERT: `INSERT ... ON CONFLICT (event_id) DO NOTHING` — the natural key (event_id) carries the idempotency contract; retries are no-ops.
- Kafka consumer + transactional outbox: each message has an offset; consumer writes (event_id, payload) into a dedup table inside the same transaction as the side-effect write, rolling back both on failure.
- S3 PutObject: keyed by object name — re-uploading the same object replaces it byte-for-byte; the operation is naturally idempotent on the API level.

## Relations
requires: @community/anti-pattern-batch-only-pipelines

## Source
- Pat Helland, 'Idempotence Is Not a Medical Condition', ACM Queue Vol. 10 No. 4 (April 2012)
- Stripe API reference — `Idempotency-Key` header, 24-hour retention window
- AWS SQS FIFO documentation — `MessageDeduplicationId` and 5-minute deduplication interval
- Designing Data-Intensive Applications, Martin Kleppmann (2017), Chapter 8 — 'Trouble with Distributed Systems'

## Requires
@community/anti-pattern-batch-only-pipelines

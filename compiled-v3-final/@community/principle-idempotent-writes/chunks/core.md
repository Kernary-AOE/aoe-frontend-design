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

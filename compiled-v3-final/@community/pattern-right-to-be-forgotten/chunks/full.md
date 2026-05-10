# RightToBeForgotten [pattern] v1.0.0
An end-to-end deletion architecture that fulfills GDPR Article 17 'right to erasure' (and CCPA §1798.105 right to delete) within the legally-required window. A user request flows through identity verification, system-of-record purge, downstream propagation, and verifiable completion.
domain: legal-compliance

## Facts

## Label
Right to Erasure / DSAR Deletion Endpoint

## Problem
Most production systems treat deletion as 'soft delete' (set `deleted_at` timestamp) for engineering convenience: undo is easy, joins still work, audit trail preserved. GDPR Art. 17 demands actual erasure within one month (extendable to three for complex cases) across every system that received the personal data — primary DB, replicas, search index, analytics warehouse, backups, third-party processors, log aggregation, ML training sets. Without an architectural pattern, each new system becomes a manual ticket and the team eventually misses the deadline.

## Solution
A deletion request enters a single 'erasure orchestrator' that (1) verifies identity (signed-in session + re-auth, or notarized request for non-customers), (2) emits a typed `UserErasureRequested` event to a deletion topic, (3) every system that holds personal data has a registered erasure-handler that subscribes and acks within an SLO, (4) the orchestrator tracks ack-by-system and publishes completion to the user. Backups follow a delayed-erasure scheme: tombstone is replayed on backup restore. Audit log entries themselves are retained (legitimate-interest basis) but with PII tokenized to satisfy minimisation.

## Structure
```
    # Topology
    [User submits erasure request]
       │
       ▼
    [Privacy portal] → identity verification (SCA + cooling-off)
       │
       ▼
    [Erasure orchestrator service]
       │  publishes:  UserErasureRequested { user_id, request_id, deadline }
       ▼
    [Kafka topic: privacy.erasure.requested]
       │
       ├──→ [Primary OLTP service]    → DELETE rows; ack with row count
       ├──→ [Search index service]    → delete by user_id; ack
       ├──→ [Warehouse PII vault]     → tombstone token; ack
       ├──→ [Email/SMS provider]      → API call: DELETE /contacts/{id}; ack
       ├──→ [Log aggregator]          → mark for purge on next compaction; ack
       ├──→ [ML feature store]        → delete entity rows; trigger retrain flag
       └──→ [Backup catalog]          → record tombstone for replay-on-restore

    # Erasure handler contract (each service)
    @erasure_handler(topic='privacy.erasure.requested')
    def handle_erasure(event: UserErasureRequested) -> ErasureAck:
        deleted_rows = db.execute(
            'DELETE FROM ... WHERE user_id = :uid',
            {'uid': event.user_id}
        )
        return ErasureAck(
            request_id=event.request_id,
            service='primary-oltp',
            rows_affected=deleted_rows,
            completed_at=now(),
        )

    # User-facing status endpoint
    GET /privacy/requests/{request_id}
    →
    {
      "request_id": "dsar_abc123",
      "submitted_at": "2026-05-01T10:00:00Z",
      "deadline":    "2026-06-01T10:00:00Z",
      "status":      "in_progress",
      "systems": [
        {"name": "primary-oltp",   "status": "completed", "completed_at": "..."},
        {"name": "search-index",   "status": "completed", "completed_at": "..."},
        {"name": "warehouse",      "status": "completed", "completed_at": "..."},
        {"name": "ml-feature-store","status": "in_progress"},
        {"name": "backups",        "status": "tombstoned (replay-on-restore)"}
      ]
    }
  
```

## Examples
- Apple Privacy Portal (privacy.apple.com): single self-serve flow for download, correction, deletion across all Apple services; status dashboard with per-service progress.
- Google's MyAccount → 'Delete your account' → 60-day cooling-off, then cascade across Gmail, Drive, Search history, YouTube, Ads, ML training corpora.
- Stripe DSAR API: programmatic deletion endpoint for connected accounts; emits webhook on completion.
- Skyflow Vault: PII stored once, tokenized everywhere — erasure is a single vault delete that invalidates all downstream tokens.

## Label
Right to Erasure / DSAR Deletion Endpoint

## Problem
Most production systems treat deletion as 'soft delete' (set `deleted_at` timestamp) for engineering convenience: undo is easy, joins still work, audit trail preserved. GDPR Art. 17 demands actual erasure within one month (extendable to three for complex cases) across every system that received the personal data — primary DB, replicas, search index, analytics warehouse, backups, third-party processors, log aggregation, ML training sets. Without an architectural pattern, each new system becomes a manual ticket and the team eventually misses the deadline.

## Solution
A deletion request enters a single 'erasure orchestrator' that (1) verifies identity (signed-in session + re-auth, or notarized request for non-customers), (2) emits a typed `UserErasureRequested` event to a deletion topic, (3) every system that holds personal data has a registered erasure-handler that subscribes and acks within an SLO, (4) the orchestrator tracks ack-by-system and publishes completion to the user. Backups follow a delayed-erasure scheme: tombstone is replayed on backup restore. Audit log entries themselves are retained (legitimate-interest basis) but with PII tokenized to satisfy minimisation.

## Structure
```
    # Topology
    [User submits erasure request]
       │
       ▼
    [Privacy portal] → identity verification (SCA + cooling-off)
       │
       ▼
    [Erasure orchestrator service]
       │  publishes:  UserErasureRequested { user_id, request_id, deadline }
       ▼
    [Kafka topic: privacy.erasure.requested]
       │
       ├──→ [Primary OLTP service]    → DELETE rows; ack with row count
       ├──→ [Search index service]    → delete by user_id; ack
       ├──→ [Warehouse PII vault]     → tombstone token; ack
       ├──→ [Email/SMS provider]      → API call: DELETE /contacts/{id}; ack
       ├──→ [Log aggregator]          → mark for purge on next compaction; ack
       ├──→ [ML feature store]        → delete entity rows; trigger retrain flag
       └──→ [Backup catalog]          → record tombstone for replay-on-restore

    # Erasure handler contract (each service)
    @erasure_handler(topic='privacy.erasure.requested')
    def handle_erasure(event: UserErasureRequested) -> ErasureAck:
        deleted_rows = db.execute(
            'DELETE FROM ... WHERE user_id = :uid',
            {'uid': event.user_id}
        )
        return ErasureAck(
            request_id=event.request_id,
            service='primary-oltp',
            rows_affected=deleted_rows,
            completed_at=now(),
        )

    # User-facing status endpoint
    GET /privacy/requests/{request_id}
    →
    {
      "request_id": "dsar_abc123",
      "submitted_at": "2026-05-01T10:00:00Z",
      "deadline":    "2026-06-01T10:00:00Z",
      "status":      "in_progress",
      "systems": [
        {"name": "primary-oltp",   "status": "completed", "completed_at": "..."},
        {"name": "search-index",   "status": "completed", "completed_at": "..."},
        {"name": "warehouse",      "status": "completed", "completed_at": "..."},
        {"name": "ml-feature-store","status": "in_progress"},
        {"name": "backups",        "status": "tombstoned (replay-on-restore)"}
      ]
    }
  
```

## Derived From
@community/principle-data-minimization

## Compatible
- @community/rule-cookie-consent-banner

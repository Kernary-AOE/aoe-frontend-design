# PiiTokenization [fact] v1.0.0
Personally identifiable information (PII) — SSN, full name, email, phone, payment card, government ID, biometric — must be replaced with non-reversible tokens at the system boundary; downstream systems operate exclusively on tokens. Real PII lives only in a hardened vault with strict access controls and an audit log.
> PCI-DSS, HIPAA, and GDPR Article 32 ('appropriate technical measures, such as pseudonymisation') all converge on the same architectural primitive: tokenization. The original PII is stored once, in a vault with HSM-backed encryption and per-record audit. Every other system — analytics, logs, search index, ML training set, vendor integration — receives a token (e.g. `tok_card_8a3f...`) that maps back to the PII only via an authenticated detokenize call. A breach of the analytics warehouse leaks tokens, not PII.
domain: data-engineering

## Confidence
strong

## Applies To
- Payment card data (PCI scope) — tokenized by gateway (Stripe Tokens, Adyen TokenAPI), original card never touches merchant systems
- SSN, government IDs — vault, return short token; index by token everywhere
- Email + phone for marketing tools — replaced with `email_token_xxx` to vendors who don't need raw value
- Application logs — strip PII at the logging library boundary; never let it reach disk or SaaS aggregator (Datadog, Splunk)
- Analytics events — Segment / Rudderstack PII-allowlist filters
- ML training data — features computed on tokens or one-way hashes, never on raw PII

## Quantitative
- **Pci Scope Reduction**: Tokenization typically reduces PCI-DSS audit scope from 'every system that touched a card number' to 'the vault and the gateway' — saves ~60-80% of compliance effort per PCI consultancies (Coalfire, NCC)
- **Breach Cost Impact**: IBM Cost of a Data Breach Report 2024 — tokenization listed among top 5 cost-reducing factors, average $220K reduction per incident
- **Detokenize Latency**: Vault detokenize APIs: 5-50ms p99 — design downstream systems to never need detokenize on the hot path

## Counter Conditions
- Format-preserving encryption (FPE) is sometimes labeled 'tokenization' but is reversible with the key — true tokenization is irreversible without vault access (mapping is held only in the vault).
- Hashing PII (SHA-256 of email) is not equivalent — emails have low entropy, rainbow tables are trivial; use tokenization OR keyed-hash with a vault-stored secret.
- Some pipelines (e.g. machine-learning models that need to recognize 'same person across events') need consistent tokens — vault must support deterministic tokens for those use cases.

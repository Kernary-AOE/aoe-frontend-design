# OwaspCryptographicFailures [principle] v1.0.0
OWASP Top 10 A02:2021 (formerly Sensitive Data Exposure) — failures related to cryptography or lack thereof that lead to exposure of sensitive data or system compromise.
> Sensitive data must be encrypted in transit (TLS 1.2+) and at rest (AES-256 or ChaCha20-Poly1305). Passwords must use dedicated slow hash functions (bcrypt/Argon2id/scrypt). Deprecated algorithms (MD5, SHA-1, DES, RC4, ECB mode) must never appear in new code regardless of context.
domain: security

## Attributed To
OWASP Foundation, Top 10 2021

## Applies To
- User password storage
- PII data (SSN, credit card, health records) at rest
- Data transmitted over any network (internal or external)
- Session tokens, API keys, and secrets in storage
- Cryptographic key management and rotation
- TLS certificate configuration and cipher suite selection

## Counter Examples
- Adobe 2013 breach: 153M passwords stored as reversible encrypted (3DES ECB) with a shared key — decryptable, not hashed; patterns visible from duplicate ciphertexts.
- LinkedIn 2012 breach: 117M passwords hashed with unsalted SHA-1 — rainbow tables cracked ~90% within days of the dump being published.
- Storing credit card PANs in a VARCHAR column with application-layer AES-ECB encryption — ECB mode preserves plaintext patterns; violates PCI-DSS.

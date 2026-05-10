# OwaspCryptographicFailures [principle] v1.0.0
OWASP Top 10 A02:2021 (formerly Sensitive Data Exposure) — failures related to cryptography or lack thereof that lead to exposure of sensitive data or system compromise.
> Sensitive data must be encrypted in transit (TLS 1.2+) and at rest (AES-256 or ChaCha20-Poly1305). Passwords must use dedicated slow hash functions (bcrypt/Argon2id/scrypt). Deprecated algorithms (MD5, SHA-1, DES, RC4, ECB mode) must never appear in new code regardless of context.
domain: security

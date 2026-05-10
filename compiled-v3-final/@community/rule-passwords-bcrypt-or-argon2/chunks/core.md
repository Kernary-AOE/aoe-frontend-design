# PasswordsBcryptOrArgon2 [rule] v1.0.0
> User passwords MUST be hashed with bcrypt (cost factor ≥ 12), Argon2id (memory ≥ 64 MiB, iterations ≥ 3, parallelism ≥ 1), or scrypt (N ≥ 2^17, r = 8, p = 1). Never store plain-text passwords. Never use MD5, SHA-1, SHA-256, or any general-purpose hash function directly — those are not password hash functions.
domain: security

## Applies To
- Any user authentication system storing a password verifier
- API key storage (generate random key, store bcrypt hash, never store plaintext)
- Legacy scheme migration (detect old hash scheme on login, re-hash with Argon2id transparently)
- Service account credentials stored in a secrets manager that also needs a verifier

## Counter Examples
- Adobe 2013: 153M passwords stored as reversible 3DES-ECB — not hashed at all; all passwords recoverable by anyone with the key (found in the same dump).
- LinkedIn 2012: 117M passwords stored as unsalted SHA-1 — rainbow tables cracked ~90% of the dump within 72 hours of public release.
- `md5(password + username)` — adding a username as salt does not make MD5 safe; still GPU-crackable at billions of attempts/second.

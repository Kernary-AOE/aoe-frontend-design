# PasswordsBcryptOrArgon2 [rule] v1.0.0
> User passwords MUST be hashed with bcrypt (cost factor ≥ 12), Argon2id (memory ≥ 64 MiB, iterations ≥ 3, parallelism ≥ 1), or scrypt (N ≥ 2^17, r = 8, p = 1). Never store plain-text passwords. Never use MD5, SHA-1, SHA-256, or any general-purpose hash function directly — those are not password hash functions.
domain: security

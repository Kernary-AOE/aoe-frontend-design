# Md5ForPasswords [anti-pattern] v1.0.0
Using general-purpose cryptographic hash functions (MD5, SHA-1, SHA-256, SHA-512) to hash passwords — even with a salt — rather than password-specific slow hashing algorithms designed to resist GPU-accelerated cracking.
domain: security

## Label
MD5 / SHA-1 / SHA-256 for Password Hashing

## Why Bad
MD5 produces 10+ billion hashes per second on a consumer GPU. SHA-256 is even faster — it is designed for speed (TLS, file integrity). A leaked database of MD5-hashed passwords with a static salt is cracked completely in hours using rainbow tables or brute force on commodity hardware. SHA-256 without a salt is entirely rainbow-table reversible: the internet has precomputed every common password. Even with per-user salts, SHA-256's speed means 10 billion guesses per second against each hash — an 8-character password cracked in seconds.

## Instead Do
Use bcrypt (cost factor ≥ 12), Argon2id (memory 64 MiB, iterations 3, parallelism 4), or scrypt (N=32768, r=8, p=1) — all designed to be slow and memory-hard, making GPU/ASIC attacks economically unviable. bcrypt cost 12 takes ~250ms per hash on modern hardware: fine for login, catastrophic for attacker with GPU trying billions/second.

## Structure
```
    # WRONG
    const hash = crypto.createHash('md5').update(password).digest('hex');       // 10B/s crackable
    const hash = crypto.createHash('sha256').update(salt + password).digest();  // still 1B/s crackable

    # CORRECT — bcrypt (Node.js)
    import bcrypt from 'bcrypt';
    const COST = 12;                                       // ~250ms per hash
    const hash   = await bcrypt.hash(password, COST);      // store this in DB
    const valid  = await bcrypt.compare(candidate, hash);  // verify on login

    # CORRECT — Argon2id (Node.js)
    import argon2 from 'argon2';
    const hash  = await argon2.hash(password, {
      type:        argon2.argon2id,
      memoryCost:  65536,   // 64 MiB
      timeCost:    3,        // iterations
      parallelism: 4,
    });
    const valid = await argon2.verify(hash, candidate);

    # Python
    import bcrypt
    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt(rounds=12))
    bcrypt.checkpw(candidate.encode(), hashed)

    # PHP
    $hash  = password_hash($password, PASSWORD_ARGON2ID, ['memory_cost' => 65536, 'time_cost' => 3]);
    $valid = password_verify($candidate, $hash);
  
```

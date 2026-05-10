# JwtSignedNotEncrypted [pattern] v1.0.0
JSON Web Tokens signed with HS256 or RS256 provide tamper-evident claims, but the payload is base64-decoded plaintext — never place secrets or PII inside the JWT body.
domain: security

## Label
JWT: Signed (JWS), Not Encrypted (JWE)

## Problem
Developers often assume JWTs are encrypted because they look like gibberish. The three dot-separated segments are base64url encoded, not encrypted. Anyone holding the token can decode the header and payload without the signing key. Placing passwords, SSNs, credit card numbers, or internal user metadata in the payload leaks that data to the browser, mobile client, and any intercepting proxy.

## Solution
Use JWTs only for identity claims (sub, iss, exp, iat, roles, jti) that are non-sensitive by design. Sign with a strong algorithm (RS256 for distributed verification, HS256 for single-service). Store private/secret keys in environment variables or a secrets manager, never in source code. Validate every claim on every request server-side.

## Structure
```
    # JWT structure (decoded)
    header  = { "alg": "RS256", "typ": "JWT" }
    payload = {
      "iss": "https://auth.example.com",
      "sub": "user_01HZXYZ",          # opaque user ID — NOT email/name
      "aud": "https://api.example.com",
      "exp": 1715209200,               # Unix epoch — short-lived: 15 min for access tokens
      "iat": 1715208300,
      "jti": "a7f2c8b1-...",           # unique token ID for revocation checks
      "roles": ["user"],               # coarse roles only — fine-grained in DB
    }
    # payload is base64url(JSON) — anyone can decode it; NO SECRETS HERE

    # Signing (Node.js / jose library)
    import { SignJWT, importPKCS8 } from 'jose';
    const privateKey = await importPKCS8(process.env.JWT_PRIVATE_KEY, 'RS256');
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'RS256' })
      .setIssuedAt()
      .setExpirationTime('15m')
      .sign(privateKey);

    # Verification
    import { jwtVerify, importSPKI } from 'jose';
    const publicKey = await importSPKI(process.env.JWT_PUBLIC_KEY, 'RS256');
    const { payload } = await jwtVerify(token, publicKey, {
      issuer:   'https://auth.example.com',
      audience: 'https://api.example.com',
    });
    # throws JWTExpired, JWTClaimValidationFailed, JWSSignatureVerificationFailed on any violation

    # HS256 (symmetric) — simpler, but secret must be shared across services
    # RS256 (asymmetric) — preferred for microservices: public key distributable, private key stays with auth
    # NEVER: alg: "none" — rejects unsigned tokens; validate alg header server-side
  
```

## Label
JWT: Signed (JWS), Not Encrypted (JWE)

## Problem
Developers often assume JWTs are encrypted because they look like gibberish. The three dot-separated segments are base64url encoded, not encrypted. Anyone holding the token can decode the header and payload without the signing key. Placing passwords, SSNs, credit card numbers, or internal user metadata in the payload leaks that data to the browser, mobile client, and any intercepting proxy.

## Solution
Use JWTs only for identity claims (sub, iss, exp, iat, roles, jti) that are non-sensitive by design. Sign with a strong algorithm (RS256 for distributed verification, HS256 for single-service). Store private/secret keys in environment variables or a secrets manager, never in source code. Validate every claim on every request server-side.

## Structure
```
    # JWT structure (decoded)
    header  = { "alg": "RS256", "typ": "JWT" }
    payload = {
      "iss": "https://auth.example.com",
      "sub": "user_01HZXYZ",          # opaque user ID — NOT email/name
      "aud": "https://api.example.com",
      "exp": 1715209200,               # Unix epoch — short-lived: 15 min for access tokens
      "iat": 1715208300,
      "jti": "a7f2c8b1-...",           # unique token ID for revocation checks
      "roles": ["user"],               # coarse roles only — fine-grained in DB
    }
    # payload is base64url(JSON) — anyone can decode it; NO SECRETS HERE

    # Signing (Node.js / jose library)
    import { SignJWT, importPKCS8 } from 'jose';
    const privateKey = await importPKCS8(process.env.JWT_PRIVATE_KEY, 'RS256');
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'RS256' })
      .setIssuedAt()
      .setExpirationTime('15m')
      .sign(privateKey);

    # Verification
    import { jwtVerify, importSPKI } from 'jose';
    const publicKey = await importSPKI(process.env.JWT_PUBLIC_KEY, 'RS256');
    const { payload } = await jwtVerify(token, publicKey, {
      issuer:   'https://auth.example.com',
      audience: 'https://api.example.com',
    });
    # throws JWTExpired, JWTClaimValidationFailed, JWSSignatureVerificationFailed on any violation

    # HS256 (symmetric) — simpler, but secret must be shared across services
    # RS256 (asymmetric) — preferred for microservices: public key distributable, private key stays with auth
    # NEVER: alg: "none" — rejects unsigned tokens; validate alg header server-side
  
```

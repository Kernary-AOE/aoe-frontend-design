# JwtSignedNotEncrypted [pattern] v1.0.0
JSON Web Tokens signed with HS256 or RS256 provide tamper-evident claims, but the payload is base64-decoded plaintext — never place secrets or PII inside the JWT body.
domain: security

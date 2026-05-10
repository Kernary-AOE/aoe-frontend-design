# OwaspAuthFailures [principle] v1.0.0
OWASP Top 10 A07:2021 (formerly Broken Authentication) — identification and authentication failures that allow attackers to assume other users' identities, temporarily or permanently.
> Authentication systems must implement: account lockout or exponential backoff after failed attempts, multi-factor authentication for sensitive operations, secure session management (HTTPOnly + Secure cookies, short-lived tokens, server-side session invalidation on logout), and credential breach detection via HaveIBeenPwned API or similar.
domain: security

## Attributed To
OWASP Foundation, Top 10 2021

## Applies To
- Login form brute force and credential stuffing protection
- Password reset and account recovery flows
- Session token generation, storage, and invalidation
- Multi-factor authentication enrollment and bypass
- Remember-me token security and expiration
- OAuth/OIDC implementation (state parameter CSRF, redirect_uri validation)

## Counter Examples
- Rockstar Games 2022: credential stuffing attack via an API endpoint with no rate limiting — attackers used leaked passwords from other sites to compromise GTA accounts.
- Password reset that sends a token as a GET parameter which lands in server access logs, Referer headers, and browser history — token remains valid for 7 days.
- JWT HS256 with `alg: none` accepted by server — attacker strips signature, sets alg to none, and server accepts unsigned token as valid (CVE-2015-9235 and variants).

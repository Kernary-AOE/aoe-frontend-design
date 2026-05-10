# NoCredentialsClient [rule] v1.0.0
API keys, secrets, OAuth client secrets, database connection strings, private signing keys, and any other credentials MUST NEVER appear in client-shipped code (HTML, JS bundles, source maps, config JSON, environment variables prefixed `NEXT_PUBLIC_` / `VITE_` / `REACT_APP_`). All such values MUST live exclusively on the server.
domain: security

## Checks
- [ ] @community/check-no-credentials-client

## Applies To
@community/type-html-artifact

## Severity
critical

## Severity Combination
```
any high-confidence credential match in client bundle      → BLOCK
base64 / encoded blob matching credential length-pattern   → WARN  (verify manually)
no credential signature found                              → PASS
```

## Failure Mode
Attackers extract the credential from devtools or a source map within minutes of deploy; they pivot to abuse the API quota, exfiltrate user data, or pivot to lateral access. Credential rotation is the only remediation, and it is never fast enough.

## Remediation
- Move the credential to the server: a Next.js Route Handler / API route, a serverless function, or a backend service — never a client-rendered page.
- If the client must call an authenticated API, proxy the call through your server, which holds the credential.
- For build-time-needed values (e.g. analytics public key) use ONLY truly-public values — assume any `NEXT_PUBLIC_*` value will be exfiltrated.
- Run `gitleaks` or `trufflehog` in CI on the built bundle, not just the source.
- Rotate the credential immediately if a leak is found; assume it has already been harvested.

## Exceptions
-
  - **Case**: Truly-public client-side keys
  - **Allowed When**: Stripe publishable keys, reCAPTCHA site keys, Mapbox public tokens — these are designed for client exposure and are restricted server-side by domain.

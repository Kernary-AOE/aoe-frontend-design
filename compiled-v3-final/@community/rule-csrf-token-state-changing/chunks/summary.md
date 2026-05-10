# CsrfTokenStateChanging [rule] v1.0.0
> Every state-changing HTTP request (POST, PUT, PATCH, DELETE) must include a CSRF token validated server-side. The token must be unpredictable (≥ 128 bits of entropy, cryptographically random), tied to the user session, and verified before any mutation is applied. SameSite=Strict or SameSite=Lax cookies reduce CSRF risk but do not replace token validation for sensitive actions.
domain: security

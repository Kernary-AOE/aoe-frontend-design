# CsrfTokenStateChanging [rule] v1.0.0
> Every state-changing HTTP request (POST, PUT, PATCH, DELETE) must include a CSRF token validated server-side. The token must be unpredictable (≥ 128 bits of entropy, cryptographically random), tied to the user session, and verified before any mutation is applied. SameSite=Strict or SameSite=Lax cookies reduce CSRF risk but do not replace token validation for sensitive actions.
domain: security

## Applies To
- HTML form submissions that perform state changes
- AJAX/fetch POST/PUT/PATCH/DELETE requests from browser clients
- File upload endpoints
- Account modification: email change, password change, MFA enrollment
- Payment initiation and financial transactions
- Admin actions performed via web UI

## Counter Examples
- Gmail 2007 CSRF: attacker iframe loaded `https://mail.google.com/mail?act=de&smid=...` — browser sent session cookies automatically; filter deletion, contact export performed without user knowledge.
- API endpoint that checks `Origin` header for CSRF protection — Origin can be spoofed from some browser contexts (Flash, pre-CORS redirects); not a reliable defense on its own.
- CSRF token stored in a cookie and compared to a cookie value (double-submit without signed cookies) — attacker with any subdomain XSS can write the cookie and forge the match.

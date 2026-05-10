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

## Examples
- Django: `{% csrf_token %}` in every form; `CsrfViewMiddleware` validates `csrfmiddlewaretoken` POST field or `X-CSRFToken` header against session-bound token — built-in, on by default.
- Rails: `protect_from_forgery with: :exception` in ApplicationController — generates per-session `authenticity_token` embedded in all forms via `form_with` helpers.
- Express + csurf middleware: `app.use(csrf())` generates `req.csrfToken()` per session; Angular HTTP client automatically attaches `XSRF-TOKEN` cookie value as `X-XSRF-TOKEN` header.
- Stripe Checkout: all payment form submissions require a Stripe.js-generated `payment_method` token — the actual card data never hits your server and the token is single-use, eliminating CSRF surface entirely.

## Rationale
Cross-Site Request Forgery exploits the browser's automatic credential attachment (cookies, Basic Auth) to make an authenticated user unknowingly submit a request to a target site from an attacker-controlled page. A CSRF token breaks this by requiring a secret only the legitimate page origin can read (via JavaScript or hidden form field), which cross-origin pages cannot access due to the Same-Origin Policy.

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

# CookieSecureFlags [check] v1.0.0
Session and auth cookies must carry Secure, HttpOnly, and SameSite=Strict (or Lax for OAuth flows). Missing any flag opens specific attack vectors: Secure omission allows plain-HTTP cookie theft, HttpOnly omission allows XSS cookie exfiltration, SameSite omission allows CSRF.
domain: security

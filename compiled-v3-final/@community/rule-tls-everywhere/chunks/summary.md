# TlsEverywhere [rule] v1.0.0
> All HTTP traffic must be served exclusively over TLS 1.2+. HTTP (port 80) must redirect to HTTPS (301) and the `Strict-Transport-Security` header must be set with `max-age ≥ 31536000` (1 year) and `includeSubDomains`. TLS 1.0 and 1.1 must be disabled. Mixed content (HTTPS page loading HTTP subresources) is forbidden. Internal service-to-service traffic must also use TLS or mTLS — plaintext on the internal network is not acceptable.
domain: security

# TlsEverywhere [rule] v1.0.0
> All HTTP traffic must be served exclusively over TLS 1.2+. HTTP (port 80) must redirect to HTTPS (301) and the `Strict-Transport-Security` header must be set with `max-age ≥ 31536000` (1 year) and `includeSubDomains`. TLS 1.0 and 1.1 must be disabled. Mixed content (HTTPS page loading HTTP subresources) is forbidden. Internal service-to-service traffic must also use TLS or mTLS — plaintext on the internal network is not acceptable.
domain: security

## Applies To
- All public-facing web applications and APIs
- Internal microservice communication (mTLS or TLS with certificate pinning)
- WebSocket connections (wss:// only, never ws:// in production)
- Mobile app backend communication
- Webhook delivery (sender and receiver must use HTTPS)
- CDN and load balancer origins (TLS between LB and origin, not just LB-to-client)
- Database connections (require SSL/TLS in connection string, reject plaintext fallback)

## Counter Examples
- Firesheep (2010): tool that captured unencrypted HTTP session cookies on open WiFi — demonstrated at-scale session hijacking for Facebook, Twitter, Flickr; drove industry shift to HTTPS-by-default.
- Internal API served over HTTP on port 8080 between microservices on 'trusted' internal network — compromised internal container or lateral-movement attacker can read all payloads including auth tokens.
- HTTPS frontend but image assets loaded from `http://static.old-cdn.com/` — browser blocks mixed active content, degrades to mixed passive content warning; session cookies visible in HTTP request headers for the sub-resource requests.

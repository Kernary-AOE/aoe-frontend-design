# FontSelfHost [rule] v1.0.0
Production web fonts MUST be self-hosted as WOFF2 files under the project's origin, not loaded from Google Fonts CDN or third-party font services, to eliminate third-party DNS latency (50–200 ms per domain), comply with GDPR (no IP leak to Google), and ensure availability when external CDNs are blocked.
domain: frontend-design

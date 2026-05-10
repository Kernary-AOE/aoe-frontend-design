# CookieConsentBanner [rule] v1.0.0
In the EU/EEA/UK, non-essential cookies and similar tracking technologies (pixels, fingerprinting, localStorage analytics) require freely-given, specific, informed, and unambiguous prior consent before the cookie is set. Pre-checked boxes, implied consent, and 'continue browsing = consent' are illegal under the ePrivacy Directive and GDPR.
> The consent banner must (1) load with NO non-essential cookies set, (2) give equally-prominent 'Accept all' and 'Reject all' options at the top level (CNIL guidance, 2020), (3) describe the categories of cookies and named third parties before consent, (4) record the consent decision with a timestamp + version of policy, (5) provide an equally-easy mechanism to withdraw consent later, and (6) re-prompt at most once per 6-12 months or on policy change. The strictly-necessary cookies exception is narrow: session, security, load-balancing, user-set preferences (language, dark mode) — not analytics, not advertising, not 'improve our service'.
domain: legal-compliance

## Applies To
- Any website serving EU/EEA/UK users (geo or language-detected)
- Mobile apps with SDK trackers (Facebook SDK, AppsFlyer, Branch) — same consent requirement
- First-party analytics (Google Analytics, Plausible cookieless mode is GDPR-compliant; standard GA is not without consent)
- Third-party embedded content (YouTube, Twitter, Stripe Elements) — many set cookies on load; defer until consent

## Implementation Checklist
- Banner appears on first visit, BEFORE any non-essential cookie is set (audit with browser devtools cookie panel on landing)
- 'Reject all' button has equal prominence (size, color, position) to 'Accept all' — not buried in 'Manage preferences'
- No pre-checked boxes anywhere in the granular preferences UI
- Consent record includes: user_id (or anonymous id), timestamp, banner_version, choice_per_category — retain for 5 years (proof of consent obligation)
- Withdraw-consent link in the footer (or permanent settings icon) that re-opens the banner
- Cookie list & purposes documented in a privacy notice, kept in sync with what's actually set
- TCF v2.2 (IAB Transparency & Consent Framework) only if you use ad-tech vendors who require it — not a free pass for banner design

## Severity
block

## Counter Examples
- Banner with green 'Accept' button and a small grey 'Manage' link — no top-level 'Reject'. CNIL fined Google €150M and Facebook €60M (Jan 2022) for exactly this pattern.
- 'By continuing to browse you accept cookies' header with cookies set on page load — implied consent is invalid (CJEU Planet49 case, C-673/17, Oct 2019).
- Pre-checked categories in the granular preferences UI — explicitly invalidated by the Planet49 ruling.
- Loading Google Analytics, Hotjar, and Facebook Pixel on first request, before any banner interaction — every regulator has fined this.

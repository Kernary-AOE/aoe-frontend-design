# BlockingThirdParty [anti-pattern] v1.0.0
Loading third-party JavaScript (analytics, ads, tag managers, marketing pixels, A/B testing snippets) synchronously in the <head> blocks the parser, delays First Contentful Paint, and exposes the page's performance to the slowest external dependency.
domain: performance

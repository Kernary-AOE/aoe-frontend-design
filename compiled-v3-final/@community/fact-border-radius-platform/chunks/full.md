# BorderRadiusPlatform [fact] v1.0.0
Different platforms have established border-radius conventions: iOS uses large squircle radii (26–44px), Android Material 3 uses a defined semantic shape scale, and Web has no browser default opinion on radius.
> iOS system UI uses 26–44px radius on cards and prominent surfaces (superellipse/squircle geometry), intentionally warm and approachable. Android Material 3 uses a defined shape scale from Extra Small (4px) through Extra Large (28px) with semantic assignments per component type. Web browsers have no default radius opinion — the full range from 0px to 32px+ is equally valid.
domain: frontend-design

## Applies To
- PWA design targeting iOS users
- cross-platform web app design
- design token --radius value decisions
- platform parity audits

## Counter Conditions
- Web apps targeting developer-tool aesthetics intentionally deviate from iOS conventions toward smaller radii.
- Material 3 shape scale is semantic (per-component-type), not uniform — applying it uniformly misreads the spec.
- iOS squircle geometry is a superellipse, not a standard CSS border-radius circle arc — CSS approximations with large border-radius are close but not identical.

## Sources

## Source
- Apple Human Interface Guidelines — Corner Radius, iOS system UI specifications
- Material Design 3 — Shape system documentation (m3.material.io)
- Prime build A/B analysis across Raw vs Prime vs Impeccable builds

## Applies To
- PWA design targeting iOS users
- cross-platform web app design
- design token --radius value decisions
- platform parity audits

## Counter Conditions
- Web apps targeting developer-tool aesthetics intentionally deviate from iOS conventions toward smaller radii.
- Material 3 shape scale is semantic (per-component-type), not uniform — applying it uniformly misreads the spec.
- iOS squircle geometry is a superellipse, not a standard CSS border-radius circle arc — CSS approximations with large border-radius are close but not identical.

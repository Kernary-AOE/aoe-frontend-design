# IntentionalGradient [principle] v1.0.0
> Gradients must serve one of three defined purposes — mesh atmosphere (depth behind content), linear accent wash (directional energy on surfaces), or radial accent glow (ambient light around a CTA) — and must interpolate in OKLCH color space to prevent the sRGB gray dead zone at midpoints.
domain: frontend-design

## Applies To
- hero section backgrounds
- page-level atmospheric backgrounds
- section backgrounds and card surfaces
- CTA area focal emphasis

## Counter Examples
- linear-gradient(135deg, #7c3aed, #2563eb) as brand hero background — purple-to-blue, full opacity, most overused gradient in SaaS
- background: linear-gradient(135deg, #f97316, #ec4899) on a metric or heading — gradient on data is decorative not informational
- Gradient at opacity: 1 as the primary page background — too aggressive, fights content

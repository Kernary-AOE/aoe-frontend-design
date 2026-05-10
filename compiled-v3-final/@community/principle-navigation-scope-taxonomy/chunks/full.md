# NavigationScopeTaxonomy [principle] v1.0.0
> Every navigation component belongs to exactly one of three scopes: (1) Global — spans the entire product and appears on all pages; (2) Local — scoped to a single section or feature area, appears within that context only; (3) Contextual — inline links from relevant content to related content, not a reusable nav component.
domain: frontend-design

## Applies To
- frontend-design
- information-architecture
- design-systems

## Scope Definitions
- Global navigation: top-level sidebar, top bar, or mobile tab bar. Contains 3–7 items. Present on every page. Landmarks: <nav aria-label='Primary'>.
- Local navigation: section-level sidebar, secondary tabs, or subsection links. Appears only within a specific section. Landmarks: <nav aria-label='{Section} navigation'>.
- Contextual navigation: in-content links like 'Related articles', 'See also', 'Next step in guide'. Rendered inline with content. May or may not be a <nav> element.

## Examples
- Global: Vercel sidebar (Dashboard/Projects/Deployments/Settings) — present on all pages
- Local: Stripe Docs left sidebar listing sections within the 'Payments' API reference
- Contextual: 'On this page' TOC inside an article; 'Related topics' links at the end of a doc

## Rationale
Mixing navigation scopes creates confusion — a global nav that partially reflects local structure, or a local nav that bleeds into global space, forces users to re-orient constantly. Knowing the scope of a nav component determines its design: global nav must be highly stable and always visible; local nav can be denser and context-specific; contextual nav must feel in-line with content, not like a separate UI layer.

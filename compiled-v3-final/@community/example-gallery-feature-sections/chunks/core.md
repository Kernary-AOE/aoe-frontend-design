# FeatureSectionGallery [example] v1.0.0
13 curated feature section screenshots from Land-book Pro, tagged by pattern type and persona lean. Feature sections do the analytical heavy lifting of a landing page: they answer 'what does it actually do?' with enough specificity that a potential user can evaluate fit. The design challenge is communicating technical or functional depth without overwhelming the visitor or breaking visual flow.
domain: frontend-design

## Observations
- Technical products replace marketing copy with product screenshots. Codegen, inertiajs, console, and v7-go all use actual product UI (dashboards, code terminals, workflow diagrams) as the primary visual for each feature. This 'show the product working' approach is more credible than icon-per-feature grids for developer and enterprise audiences. It implicitly argues: our product is good enough that showing it unfiltered is persuasive.
- Icon-grid features are a warm-institutional and consumer default — rarely used in technical products. Athleats and current use icon + headline + brief description grids. This pattern is well-suited for products where features are benefits (nutrition tracking, spending insights) rather than technical capabilities. For developer tools, icon grids read as oversimplified and undermine technical credibility.
- Alternating split layouts suit complex products with multiple distinct modules. Console uses left/right alternating split sections, one per feature. This is an effective pacing device when features are distinct enough to deserve individual attention. It avoids the visual fatigue of a 6-feature grid and allows more depth per item.
- Process/flow diagrams are the enterprise and AI-product alternative to screenshots. V7-Go and Happyrobot (in the hero gallery) use workflow node diagrams rather than static UI screenshots. This is appropriate when the product's value is orchestration or process rather than a specific UI — the diagram communicates 'what it does' when the UI itself is too abstract to be legible at landing-page scale.
- Feature sections in professional services are framed as outcomes, not capabilities. Rhetorich describes what clients achieve, not what the product does. This outcome framing ('your firm becomes the most trusted voice in the room') is more persuasive for service buyers than capability lists ('we provide coaching sessions and workshops'). The feature section becomes a benefit promise section.

## Items
-
  - **File**: athleats--healthy-performance-driven-recipes-for-athl.webp
  - **Pattern**: 3-column icon feature grid + nutrition benefit copy + warm palette
  - **Persona Lean**:
    - warm-institutional
    - editorial
  - **Notes**: Icon-per-feature approach; benefit-first headlines; food/health tone
-
  - **File**: cernel-product-onboarding-for-ecommerce-teams.webp
  - **Pattern**: step-by-step onboarding feature flow + numbered sequence + ecommerce
  - **Persona Lean**:
    - warm-institutional
    - swiss-modernist
  - **Notes**: Process flow rather than feature grid; shows how product works in steps
-
  - **File**: codegen--the-os-for-code-agents.webp
  - **Pattern**: developer feature deep-dive + code/terminal screenshots + dark SaaS
  - **Persona Lean**:
    - dense-pragmatist
    - swiss-modernist
  - **Notes**: Technical proof over marketing copy; actual product UI as feature visual
-
  - **File**: console.webp
  - **Pattern**: dashboard product features + split layout + developer tool
  - **Persona Lean**:
    - dense-pragmatist
    - swiss-modernist
  - **Notes**: Left/right alternating split sections; each split shows one feature
-
  - **File**: current.webp
  - **Pattern**: fintech app features + mobile screenshots + 4-column benefit grid
  - **Persona Lean**:
    - warm-institutional
    - swiss-modernist
  - **Notes**: Mobile-first product; in-app screenshots per feature; clean grid
-
  - **File**: inertiajs.webp
  - **Pattern**: framework features + code snippets + minimalist developer-focused layout
  - **Persona Lean**:
    - dense-pragmatist
    - swiss-modernist
  - **Notes**: Code blocks as feature proof; no stock imagery; near-monochrome
-
  - **File**: interfere--build-software-that-never-breaks.webp
  - **Pattern**: bold feature statement cards + large type + testing tool aesthetics
  - **Persona Lean**:
    - brutalist-expressive
    - swiss-modernist
  - **Notes**: Large typographic statements per feature; dark bg; confident tone
-
  - **File**: modern-vendor-financing-for-b2b-software-and-hardware-p.webp
  - **Pattern**: B2B fintech features + benefit table + compliance-aware copy
  - **Persona Lean**:
    - dense-pragmatist
    - swiss-modernist
  - **Notes**: Feature/benefit table format; professional conservative palette
-
  - **File**: production-ready-ai-solutions-for-bfsi--vecton.webp
  - **Pattern**: enterprise AI feature cards + dark bg + sector-specific use cases
  - **Persona Lean**:
    - dense-pragmatist
    - swiss-modernist
  - **Notes**: BFSI (banking/finance/insurance) framing; use-case cards per industry
-
  - **File**: rhetorich--make-speaking-your-firms-most-powerful-adv.webp
  - **Pattern**: service feature breakdown + outcome language + professional services
  - **Persona Lean**:
    - swiss-modernist
    - editorial
  - **Notes**: Service offering framing; outcome-oriented; not product feature checklist
-
  - **File**: supercommon-systems.webp
  - **Pattern**: experimental feature layout + overlapping type + design studio
  - **Persona Lean**:
    - brutalist-expressive
    - editorial
  - **Notes**: Non-grid layout; type and visual elements overlap; studio portfolio energy
-
  - **File**: v7-go--ai-agent-platform-for-finance-legal--insuranc.webp
  - **Pattern**: AI agent features + workflow diagram + enterprise vertical deep-dive
  - **Persona Lean**:
    - dense-pragmatist
    - swiss-modernist
  - **Notes**: Process/workflow diagrams explain complex AI features; industry framing
-
  - **File**: veo-sports-cameras--record-stream-and-analyse.webp
  - **Pattern**: hardware feature breakdown + action photography + spec callouts
  - **Persona Lean**:
    - warm-institutional
    - editorial
  - **Notes**: Physical product; photography per feature; spec numbers as design elements

## Base Path
resources/landbook/sections-features

## Persona Mapping
- **Dense Pragmatist**:
  - codegen--the-os-for-code-agents
  - inertiajs
  - modern-vendor-financing-for-b2b-software-and-hardware-p
  - production-ready-ai-solutions-for-bfsi--vecton
  - v7-go--ai-agent-platform-for-finance-legal--insuranc
- **Swiss Modernist**:
  - console
  - current
  - cernel-product-onboarding-for-ecommerce-teams
  - modern-vendor-financing-for-b2b-software-and-hardware-p
  - rhetorich--make-speaking-your-firms-most-powerful-adv
- **Warm Institutional**:
  - athleats--healthy-performance-driven-recipes-for-athl
  - cernel-product-onboarding-for-ecommerce-teams
  - current
  - veo-sports-cameras--record-stream-and-analyse
- **Editorial**:
  - athleats--healthy-performance-driven-recipes-for-athl
  - rhetorich--make-speaking-your-firms-most-powerful-adv
  - supercommon-systems
  - veo-sports-cameras--record-stream-and-analyse
- **Brutalist Expressive**:
  - interfere--build-software-that-never-breaks
  - supercommon-systems
- **Tokyo Minimal**:
  - inertiajs

## Agent Workflow
```
    1. Determine visual proof mode first. For technical products: use product screenshots or diagrams as primary visuals. For benefit-oriented products: icon grids or photography. For services: outcome copy with minimal imagery. The visual type determines which samples are relevant references.
    2. Match feature count to layout pattern. 3-4 features: alternating splits (console). 4-6 features: grid (athleats, current). 6+ features: tabbed or progressive disclosure. This gallery shows the 3-6 range.
    3. For enterprise/AI products, prioritize workflow diagram samples. V7-Go and production-ready-ai-solutions show how to explain orchestration products visually. A static screenshot of a complex workflow tool is often illegible — a simplified diagram is clearer.
    4. Cross-reference pricing to ensure feature positioning supports tier logic. Features that are differentiated across pricing tiers need to be positioned with that hierarchy in mind.
    5. Feature sections must not repeat hero copy. This gallery includes both summary-level feature sections (athleats: brief benefit icons) and deep-dive sections (codegen: full code examples). Choose depth based on where in the page scroll the section falls — early scrollers need summary; committed scrollers can handle depth.
  
```

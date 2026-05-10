# ComponentAnatomyThreeLayers [fact] v1.0.0
Every UI component is structurally composed of three distinct layers: the container (layout, spacing, background), the content (label, icon, description), and the interaction affordances (tap targets, focus ring, hover state). Treating these as one undifferentiated unit causes component-level design and accessibility failures.
> The three-layer anatomy — container / content / interaction affordances — is a structural fact of UI components, not a design preference. A component with a perfectly styled container and content but a missing or inaccessible interaction layer (no focus ring, insufficient tap target) is functionally broken for keyboard and touch users.
domain: frontend-design

## Applies To
- any custom UI component review
- component design system initialization
- accessibility audit of interactive elements

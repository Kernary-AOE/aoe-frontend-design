# HtmlArtifact [type] v1.0.0
Schema for an HTML artifact as consumed by design review and accessibility audit methods. Represents a parsed HTML document with extracted component metadata.
domain: frontend-engineering

## Fields
- **Raw**:
  - **Type**: string
  - **Description**: Raw HTML source or serialized DOM
  - **Required**: true
- **Url**:
  - **Type**: URL | null
  - **Description**: Origin URL if fetched from network; null for local files
  - **Required**: false
- **Components**:
  - **Type**: UIComponent[]
  - **Description**: List of identified UI components extracted from the DOM
  - **Required**: true
- **Colors**:
  - **Type**: ColorPair[]
  - **Description**: All (foreground, background) color pairs found in computed styles
  - **Required**: true
- **Interactive**:
  - **Type**: DOMElement[]
  - **Description**: All keyboard-focusable interactive elements: a[href], button, input, select, textarea, [tabindex]
  - **Required**: true
- **Aria**:
  - **Type**: AriaMap
  - **Description**: Map of element → { role, label, expanded, controls } ARIA attributes
  - **Required**: true
- **Meta**:
  - **Type**:
    - **Title**: string
    - **Lang**: string
    - **Viewport**: string | null
    - **Charset**: string
  - **Required**: true

## Invariants
- components must be non-empty for a valid HTML document
- colors must include at least the body background color
- interactive must include all elements with tabindex >= 0

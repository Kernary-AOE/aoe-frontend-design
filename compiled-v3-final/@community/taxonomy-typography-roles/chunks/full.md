# TypographyRoles [taxonomy] v1.0.0
A classification of typographic roles in digital product interfaces. Each role carries distinct size, weight, and spacing requirements. This taxonomy is used to evaluate typographic system completeness and hierarchy clarity.
domain: visual-design

## Label
Typography Roles in UI

## Members
- @community/fact-optimal-line-length
- @community/fact-visibility-system-status
- @community/fact-recognition-over-recall
- @community/category-typography-scale
- @community/value-focus-outline-width

## Roles
- **Display**:
  - **Purpose**: Hero headlines, marketing copy, feature names
  - **Css Typical**: font-size: clamp(2.5rem, 5vw, 5rem); font-weight: 700–900; line-height: 1.0–1.15
  - **Notes**: Often uses display-variant font or heavier weight. Avoid Inter at this scale — optical distortion at large sizes.
- **Heading 1**:
  - **Purpose**: Page title, top-level section name
  - **Css Typical**: font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 600–700; line-height: 1.2–1.3
- **Heading 2**:
  - **Purpose**: Sub-section header within a page
  - **Css Typical**: font-size: clamp(1.25rem, 2vw, 1.75rem); font-weight: 600; line-height: 1.3
- **Body**:
  - **Purpose**: Primary reading content — articles, descriptions, labels
  - **Css Typical**: font-size: 1rem (16px base); line-height: 1.5–1.7; max-width: 65ch
  - **Constraint**: @community/fact-optimal-line-length must be respected
- **Caption**:
  - **Purpose**: Image captions, helper text, timestamps
  - **Css Typical**: font-size: 0.75–0.875rem; line-height: 1.4; color: secondary-text-color
  - **A11y**: Minimum 4.5:1 contrast even at small size
- **Code**:
  - **Purpose**: Inline code snippets, code blocks, terminal output
  - **Css Typical**: font-family: monospace; font-size: 0.875em; line-height: 1.6

## Relations
relationships: [@community/fact-visibility-system-status, @community/fact-recognition-over-recall, @community/value-focus-outline-width]

## Label
Typography Roles in UI

## Members
- @community/fact-optimal-line-length
- @community/fact-visibility-system-status
- @community/fact-recognition-over-recall
- @community/category-typography-scale
- @community/value-focus-outline-width

## Roles
- **Display**:
  - **Purpose**: Hero headlines, marketing copy, feature names
  - **Css Typical**: font-size: clamp(2.5rem, 5vw, 5rem); font-weight: 700–900; line-height: 1.0–1.15
  - **Notes**: Often uses display-variant font or heavier weight. Avoid Inter at this scale — optical distortion at large sizes.
- **Heading 1**:
  - **Purpose**: Page title, top-level section name
  - **Css Typical**: font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 600–700; line-height: 1.2–1.3
- **Heading 2**:
  - **Purpose**: Sub-section header within a page
  - **Css Typical**: font-size: clamp(1.25rem, 2vw, 1.75rem); font-weight: 600; line-height: 1.3
- **Body**:
  - **Purpose**: Primary reading content — articles, descriptions, labels
  - **Css Typical**: font-size: 1rem (16px base); line-height: 1.5–1.7; max-width: 65ch
  - **Constraint**: @community/fact-optimal-line-length must be respected
- **Caption**:
  - **Purpose**: Image captions, helper text, timestamps
  - **Css Typical**: font-size: 0.75–0.875rem; line-height: 1.4; color: secondary-text-color
  - **A11y**: Minimum 4.5:1 contrast even at small size
- **Code**:
  - **Purpose**: Inline code snippets, code blocks, terminal output
  - **Css Typical**: font-family: monospace; font-size: 0.875em; line-height: 1.6

## Relationships
- @community/fact-visibility-system-status
- @community/fact-recognition-over-recall
- @community/value-focus-outline-width

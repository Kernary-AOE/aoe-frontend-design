# SpacingScale [type] v1.0.0
Schema for a spacing scale — the canonical set of distance values used for padding, margin, gap, and inset across the design system. Spacing scales should be a small, named set of tokens grounded in a base unit (typically 4px or 8px) to enforce vertical rhythm and prevent magic-number proliferation.
domain: design-system

## Fields
- **Base Unit**:
  - **Type**: "4px" | "8p
  - **Description**: The smallest atomic step. 8px is industry standard (8pt grid); 4px allows finer half-steps.
  - **Required**: true
- **Steps**:
  - **Type**: object
  - **Description**: Named scale steps keyed by token name, valued in CSS length
  - **Shape**: Record<string, css-length>
  - **Required**: true
- **Units**:
  - **Type**: "px" | "rem" | "bot
  - **Description**: Output unit. rem is preferred for accessibility (scales with user font-size). px for pixel-perfect.
  - **Required**: true
  - **Default**: rem
- **Semantic Aliases**:
  - **Type**: object
  - **Description**: Role-named aliases pointing at scale steps (e.g. 'gutter' → 'space-4')
  - **Shape**: Record<string, string>
  - **Required**: false

## Canonical Scale
- **Space 0**: 0px
- **Space Px**: 1px
- **Space 0.5**: 2px
- **Space 1**: 4px
- **Space 2**: 8px
- **Space 3**: 12px
- **Space 4**: 16px
- **Space 5**: 20px
- **Space 6**: 24px
- **Space 8**: 32px
- **Space 10**: 40px
- **Space 12**: 48px
- **Space 16**: 64px
- **Space 20**: 80px
- **Space 24**: 96px
- **Space 32**: 128px

## Invariants
- all steps MUST be multiples of base-unit OR canonical exceptions (1px, 2px) for borders/hairlines
- scale MUST be monotonically increasing
- gaps between steps should follow either linear (every 4px or 8px) or modular (1.25× / 1.5×) progression — not arbitrary
- no more than 16 steps; if you need more, the scale is too granular and undermines consistency
- rem output: divide px by 16 (root font-size) — `space-4` = `16px` = `1rem`

## Example
- **Base Unit**: 4px
- **Units**: rem
- **Steps**:
  - **Space 0**: 0
  - **Space 1**: 0.25rem
  - **Space 2**: 0.5rem
  - **Space 3**: 0.75rem
  - **Space 4**: 1rem
  - **Space 6**: 1.5rem
  - **Space 8**: 2rem
  - **Space 12**: 3rem
  - **Space 16**: 4rem
- **Semantic Aliases**:
  - **Gutter Sm**: space-2
  - **Gutter Md**: space-4
  - **Gutter Lg**: space-6
  - **Section Padding Y**: space-12

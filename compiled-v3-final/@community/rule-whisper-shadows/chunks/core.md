# WhisperShadows [rule] v1.0.0
Card shadow opacity must stay between 4% and 12% across the elevation scale — shadows visible at arm's length are too strong; strong shadows (≥15% opacity) are prohibited in light-mode card surfaces.
>     Shadow scale for light-mode card surfaces:
    | Level    | Value                                     | Usage                    |
    |----------|-------------------------------------------|--------------------------|
    | card     | 0 1px 3px rgba(0,0,0,0.04)               | All cards default        |
    | button   | 0 1px 3px rgba(0,0,0,0.06)               | Icon buttons, small CTAs |
    | hover    | 0 2px 4px rgba(0,0,0,0.08)               | Card hover state         |
    | elevated | 0 4px 12px rgba(0,0,0,0.08)              | Floating panels          |
    | modal    | 0 8px 24px rgba(0,0,0,0.12)              | Modal / sheet overlay    |

    Prohibited: box-shadow with alpha ≥ 0.15 on card surfaces.
    Prohibited: drop-shadow(0 4px 8px #000) or similar fully-opaque shadows.
    Test: hold the rendered UI at arm's length — a card shadow that is clearly visible at normal reading distance is too strong.
  
domain: frontend-design

## Applies To
- Card components in light mode
- Button surfaces
- Dropdown and popover shadows
- Modal and sheet overlays
- Any surface that uses box-shadow for elevation

## Counter Example
box-shadow: 0 4px 16px rgba(0,0,0,0.25) on a dashboard card — the card appears to levitate dramatically and pulls attention from the content inside it.

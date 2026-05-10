# ContrastRatioAaVsAaa [fact] v1.0.0
WCAG 2.2 specifies two contrast tiers: AA (4.5:1 normal text, 3:1 large) is the legal compliance floor; AAA (7:1 normal, 4.5:1 large) is the recommended target for sustained reading and reflects the publishing-industry contrast standard.
> WCAG 2.2 SC 1.4.3 requires luminance contrast ≥ 4.5:1 for normal text (Level AA) and SC 1.4.6 requires ≥ 7:1 (Level AAA) — AA is the legal compliance floor required by the EAA (EU 2025), DOJ Title II (US 2024), and most procurement frameworks; AAA approximates the contrast standard used by professional publishers for sustained reading and is recommended for long-form content.

## Confidence
proven

## Applies To
- normal-text contrast targets (body, label, caption)
- large-text contrast targets (heading, display)
- compliance gating in CI
- reading-app target choice (long-form prose should aim AAA)

## Quantitative
- **Aa Normal Text**: 4.5:1
- **Aa Large Text**: 3:1
- **Aaa Normal Text**: 7:1
- **Aaa Large Text**: 4.5:1
- **Large Text Definition**: ≥ 18 pt regular OR ≥ 14 pt bold (≈ 24 px / 18.66 px on standard 96 dpi)
- **Formula**: (L1 + 0.05) / (L2 + 0.05) where L1 is the lighter relative luminance

## Counter Conditions
- WCAG contrast formula is a sRGB-luminance approximation — the upcoming APCA model (used by WCAG 3 drafts) better predicts perceived contrast for thin / large text, especially light-on-dark.
- Decorative text and logotypes are exempt from both AA and AAA.
- Disabled controls are exempt (SC 1.4.3 explicit exception).

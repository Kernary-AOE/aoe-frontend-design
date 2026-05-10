# PostHog [persona] v1.0.0
Anti-corporate open-source analytics: IBM Plex Sans at 700/800 on sage-tinted parchment #fdfdf8, PostHog Orange #F54E00 hidden until hover, hand-drawn hedgehog illustrations replacing stock photography, and an olive-green palette that deliberately rejects SaaS conventions.
domain: visual-design

## School
posthog

## Implies
- **Font**:
  - **Display**: IBM Plex Sans Variable (fallbacks: IBM Plex Sans, -apple-system, system-ui, Avenir Next, Avenir, Segoe UI, Helvetica Neue, Ubuntu, Roboto) — 30px/800/line-height 1.20/letter-spacing -0.75px for hero; 700/800 on all headings
  - **Body**: IBM Plex Sans — 400/500 body; 16px/400/line-height 1.50–1.71 (generous editorial); 600 semibold for emphasis
  - **Monospace**: Source Code Pro for code display (fallbacks: Menlo, Consolas, Monaco); system stack ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas for inline code
- **Color**:
  - **Temperature**: warm
  - **Palette**: olive ink #4d4f46 primary text, deep olive #23251d high-emphasis headings/links, PostHog Orange #F54E00 hover-only accent, amber gold #F7A501 dark hover, warm parchment #fdfdf8 canvas, sage cream #eeefe9 input bg, sage button #e5e7e0, tan featured #d4c9b8, sage border #bfc1b7, dark CTA #1e1f23
  - **Background**: #fdfdf8
- **Density**: compact-editorial — 2px inline / 4px primary UI (buttons/inputs/dropdowns) / 6px secondary containers / 9999px pill badges; 8px base (compact 2–34px scale); section padding 32–48px (tight for content-heavy); 13 defined breakpoints (425/482/640/768/800/900/1024/1076/1160/1280/1536px)
- **Layout**: content-heavy wiki-like flow with tight section padding; dark CTA #1e1f23 buttons for primary actions; alternating surface-color sections rather than border separation; long-form comfortable reading rhythm
- **Imagery**: hand-drawn hedgehog mascot illustrations + action-figure product photography throughout; no stock photos, no abstract gradients; illustrations ARE the brand differentiator
- **Motion**: PostHog Orange #F54E00 appears only on hover (buttons, links, cards) — a hidden interaction reward; dark buttons opacity: 0.7 with amber text on hover rather than color swap; single shadow 0px 25px 50px -12px rgba(0,0,0,0.25) for modals only

## Example Brands
- PostHog

## Composition
- **Must Include**:
  - @impeccable/template-button-press
  - @community/fact-line-height-readability
  - @community/check-body-readability
- **Must Avoid**:
  - @impeccable/persona-vercel-clean
  - @impeccable/persona-stripe-fintech
- **Typography Required**:
  - **Display**: IBM Plex Sans Variable
  - **Weight Heading**: 700/800
  - **Body Line Height**: 1.50-1.71
- **Color Required**:
  - **Background**: #fdfdf8
  - **Text Primary**: #4d4f46
  - **Accent**: #F54E00 (hover-only, never at rest)
- **Motion Prescriptions**:
  - @impeccable/template-button-press
  - @impeccable/template-easing-curves

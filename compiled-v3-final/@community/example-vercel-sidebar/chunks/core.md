# VercelSidebar [example] v1.0.0
The Vercel dashboard sidebar transitions between expanded (240px) and collapsed (56px) states using a CSS `width` transition with `overflow: hidden` on the nav container. Icon-only mode preserves all navigation affordances via tooltips. The transition duration is ~200ms with an ease-out curve, making the collapse feel snappy without jarring.
domain: visual-design

## Label
Vercel Dashboard — Sidebar Collapse Animation

## Url
https://vercel.com/dashboard

## Observed
2024-Q3

## Demonstrates
- Navigation icons remain actionable in collapsed state via tooltip disclosure.
- The 200ms ease-out is long enough to perceive motion but short enough to not feel sluggish on repeat use.
- Active state is preserved during and after collapse (highlighted icon stays highlighted).
- Keyboard users can still navigate all items; the collapse toggle is a visible button with aria-label.

## Quality Signals
- zero layout shift on toggle — sibling content reflows smoothly
- persists collapsed/expanded state in localStorage across page loads
- respects prefers-reduced-motion: disables the width transition

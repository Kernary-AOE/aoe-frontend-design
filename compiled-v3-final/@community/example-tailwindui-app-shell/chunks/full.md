# TailwindUiAppShell [example] v1.0.0
Tailwind UI's stacked + sidebar app shell uses a 240px left sidebar with vertical nav (icon + label rows), a 64px top bar with search + profile dropdown, and a main content area with max-width 7xl (1280px). Colors default to indigo accent (#4F46E5), gray-50 backgrounds (#F9FAFB), and gray-900 (#111827) text. Active nav state uses bg-indigo-50 + text-indigo-700.
domain: visual-design

## Label
Tailwind UI - Application Shell

## Url
https://tailwindui.com/components/application-ui/application-shells

## Observed
2026-Q1

## Brand
tailwind

## Pattern Applied
@community/pattern-sidebar-collapsible

## Aesthetic Notes
- Sidebar: 240px wide (w-60), bg-white #FFFFFF, border-r 1px border-gray-200 #E5E7EB.
- Nav item: 36px tall, 12px horizontal padding, 8px gap between icon (20px) and label (14px/500).
- Active state: bg-indigo-50 #EEF2FF + text-indigo-700 #4338CA + 4px rounded corners.
- Top bar: 64px tall (h-16), bg-white, border-b 1px border-gray-200, with search input flex-grow + 32px right-side icons.
- Main content: bg-gray-50 #F9FAFB, max-w-7xl (1280px) centered, py-8 px-6.
- Page heading: text-2xl/semibold (24px/600), text-gray-900 #111827, with 16px gap to content.

## What To Copy
- 240px sidebar width is the consensus (between 200 too-narrow and 280 too-wide for app navigation).
- Active nav state uses brand-color tint backgrounds (indigo-50) + brand-color text (indigo-700), not solid fills.
- Main canvas at gray-50 (#F9FAFB) instead of pure white disambiguates content area from white sidebar.
- Page heading at 24px/600 (text-2xl) is the standard - bigger feels like a marketing page, smaller feels weak.

## What To Skip
- The default indigo accent is everywhere on the web - swap to your brand or you'll look generic.
- The mobile drawer transition is 300ms which feels slow on modern devices; reduce to 200ms.

## Screenshot Hint
scout query: tailwind ui application shell sidebar nav indigo active state gray-50 canvas

## Demonstrates
- Sidebar + topbar + content shell is the durable SaaS app layout pattern.
- Tinted active nav state (bg-indigo-50) feels less heavy than solid filled active state.
- Distinct sidebar (white) vs main (gray-50) backgrounds need no border to feel separated.

## Label
Tailwind UI - Application Shell

## Url
https://tailwindui.com/components/application-ui/application-shells

## Observed
2026-Q1

## Brand
tailwind

## Pattern Applied
@community/pattern-sidebar-collapsible

## Aesthetic Notes
- Sidebar: 240px wide (w-60), bg-white #FFFFFF, border-r 1px border-gray-200 #E5E7EB.
- Nav item: 36px tall, 12px horizontal padding, 8px gap between icon (20px) and label (14px/500).
- Active state: bg-indigo-50 #EEF2FF + text-indigo-700 #4338CA + 4px rounded corners.
- Top bar: 64px tall (h-16), bg-white, border-b 1px border-gray-200, with search input flex-grow + 32px right-side icons.
- Main content: bg-gray-50 #F9FAFB, max-w-7xl (1280px) centered, py-8 px-6.
- Page heading: text-2xl/semibold (24px/600), text-gray-900 #111827, with 16px gap to content.

## What To Copy
- 240px sidebar width is the consensus (between 200 too-narrow and 280 too-wide for app navigation).
- Active nav state uses brand-color tint backgrounds (indigo-50) + brand-color text (indigo-700), not solid fills.
- Main canvas at gray-50 (#F9FAFB) instead of pure white disambiguates content area from white sidebar.
- Page heading at 24px/600 (text-2xl) is the standard - bigger feels like a marketing page, smaller feels weak.

## What To Skip
- The default indigo accent is everywhere on the web - swap to your brand or you'll look generic.
- The mobile drawer transition is 300ms which feels slow on modern devices; reduce to 200ms.

## Screenshot Hint
scout query: tailwind ui application shell sidebar nav indigo active state gray-50 canvas

## Demonstrates
- Sidebar + topbar + content shell is the durable SaaS app layout pattern.
- Tinted active nav state (bg-indigo-50) feels less heavy than solid filled active state.
- Distinct sidebar (white) vs main (gray-50) backgrounds need no border to feel separated.

# TabBarBottom [pattern] v1.0.0
A fixed-position horizontal bar at the bottom of a mobile viewport containing 3-5 top-level destinations as icon+label tabs. Optimized for thumb reach and persistent navigation in mobile-web and PWA shells.
domain: frontend-design

## Facts

## Label
Bottom Tab Bar (Mobile)

## Problem
On mobile, top-of-screen navigation is out of thumb reach for one-handed use, and hamburger menus hide structure. Users need persistent, low-friction switching between primary destinations.

## Solution
Anchor 3-5 primary destinations to the bottom of the viewport. Each tab is an icon + short label, with the active tab visually emphasized (filled icon, color, top bar).

## Structure
```
    <nav aria-label="Primary" class="tab-bar">
      <ul role="list">
        <li>
          <a href="/" aria-current="page" aria-label="Home">
            <svg aria-hidden="true"></svg>
            <span class="label">Home</span>
          </a>
        </li>
        <li>
          <a href="/search" aria-label="Search">
            <svg aria-hidden="true"></svg>
            <span class="label">Search</span>
          </a>
        </li>
        <li>
          <a href="/inbox" aria-label="Inbox, 3 unread">
            <svg aria-hidden="true"></svg>
            <span class="label">Inbox</span>
            <span class="badge" aria-hidden="true">3</span>
          </a>
        </li>
        <li>
          <a href="/me" aria-label="Profile">
            <svg aria-hidden="true"></svg>
            <span class="label">You</span>
          </a>
        </li>
      </ul>
    </nav>
  
```

## Uses
- @community/method-heuristic-review

## Behavior
- Tap target per tab must be at least 44x44 CSS px (target-size AA).
- Active tab uses filled icon variant + accent color; inactive tabs use stroke icon + neutral.
- Hide on scroll-down, show on scroll-up to maximize content area (optional).
- Respect safe-area-inset-bottom so the bar clears iOS home indicator.
- Tapping the active tab a second time scrolls the current view to top (iOS pattern).
- Limit to 5 tabs; if more destinations exist, the 5th becomes 'More' opening a sheet.

## A11y
- Wrap in `<nav aria-label='Primary'>`; do not nest inside another landmark.
- Mark active tab with `aria-current='page'`, not just a CSS class.
- Badges (e.g., unread count) must be reflected in the link's accessible name (aria-label).
- Decorative icons need `aria-hidden='true'`; the link text or aria-label provides the name.
- Honor `prefers-reduced-motion` for any active-tab transition animation.

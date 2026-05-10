# StickyHeaderOnScroll [pattern] v1.0.0
A page or section header using position: sticky; top: 0 that adds a shadow or border-bottom on scroll (via IntersectionObserver sentinel), optionally hides on scroll-down and reveals on scroll-up to maximize content viewport height.
domain: frontend-design

## Label
Sticky Header with Scroll-Aware Behavior

## Problem
Headers that are always fixed waste viewport space and visually compete with content as users scroll. Headers that disappear entirely on scroll lose wayfinding context. A scroll-aware sticky header balances persistent navigation with content space.

## Solution
Use position: sticky for layout-integrated sticking. Add a visual treatment (shadow or border) when scrolled to signal elevation. Optionally implement hide-on-scroll-down / show-on-scroll-up for maximum content space in long pages.

## Structure
```
    <!-- Sentinel: 1px element above header; when it exits viewport, header is 'scrolled' -->
    <div id="scroll-sentinel" aria-hidden="true" style="height:1px;"></div>

    <header id="site-header" class="site-header">
      <nav aria-label="Primary">
        <a href="/" class="site-header__logo">Brand</a>
        <ul class="site-header__links">
          <li><a href="/features">Features</a></li>
          <li><a href="/pricing">Pricing</a></li>
          <li><a href="/docs">Docs</a></li>
        </ul>
        <a href="/login" class="btn btn-outline btn-sm">Sign in</a>
        <a href="/signup" class="btn btn-primary btn-sm">Get started</a>
      </nav>
    </header>

    <main><!-- page content --></main>
  
```

## Css
```
    .site-header {
      position: sticky;
      top: 0;
      z-index: 40;
      background: hsl(var(--background) / 0.95);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      height: 4rem;       /* 64px */
      display: flex;
      align-items: center;
      padding: 0 1.5rem;
      border-block-end: 1px solid transparent;
      transition: border-color 200ms ease, box-shadow 200ms ease, transform 280ms cubic-bezier(0.4,0,0.2,1);
    }

    /* Elevated state: scrolled past sentinel */
    .site-header.is-scrolled {
      border-block-end-color: hsl(var(--border));
      box-shadow: 0 2px 12px oklch(20% 0.02 250 / 0.08);
    }

    /* Hide on scroll-down, show on scroll-up */
    .site-header.is-hidden {
      transform: translateY(-100%);
    }

    @media (prefers-reduced-motion: reduce) {
      .site-header { transition: none; }
    }
  
```

## Javascript
```
    (function() {
      var header = document.getElementById('site-header');
      var sentinel = document.getElementById('scroll-sentinel');
      if (!header || !sentinel) return;

      // Scrolled state via IntersectionObserver
      new IntersectionObserver(function(entries) {
        header.classList.toggle('is-scrolled', !entries[0].isIntersecting);
      }).observe(sentinel);

      // Optional: hide-on-down, show-on-up
      var lastY = 0;
      window.addEventListener('scroll', function() {
        var y = window.scrollY;
        if (y > lastY && y > 80) {
          header.classList.add('is-hidden');
        } else {
          header.classList.remove('is-hidden');
        }
        lastY = y;
      }, { passive: true });
    })();
  
```

## Behavior
- Always use position: sticky (not position: fixed) to keep the header in the normal flow.
- The sentinel technique avoids scroll event listeners for the elevation state — use IntersectionObserver instead.
- Hide-on-scroll-down threshold: only hide after scrolling > 80px so accidental small scrolls do not collapse the header.
- Show immediately on any upward scroll — users scrolling up are looking for navigation.
- backdrop-filter: blur(8px) + bg-opacity/0.95 creates glass effect while keeping content readable.

## A11y
- Sticky header must not cover focused elements — add scroll-margin-top to anchored sections equal to the header height.
- CSS: :target { scroll-margin-top: 4rem; } to offset anchor links.
- The header must remain focusable and keyboard-accessible even when is-hidden (it remains in the DOM with transform).

## Label
Sticky Header with Scroll-Aware Behavior

## Problem
Headers that are always fixed waste viewport space and visually compete with content as users scroll. Headers that disappear entirely on scroll lose wayfinding context. A scroll-aware sticky header balances persistent navigation with content space.

## Solution
Use position: sticky for layout-integrated sticking. Add a visual treatment (shadow or border) when scrolled to signal elevation. Optionally implement hide-on-scroll-down / show-on-scroll-up for maximum content space in long pages.

## Structure
```
    <!-- Sentinel: 1px element above header; when it exits viewport, header is 'scrolled' -->
    <div id="scroll-sentinel" aria-hidden="true" style="height:1px;"></div>

    <header id="site-header" class="site-header">
      <nav aria-label="Primary">
        <a href="/" class="site-header__logo">Brand</a>
        <ul class="site-header__links">
          <li><a href="/features">Features</a></li>
          <li><a href="/pricing">Pricing</a></li>
          <li><a href="/docs">Docs</a></li>
        </ul>
        <a href="/login" class="btn btn-outline btn-sm">Sign in</a>
        <a href="/signup" class="btn btn-primary btn-sm">Get started</a>
      </nav>
    </header>

    <main><!-- page content --></main>
  
```

## Css
```
    .site-header {
      position: sticky;
      top: 0;
      z-index: 40;
      background: hsl(var(--background) / 0.95);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      height: 4rem;       /* 64px */
      display: flex;
      align-items: center;
      padding: 0 1.5rem;
      border-block-end: 1px solid transparent;
      transition: border-color 200ms ease, box-shadow 200ms ease, transform 280ms cubic-bezier(0.4,0,0.2,1);
    }

    /* Elevated state: scrolled past sentinel */
    .site-header.is-scrolled {
      border-block-end-color: hsl(var(--border));
      box-shadow: 0 2px 12px oklch(20% 0.02 250 / 0.08);
    }

    /* Hide on scroll-down, show on scroll-up */
    .site-header.is-hidden {
      transform: translateY(-100%);
    }

    @media (prefers-reduced-motion: reduce) {
      .site-header { transition: none; }
    }
  
```

## Javascript
```
    (function() {
      var header = document.getElementById('site-header');
      var sentinel = document.getElementById('scroll-sentinel');
      if (!header || !sentinel) return;

      // Scrolled state via IntersectionObserver
      new IntersectionObserver(function(entries) {
        header.classList.toggle('is-scrolled', !entries[0].isIntersecting);
      }).observe(sentinel);

      // Optional: hide-on-down, show-on-up
      var lastY = 0;
      window.addEventListener('scroll', function() {
        var y = window.scrollY;
        if (y > lastY && y > 80) {
          header.classList.add('is-hidden');
        } else {
          header.classList.remove('is-hidden');
        }
        lastY = y;
      }, { passive: true });
    })();
  
```

## Behavior
- Always use position: sticky (not position: fixed) to keep the header in the normal flow.
- The sentinel technique avoids scroll event listeners for the elevation state — use IntersectionObserver instead.
- Hide-on-scroll-down threshold: only hide after scrolling > 80px so accidental small scrolls do not collapse the header.
- Show immediately on any upward scroll — users scrolling up are looking for navigation.
- backdrop-filter: blur(8px) + bg-opacity/0.95 creates glass effect while keeping content readable.

## A11y
- Sticky header must not cover focused elements — add scroll-margin-top to anchored sections equal to the header height.
- CSS: :target { scroll-margin-top: 4rem; } to offset anchor links.
- The header must remain focusable and keyboard-accessible even when is-hidden (it remains in the DOM with transform).

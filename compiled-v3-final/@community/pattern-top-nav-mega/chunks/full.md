# TopNavMega [pattern] v1.0.0
A top horizontal nav whose items expand into a multi-column flyout panel grouping product, solution, resource, and developer links with icons and short descriptions. Used by marketing sites with broad surface area.
domain: frontend-design

## Facts

## Label
Mega Menu Top Navigation

## Problem
Marketing sites for platforms have dozens of destinations (products, docs, solutions by industry, customer stories, blog, pricing). A flat top nav cannot fit them; a single-column dropdown buries items.

## Solution
Group destinations into 3-5 semantic columns inside a wide flyout panel. Each link shows an icon + label + 1-line description. Open on hover (with delay) and on focus, close on outside click or Escape.

## Structure
```
    <header>
      <nav aria-label="Primary">
        <a href="/" aria-label="Home"><img alt="Logo" /></a>
        <ul role="list">
          <li>
            <button aria-expanded="false" aria-controls="mega-products">Products</button>
            <div id="mega-products" role="region" aria-label="Products" hidden>
              <div class="col">
                <h3 id="col-build">Build</h3>
                <ul role="list" aria-labelledby="col-build">
                  <li>
                    <a href="/edge">
                      <svg aria-hidden="true"></svg>
                      <span class="title">Edge Functions</span>
                      <span class="desc">Run code at the edge.</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="col"><h3>Ship</h3><ul role="list"></ul></div>
              <div class="col"><h3>Observe</h3><ul role="list"></ul></div>
              <aside class="featured" aria-label="Featured">
                <a href="/changelog">Changelog<span>New: AI SDK v5</span></a>
              </aside>
            </div>
          </li>
          <li><a href="/pricing">Pricing</a></li>
          <li><a href="/docs">Docs</a></li>
        </ul>
        <div class="actions">
          <a href="/login">Log in</a>
          <a href="/signup" class="cta">Sign up</a>
        </div>
      </nav>
    </header>
  
```

## Uses
- @community/method-heuristic-review

## Behavior
- Open on hover with 150ms intent delay; open instantly on click or Enter/Space.
- Arrow Down opens the panel and moves focus to the first link.
- Tab moves through panel links in DOM order; Shift+Tab reverses.
- Escape closes the panel and returns focus to the trigger.
- Outside click or hovering a different top-level item closes the current panel.
- Panel width is constrained to the page max-width and aligned with the trigger.

## A11y
- Each trigger uses `aria-expanded` and `aria-controls` pointing to the panel id.
- Panel uses `role='region'` with an accessible name (aria-label or aria-labelledby).
- Panel is `hidden` (not just CSS display:none) when closed so it is removed from the a11y tree.
- Hover-only opening fails keyboard users — also support Enter/Space and Arrow Down.
- Decorative icons must have `aria-hidden='true'`; functional icons need labels.

## Examples
- @community/example-stripe-mega-nav
- @community/example-vercel-mega-nav

## Label
Mega Menu Top Navigation

## Problem
Marketing sites for platforms have dozens of destinations (products, docs, solutions by industry, customer stories, blog, pricing). A flat top nav cannot fit them; a single-column dropdown buries items.

## Solution
Group destinations into 3-5 semantic columns inside a wide flyout panel. Each link shows an icon + label + 1-line description. Open on hover (with delay) and on focus, close on outside click or Escape.

## Structure
```
    <header>
      <nav aria-label="Primary">
        <a href="/" aria-label="Home"><img alt="Logo" /></a>
        <ul role="list">
          <li>
            <button aria-expanded="false" aria-controls="mega-products">Products</button>
            <div id="mega-products" role="region" aria-label="Products" hidden>
              <div class="col">
                <h3 id="col-build">Build</h3>
                <ul role="list" aria-labelledby="col-build">
                  <li>
                    <a href="/edge">
                      <svg aria-hidden="true"></svg>
                      <span class="title">Edge Functions</span>
                      <span class="desc">Run code at the edge.</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="col"><h3>Ship</h3><ul role="list"></ul></div>
              <div class="col"><h3>Observe</h3><ul role="list"></ul></div>
              <aside class="featured" aria-label="Featured">
                <a href="/changelog">Changelog<span>New: AI SDK v5</span></a>
              </aside>
            </div>
          </li>
          <li><a href="/pricing">Pricing</a></li>
          <li><a href="/docs">Docs</a></li>
        </ul>
        <div class="actions">
          <a href="/login">Log in</a>
          <a href="/signup" class="cta">Sign up</a>
        </div>
      </nav>
    </header>
  
```

## Uses
- @community/method-heuristic-review

## Behavior
- Open on hover with 150ms intent delay; open instantly on click or Enter/Space.
- Arrow Down opens the panel and moves focus to the first link.
- Tab moves through panel links in DOM order; Shift+Tab reverses.
- Escape closes the panel and returns focus to the trigger.
- Outside click or hovering a different top-level item closes the current panel.
- Panel width is constrained to the page max-width and aligned with the trigger.

## A11y
- Each trigger uses `aria-expanded` and `aria-controls` pointing to the panel id.
- Panel uses `role='region'` with an accessible name (aria-label or aria-labelledby).
- Panel is `hidden` (not just CSS display:none) when closed so it is removed from the a11y tree.
- Hover-only opening fails keyboard users — also support Enter/Space and Arrow Down.
- Decorative icons must have `aria-hidden='true'`; functional icons need labels.

## Compatible
- @community/pattern-progressive-disclosure

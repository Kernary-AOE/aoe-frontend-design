# EnterpriseGlobalFrame [pattern] v1.0.0
A stable global navigation frame (top bar or side rail) that persists structurally across all products and modules in a multi-product enterprise application. It must not disappear, reposition, or change its core structure on context switches.
domain: frontend-design

## Label
Enterprise Persistent Global Frame

## Problem
In multi-product enterprise apps, product-level navigation replacing the global frame on every switch forces users to re-orient on each context change — breaking spatial memory and adding cognitive load at the worst moment (mid-task context switch).

## Solution
Establish a global frame (top navigation bar or left side rail) whose position, dimensions, and core elements (logo, account, global search, product switcher) remain constant across all products. Product-specific navigation lives in a secondary layer inside the frame.

## Structure
```
    <!-- Top bar stays identical across Product A, Product B, Product C -->
    <header class="global-frame" role="banner">
      <a href="/" class="global-logo" aria-label="Home"><!-- Logo --></a>
      <nav class="product-switcher" aria-label="Product switcher">
        <!-- product list here -->
      </nav>
      <div class="global-search"><!-- shared search --></div>
      <div class="global-account"><!-- avatar + settings --></div>
    </header>

    <!-- Product-specific secondary nav changes; global-frame does not -->
    <aside class="product-nav" aria-label="Product navigation">
      <!-- per-product links -->
    </aside>

    <main class="product-content">
      <!-- product content -->
    </main>
  
```

## Label
Enterprise Persistent Global Frame

## Problem
In multi-product enterprise apps, product-level navigation replacing the global frame on every switch forces users to re-orient on each context change — breaking spatial memory and adding cognitive load at the worst moment (mid-task context switch).

## Solution
Establish a global frame (top navigation bar or left side rail) whose position, dimensions, and core elements (logo, account, global search, product switcher) remain constant across all products. Product-specific navigation lives in a secondary layer inside the frame.

## Structure
```
    <!-- Top bar stays identical across Product A, Product B, Product C -->
    <header class="global-frame" role="banner">
      <a href="/" class="global-logo" aria-label="Home"><!-- Logo --></a>
      <nav class="product-switcher" aria-label="Product switcher">
        <!-- product list here -->
      </nav>
      <div class="global-search"><!-- shared search --></div>
      <div class="global-account"><!-- avatar + settings --></div>
    </header>

    <!-- Product-specific secondary nav changes; global-frame does not -->
    <aside class="product-nav" aria-label="Product navigation">
      <!-- per-product links -->
    </aside>

    <main class="product-content">
      <!-- product content -->
    </main>
  
```

# DashboardSidebar [pattern] v1.0.0
A collapsible left navigation sidebar for admin dashboards. Three modes: expanded (256px), icon-only (48px), and mobile drawer (288px). Contains brand logo, optional command/search, grouped nav items with icons, collapsible sub-groups, and a user footer.
domain: frontend-design

## Label
Dashboard Sidebar Navigation

## Problem
Fixed-width sidebars waste screen real estate on laptops; hidden hamburger menus lose navigation discoverability on desktop. Users need a navigation surface that adapts across viewport sizes without hiding all structure.

## Solution
Three-state sidebar: desktop expanded (16rem), icon-only toggle (3rem, icons with tooltips), mobile sheet/drawer (18rem, slide-in with backdrop). Active items use bg-sidebar-accent + font-medium. Collapse is animated via transition-[left,right,width] duration-200 ease-linear. On mobile, use a Sheet component with backdrop overlay, focus trap, and ESC close.

## Structure
```
    <aside
      id="sidebar"
      class="sidebar sidebar--expanded"
      aria-label="Primary navigation"
      style="
        width: 16rem;          /* 256px expanded; 3rem = 48px icon-only */
        transition: left 200ms ease-linear, right 200ms ease-linear, width 200ms ease-linear;
      "
    >
      <!-- Brand -->
      <div class="sidebar__brand">
        <img src="/logo.svg" alt="App logo" width="32" height="32" />
        <span class="sidebar__brand-name">AppName</span>
      </div>

      <!-- Command / Search -->
      <div class="sidebar__search">
        <button type="button" aria-label="Open command menu (⌘K)">
          <svg aria-hidden="true"></svg>
          <span>Search...</span>
          <kbd aria-hidden="true">⌘K</kbd>
        </button>
      </div>

      <!-- Nav groups -->
      <nav aria-label="Main">
        <ul role="list">
          <!-- Group label -->
          <li class="sidebar__group-label" aria-hidden="true">Main</li>

          <!-- Nav item: active -->
          <li>
            <a href="/dashboard"
               aria-current="page"
               class="sidebar__item sidebar__item--active">
              <svg aria-hidden="true" class="sidebar__icon"></svg>
              <span class="sidebar__label">Dashboard</span>
            </a>
          </li>

          <!-- Nav item: with badge -->
          <li>
            <a href="/orders" class="sidebar__item">
              <svg aria-hidden="true" class="sidebar__icon"></svg>
              <span class="sidebar__label">Orders</span>
              <span class="sidebar__badge" aria-label="12 new orders">12</span>
            </a>
          </li>

          <!-- Collapsible group -->
          <li>
            <button
              type="button"
              class="sidebar__item sidebar__item--collapsible"
              aria-expanded="false"
              aria-controls="sidebar-settings"
            >
              <svg aria-hidden="true" class="sidebar__icon"></svg>
              <span class="sidebar__label">Settings</span>
              <svg aria-hidden="true" class="sidebar__chevron"></svg>
            </button>
            <ul id="sidebar-settings" role="list" hidden>
              <li><a href="/settings/profile" class="sidebar__subitem">Profile</a></li>
              <li><a href="/settings/billing" class="sidebar__subitem">Billing</a></li>
            </ul>
          </li>
        </ul>
      </nav>

      <!-- Footer: user info -->
      <div class="sidebar__footer">
        <button type="button" class="sidebar__user" aria-label="User menu" aria-haspopup="true">
          <img src="" alt="" class="sidebar__avatar" aria-hidden="true" />
          <div class="sidebar__user-info">
            <span class="sidebar__user-name">Jane Doe</span>
            <span class="sidebar__user-email">jane@example.com</span>
          </div>
        </button>
      </div>
    </aside>
  
```

# DashboardHeader [pattern] v1.0.0
A compact 48px sticky topbar for admin dashboards. Contains: sidebar toggle (left), breadcrumbs or search bar (center/left), and a right-side cluster of notifications, theme toggle, and user avatar. Uses backdrop-blur for a frosted-glass effect on scroll.
domain: frontend-design

## Label
Dashboard Topbar / Header

## Problem
Dashboard headers that are too tall (64px+) or lack stickiness reduce the visible data area. Non-sticky headers lose the breadcrumb context when scrolling, making users lose their location.

## Solution
Fix the header to 48px (h-12). Make it sticky at z-50 with a semi-transparent background and backdrop-blur so content scrolls beneath it. Left: sidebar toggle + breadcrumbs. Right: notification bell, theme toggle, user avatar button. Horizontal padding px-4 lg:px-6, border-b.

## Structure
```
    <header
      class="topbar"
      aria-label="Application header"
      style="
        position: sticky;
        top: 0;
        z-index: 50;
        height: 48px;
        background: hsl(var(--background) / 0.5);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid hsl(var(--border));
        display: flex;
        align-items: center;
        padding: 0 1rem;
        gap: 0.5rem;
      "
    >
      <!-- Sidebar toggle -->
      <button
        type="button"
        class="topbar__sidebar-toggle"
        aria-label="Toggle sidebar"
        aria-expanded="true"
        aria-controls="sidebar"
      >
        <svg aria-hidden="true"></svg>
      </button>

      <!-- Breadcrumbs (or search) -->
      <nav aria-label="Breadcrumb" class="topbar__breadcrumb">
        <ol>
          <li><a href="/dashboard">Dashboard</a></li>
          <li aria-current="page">Overview</li>
        </ol>
      </nav>

      <!-- Right cluster -->
      <div class="topbar__actions" role="group" aria-label="Header actions">
        <button type="button" aria-label="Notifications (3 unread)">
          <svg aria-hidden="true"></svg>
          <span class="badge" aria-hidden="true">3</span>
        </button>
        <button type="button" aria-label="Toggle theme">
          <svg aria-hidden="true"></svg>
        </button>
        <button type="button" class="topbar__avatar" aria-label="User menu" aria-haspopup="true">
          <img src="" alt="" aria-hidden="true" />
          <span class="visually-hidden">User menu</span>
        </button>
      </div>
    </header>
  
```

# DocPage [pattern] v1.0.0
A standardized layout for documentation pages that supports navigability at scale: fixed left sidebar navigation, scrollable content column with max-width 680–720px, and a right-column table of contents that tracks scroll position.
domain: frontend-design

## Label
Documentation Page Layout

## Problem
Documentation without structure becomes unsearchable as it grows. Users cannot scan for their section, lose their place when scrolling, and cannot link to a specific heading.

## Solution
Three-column layout: left nav (200–240px, fixed or sticky), main content (max-width 680px, 16px body), right TOC (160–200px, sticky, links to h2/h3 headings with active state tracking).

## Structure
```
    <div class="doc-layout">
      <nav class="doc-sidebar" aria-label="Documentation navigation">
        <!-- collapsible section groups with aria-current="page" on active link -->
      </nav>

      <main class="doc-content" id="main-content">
        <h1>Page Title</h1>
        <!-- content blocks -->
      </main>

      <nav class="doc-toc" aria-label="On this page">
        <p class="toc-label">On this page</p>
        <ul>
          <li><a href="#section-1">Section 1</a></li>
          <!-- generated from h2/h3 headings in main content -->
        </ul>
      </nav>
    </div>
  
```

## Behavior
- Left sidebar: sections collapse/expand; active page link has aria-current='page' and visual highlight.
- Main content: max-width 680–720px for optimal 60–75 character line length.
- Right TOC: sticky; active heading link updates as user scrolls using IntersectionObserver.
- Mobile: sidebar becomes a slide-in drawer triggered by a hamburger; TOC collapses into an 'On this page' disclosure above the content.
- Code blocks: always include a copy button and language label.

## A11y
- Two distinct nav landmarks (sidebar and TOC) with unique aria-label values.
- Skip link to #main-content for keyboard-only users.
- Active TOC link communicates position: aria-current='true' on the current section anchor.

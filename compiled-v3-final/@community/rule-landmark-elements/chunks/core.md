# LandmarkElements [rule] v1.0.0
Major page regions MUST be wrapped in HTML landmark elements — <header>, <nav>, <main>, <aside>, <footer>, <section aria-labelledby>, <form aria-label> — so screen reader users can jump directly to any region.
domain: frontend-design

## Severity
high

## Required Landmarks
- <header>: page banner — appears once per page (not inside <article> or <aside>)
- <nav aria-label='Primary'>: global navigation
- <nav aria-label='...' >: secondary/local navs must each have a unique aria-label
- <main>: exactly one per page; wraps the primary content area
- <aside aria-label='...'>: supplementary content (sidebars, ads, related links)
- <footer>: page footer
- <section aria-labelledby='heading-id'>: named sections within main

## Anti Patterns
- Divs with class='nav' or class='main' — invisible to AT landmark navigation
- Multiple unlabeled <nav> elements — screen readers announce 'navigation' twice with no distinction
- Nesting <header> or <footer> inside <main> without sectioning context

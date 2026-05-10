# CurrentLocationIndicator [rule] v1.0.0
> Every navigation component (global nav, sidebar, tab bar, breadcrumb) must visually mark the active item with a distinct treatment AND set aria-current='page' (for page-level) or aria-current='true' (for section-level) on the active element — so both visual and assistive-technology users can orient themselves at all times.
domain: frontend-design

## Label
Navigation Must Show Current Location

## Applies When
building any global navigation, local section navigation, sidebar, tab bar, or breadcrumb component

## Verify By
Navigate to each primary route; confirm the matching nav item has a visually distinct active state AND aria-current set in the DOM

## Code
```
    <!-- Correct: aria-current + visual active class -->
    <nav aria-label="Primary">
      <ul>
        <li><a href="/"        aria-current="page" class="nav-item nav-item--active">Home</a></li>
        <li><a href="/projects"                     class="nav-item">Projects</a></li>
        <li><a href="/settings"                     class="nav-item">Settings</a></li>
      </ul>
    </nav>

    <style>
      .nav-item--active {
        font-weight: 600;
        color: hsl(var(--accent));
        /* Left accent bar — common sidebar pattern */
        border-inline-start: 3px solid hsl(var(--accent));
        padding-inline-start: calc(1rem - 3px);
        background: hsl(var(--accent) / 0.08);
      }
    </style>
  
```

## Severity
warning

## Rationale
Without a location cue, users lose orientation, increase backtracking, and commit navigation errors. Nielsen's heuristic #1 (visibility of system status) requires the system to always keep users informed about where they are.

## Label
Navigation Must Show Current Location

## Applies When
building any global navigation, local section navigation, sidebar, tab bar, or breadcrumb component

## Verify By
Navigate to each primary route; confirm the matching nav item has a visually distinct active state AND aria-current set in the DOM

## Code
```
    <!-- Correct: aria-current + visual active class -->
    <nav aria-label="Primary">
      <ul>
        <li><a href="/"        aria-current="page" class="nav-item nav-item--active">Home</a></li>
        <li><a href="/projects"                     class="nav-item">Projects</a></li>
        <li><a href="/settings"                     class="nav-item">Settings</a></li>
      </ul>
    </nav>

    <style>
      .nav-item--active {
        font-weight: 600;
        color: hsl(var(--accent));
        /* Left accent bar — common sidebar pattern */
        border-inline-start: 3px solid hsl(var(--accent));
        padding-inline-start: calc(1rem - 3px);
        background: hsl(var(--accent) / 0.08);
      }
    </style>
  
```

## Severity
warning

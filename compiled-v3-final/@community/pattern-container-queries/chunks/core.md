# ContainerQueries [pattern] v1.0.0
Size components based on their container width using container-type: inline-size and @container name (min-width: Npx) rules, enabling components to adapt layout independently of the viewport — essential when the same component appears in a sidebar (narrow) and a main panel (wide).
domain: frontend-design

## Label
CSS Container Queries

## Problem
Viewport-based media queries force component layout decisions to be made at the page level. A card in a 300px sidebar and the same card in a 900px main panel need different layouts, but both render at the same viewport width.

## Solution
Establish a named containment context on the wrapper element with container-type: inline-size, then use @container queries inside the component to respond to the container's width rather than the viewport.

## Structure
```
    <!-- Wrapper establishes container context -->
    <div class="card-container">
      <article class="feature-card">
        <img class="feature-card__img" alt="Feature screenshot" />
        <div class="feature-card__body">
          <h3 class="feature-card__title">Container Query Card</h3>
          <p class="feature-card__desc">Adapts to container width, not viewport.</p>
        </div>
      </article>
    </div>
  
```

## Css
```
    /* 1. Establish containment on the wrapper */
    .card-container {
      container-type: inline-size;
      container-name: card;       /* optional named context */
    }

    /* 2. Default (narrow): stacked layout */
    .feature-card {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
    }

    /* 3. When container >= 400px: side-by-side layout */
    @container card (min-width: 400px) {
      .feature-card {
        grid-template-columns: 200px 1fr;
        align-items: center;
      }
    }

    /* 4. When container >= 640px: larger image */
    @container card (min-width: 640px) {
      .feature-card {
        grid-template-columns: 280px 1fr;
      }
    }
  
```

## Behavior
- Place container-type: inline-size on the direct parent of the component, not on a distant ancestor.
- Use container-name for disambiguation when multiple container contexts are nested.
- Container queries complement media queries — use media queries for page-level layout; container queries for component-level layout.
- Container queries are supported in Chrome 105+, Firefox 110+, Safari 16+. Use @supports for progressive enhancement in older targets.

# AccordionGridRows [template] v1.0.0
CSS-only accordion expand/collapse using grid-template-rows: 0fr → 1fr transition instead of height: 0 → auto. No JavaScript measurement required, no layout-forcing animation, GPU-composited friendly.
domain: frontend-design

## Label
Accordion Height Animation via grid-template-rows

## Code
```
    <!-- HTML -->
    <div class="accordion">
      <button
        class="accordion__trigger"
        aria-expanded="false"
        aria-controls="section-1"
        type="button"
      >
        Section title
        <svg class="accordion__chevron" aria-hidden="true"><!-- chevron icon --></svg>
      </button>

      <div
        id="section-1"
        class="accordion__content"
        role="region"
        aria-labelledby="trigger-id"
      >
        <div class="accordion__inner">
          <p>Content goes here. Can be any height.</p>
        </div>
      </div>
    </div>

    <!-- CSS -->
    <style>
      .accordion__content {
        display: grid;
        grid-template-rows: 0fr;           /* Collapsed: no visible rows */
        transition: grid-template-rows 300ms cubic-bezier(0.25, 1, 0.5, 1);
      }

      .accordion__content[aria-hidden="false"],
      .accordion__trigger[aria-expanded="true"] + .accordion__content {
        grid-template-rows: 1fr;           /* Expanded: full height */
      }

      .accordion__inner {
        overflow: hidden;                  /* Clips content during 0fr state */
        min-height: 0;                     /* Required for 0fr to work */
      }

      /* Chevron rotation */
      .accordion__trigger[aria-expanded="true"] .accordion__chevron {
        transform: rotate(180deg);
        transition: transform 300ms cubic-bezier(0.25, 1, 0.5, 1);
      }
    </style>

    <!-- JS (minimal) -->
    <script>
      document.querySelectorAll('.accordion__trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
          const expanded = trigger.getAttribute('aria-expanded') === 'true';
          trigger.setAttribute('aria-expanded', String(!expanded));
        });
      });
    </script>
  
```

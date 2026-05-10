# DocToc [pattern] v1.0.0
A sticky right-column table of contents that auto-generates from h2/h3 headings in the main content area and uses IntersectionObserver to highlight the currently visible section as the user scrolls.
domain: frontend-design

## Label
Documentation Table of Contents

## Structure
```
    <!-- HTML -->
    <nav class="doc-toc" aria-label="On this page">
      <p class="toc-heading">On this page</p>
      <ul id="toc-list">
        <!-- Populated dynamically from h2/h3 headings -->
      </ul>
    </nav>

    <script>
      // Auto-generate TOC from h2/h3 headings
      const headings = document.querySelectorAll('main h2, main h3');
      const tocList = document.getElementById('toc-list');

      headings.forEach(heading => {
        if (!heading.id) heading.id = heading.textContent.toLowerCase().replace(/\s+/g, '-');
        const li = document.createElement('li');
        li.dataset.level = heading.tagName.toLowerCase();
        const a = document.createElement('a');
        a.href = '#' + heading.id;
        a.textContent = heading.textContent;
        li.appendChild(a);
        tocList.appendChild(li);
      });

      // Track active section via IntersectionObserver
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            const link = tocList.querySelector('[href="#' + entry.target.id + '"]');
            if (link) link.classList.toggle('toc-active', entry.isIntersecting);
          });
        },
        { rootMargin: '-20% 0px -70% 0px' }
      );
      headings.forEach(h => observer.observe(h));
    </script>
  
```

## Behavior
- Generated from h2 and h3 headings — no manual maintenance.
- h3 links are visually indented (8–12px padding-left) to show hierarchy.
- Active link has a left accent bar and slightly darker text color.
- Sticky positioning: top: 4rem to clear the fixed header.
- Hidden on screens narrower than 1024px — collapses into a disclosure above main content.

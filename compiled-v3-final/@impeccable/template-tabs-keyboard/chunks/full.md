# TabsKeyboard [template] v1.0.0
WAI-ARIA Authoring Practices tabs: roving tabindex, ArrowLeft/Right (or Up/Down) traversal, Home/End to jump, optional auto-activation on focus, fully accessible.
domain: navigation

## Language
html-css-js

## Body
```
    <style>
      .tabs { font: inherit; }
      .tabs__list {
        display: flex;
        gap: 0;
        border-bottom: 1px solid oklch(88% 0.02 250);
        list-style: none;
        margin: 0;
        padding: 0;
      }
      .tabs[data-orientation="vertical"] .tabs__list {
        flex-direction: column;
        border-bottom: none;
        border-right: 1px solid oklch(88% 0.02 250);
      }
      .tabs__tab {
        background: transparent;
        border: none;
        padding: 10px 16px;
        cursor: pointer;
        font: inherit;
        color: oklch(45% 0.02 250);
        border-bottom: 2px solid transparent;
        margin-bottom: -1px;
      }
      .tabs[data-orientation="vertical"] .tabs__tab {
        text-align: left;
        border-bottom: none;
        border-right: 2px solid transparent;
        margin-right: -1px;
        margin-bottom: 0;
      }
      .tabs__tab[aria-selected="true"] {
        color: {ACCENT_COLOR};
        border-color: {ACCENT_COLOR};
        font-weight: 500;
      }
      .tabs__tab:focus-visible {
        outline: 2px solid {ACCENT_COLOR};
        outline-offset: -2px;
        border-radius: 4px;
      }
      .tabs__panel {
        padding: 16px 4px;
      }
      .tabs__panel[hidden] { display: none; }
    </style>

    <div class="tabs" data-tabs data-orientation="{ORIENTATION}">
      <ul class="tabs__list" role="tablist" aria-label="Sections">
        <li role="presentation"><button id="tab-1" class="tabs__tab" role="tab" aria-selected="true"  aria-controls="panel-1" tabindex="0">Overview</button></li>
        <li role="presentation"><button id="tab-2" class="tabs__tab" role="tab" aria-selected="false" aria-controls="panel-2" tabindex="-1">Settings</button></li>
        <li role="presentation"><button id="tab-3" class="tabs__tab" role="tab" aria-selected="false" aria-controls="panel-3" tabindex="-1">Activity</button></li>
      </ul>
      <div class="tabs__panel" id="panel-1" role="tabpanel" aria-labelledby="tab-1" tabindex="0">
        <p>Overview content here.</p>
      </div>
      <div class="tabs__panel" id="panel-2" role="tabpanel" aria-labelledby="tab-2" tabindex="0" hidden>
        <p>Settings content here.</p>
      </div>
      <div class="tabs__panel" id="panel-3" role="tabpanel" aria-labelledby="tab-3" tabindex="0" hidden>
        <p>Activity content here.</p>
      </div>
    </div>

    <script>
      (function() {
        var AUTO_ACTIVATE = {AUTO_ACTIVATE};
        document.querySelectorAll('[data-tabs]').forEach(function(root) {
          var orientation = root.getAttribute('data-orientation') || 'horizontal';
          var tabs = Array.from(root.querySelectorAll('[role="tab"]'));

          function activate(tab) {
            tabs.forEach(function(t) {
              var selected = t === tab;
              t.setAttribute('aria-selected', selected ? 'true' : 'false');
              t.setAttribute('tabindex', selected ? '0' : '-1');
              var panel = document.getElementById(t.getAttribute('aria-controls'));
              if (panel) panel.hidden = !selected;
            });
          }
          function focusTab(tab) {
            tab.focus();
            if (AUTO_ACTIVATE) activate(tab);
          }

          tabs.forEach(function(tab) {
            tab.addEventListener('click', function() { activate(tab); tab.focus(); });
            tab.addEventListener('keydown', function(e) {
              var idx = tabs.indexOf(tab);
              var nextKey = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';
              var prevKey = orientation === 'vertical' ? 'ArrowUp'   : 'ArrowLeft';
              if (e.key === nextKey)        { e.preventDefault(); focusTab(tabs[(idx + 1) % tabs.length]); }
              else if (e.key === prevKey)   { e.preventDefault(); focusTab(tabs[(idx - 1 + tabs.length) % tabs.length]); }
              else if (e.key === 'Home')    { e.preventDefault(); focusTab(tabs[0]); }
              else if (e.key === 'End')     { e.preventDefault(); focusTab(tabs[tabs.length - 1]); }
              else if (!AUTO_ACTIVATE && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault(); activate(tab);
              }
            });
          });
        });
      })();
    </script>
  
```

## Usage Notes
- Roving tabindex: only the selected tab has tabindex=0; others get -1 so Tab moves OUT of the list.
- AUTO_ACTIVATE=true matches WAI-ARIA APG 'automatic' activation — best for cheap content swaps.
- Set AUTO_ACTIVATE=false when activating a tab is expensive (e.g. fetches data) — user must press Enter/Space.
- Each panel needs aria-labelledby pointing at its tab and tabindex=0 so it's focusable for scrolling.
- For vertical tabs, switch ArrowLeft/Right to ArrowUp/Down via data-orientation.

## Tested In
- Chrome 120+
- Firefox 121
- Safari 17

## Accessibility
- WAI-ARIA APG tablist/tab/tabpanel pattern.
- Roving tabindex keeps Tab key flow predictable.
- Home/End jump to first/last tab; Arrow keys traverse.
- Panels labelled by their controlling tab.

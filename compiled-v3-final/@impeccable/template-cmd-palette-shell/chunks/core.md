# CmdPaletteShell [template] v1.0.0
Cmd+K command palette shell: trigger combo, modal with input, filtered list, ArrowUp/Down + Enter navigation, Esc close. Plug your own command source into window.cmdPalette.setCommands().
domain: power-user

## Language
html-css-js

## Body
```
    <style>
      .cmdp {
        position: fixed; inset: 0;
        display: none;
        align-items: flex-start;
        justify-content: center;
        background: oklch(20% 0.02 250 / 0.45);
        backdrop-filter: blur(4px);
        z-index: 1000;
        padding-top: 12vh;
      }
      .cmdp[data-open="true"] { display: flex; }
      .cmdp__panel {
        width: min(640px, calc(100% - 32px));
        background: white;
        border-radius: 12px;
        box-shadow: 0 24px 64px oklch(20% 0.02 250 / 0.3);
        overflow: hidden;
      }
      .cmdp__input {
        display: block;
        width: 100%;
        font: inherit;
        font-size: 1rem;
        padding: 16px 20px;
        border: none;
        border-bottom: 1px solid oklch(92% 0.01 250);
        outline: none;
        background: transparent;
      }
      .cmdp__list {
        list-style: none;
        margin: 0;
        padding: 6px;
        max-height: 50vh;
        overflow: auto;
      }
      .cmdp__item {
        padding: 10px 14px;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 0.9rem;
      }
      .cmdp__item[aria-selected="true"] {
        background: oklch(96% 0.02 250);
        box-shadow: inset 3px 0 0 {ACCENT_COLOR};
      }
      .cmdp__empty {
        padding: 24px;
        text-align: center;
        color: oklch(50% 0.02 250);
        font-size: 0.9rem;
      }
    </style>

    <div class="cmdp"
         id="cmdp"
         data-open="false"
         role="dialog"
         aria-modal="true"
         aria-label="Command palette"
         hidden>
      <div class="cmdp__panel">
        <input class="cmdp__input"
               type="search"
               placeholder="{PLACEHOLDER}"
               aria-controls="cmdp-list"
               aria-autocomplete="list"
               data-cmdp-input>
        <ul class="cmdp__list"
            id="cmdp-list"
            role="listbox"
            aria-label="Commands"
            data-cmdp-list></ul>
      </div>
    </div>

    <script>
      (function() {
        var overlay = document.getElementById('cmdp');
        if (!overlay) return;
        var input = overlay.querySelector('[data-cmdp-input]');
        var list  = overlay.querySelector('[data-cmdp-list]');
        var lastFocus = null;
        var commands = [
          { id: 'home',     label: 'Go to Home',         hint: 'g h' },
          { id: 'inbox',    label: 'Open Inbox',         hint: 'g i' },
          { id: 'new',      label: 'Create new item',    hint: 'n'  },
          { id: 'settings', label: 'Open Settings',      hint: ',' },
        ];
        var selected = 0;

        function render() {
          var q = input.value.trim().toLowerCase();
          var filtered = commands.filter(function(c) {
            return !q || c.label.toLowerCase().indexOf(q) !== -1;
          });
          list.innerHTML = '';
          if (filtered.length === 0) {
            var empty = document.createElement('li');
            empty.className = 'cmdp__empty';
            empty.textContent = 'No matches';
            list.appendChild(empty);
            return;
          }
          selected = Math.min(selected, filtered.length - 1);
          filtered.forEach(function(cmd, i) {
            var li = document.createElement('li');
            li.className = 'cmdp__item';
            li.setAttribute('role', 'option');
            li.setAttribute('id', 'cmdp-opt-' + i);
            li.setAttribute('aria-selected', i === selected ? 'true' : 'false');
            li.innerHTML = '<span style="flex:1">' + cmd.label + '</span><kbd style="opacity:0.6">' + cmd.hint + '</kbd>';
            li.addEventListener('click', function() { run(cmd); });
            list.appendChild(li);
          });
          input.setAttribute('aria-activedescendant', 'cmdp-opt-' + selected);
        }
        function run(cmd) {
          overlay.dispatchEvent(new CustomEvent('cmdp:run', { detail: cmd }));
          close();
        }
        function open() {
          lastFocus = document.activeElement;
          overlay.removeAttribute('hidden');
          overlay.setAttribute('data-open', 'true');
          document.documentElement.style.overflow = 'hidden';
          input.value = '';
          selected = 0;
          render();
          setTimeout(function() { input.focus(); }, 0);
        }
        function close() {
          overlay.setAttribute('data-open', 'false');
          overlay.setAttribute('hidden', '');
          document.documentElement.style.overflow = '';
          lastFocus && lastFocus.focus && lastFocus.focus();
        }

        document.addEventListener('keydown', function(e) {
          if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === '{HOTKEY}') {
            e.preventDefault();
            overlay.getAttribute('data-open') === 'true' ? close() : open();
          }
          if (overlay.getAttribute('data-open') !== 'true') return;
          if (e.key === 'Escape')   { e.preventDefault(); close(); }
          if (e.key === 'ArrowDown'){ e.preventDefault(); selected += 1; render(); }
          if (e.key === 'ArrowUp')  { e.preventDefault(); selected = Math.max(0, selected - 1); render(); }
          if (e.key === 'Enter')    {
            e.preventDefault();
            var item = list.children[selected];
            item && item.click();
          }
        });
        input.addEventListener('input', function() { selected = 0; render(); });
        overlay.addEventListener('click', function(e) {
          if (e.target === overlay) close();
        });

        window.cmdPalette = {
          open: open,
          close: close,
          setCommands: function(arr) { commands = arr; render(); },
        };
      })();
      // Listen for selection: document.getElementById('cmdp').addEventListener('cmdp:run', e => console.log(e.detail));
    </script>
  
```

## Usage Notes
- Replace the in-memory `commands` array with your real source via window.cmdPalette.setCommands().
- Listen for cmdp:run CustomEvent to handle command execution outside the shell.
- On macOS use ⌘K, on Windows/Linux use Ctrl+K — both handled here via metaKey || ctrlKey.
- aria-activedescendant tracks selection without moving DOM focus from the input.
- Always include an empty state — never leave the list silently empty.

## Tested In
- Chrome 120+
- Firefox 121
- Safari 17

## Accessibility
- role=dialog + aria-modal on overlay; role=listbox + role=option in list.
- aria-activedescendant + aria-controls correctly link input to options.
- Focus saved/restored; body scroll locked.
- Esc + click-outside dismiss reliably.

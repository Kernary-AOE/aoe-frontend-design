# ToastStack [template] v1.0.0
Toast notification stack with auto-dismiss, polite live region, slide-in animation, and stack management. Call window.toast(message, options) to push.
domain: notifications

## Language
html-css-js

## Body
```
    <style>
      .toast-region {
        position: fixed;
        bottom: 20px;
        right: 20px;
        display: flex;
        flex-direction: column-reverse;
        gap: {GAP};
        pointer-events: none;
        z-index: 9999;
        max-width: 360px;
      }
      .toast-region[data-position="bottom-left"]  { right: auto; left: 20px; }
      .toast-region[data-position="top-right"]    { bottom: auto; top: 20px; flex-direction: column; }
      .toast-region[data-position="top-left"]     { bottom: auto; top: 20px; right: auto; left: 20px; flex-direction: column; }

      .toast {
        pointer-events: auto;
        background: oklch(99% 0.005 250);
        color: oklch(20% 0.02 250);
        border: 1px solid oklch(88% 0.02 250);
        border-left: 4px solid {ACCENT_COLOR};
        border-radius: 8px;
        padding: 12px 16px;
        box-shadow: 0 6px 24px oklch(20% 0.02 250 / 0.12);
        display: flex;
        gap: 12px;
        align-items: flex-start;
        animation: toast-in 220ms ease-out;
      }
      .toast[data-variant="success"] { border-left-color: oklch(60% 0.15 145); }
      .toast[data-variant="error"]   { border-left-color: oklch(58% 0.18 25);  }
      .toast[data-variant="warning"] { border-left-color: oklch(70% 0.15 75);  }

      .toast.is-leaving { animation: toast-out 180ms ease-in forwards; }

      .toast__body { flex: 1; line-height: 1.45; font-size: 0.9rem; }
      .toast__close {
        background: transparent;
        border: none;
        cursor: pointer;
        font-size: 1rem;
        color: oklch(50% 0.02 250);
        padding: 0 4px;
      }
      .toast__close:focus-visible {
        outline: 2px solid {ACCENT_COLOR};
        outline-offset: 2px;
        border-radius: 2px;
      }

      @keyframes toast-in {
        from { transform: translateY(8px); opacity: 0; }
        to   { transform: translateY(0);   opacity: 1; }
      }
      @keyframes toast-out {
        to { transform: translateY(8px); opacity: 0; }
      }
      @media (prefers-reduced-motion: reduce) {
        .toast, .toast.is-leaving { animation: none; }
      }
    </style>

    <div class="toast-region"
         id="toast-region"
         data-position="{POSITION}"
         role="region"
         aria-label="Notifications"
         aria-live="polite"></div>

    <script>
      (function() {
        var region = document.getElementById('toast-region');
        if (!region) return;

        function dismiss(node) {
          node.classList.add('is-leaving');
          node.addEventListener('animationend', function() {
            node.remove();
          }, { once: true });
        }

        window.toast = function(message, opts) {
          opts = opts || {};
          var node = document.createElement('div');
          node.className = 'toast';
          node.setAttribute('role', opts.variant === 'error' ? 'alert' : 'status');
          if (opts.variant) node.setAttribute('data-variant', opts.variant);

          var body = document.createElement('div');
          body.className = 'toast__body';
          body.textContent = message;

          var close = document.createElement('button');
          close.type = 'button';
          close.className = 'toast__close';
          close.setAttribute('aria-label', 'Dismiss notification');
          close.textContent = '×';
          close.addEventListener('click', function() { dismiss(node); });

          node.appendChild(body);
          node.appendChild(close);
          region.appendChild(node);

          var timeout = opts.timeout != null ? opts.timeout : {DEFAULT_TIMEOUT};
          if (timeout > 0) setTimeout(function() { dismiss(node); }, timeout);
          return node;
        };
      })();

      // Usage: window.toast('Saved successfully', { variant: 'success' });
    </script>
  
```

## Usage Notes
- Region uses aria-live=polite by default; errors override to role=alert for assertive announcement.
- Always set timeout=0 for actionable toasts (with undo button) so users have time to read.
- Stack respects column-reverse so newest appears nearest the anchor.
- Animation disabled under prefers-reduced-motion — toasts still appear, just without slide.
- Dismiss button has aria-label since × is not announced consistently.

## Tested In
- Chrome 120+
- Firefox 121
- Safari 17

## Accessibility
- aria-live=polite on region; role=alert on error variants.
- Dismiss button labelled and keyboard accessible.
- prefers-reduced-motion disables slide animation.
- Toasts are pointer-events:none on region but auto on cards — page underneath stays clickable.

## Relations
enhances: [@community/pattern-toast-stack]

## Enhances
- @community/pattern-toast-stack

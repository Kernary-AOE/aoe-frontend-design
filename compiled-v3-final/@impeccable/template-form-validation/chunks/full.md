# FormValidationInline [template] v1.0.0
Inline form field validation using native :invalid + custom validity messages + aria-live error region. Zero JS libraries; works without JS for HTML-native types.
domain: forms

## Language
html-css-js

## Body
```
    <style>
      .field {
        display: grid;
        gap: 6px;
        max-width: 420px;
      }
      .field label {
        font-weight: 500;
      }
      .field input {
        padding: 10px 12px;
        border: 1px solid oklch(80% 0.02 250);
        border-radius: 8px;
        font: inherit;
        background: white;
        color: inherit;
      }
      .field input:focus-visible {
        outline: 2px solid {ACCENT_COLOR};
        outline-offset: 2px;
      }
      /* Only show error styling once user has interacted */
      .field input[data-touched="true"]:invalid {
        border-color: {ERROR_COLOR};
      }
      .field .error {
        color: {ERROR_COLOR};
        font-size: 0.875rem;
        min-height: 1.25em;
      }
      .field input:not([data-touched="true"]) ~ .error,
      .field input[data-touched="true"]:valid ~ .error {
        visibility: hidden;
      }
    </style>

    <div class="field">
      <label for="f-{FIELD_NAME}">{FIELD_LABEL}</label>
      <input id="f-{FIELD_NAME}"
             name="{FIELD_NAME}"
             type="{FIELD_TYPE}"
             required
             aria-describedby="f-{FIELD_NAME}-err"
             aria-invalid="false"
             data-touched="false">
      <p id="f-{FIELD_NAME}-err"
         class="error"
         role="alert"
         aria-live="polite"></p>
    </div>

    <script>
      (function() {
        var input = document.getElementById('f-{FIELD_NAME}');
        var err = document.getElementById('f-{FIELD_NAME}-err');
        if (!input || !err) return;

        function showError() {
          var msg = input.validationMessage || '{ERROR_MESSAGE}';
          err.textContent = input.validity.valid ? '' : msg;
          input.setAttribute('aria-invalid', input.validity.valid ? 'false' : 'true');
        }
        input.addEventListener('blur', function() {
          input.setAttribute('data-touched', 'true');
          showError();
        });
        input.addEventListener('input', function() {
          if (input.getAttribute('data-touched') === 'true') showError();
        });
        input.form && input.form.addEventListener('submit', function(e) {
          input.setAttribute('data-touched', 'true');
          showError();
          if (!input.validity.valid) {
            e.preventDefault();
            input.focus();
          }
        });
      })();
    </script>
  
```

## Usage Notes
- Repeat the .field block per input; each gets its own data-touched flag.
- Always use aria-describedby pointing to the error region id.
- Use role=alert + aria-live=polite — screen readers will announce the error once visible.
- Pair with HTML5 type=email|tel|url|number whenever possible — the browser provides free validation.
- Customize messages with input.setCustomValidity() if you need patterns beyond native.

## Tested In
- Chrome 120+
- Firefox 121
- Safari 17

## Accessibility
- aria-invalid syncs with validity state.
- aria-live=polite announces error without stealing focus.
- data-touched prevents pre-emptive errors before user interaction.
- Submit handler refocuses the first invalid field.

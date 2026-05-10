# InlineValidation [pattern] v1.0.0
Validates form fields at the field level, displaying success/error messaging adjacent to each input rather than only on submit. Fires after the user signals they are 'done' with the field (blur or after a debounce).
domain: frontend-design

## Facts

## Label
Inline Form Validation

## Problem
Submit-only validation surprises users at the end of a long form, often with a list of errors far from the offending fields. Real-time on-keystroke validation is noisy and fires while the user is mid-typing.

## Solution
Validate on `blur` (or after a 500ms idle pause for fields with constraints like email format). Show inline error directly under the field with both an icon and text; clear it on next valid input.

## Structure
```
    <form novalidate>
      <div class="field" data-state="error">
        <label for="email">Work email</label>
        <input
          id="email"
          name="email"
          type="email"
          autocomplete="email"
          aria-invalid="true"
          aria-describedby="email-help email-err"
          required
        />
        <p id="email-help" class="hint">We will send a verification link.</p>
        <p id="email-err" class="err" role="alert">
          <svg aria-hidden="true"></svg>
          Enter a valid email like name@company.com
        </p>
      </div>

      <div class="field" data-state="ok">
        <label for="pw">Password</label>
        <input
          id="pw"
          name="password"
          type="password"
          aria-describedby="pw-meter pw-help"
          minlength="12"
          required
        />
        <p id="pw-help" class="hint">12+ characters, mixed case, a number.</p>
        <div id="pw-meter" class="meter" role="progressbar" aria-valuemin="0" aria-valuemax="4" aria-valuenow="3" aria-label="Password strength: strong"></div>
      </div>
    </form>
  
```

## Uses
- @community/method-heuristic-review

## Behavior
- Validate on blur (or after a 500ms idle pause for typed constraints like email or URL).
- Do not validate on every keystroke until the field has first been blurred once.
- Once a field has shown an error, re-validate on input so the error clears immediately when the user fixes it.
- Error messages explain what the user should do, not just what is wrong: 'Enter a valid email' not 'Invalid'.
- Pair error icon with text — color alone is insufficient.
- Submit always re-runs validation across all fields and focuses the first invalid field.

## A11y
- Use `aria-invalid='true'` on the input when in error state.
- Link error message via `aria-describedby` so screen readers read it after the input label.
- Error message uses `role='alert'` so it is announced when shown without taking focus.
- Hint text and error text both go in `aria-describedby` (space-separated id list).
- Strength meters use `role='progressbar'` with `aria-valuemin`/`max`/`now` and a text label like 'Password strength: strong'.

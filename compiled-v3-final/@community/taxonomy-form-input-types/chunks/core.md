# FormInputTypes [taxonomy] v1.0.0
A taxonomy of HTML form input controls and their semantic types. The HTML5 specification defines 22 input `type` values plus several distinct elements (textarea, select, button). Choosing the correct type unlocks browser-native validation, mobile keyboard optimization, autocomplete behavior, and accessibility affordances — using the wrong type (e.g. `type='text'` for an email) is a common, silent accessibility regression.
domain: frontend-engineering

## Label
HTML Form Input Types

## Members
- text
- email
- password
- number
- tel
- url
- search
- date
- datetime-local
- time
- week
- month
- color
- range
- checkbox
- radio
- file
- hidden
- submit
- reset
- button
- image
- textarea
- select

## Groups
- **Text Input**:
  - **Members**:
    - text
    - email
    - password
    - tel
    - url
    - search
    - textarea
  - **Shared Features**: Triggers a text-entry keyboard on mobile; supports `pattern`, `minlength`, `maxlength`, `placeholder`, `autocomplete`.
  - **Mobile Keyboard**:
    - **Text**: default alphanumeric
    - **Email**: shows @ and . prominently
    - **Tel**: numeric pad with - and ()
    - **Url**: shows / and . prominently
    - **Search**: may show 'Search' return key
- **Numeric Input**:
  - **Members**:
    - number
    - range
  - **Notes**: `number` is for numeric values; `range` is for slider-selectable values within min/max. Use `inputmode='numeric'` on type=text for number-like inputs (e.g. card numbers) where you do NOT want the up/down spinner.
- **Datetime Input**:
  - **Members**:
    - date
    - datetime-local
    - time
    - week
    - month
  - **Notes**: Native UI varies wildly across browsers/OS. For consistent UX, use a library (Radix Date Picker, react-day-picker) and submit ISO-8601 strings.
- **Selection Input**:
  - **Members**:
    - checkbox
    - radio
    - select
  - **Notes**: checkbox = independent toggles (multiple selectable); radio = mutually exclusive (single from group, requires shared `name`); select = dropdown menu, prefer over radio when >5 options.
- **Specialized**:
  - **Members**:
    - color
    - file
    - hidden
    - image
  - **Notes**: color = native color picker (varies by browser); file = file upload with optional `accept` mime filter; hidden = form-only data; image = legacy graphical submit button (avoid).
- **Actions**:
  - **Members**:
    - submit
    - reset
    - button
  - **Notes**: Always set `type` explicitly on `<button>` inside forms — default is `submit` which causes accidental form submission. See @community/check-button-type-explicit.

## Selection Rules
-
  - **Use**: email
  - **When**: user enters an email address
  - **Benefit**: browser validates format, mobile keyboard shows @, autocomplete suggests addresses
-
  - **Use**: tel
  - **When**: user enters a phone number
  - **Benefit**: numeric keypad on mobile, no spell-check, autocomplete (`tel`, `tel-national`)
-
  - **Use**: password
  - **When**: user enters a password
  - **Benefit**: characters are masked, password managers detect, 1Password/iCloud keychain integration
-
  - **Use**: search
  - **When**: user enters a search query
  - **Benefit**: browser may add a clear (×) icon, search-styled keyboard return key
-
  - **Use**: number
  - **When**: user enters a numeric value with up/down spinners (rare in production)
  - **Caveat**: Avoid for IDs, card numbers, postal codes — use type=text + inputmode='numeric' instead. type=number can be incremented/decremented unintentionally and rejects leading zeros.

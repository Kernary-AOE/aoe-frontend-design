# NoIconsWithoutLabel [constraint] v1.0.0
Every icon-only interactive control must expose an accessible name via aria-label, aria-labelledby, or visually-hidden text. Decorative icons inside a labeled control are exempt.
domain: accessibility

## Target
- icon-only buttons
- icon-only links
- icon-only triggers (menu, toolbar, drawer)

## Severity
critical

## Values
-
  - **Required**: <button aria-label='Close dialog'><svg aria-hidden='true' /></button>
-
  - **Required**: <a href=… aria-label='Open menu'><svg aria-hidden='true' /></a>
-
  - **Required**: <button><svg aria-hidden='true' /><span class='sr-only'>Search</span></button>
-
  - **Forbidden**: <button><svg /></button> with no label
-
  - **Forbidden**: aria-label='' (empty label)
-
  - **Forbidden**: title='…' as the sole accessible name (title is not reliably announced)

## Exceptions
- Decorative icons placed alongside visible text inside the same control (the visible text is the name; the SVG should be aria-hidden='true').
- Icons used in a static infographic with adjacent caption text and no interaction.

## Approved Alternatives
- Tailwind: `<span class='sr-only'>Label</span>` next to the icon for visually-hidden but assistive-tech-readable text.
- Add aria-label directly on the <button>/<a>.
- Use aria-labelledby pointing to a hidden but persistent <span id=…>.

## Enforcement
axe-core rule `button-name` and `link-name`. Storybook a11y addon. ESLint plugin jsx-a11y `jsx-a11y/control-has-associated-label`.

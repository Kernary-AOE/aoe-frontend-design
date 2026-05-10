# SemanticHtmlForInteractiveElements [rule] v1.0.0
Use the native HTML element that matches its purpose — <button> for actions, <a href> for navigation, <input> for data entry — never a div or span with an onClick and custom ARIA.
>     Match element to purpose:
    - Actions (submit, open modal, toggle, delete): use <button type="button"> or <button type="submit">
    - Navigation (changes URL, follows a link): use <a href="...">
    - Page structure (headings, sections, lists): use <h1>–<h6>, <section>, <ul>/<ol>
    - Form inputs: use <input>, <select>, <textarea> with associated <label>
    - Expandable content: use <details>/<summary> or <button aria-expanded> pattern
    - Modal: use <dialog> or aria-modal pattern with proper focus trap

    Never substitute: <div onClick>, <span onClick>, <div role="button"> when a native element exists.
    ARIA is a supplement to semantics, not a replacement for them.
  
domain: frontend-design

## Applies To
- Any interactive component that triggers an action
- Any navigation element
- Any form control
- Any expandable/collapsible UI
- Any modal or dialog

## Counter Example
```
    {/* WRONG — div acting as button */}
    <div className="cursor-pointer" onClick={openModal}>Open settings</div>
    {/* Not keyboard focusable; not announced as button; Enter/Space won't fire */}
  
```

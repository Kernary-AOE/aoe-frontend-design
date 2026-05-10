# ReadingOrderMatchesVisualOrder [rule] v1.0.0
DOM source order must match the visual reading order — CSS flex/grid reordering or absolute positioning must never create a mismatch between what sighted users see and what keyboard/screen reader users navigate.
> The sequence in which elements appear in the HTML source must match the sequence in which they appear visually on screen. If CSS is disabled, the page must remain comprehensible in the same logical order. Prohibited: using CSS order property, flex row-reverse, grid placement by name, or position:absolute to visually reorder elements in a way that diverges from their DOM position.
domain: frontend-design

## Applies To
- Any layout using CSS Grid with explicit column/row placement
- Flexbox layouts using order or row-reverse
- Absolutely or fixed positioned elements that appear between other flow elements
- CSS columns that visually reorder content across column breaks

## Counter Example
```
    /* WRONG — visual order 'Label | Input' but DOM order 'Input | Label' via CSS */
    <div style="display:flex; flex-direction:row-reverse">
      <label>Email</label>  /* DOM first but visually right */
      <input type="email" /> /* DOM second but visually left */
    </div>
    /* Screen reader reads "Email, [input]" but keyboard user tabs to input first */
  
```

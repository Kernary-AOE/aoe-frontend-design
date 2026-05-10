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

## Examples
-       {/* CORRECT — DOM order matches reading order */}
      <article>
        <h2>Card Title</h2>       {/* DOM first, visually first */}
        <p>Description text</p>   {/* DOM second, visually second */}
        <button>Read more</button> {/* DOM third, visually third */}
      </article>
    

## Rationale
Screen readers and keyboard navigation follow DOM order, not visual order. A CSS grid that visually renders 'Icon → Label → Value' but has DOM order 'Label → Value → Icon' creates a disorienting navigation experience: the keyboard user's Tab sequence jumps around the screen apparently at random. The WCAG 2.1 Success Criterion 1.3.2 requires that information and relationships conveyed through presentation can be programmatically determined or available in text.

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

# SemanticStructureOverVisualPositioning [rule] v1.0.0
Use semantic HTML (headings, lists, landmarks) to convey structure — never rely solely on visual layout (indentation, font size, color, spacing) to communicate hierarchy or relationships.
>     Structure must be programmatically determinable, not only visually implied:
    - Hierarchy is expressed with headings (<h1>–<h6>), not just larger text.
    - Lists are expressed with <ul>/<ol>/<li>, not just visually indented divs.
    - Page regions are expressed with <main>, <nav>, <aside>, <section>, not just positioned containers.
    - Relationships between form controls and labels use <label for>, not visual proximity.
    - Tables use <th scope>, <caption>, not just column-aligned visual cells.

    The test: disable CSS entirely. The page must remain comprehensible and correctly structured.
  
domain: frontend-design

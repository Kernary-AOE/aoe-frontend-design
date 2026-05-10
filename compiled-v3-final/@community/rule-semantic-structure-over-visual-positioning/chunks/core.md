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

## Applies To
- Page layout and content structure
- Navigation and wayfinding
- Lists, menus, and collections
- Form organization and grouping
- Data tables
- Card and grid structures

## Counter Example
```
    {/* WRONG — visual structure without semantics */}
    <div className="page">
      <div className="text-3xl font-bold mb-4">Dashboard</div>
      <div className="text-xl font-semibold mb-2">Revenue</div>
      <div className="ml-4">Q1: $120,000</div>
      <div className="ml-4">Q2: $145,000</div>
    </div>
    {/* Screen readers: no landmarks, no headings, no list — just a flat series of text nodes */}
  
```

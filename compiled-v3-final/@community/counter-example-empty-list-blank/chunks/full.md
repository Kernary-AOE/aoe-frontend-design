# EmptyListBlank [counter-example] v1.0.0
A React issue-list component that renders a `<ul>` with `items.map(...)`. When `items` is an empty array, the component renders an empty `<ul>` and the page goes silent. No headline, no CTA, no explanation.
domain: ux-design

## Label
Issue List Component Renders Nothing When Empty

## Bad Code
```
function IssueList({ items }) {
return (
<ul className="issue-list">
{items.map(issue => (
<li key={issue.id}>{issue.title}</li>
))}
</ul>
);
}

/* CSS */
.issue-list:empty {
/* nothing — empty <ul> just collapses to 0 height */
}
```

## Why Bad
- Empty `<ul>` collapses to 0 px tall — user sees a blank workspace and cannot tell if the request failed
- No `role='status'` means screen readers announce nothing when the list updates from N items to 0
- First-run users have no CTA to create their first issue — they are stuck
- Filter-applied empty looks identical to first-run empty — user can't tell which it is
- Violates Nielsen heuristic 1 (visibility of system status) — the system is silent about its state

## Good Code
```
function IssueList({ items, hasFilter, onClearFilter }) {
if (items.length === 0) {
return (
<section
className="empty-state"
role="status"
aria-labelledby="es-title"
>
<svg className="illus" aria-hidden="true">{/* inbox icon */}</svg>
<h2 id="es-title">
{hasFilter ? "No issues match your filter" : "No issues yet"}
</h2>
<p>
{hasFilter
? "Try clearing the filter or broadening your search."
: "Capture a bug, idea, or request. Issues are searchable and assignable."}
</p>
{hasFilter
? <button onClick={onClearFilter}>Clear filter</button>
: <a href="/new" className="primary">Create issue</a>}
</section>
);
}

return (
<ul className="issue-list">
{items.map(issue => (
<li key={issue.id}>{issue.title}</li>
))}
</ul>
);
}
```

## Why Good
- Zero-state branch handled explicitly — every state has a visual representation
- Differentiates filter-empty from first-run empty with different copy and CTA
- `role='status'` + `aria-labelledby` makes screen readers announce 'No issues yet' on update
- Real `<a>` and `<button>` for CTAs — keyboard accessible, no fake div-buttons
- Satisfies Nielsen heuristic 1 (visibility) and heuristic 9 (recognition over recall — user sees what they can do)

## Anti Pattern
@community/anti-pattern-missing-empty-state

## Label
Issue List Component Renders Nothing When Empty

## Bad Code
```
function IssueList({ items }) {
return (
<ul className="issue-list">
{items.map(issue => (
<li key={issue.id}>{issue.title}</li>
))}
</ul>
);
}

/* CSS */
.issue-list:empty {
/* nothing — empty <ul> just collapses to 0 height */
}
```

## Why Bad
- Empty `<ul>` collapses to 0 px tall — user sees a blank workspace and cannot tell if the request failed
- No `role='status'` means screen readers announce nothing when the list updates from N items to 0
- First-run users have no CTA to create their first issue — they are stuck
- Filter-applied empty looks identical to first-run empty — user can't tell which it is
- Violates Nielsen heuristic 1 (visibility of system status) — the system is silent about its state

## Good Code
```
function IssueList({ items, hasFilter, onClearFilter }) {
if (items.length === 0) {
return (
<section
className="empty-state"
role="status"
aria-labelledby="es-title"
>
<svg className="illus" aria-hidden="true">{/* inbox icon */}</svg>
<h2 id="es-title">
{hasFilter ? "No issues match your filter" : "No issues yet"}
</h2>
<p>
{hasFilter
? "Try clearing the filter or broadening your search."
: "Capture a bug, idea, or request. Issues are searchable and assignable."}
</p>
{hasFilter
? <button onClick={onClearFilter}>Clear filter</button>
: <a href="/new" className="primary">Create issue</a>}
</section>
);
}

return (
<ul className="issue-list">
{items.map(issue => (
<li key={issue.id}>{issue.title}</li>
))}
</ul>
);
}
```

## Why Good
- Zero-state branch handled explicitly — every state has a visual representation
- Differentiates filter-empty from first-run empty with different copy and CTA
- `role='status'` + `aria-labelledby` makes screen readers announce 'No issues yet' on update
- Real `<a>` and `<button>` for CTAs — keyboard accessible, no fake div-buttons
- Satisfies Nielsen heuristic 1 (visibility) and heuristic 9 (recognition over recall — user sees what they can do)

## Anti Pattern
@community/anti-pattern-missing-empty-state

# EmptyStateTeaches [rule] v1.0.0
> Empty states must do three things: (1) briefly acknowledge the empty condition, (2) explain the value the user will get by filling it, (3) provide a clear, specific action to begin. An empty state that only says 'nothing here yet' is a missed onboarding opportunity.
domain: frontend-design

## Label
Empty States Must Teach the Interface, Not Just Report Absence

## Structure
```
    <!-- Good empty state: acknowledges + teaches + CTA -->
    <div class="empty-state" role="region" aria-label="No projects">
      <svg class="empty-state__icon" aria-hidden="true"><!-- projects icon --></svg>
      <h3 class="empty-state__title">No projects yet</h3>
      <p class="empty-state__description">
        Projects organize your work into focused workspaces. Each project has
        its own tasks, files, and team members.
      </p>
      <button type="button" class="btn btn-primary">
        Create your first project
      </button>
    </div>

    <!-- Bad empty state: reports absence only -->
    <!-- <div class="empty-state">No items</div> -->
  
```

## Sources

## Rationale
The first time a user sees an empty list, table, or dashboard, they have zero context for what belongs there. This is the highest-value moment to communicate the interface's purpose and expected content. A teaching empty state converts confusion ('what do I do here?') into intent ('I should create my first project'). Empty states are also the point where users most frequently abandon new products — investing in them directly reduces churn. The three-part formula (acknowledge + value + action) ensures each concern is addressed without overloading the state with text.

## Label
Empty States Must Teach the Interface, Not Just Report Absence

## Structure
```
    <!-- Good empty state: acknowledges + teaches + CTA -->
    <div class="empty-state" role="region" aria-label="No projects">
      <svg class="empty-state__icon" aria-hidden="true"><!-- projects icon --></svg>
      <h3 class="empty-state__title">No projects yet</h3>
      <p class="empty-state__description">
        Projects organize your work into focused workspaces. Each project has
        its own tasks, files, and team members.
      </p>
      <button type="button" class="btn btn-primary">
        Create your first project
      </button>
    </div>

    <!-- Bad empty state: reports absence only -->
    <!-- <div class="empty-state">No items</div> -->
  
```

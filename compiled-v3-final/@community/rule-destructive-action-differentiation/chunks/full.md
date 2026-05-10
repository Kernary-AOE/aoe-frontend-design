# DestructiveActionDifferentiation [rule] v1.0.0
> Destructive actions (delete, remove, reset, revoke) must never share the same visual style, color treatment, or spatial grouping as safe actions. Differentiate by: (1) color — red/danger bg for destructive; (2) label wording — 'Delete permanently' not 'OK'; (3) physical separation — gap ≥ 16px or different button group; (4) confirmation barrier for irreversible operations.
domain: frontend-design

## Label
Destructive and Safe Actions Must Be Visually and Spatially Distinct

## Applies When
any UI that presents a destructive action alongside non-destructive actions

## Verify By
Screenshot the action area and check: (1) destructive button has visually distinct color/style; (2) it is not immediately adjacent to the primary action; (3) irreversible actions require a confirmation step

## Code
```
    <!-- Good: spatially separated, visually distinct -->
    <div class="action-group">
      <button class="btn btn-ghost" type="button">Cancel</button>
      <button class="btn btn-primary" type="submit">Save changes</button>
    </div>
    <div class="action-group action-group--danger">
      <button class="btn btn-destructive" type="button" data-confirm="Delete permanently? This cannot be undone.">
        Delete account
      </button>
    </div>

    <!-- Bad: destructive next to primary -->
    <!-- <div class="action-group">
      <button class="btn btn-primary">Save</button>
      <button class="btn btn-primary" style="background:red">Delete</button>
    </div> -->

    <style>
      .action-group--danger {
        margin-block-start: 32px;  /* spatial separation */
        padding-block-start: 24px;
        border-block-start: 1px solid hsl(var(--border));
      }
    </style>
  
```

## Severity
block

## Rationale
Undifferentiated destructive actions cause accidental data loss. When a 'Delete' button looks identical to a 'Save' button in the same row, the margin for mis-click is unacceptably high. Clear differentiation prevents irreversible mistakes with zero cognitive overhead.

## Label
Destructive and Safe Actions Must Be Visually and Spatially Distinct

## Applies When
any UI that presents a destructive action alongside non-destructive actions

## Verify By
Screenshot the action area and check: (1) destructive button has visually distinct color/style; (2) it is not immediately adjacent to the primary action; (3) irreversible actions require a confirmation step

## Code
```
    <!-- Good: spatially separated, visually distinct -->
    <div class="action-group">
      <button class="btn btn-ghost" type="button">Cancel</button>
      <button class="btn btn-primary" type="submit">Save changes</button>
    </div>
    <div class="action-group action-group--danger">
      <button class="btn btn-destructive" type="button" data-confirm="Delete permanently? This cannot be undone.">
        Delete account
      </button>
    </div>

    <!-- Bad: destructive next to primary -->
    <!-- <div class="action-group">
      <button class="btn btn-primary">Save</button>
      <button class="btn btn-primary" style="background:red">Delete</button>
    </div> -->

    <style>
      .action-group--danger {
        margin-block-start: 32px;  /* spatial separation */
        padding-block-start: 24px;
        border-block-start: 1px solid hsl(var(--border));
      }
    </style>
  
```

## Severity
block

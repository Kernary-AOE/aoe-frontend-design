# EmptyStates [taxonomy] v1.0.0
A taxonomy of empty states by their underlying cause. Each cause requires distinct UX: 'no data yet' invites action; 'cleared' celebrates progress; 'error' explains failure; 'filtered to nothing' offers escape. Treating all empty states identically (one generic illustration + 'Nothing here yet') misses the chance to guide the user.
domain: ux-design

## Label
Empty State Categories by Cause

## Members
- first-use
- no-data-yet
- cleared
- filtered-empty
- search-no-results
- permission-denied
- error-state
- loading-empty

## Styles
- **First Use**:
  - **Purpose**: User has never created anything in this section; introduce the feature.
  - **Visual**: Larger illustration; explanatory headline; primary CTA to create first item.
  - **Copy**: 'Welcome to Projects' + 'Create your first project to get started' + [Create project]
  - **Examples**: Linear's empty 'My Issues' on a new account; Notion's 'Welcome to your workspace'.
  - **Rule**: Don't be cute — clarity over personality. Skip the mascot if it doesn't communicate.
- **No Data Yet**:
  - **Purpose**: User has used the feature but hasn't created an item of THIS specific type yet.
  - **Visual**: Smaller illustration or icon; brief description; optional CTA.
  - **Copy**: 'No archived items' + 'Items you archive will appear here.' + [optional secondary CTA]
  - **Examples**: Empty 'Drafts' folder; empty 'Liked songs' on Spotify.
- **Cleared**:
  - **Purpose**: User just cleared a list (e.g. all notifications read) — celebrate completion.
  - **Visual**: Subtle positive imagery; brief affirmation.
  - **Copy**: 'You're all caught up!' + maybe a secondary action.
  - **Examples**: Inbox Zero; cleared todo list; 'You've reviewed all PRs'.
  - **Rule**: Do NOT push another action immediately — let the user enjoy the moment.
- **Filtered Empty**:
  - **Purpose**: Active filters or search query reduced result set to zero; data exists, just not matching.
  - **Visual**: Lightweight; clear 'no matches' message; prominent 'Clear filters' / 'Clear search' button.
  - **Copy**: 'No projects match your filters' + [Clear all filters]
  - **Examples**: Filtered Jira board with no matching issues; refined product search.
  - **Rule**: MUST offer one-click escape from the filter — otherwise user is stuck.
- **Search No Results**:
  - **Purpose**: User-typed query returned nothing.
  - **Visual**: Show the query echoed back; suggest variations.
  - **Copy**: 'No results for "{query}"' + 'Try different keywords or browse all items'
  - **Examples**: Stripe Dashboard search; Notion search; Algolia-powered search.
  - **Rule**: Echo the exact query so user can verify spelling. Suggest related terms when possible.
- **Permission Denied**:
  - **Purpose**: User cannot see content because of access controls; data exists but is hidden.
  - **Visual**: Lock icon; permission-specific message; CTA to request access OR contact admin.
  - **Copy**: 'You don't have access to this project' + [Request access]
  - **Rule**: Do NOT pretend the resource doesn't exist (404) — leak risk vs UX clarity. Choose 403 (with explanation) for known users, 404 for unknown.
- **Error State**:
  - **Purpose**: Loading failed; data may exist but couldn't be fetched.
  - **Visual**: Error icon; specific error message; Retry button; contact-support link.
  - **Copy**: 'Couldn't load projects' + 'Check your connection and try again' + [Retry]
  - **Examples**: Network failure; server 500; rate-limited.
  - **Rule**: Distinct from 'no-data-yet'. User should know if the system failed vs whether data is missing.
- **Loading Empty**:
  - **Purpose**: Initial fetch in progress; show skeleton not 'no data' message.
  - **Visual**: Skeleton placeholders matching content dimensions.
  - **Timing**: Until fetch completes; then transition to actual state (no-data-yet OR populated)
  - **Rule**: MUST not flash 'No items' before data loads. Maintain skeleton until response arrives.

## Invariants
- Empty states MUST be distinguishable from loading states — never show 'No items' before fetch completes.
- Filtered-empty and search-no-results MUST offer a one-click way to clear the filter or search.
- Error-state MUST be visually distinct from no-data-yet — same icon and copy is a UX failure.
- Permission-denied MUST clearly communicate why and offer a path forward (request access, contact admin).
- First-use empty state SHOULD have a primary CTA; recurring empty states SHOULD NOT push CTAs aggressively.

## Label
Empty State Categories by Cause

## Members
- first-use
- no-data-yet
- cleared
- filtered-empty
- search-no-results
- permission-denied
- error-state
- loading-empty

## Styles
- **First Use**:
  - **Purpose**: User has never created anything in this section; introduce the feature.
  - **Visual**: Larger illustration; explanatory headline; primary CTA to create first item.
  - **Copy**: 'Welcome to Projects' + 'Create your first project to get started' + [Create project]
  - **Examples**: Linear's empty 'My Issues' on a new account; Notion's 'Welcome to your workspace'.
  - **Rule**: Don't be cute — clarity over personality. Skip the mascot if it doesn't communicate.
- **No Data Yet**:
  - **Purpose**: User has used the feature but hasn't created an item of THIS specific type yet.
  - **Visual**: Smaller illustration or icon; brief description; optional CTA.
  - **Copy**: 'No archived items' + 'Items you archive will appear here.' + [optional secondary CTA]
  - **Examples**: Empty 'Drafts' folder; empty 'Liked songs' on Spotify.
- **Cleared**:
  - **Purpose**: User just cleared a list (e.g. all notifications read) — celebrate completion.
  - **Visual**: Subtle positive imagery; brief affirmation.
  - **Copy**: 'You're all caught up!' + maybe a secondary action.
  - **Examples**: Inbox Zero; cleared todo list; 'You've reviewed all PRs'.
  - **Rule**: Do NOT push another action immediately — let the user enjoy the moment.
- **Filtered Empty**:
  - **Purpose**: Active filters or search query reduced result set to zero; data exists, just not matching.
  - **Visual**: Lightweight; clear 'no matches' message; prominent 'Clear filters' / 'Clear search' button.
  - **Copy**: 'No projects match your filters' + [Clear all filters]
  - **Examples**: Filtered Jira board with no matching issues; refined product search.
  - **Rule**: MUST offer one-click escape from the filter — otherwise user is stuck.
- **Search No Results**:
  - **Purpose**: User-typed query returned nothing.
  - **Visual**: Show the query echoed back; suggest variations.
  - **Copy**: 'No results for "{query}"' + 'Try different keywords or browse all items'
  - **Examples**: Stripe Dashboard search; Notion search; Algolia-powered search.
  - **Rule**: Echo the exact query so user can verify spelling. Suggest related terms when possible.
- **Permission Denied**:
  - **Purpose**: User cannot see content because of access controls; data exists but is hidden.
  - **Visual**: Lock icon; permission-specific message; CTA to request access OR contact admin.
  - **Copy**: 'You don't have access to this project' + [Request access]
  - **Rule**: Do NOT pretend the resource doesn't exist (404) — leak risk vs UX clarity. Choose 403 (with explanation) for known users, 404 for unknown.
- **Error State**:
  - **Purpose**: Loading failed; data may exist but couldn't be fetched.
  - **Visual**: Error icon; specific error message; Retry button; contact-support link.
  - **Copy**: 'Couldn't load projects' + 'Check your connection and try again' + [Retry]
  - **Examples**: Network failure; server 500; rate-limited.
  - **Rule**: Distinct from 'no-data-yet'. User should know if the system failed vs whether data is missing.
- **Loading Empty**:
  - **Purpose**: Initial fetch in progress; show skeleton not 'no data' message.
  - **Visual**: Skeleton placeholders matching content dimensions.
  - **Timing**: Until fetch completes; then transition to actual state (no-data-yet OR populated)
  - **Rule**: MUST not flash 'No items' before data loads. Maintain skeleton until response arrives.

## Invariants
- Empty states MUST be distinguishable from loading states — never show 'No items' before fetch completes.
- Filtered-empty and search-no-results MUST offer a one-click way to clear the filter or search.
- Error-state MUST be visually distinct from no-data-yet — same icon and copy is a UX failure.
- Permission-denied MUST clearly communicate why and offer a path forward (request access, contact admin).
- First-use empty state SHOULD have a primary CTA; recurring empty states SHOULD NOT push CTAs aggressively.

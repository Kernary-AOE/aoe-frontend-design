# IosSpotlightIndexing [rule] v1.0.0
> Index key app content using CSSearchableItem with a CSSearchableItemAttributeSet so it is discoverable from iOS Spotlight search without opening the app.
domain: frontend-design

## Applies To
any iOS app containing content users might search for by name or keyword (articles, contacts, products, notes)

## Examples
- Index an article: CSSearchableItemAttributeSet with title, contentDescription, thumbnailData; wrap in CSSearchableItem with unique identifier.
- Submit via CSSearchableIndex.default().indexSearchableItems([item]).
- Verify: search for an in-app item title from the iOS Spotlight search; it must appear as a result.

## Rationale
Spotlight integration extends app discoverability to the system level. Users who recall an article, contact, or product name from your app can find and re-engage with it directly from Spotlight, without having to navigate through the app hierarchy.

## Applies To
any iOS app containing content users might search for by name or keyword (articles, contacts, products, notes)

# TxLiveblocksAvatarStack [pattern] v1.0.0
Liveblocks AvatarStack component (Apache-2.0): reads useOthers() and useSelf() presence, dedupes by userId first (falling back to connectionId for anonymous users) using a Map, caps visible avatars at max=3 with a +N overflow tooltip, and exposes --lb-avatar-stack-size/gap/index CSS custom properties for layout without JS.
domain: frontend-design

## Code
```
    // Dedup logic: userId key beats connectionId key — one user with two tabs = one avatar
    const users = useMemo(() => {
      const uniqueUsers = new Map<string, AvatarStackUser>();
      const addUser = ({ connectionId, userId }) => {
        if (userId !== null && userId !== undefined) {
          uniqueUsers.set(`user:${userId}`, { key: `user:${userId}`, userId });
        } else {
          uniqueUsers.set(`connection:${connectionId}`, { key: `connection:${connectionId}`, userId: null });
        }
      };
      if (selfUser) addUser(selfUser);
      for (const user of otherUsers) addUser(user);
      return [...uniqueUsers.values()];
    }, [selfUser, otherUsers, additionalUserIds]);

    const maxItems = Math.max(2, Math.floor(max ?? 3));  // minimum 2 always
    const shouldShowMore = users.length > maxItems;
    const visibleUsers = users.slice(0, shouldShowMore ? maxItems - 1 : maxItems);
    const hiddenUsers = users.slice(visibleUsers.length);

    if (users.length === 0) return null;  // empty = no stray div

    // CSS vars on the container drive all layout without JS:
    // --lb-avatar-stack-count, --lb-avatar-stack-size, --lb-avatar-stack-gap
    // Per-avatar: --lb-avatar-stack-index (for z-index stacking)
  
```

## How To Adapt
- max=3 is the sweet spot — 4th avatar is still legible but 5+ becomes noise. The +N chip must match avatar footprint to prevent row width jitter.
- For assignees on cards: use the userIds additional prop as escape hatch for non-presence use cases.
- For leftmost-avatar-on-top stacking: z-index = count - index (CSS calc on --lb-avatar-stack-index).
- sort((a,b) => b.connectionId - a.connectionId) shows newest-joined first — reverse for owner-anchored stacks.

## Gotchas
- return null when users.length===0 is important — empty stack renders a stray div with pointer-events implications.
- maxItems = Math.max(2, ...) prevents max=1 degeneration ('one avatar + +N') which is worse than two.
- Dedup by userId is critical — one user with two tabs (document + admin panel) must show one avatar.

## Sources
- packages/liveblocks-react-ui/src/components/AvatarStack.tsx

## Source
- **Repo**: https://github.com/liveblocks/liveblocks
- **File**: packages/liveblocks-react-ui/src/components/AvatarStack.tsx
- **Lines**: 60-201
- **License**: Apache-2.0

## Code
```
    // Dedup logic: userId key beats connectionId key — one user with two tabs = one avatar
    const users = useMemo(() => {
      const uniqueUsers = new Map<string, AvatarStackUser>();
      const addUser = ({ connectionId, userId }) => {
        if (userId !== null && userId !== undefined) {
          uniqueUsers.set(`user:${userId}`, { key: `user:${userId}`, userId });
        } else {
          uniqueUsers.set(`connection:${connectionId}`, { key: `connection:${connectionId}`, userId: null });
        }
      };
      if (selfUser) addUser(selfUser);
      for (const user of otherUsers) addUser(user);
      return [...uniqueUsers.values()];
    }, [selfUser, otherUsers, additionalUserIds]);

    const maxItems = Math.max(2, Math.floor(max ?? 3));  // minimum 2 always
    const shouldShowMore = users.length > maxItems;
    const visibleUsers = users.slice(0, shouldShowMore ? maxItems - 1 : maxItems);
    const hiddenUsers = users.slice(visibleUsers.length);

    if (users.length === 0) return null;  // empty = no stray div

    // CSS vars on the container drive all layout without JS:
    // --lb-avatar-stack-count, --lb-avatar-stack-size, --lb-avatar-stack-gap
    // Per-avatar: --lb-avatar-stack-index (for z-index stacking)
  
```

## How To Adapt
- max=3 is the sweet spot — 4th avatar is still legible but 5+ becomes noise. The +N chip must match avatar footprint to prevent row width jitter.
- For assignees on cards: use the userIds additional prop as escape hatch for non-presence use cases.
- For leftmost-avatar-on-top stacking: z-index = count - index (CSS calc on --lb-avatar-stack-index).
- sort((a,b) => b.connectionId - a.connectionId) shows newest-joined first — reverse for owner-anchored stacks.

## Gotchas
- return null when users.length===0 is important — empty stack renders a stray div with pointer-events implications.
- maxItems = Math.max(2, ...) prevents max=1 degeneration ('one avatar + +N') which is worse than two.
- Dedup by userId is critical — one user with two tabs (document + admin panel) must show one avatar.

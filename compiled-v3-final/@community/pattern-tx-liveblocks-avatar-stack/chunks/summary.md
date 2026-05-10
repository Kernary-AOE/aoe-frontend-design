# TxLiveblocksAvatarStack [pattern] v1.0.0
Liveblocks AvatarStack component (Apache-2.0): reads useOthers() and useSelf() presence, dedupes by userId first (falling back to connectionId for anonymous users) using a Map, caps visible avatars at max=3 with a +N overflow tooltip, and exposes --lb-avatar-stack-size/gap/index CSS custom properties for layout without JS.
domain: frontend-design

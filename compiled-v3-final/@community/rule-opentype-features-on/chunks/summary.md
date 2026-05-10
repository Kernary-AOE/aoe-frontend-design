# OpentypeFeaturesOn [rule] v1.0.0
By default, browsers activate only a small subset of OpenType features; production CSS MUST explicitly enable `kern` (kerning), `liga` (standard ligatures), and numeric figure features (`tnum`/`lnum`) at minimum — and SHOULD activate stylistic sets `ss01` or character variants `cv01` where the brand typeface ships them.
domain: frontend-design

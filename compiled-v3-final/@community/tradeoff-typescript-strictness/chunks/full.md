# TypeScriptStrictness [tradeoff] v1.0.0
Enabling TypeScript's `strict: true` (which turns on strictNullChecks, noImplicitAny, strictFunctionTypes, and others) catches a large class of bugs at compile time — but on a legacy JS-to-TS codebase, the upfront migration cost can be weeks-to-months of error suppression and refactoring. The tradeoff is upfront safety vs incremental adoption.
domain: frontend-engineering

## Label
TypeScript Strict Mode vs Migration Velocity

## Axes
- type-safety
- migration-effort
- time-to-first-typed-feature
- team-typescript-fluency

## Decision
```
if codebase == greenfield OR codebase < 5k LOC:
→ strict: true from day one
tsconfig: { "strict": true, "noUncheckedIndexedAccess": true }
cost: low — types are written alongside code
benefit: catch null/undefined bugs at compile time

elif codebase == legacy AND TS-fluency == high:
→ incremental strict adoption per-file
use `// @ts-strict-ignore` or per-folder tsconfig overrides
enable one strict flag at a time:
1. noImplicitAny (start here — easiest wins)
2. strictNullChecks (highest bug-catching value)
3. strictFunctionTypes
4. strictBindCallApply
5. strictPropertyInitialization
cost: medium, distributed over months
benefit: incremental coverage without freezing feature work

elif codebase == legacy AND TS-fluency == low:
→ start with `"strict": false, "noImplicitAny": false`
add types at file boundaries (public APIs) only
schedule strictness ramp-up after team training
cost: low up-front, deferred technical debt
benefit: not blocking shipping; type-safety added gradually
```

## Cost Of Strict
- Migration time: 1–4 weeks for a 50k LOC codebase, longer if state management is complex
- Initial PR size grows — each file may need 5–50 type fixes
- Library typings may force `any` or `unknown` casts at boundaries
- Team friction if not all developers are comfortable with TS generics, conditional types

## Cost Of Loose
- Null/undefined runtime errors that strict mode would catch at compile
- Implicit `any` propagates and erodes type safety silently
- Refactoring confidence drops — IDE rename and find-references become unreliable
- Type debt compounds: late strictness migrations are exponentially harder

## Examples
- @community/anti-pattern-magic-numbers

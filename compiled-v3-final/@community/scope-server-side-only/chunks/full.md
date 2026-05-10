# ServerSideOnly [scope] v1.0.0
Defines the applicability scope for atoms whose guidance applies only to server-side rendering, server components, API routes, edge functions, or backend code paths. Browser-only atoms (DOM access, window globals, mouse events) are out of scope.
domain: frontend-engineering

## Label
Server-Side / Backend-Only Atoms

## Preconditions
-
  - **Id**: execution-context-server
  - **Check**: code runs in a Node.js, Bun, Deno, or edge runtime (Cloudflare Workers, Vercel Edge, Deno Deploy) — NOT in a browser tab
  - **On Fail**: Atom is not applicable. Use browser-scope atoms instead.
-
  - **Id**: no-dom-access
  - **Check**: code does NOT reference `window`, `document`, `navigator`, `localStorage`, or other browser globals
  - **On Fail**: Refactor to remove browser-only globals or move logic to a client component.
-
  - **Id**: secrets-allowed
  - **Check**: environment can hold secrets (env vars, KMS, secret stores) — server context only
  - **On Fail**: If running in client context, NEVER inline secrets; move to server-side.

## Applies To
- Next.js Server Components (`'use server'` and default async server components)
- Next.js API routes (`app/api/*/route.ts`)
- Remix loaders and actions
- SvelteKit `+page.server.ts`, `+server.ts`
- Express/Fastify/Hono request handlers
- Edge functions (Vercel Edge, Cloudflare Workers, Deno Deploy)
- Build-time scripts (SSG, CMS sync, codegen)

## Out Of Scope
- React Client Components (`'use client'`)
- Code that touches DOM, mouse, keyboard, viewport, or browser storage
- Any logic in `<script>` shipped to the browser

## Environment
- **Runtime**: Node.js >= 18 OR Bun >= 1.0 OR Deno >= 1.40 OR edge runtime
- **Secret Handling**: env vars, KMS, AWS Secrets Manager, Vault
- **Network**: outbound HTTP allowed to internal services and DBs (typically not allowed from browser)

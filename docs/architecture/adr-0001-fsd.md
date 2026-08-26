# ADR-0001: Adopt Feature-Sliced Design (FSD) v2.1

## Status

Accepted

## Context

The codebase had grown organically with `features/` containing what were actually pages (single-use route compositions), `screen/` and `components/` segments grouped by technical role rather than purpose, dual path aliases (`#/` and `@/`), and no architectural guardrails.

## Decision

Adopt FSD v2.1 with **minimal layers**: `app/` + `pages/` + `shared/`. No `features/`, `entities/`, or `widgets/` layers — they are not needed at this project scale.

### Structure

```
src/
  app/       → Entry point, router, global layout, styles, routes
  pages/     → Route-level compositions (home, about-us, platform, trading, auth/*)
  shared/    → UI kit (shadcn), silk.tsx, cn utility
```

### Path aliases

Use `@/*` exclusively with per-layer aliases in `tsconfig.json`:

- `@/app/*` → `./src/app/*`
- `@/pages/*` → `./src/pages/*`
- `@/shared/*` → `./src/shared/*`

The `#/*` alias has been removed. shadcn CLI already generates `@/` imports.

### Auth pages as slice group

`pages/auth/` is a slice group (sign-in, sign-up, forget-password) with no `index.ts` at the group level and no cross-imports between siblings.

### File naming

Kebab-case for files (`home-page.tsx`), PascalCase for components (`HomePage`). Consistent with shadcn convention.

### Shared barrel exports

`shared/ui/index.ts` and `shared/lib/index.ts` exist as public APIs, but direct per-file imports (`@/shared/ui/button`) are also allowed to preserve tree-shaking.

## Consequences

- Steiger linter (`bun run lint:fsd`) enforces import direction and structure
- `features/` and `entities/` layers will be created only when concrete multi-use cases arise
- Routes live in `app/routes/` (TanStack file-based routing) and are thin — all composition lives in `pages/`

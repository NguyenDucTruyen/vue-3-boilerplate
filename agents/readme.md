# Agent Instructions

You are working on a **Vue 3 + Vite + TypeScript** frontend project.

Before implementing any feature, read these files in order:
1. Read `agents/PROJECT_CONTEXT.md`
2. Read `agents/ARCHITECTURE.md`
3. Read `agents/CODING_RULES.md`

## When creating a new feature

- Create a folder under `src/features/<feature-name>/` with the structure:
  - `routes.ts` — route definitions (relative paths, no layout)
  - `views/` — page-level components
  - `components/` — feature-specific components
  - `stores/` — Pinia stores (if needed)
  - `api/` — API call functions (if needed)
  - `types/` — TypeScript types/interfaces
  - `validation/` — Zod schemas (if forms exist)
- Register the routes in `src/app/router/index.ts` under the appropriate layout.
- Add route constants to `src/shared/constants/routes.ts`.
- Do not put business logic inside views — delegate to stores and API modules.
- Do not skip form validation — use `zod` + `vee-validate`.

## When creating a shared component

- Place reusable UI primitives in `src/shared/ui/<component>/`.
- Place app-wide shared components (not tied to a feature) in `src/shared/components/`.
- Follow the existing index.ts barrel-export pattern in `src/shared/ui/*`.

## When creating or modifying a Pinia store

- Use the Composition API style (`defineStore('id', () => { ... })`).
- Export a typed interface for the store's return value.
- Keep stores focused: one store per domain concern.

## When modifying existing code

- First inspect the current file and its immediate dependencies.
- Reuse existing helpers, composables, and conventions.
- Do not refactor unrelated files.
- Keep changes minimal and focused.

## Before finishing

- Ensure no TypeScript errors (`pnpm type-check`).
- Verify imports use the `@/` alias (not relative `../../`).
- Ensure new routes are registered in the router.
- Ensure new constants are added to the appropriate constants files.
- Explain what was changed and why.

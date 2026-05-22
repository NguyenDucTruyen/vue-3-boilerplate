<!-- Copilot onboarding instructions for this repository -->
# Copilot onboarding — vue-3-boilerplate

This file helps GitHub Copilot (cloud agent) understand the project layout, coding conventions, test status, and how to build and run the app.

## Overview

- Framework: Vue 3 + Vite
- Language: TypeScript (Vue SFCs)
- Styling: Tailwind CSS
- State management: Pinia
- Validation: Zod + vee-validate

## Project layout (key paths)

- `src/` — application source
  - `src/app/` — app entry, layouts and global shell
  - `src/features/` — feature modules (e.g. `auth`, `home`, `projects`)
  - `src/shared/` — shared APIs, components, stores, constants, utilities
  - `src/ui/` — design-system primitives and reusable UI components
  - `src/assets/` and `public/` — static assets

Entry points:

- `src/main.ts` — app bootstrap
- `index.html` — Vite entry

## Coding conventions

- File naming: Vue single-file components use PascalCase (e.g. `MyComponent.vue`) consistent with existing files like `App.vue` and `AuthLayout.vue`.
- TypeScript: prefer typed composables and props; run `pnpm type-check` before CI.
- Linters: ESLint is configured (using `@antfu/eslint-config`) — fixable rules run via `pnpm lint:fix`.
- Component organization: put feature-specific components under `src/features/<feature>/components`, shared primitives in `src/ui`.
- Stores: use Pinia (store files live under `src/stores/` or `src/features/*/stores`).
- Validation: use `zod` schemas alongside `vee-validate` helpers where appropriate.

Developer tools / recommended extensions (optional): Volar, ESLint, Tailwind CSS IntelliSense, Vue Language Features.

## Git hooks & pre-commit

- Husky is installed (`prepare` script). `lint-staged` runs `eslint --fix` for `*.{js,ts,tsx,vue}` on staged files.

## Scripts (how to build & run)

Install dependencies (pnpm is used by this repo):

```bash
pnpm install
```

Local dev server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Preview production build locally:

```bash
pnpm preview
```

Lint and type-check:

```bash
pnpm lint       # runs eslint + tsc --noEmit
pnpm lint:fix   # runs eslint --fix
pnpm type-check # runs vue-tsc --build --force
```

## Test framework

There is currently no test framework configured in this repository (no test runner listed in `package.json`).

If you want tests, recommended stack for Vue 3 + Vite + TypeScript:

```bash
pnpm add -D vitest @vitest/ui @testing-library/vue jsdom
```

Add a minimal `vitest` config or use `vite` + `vitest` inline config and add a `test` script:

```json
"scripts": {
  "test": "vitest"
}
```

## Adding features / components

- New feature: create a folder under `src/features/<feature>` with `routes.ts`, `views/`, `components/`, `stores/`, and an `api/` area if it needs backend calls.
- Shared UI primitives: add to `src/ui/<component>/` following the existing design-system structure.

## Notes for Copilot

- Primary source of truth for runtime behavior is `src/` and `src/app`.
- Use TypeScript types in `src/features/*/types` and `src/shared/*/types` when suggesting signatures.
- Respect existing conventions: PascalCase SFC filenames, Pinia stores, and Zod validation patterns.

---

If you'd like, I can also add a `vitest` setup and a basic example test, or wire up a minimal CI workflow. Reply with which you'd prefer.

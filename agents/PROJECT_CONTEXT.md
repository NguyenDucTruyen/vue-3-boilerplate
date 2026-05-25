# Project Context

## What this project is

A Vue 3 frontend boilerplate / starter project built with Vite, TypeScript, and Tailwind CSS. It provides a production-ready foundation for building SPA applications with authentication, routing, state management, and a design-system layer.

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 (Composition API) |
| Build tool | Vite 5 |
| Language | TypeScript ~5.6 |
| Styling | Tailwind CSS 3 + tailwindcss-animate |
| UI primitives | Radix Vue / Reka UI + shadcn-style components |
| State management | Pinia 2 |
| Routing | Vue Router 4 |
| HTTP client | Axios (with interceptors for auth + refresh tokens) |
| Form validation | vee-validate 4 + Zod 3 + @vee-validate/zod |
| Icons | Lucide Vue Next |
| Notifications | vue-toastification |
| Auth (social) | vue3-google-login |
| Utilities | VueUse, clsx, tailwind-merge, class-variance-authority |
| Linting | ESLint 9 with @antfu/eslint-config |
| Git hooks | Husky + lint-staged |
| Package manager | pnpm 9 |

## Environment variables required

Create a `.env` file at the project root with:

```
VITE_API_URL=http://localhost:3000       # Backend base URL (no trailing slash)
VITE_GOOGLE_OAUTH_CLIENT_ID=<your-id>   # Google OAuth client ID
```

## Key scripts

```bash
pnpm dev          # Start dev server
pnpm build        # Type-check + production build
pnpm preview      # Preview production build
pnpm lint         # ESLint + tsc --noEmit
pnpm lint:fix     # ESLint --fix
pnpm type-check   # vue-tsc --build --force
```

## Current features

- **Auth** — login, signup, forgot password, reset password, Google OAuth, JWT access + refresh token flow
- **Home** — placeholder home page (authenticated)
- **Projects** — placeholder project page (authenticated)

## Backend API expectations

The app talks to a REST API at `VITE_API_URL/v1`. Key endpoints (defined in `src/shared/constants/apiEndpoints.ts`):

- `POST /auth/login` → `{ token, refreshToken }`
- `POST /auth/register`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `POST /auth/refresh-tokens` → `{ access: { token }, refresh: { token } }`
- `GET  /users/me` → current user object

## Auto-imports

`unplugin-auto-import` is configured (see `vite.config.ts`) to auto-import all Vue and Vue Router composables globally. You do **not** need to manually import `ref`, `computed`, `watch`, `useRouter`, `useRoute`, etc. in `.vue` or `.ts` files.

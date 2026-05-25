# Architecture

## Directory structure

```
src/
├── app/                        # Application shell
│   ├── main.ts                 # Bootstrap: createApp, plugins, mount
│   ├── App.vue                 # Root component (router-view + global modals)
│   ├── layouts/                # Layout wrappers (DefaultLayout, AuthLayout, ErrorLayout)
│   ├── router/
│   │   ├── index.ts            # Route tree, layout wrapping, global guard
│   │   ├── NotFoundView.vue
│   │   └── guards/
│   │       └── authGuard.ts    # Global navigation guard (JWT check + user bootstrap)
│   ├── shell/                  # Persistent UI chrome (header, sidebar)
│   └── styles/
│       └── index.css           # Tailwind directives + CSS variables
│
├── features/                   # Feature modules (vertical slices)
│   ├── auth/
│   │   ├── routes.ts
│   │   ├── api/authApi.ts
│   │   ├── components/
│   │   ├── stores/authStore.ts
│   │   ├── types/auth.types.ts
│   │   ├── validation/auth.validation.ts
│   │   └── views/
│   ├── home/
│   │   ├── routes.ts
│   │   └── views/
│   └── projects/
│       ├── routes.ts
│       └── views/
│
├── shared/                     # Cross-feature shared code
│   ├── api/
│   │   ├── axiosInterceptor.ts # Axios instance + request/response interceptors
│   │   └── userApi.ts
│   ├── components/             # App-wide reusable components (not design-system)
│   ├── constants/
│   │   ├── apiEndpoints.ts     # All API URL strings
│   │   ├── routes.ts           # ROUTES + LAYOUTS constants
│   │   └── storageKeys.ts      # localStorage key constants
│   ├── lib/
│   │   ├── toast.ts            # showSuccess / showError helpers
│   │   ├── utils.ts            # cn() (clsx + tailwind-merge)
│   │   └── zodLocale.ts        # Global Zod error map
│   ├── stores/
│   │   ├── confirmStore.ts     # Global confirmation modal state
│   │   ├── sidebarStore.ts
│   │   ├── themeStore.ts       # Light / dark mode
│   │   └── userStore.ts        # Current user data
│   └── ui/                     # Design-system primitives (shadcn-style)
│       ├── avatar/
│       ├── button/
│       ├── card/
│       ├── collapsible/
│       ├── dropdown-menu/
│       ├── form/
│       ├── icon/
│       ├── input/
│       ├── label/
│       ├── pagination/
│       ├── popover/
│       ├── scroll-area/
│       ├── separator/
│       └── switch/
│
└── assets/                     # Static assets (icons, images)
```

## Routing architecture

Routes use a **layout-wrapping** pattern:

```
/           → DefaultLayout  (authenticated pages: home, projects, ...)
/           → AuthLayout     (public pages: login, signup, ...)
/notfound   → ErrorLayout    (error pages)
```

Rules:
- Each feature exports a flat array of routes from `src/features/<feature>/routes.ts`.
- Route paths are **relative** (no leading `/`).
- Routes must **not** define `meta.layout` — that is set exclusively in `src/app/router/index.ts`.
- Route name constants go in `src/shared/constants/routes.ts`.

## Auth flow

1. **Login** → API returns `{ token }` → stored in `localStorage` as `accessToken`.
2. `authGuard.ts` runs on every navigation:
   - No token → redirect to `/login` (saves `returnUrl`).
   - Token present, user not loaded → call `GET /users/me` to populate `userStore`.
   - Authenticated user visiting an auth page → redirect to `/`.
3. **Refresh token** — handled automatically in `axiosInterceptor.ts` on 401 responses.
4. **Logout** — clears `localStorage`, resets `userStore`, redirects to `/login`.

## State management

All Pinia stores use **Composition API style** (`defineStore('id', () => { ... })`).

Key stores:
- `useAuthStore` — `login()`, `logout()`, `isAuthenticated`, `accessToken`, `returnUrl`, `setReturnUrl()`
- `useUserStore` — current user object, `getUserData()`, `isAuthenticated`
- `useThemeStore` — light/dark mode toggle
- `useConfirmStore` — imperative confirmation modal
- `useSidebarStore` — sidebar open/collapsed state

### When to put logic in a Store vs call API directly

**Put in a Store action** when the operation:
- Reads or mutates reactive state shared across multiple components/routes
- Orchestrates multiple side effects (e.g. save token → fetch user → navigate)

Examples: `login()` (saves token + fetches user + navigates), `logout()` (clears token + clears user + navigates), `getUserData()` (populates shared user object).

**Call the API function directly from the view** (using `useAsyncState`) when the operation:
- Has no effect on any shared reactive state
- Is a one-shot request whose result is only used locally (navigate on success, show toast)

Examples: `apiRegister()`, `forgotPassword()`, `requestResetPassword()`.

```ts
// ✅ Correct — no shared state involved, call API directly in the view
import { useAsyncState } from '@vueuse/core'
import { apiRegister } from '../api/authApi'

const { isLoading, execute } = useAsyncState(apiRegister, null, {
  immediate: false,
  onError: error => Promise.reject(error),
})

const onSubmit = form.handleSubmit(async (values) => {
  await execute(0, values)
  router.push(ROUTES.AUTH.LOGIN)
})
```

```ts
// ❌ Wrong — wrapping a no-state API call inside a store just adds coupling
export const useAuthStore = defineStore('auth', () => {
  function register(credentials: RegisterData) {
    return apiRegister(credentials) // no state read/written → remove from store
  }
})
```

## HTTP layer

- Single Axios instance in `src/shared/api/axiosInterceptor.ts`.
- Base URL: `VITE_API_URL/v1`.
- Request interceptor: attaches `Authorization: Bearer <token>`.
- Response interceptor: handles 401 by attempting token refresh, then retrying.
- Exported helpers: `$get`, `$post`, `$put`, `$patch`, `$delete` — use these in all API modules.
- Feature API files live at `src/features/<feature>/api/<feature>Api.ts`.
- Shared API files live at `src/shared/api/<name>Api.ts`.

## UI / Design system

- Primitives in `src/shared/ui/` mirror shadcn/ui structure (Radix Vue / Reka UI base).
- Each primitive folder has an `index.ts` that barrel-exports all components.
- The `cn()` utility (`src/shared/lib/utils.ts`) merges class names with `clsx` + `tailwind-merge`.
- Use `class-variance-authority` (CVA) for component variants.
- CSS variables for theming are defined in `src/app/styles/index.css`.

## Global error handling

`App.vue` catches unhandled promise rejections and shows a toast via `showError()`. Individual API errors bubble up through Axios and are caught either in store actions or by this global handler.

# Coding Rules

## TypeScript

- All files must be TypeScript (`.ts` or `.vue` with `<script setup lang="ts">`).
- Always type component props using `defineProps<{ ... }>()` — no runtime props object.
- Always type emits using `defineEmits<{ ... }>()`.
- Export a typed interface for every Pinia store return value.
- Prefer `interface` over `type` for object shapes; use `type` for unions/intersections.
- Avoid `any` — use `unknown` and narrow, or define the proper type.
- Run `pnpm type-check` before committing.

## File naming

| Asset | Convention | Example |
|---|---|---|
| Vue SFCs | PascalCase | `UserProfile.vue` |
| TypeScript files | camelCase | `authStore.ts`, `authApi.ts` |
| Type definition files | `<name>.types.ts` | `auth.types.ts` |
| Validation files | `<name>.validation.ts` | `auth.validation.ts` |
| Route files | `routes.ts` | `routes.ts` |
| Store files | `<name>Store.ts` | `authStore.ts` |
| API files | `<name>Api.ts` | `authApi.ts` |

## Vue SFC conventions

- Always use `<script setup lang="ts">` (no Options API).
- Do **not** manually import Vue/Vue Router composables (`ref`, `computed`, `watch`, `useRouter`, `useRoute`, etc.) — they are auto-imported by `unplugin-auto-import`.
- Order of `<script setup>` content: imports → types → props/emits → stores/composables → reactive state → computed → watchers → functions → lifecycle hooks.
- Keep templates clean: extract complex logic into computed properties or composables.
- Prefer `v-bind` shorthand (`:`) and `v-on` shorthand (`@`).

## Imports and aliases

- Always use the `@/` alias for `src/` — never use relative `../../` paths.
- Import order (enforced by ESLint): external packages → internal `@/` imports → relative imports.
- Use barrel `index.ts` exports when importing multiple items from a UI primitive folder.

## Styling

- Use Tailwind CSS utility classes exclusively; avoid custom CSS unless necessary.
- Use the `cn()` helper (`import { cn } from '@/shared/lib/utils'`) to merge dynamic class names.
- Use `class-variance-authority` (CVA) for components that need style variants.
- CSS custom properties for colors/theme are in `src/app/styles/index.css` — do not hard-code color values.
- Support dark mode via the `dark:` Tailwind prefix (theme is toggled by `themeStore`).

## State management (Pinia)

- One store per domain concern — do not create mega-stores.
- Use Composition API style:
  ```ts
  export const useMyStore = defineStore('my', (): IMyStore => {
    // state, computed, actions
    return { ... }
  })
  ```
- Never call stores outside of `<script setup>` or composables (they require an active Pinia context).
- Do not import stores from other stores' files unless absolutely necessary and there is no circular dependency risk.

## API layer

- All HTTP calls go through the shared Axios helpers: `$get`, `$post`, `$put`, `$patch`, `$delete` from `@/shared/api/axiosInterceptor`.
- Feature API functions live in `src/features/<feature>/api/<feature>Api.ts`.
- API functions should be plain `async` functions — no classes.
- API endpoint strings must be defined in `src/shared/constants/apiEndpoints.ts` — do not hard-code URL strings inline.
- Do not handle auth/token logic in feature API files — the interceptor handles it.

## When to use a Store vs call API directly

Decision rule:
```
Does the operation read or mutate reactive state shared across components?
  YES → implement as a Store action
  NO  → call the API function directly from the view using useAsyncState
```

**Use a Store action** for operations that:
- Update shared reactive state (e.g. `accessToken`, `user`)
- Orchestrate multiple side effects (save token → fetch user → navigate)

**Call the API function directly** (via `useAsyncState` from VueUse) for operations that:
- Only need loading state local to the view
- Have no effect on any shared store state
- Simply navigate or show a toast on success/failure

```ts
// ✅ Direct API call with local loading state
import { useAsyncState } from '@vueuse/core'
import { apiRegister } from '../api/authApi'

const { isLoading, execute } = useAsyncState(apiRegister, null, {
  immediate: false,
  onError: error => Promise.reject(error),
})
```

- Never wrap a no-state API call inside a Store action just to have a single call site — this creates unnecessary coupling.

## Routing

- Route path strings must be defined in `src/shared/constants/routes.ts`.
- Feature `routes.ts` files export a flat array with **relative** paths (no leading `/`).
- Do not define `meta.layout` in feature route files — layout is assigned in `src/app/router/index.ts`.
- Route `name` values should be kebab-case strings (e.g. `'auth-login'`, `'project-detail'`).
- After adding a new feature's routes, register them in `src/app/router/index.ts` under the correct layout group.

## Form validation

- Use `zod` to define schemas and `vee-validate` with `@vee-validate/zod` to connect them to forms.
- Schemas live in `src/features/<feature>/validation/<feature>.validation.ts`.
- Use `useForm` from `vee-validate` with `zodResolver` for form-level validation.
- Show field errors via `<FormMessage />` from the form UI primitives.
- Do not duplicate validation logic between client and display layers.

## Constants

- `src/shared/constants/routes.ts` — all route path strings and layout names.
- `src/shared/constants/apiEndpoints.ts` — all API URL strings.
- `src/shared/constants/storageKeys.ts` — all `localStorage`/`sessionStorage` key strings.
- Never hard-code these strings anywhere else in the codebase.

## Error handling and notifications

- Use `showSuccess(message)` and `showError(message)` from `@/shared/lib/toast` for user-facing notifications.
- Do not use `alert()` or `console.log()` in production code.
- Unhandled promise rejections are caught globally in `App.vue` and shown as error toasts.
- In store actions, let errors propagate — do not silently swallow them unless there is a specific reason.

## Code quality

- Run `pnpm lint:fix` before committing to auto-fix ESLint issues.
- Lint-staged will run `eslint --fix` on staged `*.{js,ts,tsx,vue}` files via Husky pre-commit hook.
- Do not use `// eslint-disable` unless absolutely necessary, and always explain why.
- Keep functions small and focused (single responsibility).
- Do not add comments that merely restate what the code does — only comment the *why*.

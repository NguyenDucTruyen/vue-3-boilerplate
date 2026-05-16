import AuthLayout from '@/app/layouts/AuthLayout.vue'
import DefaultLayout from '@/app/layouts/DefaultLayout.vue'
import ErrorLayout from '@/app/layouts/ErrorLayout.vue'
import { authRoutes } from '@/features/auth/routes'
import { homeRoutes } from '@/features/home/routes'
import { projectRoutes } from '@/features/projects/routes'
import { LAYOUTS, ROUTES } from '@/shared/constants/routes'
import { createRouter, createWebHistory } from 'vue-router'
import { middlewareAuth } from './guards/authGuard'
import NotFoundView from './NotFoundView.vue'

// Rule for adding routes:
// 1. Create a routes.ts inside the feature folder (e.g. src/features/my-feature/routes.ts)
// 2. Export a flat array of page routes with RELATIVE paths (no leading '/')
//    — no layout component, no meta.layout (handled here)
// 3. Add the feature's ROUTES.* constant to src/shared/constants/routes.ts
// 4. Register the route group below under the appropriate layout

const routes = [
  {
    // Default layout — authenticated pages
    path: ROUTES.HOME,
    component: DefaultLayout,
    meta: { layout: LAYOUTS.DEFAULT },
    children: [...homeRoutes, ...projectRoutes],
  },
  {
    // Auth layout — public pages (login, signup, etc.)
    path: ROUTES.AUTH.ROOT,
    component: AuthLayout,
    meta: { layout: LAYOUTS.AUTH },
    children: [...authRoutes],
  },
  {
    // Error layout — error pages
    path: ROUTES.NOT_FOUND,
    component: ErrorLayout,
    meta: { layout: LAYOUTS.ERROR },
    children: [
      {
        path: '',
        name: 'notfound',
        component: NotFoundView,
        meta: { title: '404 Not Found' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: ROUTES.NOT_FOUND,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(middlewareAuth)

export default router

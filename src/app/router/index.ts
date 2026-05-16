import AuthLayout from '@/app/layouts/AuthLayout.vue'
import DefaultLayout from '@/app/layouts/DefaultLayout.vue'
import ErrorLayout from '@/app/layouts/ErrorLayout.vue'
import { authRoutes } from '@/features/auth/routes'
import { homeRoutes } from '@/features/home/routes'
import { projectRoutes } from '@/features/projects/routes'
import { ROUTES } from '@/shared/constants/routes'
import { createRouter, createWebHistory } from 'vue-router'
import { middlewareAuth } from './guards/authGuard'
import NotFoundView from './NotFoundView.vue'

const routes = [
  {
    path: ROUTES.HOME,
    component: DefaultLayout,
    children: [...homeRoutes, ...projectRoutes],
  },
  {
    path: ROUTES.AUTH.ROOT,
    component: AuthLayout,
    meta: { layout: 'auth' },
    children: [...authRoutes],
  },
  {
    path: ROUTES.NOT_FOUND,
    component: ErrorLayout,
    meta: { layout: 'error' },
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

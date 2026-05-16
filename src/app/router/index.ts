import DefaultLayout from '@/app/layouts/DefaultLayout.vue'
import ErrorLayout from '@/app/layouts/ErrorLayout.vue'
import { authRoutes } from '@/features/auth/routes'
import { homeRoutes } from '@/features/home/routes'
import { projectRoutes } from '@/features/projects/routes'
import { createRouter, createWebHistory } from 'vue-router'
import NotFoundView from './NotFoundView.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [...homeRoutes, ...projectRoutes],
  },
  ...authRoutes,
  {
    path: '/notfound',
    component: ErrorLayout,
    meta: { layout: 'error' },
    children: [
      {
        path: '',
        name: 'notfound',
        component: NotFoundView,
        meta: { layout: 'error', title: '404 Not Found' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach(async (to, from, next) => {
  if (to.matched.length === 0) {
    return next('/notfound')
  }
  return next()
})
// router.beforeEach(middlewareAuth)
// router.beforeEach(middlewareLayout)

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  next()
})

export default router

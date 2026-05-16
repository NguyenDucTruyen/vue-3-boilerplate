import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useUserStore } from '@/entities/user/stores/userStore'
import { useAuthStore } from '@/features/auth/stores/authStore'

export async function middlewareLayout(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  const userStore = useUserStore()
  const authStore = useAuthStore()
  const isAuthenticated = userStore.isAuthenticated
  const layout = to.meta.layout as string

  if (isAuthenticated && layout === 'auth') {
    return next('/')
  }

  if (!isAuthenticated && !['error', 'auth'].includes(layout)) {
    authStore.logout()
  }

  return next()
}

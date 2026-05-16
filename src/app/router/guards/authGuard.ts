import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/features/auth/stores/authStore'
import { LAYOUTS, ROUTES } from '@/shared/constants/routes'
import { STORAGE_KEYS } from '@/shared/constants/storageKeys'
import { useUserStore } from '@/shared/stores/userStore'

export async function middlewareAuth(to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) {
  const authStore = useAuthStore()
  const userStore = useUserStore()

  document.title = to.meta.title as string || 'Easy Project'
  to.meta.layout = to.meta.layout || LAYOUTS.DEFAULT

  const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
  const isPublicRoute = Object.values(LAYOUTS).includes(to.meta.layout as (typeof LAYOUTS)[keyof typeof LAYOUTS])

  if (!accessToken) {
    userStore.removeUser()
    if (isPublicRoute)
      return next()
    authStore.setReturnUrl(to.fullPath)
    return next(ROUTES.AUTH.LOGIN)
  }

  if (!userStore.isAuthenticated) {
    try {
      await userStore.getUserData()
    }
    catch {
      authStore.logout()
      return next(false)
    }
  }

  if (to.meta.layout === 'auth') {
    return next(ROUTES.HOME)
  }

  return next()
}

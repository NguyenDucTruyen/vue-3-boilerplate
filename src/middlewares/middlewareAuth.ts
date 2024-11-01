import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { fetchUserData } from '@/api/user'
import { useUserStore } from '@/stores/user'

export async function middlewareAuth(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  const userStore = useUserStore()
  if (!localStorage.getItem('accesstoken')) {
    if (to.meta.layout === 'auth') {
      return next()
    }
    if (to.meta.layout !== 'error') {
      return next('/auth/login')
    }
  }
  if (!userStore.isAuthenticated) {
    const response = await fetchUserData()
    userStore.setUser(response.data)
  }
  if (to.meta.layout === 'auth') {
    return next('/')
  }
  return next()
}

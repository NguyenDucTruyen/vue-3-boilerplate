import { apiLogin, apiRegister } from '@/api/auth'
import { defineStore } from 'pinia'
import { useUserStore } from './user'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(localStorage.getItem('accesstoken') || '')
  const userStore = useUserStore()
  const isAuthenticated = computed(() => !!accessToken.value)
  const router = useRouter()

  function login(credentials: { email: string, password: string }) {
    return apiLogin(credentials)
  }

  function logout() {
    localStorage.removeItem('accesstoken')
    userStore.removeUser()
    router.push('/auth/login')
    accessToken.value = ''
  }

  function register(credentials: { email: string, password: string }) {
    return apiRegister(credentials)
  }

  return {
    isAuthenticated,
    login,
    logout,
    register,
  }
})

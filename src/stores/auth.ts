import { apiLogin, apiRegister } from '@/api/auth'
import { defineStore } from 'pinia'
import { useUserStore } from './user'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(localStorage.getItem('accesstoken') || '')
  const userStore = useUserStore()
  const isAuthenticated = computed(() => !!accessToken.value)
  const router = useRouter()
  const returnUrl = ref('')

  async function login(credentials: { email: string, password: string }) {
    const data = await apiLogin(credentials)
    localStorage.setItem('accesstoken', data.token)
    await userStore.getUserData()
    router.push(returnUrl.value || '/')
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
  function setReturnUrl(url: string) {
    returnUrl.value = url
  }

  return {
    isAuthenticated,
    login,
    logout,
    register,
    returnUrl,
    accessToken,
    setReturnUrl,
  }
})

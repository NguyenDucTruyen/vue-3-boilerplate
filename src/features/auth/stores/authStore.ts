import type { Ref } from 'vue'
import type { LoginData } from '../types/auth.types'
import { ROUTES } from '@/shared/constants/routes'
import { STORAGE_KEYS } from '@/shared/constants/storageKeys'
import { useUserStore } from '@/shared/stores/userStore'
import { defineStore } from 'pinia'
import { apiLogin } from '../api/authApi'

interface IAuthStore {
  isAuthenticated: Ref<boolean>
  login: (credentials: LoginData) => Promise<void>
  logout: () => void
  returnUrl: Ref<string>
  accessToken: Ref<string>
  setReturnUrl: (url: string) => void
}

export const useAuthStore = defineStore('auth', (): IAuthStore => {
  const accessToken = ref(localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) || '')
  const userStore = useUserStore()
  const isAuthenticated = computed(() => !!accessToken.value)
  const router = useRouter()
  const returnUrl = ref('')

  async function login(credentials: LoginData) {
    const data = await apiLogin(credentials)
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.token)
    await userStore.getUserData()
    router.push(returnUrl.value || ROUTES.HOME)
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
    userStore.removeUser()
    router.push(ROUTES.AUTH.LOGIN)
    accessToken.value = ''
  }

  function setReturnUrl(url: string) {
    returnUrl.value = url
  }

  return {
    isAuthenticated,
    login,
    logout,
    returnUrl,
    accessToken,
    setReturnUrl,
  }
})

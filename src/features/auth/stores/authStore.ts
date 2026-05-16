import type { Ref } from 'vue'
import type { EmailData, LoginData, RegisterData, ResetPasswordData } from '../types/auth.types'
import { ROUTES } from '@/shared/constants/routes'
import { STORAGE_KEYS } from '@/shared/constants/storageKeys'
import { useUserStore } from '@/shared/stores/userStore'
import { defineStore } from 'pinia'
import { apiLogin, apiRegister, forgotPassword, requestResetPassword } from '../api/authApi'

interface IAuthStore {
  isAuthenticated: Ref<boolean>
  login: (credentials: LoginData) => Promise<void>
  logout: () => void
  register: (credentials: RegisterData) => Promise<void>
  returnUrl: Ref<string>
  accessToken: Ref<string>
  setReturnUrl: (url: string) => void
  resetPassword: (data: ResetPasswordData) => Promise<void>
  sendEmailResetPassword: (data: EmailData) => Promise<void>
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

  function register(credentials: RegisterData) {
    return apiRegister(credentials)
  }

  function setReturnUrl(url: string) {
    returnUrl.value = url
  }

  function sendEmailResetPassword(data: EmailData) {
    return forgotPassword(data)
  }
  function resetPassword(data: ResetPasswordData) {
    return requestResetPassword(data)
  }
  return {
    isAuthenticated,
    login,
    logout,
    register,
    returnUrl,
    accessToken,
    setReturnUrl,
    resetPassword,
    sendEmailResetPassword,
  }
})

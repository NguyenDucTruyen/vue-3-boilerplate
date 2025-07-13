import type { EmailData, LoginData, RegisterData, ResetPasswordData } from '@/utils/types'
import type { Ref } from 'vue'
import { apiLogin, apiRegister, forgotPassword, requestResetPassword } from '@/api/auth'
import { defineStore } from 'pinia'
import { useUserStore } from './user'

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
  const accessToken = ref(localStorage.getItem('accesstoken') || '')
  const userStore = useUserStore()
  const isAuthenticated = computed(() => !!accessToken.value)
  const router = useRouter()
  const returnUrl = ref('')

  async function login(credentials: LoginData) {
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

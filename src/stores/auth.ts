import { apiLogin, apiRegister } from '@/api/auth'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(localStorage.getItem('accesstoken') || '')

  const isAuthenticated = computed(() => !!accessToken.value)

  function setAccessToken(token: string) {
    localStorage.setItem('accesstoken', token)
    accessToken.value = token
  }

  function login(credentials: { email: string, password: string }) {
    return apiLogin(credentials)
  }

  function logout() {
    localStorage.removeItem('accesstoken')
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
    setAccessToken,
  }
})

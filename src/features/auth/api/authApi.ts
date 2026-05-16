import type { EmailData, LoginData, RegisterData, ResetPasswordData } from '../types/auth.types'
import { $post } from '@/shared/api/axiosInterceptor'
import { API_ENDPOINTS } from '@/shared/constants/apiEndpoints'

export function apiLogin(data: LoginData) {
  return $post(API_ENDPOINTS.AUTH.LOGIN, data)
}

export function apiRegister(data: RegisterData) {
  return $post(API_ENDPOINTS.AUTH.REGISTER, data)
}

export function forgotPassword(data: EmailData) {
  return $post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, data)
}

export function requestResetPassword(data: ResetPasswordData) {
  return $post(`${API_ENDPOINTS.AUTH.RESET_PASSWORD}/${data.token}`, {
    password: data.password,
    confirmPassword: data.confirmPassword,
  })
}

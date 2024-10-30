import { $post } from './axios'

export function apiLogin(data: any) {
  return $post('/auth/login', data)
}

export function apiRegister(data: any) {
  return $post('/auth/register', data)
}

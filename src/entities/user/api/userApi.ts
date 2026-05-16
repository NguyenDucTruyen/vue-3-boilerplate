import { $get } from '@/shared/api/axios'

export async function fetchUserData() {
  return $get('/users/me')
}

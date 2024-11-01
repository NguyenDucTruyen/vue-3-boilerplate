import { $get } from '@/api/axios'

export async function fetchUserData() {
  return { data: true }
  // return await Promise.reject(new Error('Not implemented'))

  return $get('/user')
}

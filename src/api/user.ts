import { $get } from '@/api/axios'

export function fetchUserData() {
  return { data: { id: 1, name: 'John Doe' } }
  return $get('/user')
}

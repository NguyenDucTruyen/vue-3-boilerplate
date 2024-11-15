import { $get } from '@/api/axios'

export async function fetchUserData() {
  return {
    data: {
      name: 'shadcn',
      email: 'm@example.com',
      avatar: '/avatars/shadcn.jpg',
    },
  }
  // return await Promise.reject(new Error('Not implemented'))

  return $get('/user')
}

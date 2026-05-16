import { $get } from '@/shared/api/axiosInterceptor'
import { API_ENDPOINTS } from '@/shared/constants/apiEndpoints'

export async function fetchUserData() {
  return $get(API_ENDPOINTS.USER.ME)
}

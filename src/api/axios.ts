import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
})

/*  Read more:
*   https://github.com/axios/axios?tab=readme-ov-file#interceptors
*/
axiosInstance.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json'
  config.headers['Access-Control-Allow-Origin'] = '*'
  const accessToken = localStorage.getItem('accesstoken')
  if (accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

axiosInstance.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = localStorage.getItem('refreshtoken')

      if (refreshToken) {
        try {
          const response = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken })
          const { accessToken } = response.data

          localStorage.setItem('accesstoken', accessToken)
          axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`
          originalRequest.headers.Authorization = `Bearer ${accessToken}`

          // Retry the original request
          return axiosInstance(originalRequest)
        }
        catch (refreshError) {
          localStorage.removeItem('accesstoken')
          localStorage.removeItem('refreshtoken')
          window.location.href = '/login'
          return Promise.reject(refreshError)
        }
      }
      else {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  },
)

function $get(url: string, config = {}) {
  try {
    return axiosInstance.get(url, config)
  }
  catch (error) {
    return Promise.reject(error)
  }
}

function $post(url: string, data: any, config = {}) {
  try {
    return axiosInstance.post(url, data, config)
  }
  catch (error) {
    return Promise.reject(error)
  }
}

function $put(url: string, data: any, config = {}) {
  try {
    return axiosInstance.put(url, data, config)
  }
  catch (error) {
    return Promise.reject(error)
  }
}
function $patch(url: string, data: any, config = {}) {
  try {
    return axiosInstance.patch(url, data, config)
  }
  catch (error) {
    return Promise.reject(error)
  }
}

function $delete(url: string, config = {}) {
  try {
    return axiosInstance.delete(url, config)
  }
  catch (error) {
    return Promise.reject(error)
  }
}

export { $delete, $get, $patch, $post, $put }

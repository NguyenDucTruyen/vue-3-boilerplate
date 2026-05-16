export const ROUTES = {
  HOME: '/',
  NOT_FOUND: '/notfound',
  PROJECT: '/project',
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
  },
  ADMIN: {
    USER: '/admin/user',
    PUBLIC_ROOM: '/admin/public-room',
    REPORTS: '/admin/reports',
  },
} as const

export const LAYOUTS = {
  DEFAULT: 'default',
  AUTH: 'auth',
  ERROR: 'error',
} as const

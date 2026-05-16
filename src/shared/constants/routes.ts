export const ROUTES = {
  HOME: '/',
  NOT_FOUND: '/notfound',
  PROJECT: '/project',
  AUTH: {
    ROOT: '/auth',
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  ADMIN: {
    USER: '/admin/user',
    PUBLIC_ROOM: '/admin/public-room',
    REPORTS: '/admin/reports',
  },
} as const

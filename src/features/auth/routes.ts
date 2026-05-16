import AuthLayout from '@/app/layouts/AuthLayout.vue'
import ForgotPasswordView from './views/ForgotPasswordView.vue'
import LoginView from './views/LoginView.vue'
import ResetPasswordView from './views/ResetPasswordView.vue'
import SignUpView from './views/SignUpView.vue'

export const authRoutes = [
  {
    path: '/auth',
    component: AuthLayout,
    meta: { layout: 'auth' },
    children: [
      {
        path: 'login',
        name: 'auth-login',
        component: LoginView,
        meta: { layout: 'auth', title: 'Login' },
      },
      {
        path: 'signup',
        name: 'auth-signup',
        component: SignUpView,
        meta: { layout: 'auth', title: 'Sign Up' },
      },
      {
        path: 'forgot-password',
        name: 'auth-forgot-password',
        component: ForgotPasswordView,
        meta: { layout: 'auth', title: 'Forgot Password' },
      },
      {
        path: 'reset-password',
        name: 'auth-reset-password',
        component: ResetPasswordView,
        meta: { layout: 'auth', title: 'Reset Password' },
      },
    ],
  },
]

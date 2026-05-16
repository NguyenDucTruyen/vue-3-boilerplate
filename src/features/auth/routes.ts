import AuthLayout from '@/app/layouts/AuthLayout.vue'
import ForgotPasswordView from './views/ForgotPasswordView.vue'
import LoginView from './views/LoginView.vue'
import ResetPasswordView from './views/ResetPasswordView.vue'
import SignUpView from './views/SignUpView.vue'

export const authRoutes = [
  {
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'auth-login',
        component: LoginView,
        meta: { title: 'Login' },
      },
      {
        path: 'signup',
        name: 'auth-signup',
        component: SignUpView,
        meta: { title: 'Sign Up' },
      },
      {
        path: 'forgot-password',
        name: 'auth-forgot-password',
        component: ForgotPasswordView,
        meta: { title: 'Forgot Password' },
      },
      {
        path: 'reset-password',
        name: 'auth-reset-password',
        component: ResetPasswordView,
        meta: { title: 'Reset Password' },
      },
    ],
  },
]

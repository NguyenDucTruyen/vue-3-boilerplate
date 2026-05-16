<script setup lang="ts">
import { ROUTES } from '@/shared/constants/routes'
import { showSuccess } from '@/shared/lib/toast'
import { toTypedSchema } from '@vee-validate/zod'
import { useAsyncState } from '@vueuse/core'
import { useForm } from 'vee-validate'
import { useAuthStore } from '../stores/authStore'
import { resetPasswordValidator } from '../validation/auth.validation'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const form = useForm({
  validationSchema: toTypedSchema(resetPasswordValidator),
  initialValues: {
    token: (route.query.token ?? '') as string,
    password: '',
    confirmPassword: '',
  },
})
const { isLoading, execute, error } = useAsyncState(authStore.resetPassword, null, {
  immediate: false,
  onError: (error) => {
    Promise.reject(error)
  },
})
const onSubmit = form.handleSubmit(async (values) => {
  await execute(0, values)
  if (error.value)
    return
  showSuccess('Password reset successfully!')
  router.push(ROUTES.AUTH.LOGIN)
})
</script>

<template>
  <form class="rounded-lg border bg-card text-card-foreground shadow-sm mx-auto max-w-sm h-max sm:min-w-[25rem]" @submit.prevent="onSubmit">
    <CardHeader>
      <CardTitle class="text-2xl text-center">
        Reset Password
      </CardTitle>
      <CardDescription class="text-center">
        Enter your token and new password
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid gap-4">
        <InputValidator
          id="token"
          type="text"
          label="Token reset password"
          placeholder="Token reset password"
          required
          name="token"
          autocomplete="off"
        />
        <InputValidator id="password" label="Password" placeholder="Password" type="password" name="password" />
        <InputValidator id="confirmPassword" label="Confirm password" placeholder="Confirm Password" type="password" name="confirmPassword" />

        <Button type="submit" class="w-full" :is-loading="isLoading">
          Reset Password
        </Button>
      </div>
      <div class="mt-4 text-center text-sm">
        <RouterLink to="/auth/login" class="underline">
          Back to login
        </RouterLink>
      </div>
    </CardContent>
  </form>
</template>

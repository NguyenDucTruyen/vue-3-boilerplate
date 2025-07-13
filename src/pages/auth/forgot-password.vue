<route>
    {
        meta: {
        layout: "auth",
        title: "Forgot Password",
        }
    }
</route>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { emailValidator } from '@/utils/validation'
import { toTypedSchema } from '@vee-validate/zod'
import { useAsyncState } from '@vueuse/core'
import { useForm } from 'vee-validate'

const router = useRouter()

const authStore = useAuthStore()

const form = useForm({
  validationSchema: toTypedSchema(emailValidator),
})

const { isLoading, execute, error } = useAsyncState(authStore.sendEmailResetPassword, null, {
  immediate: false,
  onError: (error) => {
    Promise.reject(error)
  },
})

const onSubmit = form.handleSubmit(async (values) => {
  await execute(0, values)
  if (error.value)
    return
  
  router.push('/auth/reset-password')
})
</script>

<template>
  <form class="sm:min-w-[25rem]" @submit.prevent="onSubmit">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl text-center">
          Reset Password
        </CardTitle>
        <CardDescription class="text-center">
          Enter your email below to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <InputValidator id="email" type="email" label="Email" placeholder="m@gmai.com" name="email" />
          </div>
          <Button type="submit" :is-loading="isLoading">
            Send Email
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          <RouterLink to="/auth/login" class="underline">
            Back to login
          </RouterLink>
        </div>
      </CardContent>
    </Card>
  </form>
</template>

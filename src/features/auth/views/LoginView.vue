<script setup lang="ts">
import type { CallbackTypes } from 'vue3-google-login'
import { ROUTES } from '@/shared/constants/routes'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import InputValidator from '@/shared/ui/form/InputValidator.vue'
import Icon from '@/shared/ui/icon/Icon.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useAsyncState } from '@vueuse/core'
import { useForm } from 'vee-validate'
import { RouterLink } from 'vue-router'
import { GoogleLogin } from 'vue3-google-login'
import { useAuthStore } from '../stores/authStore'
import { loginValidator } from '../validation/auth.validation'

const authStore = useAuthStore()
const form = useForm({
  validationSchema: toTypedSchema(loginValidator),
})

const { isLoading, execute } = useAsyncState(authStore.login, null, {
  immediate: false,
  onError: (error) => {
    Promise.reject(error)
  },
})

const onSubmit = form.handleSubmit(async (values) => {
  await execute(0, values)
})
const callback: CallbackTypes.TokenResponseCallback = (_response) => {
}
</script>

<template>
  <form class="sm:min-w-[25rem]" @submit.prevent="onSubmit">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl text-center">
          Login
        </CardTitle>
        <CardDescription class="text-center">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <InputValidator id="email" type="email" label="Email" placeholder="you@example.com" name="email" />
            <div class="grid gap-2">
              <InputValidator id="password" type="password" placeholder="Enter your password" label="Password" name="password" />
              <RouterLink :to="ROUTES.AUTH.FORGOT_PASSWORD" class="ml-auto text-sm underline">
                Forgot your password?
              </RouterLink>
            </div>
          </div>
          <Button
            type="submit"
            :is-loading="isLoading"
          >
            Login
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <RouterLink :to="ROUTES.AUTH.SIGNUP" class="underline">
            Sign up
          </RouterLink>
        </div>
        <Separator label="Or" style-label="bg-transparent" class="my-4" />
        <GoogleLogin :callback="callback" class="w-full" popup-type="TOKEN">
          <Button type="button" class="w-full">
            <Icon name="IconGoogle" class="w-6 h-6" />
            Login with Google
          </Button>
        </GoogleLogin>
      </cardcontent>
    </Card>
  </form>
</template>

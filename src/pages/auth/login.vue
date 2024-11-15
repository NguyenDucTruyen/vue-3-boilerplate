<route>
  {
      meta: {
      layout: "auth",
      title: "Login",
      }
  }
  </route>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { loginSchema } from '@/utils/validation'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { RouterLink } from 'vue-router'
import z from 'zod'

const authStore = useAuthStore()

const form = useForm({
  validationSchema: toTypedSchema(loginSchema),
})

const onSubmit = form.handleSubmit(async (values) => {
  authStore.login(values)
})
</script>

<template>
  <form @submit.prevent="onSubmit">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">
          Login
        </CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <InputValidator id="email" label="Email" placeholder="m@gmai.com" name="email" />
            <div class="grid gap-2">
              <InputValidator id="password" type="password" placeholder="Password" label="Password" name="password" />
              <RouterLink to="/forgot-password" class="ml-auto text-sm underline">
                Forgot your password?
              </RouterLink>
            </div>
          </div>
          <Button type="submit">
            Login
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <RouterLink to="/auth/signup" class="underline">
            Sign up
          </RouterLink>
        </div>
      </CardContent>
    </Card>
  </form>
</template>

<route>
{
    meta: {
    layout: "auth",
    title: "Login",
    }
}
</route>

<script setup lang="ts">
import { toast } from '@/components/ui/toast'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { RouterLink } from 'vue-router'
import z from 'zod'

const formSchema = toTypedSchema(z.object({
  email: z.string({ message: 'Vui lòng nhập email' }).min(2).max(50),
  password: z.string(),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  toast({
    title: 'You submitted the following values:',
    description: JSON.stringify(values, null, 2),
  })
})
</script>

<template>
  <div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
    <form @submit="onSubmit">
      <div class="flex items-center justify-center py-12">
        <div class="mx-auto grid w-[350px] gap-6">
          <div class="grid gap-2 text-center">
            <h1 class="text-3xl font-bold">
              Login
            </h1>
            <p class="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div class="grid gap-2">
            <InputValidator id="email" label="Email" placeholder="m@gmai.com" name="email" />
            <div class="grid gap-2">
              <InputValidator id="password" type="password" label="Password" name="password" />
              <RouterLink to="/forgot-password" class="ml-auto text-sm underline">
                Forgot your password?
              </RouterLink>
            </div>
            <Button type="submit" class="w-full">
              Login
            </Button>
            <Button variant="outline" class="w-full">
              Login with Google
            </Button>
          </div>
          <div class="mt-4 text-center text-sm">
            Don't have an account?
            <a href="#" class="underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </form>
    <div class="hidden bg-muted lg:block">
      <img
        src="https://www.shadcn-vue.com/placeholder.svg"
        alt="Image"
        class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      >
    </div>
  </div>
</template>

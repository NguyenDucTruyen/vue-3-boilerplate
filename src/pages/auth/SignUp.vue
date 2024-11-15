<route>
  {
      meta: {
          title: "Sign Up",
          layout: "auth",
      }
  }
</route>

<script setup lang="ts">
</script>

<template>
  <form class="rounded-lg border bg-card text-card-foreground shadow-sm mx-auto max-w-sm h-max">
    <CardHeader>
      <CardTitle class="text-xl">
        Sign Up
      </CardTitle>
      <CardDescription>
        Enter your information to create an account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input id="password" placeholder="Password" type="password" />
        </div>
        <div class="grid gap-2">
          <Label for="password">Confirm Password</Label>
          <Input id="passwordcf" placeholder="Confirm Password" type="password" />
        </div>
        <Button type="submit" class="w-full">
          Create an account
        </Button>
      </div>
      <div class="mt-4 text-center text-sm">
        Already have an account?
        <RouterLink to="/auth/login" class="ml-1 text-balance underline">
          Login
        </RouterLink>
      </div>
    </CardContent>
  </form>
</template>

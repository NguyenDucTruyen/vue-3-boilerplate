<script setup lang="ts">
import { toast } from '@/components/ui/toast'

function showtoast() {
  toast({
    title: 'Hello from the Home Page',
    description: 'This is a toast message from the Home Page',
  })
}
</script>

<template>
  <Button @click="showtoast">
    Click me
  </Button>
  <RouterLink to="/auth/login">
    <Button>
      Go to Sign In
    </Button>
  </RouterLink>
  <br>
  <ModeToggle />
  <br>
  <ColorSelect />
</template>

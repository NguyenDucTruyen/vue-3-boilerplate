<script setup lang="ts">
import { toast } from '@/components/ui/toast'

function showtoast() {
  toast({
    title: 'Hello from the Home Page',
    description: 'This is a toast message from the Home Page',
  })
}
function clear() {
  localStorage.removeItem('accesstoken')
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
  <RouterLink to="/project">
    <Button>
      Go to Register
    </Button>
  </RouterLink>
  <br>
  <ModeToggle />
  <br>
  <ColorSelect />
  <Button @click="clear">
    Clear
  </Button>
  <br>
  <Icon name="IconBack" class="w-10 h-10 text-border" />
  <Icon name="IconPlus" class="w-10 h-10 text-primary" />
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
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
  <div>
    <h1>Welcome to the Home Page</h1>
    <p>This is the home page of the application.</p>
  </div>
</template>

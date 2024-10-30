<script setup lang="ts">
import { toast } from '@/components/ui/toast'

function showtoast() {
  toast({
    title: 'Hello from the Home Page',
    description: 'This is a toast message from the Home Page',
  })
}
function toggleTheme() {
  const body = document.querySelector('body')
  body?.classList.toggle('dark')
}
function setTheme(color: string) {
  const body = document.querySelector('body')
  body?.classList.add(color)
}
</script>

<template>
  <Button @click="showtoast">
    Click me
  </Button>
  <Button variant="ghost" @click="toggleTheme">
    Toggle theme
  </Button>
  <Button variant="outline" @click="setTheme('green')">
    Set theme green
  </Button>
  <div>
    <h1>Welcome to the Home Page</h1>
    <p>This is the home page of the application.</p>
  </div>
</template>

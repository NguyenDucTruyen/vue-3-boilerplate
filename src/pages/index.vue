<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <h1>Hello cô ba</h1>
  <p>isAuthenticated: {{ authStore.isAuthenticated }}</p>
</template>

<script setup>
import { showError } from '@/utils/toast'

onMounted(() => {
  window.addEventListener('unhandledrejection', (event) => {
    event.promise.catch((error) => {
      const errorMessage = error?.response?.data?.error ?? error?.response?.data?.message[0].message ?? error?.response?.data?.message ?? error?.message
      if (errorMessage) {
        showError(errorMessage)
      }
      else {
        showError('An unexpected error occurred.')
      }
    })
  })
})

onUnmounted(() => {
  window.removeEventListener('unhandledrejection', () => {})
})
</script>

<template>
  <slot />
</template>

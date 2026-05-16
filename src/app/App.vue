<script setup lang="ts">
import ConfirmationModal from '@/shared/components/ConfirmationModal.vue'
import { showError } from '@/shared/lib/toast'
import { useConfirmStore } from '@/shared/stores/confirmStore'
import { useThemeStore } from '@/shared/stores/themeStore'

const confirmStore = useConfirmStore()
useThemeStore()

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
  <router-view v-slot="{ Component }">
    <transition name="slide">
      <ErrorBoundary>
        <component :is="Component" />
      </ErrorBoundary>
    </transition>
  </router-view>
  <ConfirmationModal
    v-if="confirmStore.visible"
  />
</template>

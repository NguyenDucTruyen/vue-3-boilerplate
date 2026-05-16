<script setup lang="ts">
import ConfirmationModal from '@/shared/components/ConfirmationModal.vue'
import ErrorBoundary from '@/shared/components/ErrorBoundary.vue'
import { useConfirmStore } from '@/shared/stores/confirmStore'
import { useThemeStore } from '@/shared/stores/themeStore'

const confirmStore = useConfirmStore()
useThemeStore()
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

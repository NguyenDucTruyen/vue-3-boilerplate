<script setup lang="ts">
import { useConfirmStore } from '@/stores/confirm'
import { useThemeStore } from '@/stores/theme'

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

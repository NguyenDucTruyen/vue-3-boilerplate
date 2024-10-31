<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

useThemeStore()
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition name="slide">
      <component :is="Component" :key="route.name" />
    </transition>
  </router-view>
  <Toaster />
</template>

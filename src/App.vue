<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

useThemeStore()
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="slide">
      <component :is="Component"/>
    </transition>
  </router-view>
  <Toaster />
</template>

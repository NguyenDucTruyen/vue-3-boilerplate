<script setup lang="ts">
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition name="slide">
      <div :key="route.name">
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
</template>

<style scoped>
</style>

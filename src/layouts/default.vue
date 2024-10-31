<script setup lang="ts">
</script>

<template>
  <div>
    <header class="header">
      <h1>My Default Layout</h1>
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <p>© 2023 My Company</p>
    </footer>
  </div>
</template>

<style scoped>
.header {
  @apply bg-background p-4;
}

main {
    padding: 1rem;
}

footer {
    padding: 1rem;
    text-align: center;
    position: fixed;
    width: 100%;
    bottom: 0;
}
</style>

<template>
  <AppSideBar class="sidebar" />
  <div class="default-layout">
    <AppHeader class="navbar" />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<style scoped lang="scss">
.default-layout {
  height: 100vh;
  display: grid;
  gap: 8px;
  grid-template-columns: 260px 1fr;
  grid-template-rows: 80px 1fr;
  grid-template-areas:
  "navbar"
  "main-content";
  }

  .navbar {
    grid-area: navbar;
  }

  .main-content {
    @apply bg-card rounded-lg shadow-lg;
    grid-area: main-content;
    overflow-y: auto;
    height: calc(100vh - 80px);
  }

  .default-layout {
    grid-template-columns: 1fr;
    grid-template-areas:
      "navbar"
      "main-content";
  }
</style>

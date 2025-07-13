<script setup>
import { useSidebarStore } from '@/stores/sidebar'

const sidebarStore = useSidebarStore()
const data = ref({
  groupA: [
    {
      id: 3,
      icon: 'IconListUser',
      title: 'User Management',
      url: '/admin/user',
      name: ['admin-user'],
    },
    {
      id: 2,
      icon: 'IconChannel',
      title: 'Project',
      url: '/project',
      name: ['project'],
    },
    {
      id: 4,
      icon: 'IconPublic',
      title: 'Public Room',
      url: '/admin/public-room',
      name: ['admin-public-room'],
    },
    {
      id: 1,
      icon: 'IconHome',
      title: 'Home',
      url: '/',
      name: ['index'],
    },
    {
      id: 5,
      icon: 'IconReport',
      title: 'Reports',
      url: '/admin/reports',
      name: ['admin-reports', 'admin-reports-id'],
    },
  ].sort((a, b) => a.id - b.id),

})
</script>

<template>
  <div
    class="w-full max-lg:fixed h-[100vh] top-[64px] lg:hidden z-10 transition-all duration-300 ease-in-out  shadow-lg overflow-hidden"
    :class="sidebarStore.isOpen ? 'translate-x-0 bg-foreground/20' : 'max-lg:-translate-x-full bg-foreground/0'"
    @click="sidebarStore.close()"
  >
    <div
      class="w-full sm:w-64 relative h-full flex flex-col bg-card shadow-lg rounded-e-xl"
    >
      <div class="w-full" style="height: calc(100% - 6rem)">
        <div
          class="flex flex-1 flex-col overflow-auto group-data-[collapsible=icon]:overflow-hidden"
        >
          <AppSideBarGroup class="mb-8 mt-2">
            <template v-for="item in data.groupA" :key="item.id">
              <AppSideBarItem v-bind="item" />
            </template>
          </AppSideBarGroup>
        </div>
      </div>
    </div>
  </div>
</template>

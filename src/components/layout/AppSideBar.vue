<script setup>
import AppSideBarGroup from '@/components/layout/SideBar/AppSideBarGroup.vue'
import AppSideBarItem from '@/components/layout/SideBar/AppSideBarItem.vue'
import { BarChart3, HomeIcon, Projector } from 'lucide-vue-next'

const data = ref({
  groupA: [
    {
      id: 3,
      icon: 'IconListUser',
      title: 'User Management',
      url: '/admin/user',
      name: ['admin-user']
    },
    {
      id: 2,
      icon: 'IconChannel',
      title: 'Project',
      url: '/project',
      name: ['project']
    },
    {
      id: 4,
      icon: 'IconPublic',
      title: 'Public Room',
      url: '/admin/public-room',
      name: ['admin-public-room']
    },
    {
      id: 1,
      icon: HomeIcon,
      title: 'Home',
      url: '/',
      name: ['index']
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
  <div class="flex flex-col duration-200 w-[15rem] bg-transparent ease-linear border-r border-gray-200">
    <div class="flex items-center gap-4 h-16 border-b">
      <div
        class="logo-container gap-2 pl-6 cursor-pointer hidden lg:flex items-center"
        @click="$router.push('/')"
      >
        <img
          src="@/assets/images/Logo_Slooh_Horizontal.png"
          alt="Slooh Logo"
          class="h-12 hover:opacity-90 transition-opacity"
        >
      </div>
      <div
        class="logo-container gap-2 pl-1 cursor-pointer hidden max-lg:flex items-center"
        @click="$router.push('/')"
      >
        <img
          src="@/assets/images/Logo_Slooh.png"
          alt="Slooh Logo"
          class="h-12 hover:opacity-90 transition-opacity"
        >
      </div>
    </div>
    <div class="w-full" style="height: calc(100% - 6rem)">
      <div
        class="flex flex-1 flex-col overflow-auto group-data-[collapsible=icon]:overflow-hidden"
      >
        <AppSideBarGroup class="mb-8">
          <template v-for="item in data.groupA" :key="item.id">
            <AppSideBarItem v-bind="item" />
          </template>
        </AppSideBarGroup>
      </div>
    </div>
  </div>
</template>

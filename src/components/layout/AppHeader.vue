<script setup>
import UserDropdown from '@/components/common/UserDropdown.vue'
import Button from '@/components/ui/button/Button.vue'
import { useSidebarStore } from '@/stores/sidebar'
import { useUserStore } from '@/stores/user'

const sidebarStore = useSidebarStore()
function toggleSidebar() {
  sidebarStore.toggle()
}
const userStore = useUserStore()

const listHeaders = ref([

  {
    id: 1,
    icon: 'IconHome',
    iconActive: 'IconHomeActive',
    title: 'Trang chủ',
    url: '/',
  },
  {
    id: 2,
    icon: 'IconPublic',
    iconActive: 'IconPublicActive',
    title: 'About',
    url: '/about',
  },
  {
    id: 4,
    icon: 'IconGroup',
    iconActive: 'IconGroupActive',
    title: 'Kênh của tôi',
    url: '/channels',
    content: 'Đăng nhập để xem kênh của bạn',
    authorized: true,
  },
  {
    id: 5,
    icon: 'IconJoin',
    iconActive: 'IconJoinActive',
    title: 'Kênh đã tham gia',
    url: '/joinedchannels',
    content: 'Đăng nhập để xem kênh đã tham gia',
    authorized: true,
  },
])
</script>

<template>
  <div class="app-header">
    <div class="flex gap-4">
      <div class="gap-2 pl-6 cursor-pointer hidden lg:flex" @click="$router.push('/')">
        <img src="@/assets/images/Logo_Slooh_Horizontal.png" alt="" class="h-12">
      </div>
      <div class="gap-2 pl-1 cursor-pointer hidden max-lg:flex" @click="$router.push('/')">
        <img src="@/assets/images/Logo_Slooh.png" alt="" class="h-12">
      </div>
      <div class="lg:hidden flex items-center mr-4">
        <button
          class="flex items-center justify-center w-10 h-10 rounded-lg transition duration-200 ease-in-out"
          :class="sidebarStore.isOpen ? 'bg-muted border border-border' : ''"
          @click="toggleSidebar()"
        >
          <Icon
            name="IconMenu" class="w-6 h-6 text-foreground"
            :class="sidebarStore.isOpen ? ' text-secondary-foreground' : ''"
          >
            <title>Menu</title>
          </Icon>
        </button>
      </div>
    </div>
    <div class="hidden lg:flex items-center gap-2">
      <template v-for="item in listHeaders" :key="item.id">
        <AppSideBarItem v-bind="item" class="p-4" />
      </template>
    </div>
    <div class="flex">
      <UserDropdown v-if="userStore?.user" />
      <template v-else>
        <router-link to="/auth/signup">
          <Button class="rounded-full px-6" variant="ghost">
            Đăng ký
          </Button>
        </router-link>
        <router-link to="/auth/login">
          <Button class="rounded-full px-6 ml-4">
            Đăng nhập
          </Button>
        </router-link>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-header {
  @apply flex items-center justify-between w-full h-full gap-1 p-2 lg:pr-8 bg-card shadow-lg;
}
</style>

<script setup>
import UserDropdown from '@/components/common/UserDropdown.vue'
import Button from '@/components/ui/button/Button.vue'
import { useSidebarStore } from '@/stores/sidebar'
import { useUserStore } from '@/stores/user'
import InputSearch from '../common/InputSearch.vue'

const userStore = useUserStore()
const sidebarStore = useSidebarStore()
const searchValue = ref('')
const router = useRouter()
const route = useRoute()
const inputSearch = useTemplateRef('input-search')
function handleNavigate() {
  if (route.name === 'Search')
    return
  router.push({ name: 'Search', query: { q: searchValue.value } })
}
function handleUpdateQuery() {
  router.push({ query: { q: searchValue.value } })
}
onMounted(() => {
  if (route.query.q) {
    searchValue.value = route.query.q
  }
  if (Object.keys(route.query).includes('q'))
    inputSearch.value.focus()
})
</script>

<template>
  <div class="flex items-center justify-between w-full h-full gap-2 p-2 lg:pr-8 bg-card">
    <div class="flex gap-2">
      <img src="@/assets/images/Logo_Slooh.png" class="w-10 h-10 lg:hidden" alt="">
      <div
        class="lg:hidden p-2 hover:bg-muted cursor-pointer rounded-md"
        variant="ghost"
        @click="sidebarStore.toggle()"
      >
        <Icon v-if="sidebarStore.isOpen" name="IconMenuClose" class="w-6 h-6 text-foreground" />
        <Icon v-else name="IconMenuOpen" class="w-6 h-6 text-foreground" />
      </div>
      <InputSearch
        ref="input-search"
        v-model="searchValue"
        placeholder="Search..."
        @focus="handleNavigate"
        @change="handleUpdateQuery"
      />
      <!-- <div class="relative w-full max-w-sm items-center ml-3 lg:ml-8">
        <input
          id="search"
          ref="input-search"
          v-model="searchValue"
          type="text"
          placeholder="Search..."
          class="flex h-10 w-full border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 rounded-full text-black"
          @focus="handleNavigate"
          @change="handleUpdateQuery"
        >
        <span
          class="absolute start-0 inset-y-0 flex items-center justify-center h-10"
          style="left: 0.75rem"
        >
          <Icon name="IconSearch" class="w-4 text-black" />
        </span>
      </div> -->
    </div>
    <div class="flex">
      <UserDropdown v-if="userStore?.user" />
      <template v-else>
        <router-link to="/auth/singup">
          <Button class="rounded-full px-6" variant="ghost">
            Sign up
          </Button>
        </router-link>
        <router-link to="/auth/login">
          <Button class="rounded-full px-6 bg-foreground">
            Log in
          </Button>
        </router-link>
      </template>
    </div>
  </div>
</template>

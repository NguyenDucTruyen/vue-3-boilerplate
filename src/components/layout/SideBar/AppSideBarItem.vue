<script setup>
import { useUserStore } from '@/stores/user'

const props = defineProps({
  icon: String,
  iconActive: String,
  title: String,
  type: {
    type: String,
    default: 'router-link',
  },
  url: {
    type: String,
    default: '/',
  },
  textStyle: {
    type: String,
    default: 'text-sm',
  },
  authorized: {
    type: Boolean,
    default: false,
  },
})
const userStore = useUserStore()
const route = useRoute()
const isActive = computed(() => props.url === route.path || (props.url !== '/' && route.path.startsWith(props.url)))
const component = computed(() => {
  if (userStore.isAuthenticated)
    return props.type

  if (props.authorized && !userStore.isAuthenticated)
    return 'button'
  else return 'RouterLink'
})
</script>

<template>
  <UnauthenPopover
    :title="props.title"
    :content="props.content"
    :is-required="props.authorized && !userStore.isAuthenticated"
  >
    <component
      :is="component"
      :to="props.type === 'router-link' ? props.url : {}"
      :class="isActive || props.type !== 'router-link' ? 'bg-primary text-primary-foreground bg-opacity-50' : ''"
      class="flex py-2 pl-4 gap-2 items-center cursor-pointer text-foreground hover:bg-accent hover:bg-opacity-10 hover:text-primary-foreground transition-colors duration-200 ease-in-out rounded-md"
      v-bind="$attrs"
    >
      <Icon v-show="!isActive" :name=" props.icon" class="w-6 h-6" />
      <Icon v-show="isActive" :name="props.iconActive ?? props.icon" class="w-6 h-6" />
      <span class="font-bold" :class="props.textStyle">{{ props.title }}</span>
    </component>
  </UnauthenPopover>
</template>

import type { Ref } from 'vue'
import { defineStore } from 'pinia'

interface ISidebarStore {
  isOpen: Ref<boolean>
  toggle: () => void
  open: () => void
  close: () => void
}

export const useSidebarStore = defineStore('sidebar', (): ISidebarStore => {
  const isOpen = ref(false)
  const toggle = () => {
    isOpen.value = !isOpen.value
  }
  const open = () => {
    isOpen.value = true
  }
  const close = () => {
    isOpen.value = false
  }
  return { isOpen, toggle, open, close }
})

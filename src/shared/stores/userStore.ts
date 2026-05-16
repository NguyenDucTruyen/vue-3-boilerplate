import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchUserData } from '../api/userApi'

interface IUserStore {
  user: Ref<any>
  setUser: (newUser: any) => void
  removeUser: () => void
  getUserData: () => Promise<void>
  isAuthenticated: Ref<boolean>
}

export const useUserStore = defineStore('user', (): IUserStore => {
  const user = ref(null)

  function setUser(newUser: any) {
    user.value = newUser
  }
  function removeUser() {
    user.value = null
  }
  async function getUserData() {
    const data = await fetchUserData()
    setUser(data)
  }
  const isAuthenticated = computed(() => !!user.value)
  return {
    user,
    setUser,
    isAuthenticated,
    removeUser,
    getUserData,
  }
})

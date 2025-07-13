import type { ColorsType, ThemeType } from '@/types/theme-type'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

interface IThemeStore {
  theme: Ref<ThemeType>
  color: Ref<ColorsType>
  setTheme: (newTheme: ThemeType) => void
  setColor: (newColor: ColorsType) => void
  toggleTheme: () => void
}

export const useThemeStore = defineStore('themeStore', (): IThemeStore => {
  const themeLocal = localStorage.getItem('theme') || 'light'
  const colorsLocal = localStorage.getItem('color') || 'zinc'

  const theme = ref<ThemeType>(themeLocal as ThemeType)
  const color = ref<ColorsType>(colorsLocal as ColorsType)

  document.body.classList.add(theme.value)
  document.body.classList.add(color.value)

  function setTheme(newTheme: ThemeType) {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
  }

  function setColor(newColor: ColorsType) {
    color.value = newColor
    localStorage.setItem('color', newColor)
  }

  function toggleTheme() {
    setTheme(theme.value === 'light' ? 'dark' : 'light')
  }

  watch([theme, color], ([newTheme, newColor]: string[], [oldTheme, oldColor]: string[]) => {
    if (oldTheme) {
      document.body.classList.remove(oldTheme)
    }
    if (oldColor) {
      document.body.classList.remove(oldColor)
    }
    document.body.classList.add(newTheme)
    document.body.classList.add(newColor)
  })

  return {
    theme,
    color,
    setTheme,
    setColor,
    toggleTheme,
  }
})

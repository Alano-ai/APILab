import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Theme } from '@/types'

interface ThemeStore {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light'
          // 更新 HTML 类名
          document.documentElement.classList.toggle('dark', newTheme === 'dark')
          return { theme: newTheme }
        }),
      setTheme: (theme) => {
        document.documentElement.classList.toggle('dark', theme === 'dark')
        set({ theme })
      },
    }),
    {
      name: 'apilab-theme',
      version: 1,
    }
  )
)
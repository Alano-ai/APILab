import { create } from 'zustand'
import type { LogEntry } from '@/types'

interface LogStore {
  logs: LogEntry[]
  isOpen: boolean
  addLog: (type: LogEntry['type'], data: Record<string, unknown>) => void
  togglePanel: () => void
  clearLogs: () => void
}

export const useLogStore = create<LogStore>()((set) => ({
  logs: [],
  isOpen: false,
  
  addLog: (type, data) => {
    const id = `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const timestamp = Date.now()
    set((state) => ({
      logs: [{ id, timestamp, type, data }, ...state.logs].slice(0, 100),
    }))
  },
  
  togglePanel: () => set((state) => ({ isOpen: !state.isOpen })),
  
  clearLogs: () => set({ logs: [] }),
}))
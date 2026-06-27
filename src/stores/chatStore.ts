import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Message } from '@/types'

interface ChatStore {
  messages: Message[]
  isLoading: boolean
  abortController: AbortController | null
  totalTokensUsed: number
  addMessage: (msg: Omit<Message, 'id' | 'timestamp'>) => string
  updateMessage: (id: string, content: string) => void
  removeMessage: (id: string) => void
  setLoading: (loading: boolean) => void
  setAbortController: (controller: AbortController | null) => void
  clearChat: () => void
  incrementTokens: (amount: number) => void
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      messages: [],
      isLoading: false,
      abortController: null,
      totalTokensUsed: 0,
      
      addMessage: (msg) => {
        const id = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        const timestamp = Date.now()
        set((state) => ({
          messages: [...state.messages, { ...msg, id, timestamp }],
        }))
        return id
      },
      
      updateMessage: (id, content) =>
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === id ? { ...msg, content } : msg
          ),
        })),
      
      removeMessage: (id) =>
        set((state) => ({
          messages: state.messages.filter((msg) => msg.id !== id),
        })),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      setAbortController: (controller) => set({ abortController: controller }),
      
      clearChat: () =>
        set({
          messages: [],
          totalTokensUsed: 0,
        }),
      
      incrementTokens: (amount) =>
        set((state) => ({
          totalTokensUsed: state.totalTokensUsed + amount,
        })),
    }),
    {
      name: 'apilab-chat',
      version: 2,
      partialize: (state) => ({
        messages: state.messages,
        totalTokensUsed: state.totalTokensUsed,
      }),
      migrate: (persistedState, version) => {
        if (version === 1) {
          const state = persistedState as any
          return {
            messages: state.messages || [],
            totalTokensUsed: state.totalTokensUsed || 0,
          }
        }
        return persistedState as Pick<ChatStore, 'messages' | 'totalTokensUsed'>
      },
    }
  )
)
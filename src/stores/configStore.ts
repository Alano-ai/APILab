import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ApiConfig, ModelConfig, PresetEndpoint } from '@/types'

interface ConfigStore {
  api: ApiConfig
  model: ModelConfig
  updateApi: (config: Partial<ApiConfig>) => void
  updateModel: (config: Partial<ModelConfig>) => void
  loadFromPreset: (presetKey: string) => void
  reset: () => void
}

const defaultApi: ApiConfig = {
  apiKey: '',
  preset: '',
  endpoint: '',
  apiType: 'openai',
}

const defaultModel: ModelConfig = {
  model: '',
  temperature: 0.7,
  maxTokens: 1024,
  systemPrompt: '',
}

export const presetEndpoints: Record<string, PresetEndpoint> = {
  DeepSeek: {
    url: 'https://api.deepseek.com/v1',
    models: ['deepseek-chat', 'deepseek-reasoner', 'deepseek-coder'],
    apiType: 'openai',
  },
  OpenAI: {
    url: 'https://api.openai.com/v1',
    models: ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo', 'gpt-4o'],
    apiType: 'openai',
  },
  通义千问: {
    url: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    models: ['qwen-plus', 'qwen-turbo', 'qwen-long', 'qwen-vl-max'],
    apiType: 'openai',
  },
  Claude: {
    url: 'https://api.anthropic.com/v1',
    models: ['claude-3-5-sonnet-20241022', 'claude-3-5-haiku-20241022', 'claude-3-opus-20240229'],
    apiType: 'anthropic',
  },
  Gemini: {
    url: 'https://generativelanguage.googleapis.com/v1beta',
    models: ['gemini-1.5-pro', 'gemini-1.5-flash', 'gemini-2.0-flash'],
    apiType: 'google',
  },
}

export const useConfigStore = create<ConfigStore>()(
  persist(
    (set, get) => ({
      api: { ...defaultApi },
      model: { ...defaultModel },
      
      updateApi: (config) =>
        set((state) => ({
          api: { ...state.api, ...config },
        })),
      
      updateModel: (config) =>
        set((state) => ({
          model: { ...state.model, ...config },
        })),
      
      loadFromPreset: (presetKey) => {
        const preset = presetEndpoints[presetKey]
        if (preset) {
          set((state) => ({
            api: {
              ...state.api,
              preset: presetKey,
              endpoint: preset.url,
              apiType: preset.apiType,
            },
          }))
        }
      },
      
      reset: () => {
        set({
          api: { ...defaultApi },
          model: { ...defaultModel },
        })
      },
    }),
    {
      name: 'apilab-config',
      version: 2,
      migrate: (persistedState, version) => {
        // 从 v1 迁移到 v2
        if (version === 1) {
          const state = persistedState as any
          return {
            api: {
              apiKey: state.apiKey || '',
              preset: state.preset || '',
              endpoint: state.endpoint || '',
              apiType: 'openai',
            },
            model: {
              model: state.model || '',
              temperature: state.temperature || 0.7,
              maxTokens: state.maxTokens || 1024,
              systemPrompt: state.systemPrompt || '',
            },
          }
        }
        return persistedState as ConfigStore
      },
    }
  )
)
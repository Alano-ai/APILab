export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: number
  tokens?: {
    prompt: number
    completion: number
    total: number
  }
}

export interface ApiConfig {
  apiKey: string
  preset: string
  endpoint: string
  apiType: 'openai' | 'anthropic' | 'google'
}

export interface ModelConfig {
  model: string
  temperature: number
  maxTokens: number
  systemPrompt: string
}

export interface LogEntry {
  id: string
  timestamp: number
  type: 'REQUEST' | 'RESPONSE' | 'ERROR'
  data: Record<string, unknown>
}

export interface PresetEndpoint {
  url: string
  models: string[]
  apiType: 'openai' | 'anthropic' | 'google'
}

export type Theme = 'light' | 'dark'
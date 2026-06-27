import type { ApiAdapter, RequestParams, TokenUsage } from './types'
import type { Message } from '@/types'

export const openaiAdapter: ApiAdapter = {
  buildUrl(endpoint: string, _model: string): string {
    return `${endpoint}/chat/completions`
  },

  buildRequestBody(messages: Message[], params: RequestParams): object {
    return {
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      temperature: params.temperature,
      max_tokens: params.maxTokens,
      stream: false,
    }
  },

  buildHeaders(apiKey: string): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    }
  },

  extractReply(data: unknown): string {
    const response = data as any
    return response.choices?.[0]?.message?.content || ''
  },

  extractUsage(data: unknown): TokenUsage | null {
    const response = data as any
    if (response.usage) {
      return {
        prompt: response.usage.prompt_tokens || 0,
        completion: response.usage.completion_tokens || 0,
        total: response.usage.total_tokens || 0,
      }
    }
    return null
  },
}
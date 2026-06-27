import type { ApiAdapter, RequestParams, TokenUsage } from './types'
import type { Message } from '@/types'

export const anthropicAdapter: ApiAdapter = {
  buildUrl(endpoint: string, _model: string): string {
    return `${endpoint}/messages`
  },

  buildRequestBody(messages: Message[], params: RequestParams): object {
    // Anthropic API 需要将系统消息单独提取
    const systemMessage = messages.find((msg) => msg.role === 'system')
    const otherMessages = messages.filter((msg) => msg.role !== 'system')

    return {
      messages: otherMessages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      max_tokens: params.maxTokens,
      temperature: params.temperature,
      ...(systemMessage && { system: systemMessage.content }),
    }
  },

  buildHeaders(apiKey: string): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    }
  },

  extractReply(data: unknown): string {
    const response = data as any
    return response.content?.[0]?.text || ''
  },

  extractUsage(data: unknown): TokenUsage | null {
    const response = data as any
    if (response.usage) {
      return {
        prompt: response.usage.input_tokens || 0,
        completion: response.usage.output_tokens || 0,
        total: (response.usage.input_tokens || 0) + (response.usage.output_tokens || 0),
      }
    }
    return null
  },
}
import type { ApiAdapter, RequestParams, TokenUsage } from './types'
import type { Message } from '@/types'

export const googleAdapter: ApiAdapter = {
  buildUrl(endpoint: string, model: string): string {
    return `${endpoint}/models/${model}:generateContent`
  },

  buildRequestBody(messages: Message[], params: RequestParams): object {
    // Gemini API 需要转换消息格式
    const contents = messages
      .filter((msg) => msg.role !== 'system')
      .map((msg) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      }))

    const systemMessage = messages.find((msg) => msg.role === 'system')

    return {
      contents,
      generationConfig: {
        temperature: params.temperature,
        maxOutputTokens: params.maxTokens,
      },
      ...(systemMessage && {
        systemInstruction: {
          parts: [{ text: systemMessage.content }],
        },
      }),
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
    return response.candidates?.[0]?.content?.parts?.[0]?.text || ''
  },

  extractUsage(data: unknown): TokenUsage | null {
    const response = data as any
    if (response.usageMetadata) {
      return {
        prompt: response.usageMetadata.promptTokenCount || 0,
        completion: response.usageMetadata.candidatesTokenCount || 0,
        total: response.usageMetadata.totalTokenCount || 0,
      }
    }
    return null
  },
}
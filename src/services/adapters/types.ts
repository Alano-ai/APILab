import type { Message } from '@/types'

export interface RequestParams {
  temperature: number
  maxTokens: number
}

export interface TokenUsage {
  prompt: number
  completion: number
  total: number
}

export interface ApiAdapter {
  /** 构建请求 URL */
  buildUrl(endpoint: string, model: string): string
  /** 构建请求体 */
  buildRequestBody(messages: Message[], params: RequestParams): object
  /** 构建请求头 */
  buildHeaders(apiKey: string): Record<string, string>
  /** 从响应中提取回复文本 */
  extractReply(data: unknown): string
  /** 从响应中提取 token 使用信息 */
  extractUsage(data: unknown): TokenUsage | null
}
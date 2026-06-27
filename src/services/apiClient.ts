import { getAdapter, type ApiType, type RequestParams } from './adapters'
import type { Message } from '@/types'
import { useLogStore } from '@/stores/logStore'

export interface ApiResponse {
  reply: string
  usage: {
    prompt: number
    completion: number
    total: number
  } | null
}

export class ApiClient {
  private abortController: AbortController | null = null

  async sendMessage(
    endpoint: string,
    apiKey: string,
    model: string,
    apiType: ApiType,
    messages: Message[],
    params: RequestParams
  ): Promise<ApiResponse> {
    const adapter = getAdapter(apiType)
    const url = adapter.buildUrl(endpoint, model)
    const headers = adapter.buildHeaders(apiKey)
    const body = adapter.buildRequestBody(messages, params)

    // 记录请求日志
    const { addLog } = useLogStore.getState()
    addLog('REQUEST', {
      endpoint: url,
      model,
      apiType,
      messageCount: messages.length,
      temperature: params.temperature,
      maxTokens: params.maxTokens,
    })

    this.abortController = new AbortController()

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal: this.abortController.signal,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = (errorData as any).error?.message || `API请求失败: ${response.status}`
        throw new Error(errorMessage)
      }

      const data = await response.json()

      // 记录响应日志
      addLog('RESPONSE', {
        status: response.status,
        model,
        apiType,
        responseSize: JSON.stringify(data).length,
      })

      const reply = adapter.extractReply(data)
      const usage = adapter.extractUsage(data)

      return { reply, usage }
    } catch (error) {
      // 记录错误日志
      addLog('ERROR', {
        type: (error as Error).name,
        message: (error as Error).message,
        model,
        apiType,
        endpoint: url,
      })
      throw error
    } finally {
      this.abortController = null
    }
  }

  abort(): void {
    if (this.abortController) {
      this.abortController.abort()
      this.abortController = null
    }
  }
}

export const apiClient = new ApiClient()
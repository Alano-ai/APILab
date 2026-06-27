import type { ApiAdapter } from './types'
import { openaiAdapter } from './openai'
import { anthropicAdapter } from './anthropic'
import { googleAdapter } from './google'

export type ApiType = 'openai' | 'anthropic' | 'google'

export const adapters: Record<ApiType, ApiAdapter> = {
  openai: openaiAdapter,
  anthropic: anthropicAdapter,
  google: googleAdapter,
}

export function getAdapter(apiType: ApiType): ApiAdapter {
  return adapters[apiType]
}

export type { ApiAdapter, RequestParams, TokenUsage } from './types'
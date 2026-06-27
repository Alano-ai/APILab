import { useState, useRef, useEffect } from 'react'
import { Send, Square } from 'lucide-react'
import { Button } from '../ui/button'
import { useChatStore } from '@/stores/chatStore'
import { useConfigStore } from '@/stores/configStore'
import { apiClient } from '@/services/apiClient'
import { getAdapter } from '@/services/adapters'

export function ChatInput() {
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { addMessage, setLoading, isLoading, incrementTokens, setAbortController } = useChatStore()
  const { api, model } = useConfigStore()

  // 自动调整文本框高度
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [message])

  const handleSend = async () => {
    if (!message.trim() || isLoading) return
    
    // 验证配置
    if (!api.apiKey) {
      addMessage({ role: 'system', content: '请先配置 API 密钥' })
      return
    }
    
    if (!api.endpoint) {
      addMessage({ role: 'system', content: '请配置 API 端点' })
      return
    }
    
    if (!model.model) {
      addMessage({ role: 'system', content: '请选择或输入模型名称' })
      return
    }

    // 添加用户消息
    const userMessage = message.trim()
    addMessage({ role: 'user', content: userMessage })
    setMessage('')
    setLoading(true)

    try {
      // 准备消息历史
      const { messages } = useChatStore.getState()
      const recentHistory = messages.slice(-6) // 保留最近3轮对话
      
      // 如果有系统提示词，添加到消息开头
      const messagesToSend = []
      if (model.systemPrompt) {
        messagesToSend.push({
          id: 'system',
          role: 'system' as const,
          content: model.systemPrompt,
          timestamp: Date.now(),
        })
      }
      messagesToSend.push(...recentHistory)

      // 调用 API
      const response = await apiClient.sendMessage(
        api.endpoint,
        api.apiKey,
        model.model,
        api.apiType,
        messagesToSend,
        {
          temperature: model.temperature,
          maxTokens: model.maxTokens,
        }
      )

      // 添加助手消息
      addMessage({
        role: 'assistant',
        content: response.reply,
        tokens: response.usage || undefined,
      })

      // 更新 token 计数
      if (response.usage) {
        incrementTokens(response.usage.total)
      }
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        addMessage({ role: 'system', content: '生成已停止' })
      } else {
        addMessage({
          role: 'system',
          content: `错误: ${(error as Error).message}`,
        })
      }
    } finally {
      setLoading(false)
      setAbortController(null)
    }
  }

  const handleStop = () => {
    apiClient.abort()
    setLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border-t border-border bg-card p-4">
      <div className="flex gap-2">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="输入您的消息... (Shift+Enter 换行)"
          className="min-h-[60px] max-h-[200px] flex-1 resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isLoading}
          rows={1}
        />
        <div className="flex flex-col gap-2">
          {isLoading ? (
            <Button
              variant="destructive"
              size="icon"
              onClick={handleStop}
              title="停止生成"
            >
              <Square className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!message.trim()}
              title="发送消息"
            >
              <Send className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
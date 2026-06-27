import { useEffect, useRef } from 'react'
import { useChatStore } from '@/stores/chatStore'
import { MessageBubble } from './MessageBubble'

export function ChatMessages() {
  const { messages } = useChatStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <div className="text-center">
              <h3 className="text-lg font-medium">欢迎使用 APILAB</h3>
              <p className="mt-2 text-sm">请先配置 API 密钥和模型设置，然后开始对话</p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
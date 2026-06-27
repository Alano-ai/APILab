import { cn } from '@/lib/utils'
import type { Message } from '@/types'
import { MarkdownRenderer } from './MarkdownRenderer'

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  const isSystem = message.role === 'system'

  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  if (isSystem) {
    return (
      <div className="flex justify-center">
        <div className="rounded-lg bg-muted px-4 py-2 text-sm text-muted-foreground">
          {message.content}
        </div>
      </div>
    )
  }

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[80%] rounded-lg px-4 py-2',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-foreground'
        )}
      >
        {isUser ? (
          <div className="whitespace-pre-wrap">{message.content}</div>
        ) : (
          <MarkdownRenderer content={message.content} />
        )}
        <div
          className={cn(
            'mt-1 text-xs',
            isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
          )}
        >
          {formattedTime}
          {message.tokens && (
            <span className="ml-2">
              {message.tokens.total} tokens
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
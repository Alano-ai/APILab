import { cn } from '@/lib/utils'
import type { LogEntry as LogEntryType } from '@/types'

interface LogEntryProps {
  log: LogEntryType
}

export function LogEntry({ log }: LogEntryProps) {
  const formattedTime = new Date(log.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  const typeColors = {
    REQUEST: 'border-l-blue-500 bg-blue-50 dark:bg-blue-950',
    RESPONSE: 'border-l-green-500 bg-green-50 dark:bg-green-950',
    ERROR: 'border-l-red-500 bg-red-50 dark:bg-red-950',
  }

  const typeLabels = {
    REQUEST: '请求',
    RESPONSE: '响应',
    ERROR: '错误',
  }

  return (
    <div
      className={cn(
        'rounded-md border-l-4 p-3 text-xs font-mono',
        typeColors[log.type]
      )}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="font-semibold">{typeLabels[log.type]}</span>
        <span className="text-muted-foreground">{formattedTime}</span>
      </div>
      <pre className="overflow-x-auto whitespace-pre-wrap break-all text-muted-foreground">
        {JSON.stringify(log.data, null, 2)}
      </pre>
    </div>
  )
}
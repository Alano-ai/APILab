import { X } from 'lucide-react'
import { Button } from '../ui/button'
import { useLogStore } from '@/stores/logStore'
import { LogEntry } from './LogEntry'

export function LogPanel() {
  const { logs, isOpen, togglePanel, clearLogs } = useLogStore()

  if (!isOpen) return null

  return (
    <div className="fixed bottom-16 right-4 z-50 flex h-[500px] w-[400px] flex-col rounded-lg border border-border bg-card shadow-lg">
      <div className="flex items-center justify-between border-b border-border p-3">
        <h3 className="text-sm font-medium">API 请求日志</h3>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={clearLogs}>
            清空
          </Button>
          <Button variant="ghost" size="icon" onClick={togglePanel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        {logs.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            暂无日志记录
          </div>
        ) : (
          <div className="space-y-2">
            {logs.map((log) => (
              <LogEntry key={log.id} log={log} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
import { Terminal } from 'lucide-react'
import { Button } from '../ui/button'
import { useLogStore } from '@/stores/logStore'

export function LogToggleButton() {
  const { togglePanel, logs } = useLogStore()

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-4 right-4 z-40 h-10 w-10 rounded-full"
      onClick={togglePanel}
      title="查看 API 日志"
    >
      <Terminal className="h-4 w-4" />
      {logs.length > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
          {logs.length > 99 ? '99+' : logs.length}
        </span>
      )}
    </Button>
  )
}
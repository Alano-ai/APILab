import { Moon, Sun, Trash2, Download } from 'lucide-react'
import { Button } from '../ui/button'
import { useThemeStore } from '@/stores/themeStore'
import { useChatStore } from '@/stores/chatStore'

export function AppHeader() {
  const { theme, toggleTheme } = useThemeStore()
  const { clearChat } = useChatStore()

  const handleExport = () => {
    // TODO: 实现导出功能
    console.log('导出功能待实现')
  }

  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
      <div className="flex items-baseline gap-2">
        <h1 className="text-2xl font-bold text-primary">APILAB</h1>
        <span className="text-sm text-muted-foreground">大模型API调试平台</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          title={theme === 'dark' ? '切换到亮色主题' : '切换到暗色主题'}
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <Button variant="outline" onClick={clearChat}>
          <Trash2 className="mr-2 h-4 w-4" />
          清空对话
        </Button>
        <Button variant="outline" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          导出记录
        </Button>
      </div>
    </header>
  )
}
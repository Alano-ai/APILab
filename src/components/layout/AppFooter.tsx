import { useChatStore } from '@/stores/chatStore'

export function AppFooter() {
  const { isLoading, totalTokensUsed } = useChatStore()

  return (
    <footer className="flex items-center justify-between border-t border-border bg-card px-6 py-2 text-sm text-muted-foreground">
      <div className="flex items-center gap-4">
        <span>状态: {isLoading ? '请求中...' : '就绪'}</span>
        <span>Tokens: {totalTokensUsed}</span>
      </div>
      <div>APILAB v2.0.0</div>
    </footer>
  )
}
import { AppHeader } from './AppHeader'
import { AppFooter } from './AppFooter'
import { Sidebar } from './Sidebar'
import { ChatContainer } from '../chat/ChatContainer'
import { LogPanel } from '../log/LogPanel'
import { LogToggleButton } from '../log/LogToggleButton'

export function MainLayout() {
  return (
    <div className="flex h-screen flex-col bg-background">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <ChatContainer />
      </div>
      <AppFooter />
      <LogPanel />
      <LogToggleButton />
    </div>
  )
}
import { ChatMessages } from './ChatMessages'
import { ChatInput } from './ChatInput'

export function ChatContainer() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <ChatMessages />
      <ChatInput />
    </div>
  )
}
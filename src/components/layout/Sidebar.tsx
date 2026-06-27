import { ApiConfigPanel } from '../config/ApiConfigPanel'
import { ModelConfigPanel } from '../config/ModelConfigPanel'
import { SystemPromptEditor } from '../config/SystemPromptEditor'

export function Sidebar() {
  return (
    <aside className="w-80 overflow-y-auto border-r border-border bg-sidebar p-4">
      <div className="space-y-6">
        <ApiConfigPanel />
        <ModelConfigPanel />
        <SystemPromptEditor />
      </div>
    </aside>
  )
}
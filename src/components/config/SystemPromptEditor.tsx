import { useConfigStore } from '@/stores/configStore'

export function SystemPromptEditor() {
  const { model, updateModel } = useConfigStore()

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">系统提示词</h3>
      
      <div className="space-y-2">
        <textarea
          value={model.systemPrompt}
          onChange={(e) => updateModel({ systemPrompt: e.target.value })}
          placeholder="可选的系统级提示词，会影响模型行为"
          rows={4}
          className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>
    </div>
  )
}
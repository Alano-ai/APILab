import { useConfigStore, presetEndpoints } from '@/stores/configStore'

export function ModelConfigPanel() {
  const { api, model, updateModel } = useConfigStore()
  
  // 获取当前预设的模型列表
  const currentPreset = api.preset ? presetEndpoints[api.preset] : null
  const models = currentPreset?.models || []

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">模型配置</h3>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">选择模型</label>
        {models.length > 0 ? (
          <select
            value={model.model}
            onChange={(e) => updateModel({ model: e.target.value })}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">-- 选择模型 --</option>
            {models.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            value={model.model}
            onChange={(e) => updateModel({ model: e.target.value })}
            placeholder="输入自定义模型名称"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Temperature: {model.temperature}
        </label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={model.temperature}
          onChange={(e) => updateModel({ temperature: parseFloat(e.target.value) })}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Max Tokens</label>
        <input
          type="number"
          min="100"
          max="4096"
          value={model.maxTokens}
          onChange={(e) => updateModel({ maxTokens: parseInt(e.target.value) })}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>
    </div>
  )
}
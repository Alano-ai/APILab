import { useConfigStore, presetEndpoints } from '@/stores/configStore'
import { Button } from '../ui/button'

export function ApiConfigPanel() {
  const { api, updateApi, loadFromPreset } = useConfigStore()

  const handlePresetChange = (preset: string) => {
    if (preset && presetEndpoints[preset]) {
      loadFromPreset(preset)
    } else {
      updateApi({ preset: '' })
    }
  }

  const handleSave = () => {
    // 配置会自动保存到 Zustand persist
    console.log('配置已保存')
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">API 配置</h3>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">API 密钥</label>
        <input
          type="password"
          value={api.apiKey}
          onChange={(e) => updateApi({ apiKey: e.target.value })}
          placeholder="输入您的 API 密钥"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">预设端点</label>
        <select
          value={api.preset}
          onChange={(e) => handlePresetChange(e.target.value)}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="">-- 选择预设或自定义 --</option>
          {Object.keys(presetEndpoints).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">API 端点</label>
        <input
          type="text"
          value={api.endpoint}
          onChange={(e) => updateApi({ endpoint: e.target.value, preset: '' })}
          placeholder="或输入自定义端点 URL"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>

      <Button onClick={handleSave} className="w-full">
        保存配置
      </Button>
    </div>
  )
}
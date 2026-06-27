import { useConfigStore } from '@/stores/configStore'
import { useChatStore } from '@/stores/chatStore'
import { useThemeStore } from '@/stores/themeStore'

// 旧版 localStorage keys
const OLD_KEYS = {
  API_KEY: 'apilab_api_key',
  API_ENDPOINT: 'apilab_api_endpoint',
  API_PRESET: 'apilab_api_preset',
  MODEL: 'apilab_model',
  TEMPERATURE: 'apilab_temperature',
  MAX_TOKENS: 'apilab_max_tokens',
  SYSTEM_PROMPT: 'apilab_system_prompt',
  CHAT_HISTORY: 'apilab_chat_history',
  TOTAL_TOKENS: 'apilab_total_tokens',
  THEME: 'apilab_theme',
  WELCOME_SHOWN: 'apilab_welcome_shown',
}

export function migrateFromV1(): void {
  // 检查是否存在旧数据
  const hasOldData = Object.values(OLD_KEYS).some(
    (key) => localStorage.getItem(key) !== null
  )

  if (!hasOldData) {
    return
  }

  console.log('检测到旧版数据，开始迁移...')

  try {
    // 迁移配置数据
    const apiKey = localStorage.getItem(OLD_KEYS.API_KEY) || ''
    const endpoint = localStorage.getItem(OLD_KEYS.API_ENDPOINT) || ''
    const preset = localStorage.getItem(OLD_KEYS.API_PRESET) || ''
    const model = localStorage.getItem(OLD_KEYS.MODEL) || ''
    const temperature = parseFloat(localStorage.getItem(OLD_KEYS.TEMPERATURE) || '0.7')
    const maxTokens = parseInt(localStorage.getItem(OLD_KEYS.MAX_TOKENS) || '1024')
    const systemPrompt = localStorage.getItem(OLD_KEYS.SYSTEM_PROMPT) || ''

    // 更新 configStore
    const { updateApi, updateModel } = useConfigStore.getState()
    updateApi({
      apiKey,
      endpoint,
      preset,
      apiType: 'openai', // 默认值，后续会根据预设更新
    })
    updateModel({
      model,
      temperature,
      maxTokens,
      systemPrompt,
    })

    // 迁移聊天历史
    const chatHistory = localStorage.getItem(OLD_KEYS.CHAT_HISTORY)
    if (chatHistory) {
      try {
        const messages = JSON.parse(chatHistory)
        const { addMessage } = useChatStore.getState()
        
        // 转换旧格式消息
        messages.forEach((msg: any) => {
          addMessage({
            role: msg.role,
            content: msg.content,
          })
        })
      } catch (error) {
        console.error('迁移聊天历史失败:', error)
      }
    }

    // 迁移 token 计数
    const totalTokens = localStorage.getItem(OLD_KEYS.TOTAL_TOKENS)
    if (totalTokens) {
      const { incrementTokens } = useChatStore.getState()
      incrementTokens(parseInt(totalTokens) || 0)
    }

    // 迁移主题设置
    const theme = localStorage.getItem(OLD_KEYS.THEME)
    if (theme === 'dark') {
      const { setTheme } = useThemeStore.getState()
      setTheme('dark')
    }

    // 清除旧数据（可选，保留备份）
    // Object.values(OLD_KEYS).forEach(key => localStorage.removeItem(key))

    console.log('数据迁移完成')
  } catch (error) {
    console.error('数据迁移失败:', error)
  }
}

// 检查是否需要显示欢迎消息
export function shouldShowWelcome(): boolean {
  const welcomeShown = localStorage.getItem(OLD_KEYS.WELCOME_SHOWN)
  return !welcomeShown
}

// 标记欢迎消息已显示
export function markWelcomeShown(): void {
  localStorage.setItem(OLD_KEYS.WELCOME_SHOWN, 'true')
}
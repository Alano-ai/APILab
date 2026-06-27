# APILAB - 大模型API调试平台

> https://bytemagician6.github.io/APILab/

## 项目简介

APILAB是一个专为开发者设计的大模型API调试平台，提供简洁直观的界面来测试和调试各种大型语言模型的API接口。支持DeepSeek、OpenAI、Claude、Gemini、通义千问等主流API。

## 技术栈

- **前端框架**：React 19 + TypeScript 5
- **构建工具**：Vite 6
- **状态管理**：Zustand 5
- **UI组件库**：shadcn/ui + Radix UI
- **CSS方案**：Tailwind CSS 4
- **Markdown渲染**：react-markdown + rehype-highlight
- **图标库**：Lucide React

## 功能特性

### API配置
- 支持预设端点（DeepSeek/OpenAI/通义千问/Claude/Gemini）和自定义端点
- API密钥安全存储（本地存储）
- 端点URL自动填充
- API适配器模式，支持多种API协议格式

### 模型管理
- 预设模型自动加载
- 自定义模型名称输入
- 模型参数精细调节：
  - Temperature控制
  - Max Tokens限制
  - 系统提示词设置

### 对话交互
- 实时聊天界面
- 消息类型区分（用户/助手/系统）
- 可调整大小的输入框
- 停止生成功能
- Markdown渲染和代码高亮

### 数据管理
- 对话历史本地保存
- 一键清空对话
- 对话记录导出
- Token使用统计

### 主题与UI
- 暗色/亮色主题切换
- 响应式设计
- 现代化UI组件

### 调试功能
- API请求日志面板
- 请求/响应详情查看
- 错误日志记录

## 快速开始

### 环境要求
- Node.js 18+
- npm 或 pnpm

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

访问 http://localhost:5173/ 查看应用。

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 项目结构

```
apilab/
├── src/
│   ├── components/          # UI组件
│   │   ├── ui/              # shadcn/ui基础组件
│   │   ├── layout/          # 布局组件
│   │   ├── chat/            # 聊天相关组件
│   │   ├── config/          # 配置面板组件
│   │   └── log/             # 日志面板组件
│   ├── stores/              # Zustand状态管理
│   │   ├── configStore.ts   # API配置状态
│   │   ├── chatStore.ts     # 聊天状态
│   │   ├── logStore.ts      # 日志状态
│   │   └── themeStore.ts    # 主题状态
│   ├── services/            # API服务层
│   │   ├── apiClient.ts     # API客户端
│   │   └── adapters/        # API协议适配器
│   │       ├── openai.ts    # OpenAI兼容格式
│   │       ├── anthropic.ts # Anthropic/Claude格式
│   │       └── google.ts    # Google Gemini格式
│   ├── types/               # TypeScript类型定义
│   ├── lib/                 # 工具函数
│   └── index.css            # 全局样式
├── public/                  # 静态资源
├── index.html               # 入口HTML
├── package.json             # 项目配置
├── tsconfig.json            # TypeScript配置
├── vite.config.ts           # Vite配置
└── tailwind.config.ts       # Tailwind CSS配置
```

## 开发指南

### 添加新的API提供商

1. 在 `src/services/adapters/` 目录创建新的适配器文件
2. 实现 `ApiAdapter` 接口
3. 在 `src/services/adapters/index.ts` 中注册适配器
4. 在 `src/stores/configStore.ts` 中添加预设配置

### 自定义主题

编辑 `src/index.css` 中的CSS变量来修改主题颜色。

### 添加新的UI组件

使用 shadcn/ui CLI 添加新组件：
```bash
npx shadcn-ui@latest add [component-name]
```

## 常见问题

### Q: 如何清除所有本地数据？
A: 浏览器开发者工具 → Application → Local Storage → 清除相关项

### Q: 为什么我的自定义模型不工作？
A: 请确保：
1. 端点URL正确
2. 模型名称与API文档一致
3. API密钥有足够权限

### Q: 如何修改界面主题？
A: 点击右上角的主题切换按钮（🌙/☀️）

## 贡献指南

欢迎提交Pull Request或Issue，建议包括：
- 问题描述/功能建议
- 重现步骤（如适用）
- 预期与实际行为对比

## 许可证

MIT License

---

> 提示：本项目为纯前端实现，API密钥等敏感信息仅存储在浏览器本地，请妥善保管。
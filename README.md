# YChat - AI 聊天客户端

<p align="center">
  <img src="assets/icon.png" alt="YChat Logo" width="100" height="100">
</p>

<p align="center">
  <strong>一个现代化的跨平台 AI 聊天桌面应用</strong>
</p>

<p align="center">
  <a href="https://github.com/Yijx/ychat/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
  <a href="https://github.com/Yijx/ychat"><img src="https://img.shields.io/github/stars/Yijx/ychat?style=social" alt="GitHub Stars"></a>
  <a href="https://github.com/Yijx/ychat/issues"><img src="https://img.shields.io/github/issues/Yijx/ychat" alt="GitHub Issues"></a>
  <a href="https://github.com/Yijx/ychat/pulls"><img src="https://img.shields.io/github/issues-pr/Yijx/ychat" alt="GitHub Pull Requests"></a>
</p>

<p align="center">
  <a href="#特性">特性</a> •
  <a href="#快速开始">快速开始</a> •
  <a href="#截图">截图</a> •
  <a href="#安装">安装</a> •
  <a href="#使用">使用</a> •
  <a href="#开发">开发</a> •
  <a href="#构建">构建</a> •
  <a href="#技术栈">技术栈</a> •
  <a href="#贡献">贡献</a> •
  <a href="#许可证">许可证</a>
</p>

## 📋 项目状态

🚧 **开发中** - 核心功能已实现，正在持续改进中

✅ **已实现功能**:

- 多 AI 提供商支持 (OpenAI, 百度文心一言)
- 流式聊天响应
- 本地对话存储
- 多语言界面 (中文/英文)
- 基础设置配置

🔧 **计划中功能**:

- 更多 AI 提供商集成
- 对话导出/导入
- 主题切换
- 快捷键自定义
- 插件系统

## ✨ 特性

- **多 AI 提供商支持**：集成 OpenAI、百度文心一言等多种 AI 模型
- **流式响应**：实时显示 AI 回复，体验流畅
- **本地存储**：使用 IndexedDB 存储对话历史，保护隐私
- **多语言界面**：支持中文和英文界面切换
- **现代化 UI**：基于 Vue 3 + Tailwind CSS 的优雅界面
- **跨平台**：支持 macOS、Windows 和 Linux
- **可配置模型**：灵活配置各提供商的 API 密钥和参数
- **对话管理**：创建、删除、查看历史对话
- **图片上传**：支持在对话中上传图片（部分模型）
- **自定义字体大小**：可调整聊天界面字体大小

## 🚀 快速开始

### 1. 克隆并安装

```bash
git clone https://github.com/Yijx/ychat.git
cd ychat
npm install
```

### 2. 配置环境变量

创建 `.env` 文件（可选，仅用于发布）：

```bash
echo "GITHUB_TOKEN=your_token_here" > .env
```

### 3. 启动开发模式

```bash
npm start
```

### 4. 配置 AI 提供商

1. 启动应用后，进入设置页面
2. 选择 "Models" 标签页
3. 配置你的 AI 提供商 API 密钥
4. 保存设置并开始聊天！

## 🖼️ 截图

> 截图待添加

## 📦 安装

### 下载预构建版本

从 [Releases](https://github.com/Yijx/ychat/releases) 页面下载最新版本的安装包：

- **macOS**: `YChat-1.0.0.dmg`
- **Windows**: `YChat-1.0.0.exe` (待构建)
- **Linux**: `YChat-1.0.0.AppImage` (待构建)

### 从源码构建

```bash
# 克隆仓库
git clone https://github.com/Yijx/ychat.git
cd ychat

# 安装依赖
npm install

# 启动开发模式
npm start
```

## 🚀 使用

### 首次使用

1. 启动应用后，点击右下角的设置按钮（齿轮图标）
2. 在 "Models" 标签页中配置你使用的 AI 提供商：
   - **OpenAI**: 需要填写 API Key 和 Base URL（可选）
   - **百度文心一言**: 需要填写 Access Key 和 Secret Key
3. 保存配置后返回主界面
4. 从下拉菜单中选择模型和提供商
5. 开始聊天！

### 基本操作

- **新建对话**: 点击左侧的聊天按钮或使用快捷键 `Cmd/Ctrl + N`
- **切换模型**: 在主界面顶部下拉菜单中选择
- **发送消息**: 输入消息后按 Enter 或点击发送按钮
- **删除对话**: 在对话列表右键点击对话，选择删除
- **切换语言**: 在设置中切换中文/英文界面

## 🛠️ 开发

### 环境要求

- Node.js 18+
- npm 或 yarn

### 开发脚本

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start

# 代码检查
npm run lint

# 代码格式化
npm run format

# 打包应用
npm run package

# 制作安装包
npm run make

# 发布到 GitHub
npm run publish
```

### 项目结构

```
ychat/
├── src/
│   ├── main.ts              # Electron 主进程
│   ├── preload.ts           # 预加载脚本
│   ├── renderer.ts          # 渲染进程入口
│   ├── App.vue              # 主应用组件
│   ├── components/          # Vue 组件
│   ├── views/               # 页面视图
│   ├── stores/              # Pinia 状态管理
│   ├── providers/           # AI 提供商实现
│   ├── router/              # 路由配置
│   ├── locales/             # 国际化文件
│   ├── types/               # TypeScript 类型定义
│   └── utils/               # 工具函数
├── assets/                  # 静态资源
├── forge.config.ts          # Electron Forge 配置
└── vite.*.config.*          # Vite 构建配置
```

## 📦 构建

### 构建配置

项目使用 [Electron Forge](https://www.electronforge.io/) 进行打包和分发。

```bash
# 打包应用（不创建安装包）
npm run package

# 创建安装包（DMG、ZIP等）
npm run make

# 发布到 GitHub Releases
npm run publish
```

构建配置位于 `forge.config.ts`，支持以下平台：

- **macOS**: DMG 和 ZIP 格式
- **Windows**: Squirrel 安装包（待配置）
- **Linux**: RPM 和 DEB 包（待配置）

### 环境变量

创建 `.env` 文件以配置发布选项：

```env
GITHUB_TOKEN=your_github_token_here
```

## 🧩 技术栈

### 核心框架

- **[Electron](https://www.electronjs.org/)** - 跨平台桌面应用框架
- **[Vue 3](https://vuejs.org/)** - 渐进式 JavaScript 框架
- **[TypeScript](https://www.typescriptlang.org/)** - 类型安全的 JavaScript 超集

### 构建工具

- **[Vite](https://vitejs.dev/)** - 下一代前端构建工具
- **[Electron Forge](https://www.electronforge.io/)** - Electron 打包工具

### UI 与样式

- **[Tailwind CSS](https://tailwindcss.com/)** - 实用优先的 CSS 框架
- **[Radix Vue](https://www.radix-vue.com/)** - 无障碍 UI 组件库
- **[Iconify](https://iconify.design/)** - 图标库

### 状态与数据

- **[Pinia](https://pinia.vuejs.org/)** - Vue 状态管理
- **[Dexie.js](https://dexie.org/)** - IndexedDB 包装器
- **[Vue Router](https://router.vuejs.org/)** - Vue 路由

### AI 集成

- **[OpenAI SDK](https://github.com/openai/openai-node)** - OpenAI API 客户端
- **[@baiducloud/qianfan](https://www.npmjs.com/package/@baiducloud/qianfan)** - 百度文心一言 SDK

### 开发工具

- **[ESLint](https://eslint.org/)** - 代码检查
- **[Prettier](https://prettier.io/)** - 代码格式化
- **[Vue I18n](https://vue-i18n.intlify.dev/)** - 国际化

## 🔌 支持的 AI 提供商

| 提供商       | 支持模型               | 配置项                 |
| ------------ | ---------------------- | ---------------------- |
| OpenAI       | GPT-3.5, GPT-4         | API Key, Base URL      |
| 百度文心一言 | ERNIE-Bot, ERNIE-Speed | Access Key, Secret Key |
| DeepSeek     | DeepSeek Chat          | API Key, Base URL      |
| 阿里通义千问 | Qwen系列               | API Key, Base URL      |

> 注：部分提供商需要相应的 API 访问权限

## 📝 配置说明

### 配置文件位置

应用配置存储在用户数据目录下的 `config.json` 文件中：

- **macOS**: `~/Library/Application Support/ychat/config.json`
- **Windows**: `%APPDATA%/ychat/config.json`
- **Linux**: `~/.config/ychat/config.json`

### 配置示例

```json
{
  "language": "zh",
  "fontSize": 14,
  "providerConfigs": {
    "openai": {
      "apiKey": "sk-...",
      "baseUrl": "https://api.openai.com/v1"
    },
    "qianfan": {
      "accessKey": "...",
      "secretKey": "..."
    }
  }
}
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

### 开发规范

- 使用 TypeScript 并添加类型定义
- 遵循现有的代码风格（ESLint + Prettier）
- 添加必要的注释和文档
- 确保代码通过所有检查

## 📄 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Electron](https://www.electronjs.org/) - 让 Web 技术构建桌面应用成为可能
- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 快速的前端构建工具
- 所有依赖库的维护者们

## 📞 联系

- 作者：Yang Jiaxun
- 邮箱：<497770910@qq.com>
- GitHub：[@Yijx](https://github.com/Yijx)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/Yijx">Yijx</a>
</p>

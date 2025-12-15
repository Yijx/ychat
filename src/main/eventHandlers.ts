import type { CreateChatProps, AppConfig, Language } from '@/shared/types/base'
import { ipcMain, BrowserWindow, Menu, app, protocol, net } from 'electron'
import { createProvider } from '@/shared/providers/createProvider'
import { setupMenu } from './menu'
import url from 'url'
import fs from 'fs/promises'
import path from 'node:path'

// 配置文件路径
const CONFIG_FILE_NAME = 'config.json'
const getConfigPath = () => {
  const userDataPath = app.getPath('userData')
  return path.join(userDataPath, CONFIG_FILE_NAME)
}

// 读取配置文件
export const readConfig = async (): Promise<AppConfig> => {
  try {
    const configPath = getConfigPath()
    const data = await fs.readFile(configPath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // 如果文件不存在或读取失败，返回默认配置
    return {
      language: 'zh',
      fontSize: 14,
      providerConfigs: {},
    }
  }
}

// 保存配置文件
export const saveConfig = async (config: AppConfig): Promise<void> => {
  const configPath = getConfigPath()
  const data = JSON.stringify(config, null, 2)
  await fs.writeFile(configPath, data, 'utf-8')
}

// 更新菜单语言
export const updateMenuLanguage = (mainWindow: BrowserWindow | null, language: Language) => {
  if (mainWindow) {
    setupMenu(mainWindow, language)
  }
}

// 设置所有事件监听器
export const setupEventHandlers = (mainWindow: BrowserWindow) => {
  // TIPS: 由于直接返回本地文件路径存在安全风险，通过自定义协议（由file://改为safe-file://）读取文件内容并返回
  protocol.handle('safe-file', async (request) => {
    // request.url example:
    // safe-file:///Users/jiaxunyang/Library/Application%20Support/ychat/images/images.webp
    const filePath = decodeURIComponent(request.url.slice('safe-file://'.length))
    // const data = await fs.readFile(filePath)
    // return new Response(data, {
    //   status: 200,
    //   headers: {
    //     'Content-Type': lookup(filePath) as string
    //   }
    // })
    const newFilePath = url.pathToFileURL(filePath).toString()
    return net.fetch(newFilePath)
  })

  ipcMain.handle('copy-image-to-user-dir', async (event, sourcePath: string) => {
    const userDataPath = app.getPath('userData')
    const imagesDir = path.join(userDataPath, 'images')
    await fs.mkdir(imagesDir, { recursive: true })
    const fileName = path.basename(sourcePath)
    const destPath = path.join(imagesDir, fileName)
    await fs.copyFile(sourcePath, destPath)
    return destPath
  })

  // 配置相关的 IPC 处理器
  ipcMain.handle('get-config', async () => {
    return await readConfig()
  })

  ipcMain.handle('save-config', async (event, config: AppConfig) => {
    await saveConfig(config)
    return { success: true }
  })

  ipcMain.handle('update-config', async (event, partialConfig: Partial<AppConfig>) => {
    const currentConfig = await readConfig()
    const newConfig = { ...currentConfig, ...partialConfig }
    await saveConfig(newConfig)
    // 如果语言发生变化，更新菜单
    if (partialConfig.language && partialConfig.language !== currentConfig.language) {
      updateMenuLanguage(mainWindow, partialConfig.language)
    }
    return newConfig
  })

  ipcMain.on('start-chat', async (event, data: CreateChatProps) => {
    console.log('hey', data)
    const { providerName, messages, messageId, selectedModel } = data
    try {
      const config = await readConfig()
      const provider = createProvider(providerName, config.providerConfigs || {})
      const stream = await provider.chat(messages, selectedModel)
      for await (const chunk of stream) {
        console.log('the chunk', chunk)
        const content = {
          messageId,
          data: chunk,
        }
        mainWindow.webContents.send('update-message', content)
      }
    } catch (error) {
      console.error('Chat error:', error)
      const errorContent = {
        messageId,
        data: {
          is_end: true,
          result: error instanceof Error ? error.message : '与AI服务通信时发生错误',
          is_error: true,
        },
      }
      mainWindow.webContents.send('update-message', errorContent)
    }
  })

  // 上下文菜单 IPC
  ipcMain.on('open-context-menu', (event, id: number) => {
    const menu = Menu.buildFromTemplate([
      {
        label: '删除对话',
        click: () => {
          // 获取当前焦点窗口
          const focusedWindow = BrowserWindow.getFocusedWindow()
          if (focusedWindow && !focusedWindow.isDestroyed()) {
            focusedWindow.webContents.send('delete-conversation', id)
            console.log('删除对话:', id)
          } else {
            console.warn('无法发送删除事件：焦点窗口不存在或已销毁')
          }
        },
      },
    ])
    // 安全地弹出菜单：如果 win 已销毁，则使用焦点窗口
    const targetWindow = mainWindow.isDestroyed() ? BrowserWindow.getFocusedWindow() : mainWindow
    if (targetWindow && !targetWindow.isDestroyed()) {
      menu.popup({ window: targetWindow })
    } else {
      menu.popup() // 回退到默认行为
    }
  })
}

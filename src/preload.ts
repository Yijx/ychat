import type { CreateChatProps, OnUpdatedCallback, AppConfig } from '@/types/base'
import { ipcRenderer, contextBridge, webUtils } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  startChat: (data: CreateChatProps) => ipcRenderer.send('start-chat', data),
  onUpdateMessage: (callback: OnUpdatedCallback) =>
    ipcRenderer.on('update-message', (_event, value) => callback(value)),
  copyImageToUserDir: (sourcePath: string) =>
    ipcRenderer.invoke('copy-image-to-user-dir', sourcePath),
  getFilePath: (file: File) => webUtils.getPathForFile(file),

  // 配置相关 API
  getConfig: () => ipcRenderer.invoke('get-config'),
  saveConfig: (config: AppConfig) => ipcRenderer.invoke('save-config', config),
  updateConfig: (partialConfig: Partial<AppConfig>) =>
    ipcRenderer.invoke('update-config', partialConfig),

  // 菜单事件
  onMenuNewConversation: (callback: () => void) =>
    ipcRenderer.on('menu-new-conversation', () => callback()),
  onMenuOpenSettings: (callback: () => void) =>
    ipcRenderer.on('menu-open-settings', () => callback()),
  openContextMenu: (id: number) => ipcRenderer.send('open-context-menu', id),
  onDeleteConversation: (callback: (id: number) => void) =>
    ipcRenderer.on('delete-conversation', (_event, id) => callback(id)),
})

import type { CreateChatProps, OnUpdatedCallback } from '@/types'
import { ipcRenderer, contextBridge, webUtils } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  startChat: (data: CreateChatProps) => ipcRenderer.send('start-chat', data),
  onUpdateMessage: (callback: OnUpdatedCallback) =>
    ipcRenderer.on('update-message', (_event, value) => callback(value)),
  copyImageToUserDir: (sourcePath: string) =>
    ipcRenderer.invoke('copy-image-to-user-dir', sourcePath),
  getFilePath: (file: File) => webUtils.getPathForFile(file),
})

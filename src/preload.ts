import type { CreateChatProps, OnUpdatedCallback } from '@/types'
import { ipcRenderer, contextBridge } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  startChat: (data: CreateChatProps) => ipcRenderer.send('start-chat', data),
  onUpdateMessage: (callback: OnUpdatedCallback) =>
    ipcRenderer.on('update-message', (_event, value) => callback(value)),
})

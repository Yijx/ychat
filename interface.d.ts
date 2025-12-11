import { CreateChatProps, OnUpdatedCallback, AppConfig } from '@/types/base'

export interface IElectronAPI {
  startChat: (data: CreateChatProps) => void
  onUpdateMessage: (callback: OnUpdatedCallback) => any
  openContextMenu: (id: number) => void
  onDeleteConversation: (callback: (id: number) => void) => void
  copyImageToUserDir: (sourcePath: string) => Promise<string>
  getConfig: () => Promise<AppConfig>
  saveConfig: (config: AppConfig) => Promise<{ success: boolean }>
  updateConfig: (config: Partial<AppConfig>) => Promise<AppConfig>
  onMenuNewConversation: (callback: () => void) => void
  onMenuOpenSettings: (callback: () => void) => void
  getFilePath: (file: File) => string
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}

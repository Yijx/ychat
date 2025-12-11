import { Menu, BrowserWindow, app } from 'electron'
import type { Language } from '@/types/base'
import zhTranslations from './locales/zh.json'
import enTranslations from './locales/en.json'

const translations = {
  zh: zhTranslations,
  en: enTranslations,
}

export function setupMenu(mainWindow: BrowserWindow, language: Language = 'zh') {
  console.log('Setting up menu with language:', language)

  // 基础模板，使用标准角色
  const template: Electron.MenuItemConstructorOptions[] = [
    { role: 'appMenu' },
    { role: 'fileMenu' },
    { role: 'editMenu' },
    { role: 'viewMenu' },
    { role: 'windowMenu' },
    { role: 'help' },
  ]

  // 查找应用程序菜单（role 为 'appMenu'）
  const appMenuIndex = template.findIndex((item) => item.role === 'appMenu')
  if (appMenuIndex !== -1) {
    // 定义应用程序菜单的子菜单
    const appSubmenu: Electron.MenuItemConstructorOptions[] = [
      {
        label: translations[language].app.newChat,
        accelerator: 'CmdOrCtrl+N',
        click: () => {
          mainWindow.webContents.send('menu-new-conversation')
        },
      },
      { type: 'separator' },
      {
        label: translations[language].app.settings,
        accelerator: 'CmdOrCtrl+,',
        click: () => {
          mainWindow.webContents.send('menu-open-settings')
        },
      },
      { type: 'separator' },
      { role: 'about' },
      { type: 'separator' },
      { role: 'services', submenu: [] },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideOthers' },
      { type: 'separator' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' },
    ]
    template[appMenuIndex].submenu = appSubmenu
  } else {
    // 如果没有 appMenu（例如 Windows/Linux），则在文件菜单之前添加一个自定义菜单
    template.unshift({
      label: app.getName(),
      submenu: [
        {
          label: translations[language].app.newChat,
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            mainWindow.webContents.send('menu-new-conversation')
          },
        },
        { type: 'separator' },
        {
          label: translations[language].app.settings,
          accelerator: 'CmdOrCtrl+,',
          click: () => {
            mainWindow.webContents.send('menu-open-settings')
          },
        },
        { type: 'separator' },
        { role: 'about' },
        { type: 'separator' },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { type: 'separator' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    })
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  console.log('Menu set successfully')
}

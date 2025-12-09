import type { CreateChatProps } from '@/types'
import type { Resp, RespBase } from '@baiducloud/qianfan/dist/src/interface'
import { convertMessages } from './helpers'
import { app, BrowserWindow, ipcMain, protocol, net } from 'electron'
import { ChatCompletion } from '@baiducloud/qianfan'
import { OpenAI } from 'openai'
import url from 'url'
import fs from 'fs/promises'
import path from 'node:path'
import started from 'electron-squirrel-startup'
import 'dotenv/config'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit()
}

const createWindow = async () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))
  }

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

  ipcMain.on('start-chat', async (event, data: CreateChatProps) => {
    const { providerName, messages, messageId, selectedModel } = data
    const convertedMessages = await convertMessages(messages)

    if (providerName === 'qianfan') {
      const client = new ChatCompletion()
      const stream = await client.chat(
        {
          stream: true,
          messages: convertedMessages as any,
        },
        selectedModel,
      )
      for await (const chunk of stream as AsyncIterable<Resp>) {
        const { is_end, result } = chunk as RespBase
        const content = {
          messageId,
          data: {
            is_end,
            result,
          },
        }
        mainWindow.webContents.send('update-message', content)
      }
    } else if (providerName === 'dashscope') {
      const client = new OpenAI({
        apiKey: process.env['ALI_ACCESS_KEY'],
        baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
      })
      const stream = await client.chat.completions.create({
        messages: convertedMessages as any,
        model: selectedModel,
        stream: true,
      })
      for await (const chunk of stream) {
        const choice = chunk.choices[0]
        const content = {
          messageId,
          data: {
            is_end: choice.finish_reason === 'stop',
            result: choice.delta.content || '',
          },
        }
        mainWindow.webContents.send('update-message', content)
      }
    }
  })

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

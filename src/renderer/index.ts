import { createApp } from 'vue'
import { Icon } from '@iconify/vue'
import { createPinia } from 'pinia'
import { useConfigStore } from '@/renderer/stores/config'
import router from '@/renderer/router'
import i18n from '@/renderer/locales/i18n'
import App from './App.vue'
import './index.css'
import 'highlight.js/styles/github-dark.min.css'

const app = createApp(App)
const pinia = createPinia()
app.component('Icon', Icon).use(router).use(pinia).use(i18n)

// 在挂载前加载配置
const configStore = useConfigStore()
configStore
  .loadConfig()
  .then(() => {
    app.mount('#app')
  })
  .catch((error) => {
    console.error('Failed to load config:', error)
    app.mount('#app') // 即使失败也继续挂载
  })

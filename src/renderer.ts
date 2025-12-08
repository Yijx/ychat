import { createApp } from 'vue'
import { Icon } from '@iconify/vue'
import { createPinia } from 'pinia'
import router from '@/router'
import './index.css'
import App from './App.vue'

const app = createApp(App)
app.component('Icon', Icon).use(router).use(createPinia()).mount('#app')

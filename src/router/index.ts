import type { RouterOptions } from 'vue-router'
import { createRouter, createMemoryHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Conversation from '@/views/Conversation.vue'

const routes: RouterOptions['routes'] = [
  { path: '/', component: Home },
  { path: '/conversation/:id', component: Conversation },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export { routes }

export default router

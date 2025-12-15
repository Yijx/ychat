import type { RouterOptions } from 'vue-router'
import { createRouter, createMemoryHistory } from 'vue-router'
import { useConversationStore } from '@/renderer/stores/conversation'
import Home from '@/renderer/views/Home.vue'
import Conversation from '@/renderer/views/Conversation.vue'
import Settings from '@/renderer/views/Settings.vue'

const routes: RouterOptions['routes'] = [
  { path: '/', component: Home },
  { path: '/conversation/:id', component: Conversation },
  { path: '/settings', component: Settings },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

router.beforeEach((to) => {
  const store = useConversationStore()
  if (!to.path.startsWith('/conversation/')) {
    store.selectedId = -1
  }
})

export { routes }

export default router

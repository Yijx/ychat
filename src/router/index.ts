import type { RouterOptions } from 'vue-router'
import { createRouter, createMemoryHistory } from 'vue-router'
import { useConversationStore } from '@/stores/conversation'
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

router.beforeEach((to) => {
  const store = useConversationStore()
  if (!to.path.startsWith('/conversation/')) {
    store.selectedId = -1
  }
})

export { routes }

export default router

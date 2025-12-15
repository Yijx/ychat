<template>
  <div class="flex items-center justify-between flex-row h-screen">
    <div class="w-[300px] bg-gray-200 h-full border-r border-gray-300">
      <div class="h-[90%] overflow-y-auto">
        <ConversationList :items="items" />
      </div>
      <div class="h-[10%] grid grid-cols-2 gap-2 p-2">
        <RouterLink to="/">
          <Button icon-name="radix-icons:chat-bubble" class="w-full">
            {{ $t('app.newChat') }}
          </Button>
        </RouterLink>
        <RouterLink to="/settings">
          <Button icon-name="radix-icons:gear" plain class="w-full">
            {{ $t('app.settings') }}
          </Button>
        </RouterLink>
      </div>
    </div>
    <div class="h-full flex-1">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { initProviders } from '@/shared/db'
import { onMounted, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useConversationStore } from '@/renderer/stores/conversation'
import { useProviderStore } from '@/renderer/stores/provider'
import { useConfigStore } from '@/renderer/stores/config'
import ConversationList from '@/renderer/components/ConversationList.vue'
import Button from '@/renderer/components/Button.vue'

const conversationStore = useConversationStore()
const providerStore = useProviderStore()
const configStore = useConfigStore()
const router = useRouter()
const items = computed(() => conversationStore.items)

// 菜单事件处理函数
const handleNewConversation = () => {
  console.log('Menu: New conversation')
  router.push('/')
}

const handleOpenSettings = () => {
  console.log('Menu: Open settings')
  router.push('/settings')
}

onMounted(async () => {
  await configStore.loadConfig()
  await initProviders()
  conversationStore.fetchConversations()
  providerStore.fetchProviders()

  // 注册菜单事件监听
  if (window.electronAPI) {
    window.electronAPI.onMenuNewConversation(handleNewConversation)
    window.electronAPI.onMenuOpenSettings(handleOpenSettings)
  }
})

onUnmounted(() => {
  // 清理监听器（如果 electronAPI 支持移除监听）
  // 注意：当前预加载脚本未提供移除方法，但我们可以忽略，因为应用生命周期内不需要
})
</script>

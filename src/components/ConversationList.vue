<template>
  <div class="conversation-list">
    <div
      class="item border-gray-300 border-t cursor-pointer p-2"
      :class="{
        'bg-gray-100 hover:bg-gray-300': store.selectedId === item.id,
        'bg-white hover:bg-gray-200': store.selectedId !== item.id,
      }"
      v-for="item in items"
      :key="item.id"
      @contextmenu="openContextMenu($event, item)"
    >
      <a href="#" @click="jumpToConversation(item.id)">
        <div class="flex justify-between items-center text-sm leading-5 text-gray-500">
          <span>{{ item.selectedModel }}</span>
          <span>{{ dayjs(item.updatedAt).format('YYYY-MM-DD') }}</span>
        </div>
        <h2 class="font-semibold leading-6 text-gray-900 truncate">{{ item.title }}</h2>
      </a>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { ConversationProps } from '@/types/base'
import { useConversationStore } from '@/stores/conversation'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import dayjs from 'dayjs'

const { items = [] } = defineProps<{
  items: ConversationProps[]
}>()

const router = useRouter()
const store = useConversationStore()

const jumpToConversation = (id: number) => {
  router.push(`/conversation/${id}`)
  store.selectedId = id
}

const openContextMenu = (event: MouseEvent, item: ConversationProps) => {
  event.preventDefault()
  if (window.electronAPI && window.electronAPI.openContextMenu) {
    window.electronAPI.openContextMenu(item.id)
  }
}

// 监听删除对话事件
onMounted(() => {
  if (window.electronAPI && window.electronAPI.onDeleteConversation) {
    window.electronAPI.onDeleteConversation(async (id: number) => {
      await store.deleteConversation(id)
      if (!store?.items?.length) {
        router.push('/')
      }
    })
  }
})

// 注意：由于 onDeleteConversation 使用了 ipcRenderer.on，它会在组件卸载后仍然保持监听，
// 但这里我们假设整个应用生命周期内只需要注册一次。如果需要更精细的清理，可以存储返回的清理函数。
// 为简化，我们暂时不清理。
</script>

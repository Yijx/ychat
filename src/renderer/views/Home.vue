<template>
  <div class="w-[80%] mx-auto h-full">
    <div class="flex items-center h-[85%]">
      <ProviderSelect :items="providers" v-model="currentProvider" />
    </div>
    <div class="flex items-center h-[15%]">
      <MessageInput @create="createConversation" :disabled="currentProvider === ''" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { db } from '@/shared/db'
import { useRouter } from 'vue-router'
import { useConversationStore } from '@/renderer/stores/conversation'
import { useProviderStore } from '@/renderer/stores/provider'
import ProviderSelect from '@/renderer/components/ProviderSelect.vue'
import MessageInput from '@/renderer/components/MessageInput.vue'

const router = useRouter()
const conversationStore = useConversationStore()
const currentProvider = ref<string>('')
const providerStore = useProviderStore()
const providers = computed(() => providerStore.items)

const modelInfo = computed(() => {
  const [providerId, selectedModel] = currentProvider.value.split('/')
  return {
    providerId: parseInt(providerId),
    selectedModel,
  }
})

const createConversation = async (question: string, imagePath?: string) => {
  const { providerId, selectedModel } = modelInfo.value
  const currentDate = new Date().toISOString()
  let copiedImagePath: string | undefined
  if (imagePath) {
    try {
      copiedImagePath = await window.electronAPI.copyImageToUserDir(imagePath)
      console.log('copiedImagePath', copiedImagePath)
    } catch (error) {
      console.error('Failed to copy image:', error)
    }
  }
  // 创建新对话
  const newConversationId = await conversationStore.createConversation({
    title: question,
    providerId,
    selectedModel,
    createdAt: currentDate,
    updatedAt: currentDate,
  })
  // // 创建首条消息
  const newMessageId = await db.messages.add({
    content: question,
    conversationId: newConversationId,
    createdAt: currentDate,
    updatedAt: currentDate,
    type: 'question',
    ...(copiedImagePath && { imagePath: copiedImagePath }),
  })
  conversationStore.selectedId = newConversationId
  router.push(`/conversation/${newConversationId}?init=${newMessageId}`)
}
</script>

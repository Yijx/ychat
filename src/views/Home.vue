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
import type { ProviderProps } from '@/types'
import { ref, onMounted, computed } from 'vue'
import { db } from '@/db'
import { useRouter } from 'vue-router'
import { useConversationStore } from '@/stores/conversation'
import { useProviderStore } from '@/stores/provider'
import ProviderSelect from '@/components/ProviderSelect.vue'
import MessageInput from '@/components/MessageInput.vue'

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

const createConversation = async (question: string) => {
  const { providerId, selectedModel } = modelInfo.value
  const currentDate = new Date().toISOString()
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
  })
  conversationStore.selectedId = newConversationId
  router.push(`/conversation/${newConversationId}?init=${newMessageId}`)
}
</script>

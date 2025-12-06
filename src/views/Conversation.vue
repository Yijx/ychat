<template>
  <div
    class="h-[10%] bg-gray-200 border-b border-gray-300 flex items-center px-3 justify-between"
    v-if="conversation"
  >
    <h3 class="font-semibold text-gray-900">{{ conversation.title }}</h3>
    <span class="text-sm text-gray-500">{{ conversation.updatedAt }}</span>
  </div>
  <div class="w-[80%] mx-auto h-[75%] overflow-y-auto pt-2">
    <MessageList :messages="filterMessage" />
  </div>
  <div class="w-[80%] mx-auto h-[15%] flex items-center">
    <MessageInput />
  </div>
</template>
<script setup lang="ts">
import type { MessageProps, ConversationProps } from '@/types'
import { useRoute } from 'vue-router'
import { ref, watch, onMounted } from 'vue'
import { messages, conversations } from '@/testData'
import MessageInput from '@/components/MessageInput.vue'
import MessageList from '@/components/MessageList.vue'

const route = useRoute()
const conversationId = ref(Number(route.params.id))
const filterMessage = ref<MessageProps[]>([])
const conversation = ref<ConversationProps>()

watch(
  () => route.params.id,
  (newId: string) => {
    conversationId.value = parseInt(newId)
    filterMessage.value = messages.filter((msg) => msg.conversationId === conversationId.value)
    conversation.value = conversations.find((item) => item.id === conversationId.value)
  },
  {
    immediate: true,
  },
)
</script>

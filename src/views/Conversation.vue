<template>
  <div
    class="h-[10%] bg-gray-200 border-b border-gray-300 flex items-center px-3 justify-between"
    v-if="conversation"
  >
    <h3 class="font-semibold text-gray-900">{{ conversation.title }}</h3>
    <span class="text-sm text-gray-500">{{
      dayjs(conversation.updatedAt).format('YYYY-MM-DD')
    }}</span>
  </div>
  <div class="w-[80%] mx-auto h-[75%] overflow-y-auto pt-2">
    <MessageList :messages="filteredMessages" ref="messageListRef" />
  </div>
  <div class="w-[80%] mx-auto h-[15%] flex items-center">
    <MessageInput
      @create="sendNewMessage"
      v-model="inputValue"
      :disabled="messageStore.isMessageLoading"
    />
  </div>
</template>
<script setup lang="ts">
import type { MessageProps, MessageListInstance, MessageStatus } from '@/types/base'
import { useRoute } from 'vue-router'
import { ref, watch, onMounted, computed, nextTick } from 'vue'
import { useConversationStore } from '@/stores/conversation'
import { useMessageStore } from '@/stores/message'
import { useProviderStore } from '@/stores/provider'
import MessageInput from '@/components/MessageInput.vue'
import MessageList from '@/components/MessageList.vue'
import dayjs from 'dayjs'

const route = useRoute()
const conversationStore = useConversationStore()
const messageStore = useMessageStore()
const providerStore = useProviderStore()
const conversationId = ref(Number(route.params.id))
const inputValue = ref('')
const messageListRef = ref<MessageListInstance>()
const filteredMessages = computed(() => messageStore.items)
const conversation = computed(() => conversationStore.getConversationById(conversationId.value))
const lastQuestion = computed(() => messageStore.getLastQuestion(conversationId.value))
const initMessageId = parseInt(route.query.init as string)
let currentMessageListHeight = 0

const messageScrollToBottom = async () => {
  await nextTick()
  if (messageListRef.value) {
    messageListRef.value.ref.scrollIntoView({ block: 'end', behavior: 'smooth' })
  }
}

// 根据初始聊天（第一条消息）创建一个新的问答
const creatingInitialMessage = async () => {
  const createdData: Omit<MessageProps, 'id'> = {
    content: '',
    conversationId: conversationId.value,
    type: 'answer',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'loading',
  }
  const newMessageId = await messageStore.createMessage(createdData)
  await messageScrollToBottom()
  if (conversation.value) {
    const provider = providerStore.getProviderById(conversation.value.providerId)
    if (provider) {
      await window.electronAPI.startChat({
        messageId: newMessageId,
        providerName: provider.name,
        selectedModel: conversation.value.selectedModel,
        messages: sendedMessages.value,
      })
    }
  }
}

const sendedMessages = computed(() =>
  filteredMessages.value
    .filter((message) => message.status !== 'loading' && message.status !== 'error')
    .map((message) => {
      return {
        role: message.type === 'question' ? 'user' : 'assistant',
        content: message.content,
        ...(message.imagePath && { imagePath: message.imagePath }),
      }
    }),
)

const sendNewMessage = async (question: string, imagePath?: string) => {
  if (question) {
    let copiedImagePath: string | undefined
    if (imagePath) {
      try {
        copiedImagePath = await window.electronAPI.copyImageToUserDir(imagePath)
        console.log('copiedImagePath', copiedImagePath)
      } catch (error) {
        console.error('Failed to copy image:', error)
      }
    }
    const date = new Date().toISOString()
    await messageStore.createMessage({
      content: question,
      conversationId: conversationId.value,
      createdAt: date,
      updatedAt: date,
      type: 'question',
      ...(copiedImagePath && { imagePath: copiedImagePath }),
    })
    inputValue.value = ''
    creatingInitialMessage()
  }
}

watch(
  () => route.params.id,
  async (newId: string) => {
    conversationId.value = parseInt(newId)
    await messageStore.fetchMessagesByConversation(conversationId.value)
    await messageScrollToBottom()
  },
)

onMounted(async () => {
  await messageStore.fetchMessagesByConversation(conversationId.value)
  await messageScrollToBottom()

  if (initMessageId) {
    await creatingInitialMessage()
  }

  let streamContent = ''

  const checkAndScrollToBottom = async () => {
    if (messageListRef.value) {
      const newHeight = messageListRef.value.ref.clientHeight
      // console.log('the newHeight', newHeight)
      // console.log('the currentMessageListHeight', currentMessageListHeight)
      if (newHeight > currentMessageListHeight) {
        // console.log('scroll to bottom')
        currentMessageListHeight = newHeight
        await messageScrollToBottom()
      }
    }
  }

  window.electronAPI.onUpdateMessage(async (streamData) => {
    const { messageId, data } = streamData
    streamContent += data.result
    const getMessageStatus = (data: any): MessageStatus => {
      if (data.is_error) {
        return 'error'
      } else if (data.is_end) {
        return 'finished'
      } else {
        return 'streaming'
      }
    }
    const updatedData = {
      content: streamContent,
      status: getMessageStatus(data),
      updatedAt: new Date().toISOString(),
    }
    // update database
    // update filteredMessages
    await messageStore.updateMessage(messageId, updatedData)
    await nextTick()
    await checkAndScrollToBottom()
    if (data.is_end) {
      streamContent = ''
    }
  })
})
</script>

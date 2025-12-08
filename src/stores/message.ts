import type { MessageProps, MessageStatus, UpdatedStreamData } from '@/types'
import { defineStore } from 'pinia'
import { db } from '@/db'
import { ref, computed } from 'vue'

export interface MessageStore {
  items: MessageProps[]
}

export const useMessageStore = defineStore('message', () => {
  const items = ref<MessageProps[]>([])
  const isMessageLoading = computed(() =>
    items.value.some((item) => item.status === 'loading' || item.status === 'streaming'),
  )

  const fetchMessagesByConversation = async (conversationId: number) => {
    const newItems = await db.messages.where({ conversationId }).toArray()
    items.value = newItems
  }
  const createMessage = async (createdData: Omit<MessageProps, 'id'>) => {
    const newMessageId = await db.messages.add(createdData)
    items.value.push({ id: newMessageId, ...createdData })
    return newMessageId
  }

  const updateMessage = async (streamData: UpdatedStreamData) => {
    const { messageId, data } = streamData
    const currentMessage = items.value.find((item) => item.id === messageId)
    if (currentMessage) {
      const updatedData = {
        status: data.is_end ? 'finished' : ('streaming' as MessageStatus),
        updatedAt: new Date().toISOString(),
        ...(!data.is_end && { content: currentMessage.content + data.result }),
      }
      await db.messages.update(messageId, updatedData)
      const index = items.value.findIndex((item) => item.id === messageId)
      if (index !== -1) {
        items.value[index] = { ...items.value[index], ...updatedData }
      }
    }
  }

  const getLastQuestion = (conversationId: number) =>
    items.value.findLast(
      (item) => item.conversationId === conversationId && item.type === 'question',
    )

  return {
    items,
    isMessageLoading,
    fetchMessagesByConversation,
    createMessage,
    updateMessage,
    getLastQuestion,
  }
})

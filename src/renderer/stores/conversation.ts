import type { ConversationProps } from '@/shared/types/base'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { db } from '@/shared/db'

export interface ConversationStore {
  items: ConversationProps[]
  selectedId: number
}

export const useConversationStore = defineStore('conversation', () => {
  const items = ref<ConversationProps[]>([])
  const selectedId = ref<number>(-1)
  const totalNumber = computed(() => items.value.length)

  const getConversationById = (id: number) => items.value.find((item) => item.id === id)

  const fetchConversations = async () => {
    const newItems = await db.conversations.toArray()
    items.value = newItems
  }

  const createConversation = async (createdData: Omit<ConversationProps, 'id'>) => {
    const newCId = await db.conversations.add(createdData)
    items.value.push({
      id: newCId,
      ...createdData,
    })
    return newCId
  }

  const deleteConversation = async (id: number) => {
    // 删除 conversation
    await db.conversations.delete(id)
    // 删除关联的 messages
    await db.messages.where({ conversationId: id }).delete()
    // 从 store 中移除
    const index = items.value.findIndex((item) => item.id === id)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
    // 如果删除的是当前选中的 conversation，重置 selectedId
    if (selectedId.value === id) {
      selectedId.value = -1
    }
  }

  return {
    items,
    selectedId,
    totalNumber,
    getConversationById,
    fetchConversations,
    createConversation,
    deleteConversation,
  }
})

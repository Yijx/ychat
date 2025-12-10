import type { ConversationProps } from '@/types/base'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { db } from '@/db'

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

  return {
    items,
    selectedId,
    totalNumber,
    getConversationById,
    fetchConversations,
    createConversation,
  }
})

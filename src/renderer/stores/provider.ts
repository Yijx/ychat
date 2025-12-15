import type { ProviderProps } from '@/shared/types/base'
import { defineStore } from 'pinia'
import { db } from '@/shared/db'
import { ref } from 'vue'

export interface ProviderStore {
  items: ProviderProps[]
}

export const useProviderStore = defineStore('provider', () => {
  const items = ref<ProviderProps[]>([])
  const fetchProviders = async () => {
    const newItems = await db.providers.toArray()
    items.value = newItems
  }

  const getProviderById = (id: number) => items.value.find((item) => item.id === id)

  return { items, fetchProviders, getProviderById }
})

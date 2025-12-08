import { Dexie, type EntityTable } from 'dexie'
import type { ProviderProps, ConversationProps, MessageProps } from '@/types'
import { providers } from '@/testData'

const db = new Dexie('yChatDatabase') as Dexie & {
  providers: EntityTable<ProviderProps, 'id'>
  conversations: EntityTable<ConversationProps, 'id'>
  messages: EntityTable<MessageProps, 'id'>
}

db.version(1).stores({
  providers: '++id, name',
  conversations: '++id, providerId',
  messages: '++id, conversationId',
})

const initProviders = async () => {
  const count = await db.providers.count()
  if (count === 0) {
    return db.providers.bulkAdd(providers)
  }
}

export { db, initProviders }

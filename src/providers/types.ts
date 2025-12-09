import type { ChatMessageProps, UniversalChunkProps } from '@/types'

export type LLMProvider = {
  chat(messages: ChatMessageProps[], modelName: string): Promise<AsyncIterable<UniversalChunkProps>>
}

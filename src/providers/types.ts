import type { ChatMessageProps, UniversalChunkProps } from '@/types/base'

export type LLMProvider = {
  chat(messages: ChatMessageProps[], modelName: string): Promise<AsyncIterable<UniversalChunkProps>>
}

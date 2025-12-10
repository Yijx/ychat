import type { ChatMessageProps, UniversalChunkProps } from '@/types'
import type { LLMProvider } from '@/providers/types'
import { convertMessages } from '@/utils/helpers'
import OpenAI from 'openai'

const createOpenAIProvider = (apiKey: string, baseURL: string): LLMProvider => {
  const client = new OpenAI({ apiKey, baseURL })

  const transformResponse = (
    chunk: OpenAI.Chat.Completions.ChatCompletionChunk,
  ): UniversalChunkProps => {
    const choice = chunk.choices[0]
    return {
      is_end: choice.finish_reason === 'stop',
      result: choice.delta.content || '',
    }
  }

  return {
    chat: async (messages: ChatMessageProps[], model: string) => {
      const convertedMessages = await convertMessages(messages)

      const stream = await client.chat.completions.create({
        model,
        messages: convertedMessages as any,
        stream: true,
      })
      return {
        async *[Symbol.asyncIterator]() {
          for await (const chunk of stream) {
            yield transformResponse(chunk)
          }
        },
      }
    },
  }
}

export { createOpenAIProvider }

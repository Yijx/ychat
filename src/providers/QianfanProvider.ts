import type { ChatMessageProps, UniversalChunkProps, BaiduChunkProps } from '@/types/base'
import type { LLMProvider } from '@/providers/types'
import { ChatCompletion } from '@baiducloud/qianfan'

const createQianfanProvider = (accessKey: string, secretKey: string): LLMProvider => {
  const client: any = new ChatCompletion({
    QIANFAN_ACCESS_KEY: accessKey,
    QIANFAN_SECRET_KEY: secretKey,
    ENABLE_OAUTH: true,
  })

  const transformResponse = (chunk: BaiduChunkProps): UniversalChunkProps => {
    return {
      is_end: chunk.is_end,
      result: chunk.result,
    }
  }

  return {
    chat: async (messages: ChatMessageProps[], model: string) => {
      const stream = await client.chat(
        {
          messages,
          stream: true,
        },
        model,
      )
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

export { createQianfanProvider }

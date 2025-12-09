import type { LLMProvider } from '@/providers/types'
import { createQianfanProvider } from '@/providers/QianfanProvider'
import { createOpenAIProvider } from '@/providers/OpenAIProvider'

export function createProvider(providerName: string): LLMProvider {
  switch (providerName) {
    case 'qianfan':
      return createQianfanProvider(
        process.env['QIANFAN_ACCESS_KEY'] as string,
        process.env['QIANFAN_SECRET_KEY'] as string,
      )
    case 'dashscope':
      return createOpenAIProvider(
        process.env['ALI_ACCESS_KEY'] as string,
        'https://dashscope.aliyuncs.com/compatible-mode/v1',
      )
    case 'deepseek':
      return createOpenAIProvider(
        process.env['DEEP_SEEK_ACCESS_KEY'] as string,
        'https://api.deepseek.com/v1',
      )
    default:
      throw new Error(`Unsupported provider: ${providerName}`)
  }
}

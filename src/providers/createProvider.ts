import type { LLMProvider } from '@/providers/types'
import type { AppConfig } from '@/types/base'
import { createQianfanProvider } from '@/providers/QianfanProvider'
import { createOpenAIProvider } from '@/providers/OpenAIProvider'

const createProvider = (
  providerName: string,
  providerConfigs: AppConfig['providerConfigs'],
): LLMProvider => {
  const providerConfig = providerConfigs?.[providerName] || {}
  switch (providerName) {
    case 'qianfan':
      if (!providerConfig.accessKey || !providerConfig.secretKey) {
        throw new Error('缺少千帆API配置：请在设置中配置 accessKey 和 secretKey')
      }
      return createQianfanProvider(providerConfig.accessKey, providerConfig.secretKey)
    case 'dashscope':
      if (!providerConfig.apiKey || !providerConfig.baseUrl) {
        throw new Error('缺少通义千问API配置：请在设置中配置 apiKey 和 baseUrl')
      }
      return createOpenAIProvider(providerConfig.apiKey, providerConfig.baseUrl)
    case 'deepseek':
      if (!providerConfig.apiKey || !providerConfig.baseUrl) {
        throw new Error('缺少DeepSeek API配置：请在设置中配置 apiKey 和 baseUrl')
      }
      return createOpenAIProvider(providerConfig.apiKey, providerConfig.baseUrl)
    default:
      throw new Error(`Unsupported provider: ${providerName}`)
  }
}

export { createProvider }

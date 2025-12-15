import type { AppConfig } from '@/shared/types/base'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { updateAppLanguage } from '@/renderer/locales/i18n'

export const useConfigStore = defineStore('config', () => {
  const config = ref<AppConfig>({
    language: 'zh',
    fontSize: 14,
    providerConfigs: {},
  })

  // 从主进程加载配置
  const loadConfig = async () => {
    try {
      const loadedConfig = await window.electronAPI.getConfig()
      config.value = loadedConfig
      // 加载配置后更新 i18n 语言
      updateAppLanguage(loadedConfig.language)
    } catch (error) {
      console.error('Failed to load config:', error)
    }
  }

  // 保存配置到主进程
  const saveConfig = async () => {
    try {
      // 转换为普通对象以避免 IPC 克隆错误
      const plainConfig = JSON.parse(JSON.stringify(config.value))
      await window.electronAPI.saveConfig(plainConfig)
    } catch (error) {
      console.error('Failed to save config:', error)
    }
  }

  // 更新部分配置
  const updateConfig = async (partialConfig: Partial<AppConfig>) => {
    try {
      // 转换为普通对象以避免 IPC 克隆错误
      const plainConfig = JSON.parse(JSON.stringify(partialConfig))
      const updatedConfig = await window.electronAPI.updateConfig(plainConfig)
      config.value = updatedConfig

      // 如果更新了语言，同步更新 i18n
      if (partialConfig.language) {
        updateAppLanguage(partialConfig.language)
      }
    } catch (error) {
      console.error('Failed to update config:', error)
    }
  }

  // 更新语言
  const updateLanguage = async (language: 'zh' | 'en') => {
    await updateConfig({ language })
  }

  // 更新字体大小
  const updateFontSize = async (fontSize: number) => {
    await updateConfig({ fontSize })
  }

  // 更新提供商配置
  const updateProviderConfig = async (
    providerName: string,
    providerConfig: Record<string, string>,
  ) => {
    const newProviderConfigs = {
      ...config.value.providerConfigs,
      [providerName]: providerConfig,
    }
    await updateConfig({ providerConfigs: newProviderConfigs })
  }

  // 计算属性
  const language = computed(() => config.value.language)
  const fontSize = computed(() => config.value.fontSize)
  const providerConfigs = computed(() => config.value.providerConfigs)

  return {
    config,
    language,
    fontSize,
    providerConfigs,
    loadConfig,
    saveConfig,
    updateConfig,
    updateLanguage,
    updateFontSize,
    updateProviderConfig,
  }
})

import { createI18n } from 'vue-i18n'
import type { Language } from '@/shared/types/base'
import zh from './zh.json'
import en from './en.json'
// 定义消息类型
type MessageSchema = typeof zh

// 创建 i18n 实例
const i18n = createI18n<[MessageSchema], Language>({
  legacy: true,
  locale: 'zh', // 默认语言
  fallbackLocale: 'en', // 回退语言
  globalInjection: true, // 全局注入 $t 方法
  messages: {
    zh,
    en,
  },
})

// 导出 i18n 实例
export default i18n

// 重新导出 useI18n，避免命名冲突
export { useI18n } from 'vue-i18n'

// 更新应用语言
export const updateAppLanguage = (language: Language) => {
  // console.log('Updating i18n locale to:', getCurrentLanguage())
  // console.log(typeof i18n.global.locale, i18n.mode)
  // 确保使用 .value 赋值以触发响应式更新
  i18n.global.locale = language
  // 额外记录当前 locale 用于调试
  // console.log('Current i18n locale:', i18n.global.locale)
}

// 获取当前语言
export const getCurrentLanguage = (): Language => {
  return i18n.global.locale as Language
}

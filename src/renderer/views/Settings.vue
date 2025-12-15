<template>
  <div class="settings-page p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
      {{ $t('settings.title') }}
    </h1>

    <TabsRoot v-model="activeTab" class="space-y-6">
      <TabsList class="flex space-x-2 border-b border-gray-200 dark:border-gray-700">
        <TabsTrigger
          value="general"
          class="px-4 py-2 text-sm font-medium rounded-t-lg transition-colors data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-400 data-[state=inactive]:text-gray-500 dark:data-[state=inactive]:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        >
          {{ $t('settings.tabs.general') }}
        </TabsTrigger>
        <TabsTrigger
          value="models"
          class="px-4 py-2 text-sm font-medium rounded-t-lg transition-colors data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-400 data-[state=inactive]:text-gray-500 dark:data-[state=inactive]:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        >
          {{ $t('settings.tabs.models') }}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="general" class="space-y-8">
        <!-- 语言设置 -->
        <div class="setting-section bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            {{ $t('settings.language.title') }}
          </h2>

          <RadioGroupRoot v-model="selectedLanguage" class="flex flex-col space-y-3">
            <div class="flex items-center space-x-3">
              <RadioGroupItem
                value="zh"
                id="language-zh"
                class="peer h-4 w-4 rounded-full border border-gray-300 dark:border-gray-600 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              >
                <RadioGroupIndicator
                  class="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-white"
                />
              </RadioGroupItem>
              <label
                for="language-zh"
                class="text-sm font-medium leading-none text-gray-700 dark:text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                中文
              </label>
            </div>

            <div class="flex items-center space-x-3">
              <RadioGroupItem
                value="en"
                id="language-en"
                class="peer h-4 w-4 rounded-full border border-gray-300 dark:border-gray-600 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              >
                <RadioGroupIndicator
                  class="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-white"
                />
              </RadioGroupItem>
              <label
                for="language-en"
                class="text-sm font-medium leading-none text-gray-700 dark:text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                English
              </label>
            </div>
          </RadioGroupRoot>

          <p class="text-sm text-gray-500 dark:text-gray-400 mt-4">
            {{ $t('settings.language.description') }}
          </p>
        </div>

        <!-- 字体大小设置 -->
        <div class="setting-section bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            {{ $t('settings.fontSize.title') }}
          </h2>

          <div class="flex items-center space-x-4">
            <NumberFieldRoot
              v-model="selectedFontSize"
              :min="10"
              :max="24"
              class="flex items-center space-x-2"
            >
              <button
                type="button"
                @click="decrementFontSize"
                class="inline-flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :disabled="selectedFontSize <= 10"
              >
                <span class="sr-only">{{ $t('settings.fontSize.decrease') }}</span>
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 12H4"
                  />
                </svg>
              </button>

              <div class="relative">
                <NumberFieldInput
                  class="flex h-10 w-20 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-center"
                />
                <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 dark:text-gray-400 text-sm">px</span>
                </div>
              </div>

              <button
                type="button"
                @click="incrementFontSize"
                class="inline-flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :disabled="selectedFontSize >= 24"
              >
                <span class="sr-only">{{ $t('settings.fontSize.increase') }}</span>
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </NumberFieldRoot>
          </div>

          <div class="mt-6">
            <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {{ $t('settings.fontSize.preview') }}
            </div>
            <div
              class="p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700"
              :style="{ fontSize: selectedFontSize + 'px' }"
            >
              {{ $t('settings.fontSize.previewText') }}
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            @click="resetToDefaults"
            class="inline-flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            {{ $t('settings.buttons.reset') }}
          </button>
          <button
            @click="saveSettings"
            class="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            {{ $t('settings.buttons.save') }}
          </button>
        </div>
      </TabsContent>

      <TabsContent value="models" class="space-y-6">
        <div class="setting-section bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            {{ $t('settings.models.title') }}
          </h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
            {{ $t('settings.models.description') }}
          </p>

          <AccordionRoot type="single" collapsible class="space-y-4">
            <AccordionItem
              v-for="provider in providers"
              :key="provider.id"
              :value="provider.name"
              class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <AccordionHeader class="flex">
                <AccordionTrigger
                  class="flex flex-1 items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div class="flex items-center space-x-4">
                    <img
                      :src="provider.avatar"
                      :alt="provider.title"
                      class="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 class="font-semibold text-gray-900 dark:text-gray-100">
                        {{ provider.title }}
                      </h3>
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        {{ provider.desc }}
                      </p>
                    </div>
                  </div>
                  <svg
                    class="h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent
                class="p-4 pt-0 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
              >
                <div class="space-y-4">
                  <div
                    v-for="configItem in getProviderConfigItems(provider.name)"
                    :key="configItem.key"
                  >
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {{ configItem.label }}
                    </label>
                    <input
                      :type="
                        configItem.type === 'password'
                          ? 'password'
                          : configItem.type === 'number'
                            ? 'number'
                            : 'text'
                      "
                      :value="getProviderConfig(provider.name)?.[configItem.key] || ''"
                      @input="
                        updateProviderConfig(
                          provider.name,
                          configItem.key,
                          ($event.target as HTMLInputElement).value,
                        )
                      "
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      :placeholder="configItem.placeholder || ''"
                      :required="configItem.required"
                    />
                  </div>
                  <div class="flex justify-end space-x-3 pt-2">
                    <button
                      @click="resetProviderConfig(provider.name)"
                      class="inline-flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                      {{ $t('settings.models.reset') }}
                    </button>
                    <button
                      @click="saveProviderConfig(provider.name)"
                      class="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                      {{ $t('settings.models.save') }}
                    </button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </AccordionRoot>
        </div>
      </TabsContent>
    </TabsRoot>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useConfigStore } from '@/renderer/stores/config'
import { useProviderStore } from '@/renderer/stores/provider'
import { DEFAULT_CONFIG } from '@/shared/types/base'
import { providerConfigs } from '@/shared/providers/providerConfig'
import {
  RadioGroupRoot,
  RadioGroupItem,
  RadioGroupIndicator,
  NumberFieldRoot,
  NumberFieldInput,
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  AccordionRoot,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from 'radix-vue'

const configStore = useConfigStore()
const providerStore = useProviderStore()

const selectedLanguage = ref<'zh' | 'en'>('zh')
const selectedFontSize = ref(14)
const activeTab = ref('general')

const providers = computed(() => providerStore.items)

// 加载配置
onMounted(async () => {
  await configStore.loadConfig()
  selectedLanguage.value = configStore.language
  selectedFontSize.value = configStore.fontSize
  await providerStore.fetchProviders()
})

// 保存设置
const saveSettings = async () => {
  await configStore.updateConfig({
    language: selectedLanguage.value,
    fontSize: selectedFontSize.value,
  })
}

// 恢复默认设置
const resetToDefaults = () => {
  selectedLanguage.value = DEFAULT_CONFIG.language
  selectedFontSize.value = DEFAULT_CONFIG.fontSize
}

// 字体大小增减函数
const incrementFontSize = () => {
  if (selectedFontSize.value < 24) {
    selectedFontSize.value++
  }
}

const decrementFontSize = () => {
  if (selectedFontSize.value > 10) {
    selectedFontSize.value--
  }
}

// 模型配置相关
const getProviderConfig = (providerName: string) => {
  return configStore.config.providerConfigs[providerName]
}

const getProviderConfigItems = (providerName: string) => {
  return providerConfigs[providerName] || []
}

const updateProviderConfig = (providerName: string, key: string, value: string) => {
  // 本地更新 config ref
  const current = configStore.config.providerConfigs[providerName] || {}
  const updated = { ...current, [key]: value }
  configStore.config.providerConfigs = {
    ...configStore.config.providerConfigs,
    [providerName]: updated,
  }
}

const saveProviderConfig = async (providerName: string) => {
  const config = configStore.config.providerConfigs[providerName]
  if (config) {
    await configStore.updateProviderConfig(providerName, config)
  }
}

const resetProviderConfig = (providerName: string) => {
  configStore.config.providerConfigs = {
    ...configStore.config.providerConfigs,
    [providerName]: {},
  }
}
</script>

<style scoped>
.setting-section {
  transition: all 0.2s ease;
}

.setting-section:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* RadioGroup 自定义样式 */
:deep(.peer[data-state='checked']) {
  background-color: rgb(37, 99, 235);
  border-color: rgb(37, 99, 235);
}

/* NumberField 输入框样式 */
:deep(input[type='number']::-webkit-inner-spin-button),
:deep(input[type='number']::-webkit-outer-spin-button) {
  -webkit-appearance: none;
  margin: 0;
}

:deep(input[type='number']) {
  -moz-appearance: textfield;
}
</style>

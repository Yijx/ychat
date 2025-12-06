<template>
  <div class="w-[80%] mx-auto h-full">
    <div class="flex items-center h-[85%]">
      <ProviderSelect :items="providers" v-model="currentProvider" />
    </div>
    <div class="flex items-center h-[15%]">
      <MessageInput :disabled="currentProvider === ''" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ProviderProps } from '@/types'
import { ref } from 'vue'
import { providers as mockProviders } from '@/testData'
import ProviderSelect from '@/components/ProviderSelect.vue'
import MessageInput from '@/components/MessageInput.vue'

const currentProvider = ref<string>('')
const providers = ref<ProviderProps[]>(mockProviders)
</script>

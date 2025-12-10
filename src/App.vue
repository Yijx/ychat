<template>
  <div class="flex items-center justify-between flex-row h-screen">
    <div class="w-[300px] bg-gray-200 h-full border-r border-gray-300">
      <div class="h-[90%] overflow-y-auto">
        <ConversationList :items="items" />
      </div>
      <div class="h-[10%] grid grid-cols-2 gap-2 p-2">
        <RouterLink to="/">
          <Button icon-name="radix-icons:chat-bubble" class="w-full">
            {{ $t('app.newChat') }}
          </Button>
        </RouterLink>
        <RouterLink to="/settings">
          <Button icon-name="radix-icons:gear" plain class="w-full">
            {{ $t('app.settings') }}
          </Button>
        </RouterLink>
      </div>
    </div>
    <div class="h-full flex-1">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { initProviders } from '@/db'
import { onMounted, computed } from 'vue'
import { useConversationStore } from '@/stores/conversation'
import { useProviderStore } from '@/stores/provider'
import { useConfigStore } from '@/stores/config'
import ConversationList from '@/components/ConversationList.vue'
import Button from '@/components/Button.vue'

const conversationStore = useConversationStore()
const providerStore = useProviderStore()
const configStore = useConfigStore()
const items = computed(() => conversationStore.items)

onMounted(async () => {
  await configStore.loadConfig()
  await initProviders()
  conversationStore.fetchConversations()
  providerStore.fetchProviders()
})
</script>

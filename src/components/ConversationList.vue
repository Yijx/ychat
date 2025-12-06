<template>
  <div class="conversation-list">
    <div
      class="item border-gray-300 bg-white hover:bg-gray-200 border-t cursor-pointer p-2"
      v-for="item in items"
      :key="item.id"
    >
      <a href="#" @click="jumpToConversation(item.id)">
        <div class="flex justify-between items-center text-sm leading-5 text-gray-500">
          <span>{{ item.selectedModel }}</span>
          <span>{{ dayjs(item.updatedAt).format('YYYY-MM-DD') }}</span>
        </div>
        <h2 class="font-semibold leading-6 text-gray-900 truncate">{{ item.title }}</h2>
      </a>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { ConversationProps } from '@/types'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

const { items = [] } = defineProps<{
  items: ConversationProps[]
}>()

const router = useRouter()

const jumpToConversation = (id: number) => {
  router.push(`/conversation/${id}`)
}
</script>

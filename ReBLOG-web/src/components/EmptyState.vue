<script setup lang="ts">
import { Inbox } from 'lucide-vue-next'

defineProps<{
  description?: string
}>()
</script>

<template>
  <div class="flex items-center justify-center py-20">
    <div class="flex flex-col items-center gap-3 text-apple-gray-300">
      <Inbox :size="36" />
      <span class="text-sm">{{ description || '这里什么也没有' }}</span>
    </div>
  </div>
</template>

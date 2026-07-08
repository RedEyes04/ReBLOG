<script setup lang="ts">
import { Inbox } from 'lucide-vue-next'
defineProps<{ description?: string }>()
</script>

<template>
  <div class="flex items-center justify-center py-24">
    <div class="flex flex-col items-center gap-4 text-apple-gray-250">
      <div class="w-16 h-16 rounded-2xl glass-card flex items-center justify-center">
        <Inbox :size="24" class="text-apple-gray-300" />
      </div>
      <span class="text-sm text-apple-gray-300">{{ description || '这里什么也没有' }}</span>
    </div>
  </div>
</template>

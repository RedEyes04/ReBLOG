<script setup lang="ts">
import type { LabelData } from '@/types'
defineProps<{ labels: LabelData[]; selected?: string }>()
const emit = defineEmits<{ select: [label: string | undefined] }>()
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      class="px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300"
      :class="!selected
        ? 'bg-apple-gray-700 text-white shadow-lg shadow-black/10'
        : 'glass-card text-apple-gray-400 hover:text-apple-gray-700'"
      @click="emit('select', undefined)">全部</button>
    <button
      v-for="l in labels" :key="l.id"
      class="px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300"
      :class="selected === l.label_name
        ? 'bg-apple-gray-700 text-white shadow-lg shadow-black/10'
        : 'glass-card text-apple-gray-400 hover:text-apple-gray-700'"
      @click="emit('select', String(l.label_name))">{{ l.label_name }}</button>
  </div>
</template>

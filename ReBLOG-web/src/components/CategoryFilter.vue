<script setup lang="ts">
import type { SubsetData } from '@/types'
defineProps<{ subsets: SubsetData[]; selected?: number }>()
const emit = defineEmits<{ select: [id: number | undefined] }>()
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      class="px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300"
      :class="selected === undefined || selected === -1
        ? 'bg-apple-gray-700 text-white shadow-lg shadow-black/10'
        : 'glass-card text-apple-gray-400 hover:text-apple-gray-700'"
      @click="emit('select', undefined)">全部</button>
    <button
      v-for="s in subsets" :key="s.id"
      class="px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300"
      :class="selected === s.id
        ? 'bg-apple-gray-700 text-white shadow-lg shadow-black/10'
        : 'glass-card text-apple-gray-400 hover:text-apple-gray-700'"
      @click="emit('select', Number(s.id))">
      {{ s.name }}<span class="ml-1 opacity-40">{{ s.value }}</span>
    </button>
  </div>
</template>

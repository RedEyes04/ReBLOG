<script setup lang="ts">
import type { SubsetData } from '@/types'

defineProps<{
  subsets: SubsetData[]
  selected?: number
}>()

const emit = defineEmits<{
  select: [id: number | undefined]
}>()
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      class="px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
      :class="
        selected === undefined || selected === -1
          ? 'bg-apple-gray-700 text-white'
          : 'bg-apple-gray-50 text-apple-gray-400 hover:text-apple-gray-700 hover:bg-apple-gray-100'
      "
      @click="emit('select', undefined)"
    >
      全部
    </button>
    <button
      v-for="s in subsets"
      :key="s.id"
      class="px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
      :class="
        selected === s.id
          ? 'bg-apple-gray-700 text-white'
          : 'bg-apple-gray-50 text-apple-gray-400 hover:text-apple-gray-700 hover:bg-apple-gray-100'
      "
      @click="emit('select', Number(s.id))"
    >
      {{ s.name }}
      <span class="ml-1 opacity-50">{{ s.value }}</span>
    </button>
  </div>
</template>

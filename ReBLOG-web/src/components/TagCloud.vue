<script setup lang="ts">
import type { LabelData } from '@/types'

defineProps<{
  labels: LabelData[]
  selected?: string
}>()

const emit = defineEmits<{
  select: [label: string | undefined]
}>()
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      class="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
      :class="
        !selected
          ? 'bg-apple-gray-700 text-white'
          : 'bg-apple-gray-50 text-apple-gray-400 hover:text-apple-gray-700 hover:bg-apple-gray-100'
      "
      @click="emit('select', undefined)"
    >
      全部
    </button>
    <button
      v-for="label in labels"
      :key="label.id"
      class="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
      :class="
        selected === label.label_name
          ? 'bg-apple-gray-700 text-white'
          : 'bg-apple-gray-50 text-apple-gray-400 hover:text-apple-gray-700 hover:bg-apple-gray-100'
      "
      @click="emit('select', String(label.label_name))"
    >
      {{ label.label_name }}
    </button>
  </div>
</template>

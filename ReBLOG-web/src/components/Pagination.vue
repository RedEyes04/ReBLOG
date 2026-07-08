<script setup lang="ts">
defineProps<{
  current: number
  total: number
  pageSize: number
}>()

const emit = defineEmits<{
  change: [page: number]
}>()

function pages(total: number, pageSize: number) {
  return Math.ceil(total / pageSize)
}
</script>

<template>
  <div
    v-if="total / pageSize > 1"
    class="flex items-center justify-center gap-1 mt-12"
  >
    <button
      v-for="p in pages(total, pageSize)"
      :key="p"
      @click="emit('change', p)"
      class="w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200"
      :class="
        p === current
          ? 'bg-apple-gray-700 text-white'
          : 'text-apple-gray-400 hover:text-apple-gray-700 hover:bg-apple-gray-50'
      "
    >
      {{ p }}
    </button>
  </div>
</template>

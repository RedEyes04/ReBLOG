<script setup lang="ts">
defineProps<{ current: number; total: number; pageSize: number }>()
const emit = defineEmits<{ change: [page: number] }>()
</script>

<template>
  <div v-if="total / pageSize > 1" class="flex items-center justify-center gap-1.5 mt-14">
    <button
      v-for="p in Math.ceil(total / pageSize)" :key="p"
      @click="emit('change', p)"
      class="w-9 h-9 rounded-xl text-sm font-medium transition-all duration-300"
      :class="p === current
        ? 'bg-apple-gray-700 text-white shadow-lg shadow-black/10'
        : 'glass-card text-apple-gray-400 hover:text-apple-gray-700'"
    >{{ p }}</button>
  </div>
</template>

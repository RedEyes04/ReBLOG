<script setup lang="ts">
defineProps<{ current: number; total: number; pageSize: number }>()
const emit = defineEmits<{ change: [p: number] }>()
</script>
<template>
  <div v-if="total/pageSize > 1" class="flex items-center justify-center gap-1.5 mt-14">
    <button v-for="p in Math.ceil(total/pageSize)" :key="p" @click="emit('change',p)"
      class="w-9 h-9 rounded-xl text-sm font-semibold transition-all duration-300"
      :class="p===current ? 'bg-zinc-800 text-white shadow-lg shadow-zinc-800/15' : 'glass-card text-zinc-400 hover:text-zinc-700'">{{ p }}</button>
  </div>
</template>

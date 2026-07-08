<script setup lang="ts">
import type { DiaryDate } from '@/types'
import { CalendarDays } from 'lucide-vue-next'

defineProps<{ diary: DiaryDate }>()

const weatherLabels: Record<number, string> = {
  0: '☀️', 1: '⛅', 2: '☁️', 3: '🌧', 4: '⛈', 5: '❄️', 6: '🌫',
}

function formatDate(date: string) {
  const d = new Date(date)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}
</script>

<template>
  <div class="flex gap-5 p-6 rounded-2xl glass-card">
    <!-- Date Marker -->
    <div class="hidden sm:flex flex-col items-center shrink-0 w-12 pt-0.5">
      <CalendarDays :size="16" class="text-apple-gray-300" />
      <span class="text-[11px] text-apple-gray-400 mt-1.5 leading-tight text-center font-medium">
        {{ formatDate(diary.moment || '') }}
      </span>
    </div>

    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 mb-2">
        <h3 class="text-lg font-semibold text-apple-gray-700">{{ diary.title }}</h3>
        <span v-if="diary.weather_id !== undefined" class="text-sm">
          {{ weatherLabels[diary.weather_id] || '' }}
        </span>
        <span class="sm:hidden text-[11px] text-apple-gray-400">{{ formatDate(diary.moment || '') }}</span>
      </div>
      <p class="text-sm text-apple-gray-500 leading-relaxed line-clamp-3">{{ diary.content }}</p>
      <img v-if="diary.picture" :src="diary.picture" alt="" class="mt-3 rounded-xl max-h-48 object-cover" loading="lazy" />
    </div>
  </div>
</template>

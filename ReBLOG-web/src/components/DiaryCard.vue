<script setup lang="ts">
import type { DiaryDate } from '@/types'
import { Calendar, CloudSun } from 'lucide-vue-next'

defineProps<{
  diary: DiaryDate
}>()

const weatherLabels: Record<number, string> = {
  0: '☀️ 晴', 1: '⛅ 多云', 2: '☁️ 阴', 3: '🌧 雨',
  4: '⛈ 雷雨', 5: '❄️ 雪', 6: '🌫 雾',
}

function formatDate(date: string) {
  const d = new Date(date)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}
</script>

<template>
  <div class="flex gap-6 p-6 rounded-2xl bg-white card-hover border border-transparent hover:border-black/5">
    <!-- Date marker -->
    <div class="hidden sm:flex flex-col items-center shrink-0 w-14 pt-1">
      <Calendar :size="18" class="text-apple-gray-300" />
      <span class="text-xs text-apple-gray-400 mt-1.5 leading-tight text-center">
        {{ formatDate(diary.moment || '') }}
      </span>
    </div>

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-3 mb-2">
        <h3 class="text-lg font-semibold text-apple-gray-700">{{ diary.title }}</h3>
        <span
          v-if="diary.weather_id !== undefined && weatherLabels[diary.weather_id]"
          class="text-xs text-apple-gray-400"
        >
          {{ weatherLabels[diary.weather_id] }}
        </span>
        <span class="sm:hidden text-xs text-apple-gray-400">
          {{ formatDate(diary.moment || '') }}
        </span>
      </div>

      <p class="text-sm text-apple-gray-500 leading-relaxed line-clamp-3">
        {{ diary.content }}
      </p>

      <img
        v-if="diary.picture"
        :src="diary.picture"
        alt=""
        class="mt-3 rounded-xl max-h-48 object-cover"
        loading="lazy"
      />
    </div>
  </div>
</template>

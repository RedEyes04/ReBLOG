<script setup lang="ts">
import type { ArticleDate } from '@/types'
import { computed } from 'vue'
import { Eye, Heart, Maximize2 } from 'lucide-vue-next'

const props = defineProps<{ item: ArticleDate; baseImgPath?: string }>()

const coverUrl = computed(() => {
  if (!props.item.cover) return ''
  return `${props.baseImgPath || ''}/${props.item.cover}`
})

const thumbnails = computed(() => {
  if (!props.item.content) return []
  try {
    return props.item.content.split(' ').filter(Boolean).slice(0, 3).map((s: string) => {
      const obj = JSON.parse(s)
      return `${props.baseImgPath || ''}/${obj.url}`
    })
  } catch { return [] }
})
</script>

<template>
  <router-link :to="`/blog/${item.id}`" class="group block rounded-2xl overflow-hidden glass-card">
    <div class="aspect-[4/3] bg-black/[0.02] overflow-hidden relative">
      <img
        v-if="item.cover"
        :src="coverUrl"
        :alt="item.title"
        class="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-105"
        loading="lazy"
      />
      <!-- Hover overlay -->
      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-400 flex items-center justify-center">
        <Maximize2 :size="20" class="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 drop-shadow-lg translate-y-2 group-hover:translate-y-0" />
      </div>
    </div>

    <div v-if="thumbnails.length" class="flex">
      <div v-for="(t, i) in thumbnails" :key="i" class="flex-1 aspect-square bg-black/[0.02] overflow-hidden"
        :class="{ 'border-r border-white/50': i < thumbnails.length - 1 }">
        <img :src="t" alt="" class="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" loading="lazy" />
      </div>
    </div>

    <div class="p-4">
      <h3 class="text-sm font-semibold text-apple-gray-700 transition-colors duration-300 group-hover:text-apple-blue line-clamp-1">
        {{ item.title }}
      </h3>
      <div class="flex items-center gap-3 mt-2 text-[11px] text-apple-gray-300">
        <span class="flex items-center gap-1"><Eye :size="11" />{{ item.views }}</span>
        <span class="flex items-center gap-1"><Heart :size="11" />{{ item.praise }}</span>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import type { ArticleDate } from '@/types'
import { computed } from 'vue'
import { Eye, Heart, Maximize2 } from 'lucide-vue-next'

const props = defineProps<{ item: ArticleDate; baseImgPath?: string }>()
const coverUrl = computed(() => props.item.cover ? `${props.baseImgPath || ''}/${props.item.cover}` : '')
const thumbnails = computed(() => {
  if (!props.item.content) return []
  try {
    return props.item.content.split(' ').filter(Boolean).slice(0,3).map((s:string) => {
      return `${props.baseImgPath || ''}/${JSON.parse(s).url}`
    })
  } catch { return [] }
})

const accents = ['from-accent to-accent-2', 'from-accent-2 to-accent-3', 'from-accent-5 to-accent', 'from-accent-4 to-accent-3']
const accent = accents[props.item.id % accents.length]
</script>

<template>
  <router-link :to="`/blog/${item.id}`" class="group block rounded-2xl overflow-hidden glass-card">
    <div class="aspect-[4/3] overflow-hidden relative" :class="item.cover ? '' : `bg-gradient-to-br ${accent}`">
      <img v-if="item.cover" :src="coverUrl" :alt="item.title" class="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" loading="lazy" />
      <div v-else class="w-full h-full flex items-center justify-center text-white/30 text-2xl font-extrabold font-display">{{ item.title.charAt(0) }}</div>
      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/4 transition-all duration-400 flex items-center justify-center">
        <Maximize2 :size="18" class="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 drop-shadow-lg translate-y-2 group-hover:translate-y-0" />
      </div>
    </div>
    <div v-if="thumbnails.length" class="flex">
      <div v-for="(t,i) in thumbnails" :key="i" class="flex-1 aspect-square overflow-hidden" :class="{ 'border-r border-white/50': i < thumbnails.length - 1 }">
        <img :src="t" alt="" class="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" loading="lazy" />
      </div>
    </div>
    <div class="p-4">
      <h3 class="text-sm font-bold text-zinc-700 transition-colors duration-300 group-hover:text-accent line-clamp-1">{{ item.title }}</h3>
      <div class="flex items-center gap-3 mt-2 text-[11px] text-zinc-400">
        <span class="flex items-center gap-1"><Eye :size="11" />{{ item.views }}</span>
        <span class="flex items-center gap-1"><Heart :size="11" />{{ item.praise }}</span>
      </div>
    </div>
  </router-link>
</template>

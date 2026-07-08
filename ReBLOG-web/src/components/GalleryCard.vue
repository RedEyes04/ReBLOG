<script setup lang="ts">
import type { ArticleDate } from '@/types'
import { computed } from 'vue'
import { Eye, Heart, Image } from 'lucide-vue-next'

const props = defineProps<{
  item: ArticleDate
  baseImgPath?: string
}>()

const coverUrl = computed(() => {
  if (!props.item.cover) return ''
  return `${props.baseImgPath || ''}/${props.item.cover}`
})

const thumbnails = computed(() => {
  if (!props.item.content) return []
  try {
    return props.item.content
      .split(' ')
      .filter(Boolean)
      .slice(0, 3)
      .map((s: string) => {
        const obj = JSON.parse(s)
        return `${props.baseImgPath || ''}/${obj.url}`
      })
  } catch {
    return []
  }
})
</script>

<template>
  <router-link
    :to="`/blog/${item.id}`"
    class="group block rounded-2xl overflow-hidden bg-white card-hover border border-transparent hover:border-black/5"
  >
    <!-- Main cover -->
    <div class="aspect-[4/3] bg-apple-gray-100 overflow-hidden">
      <img
        v-if="item.cover"
        :src="coverUrl"
        :alt="item.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div
        v-else
        class="w-full h-full flex items-center justify-center text-apple-gray-300"
      >
        <Image :size="32" />
      </div>
    </div>

    <!-- Thumbnails row -->
    <div v-if="thumbnails.length" class="flex border-t border-apple-gray-100">
      <div
        v-for="(thumb, i) in thumbnails"
        :key="i"
        class="flex-1 aspect-square bg-apple-gray-100 overflow-hidden"
        :class="{ 'border-r border-apple-gray-100': i < thumbnails.length - 1 }"
      >
        <img
          :src="thumb"
          alt=""
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
    </div>

    <!-- Info -->
    <div class="p-4">
      <h3
        class="text-sm font-semibold text-apple-gray-700 group-hover:text-apple-blue transition-colors duration-200 line-clamp-1"
      >
        {{ item.title }}
      </h3>
      <div class="flex items-center gap-3 mt-2 text-xs text-apple-gray-300">
        <span class="flex items-center gap-1"><Eye :size="11" />{{ item.views }}</span>
        <span class="flex items-center gap-1"><Heart :size="11" />{{ item.praise }}</span>
      </div>
    </div>
  </router-link>
</template>

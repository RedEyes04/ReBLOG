<script setup lang="ts">
import type { ArticleDate } from '@/types'
import { Eye, Heart, MessageCircle } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps<{ article: ArticleDate; baseImgPath?: string }>()

const coverUrl = computed(() => {
  if (!props.article.cover) return ''
  return `${props.baseImgPath || ''}/${props.article.cover}`
})

function formatDate(date: string) {
  const d = new Date(date)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}
</script>

<template>
  <router-link
    :to="`/blog/${article.id}`"
    class="group flex flex-col sm:flex-row gap-5 p-5 rounded-2xl glass-card"
  >
    <!-- Cover -->
    <div
      v-if="article.cover"
      class="sm:w-64 sm:shrink-0 aspect-[16/10] sm:aspect-auto rounded-xl overflow-hidden bg-black/5"
    >
      <img
        :src="coverUrl"
        :alt="article.title"
        class="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-105"
        loading="lazy"
      />
    </div>

    <!-- Text -->
    <div class="flex flex-col justify-center min-w-0 flex-1">
      <h3 class="text-lg font-semibold text-apple-gray-700 transition-colors duration-300 group-hover:text-apple-blue line-clamp-1">
        {{ article.title }}
      </h3>
      <p
        v-if="article.introduce"
        class="mt-1.5 text-sm text-apple-gray-400 leading-relaxed line-clamp-2"
      >
        {{ article.introduce }}
      </p>

      <!-- Meta row -->
      <div class="flex items-center gap-4 mt-3 text-xs text-apple-gray-300">
        <span>{{ formatDate(article.moment) }}</span>
        <span class="flex items-center gap-1"><Eye :size="11" />{{ article.views }}</span>
        <span class="flex items-center gap-1"><Heart :size="11" />{{ article.praise }}</span>
        <span class="flex items-center gap-1"><MessageCircle :size="11" />{{ article.comment }}</span>
        <span
          v-if="article.label?.length"
          class="flex items-center gap-1.5 ml-auto"
        >
          <span
            v-for="l in article.label.slice(0, 2)"
            :key="l"
            class="px-2 py-0.5 rounded-full bg-black/3 text-apple-gray-400 text-[11px]"
          >
            {{ l }}
          </span>
        </span>
      </div>
    </div>
  </router-link>
</template>

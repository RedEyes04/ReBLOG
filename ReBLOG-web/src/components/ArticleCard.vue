<script setup lang="ts">
import type { ArticleDate } from '@/types'
import { Eye, Heart, MessageCircle, Clock } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps<{
  article: ArticleDate
  baseImgPath?: string
}>()

const coverUrl = computed(() => {
  if (!props.article.cover) return ''
  return `${props.baseImgPath || ''}/${props.article.cover}`
})

function formatDate(date: string) {
  const d = new Date(date)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}.${m}.${day}`
}
</script>

<template>
  <router-link
    :to="`/blog/${article.id}`"
    class="group flex flex-col sm:flex-row gap-5 p-5 rounded-2xl bg-white card-hover border border-transparent hover:border-black/5"
  >
    <!-- Cover Image -->
    <div
      v-if="article.cover"
      class="sm:w-64 sm:shrink-0 aspect-[16/10] sm:aspect-auto rounded-xl overflow-hidden bg-apple-gray-100"
    >
      <img
        :src="coverUrl"
        :alt="article.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>

    <!-- Content -->
    <div class="flex flex-col justify-center min-w-0 flex-1">
      <h3
        class="text-lg font-semibold text-apple-gray-700 group-hover:text-apple-blue transition-colors duration-200 line-clamp-1"
      >
        {{ article.title }}
      </h3>

      <p
        v-if="article.introduce"
        class="mt-1.5 text-sm text-apple-gray-400 leading-relaxed line-clamp-2"
      >
        {{ article.introduce }}
      </p>

      <!-- Meta -->
      <div class="flex items-center gap-4 mt-3 text-xs text-apple-gray-300">
        <span class="flex items-center gap-1">
          <Clock :size="12" />
          {{ formatDate(article.moment) }}
        </span>
        <span class="flex items-center gap-1">
          <Eye :size="12" />
          {{ article.views }}
        </span>
        <span class="flex items-center gap-1">
          <Heart :size="12" />
          {{ article.praise }}
        </span>
        <span class="flex items-center gap-1">
          <MessageCircle :size="12" />
          {{ article.comment }}
        </span>

        <!-- Labels -->
        <span
          v-if="article.label?.length"
          class="flex items-center gap-1.5 ml-auto"
        >
          <span
            v-for="label in article.label.slice(0, 3)"
            :key="label"
            class="px-2 py-0.5 rounded-full bg-apple-gray-50 text-apple-gray-400 text-[11px]"
          >
            {{ label }}
          </span>
        </span>
      </div>
    </div>
  </router-link>
</template>

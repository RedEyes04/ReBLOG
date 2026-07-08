<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getArticle } from '@/api'
import type { ArticleDate } from '@/types'
import CommentList from '@/components/CommentList.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { ArrowLeft, Eye, Heart, MessageCircle, Clock } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const article = ref<ArticleDate | null>(null)
const loading = ref(true)
const baseImgPath = 'http://localhost:3000/files'

function formatDate(date: string) {
  const d = new Date(date)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

onMounted(async () => {
  const id = Number(route.params.id)
  if (!id) { router.push('/404'); return }
  try {
    const res = await getArticle(id)
    if (res.code === 200 && res.data) {
      article.value = res.data
    }
  } catch { /* ignore */ }
  loading.value = false
})
</script>

<template>
  <div class="pt-20 pb-16">
    <div class="max-w-3xl mx-auto px-6">
      <!-- Back -->
      <button
        @click="router.push('/blog')"
        class="inline-flex items-center gap-1.5 text-sm text-apple-gray-400 hover:text-apple-gray-700 transition-colors mb-8"
      >
        <ArrowLeft :size="16" />
        返回博客
      </button>

      <LoadingSpinner v-if="loading" />

      <template v-else-if="article">
        <!-- Header -->
        <header class="mb-10">
          <h1 class="text-3xl sm:text-4xl font-extrabold text-apple-gray-700 leading-tight tracking-tight">
            {{ article.title }}
          </h1>
          <div class="flex flex-wrap items-center gap-4 mt-4 text-sm text-apple-gray-400">
            <span class="flex items-center gap-1">
              <Clock :size="14" />
              {{ formatDate(article.moment) }}
            </span>
            <span class="flex items-center gap-1"><Eye :size="14" /> {{ article.views }}</span>
            <span class="flex items-center gap-1"><Heart :size="14" /> {{ article.praise }}</span>
            <span class="flex items-center gap-1"><MessageCircle :size="14" /> {{ article.comment }}</span>
          </div>

          <!-- Labels -->
          <div v-if="article.label?.length" class="flex flex-wrap gap-1.5 mt-4">
            <span
              v-for="l in article.label"
              :key="l"
              class="px-2.5 py-0.5 rounded-full bg-apple-gray-50 text-apple-gray-400 text-xs"
            >
              {{ l }}
            </span>
          </div>

          <!-- Cover -->
          <img
            v-if="article.cover"
            :src="baseImgPath + '/' + article.cover"
            :alt="article.title"
            class="mt-8 w-full rounded-2xl object-cover max-h-96"
          />
        </header>

        <!-- Content -->
        <article
          v-if="article.content"
          class="prose prose-lg max-w-none prose-headings:text-apple-gray-700 prose-p:text-apple-gray-600 prose-p:leading-relaxed prose-a:text-apple-blue prose-img:rounded-xl"
          v-html="article.content"
        />

        <!-- Comments -->
        <CommentList :article-id="article.id" />
      </template>

      <!-- Not found -->
      <div v-else class="text-center py-20">
        <p class="text-apple-gray-400">文章未找到</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getArticle } from '@/api'
import type { ArticleDate } from '@/types'
import CommentList from '@/components/CommentList.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ScrollReveal from '@/components/ScrollReveal.vue'
import { ArrowLeft, Eye, Heart, MessageCircle, Clock, Share2 } from 'lucide-vue-next'

const route = useRoute(); const router = useRouter()
const article = ref<ArticleDate | null>(null); const loading = ref(true)
const readingProgress = ref(0)
const baseImgPath = 'http://localhost:3000/files'

function formatDate(date: string) {
  const d = new Date(date)
  return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`
}
function onScroll() {
  const h = document.documentElement.scrollHeight - window.innerHeight
  readingProgress.value = h > 0 ? Math.min((window.scrollY / h) * 100, 100) : 0
}
onMounted(async () => {
  window.addEventListener('scroll', onScroll, { passive: true })
  const id = Number(route.params.id)
  if (!id) { router.push('/404'); return }
  try { const res = await getArticle(id); if (res.code===200&&res.data) article.value = res.data } catch { /* */ }
  loading.value = false
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <!-- Reading progress -->
  <div class="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-accent via-accent-2 to-accent-3 z-50 transition-all duration-150" :style="{ width: readingProgress + '%' }" />

  <div class="relative min-h-screen">
    <div class="pt-16 sm:pt-24 pb-16 max-w-3xl mx-auto px-6">
      <button @click="router.push('/blog')" class="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-700 transition-colors mb-8 group">
        <ArrowLeft :size="16" class="transition-transform group-hover:-translate-x-0.5" /> 返回博客
      </button>

      <LoadingSpinner v-if="loading" />
      <template v-else-if="article">
        <ScrollReveal>
          <header class="mb-10">
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-800 leading-tight tracking-tight text-balance">{{ article.title }}</h1>
            <div class="flex flex-wrap items-center gap-5 mt-5 text-sm text-zinc-400">
              <span class="flex items-center gap-1.5"><Clock :size="15" />{{ formatDate(article.moment) }}</span>
              <span class="flex items-center gap-1.5"><Eye :size="15" />{{ article.views }}</span>
              <span class="flex items-center gap-1.5 text-rose-400"><Heart :size="15" />{{ article.praise }}</span>
              <span class="flex items-center gap-1.5 text-accent"><MessageCircle :size="15" />{{ article.comment }}</span>
            </div>
            <div v-if="article.label?.length" class="flex flex-wrap gap-1.5 mt-4">
              <span v-for="l in article.label" :key="l" class="px-3 py-1 rounded-full glass text-zinc-500 text-xs font-medium">{{ l }}</span>
            </div>
          </header>
        </ScrollReveal>

        <ScrollReveal v-if="article.cover" :delay="100">
          <img :src="baseImgPath+'/'+article.cover" :alt="article.title" class="w-full rounded-2xl object-cover max-h-[480px] mb-12 shadow-2xl shadow-black/5" />
        </ScrollReveal>

        <ScrollReveal :delay="150">
          <div class="divider-gradient mb-10" />
          <article v-if="article.content" class="prose prose-lg max-w-none prose-headings:text-zinc-800 prose-p:text-zinc-600 prose-p:leading-relaxed prose-a:text-accent prose-img:rounded-2xl prose-img:shadow-lg prose-blockquote:border-l-accent prose-blockquote:bg-zinc-50/50 prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-blockquote:px-4" v-html="article.content" />

          <!-- Share & tags footer -->
          <div class="mt-12 p-5 rounded-2xl glass-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="flex items-center gap-2">
              <Share2 :size="15" class="text-zinc-400" />
              <span class="text-sm text-zinc-500">喜欢这篇文章？分享给朋友吧</span>
            </div>
            <div class="flex items-center gap-2">
              <span v-for="l in (article.label || [])" :key="l" class="px-3 py-1 rounded-full bg-accent/8 text-accent text-xs font-medium">{{ l }}</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal :delay="200"><CommentList :article-id="article.id" /></ScrollReveal>
      </template>

      <div v-else class="text-center py-32">
        <p class="text-7xl font-extrabold text-zinc-200 mb-4 font-display">404</p>
        <p class="text-zinc-400">文章未找到</p>
      </div>
    </div>
  </div>
</template>

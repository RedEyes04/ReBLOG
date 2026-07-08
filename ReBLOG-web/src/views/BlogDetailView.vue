<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getArticle } from '@/api'
import type { ArticleDate } from '@/types'
import CommentList from '@/components/CommentList.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ScrollReveal from '@/components/ScrollReveal.vue'
import { ArrowLeft, Eye, Heart, MessageCircle, Clock } from 'lucide-vue-next'

const route = useRoute(); const router = useRouter()
const article = ref<ArticleDate | null>(null); const loading = ref(true)
const baseImgPath = 'http://localhost:3000/files'

function formatDate(date: string) {
  const d = new Date(date)
  return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`
}

onMounted(async () => {
  const id = Number(route.params.id)
  if (!id) { router.push('/404'); return }
  try { const res = await getArticle(id); if (res.code === 200 && res.data) article.value = res.data } catch { /* */ }
  loading.value = false
})
</script>

<template>
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
          <article v-if="article.content" class="prose prose-lg max-w-none prose-headings:text-zinc-800 prose-p:text-zinc-600 prose-p:leading-relaxed prose-a:text-accent prose-img:rounded-2xl prose-img:shadow-lg" v-html="article.content" />
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

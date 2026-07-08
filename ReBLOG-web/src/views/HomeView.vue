<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getArticles, getGallery, getOverview } from '@/api'
import type { ArticleDate, OverviewData } from '@/types'
import ArticleCard from '@/components/ArticleCard.vue'
import GalleryCard from '@/components/GalleryCard.vue'
import TypewriterText from '@/components/TypewriterText.vue'
import ScrollReveal from '@/components/ScrollReveal.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { ArrowRight, Sparkles } from 'lucide-vue-next'
import { getList } from '@/utils/helpers'

const featuredArticles = ref<ArticleDate[]>([])
const featuredGallery = ref<ArticleDate[]>([])
const overview = ref<OverviewData | null>(null)
const loading = ref(true)
const baseImgPath = 'http://localhost:3000/files'

onMounted(async () => {
  try {
    const [aRes, gRes, oRes] = await Promise.all([
      getArticles({ pageSize: 4, nowPage: 1 }),
      getGallery({ pageSize: 4, nowPage: 1 }),
      getOverview(),
    ])
    if (aRes.code === 200) featuredArticles.value = getList<ArticleDate>(aRes.data!)
    if (gRes.code === 200) featuredGallery.value = getList<ArticleDate>(gRes.data!)
    if (oRes.code === 200) overview.value = oRes.data || null
  } catch { /* */ }
  loading.value = false
})
</script>

<template>
  <div class="relative min-h-screen">
    <!-- Floating orbs -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-accent/8 animate-float blur-3xl" />
      <div class="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-accent-2/6 animate-float-slow blur-3xl" />
      <div class="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-accent-3/4 animate-float blur-3xl" style="animation-delay: -3s" />
      <div class="absolute top-1/2 right-1/4 w-64 h-64 rounded-full bg-accent-4/4 animate-float-slow blur-3xl" style="animation-delay: -6s" />
    </div>

    <!-- Hero -->
    <section class="relative pt-24 sm:pt-36 lg:pt-48 pb-16 sm:pb-24 px-6">
      <div class="max-w-3xl mx-auto text-center">
        <!-- Badge -->
        <ScrollReveal>
          <span class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass text-sm font-medium text-zinc-500 mb-8 shadow-sm">
            <Sparkles :size="14" class="text-accent" />
            欢迎来到我的空间
          </span>
        </ScrollReveal>

        <!-- Main heading with typewriter -->
        <ScrollReveal :delay="100">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-800 leading-tight mb-4">
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-800">
              ReBLOG
            </span>
          </h1>
        </ScrollReveal>

        <!-- Typewriter -->
        <ScrollReveal :delay="200">
          <p class="text-xl sm:text-2xl lg:text-3xl font-display text-zinc-500 h-12 sm:h-14 flex items-center justify-center">
            <TypewriterText />
          </p>
        </ScrollReveal>

        <!-- CTA -->
        <ScrollReveal :delay="400">
          <div class="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <router-link to="/blog"
              class="group inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-zinc-800 text-white text-sm font-semibold hover:bg-zinc-900 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-800/15 hover:-translate-y-0.5">
              浏览博客
              <ArrowRight :size="16" class="transition-transform duration-300 group-hover:translate-x-0.5" />
            </router-link>
            <router-link to="/gallery"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl glass text-sm font-semibold text-zinc-600 hover:text-zinc-800 transition-all duration-300 hover:-translate-y-0.5">
              查看图库
            </router-link>
          </div>
        </ScrollReveal>

        <!-- Stats -->
        <ScrollReveal v-if="overview" :delay="500">
          <div class="mt-16 inline-flex items-center gap-8 sm:gap-12 p-5 rounded-2xl glass">
            <div class="text-center group cursor-default">
              <p class="text-2xl sm:text-3xl font-extrabold text-zinc-800 transition-colors duration-300 group-hover:text-accent">{{ overview.article }}</p>
              <p class="text-xs text-zinc-400 mt-0.5 font-medium">文章</p>
            </div>
            <div class="w-px h-8 bg-zinc-200" />
            <div class="text-center group cursor-default">
              <p class="text-2xl sm:text-3xl font-extrabold text-zinc-800 transition-colors duration-300 group-hover:text-accent-2">{{ overview.gallery }}</p>
              <p class="text-xs text-zinc-400 mt-0.5 font-medium">图库</p>
            </div>
            <div class="w-px h-8 bg-zinc-200" />
            <div class="text-center group cursor-default">
              <p class="text-2xl sm:text-3xl font-extrabold text-zinc-800 transition-colors duration-300 group-hover:text-accent-3">{{ overview.diary }}</p>
              <p class="text-xs text-zinc-400 mt-0.5 font-medium">日记</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <LoadingSpinner v-if="loading" />

    <template v-else>
      <!-- Articles -->
      <section v-if="featuredArticles.length" class="relative px-6 pb-16">
        <div class="max-w-4xl mx-auto">
          <ScrollReveal>
            <div class="flex items-center justify-between mb-8">
              <div>
                <p class="text-xs font-bold text-accent uppercase tracking-widest">Latest Posts</p>
                <h2 class="text-2xl sm:text-3xl font-extrabold text-zinc-800 mt-1">最新文章</h2>
              </div>
              <router-link to="/blog" class="group hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-2 transition-colors">
                全部 <ArrowRight :size="14" class="transition-transform group-hover:translate-x-0.5" />
              </router-link>
            </div>
          </ScrollReveal>
          <div class="space-y-4">
            <ScrollReveal v-for="(a, i) in featuredArticles" :key="a.id" :delay="i * 80">
              <ArticleCard :article="a" :base-img-path="baseImgPath" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <!-- Gallery -->
      <section v-if="featuredGallery.length" class="relative px-6 pb-16">
        <div class="max-w-4xl mx-auto">
          <ScrollReveal>
            <div class="flex items-center justify-between mb-8">
              <div>
                <p class="text-xs font-bold text-accent-2 uppercase tracking-widest">Gallery</p>
                <h2 class="text-2xl sm:text-3xl font-extrabold text-zinc-800 mt-1">精选图库</h2>
              </div>
              <router-link to="/gallery" class="group hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-accent-2 hover:text-accent transition-colors">
                全部 <ArrowRight :size="14" class="transition-transform group-hover:translate-x-0.5" />
              </router-link>
            </div>
          </ScrollReveal>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <ScrollReveal v-for="(g, i) in featuredGallery" :key="g.id" :delay="i * 80">
              <GalleryCard :item="g" :base-img-path="baseImgPath" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <ScrollReveal v-if="!featuredArticles.length && !featuredGallery.length">
        <section class="px-6 pb-16 text-center">
          <p class="text-zinc-300 text-sm">还没有内容，在管理后台发布文章吧</p>
        </section>
      </ScrollReveal>
    </template>
  </div>
</template>

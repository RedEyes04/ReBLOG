<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getArticles, getGallery, getOverview } from '@/api'
import type { ArticleDate, OverviewData } from '@/types'
import ArticleCard from '@/components/ArticleCard.vue'
import GalleryCard from '@/components/GalleryCard.vue'
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
  } catch { /* API unavailable */ }
  loading.value = false
})
</script>

<template>
  <div class="bg-aurora">
    <!-- Hero -->
    <section class="relative pt-28 sm:pt-40 pb-20 sm:pb-28 px-6 text-center overflow-hidden">
      <!-- Animated background blobs -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="absolute -top-40 -left-20 w-[500px] h-[500px] rounded-full bg-apple-blue/5 animate-float" />
        <div class="absolute top-20 -right-32 w-[400px] h-[400px] rounded-full bg-purple-500/4 animate-float" style="animation-delay: -2s" />
        <div class="absolute -bottom-20 left-1/3 w-[350px] h-[350px] rounded-full bg-pink-400/3 animate-float" style="animation-delay: -4s" />
      </div>

      <div class="relative">
        <!-- Badge -->
        <ScrollReveal>
          <span class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass-dark text-sm font-medium text-apple-gray-500 mb-8">
            <Sparkles :size="14" class="text-apple-blue" />
            欢迎来到我的空间
          </span>
        </ScrollReveal>

        <!-- Heading -->
        <ScrollReveal :delay="100">
          <h1 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-balance leading-tight">
            <span class="bg-clip-text text-transparent bg-gradient-to-b from-apple-gray-700 to-apple-gray-500">
              记录思考，<br class="sm:hidden" />分享生活
            </span>
          </h1>
        </ScrollReveal>

        <!-- Subtitle -->
        <ScrollReveal :delay="200">
          <p class="mt-6 text-lg sm:text-xl text-apple-gray-400 max-w-lg mx-auto leading-relaxed">
            一个关于技术、设计与日常的私人空间
          </p>
        </ScrollReveal>

        <!-- CTA -->
        <ScrollReveal :delay="300">
          <div class="mt-8 flex items-center justify-center gap-4">
            <router-link
              to="/blog"
              class="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-apple-gray-700 text-white text-sm font-medium hover:bg-black transition-all duration-300 hover:shadow-lg hover:shadow-black/10"
            >
              浏览博客
              <ArrowRight :size="16" class="transition-transform duration-300 group-hover:translate-x-0.5" />
            </router-link>
            <router-link
              to="/gallery"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card text-sm font-medium text-apple-gray-700"
            >
              查看图库
            </router-link>
          </div>
        </ScrollReveal>

        <!-- Stats -->
        <ScrollReveal v-if="overview" :delay="400">
          <div class="mt-16 flex items-center justify-center gap-10 sm:gap-16">
            <div class="text-center group cursor-default">
              <p class="text-3xl font-extrabold text-apple-gray-700 transition-all duration-300 group-hover:text-apple-blue">{{ overview.article }}</p>
              <p class="text-xs text-apple-gray-400 mt-1">文章</p>
            </div>
            <div class="w-px h-10 bg-apple-gray-200" />
            <div class="text-center group cursor-default">
              <p class="text-3xl font-extrabold text-apple-gray-700 transition-all duration-300 group-hover:text-apple-blue">{{ overview.gallery }}</p>
              <p class="text-xs text-apple-gray-400 mt-1">图库</p>
            </div>
            <div class="w-px h-10 bg-apple-gray-200" />
            <div class="text-center group cursor-default">
              <p class="text-3xl font-extrabold text-apple-gray-700 transition-all duration-300 group-hover:text-apple-blue">{{ overview.diary }}</p>
              <p class="text-xs text-apple-gray-400 mt-1">日记</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <LoadingSpinner v-if="loading" />

    <template v-else>
      <!-- Featured Articles -->
      <section v-if="featuredArticles.length" class="px-6 pb-20 relative">
        <div class="max-w-4xl mx-auto">
          <ScrollReveal>
            <div class="flex items-center justify-between mb-10">
              <div>
                <p class="text-xs font-semibold text-apple-blue uppercase tracking-widest">Latest</p>
                <h2 class="text-2xl sm:text-3xl font-extrabold text-apple-gray-700 mt-1">最新文章</h2>
              </div>
              <router-link
                to="/blog"
                class="group hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-apple-blue hover:text-apple-blue-hover transition-colors"
              >
                查看全部
                <ArrowRight :size="14" class="transition-transform duration-300 group-hover:translate-x-0.5" />
              </router-link>
            </div>
          </ScrollReveal>

          <div class="space-y-4">
            <ScrollReveal
              v-for="(a, i) in featuredArticles"
              :key="a.id"
              :delay="i * 80"
            >
              <ArticleCard :article="a" :base-img-path="baseImgPath" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <!-- Featured Gallery -->
      <section v-if="featuredGallery.length" class="px-6 pb-20 relative">
        <div class="max-w-4xl mx-auto">
          <ScrollReveal>
            <div class="flex items-center justify-between mb-10">
              <div>
                <p class="text-xs font-semibold text-apple-blue uppercase tracking-widest">Gallery</p>
                <h2 class="text-2xl sm:text-3xl font-extrabold text-apple-gray-700 mt-1">精选图库</h2>
              </div>
              <router-link
                to="/gallery"
                class="group hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-apple-blue hover:text-apple-blue-hover transition-colors"
              >
                查看全部
                <ArrowRight :size="14" class="transition-transform duration-300 group-hover:translate-x-0.5" />
              </router-link>
            </div>
          </ScrollReveal>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <ScrollReveal
              v-for="(g, i) in featuredGallery"
              :key="g.id"
              :delay="i * 80"
            >
              <GalleryCard :item="g" :base-img-path="baseImgPath" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <!-- Empty -->
      <ScrollReveal v-if="!featuredArticles.length && !featuredGallery.length">
        <section class="px-6 pb-20 text-center">
          <p class="text-apple-gray-300 text-sm">还没有内容，在管理后台发布文章吧</p>
        </section>
      </ScrollReveal>
    </template>
  </div>
</template>

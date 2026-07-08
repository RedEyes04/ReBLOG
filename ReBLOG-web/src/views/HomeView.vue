<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getArticles, getGallery, getOverview, getSubsets } from '@/api'
import type { ArticleDate, OverviewData, SubsetData } from '@/types'
import ArticleCard from '@/components/ArticleCard.vue'
import GalleryCard from '@/components/GalleryCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { ArrowRight } from 'lucide-vue-next'
import { getList } from '@/utils/helpers'

const featuredArticles = ref<ArticleDate[]>([])
const featuredGallery = ref<ArticleDate[]>([])
const overview = ref<OverviewData | null>(null)
const articleSubsets = ref<SubsetData[]>([])
const loading = ref(true)

const baseImgPath = 'http://localhost:3000/files'

onMounted(async () => {
  try {
    const [aRes, gRes, oRes, sRes] = await Promise.all([
      getArticles({ pageSize: 4, nowPage: 1 }),
      getGallery({ pageSize: 4, nowPage: 1 }),
      getOverview(),
      getSubsets(0),
    ])
    if (aRes.code === 200 && aRes.data) featuredArticles.value = getList<ArticleDate>(aRes.data)
    if (gRes.code === 200 && gRes.data) featuredGallery.value = getList<ArticleDate>(gRes.data)
    if (oRes.code === 200) overview.value = oRes.data || null
    if (sRes.code === 200 && sRes.data) articleSubsets.value = getList<SubsetData>(sRes.data)
  } catch { /* API unavailable — show empty state */ }
  loading.value = false
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="pt-14 pb-20 sm:pt-28 sm:pb-32 px-6 text-center">
      <h1 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-apple-gray-700 text-balance">
        记录思考，<br class="sm:hidden" />分享生活
      </h1>
      <p class="mt-6 text-lg sm:text-xl text-apple-gray-400 max-w-lg mx-auto leading-relaxed">
        一个关于技术、设计与日常的私人空间
      </p>
      <div class="mt-8 flex items-center justify-center gap-4">
        <router-link
          to="/blog"
          class="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-apple-gray-700 text-white text-sm font-medium hover:bg-black transition-colors"
        >
          浏览博客
          <ArrowRight :size="16" />
        </router-link>
        <router-link
          to="/gallery"
          class="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-apple-gray-50 text-apple-gray-700 text-sm font-medium hover:bg-apple-gray-100 transition-colors"
        >
          查看图库
        </router-link>
      </div>

      <!-- Stats -->
      <div v-if="overview" class="mt-16 flex items-center justify-center gap-8 sm:gap-12">
        <div class="text-center">
          <p class="text-2xl font-bold text-apple-gray-700">{{ overview.article }}</p>
          <p class="text-xs text-apple-gray-400 mt-0.5">文章</p>
        </div>
        <div class="w-px h-8 bg-apple-gray-200" />
        <div class="text-center">
          <p class="text-2xl font-bold text-apple-gray-700">{{ overview.gallery }}</p>
          <p class="text-xs text-apple-gray-400 mt-0.5">图库</p>
        </div>
        <div class="w-px h-8 bg-apple-gray-200" />
        <div class="text-center">
          <p class="text-2xl font-bold text-apple-gray-700">{{ overview.diary }}</p>
          <p class="text-xs text-apple-gray-400 mt-0.5">日记</p>
        </div>
      </div>
    </section>

    <LoadingSpinner v-if="loading" />

    <template v-else>
      <!-- Featured Articles -->
      <section v-if="featuredArticles.length" class="px-6 pb-20">
        <div class="max-w-4xl mx-auto">
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-2xl font-bold text-apple-gray-700">最新文章</h2>
            <router-link
              to="/blog"
              class="text-sm text-apple-blue hover:text-apple-blue-hover transition-colors flex items-center gap-1"
            >
              查看全部 <ArrowRight :size="14" />
            </router-link>
          </div>
          <div class="space-y-3">
            <ArticleCard
              v-for="a in featuredArticles"
              :key="a.id"
              :article="a"
              :base-img-path="baseImgPath"
            />
          </div>
        </div>
      </section>

      <!-- Featured Gallery -->
      <section v-if="featuredGallery.length" class="px-6 pb-20 bg-apple-gray-50 py-16">
        <div class="max-w-4xl mx-auto">
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-2xl font-bold text-apple-gray-700">精选图库</h2>
            <router-link
              to="/gallery"
              class="text-sm text-apple-blue hover:text-apple-blue-hover transition-colors flex items-center gap-1"
            >
              查看全部 <ArrowRight :size="14" />
            </router-link>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <GalleryCard
              v-for="g in featuredGallery"
              :key="g.id"
              :item="g"
              :base-img-path="baseImgPath"
            />
          </div>
        </div>
      </section>

      <!-- Empty state if no data -->
      <section
        v-if="!featuredArticles.length && !featuredGallery.length"
        class="px-6 pb-20 text-center"
      >
        <p class="text-apple-gray-400">还没有内容，请先在管理后台发布文章或图库</p>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getArticles, getGallery, getOverview } from '@/api'
import type { ArticleDate, OverviewData } from '@/types'
import ArticleCard from '@/components/ArticleCard.vue'
import GalleryCard from '@/components/GalleryCard.vue'
import TypewriterText from '@/components/TypewriterText.vue'
import ScrollReveal from '@/components/ScrollReveal.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { ArrowRight, Sparkles, PenLine, Camera, BookOpen, ChevronRight } from 'lucide-vue-next'
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
    <!-- Ambient orbs -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-accent/8 animate-float blur-3xl" />
      <div class="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-accent-2/6 animate-float-slow blur-3xl" />
      <div class="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] rounded-full bg-accent-3/5 animate-float blur-3xl" style="animation-delay: -3s" />
      <div class="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full bg-accent-4/4 animate-float-slow blur-3xl" style="animation-delay: -6s" />
    </div>

    <!-- Hero -->
    <section class="relative pt-24 sm:pt-36 lg:pt-48 pb-16 sm:pb-24 px-6">
      <div class="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-zinc-500 mb-8 shadow-sm">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span class="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            欢迎来到我的空间
          </div>
        </ScrollReveal>

        <!-- Typewriter -->
        <ScrollReveal :delay="100">
          <p class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display text-zinc-600 h-16 sm:h-20 flex items-center justify-center leading-tight">
            <TypewriterText />
          </p>
        </ScrollReveal>

        <!-- ReBLOG -->
        <ScrollReveal :delay="200">
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-400 mt-3 mb-4">
            ReBLOG
          </h1>
        </ScrollReveal>

        <!-- Short intro -->
        <ScrollReveal :delay="250">
          <p class="text-sm sm:text-base text-zinc-400 max-w-md mx-auto leading-relaxed">
            技术 · 设计 · 生活 · 思考
          </p>
        </ScrollReveal>

        <!-- CTA -->
        <ScrollReveal :delay="350">
          <div class="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <router-link to="/blog" class="glow-ring group inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-zinc-800 text-white text-sm font-semibold hover:bg-zinc-900 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-800/20 hover:-translate-y-0.5">
              浏览博客 <ArrowRight :size="16" class="transition-transform group-hover:translate-x-0.5" />
            </router-link>
            <router-link to="/gallery" class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl glass text-sm font-semibold text-zinc-600 hover:text-zinc-800 transition-all duration-300 hover:-translate-y-0.5">
              查看图库
            </router-link>
            <router-link to="/diary" class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl glass text-sm font-semibold text-zinc-600 hover:text-zinc-800 transition-all duration-300 hover:-translate-y-0.5">
              翻阅日记
            </router-link>
          </div>
        </ScrollReveal>

        <!-- Stats -->
        <ScrollReveal v-if="overview" :delay="450">
          <div class="mt-16 inline-flex items-center gap-8 sm:gap-12 p-5 rounded-2xl glass">
            <div class="text-center group cursor-default">
              <p class="text-2xl sm:text-3xl font-extrabold text-zinc-800 group-hover:text-accent transition-colors duration-300">{{ overview.article }}</p>
              <p class="text-xs text-zinc-400 mt-0.5 font-medium">文章</p>
            </div>
            <div class="w-px h-8 bg-gradient-to-b from-transparent via-zinc-200 to-transparent" />
            <div class="text-center group cursor-default">
              <p class="text-2xl sm:text-3xl font-extrabold text-zinc-800 group-hover:text-accent-2 transition-colors duration-300">{{ overview.gallery }}</p>
              <p class="text-xs text-zinc-400 mt-0.5 font-medium">图库</p>
            </div>
            <div class="w-px h-8 bg-gradient-to-b from-transparent via-zinc-200 to-transparent" />
            <div class="text-center group cursor-default">
              <p class="text-2xl sm:text-3xl font-extrabold text-zinc-800 group-hover:text-accent-3 transition-colors duration-300">{{ overview.diary }}</p>
              <p class="text-xs text-zinc-400 mt-0.5 font-medium">日记</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <LoadingSpinner v-if="loading" />

    <template v-else>
      <!-- Quick nav cards -->
      <section class="relative px-6 pb-16">
        <div class="max-w-3xl mx-auto grid grid-cols-3 gap-4">
          <ScrollReveal :delay="100">
            <router-link to="/blog" class="group flex flex-col items-center gap-3 p-6 rounded-2xl glass-card text-center hover:border-accent/20">
              <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/15 transition-colors">
                <PenLine :size="22" class="text-accent" />
              </div>
              <span class="text-sm font-bold text-zinc-700">文章</span>
              <span class="text-xs text-zinc-400">{{ overview?.article || 0 }} 篇</span>
            </router-link>
          </ScrollReveal>
          <ScrollReveal :delay="150">
            <router-link to="/gallery" class="group flex flex-col items-center gap-3 p-6 rounded-2xl glass-card text-center hover:border-accent-2/20">
              <div class="w-12 h-12 rounded-xl bg-accent-2/10 flex items-center justify-center group-hover:bg-accent-2/15 transition-colors">
                <Camera :size="22" class="text-accent-2" />
              </div>
              <span class="text-sm font-bold text-zinc-700">图库</span>
              <span class="text-xs text-zinc-400">{{ overview?.gallery || 0 }} 张</span>
            </router-link>
          </ScrollReveal>
          <ScrollReveal :delay="200">
            <router-link to="/diary" class="group flex flex-col items-center gap-3 p-6 rounded-2xl glass-card text-center hover:border-accent-3/20">
              <div class="w-12 h-12 rounded-xl bg-accent-3/10 flex items-center justify-center group-hover:bg-accent-3/15 transition-colors">
                <BookOpen :size="22" class="text-accent-3" />
              </div>
              <span class="text-sm font-bold text-zinc-700">日记</span>
              <span class="text-xs text-zinc-400">{{ overview?.diary || 0 }} 篇</span>
            </router-link>
          </ScrollReveal>
        </div>
      </section>

      <!-- Articles -->
      <section v-if="featuredArticles.length" class="relative px-6 pb-16">
        <div class="max-w-4xl mx-auto">
          <ScrollReveal>
            <div class="flex items-end justify-between mb-8">
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <span class="section-dot" />
                  <span class="text-[11px] font-bold text-accent uppercase tracking-widest">Latest Posts</span>
                </div>
                <h2 class="text-2xl sm:text-3xl font-extrabold text-zinc-800">最新文章</h2>
              </div>
              <router-link to="/blog" class="group hidden sm:flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-2 transition-colors">
                全部文章 <ChevronRight :size="15" class="transition-transform group-hover:translate-x-0.5" />
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
            <div class="flex items-end justify-between mb-8">
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <span class="section-dot" style="background:#8B5CF6;box-shadow:0 0 8px rgba(139,92,246,0.4)" />
                  <span class="text-[11px] font-bold text-accent-2 uppercase tracking-widest">Gallery</span>
                </div>
                <h2 class="text-2xl sm:text-3xl font-extrabold text-zinc-800">精选图库</h2>
              </div>
              <router-link to="/gallery" class="group hidden sm:flex items-center gap-1 text-sm font-semibold text-accent-2 hover:text-accent transition-colors">
                全部图片 <ChevronRight :size="15" class="transition-transform group-hover:translate-x-0.5" />
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
          <div class="py-16 rounded-3xl glass-card">
            <Sparkles :size="32" class="text-zinc-300 mx-auto mb-4" />
            <p class="text-zinc-400 text-sm">还没有内容，去管理后台发布第一篇吧</p>
          </div>
        </section>
      </ScrollReveal>
    </template>
  </div>
</template>

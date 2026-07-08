<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getArticles, getSubsets, getLabels } from '@/api'
import type { ArticleDate, SubsetData, LabelData } from '@/types'
import ArticleCard from '@/components/ArticleCard.vue'
import CategoryFilter from '@/components/CategoryFilter.vue'
import TagCloud from '@/components/TagCloud.vue'
import Pagination from '@/components/Pagination.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import EmptyState from '@/components/EmptyState.vue'
import ScrollReveal from '@/components/ScrollReveal.vue'
import { Search, X, PenLine } from 'lucide-vue-next'
import { getList } from '@/utils/helpers'

const route = useRoute()
const articles = ref<ArticleDate[]>([])
const subsets = ref<SubsetData[]>([])
const labels = ref<LabelData[]>([])
const totalCount = ref(0)
const loading = ref(true)
const currentPage = ref(1); const pageSize = 8
const selectedSubset = ref<number | undefined>(-1)
const selectedLabel = ref<string | undefined>()
const searchTerm = ref('')
const baseImgPath = 'http://localhost:3000/files'

async function fetchArticles() {
  loading.value = true
  try {
    const res = await getArticles({ pageSize, nowPage: currentPage.value, subsetId: selectedSubset.value, label: selectedLabel.value, serchTerm: searchTerm.value || undefined })
    if (res.code === 200 && res.data) { articles.value = getList<ArticleDate>(res.data); totalCount.value = res.data.count }
  } catch { /* */ }
  loading.value = false
}
onMounted(async () => {
  try { const [s, l] = await Promise.all([getSubsets(0), getLabels()]); if (s.code===200&&s.data) subsets.value = getList<SubsetData>(s.data); if (l.code===200) labels.value = l.data||[] } catch { /* */ }
  if (route.query.q) searchTerm.value = String(route.query.q)
  await fetchArticles()
})
function onSubsetChange(id: number | undefined) { selectedSubset.value=id; selectedLabel.value=undefined; currentPage.value=1; fetchArticles() }
function onLabelSelect(label: string | undefined) { selectedLabel.value=label; selectedSubset.value=undefined; currentPage.value=1; fetchArticles() }
function onSearch() { currentPage.value=1; fetchArticles() }
function clearSearch() { searchTerm.value=''; currentPage.value=1; fetchArticles() }
function onPageChange(p: number) { currentPage.value=p; window.scrollTo({top:0,behavior:'smooth'}); fetchArticles() }
</script>

<template>
  <div class="relative min-h-screen">
    <div class="pt-16 sm:pt-24 pb-16 max-w-4xl mx-auto px-6">
      <ScrollReveal>
        <div class="mb-10">
          <div class="flex items-center gap-2 mb-2">
            <span class="section-dot" />
            <span class="text-[11px] font-bold text-accent uppercase tracking-widest">Blog</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-zinc-800">博客</h1>
          <div class="flex items-center gap-2 mt-1.5">
            <PenLine :size="13" class="text-zinc-400" />
            <p class="text-zinc-400 text-sm" v-if="totalCount >= 0">共 {{ totalCount }} 篇文章</p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal :delay="50">
        <div class="relative mb-6">
          <Search :size="16" class="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input v-model="searchTerm" type="text" placeholder="搜索文章..." class="w-full pl-11 pr-12 py-3 rounded-2xl glass-card text-sm focus:outline-none transition-all duration-300" @keyup.enter="onSearch" />
          <button v-if="searchTerm" @click="clearSearch" class="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/50 transition-colors"><X :size="14" class="text-zinc-400" /></button>
        </div>
      </ScrollReveal>

      <div class="space-y-4 mb-8">
        <CategoryFilter v-if="subsets.length" :subsets="subsets" :selected="selectedSubset" @select="onSubsetChange" />
        <TagCloud v-if="labels.length" :labels="labels" :selected="selectedLabel" @select="onLabelSelect" />
      </div>

      <LoadingSpinner v-if="loading" />
      <EmptyState v-else-if="!articles.length" description="暂无文章" />
      <div v-else class="space-y-4">
        <ScrollReveal v-for="(a,i) in articles" :key="a.id" :delay="i*60">
          <ArticleCard :article="a" :base-img-path="baseImgPath" />
        </ScrollReveal>
      </div>
      <Pagination :current="currentPage" :total="totalCount" :page-size="pageSize" @change="onPageChange" />
    </div>
  </div>
</template>

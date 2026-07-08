<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getArticles, getSubsets, getLabels } from '@/api'
import type { ArticleDate, SubsetData, LabelData } from '@/types'
import ArticleCard from '@/components/ArticleCard.vue'
import CategoryFilter from '@/components/CategoryFilter.vue'
import TagCloud from '@/components/TagCloud.vue'
import Pagination from '@/components/Pagination.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import EmptyState from '@/components/EmptyState.vue'
import { Search } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const articles = ref<ArticleDate[]>([])
const subsets = ref<SubsetData[]>([])
const labels = ref<LabelData[]>([])
const totalCount = ref(0)
const loading = ref(true)

const currentPage = ref(1)
const pageSize = 8
const selectedSubset = ref<number | undefined>(-1)
const selectedLabel = ref<string | undefined>()
const searchTerm = ref('')

const baseImgPath = 'http://localhost:3000/files'

async function fetchArticles() {
  loading.value = true
  try {
    const res = await getArticles({
      pageSize,
      nowPage: currentPage.value,
      subsetId: selectedSubset.value,
      label: selectedLabel.value,
      serchTerm: searchTerm.value || undefined,
    })
    if (res.code === 200 && res.data) {
      articles.value = res.data.list || []
      totalCount.value = res.data.count
    }
  } catch { /* ignore */ }
  loading.value = false
}

onMounted(async () => {
  try {
    const [sRes, lRes] = await Promise.all([getSubsets(0), getLabels()])
    if (sRes.code === 200 && sRes.data) subsets.value = sRes.data.list || []
    if (lRes.code === 200) labels.value = lRes.data || []
  } catch { /* ignore */ }
  // Restore filters from query
  if (route.query.subset) selectedSubset.value = Number(route.query.subset)
  if (route.query.label) selectedLabel.value = String(route.query.label)
  if (route.query.q) searchTerm.value = String(route.query.q)
  await fetchArticles()
})

function onSubsetChange(id: number | undefined) {
  selectedSubset.value = id
  selectedLabel.value = undefined
  currentPage.value = 1
  fetchArticles()
}

function onLabelSelect(label: string | undefined) {
  selectedLabel.value = label
  selectedSubset.value = undefined
  currentPage.value = 1
  fetchArticles()
}

function onSearch() {
  currentPage.value = 1
  router.replace({ query: { q: searchTerm.value || undefined } })
  fetchArticles()
}

function clearSearch() {
  searchTerm.value = ''
  currentPage.value = 1
  router.replace({ query: {} })
  fetchArticles()
}

function onPageChange(p: number) {
  currentPage.value = p
  window.scrollTo({ top: 0, behavior: 'smooth' })
  fetchArticles()
}
</script>

<template>
  <div class="pt-20 pb-16">
    <div class="max-w-4xl mx-auto px-6">
      <!-- Header -->
      <div class="mb-10">
        <h1 class="text-3xl font-extrabold text-apple-gray-700">博客</h1>
        <p class="mt-2 text-apple-gray-400">共 {{ totalCount }} 篇文章</p>
      </div>

      <!-- Search -->
      <div class="relative mb-8">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="搜索文章..."
          class="w-full px-4 py-3 pl-11 rounded-2xl border border-apple-gray-200 text-sm focus:outline-none focus:border-apple-blue focus:ring-4 focus:ring-apple-blue/5 transition-all"
          @keyup.enter="onSearch"
        />
        <Search :size="17" class="absolute left-4 top-1/2 -translate-y-1/2 text-apple-gray-300" />
        <button
          v-if="searchTerm"
          @click="clearSearch"
          class="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-apple-blue hover:text-apple-blue-hover transition-colors"
        >
          清除
        </button>
      </div>

      <!-- Filters -->
      <div class="space-y-4 mb-8">
        <CategoryFilter
          v-if="subsets.length"
          :subsets="subsets"
          :selected="selectedSubset"
          @select="onSubsetChange"
        />
        <TagCloud
          v-if="labels.length"
          :labels="labels"
          :selected="selectedLabel"
          @select="onLabelSelect"
        />
      </div>

      <!-- Articles -->
      <LoadingSpinner v-if="loading" />
      <EmptyState v-else-if="!articles.length" description="暂无文章" />
      <div v-else class="space-y-3">
        <ArticleCard
          v-for="a in articles"
          :key="a.id"
          :article="a"
          :base-img-path="baseImgPath"
        />
      </div>

      <Pagination
        :current="currentPage"
        :total="totalCount"
        :page-size="pageSize"
        @change="onPageChange"
      />
    </div>
  </div>
</template>

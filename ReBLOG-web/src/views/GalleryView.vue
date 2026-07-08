<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getGallery, getSubsets } from '@/api'
import type { ArticleDate, SubsetData } from '@/types'
import GalleryCard from '@/components/GalleryCard.vue'
import CategoryFilter from '@/components/CategoryFilter.vue'
import Pagination from '@/components/Pagination.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import EmptyState from '@/components/EmptyState.vue'
import ScrollReveal from '@/components/ScrollReveal.vue'
import { getList } from '@/utils/helpers'

const items = ref<ArticleDate[]>([]); const subsets = ref<SubsetData[]>([]); const totalCount = ref(0); const loading = ref(true)
const currentPage = ref(1); const selectedSubset = ref<number | undefined>(-1)
const pageSize = 12; const baseImgPath = 'http://localhost:3000/files'

async function fetchItems() {
  loading.value = true
  try { const res = await getGallery({ pageSize, nowPage: currentPage.value, subsetId: selectedSubset.value }); if (res.code === 200 && res.data) { items.value = getList<ArticleDate>(res.data); totalCount.value = res.data.count } } catch { /* */ }
  loading.value = false
}
onMounted(async () => {
  try { const sRes = await getSubsets(1); if (sRes.code === 200 && sRes.data) subsets.value = getList<SubsetData>(sRes.data) } catch { /* */ }
  await fetchItems()
})
function onSubsetChange(id: number | undefined) { selectedSubset.value = id; currentPage.value = 1; fetchItems() }
function onPageChange(p: number) { currentPage.value = p; window.scrollTo({ top: 0, behavior: 'smooth' }); fetchItems() }
</script>

<template>
  <div class="relative min-h-screen">
    <div class="pt-16 sm:pt-24 pb-16 max-w-6xl mx-auto px-6">
      <ScrollReveal>
        <div class="mb-10">
          <p class="text-xs font-bold text-accent-2 uppercase tracking-widest mb-2">Gallery</p>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-zinc-800">图库</h1>
          <p class="mt-1.5 text-zinc-400 text-sm" v-if="totalCount >= 0">共 {{ totalCount }} 张</p>
        </div>
      </ScrollReveal>
      <CategoryFilter v-if="subsets.length" :subsets="subsets" :selected="selectedSubset" @select="onSubsetChange" class="mb-8" />
      <LoadingSpinner v-if="loading" />
      <EmptyState v-else-if="!items.length" description="暂无图片" />
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        <ScrollReveal v-for="(g,i) in items" :key="g.id" :delay="i*40"><GalleryCard :item="g" :base-img-path="baseImgPath" /></ScrollReveal>
      </div>
      <Pagination :current="currentPage" :total="totalCount" :page-size="pageSize" @change="onPageChange" />
    </div>
  </div>
</template>

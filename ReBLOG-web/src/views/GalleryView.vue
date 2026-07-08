<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getGallery, getSubsets } from '@/api'
import type { ArticleDate, SubsetData } from '@/types'
import GalleryCard from '@/components/GalleryCard.vue'
import CategoryFilter from '@/components/CategoryFilter.vue'
import Pagination from '@/components/Pagination.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import EmptyState from '@/components/EmptyState.vue'
import { getList } from '@/utils/helpers'

const items = ref<ArticleDate[]>([])
const subsets = ref<SubsetData[]>([])
const totalCount = ref(0)
const loading = ref(true)
const currentPage = ref(1)
const selectedSubset = ref<number | undefined>(-1)
const pageSize = 12

const baseImgPath = 'http://localhost:3000/files'

async function fetchItems() {
  loading.value = true
  try {
    const res = await getGallery({ pageSize, nowPage: currentPage.value, subsetId: selectedSubset.value })
    if (res.code === 200 && res.data) {
      items.value = getList<ArticleDate>(res.data)
      totalCount.value = res.data.count
    }
  } catch { /* ignore */ }
  loading.value = false
}

onMounted(async () => {
  try {
    const sRes = await getSubsets(1)
    if (sRes.code === 200 && sRes.data) subsets.value = getList<SubsetData>(sRes.data)
  } catch { /* ignore */ }
  await fetchItems()
})

function onSubsetChange(id: number | undefined) {
  selectedSubset.value = id
  currentPage.value = 1
  fetchItems()
}

function onPageChange(p: number) {
  currentPage.value = p
  window.scrollTo({ top: 0, behavior: 'smooth' })
  fetchItems()
}
</script>

<template>
  <div class="pt-20 pb-16">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Header -->
      <div class="mb-10">
        <h1 class="text-3xl font-extrabold text-apple-gray-700">图库</h1>
        <p class="mt-2 text-apple-gray-400">共 {{ totalCount }} 张</p>
      </div>

      <CategoryFilter
        v-if="subsets.length"
        :subsets="subsets"
        :selected="selectedSubset"
        @select="onSubsetChange"
        class="mb-8"
      />

      <LoadingSpinner v-if="loading" />
      <EmptyState v-else-if="!items.length" description="暂无图片" />
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <GalleryCard
          v-for="g in items"
          :key="g.id"
          :item="g"
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

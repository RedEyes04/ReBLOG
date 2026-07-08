<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getDiaries } from '@/api'
import type { DiaryDate } from '@/types'
import DiaryCard from '@/components/DiaryCard.vue'
import Pagination from '@/components/Pagination.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import EmptyState from '@/components/EmptyState.vue'
import { Search } from 'lucide-vue-next'
import { getList } from '@/utils/helpers'

const diaries = ref<DiaryDate[]>([])
const totalCount = ref(0)
const loading = ref(true)
const currentPage = ref(1)
const searchTerm = ref('')
const pageSize = 6

async function fetchDiaries() {
  loading.value = true
  try {
    const res = await getDiaries({
      pageSize,
      nowPage: currentPage.value,
      serchTerm: searchTerm.value || undefined,
    })
    if (res.code === 200 && res.data) {
      diaries.value = getList<DiaryDate>(res.data)
      totalCount.value = res.data.count
    }
  } catch { /* ignore */ }
  loading.value = false
}

onMounted(() => fetchDiaries())

function onSearch() {
  currentPage.value = 1
  fetchDiaries()
}

function clearSearch() {
  searchTerm.value = ''
  currentPage.value = 1
  fetchDiaries()
}

function onPageChange(p: number) {
  currentPage.value = p
  window.scrollTo({ top: 0, behavior: 'smooth' })
  fetchDiaries()
}
</script>

<template>
  <div class="pt-20 pb-16">
    <div class="max-w-2xl mx-auto px-6">
      <!-- Header -->
      <div class="mb-10">
        <h1 class="text-3xl font-extrabold text-apple-gray-700">日记</h1>
        <p class="mt-2 text-apple-gray-400">共 {{ totalCount }} 篇</p>
      </div>

      <!-- Search -->
      <div class="relative mb-8">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="搜索日记..."
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

      <LoadingSpinner v-if="loading" />
      <EmptyState v-else-if="!diaries.length" description="暂无日记" />
      <div v-else class="space-y-3">
        <DiaryCard v-for="d in diaries" :key="d.id" :diary="d" />
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

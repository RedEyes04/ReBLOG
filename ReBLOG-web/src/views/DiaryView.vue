<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getDiaries } from '@/api'
import type { DiaryDate } from '@/types'
import DiaryCard from '@/components/DiaryCard.vue'
import Pagination from '@/components/Pagination.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import EmptyState from '@/components/EmptyState.vue'
import ScrollReveal from '@/components/ScrollReveal.vue'
import { Search, X } from 'lucide-vue-next'
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
    const res = await getDiaries({ pageSize, nowPage: currentPage.value, serchTerm: searchTerm.value || undefined })
    if (res.code === 200 && res.data) {
      diaries.value = getList<DiaryDate>(res.data)
      totalCount.value = res.data.count
    }
  } catch { /* ignore */ }
  loading.value = false
}

onMounted(() => fetchDiaries())

function onSearch() { currentPage.value = 1; fetchDiaries() }
function clearSearch() { searchTerm.value = ''; currentPage.value = 1; fetchDiaries() }
function onPageChange(p: number) { currentPage.value = p; window.scrollTo({ top: 0, behavior: 'smooth' }); fetchDiaries() }
</script>

<template>
  <div class="bg-aurora min-h-screen">
    <div class="pt-20 pb-16 max-w-2xl mx-auto px-6">
      <ScrollReveal>
        <div class="mb-10">
          <p class="text-xs font-semibold text-apple-blue uppercase tracking-widest mb-2">Diary</p>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-apple-gray-700">日记</h1>
          <p class="mt-1.5 text-apple-gray-400 text-sm" v-if="totalCount >= 0">共 {{ totalCount }} 篇</p>
        </div>
      </ScrollReveal>

      <div class="relative mb-8">
        <Search :size="16" class="absolute left-4 top-1/2 -translate-y-1/2 text-apple-gray-300" />
        <input
          v-model="searchTerm" type="text" placeholder="搜索日记..."
          class="w-full pl-11 pr-12 py-3 rounded-2xl glass-card text-sm focus:outline-none transition-all duration-300"
          @keyup.enter="onSearch"
        />
        <button v-if="searchTerm" @click="clearSearch" class="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-black/5 transition-colors">
          <X :size="14" class="text-apple-gray-400" />
        </button>
      </div>

      <LoadingSpinner v-if="loading" />
      <EmptyState v-else-if="!diaries.length" description="暂无日记" />

      <div v-else class="space-y-4">
        <ScrollReveal v-for="(d, i) in diaries" :key="d.id" :delay="i * 60">
          <DiaryCard :diary="d" />
        </ScrollReveal>
      </div>

      <Pagination :current="currentPage" :total="totalCount" :page-size="pageSize" @change="onPageChange" />
    </div>
  </div>
</template>

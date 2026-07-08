<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getDiaries } from '@/api'
import type { DiaryDate } from '@/types'
import DiaryCard from '@/components/DiaryCard.vue'
import Pagination from '@/components/Pagination.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import EmptyState from '@/components/EmptyState.vue'
import ScrollReveal from '@/components/ScrollReveal.vue'
import { Search, X, BookOpen } from 'lucide-vue-next'
import { getList } from '@/utils/helpers'

const diaries=ref<DiaryDate[]>([]); const totalCount=ref(0); const loading=ref(true)
const currentPage=ref(1); const searchTerm=ref(''); const pageSize=6

async function fetchDiaries(){loading.value=true;try{const r=await getDiaries({pageSize,nowPage:currentPage.value,serchTerm:searchTerm.value||undefined});if(r.code===200&&r.data){diaries.value=getList<DiaryDate>(r.data);totalCount.value=r.data.count}}catch{/* */};loading.value=false}
onMounted(()=>fetchDiaries())
function onSearch(){currentPage.value=1;fetchDiaries()}
function clearSearch(){searchTerm.value='';currentPage.value=1;fetchDiaries()}
function onPageChange(p:number){currentPage.value=p;window.scrollTo({top:0,behavior:'smooth'});fetchDiaries()}
</script>

<template>
  <div class="relative min-h-screen">
    <div class="pt-16 sm:pt-24 pb-16 max-w-2xl mx-auto px-6">
      <ScrollReveal>
        <div class="mb-10">
          <div class="flex items-center gap-2 mb-2">
            <span class="section-dot" style="background:#EC4899;box-shadow:0 0 8px rgba(236,72,153,0.4)" />
            <span class="text-[11px] font-bold text-accent-3 uppercase tracking-widest">Diary</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-zinc-800">日记</h1>
          <div class="flex items-center gap-2 mt-1.5">
            <BookOpen :size="13" class="text-zinc-400" />
            <p class="text-zinc-400 text-sm" v-if="totalCount>=0">共 {{ totalCount }} 篇</p>
          </div>
        </div>
      </ScrollReveal>

      <div class="relative mb-8">
        <Search :size="16" class="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
        <input v-model="searchTerm" type="text" placeholder="搜索日记..." class="w-full pl-11 pr-12 py-3 rounded-2xl glass-card text-sm focus:outline-none transition-all duration-300" @keyup.enter="onSearch" />
        <button v-if="searchTerm" @click="clearSearch" class="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/50 transition-colors"><X :size="14" class="text-zinc-400" /></button>
      </div>

      <LoadingSpinner v-if="loading" />
      <EmptyState v-else-if="!diaries.length" description="暂无日记" />

      <!-- Timeline -->
      <div v-else class="relative">
        <!-- Vertical line -->
        <div class="absolute left-[22px] sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent-3/30 via-accent/20 to-transparent hidden sm:block" />
        <div class="space-y-6">
          <ScrollReveal v-for="(d,i) in diaries" :key="d.id" :delay="i*80">
            <!-- Timeline dot on desktop -->
            <div class="relative">
              <div class="hidden sm:flex absolute left-[18px] top-8 w-3 h-3 rounded-full bg-accent-3/20 border-2 border-accent-3/40 z-10" />
              <DiaryCard :diary="d" />
            </div>
          </ScrollReveal>
        </div>
      </div>

      <Pagination :current="currentPage" :total="totalCount" :page-size="pageSize" @change="onPageChange" />
    </div>
  </div>
</template>

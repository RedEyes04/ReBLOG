<script setup lang="ts">
import type { ReplyData } from '@/types'
import { MessageCircle, User, Send } from 'lucide-vue-next'
import { ref, onMounted } from 'vue'
import { getComments, postComment } from '@/api'
import { getList } from '@/utils/helpers'

const props = defineProps<{ articleId: number }>()
const comments = ref<ReplyData[]>([])
const loading = ref(true)
const newComment = ref({ userName: '', content: '' })
const submitting = ref(false)

async function fetchComments() {
  loading.value = true
  try {
    const res = await getComments({ articleId: props.articleId, pageSize: 50, nowPage: 1 })
    if (res.code === 200 && res.data) comments.value = getList<ReplyData>(res.data)
  } catch { /* ignore */ }
  loading.value = false
}

async function submitComment() {
  if (!newComment.value.userName.trim() || !newComment.value.content.trim()) return
  submitting.value = true
  try {
    await postComment({
      articleId: props.articleId,
      userId: 'visitor_' + Date.now(),
      userName: newComment.value.userName.trim(),
      content: newComment.value.content.trim(),
    })
    newComment.value = { userName: '', content: '' }
    await fetchComments()
  } catch { /* ignore */ }
  submitting.value = false
}

function formatDate(date: string) {
  const d = new Date(date); const now = new Date()
  const diff = now.getTime() - d.getTime()
  if (diff < 120 * 1000) return '刚刚'
  if (diff < 60 * 60 * 1000) return `${Math.ceil(diff / 60000)} 分钟前`
  if (d.getFullYear() === now.getFullYear()) return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
}

onMounted(fetchComments)
</script>

<template>
  <div class="mt-16 pt-12 border-t border-black/5">
    <h3 class="text-xl font-bold text-apple-gray-700 flex items-center gap-2 mb-8">
      <MessageCircle :size="18" />
      评论
      <span class="text-sm font-normal text-apple-gray-400">({{ comments.length }})</span>
    </h3>

    <!-- Form -->
    <div class="flex flex-col sm:flex-row gap-3 mb-8">
      <input v-model="newComment.userName" type="text" placeholder="昵称" maxlength="20"
        class="sm:w-32 px-4 py-2.5 rounded-2xl glass-card text-sm focus:outline-none transition-all duration-300" />
      <div class="flex-1 flex gap-2">
        <input v-model="newComment.content" type="text" placeholder="写下你的想法..." maxlength="500"
          class="flex-1 px-4 py-2.5 rounded-2xl glass-card text-sm focus:outline-none transition-all duration-300"
          @keyup.enter="submitComment" />
        <button @click="submitComment"
          :disabled="submitting || !newComment.userName.trim() || !newComment.content.trim()"
          class="px-4 py-2.5 rounded-2xl bg-apple-gray-700 text-white text-sm font-medium hover:bg-black disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-black/10">
          <Send v-if="!submitting" :size="15" />
          <span v-else class="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </button>
      </div>
    </div>

    <!-- List -->
    <div v-if="loading" class="text-sm text-apple-gray-400 py-8 text-center">加载中...</div>
    <div v-else-if="!comments.length" class="text-sm text-apple-gray-300 py-8 text-center">暂无评论，来说点什么吧</div>
    <div v-else class="space-y-5">
      <div v-for="c in comments" :key="c.id" class="flex gap-3 group">
        <div class="shrink-0 w-9 h-9 rounded-full glass-card flex items-center justify-center">
          <User :size="15" class="text-apple-gray-400" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-sm font-semibold text-apple-gray-700">{{ c.user_name }}</span>
            <span class="text-[11px] text-apple-gray-300">{{ formatDate(c.moment) }}</span>
          </div>
          <p class="text-sm text-apple-gray-500 leading-relaxed">{{ c.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

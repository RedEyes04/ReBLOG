<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="pt-14">
    <div class="max-w-6xl mx-auto px-6 py-24 text-center">
      <p class="text-8xl font-extrabold text-apple-gray-200 mb-4">404</p>
      <p class="text-xl text-apple-gray-400 mb-8">页面不存在</p>
      <button
        @click="router.push('/')"
        class="px-6 py-2.5 rounded-full bg-apple-blue text-white text-sm font-medium hover:bg-apple-blue-hover transition-colors"
      >
        返回首页
      </button>
    </div>
  </div>
</template>

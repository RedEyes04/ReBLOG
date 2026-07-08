<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<template>
  <div class="min-h-screen flex items-center justify-center px-6">
    <div class="text-center">
      <p class="text-8xl sm:text-9xl font-extrabold font-display bg-clip-text text-transparent bg-gradient-to-r from-accent via-accent-2 to-accent-3 mb-6">404</p>
      <p class="text-lg text-zinc-500 mb-8">页面不存在，也许它从未存在过</p>
      <button @click="router.push('/')" class="px-6 py-3 rounded-2xl bg-zinc-800 text-white text-sm font-semibold hover:bg-zinc-900 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-800/15 hover:-translate-y-0.5">返回首页</button>
    </div>
  </div>
</template>

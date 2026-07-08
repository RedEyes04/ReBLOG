<script setup lang="ts">
import { useRoute } from 'vue-router'
import { Home, FileText, Image, BookOpen, User, Github } from 'lucide-vue-next'

const route = useRoute()
const navLinks = [
  { path: '/', label: '首页', icon: Home },
  { path: '/blog', label: '博客', icon: FileText },
  { path: '/gallery', label: '图库', icon: Image },
  { path: '/diary', label: '日记', icon: BookOpen },
]

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <!-- Desktop: left floating sidebar -->
  <aside class="fixed left-4 top-[50%] z-50 hidden lg:block" style="transform:translateY(-50%)">
    <nav class="flex flex-col items-center gap-1 p-2 rounded-3xl glass-heavy">
      <router-link to="/" class="p-2 mb-2">
        <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center shadow-lg shadow-accent/20 transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 hover:scale-105">
          <User :size="18" class="text-white" />
        </div>
      </router-link>

      <router-link
        v-for="link in navLinks" :key="link.path" :to="link.path"
        class="relative flex flex-col items-center gap-0.5 p-2.5 rounded-2xl transition-all duration-300 group"
        :class="isActive(link.path) ? 'text-accent' : 'text-zinc-400 hover:text-zinc-700'"
      >
        <component :is="link.icon" :size="18" />
        <span class="text-[10px] font-medium leading-none">{{ link.label }}</span>
        <span v-if="isActive(link.path)" class="absolute inset-0 rounded-2xl bg-accent/8 -z-10" />
      </router-link>

      <div class="w-6 h-px bg-zinc-200 my-2" />
      <a href="https://github.com/RedEyes04" target="_blank" class="p-2.5 rounded-2xl text-zinc-400 hover:text-zinc-700 transition-all duration-300 hover:bg-white/50">
        <Github :size="17" />
      </a>
    </nav>
  </aside>

  <!-- Mobile: bottom floating bar -->
  <nav class="lg:hidden fixed bottom-0 inset-x-0 z-50 px-4 pb-5">
    <div class="glass-heavy rounded-2xl mx-auto max-w-sm flex items-center justify-around py-2 px-1">
      <router-link
        v-for="link in navLinks" :key="link.path" :to="link.path"
        class="flex flex-col items-center gap-0.5 p-2 rounded-xl transition-all duration-300 min-w-[56px]"
        :class="isActive(link.path) ? 'text-accent' : 'text-zinc-400'"
      >
        <component :is="link.icon" :size="18" />
        <span class="text-[10px] font-medium">{{ link.label }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Github, Heart, Rss } from 'lucide-vue-next'
</script>

<template>
  <footer class="relative border-t border-zinc-100/80 bg-white/40 backdrop-blur-xl">
    <div class="divider-gradient" />
    <div class="max-w-6xl mx-auto px-6 py-10">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <!-- Brand -->
        <div>
          <h3 class="text-lg font-extrabold text-zinc-800 font-display">ReBLOG</h3>
          <p class="mt-2 text-sm text-zinc-400 leading-relaxed">
            一个关于技术、设计与日常<br />的私人博客空间。
          </p>
          <div class="flex items-center gap-3 mt-4">
            <a href="https://github.com/RedEyes04" target="_blank" class="p-2 rounded-xl glass-sm text-zinc-400 hover:text-zinc-700 transition-all duration-300 hover:bg-white/60">
              <Github :size="16" />
            </a>
            <a href="#" class="p-2 rounded-xl glass-sm text-zinc-400 hover:text-zinc-700 transition-all duration-300 hover:bg-white/60">
              <Rss :size="16" />
            </a>
          </div>
        </div>

        <!-- Links -->
        <div>
          <h4 class="text-sm font-bold text-zinc-600 mb-3">导航</h4>
          <div class="space-y-2">
            <router-link to="/blog" class="block text-sm text-zinc-400 hover:text-zinc-700 transition-colors">博客</router-link>
            <router-link to="/gallery" class="block text-sm text-zinc-400 hover:text-zinc-700 transition-colors">图库</router-link>
            <router-link to="/diary" class="block text-sm text-zinc-400 hover:text-zinc-700 transition-colors">日记</router-link>
          </div>
        </div>

        <!-- About -->
        <div>
          <h4 class="text-sm font-bold text-zinc-600 mb-3">关于</h4>
          <p class="text-sm text-zinc-400 leading-relaxed">
            使用 Vue 3 + Tailwind CSS 构建。<br />
            Apple 风格极简设计。
          </p>
          <p class="mt-2 text-xs text-zinc-300 flex items-center gap-1">
            Made with <Heart :size="10" class="text-accent-3 fill-accent-3" /> by REDEYES
          </p>
        </div>
      </div>

      <div class="mt-8 pt-6 border-t border-zinc-100/80 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-xs text-zinc-300">&copy; {{ new Date().getFullYear() }} ReBLOG. All rights reserved.</p>
        <p class="text-xs text-zinc-300">
          纵有疾风起，人生不言弃
        </p>
      </div>
    </div>
  </footer>
</template>

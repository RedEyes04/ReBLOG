<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Menu, X } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const mobileMenuOpen = ref(false)
const scrolled = ref(false)

const navLinks = [
  { path: '/', label: '首页' },
  { path: '/blog', label: '博客' },
  { path: '/gallery', label: '图库' },
  { path: '/diary', label: '日记' },
]

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

function onScroll() {
  scrolled.value = window.scrollY > 10
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="fixed top-0 inset-x-0 z-50 transition-all duration-300"
    :class="scrolled ? 'glass border-b border-black/5' : 'bg-transparent'"
  >
    <nav class="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
      <!-- Logo -->
      <router-link
        to="/"
        class="text-xl font-bold tracking-tight text-apple-gray-700 hover:text-apple-blue transition-colors duration-200"
      >
        ReBLOG
      </router-link>

      <!-- Desktop nav -->
      <div class="hidden sm:flex items-center gap-1">
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
          :class="
            isActive(link.path)
              ? 'text-apple-blue bg-apple-blue/8'
              : 'text-apple-gray-500 hover:text-apple-gray-700 hover:bg-black/5'
          "
        >
          {{ link.label }}
        </router-link>
      </div>

      <!-- Mobile menu button -->
      <button
        class="sm:hidden p-2 -mr-2 rounded-lg text-apple-gray-500 hover:text-apple-gray-700 hover:bg-black/5 transition-colors"
        @click="mobileMenuOpen = !mobileMenuOpen"
        aria-label="菜单"
      >
        <X v-if="mobileMenuOpen" :size="20" />
        <Menu v-else :size="20" />
      </button>
    </nav>

    <!-- Mobile menu -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileMenuOpen"
        class="sm:hidden glass border-b border-black/5 px-6 pb-4 pt-2"
      >
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200"
          :class="
            isActive(link.path)
              ? 'text-apple-blue bg-apple-blue/8'
              : 'text-apple-gray-500 hover:text-apple-gray-700 hover:bg-black/5'
          "
          @click="mobileMenuOpen = false"
        >
          {{ link.label }}
        </router-link>
      </div>
    </transition>
  </header>
</template>

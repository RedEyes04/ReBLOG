<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { Menu, X } from 'lucide-vue-next'

const route = useRoute()
const mobileMenuOpen = ref(false)
const scrolled = ref(false)
const hidden = ref(false)

let lastScrollY = 0
function onScroll() {
  const y = window.scrollY
  scrolled.value = y > 10
  hidden.value = y > lastScrollY && y > 200
  lastScrollY = y
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

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
</script>

<template>
  <header
    class="fixed top-0 inset-x-0 z-50 transition-all duration-500"
    :class="[
      hidden ? '-translate-y-full' : 'translate-y-0',
      scrolled ? 'glass-nav' : 'bg-transparent'
    ]"
  >
    <nav class="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
      <!-- Logo -->
      <router-link
        to="/"
        class="text-xl font-extrabold tracking-tight transition-all duration-300"
        :class="scrolled ? 'text-apple-gray-700' : 'text-apple-gray-700'"
      >
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-apple-gray-700 to-apple-gray-500">
          ReBLOG
        </span>
      </router-link>

      <!-- Desktop nav -->
      <div class="hidden sm:flex items-center gap-1">
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="relative px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-300"
          :class="
            isActive(link.path)
              ? 'text-apple-blue'
              : 'text-apple-gray-400 hover:text-apple-gray-700'
          "
        >
          {{ link.label }}
          <span
            v-if="isActive(link.path)"
            class="absolute inset-0 rounded-full bg-apple-blue/8 -z-10"
          />
        </router-link>
      </div>

      <!-- Mobile menu button -->
      <button
        class="sm:hidden p-2 -mr-2 rounded-full transition-all duration-300 hover:bg-black/5"
        @click="mobileMenuOpen = !mobileMenuOpen"
        aria-label="菜单"
      >
        <X v-if="mobileMenuOpen" :size="20" class="text-apple-gray-500" />
        <Menu v-else :size="20" class="text-apple-gray-500" />
      </button>
    </nav>

    <!-- Mobile menu -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-4 scale-95"
    >
      <div
        v-if="mobileMenuOpen"
        class="sm:hidden mx-4 mt-1 p-3 rounded-2xl glass-card"
      >
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="block px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
          :class="
            isActive(link.path)
              ? 'text-apple-blue bg-apple-blue/6'
              : 'text-apple-gray-400 hover:text-apple-gray-700 hover:bg-black/3'
          "
          @click="mobileMenuOpen = false"
        >
          {{ link.label }}
        </router-link>
      </div>
    </transition>
  </header>
</template>

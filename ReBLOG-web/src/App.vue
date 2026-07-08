<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#fafafa]">
    <NavBar />
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />
  </div>
</template>

<style>
.page-enter-active {
  transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.page-leave-active {
  transition: opacity 0.2s ease-in,
              transform 0.2s ease-in;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.995);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

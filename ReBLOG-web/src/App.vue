<script setup lang="ts">
import SideBar from '@/components/SideBar.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <SideBar />
    <main class="flex-1 lg:ml-24 pb-20 lg:pb-0">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style>
.page-enter-active {
  transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.page-leave-active {
  transition: opacity 0.2s ease-in, transform 0.2s ease-in;
}
.page-enter-from { opacity: 0; transform: translateY(16px) scale(0.99); }
.page-leave-to { opacity: 0; transform: translateY(-10px); }
</style>

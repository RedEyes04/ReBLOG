<template>
  <footer class="border-t border-black/5 bg-white/40 backdrop-blur-xl">
    <div class="max-w-6xl mx-auto px-6 py-8">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-sm text-apple-gray-400">
          &copy; {{ new Date().getFullYear() }} ReBLOG. All rights reserved.
        </p>
        <div class="flex items-center gap-6 text-sm text-apple-gray-400">
          <a href="#" class="hover:text-apple-gray-600 transition-colors duration-200">关于</a>
          <a href="#" class="hover:text-apple-gray-600 transition-colors duration-200">RSS</a>
          <a href="#" class="hover:text-apple-gray-600 transition-colors duration-200">隐私</a>
        </div>
      </div>
    </div>
  </footer>
</template>

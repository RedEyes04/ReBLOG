<template>
  <footer class="border-t border-apple-gray-100 bg-apple-gray-50">
    <div class="max-w-6xl mx-auto px-6 py-8">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-sm text-apple-gray-400">
          &copy; {{ new Date().getFullYear() }} ReBLOG. All rights reserved.
        </p>
        <div class="flex items-center gap-6 text-sm text-apple-gray-400">
          <a href="#" class="hover:text-apple-gray-600 transition-colors">关于</a>
          <a href="#" class="hover:text-apple-gray-600 transition-colors">RSS</a>
          <a href="#" class="hover:text-apple-gray-600 transition-colors">隐私政策</a>
        </div>
      </div>
    </div>
  </footer>
</template>

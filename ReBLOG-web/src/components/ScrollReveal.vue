<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  delay?: number
  threshold?: number
}>(), {
  delay: 0,
  threshold: 0.15,
})

const el = ref<HTMLElement>()
const visible = ref(false)

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!el.value) return
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => { visible.value = true }, props.delay)
        observer?.unobserve(entry.target)
      }
    },
    { threshold: props.threshold, rootMargin: '0px 0px -40px 0px' }
  )
  observer.observe(el.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div ref="el" :class="['reveal', { visible }]">
    <slot />
  </div>
</template>

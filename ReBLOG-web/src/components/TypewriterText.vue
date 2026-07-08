<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const phrases = [
  '记录思考，分享生活。',
  '纵有疾风起，人生不言弃。',
  '代码改变世界，文字记录时光。',
  '每一个bug都是一次成长。',
  '愿你我都能成为更好的自己。',
]

const displayText = ref('')
const cursorVisible = ref(true)
let timer: ReturnType<typeof setTimeout> | null = null
let cursorTimer: ReturnType<typeof setInterval> | null = null

async function typeLoop() {
  let phraseIndex = 0
  while (true) {
    const phrase = phrases[phraseIndex % phrases.length]
    // Type
    for (let i = 0; i <= phrase.length; i++) {
      displayText.value = phrase.slice(0, i)
      await delay(80 + Math.random() * 60)
    }
    // Pause
    await delay(2000)
    // Delete
    for (let i = phrase.length; i >= 0; i--) {
      displayText.value = phrase.slice(0, i)
      await delay(40 + Math.random() * 30)
    }
    await delay(400)
    phraseIndex++
  }
}

function delay(ms: number) {
  return new Promise<void>(resolve => {
    timer = setTimeout(resolve, ms)
  })
}

onMounted(() => {
  typeLoop()
  cursorTimer = setInterval(() => { cursorVisible.value = !cursorVisible.value }, 500)
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
  if (cursorTimer) clearInterval(cursorTimer)
})
</script>

<template>
  <span class="relative">
    {{ displayText }}
    <span
      class="inline-block w-[3px] h-[1em] align-middle ml-1 -mb-0.5 rounded-full transition-opacity duration-100"
      :class="cursorVisible ? 'bg-accent opacity-100' : 'bg-accent opacity-0'"
    />
  </span>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { animateOpen } from '@/utils/animation'

const caseElement = ref<HTMLElement | null>(null)
const isMobile = window.innerWidth < 640

onMounted(() => {
  if (caseElement.value) {
    animateOpen(caseElement.value, isMobile, {
      onComplete: () => {
        console.log('Case opened')
      },
    })
  }
})
</script>

<template>
  <div class="min-h-screen bg-bgDark flex items-center justify-center">
    <div
      ref="caseElement"
      class="w-full max-w-md bg-primary p-8 rounded-lg shadow-lg"
    >
      <h2 class="text-2xl font-bold text-black mb-4">开箱中...</h2>
      <div class="h-64 bg-accent rounded-lg flex items-center justify-center">
        <span class="text-xl font-bold">等待结果...</span>
      </div>
    </div>
  </div>
</template> 
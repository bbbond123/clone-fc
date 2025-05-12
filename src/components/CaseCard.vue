<script setup lang="ts">
import { ref, defineProps } from 'vue'

import { animateOpen } from '@/utils/animation'
import type { Case } from '@/types'

const props = defineProps<{
  caseItem: Case
}>()

const caseElement = ref<HTMLElement | null>(null)
const isMobile = window.innerWidth < 640

const openCase = () => {
  if (caseElement.value) {
    animateOpen(caseElement.value, isMobile, {
      onComplete: () => {
        console.log('Case opened:', props.caseItem.id)
      },
    })
  }
}
</script>

<template>
  <div ref="caseElement"
    class="relative bg-bg-dark rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
    <img :src="props.caseItem.image" :alt="props.caseItem.name" class="w-full h-48 object-cover" />
    <div class="p-4">
      <h3 class="text-lg font-semibold text-white mb-2">{{ props.caseItem.name }}</h3>
      <div class="flex justify-between items-center">
        <span class="text-primary">${{ props.caseItem.price.toFixed(2) }}</span>
        <button @click="openCase"
          class="bg-primary text-black px-4 py-2 rounded hover:bg-opacity-90 transition-colors duration-200">
          开箱
        </button>
      </div>
    </div>
  </div>
</template>
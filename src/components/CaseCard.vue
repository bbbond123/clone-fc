<script setup lang="ts">
import { ref } from 'vue'
import { animateOpen } from '@/utils/animation'

interface Case {
  id: string
  name: string
  price: number
  image: string
}

const props = defineProps<{
  case: Case
}>()

const caseElement = ref<HTMLElement | null>(null)
const isMobile = window.innerWidth < 640

const openCase = () => {
  if (caseElement.value) {
    animateOpen(caseElement.value, isMobile, {
      onComplete: () => {
        console.log('Case opened:', props.case.id)
      },
    })
  }
}
</script>

<template>
  <div
    ref="caseElement"
    class="relative bg-bg-dark rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
  >
    <img
      :src="case.image"
      :alt="case.name"
      class="w-full h-48 object-cover"
    />
    <div class="p-4">
      <h3 class="text-lg font-semibold text-white mb-2">{{ case.name }}</h3>
      <div class="flex justify-between items-center">
        <span class="text-primary">${{ case.price.toFixed(2) }}</span>
        <button
          @click="openCase"
          class="bg-primary text-black px-4 py-2 rounded hover:bg-opacity-90 transition-colors duration-200"
        >
          开箱
        </button>
      </div>
    </div>
  </div>
</template> 
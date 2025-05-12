<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'

import { Case, Skin } from '@/types'
import { mockOpenCase } from '@/api/mock'
import { useUserStore } from '@/store/user'
import { trackEvent } from '@/utils/analytics'
import { generateSpinItems } from '@/utils/random'
import { animateOpen } from '@/utils/animation'

interface IProps {
  selectedCase: Case
}

const props = defineProps<IProps>()

const emit = defineEmits<{
  close: []
  opened: [Skin]
}>()

// State
const isOpening = ref(false)
const skinItems = ref<Skin[]>([])
const selectedSkin = ref<Skin | null>(null)
const spinnerRef = ref<HTMLElement | null>(null)
const caseRef = ref<HTMLElement | null>(null)
const isMobile = computed(() => window.innerWidth < 640)
const displayItems = computed(() => skinItems.value.slice(0, 35))

// Helper function for skin rarity styling
const getRarityClass = (rarity: string) => {
  switch (rarity) {
    case 'legendary':
      return 'border-yellow-400 bg-yellow-900 bg-opacity-30'
    case 'rare':
      return 'border-red-500 bg-red-900 bg-opacity-30'
    case 'uncommon':
      return 'border-purple-500 bg-purple-900 bg-opacity-30'
    default:
      return 'border-blue-500 bg-blue-900 bg-opacity-30'
  }
}

// Store
const userStore = useUserStore()

// Open the case
const openCase = async () => {
  if (isOpening.value) return
  if (!userStore.canAffordCase(props.selectedCase.price)) {
    alert('Insufficient balance')
    return
  }

  try {
    isOpening.value = true

    // Deduct balance first
    userStore.updateBalance(-props.selectedCase.price)

    // Track analytics
    trackEvent({ action: 'open-case', caseId: props.selectedCase.id })

    // Animate case
    if (caseRef.value) {
      animateOpen(caseRef.value, isMobile.value)
    }

    // Wait for API result (simulate server-side roll)
    const result = await mockOpenCase(props.selectedCase.id)

    // Generate spin items with the result at the end
    const items = generateSpinItems(props.selectedCase.skins, result)
    skinItems.value = items
    selectedSkin.value = result

    // Start spinning animation
    if (spinnerRef.value) {
      const spinDistance = (items.length - 17) * 120 // 120px per item

      // GSAP animation for smooth spinning with easing
      gsap.to(spinnerRef.value, {
        x: -spinDistance,
        duration: 5,
        ease: 'power2.out',
        onComplete: () => {
          // Add to inventory after animation completes
          userStore.addSkinToInventory(result)
          emit('opened', result)
        },
      })
    }
  } catch (error) {
    console.error('Failed to open case:', error)
    // Return balance if error occurs
    userStore.updateBalance(props.selectedCase.price)
  }
}

// Handle resize
const handleResize = () => {
  // We could adjust animations based on screen size here
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="case-opening">
    <div class="case-container mb-8">
      <div ref="caseRef" class="case-image">
        <img :src="selectedCase.image" :alt="selectedCase.name" class="w-full h-auto" />
      </div>
    </div>

    <div class="spinner-container relative overflow-hidden my-4 h-32 border-2 border-accent rounded">
      <div class="center-marker absolute top-0 bottom-0 left-1/2 w-0.5 bg-accent z-10"></div>
      <div ref="spinnerRef" class="spinner-items flex transition-transform duration-300"
        :class="{ 'items-spinning': isOpening }">
        <div v-for="(item, index) in displayItems" :key="index" class="skin-item flex-shrink-0 w-30 px-2">
          <div class="skin-card border-2 rounded p-2 h-28" :class="getRarityClass(item.rarity)">
            <img :src="item.image" :alt="item.name" class="w-24 h-20 object-contain mx-auto" />
            <p class="text-xs text-center truncate mt-1">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="actions mt-8 flex justify-center">
      <button @click="openCase" :disabled="isOpening"
        class="bg-accent hover:bg-accent-dark text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
        :class="{ 'opacity-50 cursor-not-allowed': isOpening }">
        <span v-if="isOpening">Opening...</span>
        <span v-else>Open Case ({{ selectedCase.price }} Credits)</span>
      </button>

      <button @click="emit('close')"
        class="ml-4 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200">
        Close
      </button>
    </div>

    <div v-if="selectedSkin" class="result mt-8 text-center">
      <h3 class="text-xl font-bold mb-2">You received:</h3>
      <div class="skin-result inline-block p-4 rounded" :class="getRarityClass(selectedSkin.rarity)">
        <img :src="selectedSkin.image" :alt="selectedSkin.name" class="w-32 h-32 object-contain mx-auto" />
        <p class="text-lg font-bold mt-2">{{ selectedSkin.name }}</p>
        <p class="text-sm">Value: {{ selectedSkin.price }} Credits</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.case-opening {
  max-width: 800px;
  margin: 0 auto;
}

.center-marker {
  transform: translateX(-50%);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
}

.items-spinning {
  transition: transform 5s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.skin-item {
  width: 120px;
}
</style>
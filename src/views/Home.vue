<script setup lang="ts">
import { ref } from 'vue'
import CaseCard from '@/components/CaseCard.vue'
import DropBanner from '@/components/DropBanner.vue'

interface Case {
  id: string
  name: string
  price: number
  image: string
}

const cases = ref<Case[]>([
  {
    id: '1',
    name: 'Dragon Case',
    price: 5.99,
    image: '/assets/cases/dragon.png',
  },
  {
    id: '2',
    name: 'Butterfly Case',
    price: 7.99,
    image: '/assets/cases/butterfly.png',
  },
  {
    id: '3',
    name: 'Neon Case',
    price: 4.99,
    image: '/assets/cases/neon.png',
  },
])
</script>

<template>
  <div class="min-h-screen bg-bgDark">
    <DropBanner />
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-white mb-8">CS:GO 开箱模拟器</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CaseCard
          v-for="case in cases"
          :key="case.id"
          :case="case"
        />
      </div>
    </div>
  </div>
</template> 
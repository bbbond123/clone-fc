<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CaseCard from '@/components/CaseCard.vue'
import DropBanner from '@/components/DropBanner.vue'
import type { Case } from '@/types'

const { t } = useI18n()

const cases = ref<Case[]>([
  {
    id: '1',
    name: 'Dragon Case',
    price: 5.99,
    image: '/assets/img/cases-new/dragonfire-case-item.png',
  },
  {
    id: '2',
    name: 'Butterfly Case',
    price: 7.99,
    image: '/assets/img/cases-new/blade-runner-case-item.png',
  },
  {
    id: '3',
    name: 'Neon Case',
    price: 4.99,
    image: '/assets/img/cases-new/cyberpunk-2021-case-item.png',
  },
])
</script>

<template>
  <div class="min-h-screen bg-bgDark">
    <DropBanner />
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-white mb-8">{{ t('home.title') }}</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CaseCard v-for="caseItem in cases" :key="caseItem.id" :caseItem="caseItem" />
      </div>
    </div>
  </div>
</template>
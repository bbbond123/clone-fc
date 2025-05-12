<script setup lang="ts">
import { ref } from 'vue'

interface Item {
  id: string
  name: string
  type: string
  rarity: string
  image: string
}

const inventory = ref<Item[]>([
  {
    id: '1',
    name: 'AK-47 | Neon Revolution',
    type: 'Rifle',
    rarity: 'Covert',
    image: '/assets/skins/ak47-neon.png',
  },
  {
    id: '2',
    name: 'M4A4 | Asiimov',
    type: 'Rifle',
    rarity: 'Classified',
    image: '/assets/skins/m4a4-asiimov.png',
  },
  {
    id: '3',
    name: 'AWP | Dragon Lore',
    type: 'Sniper Rifle',
    rarity: 'Covert',
    image: '/assets/skins/awp-dragon-lore.png',
  },
])
</script>

<template>
  <div class="min-h-screen bg-bgDark">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-white mb-8">我的库存</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="item in inventory"
          :key="item.id"
          class="bg-bg-dark rounded-lg overflow-hidden shadow-md"
        >
          <img
            :src="item.image"
            :alt="item.name"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <h3 class="text-lg font-semibold text-white mb-2">{{ item.name }}</h3>
            <div class="flex justify-between text-sm">
              <span class="text-primary">{{ item.type }}</span>
              <span
                :class="{
                  'text-red-500': item.rarity === 'Covert',
                  'text-pink-500': item.rarity === 'Classified',
                }"
              >
                {{ item.rarity }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 
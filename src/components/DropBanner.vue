<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { mockRealtimeDrops } from '@/api/realtime'
import { animateDropBanner } from '@/utils/animation'

const drops = ref<{ user: string; skin: string }[]>([])
let unsubscribe: () => void

onMounted(() => {
  unsubscribe = mockRealtimeDrops((newDrops) => {
    drops.value = [...newDrops, ...drops.value].slice(0, 5) // Limit to 5 items
  })
})

onUnmounted(() => unsubscribe())
</script>

<template>
  <div class="fixed top-0 left-0 right-0 bg-bg-dark p-2 text-white z-50">
    <transition-group name="fade" tag="div">
      <div
        v-for="drop in drops"
        :key="drop.user + drop.skin"
        class="flex items-center justify-between py-1"
      >
        <span class="text-primary">{{ drop.user }}</span>
        <span>获得了</span>
        <span class="text-accent">{{ drop.skin }}</span>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 
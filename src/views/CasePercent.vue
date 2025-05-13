<script setup lang="ts">
// 幸运开箱页面
import { ref } from 'vue'

// 模拟武器数据
const weapons = ref([
  { id: 1, name: 'AWP | 龙王', image: '/images/awp.png', rarity: 'covert', isActive: false },
  { id: 2, name: 'M4A4 | 黑色魅影', image: '/images/m4a4.png', rarity: 'classified', isActive: false },
  { id: 3, name: 'AK-47 | 血腥运动', image: '/images/ak47.png', rarity: 'classified', isActive: false },
  { id: 4, name: 'USP-S | 枪响猎狐', image: '/images/usps.png', rarity: 'restricted', isActive: true },
  { id: 5, name: 'P90 | 二西莫夫', image: '/images/p90.png', rarity: 'restricted', isActive: false },
])

const rarityClasses = {
  'covert': 'border-red-500 bg-red-900/20',
  'classified': 'border-purple-500 bg-purple-900/20',
  'restricted': 'border-blue-500 bg-blue-900/20',
  'mil-spec': 'border-blue-400 bg-blue-800/20',
  'industrial': 'border-teal-400 bg-teal-800/20',
  'consumer': 'border-gray-400 bg-gray-800/20'
}
</script>

<template>
  <div class="min-h-screen bg-bgDark">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-white mb-8">幸运开箱</h1>
      
      <div class="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 class="text-xl font-bold text-white mb-4">开箱演示</h2>
        
        <!-- 武器滚动区域 -->
        <div class="relative overflow-hidden h-40 bg-gray-900 rounded-lg border border-gray-700">
          <div class="flex items-center h-full">
            <!-- 武器项目 -->
            <div 
              v-for="weapon in weapons" 
              :key="weapon.id"
              :class="[
                'weapon-item relative mx-1 w-32 h-32 p-2 border-2 rounded flex items-center justify-center transition-all',
                rarityClasses[weapon.rarity],
                weapon.isActive ? 'weapon-highlight scale-110 z-10' : 'scale-100'
              ]"
            >
              <div class="relative z-20 text-center">
                <div class="w-full h-20 flex items-center justify-center">
                  <div class="bg-gray-800/50 rounded-full w-16 h-16 flex items-center justify-center">
                    <!-- 这里应该是武器图片 -->
                    <div class="w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center text-white">
                      {{ weapon.id }}
                    </div>
                  </div>
                </div>
                <p class="text-white text-xs mt-2 font-medium truncate">{{ weapon.name }}</p>
              </div>
            </div>
          </div>
          
          <!-- 中央指示器 -->
          <div class="absolute top-0 left-1/2 h-full w-0.5 bg-highlight z-30 transform -translate-x-1/2"></div>
        </div>
        
        <button class="mt-6 bg-btn hover:bg-btn/80 text-white font-bold py-3 px-6 rounded-lg transition">
          开始开箱
        </button>
      </div>
      
      <div class="bg-gray-800 rounded-lg p-6 text-white">
        <h2 class="text-xl font-bold mb-4">关于幸运开箱</h2>
        <p>幸运开箱是一种特殊的开箱模式，让您有机会获得高价值的物品。旋转轮盘并等待您的幸运武器停在中央位置。高亮显示的武器是您的获得物品。</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weapon-item {
  flex-shrink: 0;
}
</style> 
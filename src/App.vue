<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
import { computed } from 'vue'
import Nav from '@/views/Nav.vue'

const { locale, t } = useI18n()
const metaDescription = computed(() =>
  locale.value === 'zh'
    ? 'CS:GO 开箱模拟器，支持多语言和响应式设计'
    : 'CS:GO case opening simulator with multi-language and responsive design'
)

useHead({
  htmlAttrs: { lang: locale },
  title: computed(() => t('meta.title')),
  meta: [
    { name: 'description', content: metaDescription },
    { name: 'keywords', content: 'CS:GO, case opening, skins, Flamecases, simulator' },
    { property: 'og:title', content: computed(() => t('meta.title')) },
    { property: 'og:description', content: metaDescription },
    { property: 'og:image', content: '/assets/share-image.png' },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-bgDark">
    <Nav>
      <!-- <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <router-link
            to="/"
            class="text-2xl font-bold text-primary"
          >
            Flamecases
          </router-link>
          <div class="flex space-x-4">
            <router-link
              to="/"
              class="text-white hover:text-primary transition-colors duration-200"
            >
              首页
            </router-link>
            <router-link
              to="/inventory"
              class="text-white hover:text-primary transition-colors duration-200"
            >
              库存
            </router-link>
            <button
              @click="locale = locale === 'zh' ? 'en' : 'zh'"
              class="text-white hover:text-primary transition-colors duration-200"
            >
              {{ locale === 'zh' ? 'English' : '中文' }}
            </button>
          </div>
        </div>
      </div> -->
    </Nav>
    <router-view />
  </div>
</template>

<style>
@import '@/styles/main.css';
</style>

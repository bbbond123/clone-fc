import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import { createI18n } from 'vue-i18n'

import router from '@/router'
import App from '@/App.vue'
import '@/styles/main.css'

const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  messages: {
    zh: {
      meta: {
        title: 'Flamecases - CS:GO 开箱模拟器',
      },
      home: {
        welcome: '欢迎来到 Flamecases！',
        openCase: '立即开箱',
      },
    },
    en: {
      meta: {
        title: 'Flamecases - CS:GO Case Opening Simulator',
      },
      home: {
        welcome: 'Welcome to Flamecases!',
        openCase: 'Open Case Now',
      },
    },
  },
})

const app = createApp(App)
const head = createHead()

app.use(createPinia())
  .use(router)
  .use(i18n)
  .use(head)
  .mount('#app')

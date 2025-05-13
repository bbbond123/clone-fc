import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import router from '@/router'
import App from '@/App.vue'
import '@/styles/main.css'
import i18n from '@/i18n'

const app = createApp(App)
const head = createHead()

app.use(createPinia())
  .use(router)
  .use(i18n)
  .use(head)
  .mount('#app')

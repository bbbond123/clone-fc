import path from 'path'
import { fileURLToPath } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import vitePrerender from 'vite-plugin-prerender'
import { createHtmlPlugin } from 'vite-plugin-html'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteImageOptimizer({
      jpg: { quality: 80 },
      png: { quality: 80 },
    }),
    vitePrerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: ['/', '/case-opening', '/inventory'],
      renderer: 'puppeteer',
    }),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'Flamecases Clone - CS:GO Case Opening',
          description:
            'A simulated CS:GO case opening platform with responsive design and multi-language support.',
          ogImage: '/assets/share-image.png',
        },
      },
    }),
  ],
  base: '/clone-fc/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    minify: 'esbuild',
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
        },
      },
    },
  },
})

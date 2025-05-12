import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import vitePrerender from 'vite-plugin-prerender'
import { createHtmlPlugin } from 'vite-plugin-html'
import { VitePWA } from 'vite-plugin-pwa'


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
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Flamecases Clone',
        short_name: 'FlamecloneCS',
        description: 'A simulated CS:GO case opening platform',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
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
          gsap: ['gsap'],
        },
      },
    },
  },
})

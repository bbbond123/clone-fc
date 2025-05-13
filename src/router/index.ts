import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/csgo',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/csgo/battles',
    name: 'Battles',
    component: () => import('@/views/Battles.vue'),
  },
  {
    path: '/csgo/case/percent',
    name: 'CasePercent',
    component: () => import('@/views/CasePercent.vue'),
  },
  {
    path: '/csgo/store',
    name: 'Store',
    component: () => import('@/views/Store.vue'),
  },
  {
    path: '/csgo/roll',
    name: 'Roll',
    component: () => import('@/views/Roll.vue'),
  },
  {
    path: '/csgo/partner',
    name: 'Partner',
    component: () => import('@/views/Partner.vue'),
  },
  {
    path: '/csgo/premium',
    name: 'Premium',
    component: () => import('@/views/Premium.vue'),
  },
  {
    path: '/csgo/support',
    name: 'Support',
    component: () => import('@/views/Support.vue'),
  },
  {
    path: '/csgo/account/inventory',
    name: 'Inventory',
    component: () => import('@/views/account/Inventory.vue'),
  },
  {
    path: '/csgo/account/inventory/all',
    name: 'InventoryAll',
    component: () => import('@/views/account/InventoryAll.vue'),
  },
  {
    path: '/csgo/account/payment-history',
    name: 'PaymentHistory',
    component: () => import('@/views/account/PaymentHistory.vue'),
  },
  {
    path: '/csgo/account/withdraw-history',
    name: 'WithdrawHistory',
    component: () => import('@/views/account/WithdrawHistory.vue'),
  },
  {
    path: '/csgo/account/partner-history',
    name: 'PartnerHistory',
    component: () => import('@/views/account/PartnerHistory.vue'),
  },
  {
    path: '/csgo/account/restrictions',
    name: 'Restrictions',
    component: () => import('@/views/account/Restrictions.vue'),
  },
  {
    path: '/csgo/terms',
    name: 'Terms',
    component: () => import('@/views/Terms.vue'),
  },
  {
    path: '/csgo/topwins',
    name: 'TopWins',
    component: () => import('@/views/TopWins.vue'),
  },
  {
    path: '/csgo/battle/create',
    name: 'BattleCreate',
    component: () => import('@/views/battle/Create.vue'),
  },
  // 默认重定向到首页
  {
    path: '/',
    redirect: '/csgo',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

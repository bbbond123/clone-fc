# Flamecases Clone Roadmap

## Phase 1: MVP (Current)
- **基础功能**
  - [x] 项目架构搭建 (Vue3, TypeScript, Tailwind CSS)
  - [x] 模拟 API 服务
  - [x] 箱子开启基础功能
  - [x] Steam 登录模拟
  - [x] WebSocket 实时掉落模拟

- **用户体验**
  - [x] 开箱动画 (GSAP)
  - [x] 响应式设计

- **性能**
  - [x] 基础组件懒加载
  - [x] 图片优化

## Phase 2: 增强功能 (Next)
- **功能扩展**
  - [ ] 库存管理系统
  - [ ] 交易上架功能
  - [ ] 强化完整的开箱动画
  - [ ] 增加更多的箱子和皮肤

- **用户体验**
  - [ ] 完善多语言支持 (中文, 英文, 日语)
  - [ ] 黑暗模式
  - [ ] 音效系统

- **性能优化**
  - [ ] 组件级别缓存
  - [ ] 预渲染关键页面
  - [ ] Service Worker 离线支持

## Phase 3: 高级功能
- **功能扩展**
  - [ ] 实时聊天系统
  - [ ] 升级箱 (Trade-up)
  - [ ] 成就系统
  - [ ] 排行榜

- **SEO 优化**
  - [ ] 静态站点生成 (SSG)
  - [ ] 结构化数据 (Schema.org)
  - [ ] 动态 meta 标签

- **性能与可靠性**
  - [ ] 完整的 PWA 支持
  - [ ] 图片 CDN 整合
  - [ ] 错误监控与报告系统

## Phase 4: 商业化
- **支付集成**
  - [ ] 支付系统集成
  - [ ] 充值系统
  - [ ] 提现系统

- **游戏扩展**
  - [ ] 支持更多游戏 (DOTA2, PUBG)
  - [ ] 社区市场价格集成

- **营销工具**
  - [ ] 推荐系统
  - [ ] 优惠券系统
  - [ ] 活动管理系统

## 技术栈规划
- **当前技术栈**
  - Vue 3 + Composition API
  - TypeScript
  - Pinia (状态管理)
  - Tailwind CSS
  - GSAP (动画)
  - Vite (构建工具)

- **计划整合**
  - 预渲染 (vite-plugin-prerender) 去掉这个方案，不好
  - PWA (vite-plugin-pwa)
  - i18n (vue-i18n)
  - 测试 (Vitest, Cypress)

## 性能目标
- 首次加载 < 2s (PCW 95%)
- 首次内容绘制 < 1s
- 首次输入延迟 < 100ms
- 累积布局偏移 < 0.1
- Lighthouse 性能分数 > 90 
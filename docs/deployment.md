# 部署指南

## 预览环境
每个 Pull Request 自动触发 Vercel 预览部署流程，便于在合并前测试和检查变更。

### 配置 Vercel 部署
1. 在 [Vercel](https://vercel.com) 创建新项目并连接到 GitHub 仓库
2. 添加以下环境变量（如需要）：
   - `VITE_BASE_API_URL` - API 基础 URL
   - `VITE_WS_URL` - WebSocket 连接 URL

3. 在 GitHub 仓库设置中添加以下 Secrets：
   - `VERCEL_TOKEN` - Vercel API 令牌
   - `VERCEL_ORG_ID` - 组织 ID
   - `VERCEL_PROJECT_ID` - 项目 ID

### 手动部署到预览环境
```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署预览
vercel

# 指定环境变量部署
vercel --env VITE_BASE_API_URL=https://api-dev.example.com
```

## 生产环境

### 构建优化
生产构建使用以下优化策略：
- 代码分割和懒加载
- 资源压缩和最小化
- 图片优化
- 预渲染关键页面

### 部署到生产环境
```bash
# 构建生产版本
npm run build

# 部署到 Vercel 生产环境
vercel --prod

# 或部署到其它平台
# 1. 复制 dist 目录内容到 Web 服务器
# 2. 配置 Nginx/Apache 以支持 HTML5 History 模式路由
```

### Nginx 配置示例
```nginx
server {
    listen 80;
    server_name flamecases-clone.example.com;
    root /var/www/flamecases-clone/dist;
    index index.html;

    # 支持 HTML5 History 模式
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```

## 监控与性能

### 性能监控
1. 使用 [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) 监控性能指标
2. 设置性能预算告警：
   - First Contentful Paint < 1.0s
   - Largest Contentful Paint < 2.5s
   - Time to Interactive < 3.5s

### 错误监控
1. 使用 [Sentry](https://sentry.io) 监控生产环境错误
2. 配置方法:
   ```bash
   npm install @sentry/vue
   ```
   
   ```ts
   // main.ts
   import { createApp } from 'vue'
   import * as Sentry from '@sentry/vue'
   import App from './App.vue'
   
   const app = createApp(App)
   
   if (import.meta.env.PROD) {
     Sentry.init({
       app,
       dsn: 'YOUR_SENTRY_DSN',
       environment: 'production',
       tracingOptions: {
         trackComponents: true,
       },
     })
   }
   
   app.mount('#app')
   ```

## CI/CD 流程
1. **Pull Request**: 触发自动测试和预览部署
2. **合并到 main**: 触发自动测试、构建和部署到生产环境
3. **发布验证**: 自动运行 Lighthouse 检测和可用性测试 
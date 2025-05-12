# Flamecases Clone

一个基于 Vue3 + TypeScript 的 CS:GO 开箱模拟器，复刻自 [Flamecases](https://flamecases.com/zh2/csgo)。

## 特性

- 🎮 CS:GO 开箱模拟
- 🌐 多语言支持（中文、英文）
- 📱 响应式设计
- ⚡ 流畅动画效果
- 🔄 实时掉落横幅
- 🎯 Steam 登录集成

## 技术栈

- Vue3
- TypeScript
- Tailwind CSS
- Vite
- GSAP
- Vue Router
- Pinia
- Vue I18n
- ESLint + Prettier

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 运行测试
npm run test

# 检查代码风格
npm run lint
```

## 项目结构

```
clone-fc/
├── public/                # 静态资源
├── src/
│   ├── assets/           # 项目资源
│   ├── components/       # 通用组件
│   ├── views/           # 页面组件
│   ├── router/          # 路由配置
│   ├── store/           # Pinia 状态管理
│   ├── api/             # API 请求封装
│   ├── i18n/            # 多语言支持
│   ├── types/           # TypeScript 类型
│   ├── utils/           # 工具函数
│   └── styles/          # 样式文件
├── tests/               # 测试文件
└── docs/               # 项目文档
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可

MIT

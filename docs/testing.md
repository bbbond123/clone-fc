# 测试策略

## 测试类型

### 单元测试 (Unit Tests)
- **工具**: Vitest
- **范围**: 组件、工具函数、Store
- **目录**: `tests/unit/`
- **命名约定**: `*.spec.ts`
- **运行命令**: `npm run test:unit`

### 组件测试 (Component Tests)
- **工具**: Vitest + Vue Test Utils
- **范围**: Vue 组件
- **目录**: `tests/components/`
- **命名约定**: `*.spec.ts`
- **运行命令**: `npm run test:unit`

### 端到端测试 (E2E Tests)
- **工具**: Cypress
- **范围**: 主要用户流程
- **目录**: `tests/e2e/`
- **命名约定**: `*.cy.ts`
- **运行命令**: `npm run test:e2e`

## 测试优先级

每个新功能或组件都应该有相应的测试，优先级如下：

1. **关键业务逻辑**:
   - 开箱逻辑与随机性
   - 皮肤掉落计算
   - 用户余额管理

2. **UI 组件**:
   - 开箱动画组件
   - 登录组件
   - 实时掉落组件

3. **工具函数**:
   - 随机函数
   - 动画工具
   - 分析工具

## 测试示例

### 单元测试示例 (随机工具)

```ts
// tests/unit/utils/random.spec.ts
import { describe, it, expect } from 'vitest'
import { getRandomSkin, generateSpinItems } from '@/utils/random'
import { Skin } from '@/types'

describe('getRandomSkin', () => {
  it('should return a skin from the provided list', () => {
    const skins: Skin[] = [
      { id: '1', name: 'Test Skin 1', rarity: 'common', image: 'test1.jpg' },
      { id: '2', name: 'Test Skin 2', rarity: 'rare', image: 'test2.jpg' }
    ]
    
    const result = getRandomSkin(skins)
    expect(skins).toContain(result)
  })
  
  it('should return first skin if list is empty', () => {
    const skins: Skin[] = [
      { id: '1', name: 'Test Skin 1', rarity: 'common', image: 'test1.jpg' }
    ]
    
    const result = getRandomSkin(skins)
    expect(result).toEqual(skins[0])
  })
})

describe('generateSpinItems', () => {
  it('should generate items with final skin at the end', () => {
    const skins: Skin[] = [
      { id: '1', name: 'Test Skin 1', rarity: 'common', image: 'test1.jpg' },
      { id: '2', name: 'Test Skin 2', rarity: 'rare', image: 'test2.jpg' }
    ]
    
    const finalSkin = skins[1]
    const result = generateSpinItems(skins, finalSkin)
    
    expect(result.length).toBeGreaterThan(20) // Should create enough items
    expect(result[result.length - 1]).toEqual(finalSkin)
  })
})
```

### 组件测试示例 (LoginButton)

```ts
// tests/components/LoginButton.spec.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginButton from '@/components/LoginButton.vue'
import { createPinia, setActivePinia } from 'pinia'

// Mock external dependencies
vi.mock('@/api/auth', () => ({
  loginWithSteam: vi.fn().mockResolvedValue({
    id: 'test_id',
    username: 'test_user',
    avatar: 'test_avatar.png',
    inventory: [],
    balance: 100
  })
}))

vi.mock('@/utils/analytics', () => ({
  trackEvent: vi.fn()
}))

describe('LoginButton', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  
  it('should render login button correctly', () => {
    const wrapper = mount(LoginButton)
    expect(wrapper.text()).toContain('Login with Steam')
    expect(wrapper.find('button').exists()).toBe(true)
  })
  
  it('should show loading state on click', async () => {
    const wrapper = mount(LoginButton)
    await wrapper.find('button').trigger('click')
    expect(wrapper.text()).toContain('Logging in...')
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })
})
```

### E2E 测试示例 (开箱流程)

```ts
// tests/e2e/case-opening.cy.ts
describe('Case Opening Flow', () => {
  beforeEach(() => {
    // Mock API responses
    cy.intercept('GET', '/api/cases', { fixture: 'cases.json' })
    cy.intercept('POST', '/api/cases/*/open', { fixture: 'case-open-result.json' })
    
    // Setup localStorage with user info
    cy.window().then(win => {
      win.localStorage.setItem('user', JSON.stringify({
        id: 'test_user',
        username: 'Test User',
        balance: 1000,
        inventory: []
      }))
    })
    
    cy.visit('/cases')
  })
  
  it('should open a case and display result', () => {
    // Select a case
    cy.get('[data-test="case-card"]').first().click()
    
    // Click open case button
    cy.get('[data-test="open-case-btn"]').click()
    
    // Wait for animation to complete
    cy.wait(5000)
    
    // Verify result is displayed
    cy.get('[data-test="case-result"]').should('be.visible')
    cy.get('[data-test="result-skin-name"]').should('have.text', 'AK-47 | Neon Dragon')
    
    // Verify balance was deducted
    cy.get('[data-test="user-balance"]').should('contain', '994.01')
  })
})
```

## 测试覆盖率目标

- 单元测试: > 80%
- 组件测试: > 70%
- E2E 测试: 所有关键用户流程

## 集成到 CI/CD

测试将集成到 CI/CD 流程中:

```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:unit
      - run: npm run test:e2e:headless
      - name: Upload coverage
        uses: codecov/codecov-action@v3
``` 
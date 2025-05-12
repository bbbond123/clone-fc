import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

import LoginButton from '@/components/LoginButton.vue'

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

describe('LoginButton.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })
  
  it('should render login button correctly', () => {
    const wrapper = mount(LoginButton)
    expect(wrapper.text()).toContain('Login with Steam')
    expect(wrapper.find('button').exists()).toBe(true)
  })
  
  it('should show loading state when logging in', async () => {
    const wrapper = mount(LoginButton)
    
    // Trigger login
    await wrapper.find('button').trigger('click')
    
    // Check loading state
    expect(wrapper.text()).toContain('Logging in...')
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    
    // Wait for promises to resolve
    await vi.runAllTimersAsync()
  })
  
  it('should handle login errors', async () => {
    // Override mock to simulate error
    const loginWithSteamMock = vi.fn().mockRejectedValueOnce(new Error('Login failed'))
    vi.mocked(require('@/api/auth')).loginWithSteam = loginWithSteamMock
    
    const wrapper = mount(LoginButton)
    
    // Trigger login
    await wrapper.find('button').trigger('click')
    
    // Wait for promises to resolve
    await vi.runAllTimersAsync()
    
    // Check error state
    expect(wrapper.text()).toContain('Login failed')
    expect(wrapper.find('.text-red-500').exists()).toBe(true)
  })
}) 
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import DropBanner from '@/components/DropBanner.vue'

// Mock dependencies
vi.mock('@/api/realtime', () => {
  return {
    mockRealtimeDrops: vi.fn().mockImplementation((callback) => {
      // Mock drops data
      callback([
        { user: 'TestUser1', skin: 'AK-47 | Test' },
        { user: 'TestUser2', skin: 'AWP | Test' }
      ])
      
      // Return cleanup function
      return vi.fn()
    })
  }
})

vi.mock('@/utils/animation', () => ({
  animateDropBanner: vi.fn()
}))

describe('DropBanner.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  
  it('should render drops from the realtime API', () => {
    const wrapper = mount(DropBanner)
    
    // Check if component renders the mock drops
    expect(wrapper.text()).toContain('TestUser1')
    expect(wrapper.text()).toContain('AK-47 | Test')
    expect(wrapper.text()).toContain('TestUser2')
    expect(wrapper.text()).toContain('AWP | Test')
  })
  
  it('should call mockRealtimeDrops on mount', () => {
    mount(DropBanner)
    
    const { mockRealtimeDrops } = vi.mocked(require('@/api/realtime'))
    expect(mockRealtimeDrops).toHaveBeenCalled()
  })
  
  it('should limit the number of displayed drops', async () => {
    const wrapper = mount(DropBanner)
    
    // Access the component instance
    const vm = wrapper.vm as any
    
    // Manually add more drops (beyond the limit of 5)
    vm.drops = [
      { user: 'User1', skin: 'Skin1' },
      { user: 'User2', skin: 'Skin2' },
      { user: 'User3', skin: 'Skin3' },
      { user: 'User4', skin: 'Skin4' },
      { user: 'User5', skin: 'Skin5' },
      { user: 'User6', skin: 'Skin6' }
    ]
    
    await wrapper.vm.$nextTick()
    
    // Count the number of drop elements
    const dropElements = wrapper.findAll('.flex.items-center')
    expect(dropElements.length).toBeLessThanOrEqual(5)
  })
  
  it('should unsubscribe from realtime updates on unmount', () => {
    // Setup mock for unsubscribe function
    const unsubscribeMock = vi.fn()
    const mockRealtimeDropsMock = vi.fn().mockReturnValue(unsubscribeMock)
    
    // Update the mock implementation
    vi.mocked(require('@/api/realtime')).mockRealtimeDrops = mockRealtimeDropsMock
    
    // Mount and unmount component
    const wrapper = mount(DropBanner)
    wrapper.unmount()
    
    // Check if unsubscribe was called
    expect(unsubscribeMock).toHaveBeenCalled()
  })
}) 
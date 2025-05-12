import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import CaseOpening from '@/components/CaseOpening.vue'
import { Case, Skin } from '@/types'

// Mock dependencies
vi.mock('@/api/mock', () => ({
  mockOpenCase: vi.fn().mockResolvedValue({
    id: 'test_skin_id',
    name: 'Test Skin',
    rarity: 'rare',
    image: 'test_skin.png',
    price: 50.0
  })
}))

vi.mock('@/utils/random', () => ({
  generateSpinItems: vi.fn().mockImplementation((skins, finalSkin) => {
    return [...Array(25).fill(skins[0]), finalSkin]
  })
}))

vi.mock('@/utils/analytics', () => ({
  trackEvent: vi.fn()
}))

vi.mock('@/utils/animation', () => ({
  animateOpen: vi.fn()
}))

// Mock GSAP
vi.mock('gsap', () => ({
  gsap: {
    to: vi.fn().mockImplementation((_, options) => {
      // Immediately call onComplete callback for testing
      if (options.onComplete) options.onComplete()
      return { kill: vi.fn() }
    }),
    fromTo: vi.fn()
  }
}))

describe('CaseOpening.vue', () => {
  const mockCase: Case = {
    id: 'test_case_id',
    name: 'Test Case',
    price: 5.99,
    image: 'test_case.png',
    skins: [
      {
        id: 'skin1',
        name: 'Skin 1',
        rarity: 'common',
        image: 'skin1.png',
        price: 10.0
      },
      {
        id: 'skin2',
        name: 'Skin 2',
        rarity: 'rare',
        image: 'skin2.png',
        price: 50.0
      }
    ]
  }

  // Mock user store
  const mockUserStore = {
    canAffordCase: vi.fn().mockReturnValue(true),
    updateBalance: vi.fn(),
    addSkinToInventory: vi.fn()
  }

  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    
    // Setup mock for user store
    vi.mock('@/store/user', () => ({
      useUserStore: vi.fn().mockReturnValue(mockUserStore)
    }))
  })

  it('should render the case image correctly', () => {
    const wrapper = mount(CaseOpening, {
      props: {
        selectedCase: mockCase
      },
      global: {
        stubs: {
          // Stub any problematic components if needed
        }
      }
    })

    const caseImage = wrapper.find('.case-image img')
    expect(caseImage.exists()).toBe(true)
    expect(caseImage.attributes('src')).toBe(mockCase.image)
    expect(caseImage.attributes('alt')).toBe(mockCase.name)
  })

  it('should show opening button with correct price', () => {
    const wrapper = mount(CaseOpening, {
      props: {
        selectedCase: mockCase
      }
    })

    const openButton = wrapper.find('button')
    expect(openButton.text()).toContain('Open Case')
    expect(openButton.text()).toContain(mockCase.price.toString())
  })

  it('should emit close event when close button is clicked', async () => {
    const wrapper = mount(CaseOpening, {
      props: {
        selectedCase: mockCase
      }
    })

    // Find and click the close button (second button)
    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('should handle case opening process', async () => {
    const wrapper = mount(CaseOpening, {
      props: {
        selectedCase: mockCase
      }
    })

    // Click the open button
    await wrapper.find('button').trigger('click')

    // Verify balance was updated
    expect(mockUserStore.updateBalance).toHaveBeenCalledWith(-mockCase.price)
    
    // Verify API was called with correct case ID
    const { mockOpenCase } = require('@/api/mock')
    expect(mockOpenCase).toHaveBeenCalledWith(mockCase.id)
    
    // Verify analytics tracking
    const { trackEvent } = require('@/utils/analytics')
    expect(trackEvent).toHaveBeenCalledWith({ 
      action: 'open-case', 
      caseId: mockCase.id 
    })
    
    // Verify animation was triggered
    const { animateOpen } = require('@/utils/animation')
    expect(animateOpen).toHaveBeenCalled()
    
    // Verify skin was added to inventory
    expect(mockUserStore.addSkinToInventory).toHaveBeenCalled()
    
    // Verify opened event was emitted
    expect(wrapper.emitted('opened')).toBeTruthy()
  })

  it('should show error message and refund when case opening fails', async () => {
    // Mock console.error to prevent test output pollution
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    // Override mockOpenCase to simulate an error
    const mockOpenCaseError = vi.fn().mockRejectedValueOnce(new Error('API error'))
    require('@/api/mock').mockOpenCase = mockOpenCaseError
    
    const wrapper = mount(CaseOpening, {
      props: {
        selectedCase: mockCase
      }
    })
    
    // Click the open button
    await wrapper.find('button').trigger('click')
    
    // Verify error was logged
    expect(consoleErrorSpy).toHaveBeenCalled()
    
    // Verify balance was refunded
    expect(mockUserStore.updateBalance).toHaveBeenCalledWith(mockCase.price)
    
    // No opened event should be emitted
    expect(wrapper.emitted('opened')).toBeFalsy()
    
    // Restore console.error
    consoleErrorSpy.mockRestore()
  })
}) 
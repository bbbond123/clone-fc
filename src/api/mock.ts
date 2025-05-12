import { Case, Skin } from '@/types'
import { getRandomSkin } from '@/utils/random'

// Mock cases data with skins
export const mockCases: Case[] = [
  {
    id: '1',
    name: 'Dragon Case',
    price: 5.99,
    image: '/images/cases/dragon.png',
    skins: [
      { id: 's1', name: 'AK-47 | Neon Dragon', rarity: 'rare', image: '/images/skins/ak47_neon.png', price: 120.50 },
      { id: 's2', name: 'M4A4 | Asiimov', rarity: 'uncommon', image: '/images/skins/m4a4_asiimov.png', price: 45.75 },
      { id: 's3', name: 'AWP | Dragon Lore', rarity: 'legendary', image: '/images/skins/awp_dragonlore.png', price: 1200.00 },
      { id: 's4', name: 'Glock-18 | Water Elemental', rarity: 'common', image: '/images/skins/glock_water.png', price: 12.30 },
      { id: 's5', name: 'USP-S | Kill Confirmed', rarity: 'rare', image: '/images/skins/usps_kill.png', price: 85.20 },
    ]
  },
  {
    id: '2',
    name: 'Phoenix Case',
    price: 3.99,
    image: '/images/cases/phoenix.png',
    skins: [
      { id: 's6', name: 'AK-47 | Redline', rarity: 'uncommon', image: '/images/skins/ak47_redline.png', price: 35.60 },
      { id: 's7', name: 'M4A1-S | Hyper Beast', rarity: 'rare', image: '/images/skins/m4a1s_hyper.png', price: 75.30 },
      { id: 's8', name: 'Desert Eagle | Blaze', rarity: 'uncommon', image: '/images/skins/deagle_blaze.png', price: 48.75 },
      { id: 's9', name: 'Knife | Doppler', rarity: 'legendary', image: '/images/skins/knife_doppler.png', price: 450.00 },
    ]
  }
]

/**
 * Mock API to simulate opening a case
 * @param caseId The ID of the case to open
 * @returns Promise that resolves to the skin obtained
 */
export const mockOpenCase = async (caseId: string): Promise<Skin> => {
  // Simulate network delay (300-800ms)
  const delay = 300 + Math.random() * 500
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const selectedCase = mockCases.find((c) => c.id === caseId)
      
      if (!selectedCase) {
        reject(new Error('Case not found'))
        return
      }
      
      const randomSkin = getRandomSkin(selectedCase.skins || [])
      resolve(randomSkin)
    }, delay)
  })
}

/**
 * Mock API to get all available cases
 * @returns Promise that resolves to an array of cases
 */
export const mockGetCases = async (): Promise<Case[]> => {
  // Simulate network delay (100-300ms)
  const delay = 100 + Math.random() * 200
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCases)
    }, delay)
  })
} 
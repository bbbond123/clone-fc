import { describe, it, expect, vi } from 'vitest'
import { getRandomSkin, generateSpinItems } from '@/utils/random'
import { Skin } from '@/types'

describe('random.ts', () => {
  describe('getRandomSkin', () => {
    it('should return a skin from the provided list', () => {
      const skins: Skin[] = [
        { id: '1', name: 'Test Skin 1', rarity: 'common', image: 'test1.jpg' },
        { id: '2', name: 'Test Skin 2', rarity: 'rare', image: 'test2.jpg' }
      ]
      
      const result = getRandomSkin(skins)
      expect(skins).toContain(result)
    })
    
    it('should return first skin if list has only one item', () => {
      const skins: Skin[] = [
        { id: '1', name: 'Test Skin 1', rarity: 'common', image: 'test1.jpg' }
      ]
      
      const result = getRandomSkin(skins)
      expect(result).toEqual(skins[0])
    })
    
    it('should correctly apply weighting based on rarity', () => {
      // Prepare test skins with different rarities
      const skins: Skin[] = [
        { id: '1', name: 'Common Skin', rarity: 'common', image: 'common.jpg' },
        { id: '2', name: 'Rare Skin', rarity: 'rare', image: 'rare.jpg' }
      ]
      
      // Mock Math.random to return fixed values
      const originalRandom = Math.random
      
      try {
        // For a value of 0.01, we should get the common skin (higher weight)
        Math.random = vi.fn().mockReturnValue(0.01)
        let result = getRandomSkin(skins)
        expect(result).toEqual(skins[0])
        
        // For a value of 0.99, we should get the rare skin (lower weight)
        Math.random = vi.fn().mockReturnValue(0.99)
        result = getRandomSkin(skins)
        expect(result).toEqual(skins[1])
      } finally {
        // Restore original Math.random
        Math.random = originalRandom
      }
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
      
      // Should generate at least 25 items
      expect(result.length).toBeGreaterThanOrEqual(25)
      // Final skin should be the last one
      expect(result[result.length - 1]).toEqual(finalSkin)
    })
    
    it('should generate between 25 and 30 items', () => {
      const skins: Skin[] = [
        { id: '1', name: 'Test Skin 1', rarity: 'common', image: 'test1.jpg' },
        { id: '2', name: 'Test Skin 2', rarity: 'rare', image: 'test2.jpg' }
      ]
      
      const finalSkin = skins[0]
      const result = generateSpinItems(skins, finalSkin)
      
      expect(result.length).toBeGreaterThanOrEqual(25)
      expect(result.length).toBeLessThanOrEqual(30)
    })
  })
}) 
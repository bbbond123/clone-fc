import { Skin } from '@/types'

/**
 * Get a random skin using a weighted randomness algorithm based on rarity
 * Rare items have a lower probability (5%) while common items have higher (50%)
 */
export const getRandomSkin = (skins: Skin[]): Skin => {
  const totalWeight = skins.reduce(
    (sum, skin) => sum + (skin.rarity === 'rare' ? 5 : 50),
    0
  )
  const random = Math.random() * totalWeight
  let accumulated = 0

  for (const skin of skins) {
    accumulated += skin.rarity === 'rare' ? 5 : 50
    if (random <= accumulated) return skin
  }

  return skins[0] // Fallback if something goes wrong
}

/**
 * Simulate the spinning animation items before landing on the final selected skin
 * Returns an array of skins that will appear during animation, with the final skin at the end
 */
export const generateSpinItems = (skins: Skin[], finalSkin: Skin): Skin[] => {
  // Generate 25-30 random skins for the animation
  const count = 25 + Math.floor(Math.random() * 6)
  const spinItems: Skin[] = []

  for (let i = 0; i < count - 1; i++) {
    // Random selection for animation, doesn't need weighting
    const randomIndex = Math.floor(Math.random() * skins.length)
    spinItems.push(skins[randomIndex])
  }

  // Add the actual winning item at the end
  spinItems.push(finalSkin)

  return spinItems
}

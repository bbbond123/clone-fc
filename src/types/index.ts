export interface Skin {
  id: string
  name: string
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary'
  image: string
  price?: number
}

export interface Case {
  id: string
  name: string
  price: number
  image?: string
  skins?: Skin[]
}

export interface User {
  id: string
  username: string
  avatar?: string
  inventory: Skin[]
  balance: number
}

export type AnalyticsEvent =
  | { action: 'open-case'; caseId: string }
  | { action: 'login'; method: 'steam' }
  | { action: 'switch-language'; language: string }
  | { action: 'view-inventory' }

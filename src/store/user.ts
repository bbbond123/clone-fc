import { ref } from 'vue'
import { defineStore } from 'pinia'

import { User, Skin } from '@/types'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isLoggedIn = ref(false)

  // Initialize from localStorage if available
  const initUser = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      user.value = JSON.parse(storedUser)
      isLoggedIn.value = true
    }
  }

  // Login user
  const login = (userData: User) => {
    user.value = userData
    isLoggedIn.value = true
    localStorage.setItem('user', JSON.stringify(userData))
  }

  // Logout user
  const logout = () => {
    user.value = null
    isLoggedIn.value = false
    localStorage.removeItem('user')
  }

  // Add skin to inventory
  const addSkinToInventory = (skin: Skin) => {
    if (user.value) {
      user.value.inventory.push(skin)
      localStorage.setItem('user', JSON.stringify(user.value))
      return true
    }
    return false
  }

  // Update balance
  const updateBalance = (amount: number) => {
    if (user.value) {
      user.value.balance += amount
      localStorage.setItem('user', JSON.stringify(user.value))
      return true
    }
    return false
  }

  // Check if user can afford a case
  const canAffordCase = (price: number): boolean => {
    return !!user.value && user.value.balance >= price
  }

  return {
    user,
    isLoggedIn,
    initUser,
    login,
    logout,
    addSkinToInventory,
    updateBalance,
    canAffordCase,
  }
})

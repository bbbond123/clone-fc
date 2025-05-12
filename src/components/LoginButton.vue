<script setup lang="ts">
import { ref } from 'vue'

import { loginWithSteam } from '@/api/auth'
import { useUserStore } from '@/store/user'
import { trackEvent } from '@/utils/analytics'

const userStore = useUserStore()
const isLoading = ref(false)
const error = ref<string | null>(null)

const handleLogin = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    const user = await loginWithSteam()
    userStore.login(user)
    trackEvent({ action: 'login', method: 'steam' })
  } catch (err) {
    console.error('Login failed', err)
    error.value = 'Login failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-button">
    <button
      @click="handleLogin"
      :disabled="isLoading"
      class="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded flex items-center transition-colors duration-200"
      :class="{ 'opacity-70 cursor-not-allowed': isLoading }"
    >
      <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <img v-else src="/images/steam_icon.svg" alt="Steam" class="w-5 h-5 mr-2" />
      {{ isLoading ? 'Logging in...' : 'Login with Steam' }}
    </button>
    <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
  </div>
</template>

<style scoped>
.login-button {
  width: fit-content;
}
</style> 
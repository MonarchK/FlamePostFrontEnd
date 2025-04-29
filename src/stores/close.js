import { defineStore } from 'pinia'
import { ref } from 'vue'

export const closeStore = defineStore('close', () => {
  const timeoutId = ref(null)
  function warning(failure) {
    if (timeoutId.value) {
      clearTimeout(timeoutId)
    }
    timeoutId.value = setTimeout(() => {
      failure.value = null
    }, 6000)
  }

  function closeWarning() {
    clearTimeout(timeoutId.value)
  }

  return { warning, closeWarning }
})

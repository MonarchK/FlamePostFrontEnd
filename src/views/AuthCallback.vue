<template>
  <div :class="loading - spinner">Logging you in...</div>
</template>
<script>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'AuthCallback',
  setup() {
    const router = useRouter()

    onMounted(() => {
      try {
        const token = new URLSearchParams(window.location.search).get('token')
        if (token) {
          localStorage.setItem('jwt', token)
          router.push('/')
        }
      } catch (error) {
        console.log(error)
        router.push('/')
      }
    })
  },
}
</script>
<style scoped>
.loading-spinner {
  display: flex;
  height: 100vh;
  align-items: baseline;
  justify-content: center;
}
</style>
